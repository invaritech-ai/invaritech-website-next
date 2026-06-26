# Copy Sharpening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every drift label and weak phrasing on the site with the locked Invaritech DNA copy. Single CTA name everywhere (`Book a Finance Exception Audit Call`). Avi voice in all body prose: no em dashes, no decorative italic, short sentences, active verbs. Money page and homepage hero now share the same memorable phrase (`Move faster without adding headcount.`).

**Architecture:** Pure copy pass on `components/home/*.tsx`, `app/finance-exception-automation/page.tsx`, `app/page.tsx`, `app/glossary/three-way-match/page.tsx`, and the contact / about / work / blog / payment-control / resource-library callsites. Highest-leverage edit (the `AuditCTA` `DEFAULT_LABEL` constant) lands first; hardcoded callsite strings sweep next; section-by-section page copy rewrites follow. No new files, no logic changes, no schema changes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript. Build via `pnpm build`. Tests via `node --experimental-strip-types --test tests/*.test.mjs`.

**Design doc:** `docs/plans/2026-05-26-copy-sharpening-design.md`

**Branch:** `brand-story-copy-update` (continue on it; do not switch)

---

## File Structure

**Modified (only):**

```
components/home/_shared/audit-cta.tsx           DEFAULT_LABEL string change
components/home/cover-hero.tsx                  Both variants' COPY entries
components/home/problem.tsx                     Both variants' COPY entries
components/home/service-method.tsx              Both variants + step 5 active voice
components/home/audit-cta-section.tsx           Both variants' COPY entries
components/home/proof-grid.tsx                  Card arrays + both meta strings
components/home/demo-preview.tsx                Inline JSX text
components/home/systems-register.tsx            SYSTEMS array "catches" strings
components/home/why-not-accounting.tsx          Lede + meta + footer + table row 5
components/home/final-cta.tsx                   Inline JSX text
components/home/what-we-automate.tsx            CARDS array
components/home/finance-first-focus.tsx         Inline JSX paragraphs

app/glossary/three-way-match/page.tsx           Eyebrow + Related Reading + drop AuditCTA labels
app/finance-exception-automation/page.tsx       Metadata only
app/page.tsx                                    Metadata only
app/contact/page.tsx                            audit-mode eyebrow + H1 + lead + CTA label

app/about/page.tsx                              One CTA label string
app/blog/page.tsx                               One CTA label string
app/blog/[slug]/page.tsx                        Two CTA label strings
app/work/page.tsx                               One CTA label string
app/work/eudr-compliance-bridge/page.tsx        One CTA label string
components/payment-control-home.tsx             Three CTA label strings
components/resource-library-client.tsx          One CTA label string

tests/seo-metadata.test.mjs                     One regex assertion update
```

No files created. No files deleted.

---

## Task 1: Safety baseline

**Files:** none (verification only)

- [ ] **Step 1: Confirm branch and working state**

```bash
git rev-parse --abbrev-ref HEAD
git status --short
```

Expected: branch is `brand-story-copy-update`; working tree clean.

- [ ] **Step 2: Confirm design doc exists**

```bash
test -f docs/plans/2026-05-26-copy-sharpening-design.md && echo "OK"
```

Expected: `OK`.

- [ ] **Step 3: Confirm current test suite is green**

```bash
node --experimental-strip-types --test tests/*.test.mjs 2>&1 | tail -10
```

Expected: 0 failures. (Internal-links test and seo-metadata test passing as of last validation.)

- [ ] **Step 4: Confirm build is green**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. No "site-font-display" warning.

- [ ] **Step 5: Baseline CTA label count**

```bash
grep -rn "Book a Finance Workflow Audit" app components --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules\|\.next" | wc -l
```

Expected: ~17 occurrences. After full plan executes, this count must drop to 0.

No commit (verification only).

---

## Task 2: AuditCTA DEFAULT_LABEL change

**Files:**
- Modify: `components/home/_shared/audit-cta.tsx`

The default label is the single source of truth for every callsite that doesn't override. Changing it here cascades to ~5 callsites instantly. Remaining ~13 callsites still hardcode the old label as `label="…"` overrides; those get swept in Task 3.

- [ ] **Step 1: Read the current default**

```bash
grep -n "DEFAULT_LABEL" components/home/_shared/audit-cta.tsx
```

Expected: line 25 (approximately) reads `const DEFAULT_LABEL = "Book a Finance Workflow Audit";`

- [ ] **Step 2: Update the default**

Replace this exact line in `components/home/_shared/audit-cta.tsx`:

```typescript
const DEFAULT_LABEL = "Book a Finance Workflow Audit";
```

With:

```typescript
const DEFAULT_LABEL = "Book a Finance Exception Audit Call";
```

