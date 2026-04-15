import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const MAX_URLS = Number(process.env.AUDIT_MAX_URLS || 200);
const OUTPUT_DIR = path.resolve(process.cwd(), "artifacts/ui-audit");
const REPORT_PATH = path.join(OUTPUT_DIR, "report.json");

const VIEWPORTS = [
  {
    id: "desktop",
    context: { viewport: { width: 1440, height: 900 } },
  },
  {
    id: "mobile",
    context: {
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
    },
  },
];

function isCrawlableUrl(url) {
  if (!url.startsWith(BASE_URL)) return false;
  if (url.includes("#")) return false;
  if (/\.(pdf|jpg|jpeg|png|gif|webp|svg|ico|xml|txt|json)$/i.test(url)) return false;
  return true;
}

function toFileSlug(url) {
  const { pathname } = new URL(url);
  const clean = pathname.replace(/^\/|\/$/g, "");
  return clean ? clean.replace(/[^\w-]/g, "_") : "home";
}

async function waitForStablePage(page) {
  await page.waitForSelector("body", { timeout: 10000 });
  await page.waitForFunction(() => document.readyState === "complete", null, {
    timeout: 10000,
  });
  await page
    .waitForFunction(
      () => !("fonts" in document) || document.fonts.status === "loaded",
      null,
      { timeout: 5000 }
    )
    .catch(() => null);
}

async function getSitemapUrls() {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  } catch {
    return [];
  }
}

async function discoverUrls(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const queue = [BASE_URL];
  const visited = new Set();

  for (const sitemapUrl of await getSitemapUrls()) {
    if (isCrawlableUrl(sitemapUrl)) queue.push(sitemapUrl);
  }

  while (queue.length && visited.size < MAX_URLS) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await waitForStablePage(page);
      visited.add(url);

      const links = await page.$$eval("a[href]", (anchors) =>
        anchors.map((a) => a.getAttribute("href") || "").filter(Boolean)
      );

      for (const href of links) {
        if (
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("javascript:")
        ) {
          continue;
        }
        try {
          const absolute = new URL(href, BASE_URL).toString();
          if (isCrawlableUrl(absolute) && !visited.has(absolute) && !queue.includes(absolute)) {
            queue.push(absolute);
          }
        } catch {
          // skip malformed URL
        }
      }
    } catch {
      visited.add(url);
    }
  }

  await context.close();
  return [...visited].sort();
}

function summarizeIssues(analysis, viewportId) {
  const issues = [];
  for (const item of analysis.lowContrast.slice(0, 10)) {
    issues.push({
      severity: "high",
      type: "low-contrast",
      viewport: viewportId,
      detail: `${item.tag} "${item.text}" contrast ${item.ratio.toFixed(2)} < ${item.threshold}`,
    });
  }
  if (analysis.hasHorizontalOverflow) {
    issues.push({
      severity: "medium",
      type: "horizontal-overflow",
      viewport: viewportId,
      detail: "Page appears to overflow horizontally.",
    });
  }
  if (analysis.smallTapTargets > 0) {
    issues.push({
      severity: "medium",
      type: "small-tap-targets",
      viewport: viewportId,
      detail: `${analysis.smallTapTargets} interactive elements are smaller than 40x40.`,
    });
  }
  return issues;
}

async function auditPage(page) {
  return page.evaluate(() => {
    function parseRgb(value) {
      const m = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/i);
      if (!m) return null;
      return {
        r: Number(m[1]),
        g: Number(m[2]),
        b: Number(m[3]),
        a: m[4] ? Number(m[4]) : 1,
      };
    }

    function luminance(channel) {
      const c = channel / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }

    function contrastRatio(fg, bg) {
      const l1 = 0.2126 * luminance(fg.r) + 0.7152 * luminance(fg.g) + 0.0722 * luminance(fg.b);
      const l2 = 0.2126 * luminance(bg.r) + 0.7152 * luminance(bg.g) + 0.0722 * luminance(bg.b);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    function getBackgroundColor(el) {
      let current = el;
      while (current) {
        const bg = parseRgb(getComputedStyle(current).backgroundColor);
        if (bg && bg.a > 0) return bg;
        current = current.parentElement;
      }
      return parseRgb(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    }

    const lowContrast = [];
    const all = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,button,th,td,label");
    all.forEach((el) => {
      const text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length < 3) return;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) return;
      const fg = parseRgb(style.color);
      if (!fg) return;
      const bg = getBackgroundColor(el);
      const ratio = contrastRatio(fg, bg);
      const fontSize = Number.parseFloat(style.fontSize || "16");
      const fontWeight = Number.parseInt(style.fontWeight || "400", 10);
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const threshold = isLarge ? 3 : 4.5;
      if (ratio < threshold) {
        lowContrast.push({
          tag: el.tagName.toLowerCase(),
          text: text.slice(0, 80),
          ratio,
          threshold,
        });
      }
    });

    const hasHorizontalOverflow =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;

    const isMobile = window.innerWidth <= 480;
    let smallTapTargets = 0;
    if (isMobile) {
      const targets = document.querySelectorAll("a,button,[role='button'],input,select,textarea");
      targets.forEach((el) => {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return;
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 40 || rect.height < 40)) {
          smallTapTargets += 1;
        }
      });
    }

    return { lowContrast, hasHorizontalOverflow, smallTapTargets };
  });
}

async function run() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (const view of VIEWPORTS) {
    await fs.mkdir(path.join(OUTPUT_DIR, view.id), { recursive: true });
  }

  const browser = await chromium.launch();
  const urls = await discoverUrls(browser);
  const pages = [];

  for (const view of VIEWPORTS) {
    const context = await browser.newContext(view.context);
    const page = await context.newPage();

    for (const url of urls) {
      const slug = toFileSlug(url);
      const screenshotPath = path.join(OUTPUT_DIR, view.id, `${slug}.png`);
      const pageResult = { url, viewport: view.id, screenshotPath, issues: [] };

      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
        await waitForStablePage(page);
        const analysis = await auditPage(page);
        pageResult.issues = summarizeIssues(analysis, view.id);
        await page.screenshot({ path: screenshotPath, fullPage: true });
      } catch (err) {
        pageResult.issues.push({
          severity: "critical",
          type: "navigation-failed",
          viewport: view.id,
          detail: String(err),
        });
      }

      pages.push(pageResult);
      console.log(`[${view.id}] ${url}`);
    }

    await context.close();
  }

  await browser.close();

  const issueCount = pages.reduce((sum, p) => sum + p.issues.length, 0);
  const report = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    urlCount: urls.length,
    screenshotCount: pages.length,
    issueCount,
    urls,
    pages,
  };

  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  console.log(`Report written to ${REPORT_PATH}`);
  console.log(`Audited ${urls.length} URLs across ${VIEWPORTS.length} viewports.`);
  console.log(`Found ${issueCount} potential issues.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
