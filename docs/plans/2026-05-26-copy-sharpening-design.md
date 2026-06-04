# Copy Sharpening — Design Doc

**Date:** 2026-05-26
**Author:** Engineering (with locked DNA from Avi)
**Status:** Approved, ready for implementation plan
**Branch base:** `brand-story-copy-update` (continue on it)

---

## Goal

Apply locked Invaritech DNA across every visible string on the site. Replace drift labels, strip em dashes, tighten prose to Avi voice, align the offer name and CTA name everywhere. The IA from the prior pivot stays. This is a pure copy pass.

The new copy ships in 4 to 6 batches by page, with the `AuditCTA` default label change as the single highest-leverage edit (cascades to most callsites in one commit).

---

## Locked DNA reference

### Brand convention
- Body copy: **Invaritech** (never INVARITECH in prose)
- INVARITECH allowed only in logo, watermark, hero stamps, and section-mark eyebrows where it's visually a logotype

### Canonical positioning
- Parent category: **AI workflow automation for document-heavy operations**
- First specialization: **Finance exception automation**
- Memorable phrase (homepage + money-page H1): **Move faster without adding headcount.**
- Canonical sentence (money page subhead): *Invaritech builds finance exception automation systems for growing teams. We catch duplicate invoices, vendor-detail changes, approval gaps, and payment-control risks before they become rework, leakage, or another hire.*
- Canonical sentence (homepage subhead): *Invaritech builds workflow automation systems for document-heavy operations, starting with finance exception automation. We help growing companies catch finance exceptions before they become rework, leakage, or another hire.*

