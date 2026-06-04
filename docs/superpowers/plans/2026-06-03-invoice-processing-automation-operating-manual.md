# Invoice Processing Automation Operating Manual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `/resources/invoice-processing-automation/` into a high-ranking AP operating manual for non-technical AP operators, controllers, and finance teams evaluating invoice processing automation.

**Architecture:** Keep the page as a single Next.js route using the existing `ToolPageShell`. Replace generic guide sections with compact operating-manual sections, inline artifact examples, stronger SEO metadata, and practical internal links to the finance automation cluster.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS utility classes, existing site components.

---

## File Structure

- Modify: `app/resources/invoice-processing-automation/page.tsx`
  - Update metadata and FAQ copy.
  - Add local content arrays for workflow steps, artifact examples, software evaluation rows, ERP boundary points, and failure modes.
  - Replace the page body with AP operating-manual sections.
  - Keep `BreadcrumbList`, `WebPage`, and `FAQPage` structured data.

- Do not modify: `components/tools/ToolPageShell.tsx`
  - The existing shell is sufficient for this page.
  - It already handles breadcrumbs, hero rendering, JSON-LD injection, and footer context.

- Do not modify: `app/resources/invoice-extractor/page.tsx`, `app/resources/supplier-payment-control-rule-table/page.tsx`, `app/glossary/three-way-match/page.tsx`, or blog posts in this plan.
  - This plan only rewrites the destination page under review.

## Task 1: Update Metadata And FAQ Targets

**Files:**
- Modify: `app/resources/invoice-processing-automation/page.tsx`

- [ ] **Step 1: Update the metadata object**

Replace the existing `metadata` export with:

```tsx
export const metadata: Metadata = {
    title: "Invoice Processing Automation: AP Workflow, OCR & Controls",
    description:
        "Learn how invoice processing automation should work: OCR, invoice data extraction, AP checks, approval workflows, exception routing, and audit trails.",
    keywords: [
        "invoice processing automation",
        "automated invoice processing",
        "invoice automation",
        "invoice processing software",
        "invoice processing automation software",
        "automated invoice processing software",
        "invoice approval workflow",
        "invoice exception management",
        "accounts payable automation",
        "accounts payable invoice processing",
        "invoice OCR",
        "invoice data extraction",
        "three way match exceptions",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/resources/invoice-processing-automation/",
    },
    openGraph: {
        title: "Invoice Processing Automation: AP Workflow, OCR & Controls",
        description:
            "An AP operating manual for invoice automation: intake, OCR, validation checks, exception routing, approval evidence, posting boundaries, and audit trails.",
        url: "https://www.invaritech.ai/resources/invoice-processing-automation/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Invoice Processing Automation Operating Manual",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Invoice Processing Automation: AP Workflow, OCR & Controls",
        description:
            "A practical AP operating manual for OCR, validation checks, approvals, exceptions, and audit trails.",
        images: ["/og-image.png"],
    },
};
```

- [ ] **Step 2: Replace the FAQ items**

Replace the existing `faqItems` array with:

```tsx
const faqItems = [
    {
        question: "What is invoice processing automation?",
        answer:
            "Invoice processing automation is the workflow that moves an invoice from receipt to approved, posting-ready data with fewer manual checks. It includes invoice OCR, data extraction, validation rules, exception routing, approval evidence, posting or export, and an audit trail.",
    },
    {
        question: "Is invoice OCR the same as invoice processing automation?",
        answer:
            "No. Invoice OCR is the intake step. Full invoice processing automation also checks the extracted data, flags exceptions, routes work to the right owner, records approval evidence, and prevents unreviewed invoices from being posted or paid.",
    },
    {
        question: "What should AP teams automate first?",
        answer:
            "Start with invoice intake and the checks that cause the most repeated review: duplicate invoice risk, supplier mismatch, PO or receipt mismatch, tax and total errors, missing approval evidence, and changed payment details.",
    },
    {
        question: "What should invoice processing software handle?",
        answer:
            "Useful invoice processing software should capture invoice fields, validate them against AP rules, separate clean invoices from exceptions, route exceptions to owners, record approval evidence, and export or post only after the right checks have passed.",
    },
    {
        question: "Do you need to replace Xero, QuickBooks, NetSuite, or your ERP?",
        answer:
            "Usually no. The accounting system should remain the system of record. Invoice processing automation normally sits around it, handling intake, checks, exceptions, approvals, and evidence before posting or export.",
    },
    {
        question: "What artifacts should an AP automation project leave behind?",
        answer:
            "At minimum: an invoice field list, validation rule table, exception-state list, approval evidence requirements, posting or export boundaries, and an audit-trail event list.",
    },
];
```