- [ ] **Step 3: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 4: Test check (the seo-metadata test will partially fail; that's expected and gets fixed in Task 11)**

```bash
node --experimental-strip-types --test tests/site-cta.test.mjs tests/utm-capture.test.mjs tests/internal-links.test.mjs 2>&1 | tail -10
```

Expected: 0 failures on these three suites.

```bash
node --experimental-strip-types --test tests/seo-metadata.test.mjs 2>&1 | tail -15
```

May fail on the assertion checking `app/contact/page.tsx` for `/"Book a Finance Workflow Audit"/`. That's expected. Task 11 fixes the test alongside the contact page update.

- [ ] **Step 5: Commit**

```bash
git add components/home/_shared/audit-cta.tsx
git commit -m "feat(cta): change AuditCTA default label to Book a Finance Exception Audit Call"
```

---

## Task 3: Site-sweep hardcoded CTA label strings

**Files (modify each):**
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/work/page.tsx`
- `app/work/eudr-compliance-bridge/page.tsx`
- `components/payment-control-home.tsx`
- `components/resource-library-client.tsx`

Each contains one or more occurrences of the literal string `Book a Finance Workflow Audit`. Replace every occurrence with `Book a Finance Exception Audit Call`. Do NOT touch `app/contact/page.tsx` (handled in Task 11) or `components/home/cover-hero.tsx` (handled in Task 4).

- [ ] **Step 1: Audit each file**

```bash
grep -n "Book a Finance Workflow Audit" app/about/page.tsx app/blog/page.tsx "app/blog/[slug]/page.tsx" app/work/page.tsx app/work/eudr-compliance-bridge/page.tsx components/payment-control-home.tsx components/resource-library-client.tsx 2>/dev/null
```

Expected hits (line numbers approximate):

```
app/about/page.tsx:187
app/blog/page.tsx:111
app/blog/[slug]/page.tsx:332
app/blog/[slug]/page.tsx:347
app/work/page.tsx:175
app/work/eudr-compliance-bridge/page.tsx:326
components/payment-control-home.tsx:156
components/payment-control-home.tsx:329
components/payment-control-home.tsx:402
components/resource-library-client.tsx:189
```

Total: ~10 hits across 7 files.

- [ ] **Step 2: Replace every occurrence**

For each file in the list above, replace every `Book a Finance Workflow Audit` with `Book a Finance Exception Audit Call`. Preserve surrounding markup (className, ArrowRight icons, JSX whitespace).

If a callsite passes the label as a prop to `<AuditCTA>` (i.e. `<AuditCTA ... label="Book a Finance Workflow Audit" />`), prefer dropping the explicit `label=` prop entirely so it inherits the new default. Only keep the override if it's truly a custom label.

- [ ] **Step 3: Verify no occurrences remain in this file set**

```bash
grep -n "Book a Finance Workflow Audit" app/about/page.tsx app/blog/page.tsx "app/blog/[slug]/page.tsx" app/work/page.tsx app/work/eudr-compliance-bridge/page.tsx components/payment-control-home.tsx components/resource-library-client.tsx 2>/dev/null
```

Expected: empty output.

- [ ] **Step 4: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx app/blog/page.tsx "app/blog/[slug]/page.tsx" app/work/page.tsx app/work/eudr-compliance-bridge/page.tsx components/payment-control-home.tsx components/resource-library-client.tsx
git commit -m "feat(cta): site-sweep update of hardcoded audit CTA labels"
```

---

## Task 4: Cover hero copy — both variants

**Files:**
- Modify: `components/home/cover-hero.tsx`

The file contains a `COPY` object with two keys (`homepage` and `landing`). Replace both entries in full.

- [ ] **Step 1: Replace the `COPY` object**

Find the existing `const COPY: Record<Variant, { ... }> = { homepage: { ... }, landing: { ... } };` block. Replace the contents of `COPY` entirely with:

```typescript
const COPY: Record<Variant, {
    headlineLines: React.ReactNode;
    subhead: string;
    primaryLabel: string;
    primaryLocation: "hero";
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    trustLine: string;
    bottomStrip: string;
}> = {
    homepage: {
        headlineLines: (
            <>
                Move faster without
                <br />
                adding headcount.
            </>
        ),
        subhead:
            "Invaritech builds workflow automation systems for document-heavy operations, starting with finance exception automation. We help growing companies catch finance exceptions before they become rework, leakage, or another hire.",
        primaryLabel: "Book a Finance Exception Audit Call",
        primaryLocation: "hero",
        primaryHref: "/contact?audit=1",
        secondaryLabel: "Explore Finance Exception Systems",
        secondaryHref: "/finance-exception-automation",
        trustLine:
            "Built for growing companies on Xero, MYOB, QuickBooks, NetSuite, and document-heavy finance workflows.",
        bottomStrip:
            "Finance exception automation. Regulatory document workflows. Operations approval gaps. Built on top of your existing systems, not in place of them.",
    },
    landing: {
        headlineLines: (
            <>
                Move faster without
                <br />
                adding headcount.
            </>
        ),
        subhead:
            "Invaritech builds finance exception automation systems for growing teams. We catch duplicate invoices, vendor-detail changes, approval gaps, and payment-control risks before they become rework, leakage, or another hire.",
        primaryLabel: "Book a Finance Exception Audit Call",
        primaryLocation: "hero",
        primaryHref: "/contact?audit=1",
        secondaryLabel: "See Finance Exception Systems",
        secondaryHref: "#systems",
        trustLine:
            "Built for growing companies on Xero, MYOB, QuickBooks, NetSuite, and spreadsheet-driven finance workflows.",
        bottomStrip:
            "Duplicate invoices. Vendor bank changes. Missing approvals. Mismatched documents. Caught before payment.",
    },
};
```

- [ ] **Step 2: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

- [ ] **Step 3: Smoke check**

```bash
grep -n "Book a Finance Workflow Audit" components/home/cover-hero.tsx
```

Expected: empty.

- [ ] **Step 4: Commit**

```bash
git add components/home/cover-hero.tsx
git commit -m "feat(home): cover hero copy with locked DNA for both variants"
```

---

## Task 5: Money page mid — problem (finance), demo-preview, systems-register

**Files:**
- Modify: `components/home/problem.tsx`
- Modify: `components/home/demo-preview.tsx`
- Modify: `components/home/systems-register.tsx`

### Step 1: `problem.tsx` — finance variant copy

In `components/home/problem.tsx`, find the `finance` key inside the `COPY` object. Replace its entire value with:

```typescript
finance: {
    title: "Your accounting system stores the transaction. Your team still checks the exceptions.",
    meta: "Six pain patterns. All AP.",
    railKey: "The problem",
    railBody:
        "Finance teams do not lose time because they lack software. They lose time because the checks still happen across inboxes, spreadsheets, PDFs, approval trails, and human memory.",
    bodyParagraphs: [
        <ul key="finance-pain-bullets" className="problem-pain-list">
            <li>Duplicate supplier bills</li>
            <li>Invoice, PO, and receipt mismatches</li>
            <li>Vendor bank-detail changes</li>
            <li>Missing approval evidence</li>
            <li>Unusual amounts or descriptions</li>
            <li>Documents scattered across email, folders, and accounting exports</li>
        </ul>,
        <>If your team runs these checks by hand every week, that workflow is ready to automate.</>,
    ],
    gapCells: [
        { name: "Accounting", stores: "Transactions, vendor master, GL codes." },
        { name: "Inbox", stores: "PDFs, emails, scanned bills, approvals." },
        { name: "Spreadsheet", stores: "Exception list, reviewer notes, hold flags." },
        { name: "Approval tool", stores: "Sign-offs, evidence, audit history." },
    ],
    gapCaption: (
        <>
            The data lives in the systems. The work happens in the gaps. Checking.
            Matching. Chasing. Approving.
        </>
    ),
},
```

(Leave the `broad` variant untouched in this task — it's handled in Task 8.)

### Step 2: `demo-preview.tsx`

Replace the entire `DemoPreview` function body (everything inside the outer `<section>`) so the section reads:

```tsx
<section id="demo" className="doc-section border-t border-border bg-card/40">
    <div className="doc-container">
        <motion.header {...fadeUp} className="section-mark">
            <h2 className="section-mark-title">
                See it work on three documents.
            </h2>
            <span className="section-mark-meta">Live demo · in-browser</span>
        </motion.header>

        <motion.div {...fadeUp} className="demo-preview-grid">
            <div className="demo-preview-copy">
                <p>
                    Open the matcher. Paste invoice, PO, and goods-receipt rows.
                    Watch it flag duplicates, amount variances, missing receipts,
                    vendor mismatches, and three more exception types. Runs in your
                    browser. Your data never leaves the page.
                </p>
                <p className="demo-preview-reminder">
                    Three-way matching is one example. The same pattern works for
                    duplicate bills, vendor changes, approval gaps, and other
                    payment-control checks.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/glossary/three-way-match/"
                        className="site-button audit-cta"
                    >
                        Try the demo
                        <span className="audit-cta-arrow" aria-hidden>↗</span>
                    </Link>
                    <Link
                        href="/contact?audit=1"
                        className="site-button-secondary audit-cta"
                    >
                        Book a walkthrough
                    </Link>
                </div>
            </div>

            <Link
                href="/glossary/three-way-match/"
                className="demo-preview-tile"
                aria-label="Open the three-way matcher demo"
            >
                <picture>
                    <source
                        srcSet="/images/finance/three-way-matcher-preview.webp"
                        type="image/webp"
                    />
                    <img
                        src="/images/finance/three-way-matcher-preview.png"
                        alt="Three-way matcher results showing matched, variance, missing, and duplicate invoice statuses"
                        loading="lazy"
                        width={1280}
                        height={720}
                        className="demo-preview-image"
                    />
                </picture>
                <span className="demo-preview-badge">Live demo · in-browser</span>
            </Link>
        </motion.div>
    </div>
</section>
```

### Step 3: `systems-register.tsx` — `catches` strings only

Locate the `SYSTEMS: System[]` array. Update only the `catches` string for each of the 5 cards. Leave names, idx, anchor, price, href, and detail panels untouched.

```typescript
// System 01
catches: "Catches exact and near-duplicate supplier bills before payment. Matches on supplier, amount, invoice number, date, description, and fuzzy line items.",

// System 02
catches: "Detects when a supplier's bank details or master data change. Routes the change for approval. Stores the evidence.",

// System 03
catches: "Finds bills where approval evidence is missing, incomplete, or scattered across email, documents, and accounting exports.",

// System 04
catches: "Compares invoices, purchase orders, and delivery receipts. Surfaces mismatches for review.",

// System 05
catches: "One review queue for every exception your team catches. Duplicates. Vendor changes. Missing approvals. Mismatches. Unusual amounts.",
```

### Step 4: Build check

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

### Step 5: Commit

```bash
git add components/home/problem.tsx components/home/demo-preview.tsx components/home/systems-register.tsx
git commit -m "feat(money-page): rewrite problem, demo-preview, systems-register copy"
```

---

## Task 6: Money page bottom — service-method (finance), why-not-accounting, audit-cta-section (finance), final-cta

**Files:**
- Modify: `components/home/service-method.tsx`
- Modify: `components/home/why-not-accounting.tsx`
- Modify: `components/home/audit-cta-section.tsx`
- Modify: `components/home/final-cta.tsx`

### Step 1: `service-method.tsx` — finance variant

In the `COPY` dict, update the `finance` key:

```typescript
finance: {
    title: "Start with one workflow. Prove value. Then expand.",
    meta: "Audit · Identify · Build · Route · Improve",
    method: METHOD_FINANCE,
    railBody: (
        <>
            Each engagement is a fixed-scope build with a written workflow map and
            acceptance criteria. We sit on top of your accounting system. You keep
            your AP team and your reviewers. The system runs against your first
            30 days of real exceptions before we step back.
        </>
    ),
},
```

Also update `METHOD_FINANCE` step 5 from passive to active. Find:

```typescript
{ title: "Improve over time", body: "Rules, thresholds, matching logic, and workflows are refined as real exceptions appear.", output: "Tuned rules · monthly delta" },
```

Replace with:

```typescript
{ title: "Improve over time", body: "We refine rules, thresholds, matching logic, and workflows as real exceptions appear.", output: "Tuned rules · monthly delta" },
```

### Step 2: `why-not-accounting.tsx`

Replace the entire `WhyNotAccounting` function (preserve imports and the `COMPARISON_ROWS` array, update one row in that array). Final state:

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";

const COMPARISON_ROWS: { existing: string; invaritech: string }[] = [
    { existing: "Stores bills and payments", invaritech: "Flags risky or duplicate candidates" },
    { existing: "Holds supplier records", invaritech: "Detects sensitive supplier changes" },
    { existing: "Tracks transactions", invaritech: "Connects documents, approvals, and evidence" },
    { existing: "Exports reports", invaritech: "Creates review queues and exception logic" },
    { existing: "Supports finance work", invaritech: "Automates the checks around it" },
];

export function WhyNotAccounting() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        We do not replace your accounting software. We automate the checks around it.
                    </h2>
                    <span className="section-mark-meta">Where the gap is</span>
                </motion.header>

                <motion.p
                    {...fadeUp}
                    className="why-not-accounting-lede"
                >
                    Accounting systems record transactions. They do not enforce your
                    approval policy. They do not catch duplicates. They do not store
                    the evidence for an audit. That work falls back on your team.
                </motion.p>

                <motion.div {...fadeUp} className="why-not-accounting-table-wrap">
                    <table className="why-not-accounting-table">
                        <thead>
                            <tr>
                                <th scope="col">Existing systems</th>
                                <th scope="col">Invaritech automation layer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <tr key={row.existing}>
                                    <td>{row.existing}</td>
                                    <td>{row.invaritech}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.p
                    {...fadeUp}
                    className="why-not-accounting-footer"
                >
                    We work <em className="not-italic text-foreground">on top of</em>{" "}
                    Xero, MYOB, QuickBooks, NetSuite, SAP, and ERP exports. We do not
                    replace your accounting system.
                </motion.p>
            </div>
        </section>
    );
}
```

### Step 3: `audit-cta-section.tsx` — finance variant

In the `COPY` dict, update the `finance` key:

```typescript
finance: {
    title: "Book a Finance Exception Audit Call",
    meta: "Free for qualified companies. Paid $1k later.",
    headline: (
        <>
            Inspect one finance workflow. Find the highest-value exception to
            automate first.
        </>
    ),
    supporting:
        "You send us a sample AP export or a screen-share. We map the workflow, list the manual checks, rank the exceptions by risk and effort, and write a fixed-scope build estimate for the first system.",
    deliverables: [
        "Workflow map",
        "Manual check inventory",
        "Exception ranking",
        "Recommended first system",
        "Fixed-scope build estimate",
        "30-minute findings call",
    ],
    secondaryLabel: "Send a sample AP export",
},
```

(Leave the `broad` variant untouched here — it's handled in Task 9.)

### Step 4: `final-cta.tsx`

Replace the entire `FinalCTA` function body so the file reads:

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

export function FinalCTA() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.div {...fadeUp} className="final-cta-panel">
                    <h2 className="final-cta-headline">
                        Before you hire another AP person, see what can be automated first.
                    </h2>
                    <p className="final-cta-body">
                        The audit names the highest-value exception in your workflow
                        and recommends the smallest useful first system. Free for
                        qualified companies while we build proof. Becomes a paid $1k
                        audit later.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <AuditCTA location="footer" />
                        <AuditCTA
                            location="footer"
                            variant="secondary"
                            label="Try the 3-Way Matching Demo"
                            href="/glossary/three-way-match/"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
```

