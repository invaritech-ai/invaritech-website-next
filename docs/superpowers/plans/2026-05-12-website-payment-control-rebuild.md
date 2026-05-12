# Website Payment Control Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public INVARITECH website around founder-led payment control design, keeping only the approved IA and redirecting legacy broad AI automation routes.

**Architecture:** First establish a shared design language in `app/globals.css`: color tokens, radius rules, responsive spacing, typography primitives, layout primitives, cards, buttons, and form controls. Then rebuild the old broad AI homepage/service structure with a small set of focused App Router pages that consume those semantic classes instead of inventing hardcoded Tailwind styling per page. Use `next.config.ts` redirects for legacy URLs and keep sitemap/structured data aligned with the reduced IA.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript, lucide-react icons, existing `/api/contact` proxy, existing Calendly URL in `lib/marketing.ts`.

---

## File Structure

Create:

- `components/payment-control-home.tsx` - full homepage section composition for the new offer.
- `components/resource-download-form.tsx` - client-side rule-table request form.
- `docs/superpowers/plans/2026-05-12-website-payment-control-rebuild.md` - this implementation plan.

Modify:

- `app/globals.css` - define the site design language and semantic classes used by all rebuilt pages.
- `app/page.tsx` - render only the new homepage and homepage metadata.
- `app/resources/page.tsx` - new resources landing page if not already present from the prototype.
- `app/contact/page.tsx` - rebuild as quiet finance-control context form page.
- `app/about/page.tsx` - rebuild around founder-led service model.
- `app/blog/page.tsx` - reframe blog around operational playbooks.
- `app/layout.tsx` - update global metadata from AI automation to payment control design.
- `app/sitemap.ts` - publish only kept public routes plus blog posts and legal pages.
- `app/structured-data.ts` - update organization, website, webpage, and service schema.
- `components/header.tsx` - simplify nav to Home, Resources, Blog, About, Book a Call.
- `components/footer.tsx` - simplify footer links and positioning.
- `lib/marketing.ts` - update CTA labels and add rule table CTA.
- `next.config.ts` - replace old redirect graph with approved redirect policy.

Delete route files/directories:

- `app/services/**`
- `app/tools/**`
- `app/work/**`
- `app/careers/page.tsx`
- `app/assessment/page.tsx`
- `app/assessment/layout.tsx`
- `app/results/page.tsx`
- `app/ops-efficiency-sprint/**`
- `app/ai-automation-sprint/page.tsx`

Keep:

- `app/blog/[slug]/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/api/**`
- Existing blog post content in `lib/blog-posts/**`

## Current Worktree Note

There are uncommitted prototype edits from the interrupted implementation pass. The implementation worker should review them with `git diff` before editing, keep only the parts matching this plan, and reshape them into the final design. Do not revert unrelated user changes. These prototype edits are not an approved implementation by themselves.

---

### Task 1: Establish The Site Design Language

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add semantic site primitives**

Append this `@layer components` block after the existing global utility definitions in `app/globals.css`. These classes become the design contract for rebuilt public pages. Page JSX should use these classes instead of ad hoc Tailwind spacing, color, radius, and typography utilities.