- [ ] **Step 3: Update the WebPage JSON-LD description**

Inside the `jsonLd` array, update the `WebPage.description` string to:

```tsx
description:
    "An AP operating manual for invoice processing automation: OCR, extraction, validation rules, exception routing, approval workflow, posting boundaries, and audit trails.",
```

- [ ] **Step 4: Run lint for early syntax feedback**

Run:

```bash
pnpm lint
```

Expected: PASS. If it fails, fix only syntax, import, or formatting issues introduced in this task.

## Task 2: Add Operating-Manual Content Arrays

**Files:**
- Modify: `app/resources/invoice-processing-automation/page.tsx`

- [ ] **Step 1: Replace the workflow data**

Replace the existing `workflowSteps` array with:

```tsx
const workflowSteps = [
    {
        title: "Invoice received",
        body: "Capture where the invoice came from: email inbox, supplier portal, upload, scan, or forwarded file. Give it a document ID before anyone starts checking it.",
    },
    {
        title: "Data extracted",
        body: "Read supplier name, invoice number, dates, currency, tax, totals, PO number, line items, payment terms, and visible bank details into structured fields.",
    },
    {
        title: "Checks run",
        body: "Run the checks AP already performs manually: duplicate risk, supplier match, PO or receipt match, tax math, total math, tolerance variance, and approval evidence.",
    },
    {
        title: "Exceptions routed",
        body: "Move failed checks into named exception states with an owner, reason, and expected next action. Do not let unclear invoices sit in a shared inbox.",
    },
    {
        title: "Approval evidence captured",
        body: "Record who approved, what they reviewed, when they approved it, and which note, file, or email supports the decision.",
    },
    {
        title: "Posted or exported",
        body: "Only clean, approved invoices should move into Xero, QuickBooks, NetSuite, an ERP, or an export file. Held invoices should stay visible until resolved.",
    },
    {
        title: "Audit trail retained",
        body: "Keep the event history: uploaded, extracted, checked, exception raised, routed, approved, held, corrected, posted, exported, or released for payment.",
    },
];
```

- [ ] **Step 2: Add the helper arrays below `workflowSteps`**

Add this code immediately after `workflowSteps`:

```tsx
const pageHelps = [
    "Explain the AP workflow to decision makers without turning it into a software pitch.",
    "Separate invoice OCR from full invoice processing automation.",
    "Identify checks that should happen before an invoice is approved, posted, or paid.",
    "Name the operating artifacts a useful AP automation project should leave behind.",
];

const artifactGroups = [
    {
        title: "Fields to capture",
        body: "The invoice fields AP needs before checks can be trusted.",
        items: [
            "Supplier name",
            "Invoice number",
            "Invoice date",
            "Due date",
            "Currency",
            "Subtotal",
            "Tax",
            "Total",
            "PO number",
            "Line items",
            "Payment terms",
            "Bank details when present",
        ],
    },
    {
        title: "Checks before approval",
        body: "The checks that decide whether the invoice can move forward.",
        items: [
            "Duplicate invoice risk",
            "Supplier or vendor match",
            "Invoice-number uniqueness",
            "Subtotal, tax, and total math",
            "PO match",
            "Receipt match",
            "Tolerance variance",
            "Missing approval evidence",
            "Changed supplier payment details",
        ],
    },
    {
        title: "Exception states",
        body: "The named reasons an invoice should stop for review.",
        items: [
            "Missing PO",
            "Missing receipt",
            "Supplier mismatch",
            "Amount variance",
            "Duplicate risk",
            "Invalid tax or math",
            "Changed bank details",
            "Unclear approver",
            "Hold for manual review",
        ],
    },
    {
        title: "Approval evidence",
        body: "The evidence needed to defend a release decision later.",
        items: [
            "Approver",
            "Timestamp",
            "Reviewed document",
            "Reason for approval or hold",
            "Exception resolution note",
            "Supporting email, file, or comment",
        ],
    },
    {
        title: "Audit trail events",
        body: "The state changes the workflow should retain.",
        items: [
            "Uploaded",
            "Extracted",
            "Validated",
            "Exception raised",
            "Routed",
            "Approved",
            "Held",
            "Corrected",
            "Posted or exported",
            "Released for payment",
        ],
    },
];

const softwareRows = [
    {
        weak: "Only extracts invoice text",
        strong: "Extracts fields and then validates them against AP rules.",
    },
    {
        weak: "Exports a spreadsheet for someone else to review",
        strong: "Separates clean invoices from exceptions before export or posting.",
    },
    {
        weak: "Routes approvals without context",
        strong: "Routes exceptions with owner, reason, evidence, and resolution notes.",
    },
    {
        weak: "Treats every supplier invoice the same",
        strong: "Handles supplier, PO, receipt, tax, tolerance, and payment-detail checks.",
    },
    {
        weak: "Shows status but not history",
        strong: "Keeps an audit trail of each check, decision, hold, correction, and release.",
    },
];

const erpBoundaries = [
    "Keep Xero, QuickBooks, NetSuite, or your ERP as the system of record.",
    "Run intake, checks, exception routing, and approval evidence before posting or export.",
    "Post only approved invoices; keep held invoices visible until the exception is resolved.",
    "Treat automation as the AP control workflow around the accounting system, not a replacement for accounting judgment.",
];

const failureModes = [
    {
        title: "OCR without controls",
        body: "The invoice is easier to read, but AP still has to decide whether it is valid.",
    },
    {
        title: "Approval routing without owners",
        body: "The invoice moves around, but nobody is clearly responsible for resolving the exception.",
    },
    {
        title: "Exports without audit trail",
        body: "The data leaves the workflow, but the reason for approval or hold is hard to defend later.",
    },
    {
        title: "Exception queues nobody reviews",
        body: "The system finds issues, but AP still needs a cadence, owner, and release decision.",
    },
];
```