### Step 5: Build check

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

### Step 6: Commit

```bash
git add components/home/service-method.tsx components/home/why-not-accounting.tsx components/home/audit-cta-section.tsx components/home/final-cta.tsx
git commit -m "feat(money-page): rewrite service-method, why-not-accounting, audit-cta, final-cta copy"
```

---

## Task 7: Money page proof — proof-grid (cards + meta strings)

**Files:**
- Modify: `components/home/proof-grid.tsx`

The card arrays are shared between the broad and finance-emphasis variants. Only the meta string differs by variant. Rewrite both card arrays AND both meta strings in this task.

- [ ] **Step 1: Replace the `FINANCE` array**

Find `const FINANCE: Exhibit[] = [ ... ]`. Replace its contents with:

```typescript
const FINANCE: Exhibit[] = [
    {
        label: "Case study",
        meta: "2025",
        title: "EUDR Compliance Bridge",
        body: "Built by members of our team in prior roles. Regulatory document workflow with REST and SOAP integration. Evidence capture and exception routing across 100+ document types.",
        proves: "Complex document workflows",
        href: "/work/eudr-compliance-bridge",
    },
    {
        label: "Live demo",
        meta: "Interactive",
        title: "Three-Way Matcher",
        body: "Built by Invaritech. Compare invoices, POs, and goods receipts in the browser. Surfaces every canonical AP exception against sample data.",
        proves: "Finance exception logic",
        href: "/glossary/three-way-match/",
    },
    {
        label: "Live tool",
        meta: "Free",
        title: "Invoice Extractor",
        body: "Built by Invaritech. Upload a supplier invoice PDF. Extract structured fields, vendor metadata, and line items for downstream rule application.",
        proves: "Document intelligence",
        href: "/resources/invoice-extractor",
    },
    {
        label: "Interactive",
        meta: "Reference",
        title: "Supplier Payment Control Rule Table",
        body: "Built by Invaritech. Filter, severity-rank, and configure payment-control rules against a sample AP register.",
        proves: "Rule library + exception logic",
        href: "/resources/supplier-payment-control-rule-table",
    },
];
```