```css
@layer components {
    .site-page {
        @apply min-h-screen bg-background text-foreground;
    }

    .site-section {
        @apply py-16 md:py-24 lg:py-28;
    }

    .site-section-hero {
        @apply pt-28 pb-20 md:pt-36 md:pb-28;
    }

    .site-section-muted {
        @apply border-y border-border bg-card;
    }

    .site-container {
        @apply mx-auto w-full max-w-7xl px-6;
    }

    .site-container-narrow {
        @apply mx-auto w-full max-w-5xl px-6;
    }

    .site-split {
        @apply grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end;
    }

    .site-split-balanced {
        @apply grid gap-12 lg:grid-cols-2 lg:items-start;
    }

    .site-kicker {
        @apply mb-8 inline-flex max-w-max border-y border-primary/30 py-2 text-[11px] font-mono uppercase tracking-[0.24em] text-primary;
    }

    .site-h1 {
        @apply font-editorial text-6xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-8xl lg:text-[8.5rem];
    }

    .site-h2 {
        @apply font-editorial text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl;
    }

    .site-h3 {
        @apply font-editorial text-2xl font-semibold leading-tight text-foreground md:text-3xl;
    }

    .site-lead {
        @apply text-xl leading-relaxed text-foreground-muted md:text-2xl;
    }

    .site-body {
        @apply text-base leading-relaxed text-muted-foreground md:text-lg;
    }

    .site-small {
        @apply text-sm leading-relaxed text-foreground-subtle;
    }

    .site-meta {
        @apply text-[11px] font-mono uppercase tracking-[0.18em] text-foreground-subtle;
    }

    .site-grid {
        @apply grid gap-[1px] bg-border;
    }

    .site-grid-two {
        @apply grid gap-[1px] bg-border md:grid-cols-2;
    }

    .site-grid-three {
        @apply grid gap-[1px] bg-border md:grid-cols-3;
    }

    .site-card {
        @apply bg-background p-6 transition-colors hover:bg-card md:p-7;
    }

    .site-card-muted {
        @apply bg-card p-6;
    }

    .site-card-title {
        @apply text-lg font-semibold leading-tight text-foreground;
    }

    .site-card-body {
        @apply mt-3 text-sm leading-relaxed text-muted-foreground;
    }

    .site-icon {
        @apply mb-6 size-5 text-primary;
    }

    .site-button-row {
        @apply flex flex-col gap-4 sm:flex-row;
    }

    .site-button {
        @apply inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background;
    }

    .site-button-secondary {
        @apply inline-flex min-h-12 items-center justify-center border border-border bg-transparent px-6 font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background;
    }

    .site-form {
        @apply space-y-5 border border-border bg-card p-6;
    }

    .site-field {
        @apply space-y-2;
    }

    .site-label {
        @apply text-[11px] font-mono uppercase tracking-[0.18em] text-foreground-subtle;
    }

    .site-input {
        @apply h-11 w-full rounded-none border border-input bg-background px-3 text-sm outline-none transition-[color,box-shadow] focus:border-ring focus:ring-3 focus:ring-ring/50;
    }

    .site-textarea {
        @apply min-h-36 w-full rounded-none border border-input bg-background px-3 py-3 text-sm outline-none transition-[color,box-shadow] focus:border-ring focus:ring-3 focus:ring-ring/50;
    }

    .site-notice {
        @apply border-l-2 border-primary bg-primary/[0.04] p-6;
    }

    .site-divider-panel {
        @apply border-y border-border py-10;
    }

    .site-menu-link {
        @apply relative flex min-h-12 w-full items-center justify-between border-b border-border/60 px-4 py-3 transition-colors duration-300 hover:border-primary/40 md:px-6 md:py-5;
    }

    .site-menu-footer {
        @apply hidden md:block;
    }

    .site-logo-strapline {
        @apply text-center text-[10px] font-bold uppercase tracking-[0.3em] text-primary/90;
    }
}
```

- [ ] **Step 2: Define usage rules for implementation**

Every rebuilt public page/component must follow these rules:

```txt
Use site-page for page roots.
Use site-section or site-section-hero for vertical rhythm.
Use site-container or site-container-narrow for horizontal margins.
Use site-h1/site-h2/site-h3/site-lead/site-body/site-small/site-meta for typography.
Use site-grid/site-grid-two/site-grid-three plus site-card/site-card-muted for repeated cards.
Use site-button/site-button-secondary for CTAs.
Use site-form/site-field/site-label/site-input/site-textarea for forms.
Use site-menu-link/site-menu-footer/site-logo-strapline for shared navigation and footer styling.
Do not hardcode random Tailwind color, radius, margin, padding, text-size, or gap classes in page JSX.
Allow structural utilities only when a semantic class does not express the layout, such as contents, sr-only, hidden, group, absolute, relative, z-index, or icon sizing where needed.
If a new visual pattern is needed, add a semantic class in app/globals.css first, then use it.
```

- [ ] **Step 3: Verify design primitive names exist**

Run:

```bash
rg "site-section|site-container|site-h1|site-card|site-button|site-input" app/globals.css
```

Expected: All class names are found.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: establish payment control design language"
```

---

### Task 2: Align Shared Marketing Constants

**Files:**
- Modify: `lib/marketing.ts`

- [ ] **Step 1: Replace marketing constants**

Set the constants to:

```ts
export const BOOK_MEETING_URL = "https://calendly.com/hello-invaritech/30min";
export const BOOK_MEETING_CTA = "Book a Scoping Call";
export const RULE_TABLE_CTA = "Request the Rule Table";
export const BRAND_EYEBROW = "Australia-first payment control design";
```

- [ ] **Step 2: Search for old CTA references**

Run:

```bash
rg "Book a Diagnostic|Your vision, intelligently executed|Explore the Sprint|AI automation|Drop-In" app components lib
```

Expected: Matches may remain in legacy files scheduled for deletion, but no kept route or shared shell should use old positioning.

- [ ] **Step 3: Commit**

```bash
git add lib/marketing.ts
git commit -m "chore: update payment control marketing constants"
```

---

### Task 3: Rebuild Header And Footer Navigation

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/footer.tsx`

