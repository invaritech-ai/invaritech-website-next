# Three-Way Match Glossary Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/glossary/three-way-match/` — a static SEO cluster page with embedded client-side three-way matcher tool, ~2,500 words of finance-buyer content, dual CTAs, full schema markup, bylined to Aditi Garg.

**Architecture:** Single TSX page (server component) at `app/glossary/three-way-match/page.tsx`. Client-side matcher in `components/glossary/three-way-matcher.tsx`. Pure-function match engine in `components/glossary/three-way-matcher/match-engine.ts` (TDD with `node:test`). Schema generators in `lib/seo/`. Analytics wrapper in `lib/analytics/`.

**Tech Stack:** Next 16 App Router, React 19, TypeScript, Tailwind v4 (token-based via `app/globals.css`), `node:test` for unit tests, GA4 via gtag for analytics. No new dependencies.

**Design doc:** `docs/plans/2026-05-25-three-way-match-glossary-design.md`

---

## File Structure

**Created:**

```
app/glossary/three-way-match/page.tsx          Server component, full page
app/api/glossary/secondary-cta/route.ts        POST handler for secondary CTA form
components/glossary/
  three-way-matcher.tsx                         Client wrapper, "use client"
  three-way-matcher-input.tsx                   3 textareas + controls
  three-way-matcher-results.tsx                 Count strip + filter chips + table
  three-way-matcher-secondary-cta.tsx           Below-results form
  three-way-matcher/
    match-engine.ts                             Pure matching functions
    csv-parser.ts                               CSV to row objects
    sample-data.ts                              Pre-loaded sample
    types.ts                                    TypeScript types
lib/seo/three-way-match-schema.ts               JSON-LD generators
lib/analytics/glossary-events.ts                gtag wrapper
tests/three-way-match-engine.test.mjs           Match engine tests
tests/three-way-match-csv-parser.test.mjs       CSV parser tests
tests/three-way-match-schema.test.mjs           Schema generator tests
```

**Modified:**

```
app/page.tsx                                    Homepage: link to glossary page from "What we automate" row
components/exception-automation-home.tsx        Homepage: update REGISTER row link
app/work/eudr-compliance-bridge/page.tsx       Add "Related capability" inline link
components/site-footer.tsx (if exists)         Add Resources/Glossary block
app/sitemap.ts (if exists)                      Add new URL
```

---

## Task 1: Scaffold the route and types

**Files:**
- Create: `app/glossary/three-way-match/page.tsx`
- Create: `components/glossary/three-way-matcher/types.ts`

- [ ] **Step 1: Create types file**

Write `components/glossary/three-way-matcher/types.ts`:

```typescript
export type InvoiceRow = {
    poNumber: string;
    vendor: string;
    amount: number;
    quantity: number;
    lineDescription: string;
    invoiceId: string; // synthetic, "INV-{row}" if not in input
};

export type PoRow = {
    poNumber: string;
    vendor: string;
    amount: number;
    quantity: number;
    lineDescription: string;
};

export type GrRow = {
    poNumber: string;
    vendor: string;
    quantityReceived: number;
    lineDescription: string;
};

export type MatchStatus =
    | "MATCHED"
    | "AMOUNT_VARIANCE"
    | "QUANTITY_VARIANCE"
    | "MISSING_PO"
    | "MISSING_GR"
    | "VENDOR_MISMATCH"
    | "LINE_DESC_MISMATCH"
    | "DUPLICATE_INVOICE";

export type MatchResult = {
    invoiceId: string;
    poNumber: string;
    matchedPo?: PoRow;
    matchedGr?: GrRow;
    status: MatchStatus;
    reason: string;
};

export type MatchOptions = {
    amountTolerancePercent: number; // 0..100
};
```

- [ ] **Step 2: Create stub page**

Write `app/glossary/three-way-match/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Three-Way Match: Invoice, PO & Goods Receipt Matching | Invaritech",
    description:
        "How three-way matching works between invoice, purchase order, and goods receipt — and what an agentic exception-routing system catches that manual review misses.",
};

export default function ThreeWayMatchPage() {
    return (
        <main className="site-page">
            <section className="doc-section">
                <div className="doc-container">
                    <h1>Three-Way Match</h1>
                    <p>Stub. Builds out task-by-task.</p>
                </div>
            </section>
        </main>
    );
}
```

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -20`

Expected: build succeeds, new route appears in output as `○ /glossary/three-way-match`.

- [ ] **Step 4: Commit**

```bash
git add app/glossary/three-way-match/page.tsx components/glossary/three-way-matcher/types.ts
git commit -m "feat(glossary): scaffold three-way-match route and types"
```

---

## Task 2: Match engine — PO join (TDD)

**Files:**
- Create: `components/glossary/three-way-matcher/match-engine.ts`
- Create: `tests/three-way-match-engine.test.mjs`

- [ ] **Step 1: Write the failing test**

Write `tests/three-way-match-engine.test.mjs`:

```javascript
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { joinByPo } from "../components/glossary/three-way-matcher/match-engine.ts";