- [ ] **Step 3: Run lint for data-shape errors**

Run:

```bash
pnpm lint
```

Expected: PASS.

## Task 3: Rewrite Hero Props And Intro Panel

**Files:**
- Modify: `app/resources/invoice-processing-automation/page.tsx`

- [ ] **Step 1: Update `ToolPageShell` props**

Inside `InvoiceProcessingAutomationPage`, replace the current `ToolPageShell` opening props with:

```tsx
        <ToolPageShell
            breadcrumb="Invoice Processing Automation"
            eyebrow="AP Operating Manual"
            titleParts={["Invoice Processing Automation:", "An AP Operating Manual"]}
            description="Invoice automation is not only OCR. It is the AP workflow that captures invoice data, checks it, routes exceptions, records approval evidence, and keeps an audit trail before anything is posted or paid."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="Start with the intake layer"
            footerText="If you are evaluating invoice processing automation, test the intake step first. Use the free invoice extractor on a real invoice, then map which checks, exceptions, and approval evidence your AP workflow needs next."
            footerLink={{
                href: "/resources/invoice-extractor/",
                label: "Use the free invoice extractor",
            }}
        >
```

- [ ] **Step 2: Replace the first content section**

Replace the first `<section className="border border-border bg-card p-7">...</section>` with:

```tsx
            <section className="border border-border bg-card p-7">
                <p className="site-meta text-primary">Who this is for</p>
                <h2 className="site-h3 mt-4">
                    For AP teams that feel the manual checking every day.
                </h2>
                <p className="site-body mt-4">
                    Use this page when invoices still move through inboxes, exports, portals,
                    spreadsheets, and approval threads before anyone can trust them. It is written
                    for the AP operator, senior accountant, controller, or finance ops person who
                    needs a clear model to show decision makers.
                </p>
                <div className="mt-7 grid gap-[1px] bg-border sm:grid-cols-2">
                    {pageHelps.map((item) => (
                        <div key={item} className="bg-background p-5 text-sm text-foreground-muted">
                            {item}
                        </div>
                    ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/resources/invoice-extractor/" className="site-button">
                        Use the Free Invoice Extractor
                    </Link>
                    <Link
                        href="/finance-automation/"
                        className="site-button bg-transparent text-foreground hover:bg-card"
                    >
                        View the Finance Automation Model
                    </Link>
                </div>
            </section>
```

- [ ] **Step 3: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS.

## Task 4: Replace Definition, Workflow, And Artifact Sections

**Files:**
- Modify: `app/resources/invoice-processing-automation/page.tsx`

- [ ] **Step 1: Replace the current Definition section**

Replace the section headed `What invoice processing automation actually means.` with:

```tsx
            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Definition
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    What invoice processing automation actually means.
                </h2>
                <p className="site-body mt-6 max-w-3xl">
                    Invoice processing automation is the controlled AP workflow between receiving an
                    invoice and allowing it to be posted, exported, or released for payment.
                </p>
                <p className="site-body mt-4 max-w-3xl">
                    OCR and invoice data extraction are only the intake layer. The real work is the
                    checking that follows: duplicate risk, supplier match, PO or receipt mismatch,
                    tax and total validation, approval evidence, exception routing, and audit trail.
                </p>
            </section>
```

- [ ] **Step 2: Replace the current Workflow section**

Replace the section headed `A practical automated invoice processing workflow.` with:

```tsx
            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Workflow Model
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    The AP workflow model.
                </h2>
                <p className="site-body mt-6 max-w-3xl">
                    A useful automated invoice processing workflow should make each state visible.
                    The goal is not to move invoices faster at any cost. The goal is to know which
                    invoices are clean, which ones are exceptions, who owns the next step, and what
                    evidence supports the release decision.
                </p>
                <div className="mt-8 grid gap-[1px] bg-border">
                    {workflowSteps.map((step, index) => (
                        <article
                            key={step.title}
                            className="grid gap-5 bg-background p-6 sm:grid-cols-[4rem_1fr]"
                        >
                            <p className="site-meta text-primary">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <div>
                                <h3 className="site-card-title">{step.title}</h3>
                                <p className="site-card-body mt-3">{step.body}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
```

- [ ] **Step 3: Insert the Artifact Examples section after Workflow**

Add this section immediately after the workflow section:

```tsx
            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Operating Artifacts
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    The artifacts a good AP automation project should leave behind.
                </h2>
                <p className="site-body mt-6 max-w-3xl">
                    You do not need a technical spec to start. You need a practical operating model
                    AP can inspect: the fields, checks, exception states, approval evidence, and
                    audit events that make the workflow defensible.
                </p>
                <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-2">
                    {artifactGroups.map((group) => (
                        <article key={group.title} className="bg-background p-6">
                            <h3 className="site-card-title">{group.title}</h3>
                            <p className="site-card-body mt-3">{group.body}</p>
                            <ul className="mt-5 grid gap-2 text-sm text-foreground-muted">
                                {group.items.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
```

- [ ] **Step 4: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS.

## Task 5: Add Software, ERP Boundary, Failure, And Starting-Point Sections

**Files:**
- Modify: `app/resources/invoice-processing-automation/page.tsx`

- [ ] **Step 1: Replace the current Controls section**

Replace the section headed `The checks that make invoice automation posting-safe.` with:

```tsx
            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Software Evaluation
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    What invoice processing software should handle.
                </h2>
                <p className="site-body mt-6 max-w-3xl">
                    If you are comparing invoice processing software, do not stop at OCR accuracy.
                    The important question is whether the workflow helps AP decide what can move
                    forward and what needs review.
                </p>
                <div className="mt-8 grid gap-[1px] bg-border">
                    <div className="hidden bg-card p-4 text-xs font-mono uppercase tracking-[0.18em] text-foreground-subtle sm:grid sm:grid-cols-2">
                        <span>Weak version</span>
                        <span>Useful version</span>
                    </div>
                    {softwareRows.map((row) => (
                        <article key={row.weak} className="grid gap-[1px] bg-border sm:grid-cols-2">
                            <div className="bg-background p-5 text-foreground-muted">
                                {row.weak}
                            </div>
                            <div className="bg-background p-5 font-medium text-foreground">
                                {row.strong}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Accounting System Boundary
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    Where Xero or your ERP fits.
                </h2>
                <p className="site-body mt-6 max-w-3xl">
                    Most AP teams do not need to replace the accounting system to improve invoice
                    processing. They need the checks around the system to become visible, repeatable,
                    and easier to defend.
                </p>
                <div className="mt-8 grid gap-[1px] bg-border">
                    {erpBoundaries.map((item) => (
                        <div key={item} className="bg-background p-5 text-foreground-muted">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Failure Modes
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    Why invoice automation projects fail.
                </h2>
                <p className="site-body mt-6 max-w-3xl">
                    Most failures are not caused by OCR alone. They happen when the workflow does
                    not define ownership, exceptions, evidence, and posting boundaries clearly
                    enough for AP to trust the result.
                </p>
                <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-2">
                    {failureModes.map((mode) => (
                        <article key={mode.title} className="bg-background p-6">
                            <h3 className="site-card-title">{mode.title}</h3>
                            <p className="site-card-body mt-3">{mode.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-14 border border-border bg-card p-7">
                <p className="site-meta text-primary">Free starting point</p>
                <h2 className="site-h3 mt-4">Test the intake step before you redesign the workflow.</h2>
                <p className="site-body mt-4">
                    Run one real invoice through the free invoice extractor. Then use the supplier
                    payment rule table to map the checks, exception owners, and evidence AP needs
                    before approval or payment release.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/resources/invoice-extractor/" className="site-button">
                        Use the Free Invoice Extractor
                    </Link>
                    <Link
                        href="/resources/supplier-payment-control-rule-table/"
                        className="site-button bg-transparent text-foreground hover:bg-card"
                    >
                        Map AP Controls
                    </Link>
                    <Link
                        href="/glossary/three-way-match/"
                        className="site-button bg-transparent text-foreground hover:bg-card"
                    >
                        Review Three-Way Match
                    </Link>
                </div>
            </section>
```