- [ ] **Step 2: Replace the `ADJACENT` array**

Find `const ADJACENT: Exhibit[] = [ ... ]`. Replace its contents with:

```typescript
const ADJACENT: Exhibit[] = [
    {
        label: "Capability",
        meta: "Workflow",
        title: "Inventory Workflow Automation",
        body: "Built by members of our team in prior roles. Messaging-driven inventory operations with structured-data capture and approval routing.",
        proves: "Messaging-driven workflows",
        href: "/work",
    },
    {
        label: "Capability",
        meta: "Workflow",
        title: "WhatsApp Booking Automation",
        body: "Built by members of our team in prior roles. Appointment booking and coordination delivered through WhatsApp with downstream data sync.",
        proves: "Conversational operations",
        href: "/work",
    },
    {
        label: "Capability",
        meta: "Integration",
        title: "Regulatory API Bridges",
        body: "Built by members of our team in prior roles. REST-to-SOAP protocol bridges for high-volume regulatory document submission.",
        proves: "Integration + protocol bridges",
        href: "/work/eudr-compliance-bridge",
    },
];
```

- [ ] **Step 3: Update both variant meta strings**

In the JSX, locate the section-mark meta line. It currently reads something like:

```tsx
<span className="section-mark-meta">
    {isFinanceEmphasis ? "Finance · adjacent capability" : "Capability across workflows"}
</span>
```