- [ ] **Step 1: Update header menu**

Set `menuItems` in `components/header.tsx` to:

```ts
const menuItems = [
    { name: "Home", href: "/", id: "01" },
    { name: "Resources", href: "/resources/", id: "02" },
    { name: "Blog", href: "/blog/", id: "03" },
    { name: "About", href: "/about/", id: "04" },
    { name: "Book a Call", href: BOOK_MEETING_URL, id: "05" },
];
```

Import `BOOK_MEETING_URL`:

```ts
import { BOOK_MEETING_URL } from "@/lib/marketing";
```

For the `Link`, add external handling:

```tsx
<Link
    href={item.href}
    target={item.href.startsWith("http") ? "_blank" : undefined}
    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
    onClick={() => setIsOpen(false)}
    className="site-menu-link"
>
```

Replace the menu footer text with:

```tsx
<div className="site-menu-footer">
    Australia-first finance controls<br />
    Founder-led &middot; One client at a time
</div>
```

- [ ] **Step 2: Update footer links and positioning**

Set footer `navigationLinks` to:

```ts
const navigationLinks = [
    { title: "Home", href: "/" },
    { title: "Resources", href: "/resources/" },
    { title: "Blog", href: "/blog/" },
    { title: "About", href: "/about/" },
    { title: "Contact", href: "/contact/" },
    { title: "Book a Call", href: BOOK_MEETING_URL },
];
```

Import `BOOK_MEETING_URL` in `components/footer.tsx`:

```ts
import { BOOK_MEETING_URL } from "@/lib/marketing";
```

Use this footer positioning:

```tsx
Founder-led payment control design for finance teams that need cleaner approvals, fewer manual exceptions, and less leakage without changing systems.
```

Change the small logo strapline to:

```tsx
<span className="site-logo-strapline">Payment Controls</span>
```

For footer links, apply the same external handling:

```tsx
target={link.href.startsWith("http") ? "_blank" : undefined}
rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
```

- [ ] **Step 3: Verify nav references**

Run:

```bash
rg 'href="/(services|tools|work|careers|assessment|results)' components app
```

Expected: No matches in kept pages or shared shell.

- [ ] **Step 4: Commit**

```bash
git add components/header.tsx components/footer.tsx
git commit -m "feat: simplify site navigation for payment control offer"
```

---

### Task 4: Build Homepage From Approved Design

**Files:**
- Create or replace: `components/payment-control-home.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create homepage component**

Create `components/payment-control-home.tsx` with these data arrays:

```ts
const symptoms = [
    "Invoice-to-PO mismatches",
    "Supplier statement gaps",
    "Missing proof-of-delivery documents",
    "Carrier surcharge variances",
    "Duplicate payment variants",
    "Approvals that rely on memory instead of evidence",
];

const verticals = [
    {
        companyType: "Freight & logistics",
        pain: "Margin leakage from carrier overcharges",
        details: "Surcharge variance, duplicate invoice variants, missing PODs, and rate-card mismatches.",
        buyers: "AP Manager, Controller, Finance Ops",
    },
    {
        companyType: "Wholesale & distribution",
        pain: "Silent leakage from duplicate and erroneous payments",
        details: "PO/invoice mismatch, split shipments, supplier statement gaps, credits, and returns.",
        buyers: "Finance Manager, AP Lead, Shared Services",
    },
    {
        companyType: "Manufacturing",
        pain: "Manual review load from three-way-match exceptions",
        details: "PO, goods receipt, invoice mismatch, material price variance, and unit conversion issues.",
        buyers: "Controller, Finance Ops, Operations Finance",
    },
    {
        companyType: "Mining & construction",
        pain: "High-value payment control risk",
        details: "Progress claim validation, retention release, variation mismatch, and project cost-code errors.",
        buyers: "Commercial Finance, AP Manager, Controller",
    },
];
```

The rendered sections must be:

```tsx
<main className="site-page">
    <section className="site-section-hero">{/* Hero */}</section>
    <section className="site-section site-section-muted">{/* Problem */}</section>
    <section className="site-section">{/* Who it is for */}</section>
    <section className="site-section site-section-muted">{/* How it works */}</section>
    <section className="site-section">{/* Final CTA */}</section>
