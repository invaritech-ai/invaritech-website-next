#!/usr/bin/env node
/**
 * Extract a deduped inventory of navigational links used across the codebase.
 *
 * Scope (by default): app/, components/, lib/
 * Extracts:
 * - JSX/TSX href attributes (string literals + { "literal" } / { 'literal' } / { `literal` })
 * - Markdown links: [text](url)
 * - Plain http(s) string literals (best-effort) to catch exported constants like BOOK_MEETING_URL
 *
 * Outputs:
 * - site-links.md (human checklist)
 * - site-links.json (machine-friendly with sources)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const DEFAULT_ROOTS = ["app", "components", "lib"];
const DEFAULT_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".md",
  ".mdx",
]);

const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  "dist",
  "build",
  "coverage",
  ".git",
]);

function walk(dirAbs, out) {
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name.startsWith(".")) {
      // allow .well-known etc? For now skip hidden folders except we already skip .git/.next above.
      if (ent.isDirectory()) continue;
    }

    const abs = path.join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      walk(abs, out);
      continue;
    }

    const ext = path.extname(ent.name);
    if (!DEFAULT_EXTS.has(ext)) continue;
    out.push(abs);
  }
}

function rel(p) {
  return path.relative(ROOT, p);
}

function classifyLink(u) {
  if (!u) return "unknown";
  if (u.startsWith("http://") || u.startsWith("https://")) return "external";
  if (u.startsWith("mailto:")) return "mailto";
  if (u.startsWith("tel:")) return "tel";
  if (u.startsWith("#")) return "hash";
  if (u.startsWith("/")) return "internal";
  return "other";
}

function add(map, url, fileRel, kind) {
  if (!url) return;
  const trimmed = String(url).trim();
  if (!trimmed) return;
  if (!map.has(trimmed)) {
    map.set(trimmed, { sources: new Set(), kinds: new Set() });
  }
  const rec = map.get(trimmed);
  rec.sources.add(fileRel);
  if (kind) rec.kinds.add(kind);
}

function extractFromText(text, fileRel, map) {
  // 1) href="..." / href='...'
  // Avoid greedy matching; keep it simple.
  const hrefStrRe = /\bhref\s*=\s*["']([^"']+)["']/g;
  for (const m of text.matchAll(hrefStrRe)) add(map, m[1], fileRel, "href");

  // 2) href={"..."} / href={'...'} / href={`...`}
  const hrefExprRe = /\bhref\s*=\s*\{\s*([`"'])([^`"']+)\1\s*\}/g;
  for (const m of text.matchAll(hrefExprRe)) add(map, m[2], fileRel, "href");

  // 3) Markdown links [text](url)
  const mdLinkRe = /\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const m of text.matchAll(mdLinkRe)) add(map, m[1], fileRel, "md");

  // 4) Plain http(s) string literals (best-effort)
  // Catch things like: const X = "https://..."
  const httpRe = /(https?:\/\/[^\s"'`)<]+)[\s"'`)]/g;
  for (const m of text.matchAll(httpRe)) {
    // lib/marketing.ts exports URLs that are used in hrefs via variables.
    const kind = fileRel === "lib/marketing.ts" ? "resolved" : "http";
    add(map, m[1], fileRel, kind);
  }
}

function main() {
  const roots = process.argv.slice(2);
  const scanRoots = roots.length ? roots : DEFAULT_ROOTS;

  const files = [];
  for (const r of scanRoots) {
    const abs = path.join(ROOT, r);
    if (!fs.existsSync(abs)) continue;
    if (!fs.statSync(abs).isDirectory()) continue;
    walk(abs, files);
  }

  const linkToSources = new Map(); // url -> {sources:Set(files), kinds:Set(string)}

  for (const abs of files) {
    const fileRel = rel(abs);
    let text;
    try {
      text = fs.readFileSync(abs, "utf8");
    } catch {
      continue;
    }
    extractFromText(text, fileRel, linkToSources);
  }

  // Build structured output
  const items = Array.from(linkToSources.entries()).map(([url, rec]) => {
    const sourceArr = Array.from(rec.sources).sort();
    const kinds = Array.from(rec.kinds).sort();
    return {
      url,
      type: classifyLink(url),
      kinds,
      occurrences: sourceArr.length,
      sources: sourceArr,
    };
  });

  items.sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.url.localeCompare(b.url);
  });

  const byType = new Map();
  for (const it of items) {
    if (!byType.has(it.type)) byType.set(it.type, []);
    byType.get(it.type).push(it);
  }

  // Write JSON (full fidelity)
  fs.writeFileSync(
    path.join(ROOT, "site-links.json"),
    JSON.stringify(
      {
        scannedRoots: scanRoots,
        totalLinks: items.length,
        totalsByType: Object.fromEntries(
          Array.from(byType.entries()).map(([k, v]) => [k, v.length]),
        ),
        items,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  // Heuristics:
  // - "Clickable" links are those found in href attrs, markdown links, or resolved constants.
  // - Anything found only as raw http literals is probably a technical/resource URL.
  function isClickable(it) {
    return it.kinds.includes("href") || it.kinds.includes("md") || it.kinds.includes("resolved");
  }

  function isDynamic(it) {
    return it.url.includes("${");
  }

  // Write markdown checklist (deduped list; short source hints)
  const lines = [];
  lines.push("# Site Link Inventory");
  lines.push("");
  lines.push(
    `Generated by \`scripts/extract-site-links.js\`. Scanned: ${scanRoots
      .map((r) => `\`${r}/\``)
      .join(", ")}.`,
  );
  lines.push("");
  lines.push(`Total unique links: **${items.length}**`);
  lines.push(
    `Clickable links (href/markdown/resolved constants): **${items.filter(isClickable).length}**`,
  );
  lines.push("");

  function renderTable(title, group) {
    if (!group.length) return;
    lines.push(`## ${title}`);
    lines.push("");
    lines.push("| Link | Files (count) | Kind | Example source |");
    lines.push("| --- | ---: | --- | --- |");
    for (const it of group) {
      const example = it.sources[0] ? `\`${it.sources[0]}\`` : "";
      const kind = it.kinds.join(", ") || "-";
      lines.push(`| \`${it.url}\` | ${it.occurrences} | ${kind} | ${example} |`);
    }
    lines.push("");
  }

  // Internal
  const internal = (byType.get("internal") || []).filter(isClickable);
  renderTable(
    "Internal Routes (Literal)",
    internal.filter((it) => !isDynamic(it)),
  );
  renderTable(
    "Internal Routes (Dynamic Patterns)",
    internal.filter((it) => isDynamic(it)),
  );

  // External
  const external = byType.get("external") || [];
  renderTable(
    "External URLs (Clickable)",
    external.filter((it) => isClickable(it) && !isDynamic(it)),
  );
  renderTable(
    "External URLs (Dynamic Patterns)",
    external.filter((it) => isClickable(it) && isDynamic(it)),
  );

  // Mailto/Tel/Hash/Other
  renderTable("Mailto", (byType.get("mailto") || []).filter(isClickable));
  renderTable("Tel", (byType.get("tel") || []).filter(isClickable));
  renderTable("In-Page Anchors", (byType.get("hash") || []).filter(isClickable));
  renderTable("Other (Clickable)", (byType.get("other") || []).filter(isClickable));

  // Non-clickable technical/resource URLs
  const resourceUrls = items.filter((it) => it.type === "external" && !isClickable(it));
  renderTable("External URLs (Technical/Resources)", resourceUrls);

  fs.writeFileSync(path.join(ROOT, "site-links.md"), lines.join("\n") + "\n", "utf8");

  console.log(path.join(ROOT, "site-links.md"));
  console.log(path.join(ROOT, "site-links.json"));
}

main();