describe("joinByPo", () => {
    it("returns a map of po number to row for case-insensitive whitespace-stripped keys", () => {
        const rows = [
            { poNumber: " po-001 ", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "x" },
            { poNumber: "PO-002", vendor: "Acme", amount: 200, quantity: 2, lineDescription: "y" },
        ];
        const map = joinByPo(rows);
        assert.equal(map.get("po-001")?.amount, 100);
        assert.equal(map.get("po-002")?.amount, 200);
    });

    it("collects duplicates into an array", () => {
        const rows = [
            { poNumber: "PO-001", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "x", invoiceId: "INV-1" },
            { poNumber: "PO-001", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "x", invoiceId: "INV-2" },
        ];
        const map = joinByPo(rows);
        const entry = map.get("po-001");
        assert.ok(Array.isArray(entry));
        assert.equal(entry.length, 2);
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -15`

Expected: FAIL with "Cannot find module" or "joinByPo is not a function".

- [ ] **Step 3: Implement `joinByPo`**

Write `components/glossary/three-way-matcher/match-engine.ts`:

```typescript
type WithPo = { poNumber: string; [key: string]: unknown };

/**
 * Normalize a PO number for joins: lowercase, whitespace-stripped.
 */
export function normalizePo(raw: string): string {
    return raw.trim().toLowerCase();
}

/**
 * Build a map of normalized PO -> single row, OR array of rows when duplicates exist.
 * Returning an array on duplicates lets callers detect duplicate invoices without a second pass.
 */
export function joinByPo<T extends WithPo>(rows: T[]): Map<string, T | T[]> {
    const map = new Map<string, T | T[]>();
    for (const row of rows) {
        const key = normalizePo(row.poNumber);
        const existing = map.get(key);
        if (existing === undefined) {
            map.set(key, row);
        } else if (Array.isArray(existing)) {
            existing.push(row);
        } else {
            map.set(key, [existing, row]);
        }
    }
    return map;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -10`

Expected: both tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/glossary/three-way-matcher/match-engine.ts tests/three-way-match-engine.test.mjs
git commit -m "feat(glossary): add joinByPo with case-insensitive normalization"
```

---

## Task 3: Match engine — amount and quantity tolerance (TDD)

**Files:**
- Modify: `components/glossary/three-way-matcher/match-engine.ts`
- Modify: `tests/three-way-match-engine.test.mjs`

- [ ] **Step 1: Add failing tests**

Append to `tests/three-way-match-engine.test.mjs`:

```javascript
import { isAmountWithinTolerance, jaccardTokenOverlap } from "../components/glossary/three-way-matcher/match-engine.ts";

describe("isAmountWithinTolerance", () => {
    it("uses the larger of percentage or $50 floor", () => {
        // 2% of 100 = $2, floor is $50, so $50 wins
        assert.equal(isAmountWithinTolerance(100, 140, 2), true);  // diff $40 <= $50
        assert.equal(isAmountWithinTolerance(100, 160, 2), false); // diff $60 > $50

        // 2% of 10000 = $200, $50 floor loses
        assert.equal(isAmountWithinTolerance(10000, 10199, 2), true);  // diff $199 <= $200
        assert.equal(isAmountWithinTolerance(10000, 10250, 2), false); // diff $250 > $200
    });

    it("treats zero tolerance as exact match (within floating-point epsilon)", () => {
        assert.equal(isAmountWithinTolerance(100, 100, 0), true);
        assert.equal(isAmountWithinTolerance(100, 100.001, 0), true); // within epsilon
        assert.equal(isAmountWithinTolerance(100, 101, 0), false);
    });
});

describe("jaccardTokenOverlap", () => {
    it("returns 1.0 for identical token sets", () => {
        assert.equal(jaccardTokenOverlap("office chairs", "office chairs"), 1);
    });

    it("returns 0 for disjoint token sets", () => {
        assert.equal(jaccardTokenOverlap("office chairs", "laptop bag"), 0);
    });

    it("is case-insensitive and ignores punctuation", () => {
        assert.equal(jaccardTokenOverlap("Office Chairs!", "office, chairs"), 1);
    });

    it("returns partial overlap correctly", () => {
        // {office, chair, premium} vs {office, chair} = 2/3 ~= 0.667
        const result = jaccardTokenOverlap("office chair premium", "office chair");
        assert.ok(Math.abs(result - 2 / 3) < 0.001);
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -15`

Expected: failures because functions not defined.

- [ ] **Step 3: Implement the functions**

Append to `components/glossary/three-way-matcher/match-engine.ts`:

```typescript
const FLOOR_TOLERANCE = 50; // $50 minimum tolerance band
const FLOAT_EPSILON = 0.01;

/**
 * Whether |a-b| is within max(percent% of larger, $50).
 * Percent is in the 0..100 range, not 0..1.
 */
export function isAmountWithinTolerance(
    a: number,
    b: number,
    tolerancePercent: number
): boolean {
    const diff = Math.abs(a - b);
    if (diff <= FLOAT_EPSILON) return true;
    const larger = Math.max(Math.abs(a), Math.abs(b));
    const percentBand = (tolerancePercent / 100) * larger;
    const band = Math.max(percentBand, FLOOR_TOLERANCE);
    return diff <= band;
}

/**
 * Tokenize a line-description string. Lowercase, strip punctuation, split on whitespace.
 */
function tokenize(s: string): Set<string> {
    const cleaned = s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
    const tokens = cleaned.split(/\s+/).filter(Boolean);
    return new Set(tokens);
}

/**
 * Jaccard similarity between two token sets: |A ∩ B| / |A ∪ B|.
 */
export function jaccardTokenOverlap(a: string, b: string): number {
    const aSet = tokenize(a);
    const bSet = tokenize(b);
    if (aSet.size === 0 && bSet.size === 0) return 1;
    let intersection = 0;
    for (const t of aSet) {
        if (bSet.has(t)) intersection++;
    }
    const union = aSet.size + bSet.size - intersection;
    return union === 0 ? 0 : intersection / union;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -10`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/glossary/three-way-matcher/match-engine.ts tests/three-way-match-engine.test.mjs
git commit -m "feat(glossary): add amount tolerance + Jaccard token overlap"
```

---

## Task 4: Match engine — classification (TDD)

**Files:**
- Modify: `components/glossary/three-way-matcher/match-engine.ts`
- Modify: `tests/three-way-match-engine.test.mjs`

- [ ] **Step 1: Add failing tests for runMatch**

Append to `tests/three-way-match-engine.test.mjs`:

```javascript
import { runMatch } from "../components/glossary/three-way-matcher/match-engine.ts";

const baseInvoice = { invoiceId: "INV-1", poNumber: "PO-1", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "office chair" };
const basePo      = { poNumber: "PO-1", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "office chair" };
const baseGr      = { poNumber: "PO-1", vendor: "Acme", quantityReceived: 1, lineDescription: "office chair" };

describe("runMatch", () => {
    it("classifies a perfect match as MATCHED", () => {
        const results = runMatch([baseInvoice], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results.length, 1);
        assert.equal(results[0].status, "MATCHED");
    });

    it("classifies missing PO as MISSING_PO", () => {
        const results = runMatch([baseInvoice], [], [], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "MISSING_PO");
    });

    it("classifies missing GR (but PO present) as MISSING_GR", () => {
        const results = runMatch([baseInvoice], [basePo], [], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "MISSING_GR");
    });

    it("classifies amount variance as AMOUNT_VARIANCE", () => {
        const inv = { ...baseInvoice, amount: 200 };
        const results = runMatch([inv], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "AMOUNT_VARIANCE");
    });

    it("classifies quantity variance as QUANTITY_VARIANCE", () => {
        const gr = { ...baseGr, quantityReceived: 5 };
        const results = runMatch([baseInvoice], [basePo], [gr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "QUANTITY_VARIANCE");
    });

    it("classifies vendor mismatch as VENDOR_MISMATCH", () => {
        const po = { ...basePo, vendor: "Different Inc" };
        const results = runMatch([baseInvoice], [po], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "VENDOR_MISMATCH");
    });

    it("classifies low line-description overlap as LINE_DESC_MISMATCH", () => {
        const po = { ...basePo, lineDescription: "laptop bag" };
        const results = runMatch([baseInvoice], [po], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "LINE_DESC_MISMATCH");
    });

    it("classifies two invoices sharing one PO as DUPLICATE_INVOICE for both", () => {
        const inv2 = { ...baseInvoice, invoiceId: "INV-2" };
        const results = runMatch([baseInvoice, inv2], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results.length, 2);
        assert.equal(results[0].status, "DUPLICATE_INVOICE");
        assert.equal(results[1].status, "DUPLICATE_INVOICE");
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -20`

Expected: 8 failures because `runMatch` not defined.

- [ ] **Step 3: Implement `runMatch`**

Append to `components/glossary/three-way-matcher/match-engine.ts`:

```typescript
import type {
    InvoiceRow,
    PoRow,
    GrRow,
    MatchResult,
    MatchOptions,
} from "./types";

const LINE_DESC_THRESHOLD = 0.5;

/**
 * Run a full three-way match. Returns one MatchResult per invoice.
 *
 * Classification priority (first match wins):
 *   1. DUPLICATE_INVOICE  — invoice's PO appears more than once across invoices
 *   2. MISSING_PO         — no PO row matches the invoice's PO number
 *   3. VENDOR_MISMATCH    — PO found but vendor differs
 *   4. AMOUNT_VARIANCE    — PO found but amount outside tolerance
 *   5. MISSING_GR         — PO matched, no GR for this PO
 *   6. QUANTITY_VARIANCE  — GR found but quantityReceived !== invoice.quantity
 *   7. LINE_DESC_MISMATCH — token overlap < 0.5 across invoice/PO/GR
 *   8. MATCHED            — all three align
 */
export function runMatch(
    invoices: InvoiceRow[],
    pos: PoRow[],
    grs: GrRow[],
    options: MatchOptions
): MatchResult[] {
    const poMap = joinByPo(pos);
    const grMap = joinByPo(grs);

    // Count invoice PO occurrences for duplicate detection.
    const invoicePoCounts = new Map<string, number>();
    for (const inv of invoices) {
        const key = normalizePo(inv.poNumber);
        invoicePoCounts.set(key, (invoicePoCounts.get(key) ?? 0) + 1);
    }

    return invoices.map((inv): MatchResult => {
        const key = normalizePo(inv.poNumber);
        const base = { invoiceId: inv.invoiceId, poNumber: inv.poNumber };

        // 1. DUPLICATE_INVOICE
        if ((invoicePoCounts.get(key) ?? 0) > 1) {
            return { ...base, status: "DUPLICATE_INVOICE", reason: `PO ${inv.poNumber} appears on multiple invoices` };
        }

        // 2. MISSING_PO
        const poEntry = poMap.get(key);
        if (!poEntry) {
            return { ...base, status: "MISSING_PO", reason: `No purchase order found for ${inv.poNumber}` };
        }
        const po: PoRow = Array.isArray(poEntry) ? poEntry[0] : poEntry;

        // 3. VENDOR_MISMATCH
        if (po.vendor.trim().toLowerCase() !== inv.vendor.trim().toLowerCase()) {
            return { ...base, matchedPo: po, status: "VENDOR_MISMATCH", reason: `Vendor differs: invoice "${inv.vendor}" vs PO "${po.vendor}"` };
        }

        // 4. AMOUNT_VARIANCE
        if (!isAmountWithinTolerance(inv.amount, po.amount, options.amountTolerancePercent)) {
            return { ...base, matchedPo: po, status: "AMOUNT_VARIANCE", reason: `Amount: invoice $${inv.amount} vs PO $${po.amount}` };
        }

        // 5. MISSING_GR
        const grEntry = grMap.get(key);
        if (!grEntry) {
            return { ...base, matchedPo: po, status: "MISSING_GR", reason: `No goods receipt found for ${inv.poNumber}` };
        }
        const gr: GrRow = Array.isArray(grEntry) ? grEntry[0] : grEntry;

        // 6. QUANTITY_VARIANCE
        if (gr.quantityReceived !== inv.quantity) {
            return { ...base, matchedPo: po, matchedGr: gr, status: "QUANTITY_VARIANCE", reason: `Quantity: invoice ${inv.quantity} vs received ${gr.quantityReceived}` };
        }

        // 7. LINE_DESC_MISMATCH
        const invPoOverlap = jaccardTokenOverlap(inv.lineDescription, po.lineDescription);
        const invGrOverlap = jaccardTokenOverlap(inv.lineDescription, gr.lineDescription);
        if (invPoOverlap < LINE_DESC_THRESHOLD || invGrOverlap < LINE_DESC_THRESHOLD) {
            return { ...base, matchedPo: po, matchedGr: gr, status: "LINE_DESC_MISMATCH", reason: `Line descriptions differ significantly` };
        }

        // 8. MATCHED
        return { ...base, matchedPo: po, matchedGr: gr, status: "MATCHED", reason: "All three documents align" };
    });
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -15`

Expected: all tests pass (11 total).

- [ ] **Step 5: Commit**

```bash
git add components/glossary/three-way-matcher/match-engine.ts tests/three-way-match-engine.test.mjs
git commit -m "feat(glossary): add runMatch classifier for all 8 exception types"
```

---

## Task 5: CSV parser (TDD)

**Files:**
- Create: `components/glossary/three-way-matcher/csv-parser.ts`
- Create: `tests/three-way-match-csv-parser.test.mjs`

- [ ] **Step 1: Write failing tests**

Write `tests/three-way-match-csv-parser.test.mjs`:

```javascript
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    parseInvoiceRows,
    parsePoRows,
    parseGrRows,
} from "../components/glossary/three-way-matcher/csv-parser.ts";

describe("parseInvoiceRows", () => {
    it("parses CSV with header row", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,Acme,100,2,Office chair";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows.length, 1);
        assert.deepEqual(rows[0], {
            invoiceId: "INV-1",
            poNumber: "PO-1",
            vendor: "Acme",
            amount: 100,
            quantity: 2,
            lineDescription: "Office chair",
        });
    });

    it("parses tab-separated rows (Excel paste)", () => {
        const tsv = "PO Number\tVendor\tAmount\tQuantity\tLine Description\nPO-1\tAcme\t100\t2\tOffice chair";
        const rows = parseInvoiceRows(tsv);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].vendor, "Acme");
    });

    it("strips currency symbols from amount", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,Acme,\"$1,200.50\",2,x";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows[0].amount, 1200.5);
    });

    it("synthesizes incrementing invoice ids", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,A,1,1,x\nPO-2,B,2,1,y";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows[0].invoiceId, "INV-1");
        assert.equal(rows[1].invoiceId, "INV-2");
    });

    it("returns empty array for empty input", () => {
        assert.deepEqual(parseInvoiceRows(""), []);
        assert.deepEqual(parseInvoiceRows("   \n  "), []);
    });

    it("uses invoice id from the CSV when an Invoice column exists", () => {
        const csv = "Invoice,PO Number,Vendor,Amount,Quantity,Line Description\nINV-7,PO-1,Acme,100,2,x";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows[0].invoiceId, "INV-7");
    });
});

describe("parsePoRows", () => {
    it("parses PO row shape", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,Acme,100,2,Office chair";
        const rows = parsePoRows(csv);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].poNumber, "PO-1");
    });
});

describe("parseGrRows", () => {
    it("parses GR row shape with Quantity Received column", () => {
        const csv = "PO Number,Vendor,Quantity Received,Line Description\nPO-1,Acme,2,Office chair";
        const rows = parseGrRows(csv);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].quantityReceived, 2);
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --experimental-strip-types --test tests/three-way-match-csv-parser.test.mjs 2>&1 | tail -10`

Expected: 8 failures, module not found.

- [ ] **Step 3: Implement the parser**

Write `components/glossary/three-way-matcher/csv-parser.ts`:

```typescript
import type { InvoiceRow, PoRow, GrRow } from "./types";

/**
 * Detect whether input is tab-separated or comma-separated by counting tabs in the first line.
 */
function detectDelimiter(input: string): string {
    const firstLine = input.split(/\r?\n/, 1)[0] ?? "";
    return firstLine.includes("\t") ? "\t" : ",";
}

/**
 * Parse a CSV/TSV row, respecting double-quoted cells that may contain commas.
 */
function parseRow(line: string, delimiter: string): string[] {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"' && line[i + 1] === '"') {
                current += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                current += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === delimiter) {
                cells.push(current.trim());
                current = "";
            } else {
                current += ch;
            }
        }
    }
    cells.push(current.trim());
    return cells;
}

/**
 * Strip currency symbols, thousands separators, whitespace from a numeric string.
 */
function parseNumber(raw: string): number {
    const cleaned = raw.replace(/[^0-9.\-]/g, "");
    if (cleaned === "" || cleaned === "-" || cleaned === ".") return 0;
    return Number.parseFloat(cleaned);
}

type RawRow = Record<string, string>;

/**
 * Parse CSV/TSV into a list of header-keyed records. Header row required (first non-empty line).
 * Header keys are normalized to lowercase with single-space separators.
 */
function parseTable(input: string): RawRow[] {
    const trimmed = input.trim();
    if (!trimmed) return [];
    const delimiter = detectDelimiter(trimmed);
    const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return [];

    const header = parseRow(lines[0], delimiter).map((h) =>
        h.toLowerCase().replace(/\s+/g, " ").trim()
    );

    const rows: RawRow[] = [];
    for (let i = 1; i < lines.length; i++) {
        const cells = parseRow(lines[i], delimiter);
        const obj: RawRow = {};
        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = cells[j] ?? "";
        }
        rows.push(obj);
    }
    return rows;
}