Replace with:

```tsx
<span className="section-mark-meta">
    {isFinanceEmphasis
        ? "Finance proof. Adjacent capability."
        : "Across booking, inventory, regulatory submission, and finance controls."}
</span>
```

- [ ] **Step 4: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add components/home/proof-grid.tsx
git commit -m "feat(home): rewrite proof grid cards with provenance and Avi-voice meta"
```

---

## Task 8: Homepage mid — what-we-automate, problem (broad), finance-first-focus

**Files:**
- Modify: `components/home/what-we-automate.tsx`
- Modify: `components/home/problem.tsx`
- Modify: `components/home/finance-first-focus.tsx`

### Step 1: `what-we-automate.tsx`

Replace the `CARDS` array with:

```typescript
const CARDS = [
    {
        eyebrow: "Focus area",
        title: "Finance exception checks",
        body: "Duplicate invoices, vendor-detail changes, approval gaps, document mismatches, payment-control rules. Catch them before payment.",
        href: "/finance-exception-automation",
        cta: "See finance systems",
    },
    {
        eyebrow: "Adjacent",
        title: "Regulatory document workflows",
        body: "Multi-document submission, evidence capture, exception routing across 100+ document types. Built for the EU TRACES regulatory bridge.",
        href: "/work/eudr-compliance-bridge",
        cta: "See EUDR case study",
    },
    {
        eyebrow: "Adjacent",
        title: "Operations approval gaps",
        body: "Approvals scattered across messaging, email, and spreadsheets. Routed for review with evidence attached.",
        href: "/work",
        cta: "See selected work",
    },
];
```

Leave the JSX (section header, motion, grid) unchanged.

### Step 2: `problem.tsx` — broad variant

In the `COPY` dict, replace the `broad` key entirely:

```typescript
broad: {
    title: "The work moved. Your tools didn't.",
    meta: "Exception handling is the bottleneck.",
    railKey: "The problem",
    railBody:
        "Operations teams compare exports, PDFs, inboxes, approvals, and spreadsheets just to know which records need attention.",
    bodyParagraphs: [
        <>
            The data lives in the systems. The checking happens between them.
            That gap is where duplicate bills slip through, where vendor bank
            changes go unapproved, where regulatory submissions get missed, and
            where invoices get paid without matching evidence.
        </>,
        <>You can hire more people to close the gap. Or you can put an agent in it.</>,
    ],
    gapCells: [
        { name: "Accounting", stores: "Transactions, vendor master, GL codes." },
        { name: "Inbox", stores: "PDFs, emails, scanned bills, approvals." },
        { name: "Spreadsheet", stores: "Exception list, reviewer notes, hold flags." },
        { name: "Approval tool", stores: "Sign-offs, evidence, audit history." },
    ],
    gapCaption: (
        <>
            The data lives in the systems. The work happens in the gaps. Checking.
            Matching. Chasing. Approving.
        </>
    ),
},
```

(The `finance` variant was already rewritten in Task 5.)

### Step 3: `finance-first-focus.tsx`

Replace the entire `FinanceFirstFocus` function body so the file reads:

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

export function FinanceFirstFocus() {
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        Finance exception automation is our first focus.
                    </h2>
                    <span className="section-mark-meta">Depth before breadth.</span>
                </motion.header>

                <motion.div {...fadeUp} className="finance-first-grid">
                    <div className="finance-first-body">
                        <p>
                            Finance teams handle exceptions every day. Duplicate bills.
                            Vendor-detail changes. Missing approvals. Invoice and PO
                            mismatches. Unusual amounts. Each one is rule-driven,
                            high-frequency, and high-stakes when it goes wrong. That
                            made it the right depth area.
                        </p>
                        <p>
                            We have built five fixed-scope finance exception systems.
                            Duplicate-invoice detection. Vendor change control.
                            Approval-gap detection. Three-way matching. AP exception
                            dashboard. They sit on top of your accounting system,
                            ingest your documents, and route only the cases that need
                            human review.
                        </p>
                    </div>
                    <div className="finance-first-cta">
                        <AuditCTA
                            location="mid"
                            label="See finance exception systems"
                            href="/finance-exception-automation"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
```

