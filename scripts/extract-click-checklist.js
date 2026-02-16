#!/usr/bin/env node
/**
 * Build a manual QA checklist of what a human can click on each exported page.
 *
 * Source of truth: the static export output (Next.js `output: "export"`).
 * In this repo, `next.config.ts` sets `distDir: "dist"`, so HTML lives in `dist/`.
 *
 * Extracts from each HTML page:
 * - Anchors: <a href="...">...</a> (with label from textContent/aria-label)
 * - Buttons: <button ...>...</button> (excluding those nested inside anchors)
 * - Inputs: <input type="submit|button" ...>
 *
 * Outputs:
 * - click-checklist.md (checkbox checklist, grouped by page)
 * - click-checklist.json (raw per-page inventory)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DIST_DIR = process.env.DIST_DIR || "dist";

const IGNORE_DIRS = new Set(["_next"]);

function walk(dirAbs, out) {
  const ents = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const ent of ents) {
    const abs = path.join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      walk(abs, out);
      continue;
    }
    if (ent.isFile() && ent.name.endsWith(".html")) out.push(abs);
  }
}

function rel(p) {
  return path.relative(ROOT, p);
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "));
}

function normalizeLabel(s) {
  const t = String(s || "").replace(/\s+/g, " ").trim();
  return t;
}

function extractFirstTagText(innerHtml, tagRe) {
  const m = innerHtml.match(tagRe);
  if (!m) return "";
  return normalizeLabel(stripTags(m[1] || ""));
}

function extractBestAnchorLabel(innerHtml, attrs) {
  const aria = typeof attrs["aria-label"] === "string" ? attrs["aria-label"] : "";
  const title = typeof attrs.title === "string" ? attrs.title : "";

  // Prefer semantic heading text for big "card" anchors.
  const heading = extractFirstTagText(innerHtml, /<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);

  // If there's a button inside the anchor, its text is often the intended CTA label.
  const button = extractFirstTagText(innerHtml, /<button\b[^>]*>([\s\S]*?)<\/button>/i);

  const plain = normalizeLabel(stripTags(innerHtml));
  const fallback = plain || aria || title || "(no text)";

  // If the anchor wraps lots of copy, show a short label that helps you locate it.
  if (heading) return heading;
  if (button) return button;
  if (fallback.length > 140) return `${fallback.slice(0, 140)}...`;
  return fallback;
}

function parseAttrs(attrText) {
  const attrs = {};
  if (!attrText) return attrs;

  // double quotes
  for (const m of attrText.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) {
    attrs[m[1]] = m[2];
  }
  // single quotes
  for (const m of attrText.matchAll(/([\w:-]+)\s*=\s*'([^']*)'/g)) {
    attrs[m[1]] = m[2];
  }
  // boolean attrs: disabled, etc (best-effort)
  for (const m of attrText.matchAll(/\s([\w:-]+)(?=\s|$)/g)) {
    const k = m[1];
    if (!(k in attrs)) attrs[k] = true;
  }
  return attrs;
}

function routeFromHtmlPath(htmlAbs) {
  const distAbs = path.join(ROOT, DIST_DIR);
  const r = path.relative(distAbs, htmlAbs).split(path.sep).join("/");

  if (r === "index.html") return "/";
  if (r.endsWith("/index.html")) {
    const dir = r.slice(0, -"/index.html".length);
    return `/${dir}/`;
  }

  // Fallback: treat as file route (rare, e.g. 404.html)
  return `/${r}`;
}

function classifyHref(href) {
  if (!href) return "unknown";
  if (href.startsWith("#")) return "hash";
  if (href.startsWith("mailto:")) return "mailto";
  if (href.startsWith("tel:")) return "tel";
  if (href.startsWith("http://") || href.startsWith("https://")) return "external";
  if (href.startsWith("/")) return "internal";
  return "other";
}

function toInternalPathIfSameOrigin(href) {
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      const u = new URL(href);
      if (u.hostname === "www.invaritech.ai") return u.pathname + (u.hash || "") + (u.search || "");
    }
  } catch {
    // ignore
  }
  return href;
}

function basePathNoHashNoQuery(p) {
  const noQuery = p.split("?")[0];
  return noQuery.split("#")[0];
}

function normalizeInternalForExport(p) {
  // For existence checks against exported routes, normalize internal paths:
  // - strip query/hash
  // - ensure trailing slash for path routes (except "/")
  const base = basePathNoHashNoQuery(p);
  if (!base.startsWith("/")) return base;
  if (base === "/") return "/";
  if (path.posix.extname(base)) return base; // asset-like
  return base.endsWith("/") ? base : `${base}/`;
}

function extractClickables(html) {
  const anchors = [];
  const buttons = [];
  const inputs = [];

  const anchorRanges = [];

  // Anchors
  const anchorRe = /<a\b([^>]*)href\s*=\s*(["'])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi;
  for (const m of html.matchAll(anchorRe)) {
    const full = m[0];
    const idx = m.index ?? -1;
    if (idx >= 0) anchorRanges.push([idx, idx + full.length]);

    const attrText = `${m[1] || ""} ${m[4] || ""}`;
    const attrs = parseAttrs(attrText);
    const href = (m[3] || "").trim();
    const inner = m[5] || "";
    const label = extractBestAnchorLabel(inner, attrs);

    anchors.push({
      href,
      label,
      target: attrs.target || "",
      rel: attrs.rel || "",
    });
  }

  function isWithinAnyRange(pos) {
    for (const [s, e] of anchorRanges) {
      if (pos >= s && pos < e) return true;
    }
    return false;
  }

  // Buttons (exclude those nested inside anchors)
  const buttonRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  for (const m of html.matchAll(buttonRe)) {
    const idx = m.index ?? -1;
    if (idx >= 0 && isWithinAnyRange(idx)) continue;

    const attrs = parseAttrs(m[1] || "");
    const labelText = normalizeLabel(stripTags(m[2] || ""));
    const aria = typeof attrs["aria-label"] === "string" ? attrs["aria-label"] : "";
    const title = typeof attrs["title"] === "string" ? attrs["title"] : "";
    const label = labelText || aria || title || "(no text)";

    buttons.push({
      label,
      type: attrs.type || "",
      ariaLabel: aria || "",
    });
  }

  // Inputs
  const inputRe = /<input\b([^>]*)>/gi;
  for (const m of html.matchAll(inputRe)) {
    const attrs = parseAttrs(m[1] || "");
    const type = String(attrs.type || "").toLowerCase();
    if (type !== "submit" && type !== "button") continue;
    const value = typeof attrs.value === "string" ? attrs.value : "";
    const aria = typeof attrs["aria-label"] === "string" ? attrs["aria-label"] : "";
    const label = normalizeLabel(value || aria || "(input)");
    inputs.push({ label, type });
  }

  return { anchors, buttons, inputs };
}

function dedupeByKey(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const k = keyFn(it);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

function main() {
  const distAbs = path.join(ROOT, DIST_DIR);
  if (!fs.existsSync(distAbs)) {
    console.error(`Missing ${DIST_DIR}/. Run \`npm run build:static\` first.`);
    process.exit(1);
  }

  const htmlFiles = [];
  walk(distAbs, htmlFiles);

  // Only actual pages (index.html) + root 404.html (optional)
  const pageFiles = htmlFiles.filter((p) => {
    const r = path.relative(distAbs, p).split(path.sep).join("/");
    if (r === "404.html") return true;
    return r === "index.html" || r.endsWith("/index.html");
  });

  const pages = [];
  const routeSet = new Set();
  const assetSet = new Set();

  // Collect routes + asset-like files for existence checks
  for (const abs of htmlFiles) {
    const r = path.relative(distAbs, abs).split(path.sep).join("/");
    if (r.startsWith("_next/")) continue;
    if (r.endsWith(".html")) continue; // handled as routes
    assetSet.add(`/${r}`);
  }
  for (const abs of pageFiles) {
    const route = routeFromHtmlPath(abs);
    routeSet.add(route);
  }

  for (const abs of pageFiles) {
    const route = routeFromHtmlPath(abs);
    const fileRel = rel(abs);
    const html = fs.readFileSync(abs, "utf8");
    const extracted = extractClickables(html);

    // normalize hrefs for internal existence checks
    const anchors = extracted.anchors
      .map((a) => {
        const href = toInternalPathIfSameOrigin(a.href);
        const kind = classifyHref(href);

        let exists = "";
        if (kind === "internal") {
          const normalized = normalizeInternalForExport(href);
          const base = normalizeInternalForExport(basePathNoHashNoQuery(href));
          const hasHash = href.includes("#");
          if (routeSet.has(base)) exists = "yes";
          else if (assetSet.has(normalized) || assetSet.has(base)) exists = "asset";
          else exists = "no";
          if (hasHash && exists === "yes") exists = "yes (hash)";
        }

        return { ...a, href, kind, exists };
      });

    pages.push({
      route,
      file: fileRel,
      anchors: dedupeByKey(anchors, (x) => `${x.href}||${x.label}||${x.target}||${x.rel}`),
      buttons: dedupeByKey(extracted.buttons, (x) => `${x.label}||${x.type}||${x.ariaLabel}`),
      inputs: dedupeByKey(extracted.inputs, (x) => `${x.label}||${x.type}`),
    });
  }

  pages.sort((a, b) => a.route.localeCompare(b.route));

  // Global clickables: those that appear on many pages (header/footer/menu)
  const pageCount = pages.length;
  const globalThreshold = Math.max(5, Math.ceil(pageCount * 0.6));

  function keyAnchor(a) {
    return `${a.href}||${a.label}`;
  }
  function keyButton(b) {
    return `${b.label}||${b.type || ""}||${b.ariaLabel || ""}`;
  }

  const anchorFreq = new Map();
  const buttonFreq = new Map();
  for (const p of pages) {
    const uniqA = new Set(p.anchors.map(keyAnchor));
    for (const k of uniqA) anchorFreq.set(k, (anchorFreq.get(k) || 0) + 1);
    const uniqB = new Set(p.buttons.map(keyButton));
    for (const k of uniqB) buttonFreq.set(k, (buttonFreq.get(k) || 0) + 1);
  }

  const globalAnchors = new Set(
    Array.from(anchorFreq.entries())
      .filter(([, n]) => n >= globalThreshold)
      .map(([k]) => k),
  );
  const globalButtons = new Set(
    Array.from(buttonFreq.entries())
      .filter(([, n]) => n >= globalThreshold)
      .map(([k]) => k),
  );

  const md = [];
  md.push("# Manual Click Checklist");
  md.push("");
  md.push(`Generated from exported HTML in \`${DIST_DIR}/\`.`);
  md.push("");
  md.push(`Pages found: **${pages.length}**`);
  md.push(`Global threshold: appears on >= **${globalThreshold}** pages`);
  md.push("");

  // Global section
  const globalAnchorItems = [];
  const globalButtonItems = [];
  for (const p of pages) {
    for (const a of p.anchors) {
      const k = keyAnchor(a);
      if (globalAnchors.has(k)) globalAnchorItems.push(a);
    }
    for (const b of p.buttons) {
      const k = keyButton(b);
      if (globalButtons.has(k)) globalButtonItems.push(b);
    }
  }

  const globalAnchorsDeduped = dedupeByKey(
    globalAnchorItems,
    (a) => `${a.href}||${a.label}||${a.kind}`,
  ).sort((a, b) => a.href.localeCompare(b.href) || a.label.localeCompare(b.label));
  const globalButtonsDeduped = dedupeByKey(
    globalButtonItems,
    (b) => `${b.label}||${b.type}||${b.ariaLabel}`,
  ).sort((a, b) => a.label.localeCompare(b.label));

  md.push("## Global Clickables (Header/Footer/Common UI)");
  md.push("");
  if (!globalAnchorsDeduped.length && !globalButtonsDeduped.length) {
    md.push("_None detected._");
    md.push("");
  } else {
    if (globalAnchorsDeduped.length) {
      md.push("### Links");
      md.push("");
      for (const a of globalAnchorsDeduped) {
        const note = a.kind === "internal" ? `(${a.exists})` : `(${a.kind})`;
        md.push(`- [ ] ${a.label} -> \`${a.href}\` ${note}`);
      }
      md.push("");
    }
    if (globalButtonsDeduped.length) {
      md.push("### Buttons");
      md.push("");
      for (const b of globalButtonsDeduped) {
        const meta = [b.type ? `type=${b.type}` : "", b.ariaLabel ? `aria=${b.ariaLabel}` : ""]
          .filter(Boolean)
          .join(", ");
        md.push(`- [ ] ${b.label}${meta ? ` (${meta})` : ""}`);
      }
      md.push("");
    }
  }

  // Per-page section
  for (const p of pages) {
    md.push(`## ${p.route}`);
    md.push("");
    md.push(`Source: \`${p.file}\``);
    md.push("");

    const pageAnchors = p.anchors
      .filter((a) => !globalAnchors.has(keyAnchor(a)))
      .sort((a, b) => a.href.localeCompare(b.href) || a.label.localeCompare(b.label));
    const pageButtons = p.buttons
      .filter((b) => !globalButtons.has(keyButton(b)))
      .sort((a, b) => a.label.localeCompare(b.label));

    if (pageAnchors.length) {
      md.push("### Links");
      md.push("");
      for (const a of pageAnchors) {
        const note = a.kind === "internal" ? `(${a.exists})` : `(${a.kind})`;
        const extra = [
          a.target ? `target=${a.target}` : "",
          a.rel ? `rel=${a.rel}` : "",
        ]
          .filter(Boolean)
          .join(", ");
        md.push(`- [ ] ${a.label} -> \`${a.href}\` ${note}${extra ? ` (${extra})` : ""}`);
      }
      md.push("");
    } else {
      md.push("### Links");
      md.push("");
      md.push("_No page-unique links (only global links)._");
      md.push("");
    }

    if (pageButtons.length || p.inputs.length) {
      md.push("### Buttons");
      md.push("");
      for (const b of pageButtons) {
        const meta = [b.type ? `type=${b.type}` : "", b.ariaLabel ? `aria=${b.ariaLabel}` : ""]
          .filter(Boolean)
          .join(", ");
        md.push(`- [ ] ${b.label}${meta ? ` (${meta})` : ""}`);
      }
      for (const i of p.inputs) {
        md.push(`- [ ] ${i.label} (input type=${i.type})`);
      }
      md.push("");
    } else {
      md.push("### Buttons");
      md.push("");
      md.push("_No page-unique buttons (only global buttons)._");
      md.push("");
    }
  }

  const jsonOut = {
    distDir: DIST_DIR,
    pages: pages.map((p) => ({
      route: p.route,
      file: p.file,
      anchors: p.anchors,
      buttons: p.buttons,
      inputs: p.inputs,
    })),
    globalThreshold,
  };

  fs.writeFileSync(path.join(ROOT, "click-checklist.json"), JSON.stringify(jsonOut, null, 2) + "\n", "utf8");
  fs.writeFileSync(path.join(ROOT, "click-checklist.md"), md.join("\n") + "\n", "utf8");

  console.log(path.join(ROOT, "click-checklist.md"));
  console.log(path.join(ROOT, "click-checklist.json"));
}

main();