- [ ] **Step 2: Keep the FAQ section**

Keep the existing FAQ section structure after the new starting-point section. Its content will now come from the updated `faqItems` array in Task 1.

- [ ] **Step 3: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS.

## Task 6: Verify SEO, Links, Build, And Rendering

**Files:**
- Verify: `app/resources/invoice-processing-automation/page.tsx`

- [ ] **Step 1: Run production build**

Run:

```bash
npm run build
```

Expected: PASS. The route list should include `/resources/invoice-processing-automation`.

- [ ] **Step 2: Start or reuse local dev server**

If no local server is running, run:

```bash
npm run dev -- --port 3000
```

Expected: local server starts and serves `http://localhost:3000`.

- [ ] **Step 3: Check route HTML contains target metadata**

Run:

```bash
curl -sS http://127.0.0.1:3000/resources/invoice-processing-automation/ > /tmp/invoice-processing-automation.html
```

Then run:

```bash
rg -n "Invoice Processing Automation: AP Workflow, OCR & Controls|invoice processing automation|FAQPage|BreadcrumbList|/finance-automation/|/resources/invoice-extractor/|/resources/supplier-payment-control-rule-table/|/glossary/three-way-match/" /tmp/invoice-processing-automation.html
```

Expected: matches for the title, target keyword, `FAQPage`, `BreadcrumbList`, and internal links.

- [ ] **Step 4: Browser visual check**

Open:

```text
http://localhost:3000/resources/invoice-processing-automation/
```

Expected desktop result:

- Hero reads as an AP operating manual.
- The page includes compact operating artifacts.
- No horizontal divider-heavy blog layout.
- Internal links are visible and useful.
- Chat widget does not block critical CTA text at normal desktop viewport.

Expected mobile result:

- No horizontal overflow.
- Tables and grids stack cleanly.
- Artifact lists remain readable.
- Sticky nav and chat widget do not obscure the first CTA.

- [ ] **Step 5: Check for banned or internal language**

Run:

```bash
rg -n "pillar|wedge|asset|deployment threshold|coming soon|publish useful guides|validate the wedge|build the paid system later" app/resources/invoice-processing-automation/page.tsx
```

Expected: no matches.

- [ ] **Step 6: Commit the implementation**

Before committing, inspect the diff:

```bash
git diff -- app/resources/invoice-processing-automation/page.tsx
```

Stage only this implementation file:

```bash
git add app/resources/invoice-processing-automation/page.tsx
```

Commit:

```bash
git commit -m "feat: turn invoice processing guide into AP operating manual"
```

Expected: commit succeeds with only the invoice-processing page staged for this task.

## Self-Review Checklist

- The primary keyword `invoice processing automation` appears in title, H1, intro, and body without stuffing.
- The page is for non-technical AP operators/controllers, not developers.
- The page includes inline artifacts but does not become a technical implementation spec.
- The page mentions what Invaritech would help map or build through operating artifacts, not unsupported product claims.
- The page links to the finance automation pillar, invoice extractor, supplier payment control rule table, three-way match, and invoice extraction architecture where natural.
- The page keeps `BreadcrumbList`, `WebPage`, and `FAQPage` structured data.
- The page does not use generic filler such as “streamline,” “optimize,” or “innovative” without concrete workflow meaning.
- No placeholder resources, coming-soon items, fake screenshots, or invented metrics are added.