### Step 4: Build check

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

### Step 5: Commit

```bash
git add components/home/what-we-automate.tsx components/home/problem.tsx components/home/finance-first-focus.tsx
git commit -m "feat(home): rewrite what-we-automate, problem (broad), finance-first-focus copy"
```

---

## Task 9: Homepage bottom — service-method (broad), audit-cta-section (broad)

**Files:**
- Modify: `components/home/service-method.tsx`
- Modify: `components/home/audit-cta-section.tsx`

### Step 1: `service-method.tsx` — broad variant railBody only

In the `COPY` dict, find the `broad` key. Update only its `railBody` field:

```typescript
broad: {
    title: "How builds work",
    meta: "Find · Encode · Automate · Monitor · Improve",
    method: METHOD_BROAD,
    railBody: (
        <>
            Every build starts with a fixed scope, clear inputs, and written
            acceptance criteria. No open-ended discovery. No vague AI promises.
            Each handover includes working automation, monitoring, and a tuning
            period against your first 30 days of real exceptions.
        </>
    ),
},
```

(Steps inside `METHOD_BROAD` keep their current copy. The `finance` variant was updated in Task 6.)

### Step 2: `audit-cta-section.tsx` — broad variant

In the `COPY` dict, update the `broad` key:

```typescript
broad: {
    title: "Book a Finance Exception Audit Call",
    meta: "Free for qualified companies. Paid $1k later.",
    headline: (
        <>
            Show us the manual checks your team runs every week. We will name the
            one most ready to automate first.
        </>
    ),
    supporting:
        "You send us a sample export or a screen-share. We map the workflow, list the manual checks, rank them by risk and effort, and recommend the first system to build.",
    deliverables: [
        "Current workflow review",
        "Sample export review (where available)",
        "Manual exception check mapping",
        "Payment-control risk list",
        "Recommended first system",
        "30-minute findings call",
    ],
    secondaryLabel: "Send a sample AP export",
},
```

### Step 3: Build check

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

### Step 4: Commit

```bash
git add components/home/service-method.tsx components/home/audit-cta-section.tsx
git commit -m "feat(home): rewrite service-method and audit-cta-section broad variants"
```

---

## Task 10: Glossary three-way-match — eyebrow, related reading, drop AuditCTA labels

**Files:**
- Modify: `app/glossary/three-way-match/page.tsx`

- [ ] **Step 1: Update the eyebrow text**

Find the line containing `Glossary · Reference` (approximately line 78). It looks like:

```tsx
<p className="glossary-eyebrow-label">
    Glossary · Reference
</p>
```

Replace `Glossary · Reference` with `Finance Automation Guide · Reference`:

```tsx
<p className="glossary-eyebrow-label">
    Finance Automation Guide · Reference
</p>
```

If the surrounding markup differs slightly (e.g. inline span instead of paragraph), preserve it and update only the string.

- [ ] **Step 2: Update three `<AuditCTA>` callsites**

Replace these three lines:

```tsx
<AuditCTA location="hero" label="Book a Finance Workflow Audit" src="glossary-3wm" />
<AuditCTA location="mid" label="Book a Finance Workflow Audit" src="glossary-3wm" />
<AuditCTA location="footer" label="Book a Finance Workflow Audit" src="glossary-3wm" />
```

With (the `label` prop dropped — inherits the new default):

```tsx
<AuditCTA location="hero" src="glossary-3wm" />
<AuditCTA location="mid" src="glossary-3wm" />
<AuditCTA location="footer" src="glossary-3wm" />
```

- [ ] **Step 3: Update three Related Reading link labels**

Find the Related Reading list (approximately lines 444-456). Replace em-dashes with colons in the visible link text:

```tsx
// Before
<Link href="...">Invoice and Document Matching System — services overview</Link>
<Link href="...">Invoice Extractor — extract structured fields from PDF invoices</Link>
<Link href="...">Supplier Payment Control Rule Table — interactive rule reference</Link>

// After
<Link href="...">Invoice and Document Matching System: services overview</Link>
<Link href="...">Invoice Extractor: extract structured fields from PDF invoices</Link>
<Link href="...">Supplier Payment Control Rule Table: interactive rule reference</Link>
```

- [ ] **Step 4: Verify no leftover label drift on this page**

```bash
grep -n "Book a Finance Workflow Audit\|Glossary · Reference\|—" app/glossary/three-way-match/page.tsx
```

Expected: only the JSX comment lines containing em dashes (`{/* Section 7 — FAQ */}` and `{/* Section 8 — Related entries (placeholder) */}`) remain. Body text shows no hits.