function pick(row: RawRow, keys: string[]): string {
    for (const k of keys) {
        if (row[k] !== undefined && row[k] !== "") return row[k];
    }
    return "";
}

export function parseInvoiceRows(input: string): InvoiceRow[] {
    return parseTable(input).map((row, idx): InvoiceRow => ({
        invoiceId: pick(row, ["invoice", "invoice id", "invoice number", "invoice #"]) || `INV-${idx + 1}`,
        poNumber: pick(row, ["po number", "po", "po #", "purchase order"]),
        vendor: pick(row, ["vendor", "supplier"]),
        amount: parseNumber(pick(row, ["amount", "total", "value"])),
        quantity: parseNumber(pick(row, ["quantity", "qty"])),
        lineDescription: pick(row, ["line description", "description", "item", "line"]),
    }));
}

export function parsePoRows(input: string): PoRow[] {
    return parseTable(input).map((row): PoRow => ({
        poNumber: pick(row, ["po number", "po", "po #", "purchase order"]),
        vendor: pick(row, ["vendor", "supplier"]),
        amount: parseNumber(pick(row, ["amount", "total", "value"])),
        quantity: parseNumber(pick(row, ["quantity", "qty"])),
        lineDescription: pick(row, ["line description", "description", "item", "line"]),
    }));
}

export function parseGrRows(input: string): GrRow[] {
    return parseTable(input).map((row): GrRow => ({
        poNumber: pick(row, ["po number", "po", "po #", "purchase order"]),
        vendor: pick(row, ["vendor", "supplier"]),
        quantityReceived: parseNumber(pick(row, ["quantity received", "qty received", "received", "qty"])),
        lineDescription: pick(row, ["line description", "description", "item", "line"]),
    }));
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --experimental-strip-types --test tests/three-way-match-csv-parser.test.mjs 2>&1 | tail -15`

Expected: all 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/glossary/three-way-matcher/csv-parser.ts tests/three-way-match-csv-parser.test.mjs
git commit -m "feat(glossary): CSV/TSV parser for invoice/PO/GR inputs"
```

---

## Task 6: Sample data with all 7 exception types

**Files:**
- Create: `components/glossary/three-way-matcher/sample-data.ts`

- [ ] **Step 1: Write the sample**

Write `components/glossary/three-way-matcher/sample-data.ts`:

```typescript
/**
 * Sample data designed so a 2% tolerance default surfaces each exception
 * type exactly once across 15 invoices.
 *
 * Coverage map (after runMatch with amountTolerancePercent=2):
 *   INV-001..010    MATCHED
 *   INV-011         AMOUNT_VARIANCE      (invoice $5,200 vs PO $5,000, diff $200 > 2% of $5,200)
 *   INV-012         QUANTITY_VARIANCE    (invoice qty 20, GR received 18)
 *   INV-013         MISSING_PO           (PO-901 not in PO list)
 *   INV-014         MISSING_GR           (PO-014 has no GR)
 *   INV-015         VENDOR_MISMATCH      (invoice vendor "Acme Corp" vs PO "Globex Inc")
 *   INV-016         LINE_DESC_MISMATCH   ("office chair" vs "wireless router")
 *   INV-017, 018    DUPLICATE_INVOICE    (both reference PO-002)
 */
export const SAMPLE_INVOICES_CSV = `Invoice,PO Number,Vendor,Amount,Quantity,Line Description
INV-001,PO-001,Acme Corp,1200,4,Office chairs ergonomic
INV-002,PO-002,Globex Inc,3500,10,Laptop docking stations
INV-003,PO-003,Initech,890,2,Standing desk converters
INV-004,PO-004,Acme Corp,450,15,USB-C cable bulk pack
INV-005,PO-005,Umbrella Co,2100,6,External monitors 27 inch
INV-006,PO-006,Globex Inc,560,4,Webcam HD package
INV-007,PO-007,Initech,1750,5,Office chairs executive
INV-008,PO-008,Acme Corp,330,1,Office desk single
INV-009,PO-009,Umbrella Co,4200,12,Conference room speakers
INV-010,PO-010,Globex Inc,720,3,Whiteboard glass premium
INV-011,PO-011,Acme Corp,5200,20,Laptop bags leather
INV-012,PO-012,Initech,940,20,Premium pens box
INV-013,PO-901,Acme Corp,1100,5,Office chairs ergonomic
INV-014,PO-014,Umbrella Co,2300,8,Server rack 24U
INV-015,PO-015,Acme Corp,800,2,Office printer color
INV-016,PO-016,Globex Inc,1500,4,Office chairs ergonomic
INV-017,PO-002,Globex Inc,3500,10,Laptop docking stations
INV-018,PO-002,Globex Inc,3500,10,Laptop docking stations`;

export const SAMPLE_POS_CSV = `PO Number,Vendor,Amount,Quantity,Line Description
PO-001,Acme Corp,1200,4,Office chairs ergonomic
PO-002,Globex Inc,3500,10,Laptop docking stations
PO-003,Initech,890,2,Standing desk converters
PO-004,Acme Corp,450,15,USB-C cable bulk pack
PO-005,Umbrella Co,2100,6,External monitors 27 inch
PO-006,Globex Inc,560,4,Webcam HD package
PO-007,Initech,1750,5,Office chairs executive
PO-008,Acme Corp,330,1,Office desk single
PO-009,Umbrella Co,4200,12,Conference room speakers
PO-010,Globex Inc,720,3,Whiteboard glass premium
PO-011,Acme Corp,5000,20,Laptop bags leather
PO-012,Initech,940,20,Premium pens box
PO-014,Umbrella Co,2300,8,Server rack 24U
PO-015,Globex Inc,800,2,Office printer color
PO-016,Globex Inc,1500,4,Wireless router enterprise`;

export const SAMPLE_GRS_CSV = `PO Number,Vendor,Quantity Received,Line Description
PO-001,Acme Corp,4,Office chairs ergonomic
PO-002,Globex Inc,10,Laptop docking stations
PO-003,Initech,2,Standing desk converters
PO-004,Acme Corp,15,USB-C cable bulk pack
PO-005,Umbrella Co,6,External monitors 27 inch
PO-006,Globex Inc,4,Webcam HD package
PO-007,Initech,5,Office chairs executive
PO-008,Acme Corp,1,Office desk single
PO-009,Umbrella Co,12,Conference room speakers
PO-010,Globex Inc,3,Whiteboard glass premium
PO-011,Acme Corp,20,Laptop bags leather
PO-012,Initech,18,Premium pens box
PO-015,Globex Inc,2,Office printer color
PO-016,Globex Inc,4,Wireless router enterprise`;
```

- [ ] **Step 2: Sanity test — parse and run match on sample**

Append to `tests/three-way-match-engine.test.mjs`:

```javascript
import { parseInvoiceRows, parsePoRows, parseGrRows } from "../components/glossary/three-way-matcher/csv-parser.ts";
import { SAMPLE_INVOICES_CSV, SAMPLE_POS_CSV, SAMPLE_GRS_CSV } from "../components/glossary/three-way-matcher/sample-data.ts";

describe("sample data coverage", () => {
    it("surfaces all 8 status types when run with 2% tolerance", () => {
        const invs = parseInvoiceRows(SAMPLE_INVOICES_CSV);
        const pos = parsePoRows(SAMPLE_POS_CSV);
        const grs = parseGrRows(SAMPLE_GRS_CSV);
        const results = runMatch(invs, pos, grs, { amountTolerancePercent: 2 });
        const statuses = new Set(results.map((r) => r.status));

        for (const expected of [
            "MATCHED",
            "AMOUNT_VARIANCE",
            "QUANTITY_VARIANCE",
            "MISSING_PO",
            "MISSING_GR",
            "VENDOR_MISMATCH",
            "LINE_DESC_MISMATCH",
            "DUPLICATE_INVOICE",
        ]) {
            assert.ok(statuses.has(expected), `Sample should surface ${expected}; got ${[...statuses].join(", ")}`);
        }
    });
});
```

- [ ] **Step 3: Run tests to verify**

Run: `node --experimental-strip-types --test tests/three-way-match-engine.test.mjs 2>&1 | tail -10`

Expected: all tests pass including the sample-coverage test.

- [ ] **Step 4: Commit**

```bash
git add components/glossary/three-way-matcher/sample-data.ts tests/three-way-match-engine.test.mjs
git commit -m "feat(glossary): sample data covering all 8 match statuses"
```

---

## Task 7: Tool input UI (textareas + controls)

**Files:**
- Create: `components/glossary/three-way-matcher-input.tsx`

- [ ] **Step 1: Write the input component**

Write `components/glossary/three-way-matcher-input.tsx`:

```tsx
"use client";

import { useState } from "react";

type Props = {
    invoiceCsv: string;
    poCsv: string;
    grCsv: string;
    tolerancePercent: number;
    onInvoiceChange: (v: string) => void;
    onPoChange: (v: string) => void;
    onGrChange: (v: string) => void;
    onToleranceChange: (v: number) => void;
    onMatchNow: () => void;
    onResetSample: () => void;
};

const TABS = ["invoice", "po", "gr"] as const;
type Tab = (typeof TABS)[number];

export function ThreeWayMatcherInput(props: Props) {
    const [mobileTab, setMobileTab] = useState<Tab>("invoice");

    return (
        <div className="border border-border bg-card p-4 md:p-6">
            {/* Mobile tabs */}
            <div className="mb-4 flex gap-2 md:hidden" role="tablist">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={mobileTab === tab}
                        onClick={() => setMobileTab(tab)}
                        className={`flex-1 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
                            mobileTab === tab
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-foreground-muted"
                        }`}
                    >
                        {tab === "invoice" ? "Invoices" : tab === "po" ? "POs" : "GR"}
                    </button>
                ))}
            </div>

            {/* Three textareas — grid on desktop, single-shown on mobile */}
            <div className="grid gap-4 md:grid-cols-3">
                <TextareaPanel
                    label="Invoice rows"
                    hint="po number | vendor | amount | quantity | line description"
                    value={props.invoiceCsv}
                    onChange={props.onInvoiceChange}
                    hidden={mobileTab !== "invoice"}
                />
                <TextareaPanel
                    label="PO rows"
                    hint="po number | vendor | amount | quantity | line description"
                    value={props.poCsv}
                    onChange={props.onPoChange}
                    hidden={mobileTab !== "po"}
                />
                <TextareaPanel
                    label="Goods receipt rows"
                    hint="po number | vendor | quantity received | line description"
                    value={props.grCsv}
                    onChange={props.onGrChange}
                    hidden={mobileTab !== "gr"}
                />
            </div>

            {/* Controls row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                    Amount tolerance
                    <select
                        value={props.tolerancePercent}
                        onChange={(e) => props.onToleranceChange(Number(e.target.value))}
                        className="border border-border bg-background px-2 py-1 text-sm text-foreground"
                    >
                        <option value={0}>Exact (0%)</option>
                        <option value={1}>1%</option>
                        <option value={2}>2% (default)</option>
                        <option value={5}>5%</option>
                        <option value={10}>10%</option>
                    </select>
                </label>

                <div className="ml-auto flex gap-3">
                    <button
                        type="button"
                        onClick={props.onResetSample}
                        className="site-button-secondary px-5"
                    >
                        Reset sample
                    </button>
                    <button
                        type="button"
                        onClick={props.onMatchNow}
                        className="site-button px-7"
                    >
                        Match now
                        <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function TextareaPanel(props: {
    label: string;
    hint: string;
    value: string;
    onChange: (v: string) => void;
    hidden: boolean;
}) {
    return (
        <div className={`flex flex-col ${props.hidden ? "hidden md:flex" : ""}`}>
            <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {props.label}
                </span>
            </div>
            <textarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                spellCheck={false}
                className="h-64 w-full resize-y border border-border bg-background p-3 font-mono text-[12px] leading-relaxed text-foreground"
                aria-label={props.label}
            />
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">
                {props.hint}
            </p>
        </div>
    );
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build 2>&1 | tail -10`