</main>
```

Use this exact hero copy:

```tsx
<div className="site-container">
    <p className="site-kicker">Australia-first payment control design</p>
    <h1 className="site-h1">Clean up payment controls without changing systems.</h1>
    <p className="site-lead">We help finance teams reduce manual exception chasing, tighten approvals, and reduce dollar leakage across the software they already use.</p>
    <p className="site-meta">Founder-led. One client at a time. Fixed-scope first, then managed support.</p>
</div>
```

Use CTA links:

```tsx
<div className="site-button-row">
    <Link href="/resources/" className="site-button">Request the Rule Table</Link>
    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer" className="site-button-secondary">Book a Scoping Call</a>
</div>
```

Use only semantic design classes from Task 1 for spacing, typography, cards, grids, buttons, and page colors. If the homepage needs a visual pattern not covered by Task 1, add a named class to `app/globals.css` first and document it in the Task 1 design contract.

- [ ] **Step 2: Replace `app/page.tsx`**

Use:

```tsx
import { Metadata } from "next";
import PaymentControlHome from "@/components/payment-control-home";

export const metadata: Metadata = {
    title: "Payment Control Design for Australian Finance Teams",
    description:
        "Founder-led payment control design for Australian finance teams that need fewer manual exceptions, cleaner approvals, and less dollar leakage without changing systems.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return <PaymentControlHome />;
}
```

- [ ] **Step 3: Verify homepage copy**

Run:

```bash
rg "Clean up payment controls|Request the Rule Table|Book a Scoping Call" app/page.tsx components/payment-control-home.tsx
```

Expected: All three phrases are found.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/payment-control-home.tsx
git commit -m "feat: rebuild homepage around payment controls"
```

---

### Task 5: Build Resources Page And Rule Table Form

**Files:**
- Create or replace: `app/resources/page.tsx`
- Create or replace: `components/resource-download-form.tsx`

- [ ] **Step 1: Create resource form**

Create `components/resource-download-form.tsx` as a client component. The form state must include:

```ts
const [form, setForm] = useState({
    email: "",
    company: "",
    role: "",
    industry: "Freight & logistics",
    exceptionType: "Supplier payment checks",
});
```

On submit, POST to `/api/contact` with:

```ts
body: JSON.stringify({
    name: form.role || "Resource requester",
    email: form.email,
    company: form.company,
    country: "Australia / APAC",
    phone: "",
    source: "Supplier Payment Control Rule Table",
    message: [
        "Resource request: Supplier Payment Control Rule Table",
        `Role: ${form.role}`,
        `Industry: ${form.industry}`,
        `Main exception type: ${form.exceptionType}`,
    ].join("\n"),
})
```

Use these field labels:

```txt
Work email
Company
Role
Industry
Main exception type
```

Use these option lists:

```ts
const industries = [
    "Freight & logistics",
    "Wholesale & distribution",
    "Manufacturing",
    "Mining & construction",
    "Other finance team",
];

const exceptionTypes = [
    "Supplier payment checks",
    "Carrier invoice variance",
    "PO / invoice mismatch",
    "Supplier statement gaps",
    "Progress claims",
    "Not sure yet",
];
```

- [ ] **Step 2: Create resources page**

Create `app/resources/page.tsx` with metadata:

```tsx
export const metadata: Metadata = {
    title: "Payment Control Resources",
    description:
        "Practical rule tables, checklists, and implementation guides for finance teams reducing invoice exceptions, approval gaps, and manual payment checks.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
};
```

Use this page copy:

```tsx
<h1>Practical payment-control resources for finance teams.</h1>
<h2>Supplier Payment Control Rule Table</h2>
<p>A zero-fluff workbook for mapping payment-change checks, exception routing, approval evidence, and audit notes before a payment is ever released.</p>
```

Include the form next to or below the asset description.

- [ ] **Step 3: Verify form wiring**

Run:

```bash
rg "Supplier Payment Control Rule Table|/api/contact|Main exception type" app/resources/page.tsx components/resource-download-form.tsx
```

Expected: All phrases are found.

- [ ] **Step 4: Commit**