- [ ] **Step 5: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add app/glossary/three-way-match/page.tsx
git commit -m "feat(glossary): eyebrow rename, drop CTA label overrides, strip em-dash in related reading"
```

---

## Task 11: Contact page audit-mode copy + seo-metadata test update

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `tests/seo-metadata.test.mjs`

The contact page has an `auditRequested` branch that shows specific eyebrow / H1 / lead copy when `?audit=1` is in the URL. Update all four copy strings in that branch.

- [ ] **Step 1: Read the current audit-mode block**

```bash
sed -n '60,100p' app/contact/page.tsx
```

Expected: see ternary expressions like `{auditRequested ? "..." : scanRequested ? "..." : "..."}` for eyebrow, H1, lead, and CTA label.

- [ ] **Step 2: Update each string in the `auditRequested` branch**

In `app/contact/page.tsx`, find each of these strings inside the `auditRequested ?` branches and update them:

| Field | Current (audit branch) | New |
|---|---|---|
| Eyebrow | (whatever is there now) | `Free for qualified companies. Paid $1k later.` |
| H1 | `Book a finance workflow audit.` | `Book a Finance Exception Audit Call` |
| Lead | (whatever is there now) | `Tell us about the finance workflow you want to inspect. We will map it, name the highest-value exception to automate first, and send back a fixed-scope build estimate. 30-minute findings call included.` |
| CTA button label | `Book a Finance Workflow Audit` | `Book a Finance Exception Audit Call` |

Preserve the `scanRequested` and default branches untouched.

If the file structure does not match a clean ternary pattern (e.g. uses an early `if` block), apply the same logical edits. The goal: when `auditRequested === true`, the four strings render exactly as above.

- [ ] **Step 3: Update the seo-metadata test assertion**

In `tests/seo-metadata.test.mjs`, find this line (approximately line 144):

```javascript
assert.match(read("app/contact/page.tsx"), /"Book a Finance Workflow Audit"/);
```

Replace with:

```javascript
assert.match(read("app/contact/page.tsx"), /"Book a Finance Exception Audit Call"/);
```

- [ ] **Step 4: Run the seo-metadata test**

```bash
node --experimental-strip-types --test tests/seo-metadata.test.mjs 2>&1 | tail -10
```

Expected: 0 failures.

- [ ] **Step 5: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add app/contact/page.tsx tests/seo-metadata.test.mjs
git commit -m "feat(contact): audit-mode copy updated to locked DNA"
```

---

## Task 12: SEO metadata sweep — homepage + money page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/finance-exception-automation/page.tsx`

The locked DNA wants:
- Homepage title: `Invaritech: Workflow Automation for Document-Heavy Operations`
- Homepage description: canonical homepage sentence
- Money page title: `Finance Exception Automation for Growing Teams: Invaritech`
- Money page description: outcome-led with system catalog

Title separator: colon (`:`), not em dash. We deviate from existing title convention deliberately to maintain Avi voice.

### Step 1: Read current homepage metadata

```bash
sed -n '1,20p' app/page.tsx
```

The current `export const metadata` should look like:

```tsx
export const metadata: Metadata = {
    title: "Finance Exception Automation Systems — Invaritech",
    description:
        "Invaritech builds AI-powered automation systems for finance and operations teams buried in invoices, documents, approvals, and manual exception checks. Move faster without adding headcount.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};
```

### Step 2: Replace homepage metadata

Update `app/page.tsx`'s `metadata` export to:

```tsx
export const metadata: Metadata = {
    title: "Invaritech: Workflow Automation for Document-Heavy Operations",
    description:
        "Invaritech builds workflow automation systems for document-heavy operations, starting with finance exception automation. Catch duplicate invoices, vendor-detail changes, approval gaps, and payment-control risks before they become rework, leakage, or another hire.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};
```

### Step 3: Read current money-page metadata

```bash
sed -n '15,35p' app/finance-exception-automation/page.tsx
```

### Step 4: Replace money page metadata

Update `app/finance-exception-automation/page.tsx`'s `metadata` export to:

```tsx
export const metadata: Metadata = {
    title: "Finance Exception Automation for Growing Teams: Invaritech",
    description:
        "Move faster without adding headcount. Invaritech builds finance exception systems for AP teams: duplicate invoice detection, vendor change control, approval gap detection, three-way matching, and AP exception dashboards.",
    alternates: {
        canonical: "https://www.invaritech.ai/finance-exception-automation/",
    },
    openGraph: {
        title: "Finance Exception Automation for Growing Teams — Invaritech",
        description:
            "AI-powered finance exception systems for AP teams: duplicate invoice detection, vendor change control, approval gap detection, three-way matching, and AP exception dashboard.",
        type: "website",
        url: "https://www.invaritech.ai/finance-exception-automation/",
    },
};
```

(The `openGraph` block keeps the em dash in its embedded title — em dashes are conventional for OG card display by major social platforms. Body description uses Avi voice.)

### Step 5: Build check + smoke

```bash
pnpm build 2>&1 | grep -E "/finance-exception-automation|^[├└]\s+○ /"
```

Expected: both routes still static.

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean.

### Step 6: Commit

```bash
git add app/page.tsx app/finance-exception-automation/page.tsx
git commit -m "feat(seo): rewrite homepage and money-page metadata to locked DNA"
```

---

## Task 13: Final validation

**Files:** none (verification only, plus optional polish commit)

- [ ] **Step 1: Confirm zero hardcoded "Book a Finance Workflow Audit"**