Expected: build succeeds (component is created but not yet wired; no usage errors).

- [ ] **Step 3: Commit**

```bash
git add components/glossary/three-way-matcher-input.tsx
git commit -m "feat(glossary): three-way matcher input component (textareas + controls)"
```

---

## Task 8: Tool results UI (count strip + filter chips + table)

**Files:**
- Create: `components/glossary/three-way-matcher-results.tsx`

- [ ] **Step 1: Write the results component**

Write `components/glossary/three-way-matcher-results.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import type { MatchResult, MatchStatus } from "./three-way-matcher/types";

type Props = {
    results: MatchResult[];
    onFilterChange?: (filter: FilterKey) => void;
};

type FilterKey = "all" | "matched" | "variance" | "missing" | "duplicate";

const STATUS_META: Record<MatchStatus, { label: string; tone: string; bucket: FilterKey }> = {
    MATCHED: { label: "Matched", tone: "matched", bucket: "matched" },
    AMOUNT_VARIANCE: { label: "Amount variance", tone: "variance", bucket: "variance" },
    QUANTITY_VARIANCE: { label: "Quantity variance", tone: "variance", bucket: "variance" },
    LINE_DESC_MISMATCH: { label: "Line description mismatch", tone: "variance", bucket: "variance" },
    MISSING_PO: { label: "Missing PO", tone: "missing", bucket: "missing" },
    MISSING_GR: { label: "Missing GR", tone: "missing", bucket: "missing" },
    VENDOR_MISMATCH: { label: "Vendor mismatch", tone: "missing", bucket: "missing" },
    DUPLICATE_INVOICE: { label: "Duplicate invoice", tone: "duplicate", bucket: "duplicate" },
};

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "matched", label: "Matched" },
    { key: "variance", label: "Variance" },
    { key: "missing", label: "Missing" },
    { key: "duplicate", label: "Duplicate" },
];

export function ThreeWayMatcherResults({ results, onFilterChange }: Props) {
    const [filter, setFilter] = useState<FilterKey>("all");

    const counts = useMemo(() => {
        const c: Record<FilterKey, number> = { all: results.length, matched: 0, variance: 0, missing: 0, duplicate: 0 };
        for (const r of results) {
            c[STATUS_META[r.status].bucket]++;
        }
        return c;
    }, [results]);

    const filtered = useMemo(() => {
        if (filter === "all") return results;
        return results.filter((r) => STATUS_META[r.status].bucket === filter);
    }, [filter, results]);

    if (results.length === 0) {
        return (
            <div className="border border-border bg-card/40 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                    Paste invoice, PO, and goods receipt rows above, then press Match now.
                </p>
            </div>
        );
    }

    return (
        <div className="border border-border bg-card">
            {/* Count strip */}
            <div className="border-b border-border bg-card/60 px-4 py-3">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-foreground">
                        <strong className="text-primary">{counts.matched}</strong> matched
                    </span>
                    <span className="text-foreground">
                        <strong className="text-accent">{counts.variance}</strong> variance
                    </span>
                    <span className="text-foreground">
                        <strong className="text-accent">{counts.missing}</strong> missing
                    </span>
                    <span className="text-foreground">
                        <strong className="text-accent">{counts.duplicate}</strong> duplicate
                    </span>
                    <span className="ml-auto text-foreground-subtle">{counts.all} invoices total</span>
                </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 border-b border-border bg-card/40 px-4 py-3" role="tablist">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        role="tab"
                        aria-selected={filter === f.key}
                        onClick={() => {
                            setFilter(f.key);
                            onFilterChange?.(f.key);
                        }}
                        className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
                            filter === f.key
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-foreground-muted hover:border-primary/50"
                        }`}
                    >
                        {f.label} ({counts[f.key]})
                    </button>
                ))}
            </div>

            {/* Results table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-card/40">
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">Invoice</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">PO</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">GR</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">Status</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r) => {
                            const meta = STATUS_META[r.status];
                            return (
                                <tr key={r.invoiceId} className="border-b border-border/60">
                                    <td className="px-4 py-2 font-mono text-xs text-foreground">{r.invoiceId}</td>
                                    <td className="px-4 py-2 font-mono text-xs text-foreground">{r.matchedPo?.poNumber ?? r.poNumber}</td>
                                    <td className="px-4 py-2 font-mono text-xs text-foreground">{r.matchedGr ? "✓" : "—"}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                                                meta.tone === "matched"
                                                    ? "border-primary/40 bg-primary/10 text-primary"
                                                    : meta.tone === "variance"
                                                    ? "border-accent/40 bg-accent/10 text-accent"
                                                    : meta.tone === "duplicate"
                                                    ? "border-red-500/40 bg-red-500/10 text-red-600"
                                                    : "border-red-500/40 bg-red-500/10 text-red-600"
                                            }`}
                                        >
                                            {meta.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-foreground-muted">{r.reason}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export type { FilterKey };
```

- [ ] **Step 2: Verify build**

Run: `pnpm build 2>&1 | tail -10`

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/glossary/three-way-matcher-results.tsx
git commit -m "feat(glossary): three-way matcher results panel with filter chips"
```

---

## Task 9: Tool wrapper (state + glue)

**Files:**
- Create: `components/glossary/three-way-matcher.tsx`

- [ ] **Step 1: Write the wrapper component**

Write `components/glossary/three-way-matcher.tsx`:

```tsx
"use client";

import { useCallback, useRef, useState } from "react";

import { ThreeWayMatcherInput } from "./three-way-matcher-input";
import { ThreeWayMatcherResults, type FilterKey } from "./three-way-matcher-results";
import { runMatch } from "./three-way-matcher/match-engine";
import {
    parseInvoiceRows,
    parsePoRows,
    parseGrRows,
} from "./three-way-matcher/csv-parser";
import {
    SAMPLE_INVOICES_CSV,
    SAMPLE_POS_CSV,
    SAMPLE_GRS_CSV,
} from "./three-way-matcher/sample-data";
import type { MatchResult } from "./three-way-matcher/types";
import { trackGlossaryEvent } from "@/lib/analytics/glossary-events";

export function ThreeWayMatcher() {
    const [invoiceCsv, setInvoiceCsv] = useState(SAMPLE_INVOICES_CSV);
    const [poCsv, setPoCsv] = useState(SAMPLE_POS_CSV);
    const [grCsv, setGrCsv] = useState(SAMPLE_GRS_CSV);
    const [tolerance, setTolerance] = useState(2);
    const [results, setResults] = useState<MatchResult[]>([]);
    const inputMethodRef = useRef<"sample" | "edited" | "csv-upload">("sample");

    const handleMatch = useCallback(() => {
        const invoices = parseInvoiceRows(invoiceCsv);
        const pos = parsePoRows(poCsv);
        const grs = parseGrRows(grCsv);
        const out = runMatch(invoices, pos, grs, { amountTolerancePercent: tolerance });
        setResults(out);

        trackGlossaryEvent("glossary_tool_run", {
            tolerance_percent: tolerance,
            input_method: inputMethodRef.current,
            has_gr_data: grs.length > 0,
        });
    }, [invoiceCsv, poCsv, grCsv, tolerance]);

    const handleReset = useCallback(() => {
        setInvoiceCsv(SAMPLE_INVOICES_CSV);
        setPoCsv(SAMPLE_POS_CSV);
        setGrCsv(SAMPLE_GRS_CSV);
        setResults([]);
        inputMethodRef.current = "sample";
    }, []);

    const onInvoiceChange = (v: string) => {
        setInvoiceCsv(v);
        inputMethodRef.current = "edited";
    };
    const onPoChange = (v: string) => {
        setPoCsv(v);
        inputMethodRef.current = "edited";
    };
    const onGrChange = (v: string) => {
        setGrCsv(v);
        inputMethodRef.current = "edited";
    };

    const handleToleranceChange = (v: number) => {
        setTolerance(v);
        trackGlossaryEvent("glossary_tool_tolerance_change", { new_value: v });
    };

    const handleFilterChange = (filter: FilterKey) => {
        trackGlossaryEvent("glossary_filter_chip_click", { filter });
    };

    return (
        <div className="space-y-6">
            <ThreeWayMatcherInput
                invoiceCsv={invoiceCsv}
                poCsv={poCsv}
                grCsv={grCsv}
                tolerancePercent={tolerance}
                onInvoiceChange={onInvoiceChange}
                onPoChange={onPoChange}
                onGrChange={onGrChange}
                onToleranceChange={handleToleranceChange}
                onMatchNow={handleMatch}
                onResetSample={handleReset}
            />

            <ThreeWayMatcherResults results={results} onFilterChange={handleFilterChange} />

            <PrivacyCallout />
        </div>
    );
}

function PrivacyCallout() {
    return (
        <aside className="border-l-[3px] border-primary bg-card/40 p-4 text-sm leading-relaxed text-foreground-muted">
            <p>
                <strong className="text-foreground">This runs entirely in your browser.</strong>{" "}
                Your data never leaves your device. Open DevTools, Network tab to verify.
            </p>
            <p className="mt-2">
                Server-side automation enables PDF OCR, fuzzy vendor normalization, semantic
                line-item matching, and agentic exception routing. Not available in this client-side
                demo.
            </p>
        </aside>
    );
}
```

- [ ] **Step 2: Create analytics stub (will fill in Task 14)**

Write `lib/analytics/glossary-events.ts`:

```typescript
type GlossaryEventName =
    | "glossary_tool_run"
    | "glossary_tool_tolerance_change"
    | "glossary_tool_csv_upload"
    | "glossary_secondary_cta_submit"
    | "glossary_filter_chip_click"
    | "cta_click";

type GlossaryEventProps = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (command: "event", eventName: string, params?: GlossaryEventProps) => void;
    }
}

export function trackGlossaryEvent(name: GlossaryEventName, props: GlossaryEventProps = {}): void {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, { page: "glossary/three-way-match", ...props });
}
```

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -10`

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/glossary/three-way-matcher.tsx lib/analytics/glossary-events.ts
git commit -m "feat(glossary): wrap input + results + privacy callout into matcher component"
```

---

## Task 10: CSV upload integration

**Files:**
- Modify: `components/glossary/three-way-matcher.tsx`
- Modify: `components/glossary/three-way-matcher-input.tsx`

- [ ] **Step 1: Add upload row to input component**

Append inside the controls section of `components/glossary/three-way-matcher-input.tsx`, after the existing `<div className="ml-auto flex gap-3">` block. Modify the component to accept an `onCsvUpload` prop.

Update the `Props` type:

```typescript
type Props = {
    invoiceCsv: string;
    poCsv: string;
    grCsv: string;
    tolerancePercent: number;
    onInvoiceChange: (v: string) => void;
    onPoChange: (v: string) => void;
    onGrChange: (v: string) => void;
    onToleranceChange: (v: number) => void;
    onMatchNow: () => void;
    onResetSample: () => void;
    onCsvUpload: (target: "invoice" | "po" | "gr", file: File) => void;
};
```

Add a new row below the controls row, inside the outer `<div className="border border-border bg-card p-4 md:p-6">`:

```tsx
{/* CSV upload row */}
<div className="mt-4 grid gap-3 border-t border-border pt-4 md:grid-cols-3">
    <CsvUploadCell label="Upload invoice CSV" target="invoice" onUpload={props.onCsvUpload} />
    <CsvUploadCell label="Upload PO CSV" target="po" onUpload={props.onCsvUpload} />
    <CsvUploadCell label="Upload GR CSV" target="gr" onUpload={props.onCsvUpload} />