```bash
git add app/resources/page.tsx components/resource-download-form.tsx
git commit -m "feat: add payment control resources page"
```

---

### Task 6: Rebuild Contact Page

**Files:**
- Modify: `app/contact/page.tsx`
- Modify or replace: `components/contact.tsx`

- [ ] **Step 1: Inspect existing contact implementation**

Run:

```bash
sed -n '1,260p' app/contact/page.tsx
sed -n '1,320p' components/contact.tsx
```

Expected: Existing page uses the long legacy contact form and old office/location emphasis.

- [ ] **Step 2: Replace visible contact copy**

Use this page headline and subhead:

```tsx
<h1>Talk to us about a finance control problem.</h1>
<p>Use this page if you are not ready for a formal call yet, or if you want to ask whether a specific payment, invoice, or exception workflow is a fit for a control sprint.</p>
```

Use form fields:

```ts
interface FormData {
    name: string;
    email: string;
    company: string;
    role: string;
    message: string;
}
```

Use labels:

```txt
Name
Work email
Company
Role
What are you trying to clean up?
```

Use placeholder:

```txt
Example: Supplier statement gaps, invoice mismatches, payment approval checks, missing PODs, surcharge variance, etc.
```

Submit to `/api/contact` with:

```ts
body: JSON.stringify({
    ...formData,
    phone: "",
    country: "Australia / APAC",
    source: "Contact Form - Finance Control Problem",
    recaptchaToken,
})
```

Primary CTA:

```txt
Send the Context
```

Secondary CTA:

```tsx
<a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
    Prefer a direct conversation? Book a scoping call.
</a>
```

- [ ] **Step 3: Remove legacy office-heavy content**

The contact page can keep the email address, but remove office-location grids from the visible page. The page should not look like a generic agency contact page.

- [ ] **Step 4: Verify contact copy**

Run:

```bash
rg "Talk to us about a finance control problem|Send the Context|What are you trying to clean up" app/contact/page.tsx components/contact.tsx
```

Expected: All phrases are found.

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx components/contact.tsx
git commit -m "feat: rebuild contact page for finance control context"
```

---

### Task 7: Rebuild About Page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace old AI delivery narrative**

Set metadata:

```tsx
export const metadata: Metadata = {
    title: "About INVARITECH | Founder-Led Payment Control Design",
    description:
        "INVARITECH works with one client at a time to design, build, and maintain finance workflows that reduce exception handling without forcing a system overhaul.",
    alternates: {
        canonical: "https://www.invaritech.ai/about/",
    },
};
```

Use hero copy:

```tsx
<h1>Payment control design with direct principal involvement.</h1>
<p>We work with one client at a time to design, build, and maintain finance workflows that reduce exception handling without forcing an expensive system overhaul.</p>
```

Use the service model points:

```ts
const standards = [
    {
        title: "Objectives first",
        body: "We agree the workflow objective and three measurable acceptance criteria before any build starts.",
    },
    {
        title: "Bugs are on us",
        body: "If the agreed control does not work as specified, we fix it without charging for the correction.",
    },
    {
        title: "New scope stays separate",
        body: "New features or new exception families are scoped separately after the original objective is delivered.",
    },
];
```

- [ ] **Step 2: Keep founder cards**

Keep founder images and names:

```txt
Aditi Garg
Abhishek Agarwal
Avishek Majumder
```

Update the surrounding section heading to:

```txt
Direct principal involvement
```

- [ ] **Step 3: Verify about page**

Run:

```bash
rg "Founder-Led Payment Control Design|Objectives first|Bugs are on us|Direct principal involvement" app/about/page.tsx
```

Expected: All phrases are found.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: rebuild about page around founder-led controls"
```

---

### Task 8: Reframe Blog Page

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Update blog metadata**

Use:

```tsx
export const metadata: Metadata = {
    title: "Operational Playbooks for Cleaner Finance Ops",
    description:
        "Step-by-step guides, workflow teardowns, and practical notes for teams reducing invoice exceptions, manual review load, and audit gaps.",
    alternates: {
        canonical: "https://www.invaritech.ai/blog/",
    },
};
```

Preserve existing Open Graph/Twitter images.

- [ ] **Step 2: Update page framing**

Use categories:

```ts
const categories = ["AP Controls", "Invoice Exceptions", "Payment Risk", "Finance Ops", "Audit Trails"];
```

Use headline:

```tsx
<h1>OPERATIONAL<br /><span>PLAYBOOKS</span></h1>
```