### CTA labels (single source of truth via `AuditCTA` component default)
| Slot | Label |
|---|---|
| Primary, full | **Book a Finance Exception Audit Call** |
| Primary, short (nav, cards) | **Book an Audit Call** *(or "Book Audit" for tightest nav)* |
| Secondary, money-page hero | **See Finance Exception Systems** *(anchor to #systems)* |
| Secondary, homepage hero | **Explore Finance Exception Systems** *(routes to /finance-exception-automation)* |
| Secondary, final CTA | **Try the 3-Way Matching Demo** |

### Offer name
**Finance Exception Audit** *(not "Finance Workflow Audit", not "AP Controls Scan")*

### Pricing language
**Free for qualified companies while we build proof. Becomes a paid $1k audit later.**

### Voice rules (strict)
1. Replace every em dash with period, comma, or colon
2. No decorative `<em>` italic — use regular text
3. Short sentences. Fragments allowed for rhythm
4. Active voice over passive
5. Specific scenarios over abstract lists
6. Real numbers where they exist (e.g., EUDR "100+ document types"); silent where unknown
7. Banned words: seamlessly, streamlined, leverage, robust, comprehensive, cutting-edge, innovative, transformative, paradigm-shift, disruptive, revolutionary, game-changer

---

## Money page (`/finance-exception-automation`)

### 1. `cover-hero.tsx` — landing variant

```typescript
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
```

### 2. `problem.tsx` — finance variant

| Slot | New value |
|---|---|
| title | `Your accounting system stores the transaction. Your team still checks the exceptions.` *(keep)* |
| meta | `Six pain patterns. All AP.` |
| railKey | `The problem` *(keep)* |
| railBody | `Finance teams do not lose time because they lack software. They lose time because the checks still happen across inboxes, spreadsheets, PDFs, approval trails, and human memory.` |
| bullets | (keep all six verbatim) |
| closer | `If your team runs these checks by hand every week, that workflow is ready to automate.` |
| gapCaption | `The data lives in the systems. The work happens in the gaps. Checking. Matching. Chasing. Approving.` |

### 3. `demo-preview.tsx`

| Slot | New value |
|---|---|
| H2 | `See it work on three documents.` |
| meta | `Live demo · in-browser` |
| body | `Open the matcher. Paste invoice, PO, and goods-receipt rows. Watch it flag duplicates, amount variances, missing receipts, vendor mismatches, and three more exception types. Runs in your browser. Your data never leaves the page.` |
| reminder | `Three-way matching is one example. The same pattern works for duplicate bills, vendor changes, approval gaps, and other payment-control checks.` |
| primaryCTA | `Try the demo` → `/glossary/three-way-match/` |
| secondaryCTA | `Book a walkthrough` → `/contact?audit=1` |

### 4. `systems-register.tsx`

Section title `Fixed-scope finance exception systems` and meta `Five builds. One umbrella.` keep. Footnote keeps. Detail panels keep (already tight).

Card `catches` strings:

```typescript
01 Duplicate Invoice Exception System:
   "Catches exact and near-duplicate supplier bills before payment. Matches on supplier, amount, invoice number, date, description, and fuzzy line items."

02 Vendor Change Control System:
   "Detects when a supplier's bank details or master data change. Routes the change for approval. Stores the evidence."

03 Approval Gap Detection System:
   "Finds bills where approval evidence is missing, incomplete, or scattered across email, documents, and accounting exports."

04 3-Way Matching Exception System:
   "Compares invoices, purchase orders, and delivery receipts. Surfaces mismatches for review."

05 AP Exception Dashboard:
   "One review queue for every exception your team catches. Duplicates. Vendor changes. Missing approvals. Mismatches. Unusual amounts."
```

### 5. `service-method.tsx` — finance variant

| Slot | New value |
|---|---|
| title | `Start with one workflow. Prove value. Then expand.` *(keep)* |
| meta | `Audit · Identify · Build · Route · Improve` *(keep)* |
| railBody | `Each engagement is a fixed-scope build with a written workflow map and acceptance criteria. We sit on top of your accounting system. You keep your AP team and your reviewers. The system runs against your first 30 days of real exceptions before we step back.` |
| Step 1-4 | *(keep)* |
| Step 5 body | `We refine rules, thresholds, matching logic, and workflows as real exceptions appear.` |

### 6. `why-not-accounting.tsx`

| Slot | New value |
|---|---|
| title | `We do not replace your accounting software. We automate the checks around it.` *(keep)* |
| meta | `Where the gap is` |
| lede | `Accounting systems record transactions. They do not enforce your approval policy. They do not catch duplicates. They do not store the evidence for an audit. That work falls back on your team.` |
| Table row 5 | `Supports finance work` \| `Automates the checks around it` |
| Other 4 rows | *(keep)* |
| footer | `We work on top of Xero, MYOB, QuickBooks, NetSuite, SAP, and ERP exports. We do not replace your accounting system.` |

### 7. `audit-cta-section.tsx` — finance variant

| Slot | New value |
|---|---|
| title | `Book a Finance Exception Audit Call` |
| meta | `Free for qualified companies. Paid $1k later.` |
| headline | `Inspect one finance workflow. Find the highest-value exception to automate first.` |
| supporting | `You send us a sample AP export or a screen-share. We map the workflow, list the manual checks, rank the exceptions by risk and effort, and write a fixed-scope build estimate for the first system.` |
| deliverables | `Workflow map`, `Manual check inventory`, `Exception ranking`, `Recommended first system`, `Fixed-scope build estimate`, `30-minute findings call` |
| secondaryLabel | `Send a sample AP export` |

### 8. `proof-grid.tsx` — both variants (single source of card data)

Meta line:
- Finance-emphasis variant: `Finance proof. Adjacent capability.`
- Broad variant: `Across booking, inventory, regulatory submission, and finance controls.`

Section H2: `Built from real automation work` (keep).

Row 1 heading `Finance exception logic` keep. Row 2 heading `Adjacent automation capability` keep.

Cards:

```typescript
FINANCE = [
    {
        label: "Case study", meta: "2025",
        title: "EUDR Compliance Bridge",
        body: "Built by members of our team in prior roles. Regulatory document workflow with REST and SOAP integration. Evidence capture and exception routing across 100+ document types.",
        proves: "Complex document workflows",
        href: "/work/eudr-compliance-bridge",
    },
    {
        label: "Live demo", meta: "Interactive",
        title: "Three-Way Matcher",
        body: "Built by Invaritech. Compare invoices, POs, and goods receipts in the browser. Surfaces every canonical AP exception against sample data.",
        proves: "Finance exception logic",
        href: "/glossary/three-way-match/",
    },
    {
        label: "Live tool", meta: "Free",
        title: "Invoice Extractor",
        body: "Built by Invaritech. Upload a supplier invoice PDF. Extract structured fields, vendor metadata, and line items for downstream rule application.",
        proves: "Document intelligence",
        href: "/resources/invoice-extractor",
    },
    {
        label: "Interactive", meta: "Reference",
        title: "Supplier Payment Control Rule Table",
        body: "Built by Invaritech. Filter, severity-rank, and configure payment-control rules against a sample AP register.",
        proves: "Rule library + exception logic",
        href: "/resources/supplier-payment-control-rule-table",
    },
];

ADJACENT = [
    {
        label: "Capability", meta: "Workflow",
        title: "Inventory Workflow Automation",
        body: "Built by members of our team in prior roles. Messaging-driven inventory operations with structured-data capture and approval routing.",
        proves: "Messaging-driven workflows",
        href: "/work",
    },
    {
        label: "Capability", meta: "Workflow",
        title: "WhatsApp Booking Automation",
        body: "Built by members of our team in prior roles. Appointment booking and coordination delivered through WhatsApp with downstream data sync.",
        proves: "Conversational operations",
        href: "/work",
    },
    {
        label: "Capability", meta: "Integration",
        title: "Regulatory API Bridges",
        body: "Built by members of our team in prior roles. REST-to-SOAP protocol bridges for high-volume regulatory document submission.",
        proves: "Integration + protocol bridges",
        href: "/work/eudr-compliance-bridge",
    },
];
```

### 9. `final-cta.tsx`

| Slot | New value |
|---|---|
| headline | `Before you hire another AP person, see what can be automated first.` |
| body | `The audit names the highest-value exception in your workflow and recommends the smallest useful first system. Free for qualified companies while we build proof. Becomes a paid $1k audit later.` |
| primaryCTA | (default = `Book a Finance Exception Audit Call`) |
| secondaryCTA | `Try the 3-Way Matching Demo` → `/glossary/three-way-match/` |

---

## Homepage (`/`)

### 1. `cover-hero.tsx` — homepage variant

```typescript
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
```

### 2. `what-we-automate.tsx`

```typescript
CARDS = [
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

Section H2 and meta keep.

### 3. `problem.tsx` — broad variant

| Slot | New value |
|---|---|
| title | `The work moved. Your tools didn't.` |
| meta | `Exception handling is the bottleneck.` *(keep)* |
| railBody | `Operations teams compare exports, PDFs, inboxes, approvals, and spreadsheets just to know which records need attention.` *(keep)* |
| body para 1 | `The data lives in the systems. The checking happens between them. That gap is where duplicate bills slip through, where vendor bank changes go unapproved, where regulatory submissions get missed, and where invoices get paid without matching evidence.` |
| body para 2 | `You can hire more people to close the gap. Or you can put an agent in it.` *(keep)* |
| gap cells | *(keep all 4)* |
| gapCaption | `The data lives in the systems. The work happens in the gaps. Checking. Matching. Chasing. Approving.` |

### 4. `finance-first-focus.tsx`

| Slot | New value |
|---|---|
| H2 | `Finance exception automation is our first focus.` *(keep)* |
| meta | `Depth before breadth.` *(keep)* |
| Body para 1 | `Finance teams handle exceptions every day. Duplicate bills. Vendor-detail changes. Missing approvals. Invoice and PO mismatches. Unusual amounts. Each one is rule-driven, high-frequency, and high-stakes when it goes wrong. That made it the right depth area.` |
| Body para 2 | `We have built five fixed-scope finance exception systems. Duplicate-invoice detection. Vendor change control. Approval-gap detection. Three-way matching. AP exception dashboard. They sit on top of your accounting system, ingest your documents, and route only the cases that need human review.` |
| CTA label | `See finance exception systems` *(keep)* |

### 5. `service-method.tsx` — broad variant

| Slot | New value |
|---|---|
| title | `How builds work` *(keep)* |
| meta | `Find · Encode · Automate · Monitor · Improve` *(keep)* |
| railBody | `Every build starts with a fixed scope, clear inputs, and written acceptance criteria. No open-ended discovery. No vague AI promises. Each handover includes working automation, monitoring, and a tuning period against your first 30 days of real exceptions.` |
| Steps 1-5 | *(keep all)* |

### 6. `audit-cta-section.tsx` — broad variant (used on homepage)

| Slot | New value |
|---|---|
| title | `Book a Finance Exception Audit Call` |
| meta | `Free for qualified companies. Paid $1k later.` |
| headline | `Show us the manual checks your team runs every week. We will name the one most ready to automate first.` |
| supporting | `You send us a sample export or a screen-share. We map the workflow, list the manual checks, rank them by risk and effort, and recommend the first system to build.` |
| deliverables | `Current workflow review`, `Sample export review (where available)`, `Manual exception check mapping`, `Payment-control risk list`, `Recommended first system`, `30-minute findings call` |
| secondaryLabel | `Send a sample AP export` |

### 7. `proof-grid.tsx` — broad variant

Uses the same card data as the finance-emphasis variant (single source of truth). Only the meta string and visual emphasis differ.

---

## Glossary `/glossary/three-way-match/`

| Where | Action |
|---|---|
| Eyebrow line (~78) | `Glossary · Reference` → `Finance Automation Guide · Reference` |
| Three `<AuditCTA>` callsites (lines 119, 296, 478) | Drop explicit `label=` prop; let the new default win |
| Related Reading link 1 | `Invoice and Document Matching System — services overview` → `Invoice and Document Matching System: services overview` |
| Related Reading link 2 | `Invoice Extractor — extract structured fields from PDF invoices` → `Invoice Extractor: extract structured fields from PDF invoices` |
| Related Reading link 3 | `Supplier Payment Control Rule Table — interactive rule reference` → `Supplier Payment Control Rule Table: interactive rule reference` |
| Long-form prose (Sections 1-8) | Keep unchanged (already on-voice, Aditi byline) |

---

## Site-sweep CTA label updates (one-string-per-file)

`AuditCTA` default change is the highest-leverage edit:

```typescript
// components/home/_shared/audit-cta.tsx
const DEFAULT_LABEL = "Book a Finance Exception Audit Call"; // was: "Book a Finance Workflow Audit"
```

Then update hardcoded strings in:

| File | Lines | Change |
|---|---|---|
| `components/home/cover-hero.tsx` | 62 | Update homepage variant primaryLabel |
| `app/contact/page.tsx` | 74 | "Book a Finance Workflow Audit" → new label |
| `app/about/page.tsx` | 187 | Same |
| `app/blog/page.tsx` | 111 | Same |
| `app/blog/[slug]/page.tsx` | 332, 347 | Both lines |
| `app/work/page.tsx` | 175 | Same |
| `app/work/eudr-compliance-bridge/page.tsx` | 326 | Same |
| `components/payment-control-home.tsx` | 156, 329, 402 | All three |
| `components/resource-library-client.tsx` | 189 | Same |

After: zero occurrences of "Book a Finance Workflow Audit" in the repo.

---

## Contact page audit-mode copy

`app/contact/page.tsx` — three string updates in the `auditRequested` branch:

| Slot | New value |
|---|---|
| Eyebrow | `Free for qualified companies. Paid $1k later.` |
| H1 | `Book a Finance Exception Audit Call` |
| Lead | `Tell us about the finance workflow you want to inspect. We will map it, name the highest-value exception to automate first, and send back a fixed-scope build estimate. 30-minute findings call included.` |

Legacy `?scan=1` branch untouched.

---

## SEO metadata sweep

| Route | Field | New value |
|---|---|---|
| `/` | title | `Invaritech — Workflow Automation for Document-Heavy Operations` |
| `/` | description | `Invaritech builds workflow automation systems for document-heavy operations, starting with finance exception automation. Catch duplicate invoices, vendor-detail changes, approval gaps, and payment-control risks before they become rework, leakage, or another hire.` |
| `/finance-exception-automation` | title | `Finance Exception Automation for Growing Teams — Invaritech` |
| `/finance-exception-automation` | description | `Move faster without adding headcount. Invaritech builds finance exception systems for AP teams: duplicate invoice detection, vendor change control, approval gap detection, three-way matching, and AP exception dashboards.` |
| `/glossary/three-way-match/` | title | *(keep current)* |
| `/glossary/three-way-match/` | description | *(keep current)* |

Note: the metadata "title" can contain an em-dash style typographically. We use a hyphen "—" here intentionally because that's the page-title separator convention used by all major search engines and the existing site (e.g., `app/page.tsx` already uses "Foo — Bar" format). Em-dash strip applies to body copy only, not page-title separators.

Actually, to honor strict Avi voice everywhere, swap the title separators to colon or vertical bar to be consistent. New convention: `<Page>: <Brand>` (colon). Updated values:

| Route | title (final) |
|---|---|
| `/` | `Invaritech: Workflow Automation for Document-Heavy Operations` |
| `/finance-exception-automation` | `Finance Exception Automation for Growing Teams: Invaritech` |

---

## Out of scope (deferred)

- Long-form prose rewrite of `app/glossary/three-way-match/` Sections 1-8 (already on-voice)
- Blog posts (author-voiced)
- Legacy `?scan=1` contact mode (preserved for backwards compatibility)
- `components/payment-control-home.tsx` and `components/resource-library-client.tsx` voice rewrites beyond CTA labels (separate project — these are older landing surfaces)
- About page bio prose (separate concern; voice already close enough)
- Site footer column labels (already consistent)

---

## Success criteria

- [ ] Zero occurrences of "Book a Finance Workflow Audit" in the codebase
- [ ] Zero occurrences of "Free AP Controls Scan" as a CTA label (legacy contact-mode reference may remain in `?scan=1` branch only)
- [ ] All em dashes removed from body copy on `/`, `/finance-exception-automation`, `/glossary/three-way-match` Related Reading
- [ ] `pnpm build` clean
- [ ] `node --experimental-strip-types --test tests/*.test.mjs` green (no regressions in the internal-links or seo-metadata tests)
- [ ] Manual visual spot-check on homepage + money page renders the new copy

---

## Implementation plan

Generated next by the `superpowers:writing-plans` skill from this design doc.