</div>
```

Add the helper component at the bottom of the file:

```tsx
function CsvUploadCell(props: {
    label: string;
    target: "invoice" | "po" | "gr";
    onUpload: (target: "invoice" | "po" | "gr", file: File) => void;
}) {
    return (
        <label className="flex cursor-pointer flex-col gap-1 border border-dashed border-border bg-background p-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle hover:border-primary/50">
            <span>{props.label}</span>
            <input
                type="file"
                accept=".csv,.tsv,text/csv,text/tab-separated-values"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) props.onUpload(props.target, file);
                    e.target.value = "";
                }}
            />
        </label>
    );
}
```

- [ ] **Step 2: Wire upload in wrapper**

In `components/glossary/three-way-matcher.tsx`, add the upload handler:

```tsx
const handleCsvUpload = useCallback(
    async (target: "invoice" | "po" | "gr", file: File) => {
        try {
            const text = await file.text();
            if (target === "invoice") setInvoiceCsv(text);
            else if (target === "po") setPoCsv(text);
            else setGrCsv(text);
            inputMethodRef.current = "csv-upload";
            trackGlossaryEvent("glossary_tool_csv_upload", {
                success: true,
                file_type: file.type || "unknown",
                target,
            });
        } catch (err) {
            trackGlossaryEvent("glossary_tool_csv_upload", {
                success: false,
                error_type: err instanceof Error ? err.name : "unknown",
                target,
            });
        }
    },
    []
);
```

Pass it to the input component:

```tsx
<ThreeWayMatcherInput
    /* ...existing props... */
    onCsvUpload={handleCsvUpload}
/>
```

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -10`

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/glossary/three-way-matcher.tsx components/glossary/three-way-matcher-input.tsx
git commit -m "feat(glossary): CSV upload integration for invoice/PO/GR inputs"
```

---

## Task 11: Page layout — above the fold

**Files:**
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Write the above-fold layout**

Replace `app/glossary/three-way-match/page.tsx` with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

import { ThreeWayMatcher } from "@/components/glossary/three-way-matcher";

const LAST_UPDATED = "25 May 2026";
const READ_TIME = "12 min";

export const metadata: Metadata = {
    title: "Three-Way Match: Invoice, PO & Goods Receipt Matching | Invaritech",
    description:
        "How three-way matching works between invoice, purchase order, and goods receipt. An interactive matcher plus the seven canonical AP exceptions an agentic system catches.",
    alternates: { canonical: "https://www.invaritech.ai/glossary/three-way-match/" },
    openGraph: {
        title: "Three-Way Match: Invoice, PO & Goods Receipt Matching",
        description: "Interactive matcher plus the seven canonical AP exceptions an agentic system catches.",
        type: "article",
        url: "https://www.invaritech.ai/glossary/three-way-match/",
    },
};

export default function ThreeWayMatchPage() {
    return (
        <main className="site-page">
            <section className="doc-section">
                <div className="doc-container">
                    {/* Breadcrumb */}
                    <nav className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-foreground">Invaritech</Link>
                        <span className="mx-2">/</span>
                        <span>Glossary</span>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Three-Way Match</span>
                    </nav>

                    {/* Eyebrow + H1 */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px w-8 bg-primary/60" />
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                            Glossary · Reference
                        </p>
                    </div>

                    <h1 className="doc-hero-headline max-w-3xl">
                        Three-Way Match: Invoice, PO, and Goods Receipt Matching
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                        Three-way matching checks that an invoice, its purchase order, and the
                        goods receipt note all line up before a payment is released. It is the
                        backbone control most AP teams run by hand and the highest-leverage
                        workflow to automate. This page explains what it actually checks, what
                        breaks at scale, and what an agentic exception-routing system catches
                        that manual review misses.
                    </p>

                    {/* Byline */}
                    <div className="mt-8 border-y border-border py-4">
                        <p className="text-sm text-foreground">
                            By <strong>Aditi Garg</strong> · Founder &amp; Director, Invaritech
                        </p>
                        <p className="mt-1 max-w-2xl text-sm text-foreground-muted">
                            Aditi directs automation builds at Invaritech, including the EU TRACES
                            regulatory document workflow. She is now applying the same
                            exception-routing approach to finance and AP teams.
                        </p>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                            Last updated: {LAST_UPDATED} · {READ_TIME} read
                        </p>
                    </div>

                    {/* Primary CTA */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link href="/contact" className="site-button px-7">
                            Book a free Finance Exception Audit
                            <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                        </Link>
                        <a href="#matcher" className="site-button-secondary px-7">
                            Try the matcher below
                        </a>
                    </div>

                    {/* The tool */}
                    <div id="matcher" className="mt-12">
                        <ThreeWayMatcher />
                    </div>
                </div>
            </section>
        </main>
    );
}
```

- [ ] **Step 2: Run dev server and visually verify**

Run: `pnpm dev` (in background, then load `http://localhost:3000/glossary/three-way-match/` in browser)

Expected: page renders with breadcrumb, H1, lede, byline, CTAs, working matcher with sample data. Click "Match now" — see 18 results with all 8 statuses surfaced.

- [ ] **Step 3: Build check**

Run: `pnpm build 2>&1 | tail -10`

Expected: clean build, `/glossary/three-way-match` listed as static (○) route.

- [ ] **Step 4: Commit**

```bash
git add app/glossary/three-way-match/page.tsx
git commit -m "feat(glossary): above-the-fold layout with breadcrumb, byline, CTA, tool"
```

---

## Task 12: Long-form content — Sections 1 through 4

**Files:**
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Append the section component definitions**

Below the `ThreeWayMatchPage` default export, add reusable section components. At the top of the file, after imports:

```tsx
function GlossaryH2({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
    return (
        <header className="mt-16 mb-6">
            <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-primary/60" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                    {eyebrow}
                </p>
            </div>
            <h2 id={id} className="text-3xl font-medium text-foreground site-font-display">
                {children}
            </h2>
        </header>
    );
}

function GlossaryProse({ children }: { children: React.ReactNode }) {
    return (
        <div className="glossary-prose max-w-2xl text-foreground space-y-5 text-[17px] leading-[1.75]">
            {children}
        </div>
    );
}
```

- [ ] **Step 2: Add the long-form content section to the page**

Inside the `<section className="doc-section">` block, after the `<div id="matcher">...</div>`, add a new section element with sections 1-4:

```tsx
{/* Long-form content */}
<article className="mt-20">
    {/* Section 1 */}
    <GlossaryH2 id="what-it-checks" eyebrow="Section 01">
        What three-way matching actually checks
    </GlossaryH2>
    <GlossaryProse>
        <p>
            Three-way matching is a join across three finance documents. An invoice
            from the supplier. A purchase order from your procurement system. A goods
            receipt note from your warehouse or receiving team. If all three line up
            on supplier, amount, quantity, and item, the invoice passes for payment.
            If any one of them disagrees, the invoice becomes an exception that needs
            review.
        </p>
        <p>
            The control exists for separation of duties. The buyer placed the order.
            The receiving team confirmed what arrived. The finance team is about to
            move money. Each document is generated by a different function, and the
            three-way join catches drift between them: short deliveries, price changes
            after the PO was cut, invoices for goods never received, or invoices
            issued twice against the same PO.
        </p>
        <p>
            The join key is the PO number. Everything else hangs off that join.
            Vendor must agree across all three. Amount must agree between invoice
            and PO within a tolerance band. Quantity must agree between invoice and
            goods receipt. Line description is the soft check that catches outright
            substitutions when other fields happen to line up.
        </p>
    </GlossaryProse>

    {/* Section 2 */}
    <GlossaryH2 id="why-it-matters" eyebrow="Section 02">
        Why it matters
    </GlossaryH2>
    <GlossaryProse>
        <p>
            Skipping three-way match does not feel expensive until it is. The four
            losses compound: duplicate payments, vendor fraud, audit findings, and
            working capital trapped in disputes.
        </p>
        <p>
            <strong>Duplicate payment.</strong> A supplier sends the same invoice
            twice, intentionally or not. Without a PO-level uniqueness check, both
            get paid. Recovery rates on duplicate payments are typically below 60%
            once the funds leave.
        </p>
        <p>
            <strong>Vendor fraud surface.</strong> The most common AP fraud pattern is
            a fake invoice for goods never delivered, often timed to month-end when
            review is rushed. The goods-receipt leg of three-way match is the only
            control that catches this pattern at the invoice-approval step.
        </p>
        <p>
            <strong>Audit findings.</strong> External auditors test three-way match
            evidence on sampled invoices. Inability to produce the goods receipt for
            a paid invoice is a recurring control finding in internal audit reports,
            even for companies with otherwise tight controls.
        </p>
        <p>
            <strong>Working capital leakage.</strong> Amount and quantity variances
            that go unflagged at invoice receipt show up months later as supplier
            credits, debit notes, and disputed balances. Each one ties up cash and
            costs reconciliation time.
        </p>
    </GlossaryProse>

    {/* Section 3 */}
    <GlossaryH2 id="seven-exceptions" eyebrow="Section 03">
        The seven canonical three-way match exceptions
    </GlossaryH2>
    <GlossaryProse>
        <p>
            The matcher above classifies every invoice into one of eight states: matched,
            or one of seven exception types. Each exception is a real-world failure mode
            an AP team sees weekly.
        </p>
        <ol className="mt-4 space-y-4 list-decimal pl-6">
            <li>
                <strong>Amount variance.</strong> Invoice and PO agree on supplier and
                line items but the amount differs beyond the tolerance band. Common
                causes: pricing was renegotiated after the PO was issued, freight or
                fuel surcharges were added, or the supplier billed at a higher rate
                than agreed.
            </li>
            <li>
                <strong>Quantity variance.</strong> The supplier billed for more than
                the goods-receipt note confirms. Either the warehouse under-counted, the
                supplier shipped short, or the supplier billed before the full
                shipment arrived.
            </li>
            <li>
                <strong>Missing PO.</strong> An invoice arrives referencing a PO number
                your procurement system has no record of. Often a rogue spend pattern:
                someone in the business committed to a supplier without raising a PO
                first. Sometimes a typo on the supplier&apos;s invoice.
            </li>
            <li>
                <strong>Missing GR.</strong> Invoice and PO match, but no goods receipt
                has been logged. Either the receiving team has not posted the receipt
                yet, or the goods were never delivered and the invoice is fraudulent.
            </li>
            <li>
                <strong>Vendor mismatch.</strong> The invoice and PO carry the same PO
                number but are from different suppliers. Most often a data-entry error
                on the supplier&apos;s side, occasionally a fraud signal where a fake
                supplier piggybacks on a real PO number.
            </li>
            <li>
                <strong>Line-item substitution.</strong> The supplier delivered
                something different from what was ordered. The PO is for office
                chairs, the invoice and goods receipt are for executive desks. Often
                legitimate (back-order substitution) but always requires approval.
            </li>
            <li>
                <strong>Duplicate invoice.</strong> The same PO appears on two or more
                invoices. The classic AP control gap. The duplicate may be intentional
                fraud, or the supplier&apos;s billing system mis-fired. Either way
                payment must be held until the duplicate is investigated.
            </li>
        </ol>
    </GlossaryProse>

    {/* Section 4 */}
    <GlossaryH2 id="manual-vs-automated" eyebrow="Section 04">
        Manual three-way match vs. automated
    </GlossaryH2>
    <GlossaryProse>
        <p>
            Manual three-way match works at small scale and breaks slowly. A two-person
            AP team handling 200 invoices a month can hold the three documents side by
            side in a spreadsheet, eyeball the join, and clear the queue in a day.
            Five-hundred invoices and the spreadsheet becomes a multi-tab artifact
            that one person fully understands. A thousand and the team starts skipping
            the GR leg, then the amount tolerance, then the duplicate check.
        </p>
        <p>
            Each shortcut is rational at the moment it is taken. None of them are
            visible from outside the team. The audit finding shows up two quarters
            later, the duplicate payment surfaces when the supplier asks for a credit,
            and the fraud, if there was any, was paid out months ago.
        </p>
        <p>
            Automation does not eliminate exceptions. It surfaces them. A well-built
            three-way match agent runs every invoice against the full rule set, flags
            the 5 to 15 percent that need review, and shows the reviewer exactly why
            each one was flagged. The reviewer&apos;s time goes from chasing 100% of
            invoices through three spreadsheets to making a judgment call on the 10%
            the agent could not clear.
        </p>
    </GlossaryProse>

    {/* Mid-page primary CTA */}
    <div className="mt-12 border-y border-border py-8">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                    Book a free Finance Exception Audit
                </p>
                <p className="mt-2 max-w-xl text-base text-foreground-muted">
                    We review your full AP workflow and recommend the smallest useful
                    first system. Free during launch for selected finance teams.
                </p>
            </div>
            <div className="flex md:justify-end">
                <Link href="/contact" className="site-button px-7">
                    Book the audit
                    <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                </Link>
            </div>
        </div>
    </div>
</article>
```

