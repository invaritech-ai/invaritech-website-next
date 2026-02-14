#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Extracts "page content" from the services hub + 6 service pages into a single markdown file.
 *
 * Goal: pragmatic, mostly-verbatim text extraction for copy/SEO review.
 * This is not a renderer; it walks TSX AST and pulls textual children from common tags.
 */

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = process.cwd();

const PAGES = [
  {
    route: "/services/",
    pageFile: "app/services/page.tsx",
    contentFile: "app/services/services-client.tsx",
  },
  {
    route: "/services/ai-automation-sprint/",
    pageFile: "app/services/ai-automation-sprint/page.tsx",
    contentFile: "app/services/ai-automation-sprint/sprint-client.tsx",
  },
  {
    route: "/services/ai-automation-consulting/",
    pageFile: "app/services/ai-automation-consulting/page.tsx",
    contentFile: "app/services/ai-automation-consulting/consulting-client.tsx",
  },
  {
    route: "/services/ai-workflow-automation-services/",
    pageFile: "app/services/ai-workflow-automation-services/page.tsx",
    contentFile: "app/services/ai-workflow-automation-services/workflow-client.tsx",
  },
  {
    route: "/services/ai-integration-services/",
    pageFile: "app/services/ai-integration-services/page.tsx",
    contentFile: "app/services/ai-integration-services/integration-client.tsx",
  },
  {
    route: "/services/enterprise-ai-chatbot-deployment/",
    pageFile: "app/services/enterprise-ai-chatbot-deployment/page.tsx",
    contentFile: "app/services/enterprise-ai-chatbot-deployment/chatbot-client.tsx",
  },
  {
    route: "/services/generative-ai-backend-development/",
    pageFile: "app/services/generative-ai-backend-development/page.tsx",
    contentFile: "app/services/generative-ai-backend-development/backend-client.tsx",
  },
];