Use subhead:

```tsx
Step-by-step guides, workflow teardowns, and practical notes for teams actively reducing invoice exceptions and manual review loads.
```

Add resources CTA before the post grid:

```tsx
<Link href="/resources/">Request the Rule Table</Link>
```

- [ ] **Step 3: Verify blog framing**

Run:

```bash
rg "OPERATIONAL|PLAYBOOKS|AP Controls|Request the Rule Table" app/blog/page.tsx
```

Expected: All phrases are found.

- [ ] **Step 4: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: reframe blog as finance ops playbooks"
```

---

### Task 9: Update Metadata, Sitemap, And Structured Data

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/structured-data.ts`

- [ ] **Step 1: Update global metadata**

In `app/layout.tsx`, use:

```tsx
default: "Payment Control Design for Australian Finance Teams | INVARITECH"
```

Use description:

```tsx
"Founder-led payment control design for Australian finance teams. Reduce manual exceptions, tighten approvals, and reduce dollar leakage without changing systems."
```

Use keywords:

```ts
[
    "INVARITECH",
    "payment control design",
    "finance operations",
    "accounts payable controls",
    "invoice exception management",
    "supplier payment controls",
    "freight invoice variance",
    "payment approval workflow",
    "audit trail automation",
    "Australian finance teams",
    "finance ops exceptions",
]
```

- [ ] **Step 2: Reduce sitemap**

Make `app/sitemap.ts` return only:

```ts
[
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/resources/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    ...blogPostEntries,
    { url: `${baseUrl}/about/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms/`, changeFrequency: "yearly", priority: 0.3 },
]
```

- [ ] **Step 3: Update structured data**

Set organization description:

```ts
"INVARITECH designs, builds, and maintains payment controls for finance teams that need fewer manual exceptions, cleaner approvals, and less leakage without changing systems."
```

Set service names:

```txt
Fixed-Scope Payment Control Sprint
Managed Finance Workflow Support
```

Set area served:

```ts
[
    { "@type": "Country", name: "Australia" },
    { "@type": "Place", name: "APAC" },
]
```

Set audience:

```txt
AP Manager, Financial Controller, Finance Operations, Shared Services
```

- [ ] **Step 4: Verify old metadata is gone from kept pages**

Run:

```bash
rg "AI Automation Services|Drop-in AI|Enterprise AI Automation|Visionary Intelligence" app/layout.tsx app/sitemap.ts app/structured-data.ts app/page.tsx app/resources app/about app/contact app/blog components/header.tsx components/footer.tsx
```