- [ ] **Step 2: Build and visually verify**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green. Page renders the four sections with consistent typography and the mid-page CTA card.

- [ ] **Step 3: Commit**

```bash
git add app/glossary/three-way-match/page.tsx
git commit -m "feat(glossary): long-form sections 1-4 + mid-page CTA"
```

---

## Task 13: Long-form content — Sections 5 through 8

**Files:**
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Append remaining sections inside the `<article>` block, after the mid-page CTA**

```tsx
{/* Section 5 */}
<GlossaryH2 id="beyond-client-side" eyebrow="Section 05">
    Beyond client-side: OCR, LLM matching, agentic workflows
</GlossaryH2>
<GlossaryProse>
    <p>
        The matcher on this page is honest about its limits. It runs in your
        browser, takes structured rows as input, joins them on PO number, and
        applies fixed rules. That is enough to demonstrate every canonical
        exception type. It is not enough to run against your real AP workflow.
    </p>
    <p>
        Real AP workflows feed three-way match with messy inputs. Invoices arrive
        as PDFs, sometimes scanned, sometimes machine-generated, sometimes
        embedded in email bodies with no attachment. POs sit in an ERP behind
        export jobs that drop fields silently. Goods receipt notes are often
        handwritten and photographed by the receiving team.
    </p>
    <p>
        A production three-way match system has to handle three classes of work
        the client-side tool cannot:
    </p>
    <ul className="mt-3 space-y-2 list-disc pl-6">
        <li>
            <strong>Document intelligence.</strong> OCR the invoice PDF, extract
            line items, vendor metadata, totals, and tax. Same for the goods
            receipt note. The match runs on the extracted fields, not on a
            spreadsheet someone typed.
        </li>
        <li>
            <strong>Fuzzy normalization.</strong> &ldquo;Acme Corp&rdquo; on the
            invoice, &ldquo;Acme Corporation Inc.&rdquo; on the PO, and
            &ldquo;ACME CORP&rdquo; in the vendor master are the same supplier.
            Real systems normalize against a vendor master list with confidence
            scores, not exact-string equality.
        </li>
        <li>
            <strong>Agentic exception routing.</strong> A flagged invoice does not
            stop with a flag. An agent decides whether to ask the buyer for
            approval evidence, request a corrected invoice from the supplier,
            hold for receiving to post the GR, or route to a human reviewer with
            the full context attached. Each decision is policy-driven and
            logged for audit.
        </li>
    </ul>
    <p>
        The client-side tool above demonstrates the matching logic. The full
        system wraps it with the document intake, the normalization layer, and
        the routing agent.
    </p>
</GlossaryProse>

{/* Section 6 */}
<GlossaryH2 id="how-invaritech-builds" eyebrow="Section 06">
    How Invaritech builds three-way match automation
</GlossaryH2>
<GlossaryProse>
    <p>
        We build three-way match systems as fixed-scope engagements. Each build
        starts with a workflow audit, a written scope with acceptance criteria,
        and a 4 to 8 week build cycle. We sit on top of your existing accounting
        system (NetSuite, QuickBooks, Xero, SAP, MYOB), pull exports, ingest
        invoice documents from your supplier inbox, and run the match against
        your rules and your vendor master.
    </p>
    <p>
        Pricing on a starting three-way match system is USD 8k to 25k depending
        on workflow complexity, data sources, and rule count. The system
        handover includes documented rules, monitoring, and a deferred period
        where we tune the matcher against your first 30 days of real exception
        traffic.
    </p>
    <p>
        Adjacent proof for the kind of regulatory document workflows this style
        of build handles: we shipped the EU TRACES platform integration for a
        client&apos;s sustainability compliance program. Public review from
        Matthew Baldwin:{" "}
        <em>
            &ldquo;Aditi and her team did an excellent job with the development
            of an API with the EU&apos;s TRACES platform for our business. They
            are extremely professional, and we were very impressed by their
            skills, knowledge and reactivity.&rdquo;
        </em>{" "}
        That build handled a hundred-plus document types, regulatory exception
        routing, and evidence capture. The three-way match build pattern is the
        same shape applied to AP.
    </p>
</GlossaryProse>

{/* Section 7 — FAQ */}
<GlossaryH2 id="faq" eyebrow="Section 07">
    Frequently asked questions
</GlossaryH2>
<GlossaryProse>
    <FaqItem question="What's the difference between two-way and three-way matching?">
        Two-way match checks invoice against PO. Three-way adds the goods receipt
        note. The goods-receipt leg is the only control that catches fraudulent
        invoices for goods never delivered. Two-way match is fine for services,
        subscriptions, and other non-physical goods. Three-way is the standard
        for physical inventory and capex purchases.
    </FaqItem>
    <FaqItem question="What's an acceptable amount tolerance?">
        Most companies set 2 to 5 percent with a small dollar floor (typically
        $25 to $100) to handle freight and fuel surcharges without flagging
        every line. Tighter than 1 percent generates noise; looser than 10
        percent stops catching real variances. The right number is whatever your
        audit team has agreed to and can defend.
    </FaqItem>
    <FaqItem question="Do small businesses need three-way matching?">
        Below roughly 100 invoices a month, the manual cost of three-way match
        may exceed the loss from skipping it. Above that volume, the math
        flips. The most cost-effective entry point for small teams is automated
        duplicate-invoice detection plus PO-only match on amount, leaving the
        goods-receipt leg manual until volume justifies automating it.
    </FaqItem>
    <FaqItem question="Can three-way matching catch duplicate payments?">
        Yes, and it is one of the highest-value catches. The PO number is the
        join key. Two invoices referencing the same PO are by definition
        candidate duplicates, regardless of whether the invoice numbers, dates,
        or amounts match. The matcher above demonstrates this with the
        DUPLICATE_INVOICE status.
    </FaqItem>
    <FaqItem question="How long does AP automation take to implement?">
        A fixed-scope three-way match system from us takes 4 to 8 weeks from
        kick-off to production. Most of the time goes to data plumbing (export
        format edge cases, document intake reliability, vendor master
        normalization), not to the matching logic itself.
    </FaqItem>
    <FaqItem question="What about non-PO invoices?">
        Non-PO invoices (subscriptions, utilities, professional services without
        a formal PO) bypass three-way match by design. They run through a
        different control set: approval evidence by amount band, recurring-vendor
        spend monitoring, and budget-line matching. A three-way match system
        does not try to handle them; a complete AP exception system does.
    </FaqItem>
</GlossaryProse>

{/* Section 8 — Related entries (placeholder) */}
<GlossaryH2 id="related" eyebrow="Section 08">
    Related reading
</GlossaryH2>
<GlossaryProse>
    <ul className="space-y-2 list-disc pl-6">
        <li>
            <Link href="/work#document-matching" className="text-primary underline-offset-4 hover:underline">
                Invoice and Document Matching System — services overview
            </Link>
        </li>
        <li>
            <Link href="/resources/invoice-extractor" className="text-primary underline-offset-4 hover:underline">
                Invoice Extractor — extract structured fields from PDF invoices
            </Link>
        </li>
        <li>
            <Link href="/resources/supplier-payment-control-rule-table" className="text-primary underline-offset-4 hover:underline">
                Supplier Payment Control Rule Table — interactive rule reference
            </Link>
        </li>
    </ul>
</GlossaryProse>

{/* Footer primary CTA */}
<div className="mt-16 border-t border-border pt-10">
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                Ready to automate three-way matching?
            </p>
            <h3 className="mt-3 max-w-xl text-2xl font-medium text-foreground site-font-display">
                Book a free Finance Exception Audit.
            </h3>
            <p className="mt-3 max-w-xl text-base text-foreground-muted">
                We review your full AP workflow and recommend the smallest useful
                first system. Free during launch.
            </p>
        </div>
        <div className="flex md:justify-end">
            <Link href="/contact" className="site-button px-7">
                Book the audit
                <span className="ml-2 font-mono text-xs opacity-70">↗</span>
            </Link>
        </div>
    </div>
</div>
```

- [ ] **Step 2: Add the `FaqItem` helper**

Add this helper component below `GlossaryProse` in the same file:

```tsx
function FaqItem({ question, children }: { question: string; children: React.ReactNode }) {
    return (
        <details className="border-b border-border py-4">
            <summary className="cursor-pointer text-lg font-medium text-foreground site-font-display">
                {question}
            </summary>
            <div className="mt-3 text-foreground-muted">{children}</div>
        </details>
    );
}
```

- [ ] **Step 3: Build and visually verify**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green. All 8 sections render. FAQ items expand/collapse.

- [ ] **Step 4: Commit**

```bash
git add app/glossary/three-way-match/page.tsx
git commit -m "feat(glossary): long-form sections 5-8 + FAQ + footer CTA"
```

---

## Task 14: Schema markup (JSON-LD)

**Files:**
- Create: `lib/seo/three-way-match-schema.ts`
- Create: `tests/three-way-match-schema.test.mjs`
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Write failing tests for schema generators**

Write `tests/three-way-match-schema.test.mjs`:

```javascript
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    buildBreadcrumbSchema,
    buildArticleSchema,
    buildFaqSchema,
} from "../lib/seo/three-way-match-schema.ts";

describe("buildBreadcrumbSchema", () => {
    it("emits an itemListElement with three positions", () => {
        const schema = buildBreadcrumbSchema();
        assert.equal(schema["@type"], "BreadcrumbList");
        assert.equal(schema.itemListElement.length, 3);
        assert.equal(schema.itemListElement[0].position, 1);
        assert.equal(schema.itemListElement[2].name, "Three-Way Match");
    });
});

describe("buildArticleSchema", () => {
    it("emits Article type with author sameAs LinkedIn + Scholar", () => {
        const schema = buildArticleSchema({ lastUpdated: "2026-05-25" });
        assert.equal(schema["@type"], "Article");
        assert.equal(schema.author.name, "Aditi Garg");
        assert.ok(schema.author.sameAs.some((u) => u.includes("linkedin.com")));
        assert.ok(schema.author.sameAs.some((u) => u.includes("scholar.google.com")));
        assert.equal(schema.articleSection, "Glossary");
    });
});

describe("buildFaqSchema", () => {
    it("emits FAQPage with exactly 6 Question entries", () => {
        const schema = buildFaqSchema();
        assert.equal(schema["@type"], "FAQPage");
        assert.equal(schema.mainEntity.length, 6);
        for (const q of schema.mainEntity) {
            assert.equal(q["@type"], "Question");
            assert.equal(q.acceptedAnswer["@type"], "Answer");
            assert.ok(q.name.length > 0);
            assert.ok(q.acceptedAnswer.text.length > 0);
        }
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --experimental-strip-types --test tests/three-way-match-schema.test.mjs 2>&1 | tail -10`

Expected: 3 failures because module missing.

- [ ] **Step 3: Implement schema generators**

Write `lib/seo/three-way-match-schema.ts`:

```typescript
const PAGE_URL = "https://www.invaritech.ai/glossary/three-way-match/";
const SITE_URL = "https://www.invaritech.ai/";

export function buildBreadcrumbSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Invaritech", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}glossary/` },
            { "@type": "ListItem", position: 3, name: "Three-Way Match", item: PAGE_URL },
        ],
    };
}

export function buildArticleSchema({ lastUpdated }: { lastUpdated: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Three-Way Match: Invoice, PO, and Goods Receipt Matching",
        description:
            "How three-way matching works between invoice, purchase order, and goods receipt — what an agentic exception-routing system catches that manual review misses.",
        mainEntityOfPage: PAGE_URL,
        articleSection: "Glossary",
        datePublished: lastUpdated,
        dateModified: lastUpdated,
        author: {
            "@type": "Person",
            name: "Aditi Garg",
            jobTitle: "Founder & Director",
            worksFor: { "@type": "Organization", name: "Invaritech" },
            sameAs: [
                "https://www.linkedin.com/in/aditigarg95",
                "https://scholar.google.com/citations?user=0WE3rSUAAAAJ",
            ],
        },
        publisher: {
            "@type": "Organization",
            name: "Invaritech",
            url: SITE_URL,
        },
    };
}

const FAQ_ENTRIES: { q: string; a: string }[] = [
    {
        q: "What's the difference between two-way and three-way matching?",
        a: "Two-way match checks invoice against PO. Three-way adds the goods receipt note. The goods-receipt leg is the only control that catches fraudulent invoices for goods never delivered. Two-way is fine for services and subscriptions. Three-way is the standard for physical inventory and capex purchases.",
    },
    {
        q: "What's an acceptable amount tolerance?",
        a: "Most companies set 2 to 5 percent with a small dollar floor (typically $25 to $100) to handle freight and fuel surcharges without flagging every line. Tighter than 1 percent generates noise; looser than 10 percent stops catching real variances.",
    },
    {
        q: "Do small businesses need three-way matching?",
        a: "Below roughly 100 invoices per month, the manual cost of three-way matching may exceed the loss from skipping it. Above that volume the math flips. The most cost-effective entry point for small teams is automated duplicate-invoice detection plus PO-only match on amount.",
    },
    {
        q: "Can three-way matching catch duplicate payments?",
        a: "Yes, and it is one of the highest-value catches. The PO number is the join key. Two invoices referencing the same PO are by definition candidate duplicates, regardless of whether the invoice numbers, dates, or amounts match.",
    },
    {
        q: "How long does AP automation take to implement?",
        a: "A fixed-scope three-way match system typically takes 4 to 8 weeks from kick-off to production. Most of the time goes to data plumbing (export format edge cases, document intake reliability, vendor master normalization), not to the matching logic itself.",
    },
    {
        q: "What about non-PO invoices?",
        a: "Non-PO invoices (subscriptions, utilities, professional services without a formal PO) bypass three-way match by design. They run through a different control set: approval evidence by amount band, recurring-vendor spend monitoring, and budget-line matching.",
    },
];

export function buildFaqSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ENTRIES.map((e) => ({
            "@type": "Question",
            name: e.q,
            acceptedAnswer: { "@type": "Answer", text: e.a },
        })),
    };
}
```

- [ ] **Step 4: Run schema tests**

Run: `node --experimental-strip-types --test tests/three-way-match-schema.test.mjs 2>&1 | tail -10`

Expected: all 3 tests pass.

- [ ] **Step 5: Wire schemas into the page**

In `app/glossary/three-way-match/page.tsx`, add the imports at the top:

```tsx
import {
    buildBreadcrumbSchema,
    buildArticleSchema,
    buildFaqSchema,
} from "@/lib/seo/three-way-match-schema";
```

Inside the `ThreeWayMatchPage` component, at the top of the `return (` block, before `<main>`:

```tsx
const schemas = [
    buildBreadcrumbSchema(),
    buildArticleSchema({ lastUpdated: "2026-05-25" }),
    buildFaqSchema(),
];

return (
    <>
        {schemas.map((schema, i) => (
            <script
                key={i}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        ))}
        <main className="site-page">
            {/* ...existing content... */}
        </main>
    </>
);
```

- [ ] **Step 6: Build check**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green.

- [ ] **Step 7: Commit**

```bash
git add lib/seo/three-way-match-schema.ts tests/three-way-match-schema.test.mjs app/glossary/three-way-match/page.tsx
git commit -m "feat(glossary): JSON-LD schemas for Article + FAQPage + BreadcrumbList"
```

---

## Task 15: Wire analytics events to primary CTAs

**Files:**
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Create a client-side CTA tracker component**

Create `components/glossary/glossary-primary-cta.tsx`:

```tsx
"use client";

import Link from "next/link";
import { trackGlossaryEvent } from "@/lib/analytics/glossary-events";

type Props = {
    location: "hero" | "mid" | "footer";
    label: string;
    href?: string;
};

export function GlossaryPrimaryCTA({ location, label, href = "/contact" }: Props) {
    return (
        <Link
            href={href}
            className="site-button px-7"
            onClick={() => trackGlossaryEvent("cta_click", { location })}
        >
            {label}
            <span className="ml-2 font-mono text-xs opacity-70">↗</span>
        </Link>
    );
}
```

- [ ] **Step 2: Replace the three `<Link href="/contact" className="site-button px-7">...</Link>` instances**

In `app/glossary/three-way-match/page.tsx`:

- Hero CTA: `<GlossaryPrimaryCTA location="hero" label="Book a free Finance Exception Audit" />`
- Mid-page CTA: `<GlossaryPrimaryCTA location="mid" label="Book the audit" />`
- Footer CTA: `<GlossaryPrimaryCTA location="footer" label="Book the audit" />`

Add the import:

```tsx
import { GlossaryPrimaryCTA } from "@/components/glossary/glossary-primary-cta";
```

- [ ] **Step 3: Build check**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green.

- [ ] **Step 4: Manual analytics verification (dev only)**

Run: `pnpm dev` (background). Load `http://localhost:3000/glossary/three-way-match/`. Open DevTools Network tab. Filter for `gtag` or `google-analytics`. Click "Book the audit" — verify a `cta_click` event fires. Click "Match now" — verify a `glossary_tool_run` event fires.

Expected: both events appear in Network tab.

- [ ] **Step 5: Commit**

```bash
git add components/glossary/glossary-primary-cta.tsx app/glossary/three-way-match/page.tsx
git commit -m "feat(glossary): wire CTA click + tool run analytics events"
```

---

## Task 16: Secondary CTA form (below tool results)

**Files:**
- Create: `components/glossary/three-way-matcher-secondary-cta.tsx`
- Create: `app/api/glossary/secondary-cta/route.ts`
- Modify: `components/glossary/three-way-matcher.tsx`

- [ ] **Step 1: Create the API route**

Write `app/api/glossary/secondary-cta/route.ts`:

```typescript
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Manual handling for first 5-10 submissions. Stores nothing server-side
 * yet; emails the submission to the team for manual processing.
 *
 * NOTE: This is a stub. The Sheets append + email send must be wired before
 * the page goes live. See lib/sheets.ts for the existing leads pattern.
 */
export async function POST(request: Request) {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const invoiceCsv = formData.get("invoiceCsv");
    const poCsv = formData.get("poCsv");
    const grCsv = formData.get("grCsv");

    const payload = {
        email,
        hasInvoiceCsv: invoiceCsv instanceof File && invoiceCsv.size > 0,
        hasPoCsv: poCsv instanceof File && poCsv.size > 0,
        hasGrCsv: grCsv instanceof File && grCsv.size > 0,
        timestamp: new Date().toISOString(),
        source: "glossary/three-way-match",
    };

    // TODO before launch: forward to Sheets via lib/sheets.ts and email via
    // existing contact pipeline. For now, log to server console.
    console.log("[glossary-secondary-cta]", payload);

    return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Build the CTA form component**

Write `components/glossary/three-way-matcher-secondary-cta.tsx`:

```tsx
"use client";

import { useState } from "react";
import { trackGlossaryEvent } from "@/lib/analytics/glossary-events";

export function ThreeWayMatcherSecondaryCTA() {
    const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");
        setError(null);

        const form = e.currentTarget;
        const data = new FormData(form);

        const hasInvoice = (data.get("invoiceCsv") as File | null)?.size ?? 0;
        const hasPo = (data.get("poCsv") as File | null)?.size ?? 0;
        const hasGr = (data.get("grCsv") as File | null)?.size ?? 0;

        try {
            const res = await fetch("/api/glossary/secondary-cta", { method: "POST", body: data });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j.error ?? "Submission failed");
            }
            setStatus("sent");
            trackGlossaryEvent("glossary_secondary_cta_submit", {
                has_invoice_csv: hasInvoice > 0,
                has_po_csv: hasPo > 0,
                has_gr_csv: hasGr > 0,
            });
            form.reset();
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Submission failed");
        }
    }

    if (status === "sent") {
        return (
            <div className="border border-primary/40 bg-primary/5 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    Received
                </p>
                <p className="mt-2 text-sm text-foreground">
                    We&apos;ll send back a one-page exception report within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="border border-border bg-card/40 p-6">
            <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-primary/60" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                    Run on your real export
                </p>
            </div>
            <p className="text-foreground">
                Want this running on your real AP export?
            </p>
            <p className="mt-2 max-w-2xl text-sm text-foreground-muted">
                Drop your invoice, PO, and goods-receipt CSVs. We will run the full
                server-side matcher with OCR, fuzzy vendor normalization, and agentic
                exception routing, and send back a one-page exception report within 24
                hours. No call required.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                        Work email
                    </span>
                    <input
                        type="email"
                        name="email"
                        required
                        className="border border-border bg-background px-3 py-2 text-sm text-foreground"
                        placeholder="you@company.com"
                    />
                </label>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
                <FileInput name="invoiceCsv" label="Invoice CSV" />
                <FileInput name="poCsv" label="PO CSV" />
                <FileInput name="grCsv" label="GR CSV (optional)" />
            </div>

            <div className="mt-5 flex items-center gap-4">
                <button type="submit" disabled={status === "submitting"} className="site-button px-7 disabled:opacity-50">
                    {status === "submitting" ? "Sending…" : "Send for analysis"}
                    <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                </button>
                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
            </div>
        </form>
    );
}