function readUtf8(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function makeSourceFile(rel, text) {
  return ts.createSourceFile(rel, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function isStringLike(node) {
  return (
    ts.isStringLiteralLike(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isStringLiteral(node)
  );
}

function evalLiteral(node) {
  if (!node) return undefined;
  if (isStringLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) {
    const out = [];
    for (const el of node.elements) {
      const v = evalLiteral(el);
      out.push(v);
    }
    return out;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const out = {};
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = ts.isIdentifier(prop.name) ? prop.name.text : prop.name.getText();
      out[key] = evalLiteral(prop.initializer);
    }
    return out;
  }
  // Best-effort: for anything else, bail.
  return undefined;
}

function extractMetadata(rel) {
  const text = readUtf8(rel);
  const sf = makeSourceFile(rel, text);
  let md = {};

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "metadata") {
      const v = evalLiteral(node.initializer);
      if (v && typeof v === "object") md = v;
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);

  const canonical = md?.alternates?.canonical;
  const keywords = Array.isArray(md?.keywords) ? md.keywords : undefined;

  return {
    title: md?.title,
    description: md?.description,
    canonical,
    keywords,
  };
}

function normalizeInlineText(s) {
  // Keep "verbatim-ish" while removing template indentation noise.
  // Do not collapse internal spaces aggressively; only normalize runs of whitespace.
  return s.replace(/\s+/g, " ").trim();
}

function normalizeInlineTextPreserveEdges(s) {
  // Same as normalizeInlineText, but do not trim. This keeps intentional
  // boundary whitespace between JSX nodes (e.g. "Find Your " + <span>Wedge</span>).
  return s.replace(/\s+/g, " ");
}

function collectConstEnv(sf) {
  const env = new Map();

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      // Only capture literal-ish arrays/objects (faqs, services, etc).
      const v = evalLiteral(node.initializer);
      if (v !== undefined) env.set(node.name.text, v);
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);
  return env;
}

function getJsxTagName(node) {
  if (ts.isJsxElement(node)) return node.openingElement.tagName.getText();
  if (ts.isJsxSelfClosingElement(node)) return node.tagName.getText();
  if (ts.isJsxOpeningElement(node)) return node.tagName.getText();
  return null;
}

function mdForHeading(tag, text) {
  const t = text.trim();
  if (!t) return [];
  const level = tag === "h1" ? 1 : tag === "h2" ? 2 : tag === "h3" ? 3 : 4;
  return [`${"#".repeat(level)} ${t}`];
}

function mdFromObjectCard(obj) {
  // Heuristic for common card objects used across pages.
  // Keep content verbatim; only structure with markdown headings/paragraphs.
  const lines = [];
  if (obj && typeof obj === "object") {
    if (typeof obj.phase === "string" && typeof obj.title === "string") {
      // Phase cards render phase + title as separate visual elements; keep them separate here too.
      lines.push(...mdForHeading("h3", obj.phase));
      lines.push(...mdForHeading("h3", obj.title));
    } else if (typeof obj.title === "string") {
      lines.push(...mdForHeading("h3", obj.title));
    }
    if (typeof obj.days === "string") lines.push(normalizeInlineText(obj.days));
    if (typeof obj.desc === "string") lines.push(normalizeInlineText(obj.desc));
    if (typeof obj.output === "string") lines.push(normalizeInlineText(obj.output));
    if (typeof obj.metric === "string") lines.push(normalizeInlineText(obj.metric));
    if (Array.isArray(obj.items)) {
      for (const it of obj.items) {
        if (typeof it === "string") lines.push(`- ${normalizeInlineText(it)}`);
      }
    }
    if (typeof obj.role === "string" && typeof obj.quote === "string") {
      lines.length = 0;
      lines.push(...mdForHeading("h3", obj.role));
      lines.push(normalizeInlineText(obj.quote));
    }
    if (typeof obj.q === "string" && typeof obj.a === "string") {
      lines.length = 0;
      lines.push(...mdForHeading("h3", obj.q));
      lines.push(normalizeInlineText(obj.a));
    }
    if (typeof obj.question === "string" && typeof obj.answer === "string") {
      lines.length = 0;
      lines.push(...mdForHeading("h3", obj.question));
      lines.push(normalizeInlineText(obj.answer));
    }
    if (typeof obj.description === "string" && typeof obj.outcome === "string") {
      // services hub cards
      if (typeof obj.title === "string") {
        lines.length = 0;
        lines.push(...mdForHeading("h2", obj.title));
      }
      lines.push(normalizeInlineText(obj.description));
      lines.push(normalizeInlineText(obj.outcome));
      if (typeof obj.cta === "string") lines.push(normalizeInlineText(obj.cta));
    }
  }
  return lines;
}

function mdFromJsxReturn(contentRel) {
  const src = readUtf8(contentRel);
  const sf = makeSourceFile(contentRel, src);
  const env = collectConstEnv(sf);

  let returnExpr = null;

  function findReturn(node) {
    if (ts.isReturnStatement(node) && node.expression) {
      // Use the first JSX-ish return in the default component.
      if (
        ts.isJsxElement(node.expression) ||
        ts.isJsxSelfClosingElement(node.expression) ||
        ts.isParenthesizedExpression(node.expression)
      ) {
        returnExpr = node.expression;
        return;
      }
    }
    ts.forEachChild(node, findReturn);
  }

  findReturn(sf);
  if (!returnExpr) return ["(Could not locate a JSX return in this file.)"];

  // Unwrap parentheses
  while (ts.isParenthesizedExpression(returnExpr)) returnExpr = returnExpr.expression;

  const out = [];

  function emitBlock(lines) {
    for (const l of lines) {
      if (!l) continue;
      out.push(l);
    }
  }

  function renderChildren(children, opts = {}) {
    const parts = [];
    for (const ch of children) {
      const p = renderInline(ch, opts);
      if (p) parts.push(p);
    }
    return parts.join("");
  }

  function renderInline(node, opts = {}) {
    if (!node) return "";
    if (ts.isJsxText(node)) {
      const t = normalizeInlineTextPreserveEdges(node.getText(sf));
      return t ? t : "";
    }
    if (ts.isJsxExpression(node)) {
      const expr = node.expression;
      if (!expr) return "";
      if (isStringLike(expr)) return normalizeInlineTextPreserveEdges(expr.text);
      if (ts.isIdentifier(expr)) {
        // Identifiers typically come from maps; don't emit raw identifier.
        return "";
      }
      if (ts.isCallExpression(expr) && ts.isPropertyAccessExpression(expr.expression) && expr.expression.name.text === "map") {
        // Handled at block level; do not inline.
        return "";
      }
      return "";
    }
    if (ts.isJsxSelfClosingElement(node)) {
      const tag = getJsxTagName(node);
      if (tag === "br") return "<br/>";
      return "";
    }
    if (ts.isJsxElement(node)) {
      const tag = getJsxTagName(node);
      // Inline wrappers: span/strong/TextEffect/etc => inline their children.
      if (["span", "strong", "em", "TextEffect", "Badge", "Link", "MagneticButton"].includes(tag)) {
        return renderChildren(node.children, opts);
      }
      // If nested block in inline context, just flatten its text.
      return renderChildren(node.children, opts);
    }
    return "";
  }

  function renderBlock(node) {
    if (!node) return;

    if (ts.isJsxElement(node)) {
      const tag = getJsxTagName(node);

      // Handle headings and paragraphs as blocks.
      if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") {
        const text = renderChildren(node.children);
        emitBlock(mdForHeading(tag, text));
        out.push("");
        return;
      }

      if (tag === "p") {
        const text = renderChildren(node.children).trim();
        if (text) emitBlock([text, ""]);
        return;
      }

      if (tag === "li") {
        const text = renderChildren(node.children).trim();
        if (text) emitBlock([`- ${text}`]);
        return;
      }

      // Generic wrappers: walk children in order.
      for (const ch of node.children) renderBlock(ch);
      return;
    }

    if (ts.isJsxExpression(node)) {
      const expr = node.expression;
      if (!expr) return;

      // Extract inline arrays rendered via .map(...)
      if (ts.isCallExpression(expr) && ts.isPropertyAccessExpression(expr.expression) && expr.expression.name.text === "map") {
        const target = expr.expression.expression;
        let arrVal;
        if (ts.isArrayLiteralExpression(target)) {
          arrVal = evalLiteral(target);
        } else if (ts.isIdentifier(target)) {
          arrVal = env.get(target.text);
        }

        if (Array.isArray(arrVal)) {
          // Strings array -> bullet list
          if (arrVal.every((x) => typeof x === "string")) {
            for (const s of arrVal) emitBlock([`- ${normalizeInlineText(s)}`]);
            out.push("");
            return;
          }
          // Objects array -> best-effort cards/FAQ blocks
          if (arrVal.every((x) => x && typeof x === "object" && !Array.isArray(x))) {
            for (const obj of arrVal) {
              const lines = mdFromObjectCard(obj);
              emitBlock(lines);
              out.push("");
            }
            return;
          }
        }
      }

      return;
    }

    if (ts.isJsxText(node)) {
      // Capture meaningful free text (e.g. button labels inside wrapper components).
      const t = normalizeInlineText(node.getText(sf));
      if (t) {
        out.push(t);
        out.push("");
      }
      return;
    }

    if (ts.isJsxSelfClosingElement(node)) {
      return;
    }

    // Fallback: walk children if possible.
    ts.forEachChild(node, renderBlock);
  }

  renderBlock(returnExpr);

  // Clean up excessive blank lines.
  const cleaned = [];
  for (const line of out) {
    if (line === "" && cleaned[cleaned.length - 1] === "") continue;
    cleaned.push(line);
  }
  while (cleaned.length && cleaned[cleaned.length - 1] === "") cleaned.pop();

  return cleaned;
}