```bash
grep -rn "Book a Finance Workflow Audit" app components tests --include="*.tsx" --include="*.ts" --include="*.mjs" 2>/dev/null | grep -v "node_modules\|\.next"
```

Expected: empty output. If any hits remain, sweep them before the final commit.

- [ ] **Step 2: Confirm zero "Free AP Controls Scan" CTA buttons**

```bash
grep -rn "Free AP Controls Scan" app components --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules\|\.next"
```

Expected: only `app/contact/page.tsx` line in the `scanRequested` legacy branch. That's the preserved legacy path, not a CTA button anywhere.

- [ ] **Step 3: Confirm no em-dash drift in audited components**

```bash
grep -n "—" components/home/*.tsx app/finance-exception-automation/page.tsx app/page.tsx 2>/dev/null
```

Expected: empty output (the rewritten components contain no em dashes).

```bash
grep -n "—" app/glossary/three-way-match/page.tsx | grep -v "^\d*:\s*{/\*"
```

Expected: empty output (only JSX comment em dashes are allowed, and the grep filters those out).

- [ ] **Step 4: Run all tests**

```bash
node --experimental-strip-types --test tests/*.test.mjs 2>&1 | tail -10
```

Expected: 0 failures.

- [ ] **Step 5: Production build**

```bash
pnpm build 2>&1 | tail -20
```

Expected:
- Clean build, no warnings
- `○ /` (homepage, static)
- `○ /finance-exception-automation` (static)
- `○ /glossary/three-way-match` (static)
- `ƒ /contact` (dynamic, search-param driven)

- [ ] **Step 6: Manual smoke (optional)**

If a dev server is reachable, browse:

- `http://localhost:3000/` — confirm hero H1 reads "Move faster without adding headcount."
- `http://localhost:3000/finance-exception-automation/` — same H1, finance-specific subhead
- `http://localhost:3000/glossary/three-way-match/` — eyebrow reads "Finance Automation Guide · Reference"
- `http://localhost:3000/contact?audit=1` — H1 reads "Book a Finance Exception Audit Call"

- [ ] **Step 7: Final commit (if any polish edits surfaced)**

If steps 1-3 found stray drift and required additional edits:

```bash
git add <changed-files>
git commit -m "polish(copy): final DNA sweep"
```

Otherwise skip.

- [ ] **Step 8: Confirm clean state**

```bash
git status
git log --oneline | head -20
```

Expected: working tree clean. The 12 work commits from this plan plus the design doc commit (`205c15a`) are in the log.

---

## Self-Review

**Spec coverage:** Each section of the design doc maps to a task:

- Section A (Global primitives) → Task 2 (default label) + Task 12 (metadata) + Task 1 (voice rules enforced throughout)
- Section B (Money page hero) → Task 4 (cover-hero landing variant)
- Section C (Money page mid) → Task 5 (problem finance, demo-preview, systems-register)
- Section D (Money page bottom) → Task 6 (service-method finance, why-not-accounting, audit-cta-section finance, final-cta) + Task 7 (proof-grid)
- Section E (Homepage) → Task 4 (cover-hero homepage variant) + Task 8 (what-we-automate, problem broad, finance-first-focus) + Task 9 (service-method broad, audit-cta-section broad) + Task 7 (proof-grid broad meta)
- Section F (Site sweep, glossary, contact, SEO) → Task 3 (site-sweep) + Task 10 (glossary) + Task 11 (contact + test) + Task 12 (metadata)

**Placeholder scan:** no TBD, no "implement later," every step shows the actual code or command.

**Type consistency:**
- `COPY` dict structure preserved across all variant files. Both `broad` and `finance` (or `homepage` and `landing` for cover-hero) keys keep their field shapes.
- `AuditCTA` props referenced consistently (`location`, `label`, `variant`, `href`, `src`).
- `METHOD_FINANCE` and `METHOD_BROAD` arrays kept; only step 5 body string mutates.
- `Exhibit` type contract on `proof-grid.tsx` unchanged (same `label / meta / title / body / proves / href` fields per card).

**Risk surface:**
- The seo-metadata test will fail between Task 2 and Task 11. The plan calls this out in Task 2 Step 4 explicitly and Task 11 includes the test assertion fix.
- All edits are pure copy / string changes. No type signatures or function shapes change. Low risk of build regression.

---

## Follow-up after launch

Tracked here for the post-pass roadmap (out of scope for this plan):

1. Long-form prose rewrite of `app/glossary/three-way-match/` Sections 1-8 (currently on-voice; defer).
2. Blog post bodies (author-voiced; not part of this DNA pass).
3. Legacy `?scan=1` contact mode copy refresh.
4. `components/payment-control-home.tsx` and `components/resource-library-client.tsx` voice rewrites beyond CTA labels (these older landing surfaces need their own copy project).
5. About page bio prose refresh.
6. Site footer column labels — already consistent.
7. Replace `public/images/finance/three-way-matcher-preview.png` placeholder with a real captured screenshot.
8. JSON-LD `WebPage` / `ItemList` / `FAQPage` schemas on the money page.
9. `/glossary/duplicate-invoice-detection/` SEO cluster page.
10. Headline A/B testing on money page hero once cold-email traffic accumulates 2+ weeks of data.

---

Plan complete. 12 work commits + 1 validation. No new files, no schema changes. Highest-leverage edit (Task 2 DEFAULT_LABEL) lands first; remaining tasks sweep callsites and rewrite section copy file-by-file.