function FileInput({ name, label }: { name: string; label: string }) {
    return (
        <label className="flex cursor-pointer flex-col items-center gap-1 border border-dashed border-border bg-background p-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle hover:border-primary/50">
            <span>{label}</span>
            <input type="file" name={name} accept=".csv,.tsv,text/csv,text/tab-separated-values" className="hidden" />
        </label>
    );
}
```

- [ ] **Step 3: Wire secondary CTA into matcher wrapper**

In `components/glossary/three-way-matcher.tsx`, after `<ThreeWayMatcherResults ... />` and before `<PrivacyCallout />`:

```tsx
import { ThreeWayMatcherSecondaryCTA } from "./three-way-matcher-secondary-cta";

// inside the return:
<ThreeWayMatcherResults results={results} onFilterChange={handleFilterChange} />
{results.length > 0 && <ThreeWayMatcherSecondaryCTA />}
<PrivacyCallout />
```

- [ ] **Step 4: Build check**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green, new POST route appears as `ƒ /api/glossary/secondary-cta`.

- [ ] **Step 5: Commit**

```bash
git add app/api/glossary/secondary-cta/route.ts components/glossary/three-way-matcher-secondary-cta.tsx components/glossary/three-way-matcher.tsx
git commit -m "feat(glossary): secondary CTA form + manual-handling API stub"
```

---

## Task 17: Internal linking audit

**Files:**
- Modify: `components/exception-automation-home.tsx` (homepage REGISTER row)
- Modify: `app/work/eudr-compliance-bridge/page.tsx` (case study cross-reference)
- Optional: `components/site-footer.tsx` (if exists) — add Glossary block

- [ ] **Step 1: Grep for candidate insertion points**

Run:

```bash
grep -rn "three-way\|three way\|invoice matching\|document matching" \
    /Users/avi/Documents/Projects/Webdev/invaritech-visionary-launch/{app,components,lib} \
    --include="*.tsx" --include="*.ts" \
    2>/dev/null | grep -v "node_modules\|\.next" | head -30
```

Expected: list of matches. Review each, decide per-match action.

- [ ] **Step 2: Update homepage REGISTER row**

In `components/exception-automation-home.tsx`, find the row:

```typescript
{
    idx: "04",
    name: "Invoice And Document Matching System",
    catches: "Compares invoices, POs, delivery notes, and service evidence. Surfaces what does not match.",
    price: "USD 8k to 25k",
    href: "/work#document-matching",
},
```

Change `href` to `/glossary/three-way-match/` (the glossary page now serves as the primary educational reference; the `/work#document-matching` anchor stays as is and is reachable via the page footer).

- [ ] **Step 3: Add cross-reference in EUDR case study**

Open `app/work/eudr-compliance-bridge/page.tsx`. Find an appropriate paragraph about the document workflow / exception routing approach. Add an inline link reference such as:

```tsx
{" "}The same exception-routing approach is described in our{" "}
<Link href="/glossary/three-way-match/" className="underline-offset-4 hover:underline text-primary">
    three-way match glossary entry
</Link>
.
```

If `app/work/eudr-compliance-bridge/page.tsx` does not exist, skip this step and note the gap.

- [ ] **Step 4: Check for site footer**

Run:

```bash
find /Users/avi/Documents/Projects/Webdev/invaritech-visionary-launch -name "site-footer*" -o -name "footer*" 2>/dev/null | grep -v node_modules | head -5
```

If a footer component exists with a "Resources" or "Links" block, add a new link entry pointing to `/glossary/three-way-match/` labeled "Three-Way Match Glossary". If no footer block exists, skip and add this as a follow-up task.

- [ ] **Step 5: Add page to sitemap if dynamic sitemap exists**

Run:

```bash
ls /Users/avi/Documents/Projects/Webdev/invaritech-visionary-launch/app/sitemap* 2>/dev/null
```

If `app/sitemap.ts` or `app/sitemap.xml/route.ts` exists, add the new URL with appropriate priority (0.7). If the sitemap is filesystem-derived by Next, no action needed.

- [ ] **Step 6: Build check**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green, no broken links.

- [ ] **Step 7: Commit**

```bash
git add components/exception-automation-home.tsx app/work/eudr-compliance-bridge/page.tsx
git commit -m "feat(glossary): internal linking audit — homepage + EUDR cross-reference"
```

(Append `components/site-footer.tsx` and `app/sitemap.ts` to `git add` if they were modified.)

---

## Task 18: Mobile responsive polish

**Files:**
- Modify: `components/glossary/three-way-matcher-input.tsx`
- Modify: `components/glossary/three-way-matcher-results.tsx`
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Resize matcher textareas on mobile**

In `components/glossary/three-way-matcher-input.tsx`, change the textarea height for mobile:

```tsx
className="h-48 md:h-64 w-full resize-y border border-border bg-background p-3 font-mono text-[12px] leading-relaxed text-foreground"
```

- [ ] **Step 2: Make results table horizontally scrollable with hint**

In `components/glossary/three-way-matcher-results.tsx`, wrap the table block (the `<div className="overflow-x-auto">`) and add a hint above on small screens:

```tsx
<p className="border-b border-border bg-card/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle md:hidden">
    Scroll table horizontally →
</p>
<div className="overflow-x-auto">
    {/* existing table */}
</div>
```

- [ ] **Step 3: Verify on mobile breakpoint**

Run: `pnpm dev`. Load `http://localhost:3000/glossary/three-way-match/`. Use browser dev tools, set viewport to 375px (iPhone SE). Verify:
- Tabs appear and switch between Invoice/PO/GR
- Single textarea visible at a time
- Match button still reachable
- Results table scrolls horizontally
- All long-form sections readable, no overflow

Expected: layout is usable on 375px viewport. Take a screenshot for the record.

- [ ] **Step 4: Build check**

Run: `pnpm build 2>&1 | tail -10`

Expected: build green.

- [ ] **Step 5: Commit**

```bash
git add components/glossary/three-way-matcher-input.tsx components/glossary/three-way-matcher-results.tsx
git commit -m "feat(glossary): mobile responsive polish for matcher tool"
```

---

## Task 19: Final validation pass

**Files:** none (validation only)

- [ ] **Step 1: Run all tests**

Run:

```bash
node --experimental-strip-types --test tests/three-way-match-engine.test.mjs tests/three-way-match-csv-parser.test.mjs tests/three-way-match-schema.test.mjs 2>&1 | tail -10
```

Expected: 0 failures across all test files.

- [ ] **Step 2: Production build**

Run: `pnpm build 2>&1 | tail -30`

Expected:
- Build succeeds
- `/glossary/three-way-match` listed as `○` (static)
- `/api/glossary/secondary-cta` listed as `ƒ` (dynamic)
- No build warnings about missing metadata or unused exports
- Bundle size for the glossary page route is reasonable (< 150 KB First Load JS)

- [ ] **Step 3: Schema validation (manual)**

Once a preview deploy is live:
1. Open `https://search.google.com/test/rich-results`
2. Enter the preview URL
3. Verify all 3 schemas detected: Article, FAQPage, BreadcrumbList
4. No critical errors

If preview deploy unavailable, validate the rendered HTML locally:

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/glossary/three-way-match/ | grep -oE '<script type="application/ld\+json">[^<]+</script>' | head -3
```

Expected: 3 JSON-LD blocks present in HTML output.

- [ ] **Step 4: Lighthouse pass**

Run a Lighthouse audit on the preview URL (or `localhost:3000/glossary/three-way-match/`):
- Performance > 90
- Accessibility > 95
- Best Practices > 95
- SEO = 100

If any score falls below, file follow-up tasks but do not block the launch.

- [ ] **Step 5: Visual review checklist**

Eyeball the page on desktop (1440px) and mobile (375px). Verify:
- Hero renders with breadcrumb, eyebrow, H1, lede, byline, two CTAs, working tool
- Tool: paste sample renders 18 invoice rows with all 8 statuses surfaced
- Filter chips work, table sorts
- Sections 1-8 all render with consistent eyebrow + H2 + body
- Mid-page and footer CTAs visible
- FAQ items expand/collapse
- No console errors in browser DevTools
- All inline links navigate correctly

- [ ] **Step 6: Final commit if any tweaks needed**

If polish edits required:

```bash
git add -p   # interactive, only stage relevant hunks
git commit -m "polish(glossary): final visual + accessibility pass"
```

- [ ] **Step 7: Tag for tracking**

```bash
git log --oneline | head -20  # confirm clean history
```

The branch is ready for review and merge.

---

## Self-Review Notes

**Spec coverage check:** All 15 grilling decisions from the design doc map to tasks:
- URL/route → Task 1
- Tool input (textareas + CSV + sample) → Tasks 5, 7, 10
- Two-way vs three-way → Tasks 4, 6
- Schema → Tasks 1, 2 (types), 5 (parser)
- Tolerance dropdown → Task 7
- Results display → Task 8
- Tool position → Task 11
- Content depth/sections → Tasks 12, 13
- CTAs (primary + secondary) → Tasks 11, 12, 13, 15, 16
- Schema markup → Task 14
- Visual style (lighter doc-aesthetic) → applied across Tasks 7, 8, 11, 12, 13
- Byline + sameAs → Task 11 + Task 14 (Article schema)
- Glossary index deferred → noted in design doc, no task
- Analytics events → Tasks 9, 15, 16
- Internal linking C → Task 17

**Type consistency check:** `MatchResult`, `MatchStatus`, `InvoiceRow`, `PoRow`, `GrRow`, `MatchOptions` defined in Task 1, used consistently across Tasks 2-9. `FilterKey` defined in Task 8 results component, used in Task 9 wrapper. `GlossaryEventName` defined in Task 9 analytics file, used in Tasks 9, 10, 15, 16.

**Placeholder scan:** One known placeholder is the API route stub at `app/api/glossary/secondary-cta/route.ts` — it console.logs instead of writing to Sheets. This is intentional and documented in the route comments per the design doc's "manual handling of first 5-10 submissions" decision. Before launch, this must be wired through `lib/sheets.ts` following the existing leads pattern. Adding that follow-up task here:

**Follow-up after first traffic:**
1. Wire `/api/glossary/secondary-cta` to Sheets via `lib/sheets.ts` and email pipeline
2. Build `/glossary/` index page when entries 2-5 are scoped
3. Build `/glossary/duplicate-invoice-detection/` (next cluster page)
4. Build `/glossary/accounts-payable-process/` (next cluster page)
5. Replace Aditi byline bio with finance-domain proof (real AP client outcome) when available

---

Plan complete. 19 tasks, ~50 commits, TDD on match engine + CSV parser + schema generators, manual validation on UI.