function mdForPage({ route, pageFile, contentFile }) {
  const meta = extractMetadata(pageFile);
  const lines = [];
  lines.push(`# ${route}`);
  lines.push("");
  if (meta.title) lines.push(`**Title:** ${meta.title}`);
  if (meta.description) lines.push(`**Meta description:** ${meta.description}`);
  if (meta.canonical) lines.push(`**Canonical:** ${meta.canonical}`);
  if (Array.isArray(meta.keywords) && meta.keywords.length) {
    lines.push(`**Keywords:** ${meta.keywords.join(", ")}`);
  }
  lines.push("");
  lines.push("## Page Content");
  lines.push("");

  const bodyLines = mdFromJsxReturn(contentFile);
  lines.push(...bodyLines);
  lines.push("");
  return lines;
}

function main() {
  const all = [];
  all.push("# Services Pages (Verbatim Content Extract)");
  all.push("");
  all.push(
    "Generated from TSX source by `scripts/extract-services-pages-md.js`. Best-effort extraction of visible copy (headings, paragraphs, list items, FAQ)."
  );
  all.push("");

  for (const p of PAGES) {
    all.push(...mdForPage(p));
  }

  const outPath = path.join(ROOT, "services-pages-content.md");
  fs.writeFileSync(outPath, all.join("\n"), "utf8");
  console.log(outPath);
}

main();