Expected: No matches.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/structured-data.ts
git commit -m "feat: update metadata for payment control positioning"
```

---

### Task 10: Add Redirects And Remove Legacy Page Routes

**Files:**
- Modify: `next.config.ts`
- Delete: legacy route files listed in File Structure

- [ ] **Step 1: Replace legacy redirects**

Keep old `/blogs` redirects. Replace service/tool/work/sprint/careers redirects with:

```ts
{
    source: "/services/:path*",
    destination: "/",
    permanent: false,
},
{
    source: "/tools/:path*",
    destination: "/resources/",
    permanent: false,
},
{
    source: "/work/:path*",
    destination: "/about/",
    permanent: false,
},
{
    source: "/careers/:path*",
    destination: "/",
    permanent: false,
},
{
    source: "/assessment/:path*",
    destination: "/",
    permanent: false,
},
{
    source: "/results",
    destination: "/",
    permanent: false,
},
{
    source: "/results/",
    destination: "/",
    permanent: false,
},
{
    source: "/ops-efficiency-sprint/:path*",
    destination: "/",
    permanent: false,
},
{
    source: "/ai-automation-sprint/:path*",
    destination: "/",
    permanent: false,
},
```

Keep legal redirects:

```ts
{
    source: "/terms-of-service/:path*",
    destination: "/terms/",
    permanent: true,
},
{
    source: "/privacy-policy/:path*",
    destination: "/privacy/",
    permanent: true,
},
```

- [ ] **Step 2: Delete legacy public route files**

Delete these paths:

```txt
app/services
app/tools
app/work
app/careers/page.tsx
app/assessment/page.tsx
app/assessment/layout.tsx
app/results/page.tsx
app/ops-efficiency-sprint
app/ai-automation-sprint/page.tsx
```

Use `apply_patch` delete operations or an approved destructive command during execution. Do not delete `app/api/tools/**` because those are API routes and may still be referenced internally until separately retired.

- [ ] **Step 3: Verify route file set**

Run:

```bash
find app -maxdepth 3 -name page.tsx | sort
```

Expected kept page files:

```txt
app/about/page.tsx
app/blog/[slug]/page.tsx
app/blog/page.tsx
app/contact/page.tsx
app/page.tsx
app/privacy/page.tsx
app/resources/page.tsx
app/terms/page.tsx
```

- [ ] **Step 4: Verify no nav/sitemap links to removed routes**

Run:

```bash
rg '"/(services|tools|work|careers|assessment|results|ops-efficiency-sprint|ai-automation-sprint)' app components lib next.config.ts
```

Expected: Matches only inside `next.config.ts` redirect `source` values.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts app
git commit -m "feat: redirect and remove legacy public routes"
```

---

### Task 11: QA Build, Browser Check, And Polish

**Files:**
- Modify only files required by failed checks.

- [ ] **Step 1: Run lint**

Run:

```bash
pnpm lint
```

Expected: No errors. Fix warnings if they indicate unused imports in touched files.

- [ ] **Step 2: Run build**

Run:

```bash
pnpm build
```

Expected: Build succeeds.

If the known Turbopack sandbox error appears with `creating new process`, `binding to a port`, and `Operation not permitted`, rerun with elevated permissions:

```bash
pnpm build
```

Expected after elevated run: Build succeeds.

- [ ] **Step 3: Start dev server**

Run:

```bash
pnpm dev
```

Expected: Local server starts, usually at `http://localhost:3000`.

- [ ] **Step 4: Browser smoke test**

Open these routes:

```txt
/
/resources/
/blog/
/about/
/contact/
/services/
/tools/
/work/
```

Expected:

- `/`, `/resources/`, `/blog/`, `/about/`, `/contact/` render.
- `/services/` redirects to `/`.
- `/tools/` redirects to `/resources/`.
- `/work/` redirects to `/about/`.
- Header and footer contain only approved links.
- Hero text does not overlap on mobile.
- Resource and contact forms are readable on mobile.

- [ ] **Step 5: Design-language scan**

Run:

```bash
rg 'className="' app components
```

Expected:

- Kept public pages use semantic classes from `app/globals.css` for colors, spacing, radius, typography, cards, grids, buttons, and form controls.
- Structural classes are acceptable only where they express behavior or positioning, such as `relative`, `absolute`, `hidden`, `group`, `contents`, `sr-only`, `z-*`, icon sizes, or animation hooks.
- No kept public page introduces random hardcoded Tailwind classes for `px-*`, `py-*`, `mt-*`, `mb-*`, `gap-*`, `text-*`, `bg-*`, `border-*`, `rounded-*`, `max-w-*`, or responsive typography when a `site-*` primitive exists.

- [ ] **Step 6: Final text scan**

Run:

```bash
rg "governed AI|AI automation|Drop-In Sprint|ROI Wedge|Explore the Sprint|The Sprint|Tools|Services" app components lib
```

Expected: No matches in kept public pages or shared shell. Matches in deleted files should not exist after Task 10.

- [ ] **Step 7: Commit QA fixes**

If fixes were needed:

```bash
git add app components lib next.config.ts
git commit -m "fix: polish payment control rebuild"
```

If no fixes were needed, do not create an empty commit.

---

## Self-Review

Spec coverage:

- Design language and semantic page classes: Task 1.
- Shared marketing constants: Task 2.
- Nav/footer: Task 3.
- Homepage rewrite: Task 4.
- Resources and lead capture: Task 5.
- Contact retained and rebuilt: Task 6.
- About founder-led model: Task 7.
- Blog operational playbooks: Task 8.
- Metadata/sitemap/schema: Task 9.
- Aggressive cleanup and redirects: Task 10.
- Verification: Task 11.

Placeholder scan:

- No `TBD` or generic "implement later" steps are present.
- Each task includes concrete file paths, copy, commands, and expected results.

Type consistency:

- Semantic design classes are defined in Task 1 and required before page implementation.
- `BOOK_MEETING_URL`, `BOOK_MEETING_CTA`, `RULE_TABLE_CTA`, and `BRAND_EYEBROW` are defined in Task 2 and used consistently in later tasks.
- Form payloads use the existing `/api/contact` route shape with `name`, `email`, `company`, `country`, `phone`, `source`, and `message`.
