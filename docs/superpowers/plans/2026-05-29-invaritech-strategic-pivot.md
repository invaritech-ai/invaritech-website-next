# Invaritech Strategic Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the static Invaritech website around finance operations and RegOps automation while preserving useful existing routes and moving strategic copy into typed content modules.

**Architecture:** Add a typed content registry under `lib/site-content`, add reusable render components under `components/site`, and make routes compose content-backed sections. Preserve the existing sitemap surface where useful. Components render structure; content modules decide what is said.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, local Node test files using `node:test`, existing Motion components where useful.

---

## File Structure

- Create `lib/site-content/types.ts`: shared content types with stable IDs and optional proof hrefs.
- Create `lib/site-content/brand.ts`: site config, approved terms, banned terms, CTAs, primary trust strip.
- Create `lib/site-content/navigation.ts`: primary nav, footer nav, footer columns.
- Create `lib/site-content/pages.ts`: route-level metadata with canonical paths.
- Create `lib/site-content/offers.ts`: three-stage offer ladder and finance page offers.
- Create `lib/site-content/proof.ts`: proof assets for EUDR, three-way matcher, invoice extractor, rule table, and placeholders.
- Create `lib/site-content/tools.ts`: live tools and future tool placeholders.
- Create `lib/site-content/home.ts`: homepage hero, problem, workflow, method, and final CTA content.
- Create `components/site/section-header.tsx`: reusable section heading renderer.
- Create `components/site/site-hero.tsx`: reusable hero with CTA support.
- Create `components/site/trust-strip.tsx`: reusable trust line strip.
- Create `components/site/offer-ladder.tsx`: three-stage offer renderer.
- Create `components/site/proof-grid.tsx`: proof asset renderer with optional links.
- Create `components/site/tool-directory.tsx`: tool and future tool renderer.
- Create `components/site/workflow-diagram.tsx`: current stack to control layer to governed outcome diagram.
- Create `components/site/control-checklist.tsx`: checklist/rule list renderer.
- Create `components/site/diagnostic-cta.tsx`: reusable diagnostic CTA panel.
- Create `components/site/page-shell.tsx`: simple page wrapper for common layout.
- Modify `app/page.tsx`: use the new homepage content and metadata.
- Modify `app/finance-exception-automation/page.tsx`: keep route, rewrite as the commercial money page.
- Modify `components/header.tsx`: read navigation content and new brand strapline.
- Modify `components/footer.tsx`: read footer content and new brand language.
- Modify `components/home/_shared/audit-cta.tsx`: rename default CTA and query parameter to diagnostic.
- Modify `components/home/_shared/audit-cta-href.ts`: preserve existing helper but support `/contact/?diagnostic=1`.
- Modify `app/contact/page.tsx`: make Finance Workflow Diagnostic the primary conversion offer.
- Modify `components/contact.tsx`: update form copy and field labels away from AP-only language.
- Modify `app/work/page.tsx`: make proof-first page, with EUDR as RegOps proof and tools as supporting proof.
- Modify `app/work/eudr-compliance-bridge/page.tsx`: elevate RegOps Bridge positioning.
- Modify `app/about/page.tsx`: make Asia-based, founder-led delivery the lead story.
- Modify `app/resources/page.tsx` and `components/resource-library-client.tsx`: make tools/resources library align with the new strategy and add `#tools` and `#guides` anchors.
- Modify `app/blog/page.tsx`: light metadata/title cleanup only.
- Modify `app/layout.tsx`: global metadata, locale, and schema-friendly language.
- Modify `app/structured-data.ts`: organization/service language and area served.
- Modify `app/manifest.ts`: PWA/app copy.
- Modify `tests/seo-metadata.test.mjs`: update expected strategic titles and CTA paths.
- Create `tests/site-content-contract.test.mjs`: registry and banned-language contract tests.

---

### Task 1: Typed Content Registry

**Files:**
- Create: `lib/site-content/types.ts`
- Create: `lib/site-content/brand.ts`
- Create: `lib/site-content/navigation.ts`
- Create: `lib/site-content/pages.ts`
- Create: `lib/site-content/offers.ts`
- Create: `lib/site-content/proof.ts`
- Create: `lib/site-content/tools.ts`
- Create: `lib/site-content/home.ts`
- Create: `tests/site-content-contract.test.mjs`

- [ ] **Step 1: Write the failing content contract test**

Create `tests/site-content-contract.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");

const contentFiles = [
    "lib/site-content/types.ts",
    "lib/site-content/brand.ts",
    "lib/site-content/navigation.ts",
    "lib/site-content/pages.ts",
    "lib/site-content/offers.ts",
    "lib/site-content/proof.ts",
    "lib/site-content/tools.ts",
    "lib/site-content/home.ts",
];

describe("site content registry", () => {
    it("defines the required content modules", () => {
        for (const file of contentFiles) {
            const source = read(file);
            assert.ok(source.length > 200, `${file} should contain real content`);
        }
    });

    it("uses stable ids for offers, proof assets, and tool cards", () => {
        for (const file of ["lib/site-content/offers.ts", "lib/site-content/proof.ts", "lib/site-content/tools.ts"]) {
            const source = read(file);
            assert.match(source, /id:\s*"[a-z0-9-]+"/, `${file} should contain stable ids`);
            assert.match(source, /satisfies\s+/, `${file} should use satisfies for typed content`);
        }
    });

    it("centralizes canonical base URL and uses canonical paths", () => {
        const brand = read("lib/site-content/brand.ts");
        assert.match(brand, /siteUrl:\s*"https:\/\/www\.invaritech\.ai"/);

        const pages = read("lib/site-content/pages.ts");
        assert.match(pages, /canonical:\s*"\/finance-exception-automation\/"/);
        assert.doesNotMatch(pages, /canonical:\s*"https:\/\/www\.invaritech\.ai/);
    });

    it("keeps banned legacy positioning out of strategic content", () => {
        const combined = contentFiles.map(read).join("\n");
        for (const banned of ["Australia-first", "Australian finance teams", "AI transformation", "cutting-edge", "world-class"]) {
            assert.doesNotMatch(combined, new RegExp(banned, "i"), banned);
        }
    });

    it("keeps the approved diagnostic CTA centralized", () => {
        const brand = read("lib/site-content/brand.ts");
        assert.match(brand, /Book Workflow Diagnostic/);
        assert.match(brand, /\/contact\/\?diagnostic=1/);
    });
});
```

- [ ] **Step 2: Run the contract test and verify it fails**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: FAIL with missing file errors for `lib/site-content/types.ts`.

- [ ] **Step 3: Create `lib/site-content/types.ts`**

Add the exact shared types approved in the design:

```ts
export type CTA = {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "text";
};

export type HeroContent = {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
    trustLine?: string;
};

export type OfferCard = {
    id: string;
    title: string;
    audience: string;
    promise: string;
    includes: string[];
    cta?: CTA;
};

export type ProofAsset = {
    id: string;
    type: "case-study" | "demo" | "tool" | "placeholder";
    title: string;
    body: string;
    proves: string;
    href?: string;
    tags: string[];
};

export type ToolCard = {
    id: string;
    title: string;
    body: string;
    status: "live" | "coming-soon";
    href?: string;
    category: "extractor" | "calculator" | "rule-table" | "checker";
};

export type PageMetadata = {
    title: string;
    description: string;
    canonical: string;
};

export type NavigationItem = {
    label: string;
    href: string;
    section?: string;
};

export type SectionHeaderContent = {
    eyebrow: string;
    title: string;
    body?: string;
};
```

- [ ] **Step 4: Create `lib/site-content/brand.ts`**

Use these exported values:

```ts
import type { CTA } from "./types";

export const siteConfig = {
    name: "INVARITECH",
    siteUrl: "https://www.invaritech.ai",
    locale: "en",
    defaultOgImage: "/og-image.png",
};

export const brandPositioning = {
    short: "Finance operations and RegOps automation for teams worldwide.",
    sharp: "We build the control layer between your finance systems, approvals, evidence, and exceptions.",
    controlLayerDefinition:
        "The control layer is the workflow, rules, evidence, approvals, and exception handling that sits around the systems you already use.",
    trustLine: "Asia-based. Globally delivered. Founder-led. Built around your existing systems.",
    footer:
        "Invaritech builds governed finance operations and RegOps automation around the systems teams already use.",
};

export const primaryDiagnosticCta = {
    label: "Book Workflow Diagnostic",
    href: "/contact/?diagnostic=1",
    variant: "primary",
} satisfies CTA;

export const secondaryWorkCta = {
    label: "View Work",
    href: "/work/",
    variant: "secondary",
} satisfies CTA;

export const approvedTerms = [
    "control layer",
    "exceptions",
    "approvals",
    "evidence",
    "audit trail",
    "reconciliation",
    "reporting bridge",
    "governed workflow",
    "current stack",
    "fixed scope",
    "managed support",
];

export const bannedTerms = [
    "AI transformation",
    "automate anything",
    "future of automation",
    "generic custom software",
    "world-class",
    "cutting-edge",
    "Australia-first",
    "Australian finance teams",
];
```

- [ ] **Step 5: Create navigation and page metadata content**

`lib/site-content/navigation.ts` must export `primaryNavigation`, `footerCompanyLinks`, `footerFinanceLinks`, and `footerProofLinks`. Use the approved soft-launch navigation destinations:

```ts
import type { NavigationItem } from "./types";

export const primaryNavigation = [
    { label: "Home", href: "/" },
    { label: "Finance Automation", href: "/finance-exception-automation/" },
    { label: "RegOps", href: "/work/eudr-compliance-bridge/" },
    { label: "Tools", href: "/resources/#tools" },
    { label: "Work", href: "/work/" },
    { label: "Resources", href: "/resources/#guides" },
    { label: "About", href: "/about/" },
] satisfies NavigationItem[];

export const footerCompanyLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/" },
    { label: "Resources", href: "/resources/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
] satisfies NavigationItem[];

export const footerFinanceLinks = [
    { label: "Finance Automation", href: "/finance-exception-automation/" },
    { label: "Payment Control Rules", href: "/resources/supplier-payment-control-rule-table/" },
    { label: "Invoice Extractor", href: "/resources/invoice-extractor/" },
    { label: "Cost-to-Close Calculator", href: "/resources/cost-to-close-calculator/" },
    { label: "Three-Way Matcher", href: "/glossary/three-way-match/" },
] satisfies NavigationItem[];

export const footerProofLinks = [
    { label: "EUDR RegOps Bridge", href: "/work/eudr-compliance-bridge/" },
    { label: "Proof Library", href: "/work/" },
    { label: "Tools", href: "/resources/#tools" },
] satisfies NavigationItem[];
```

`lib/site-content/pages.ts` must export `pageMetadata` with canonical paths for `/`, `/finance-exception-automation/`, `/work/`, `/work/eudr-compliance-bridge/`, `/resources/`, `/about/`, `/contact/`, and `/blog/`.

- [ ] **Step 6: Create offers, proof, tools, and home content**

Use the approved copy architecture:

- `offers.ts`: three stages named `Diagnose`, `Build`, `Support`; offers named `Finance Workflow Diagnostic`, `Finance Control Sprint`, `Finance Ops Automation Build`, `RegOps Bridge`, and `Managed Automation Support`.
- `proof.ts`: include `eudr-compliance-bridge`, `three-way-matcher`, `invoice-extractor`, `supplier-payment-control-rule-table`, `finance-case-placeholder`, and `regops-case-placeholder`.
- `tools.ts`: include live tools `invoice-extractor`, `cost-to-close-calculator`, `supplier-payment-control-rule-table`; include coming-soon tools `xero-exception-checker`, `supplier-bank-detail-change-checker`, and `duplicate-payment-risk-checker`.
- `home.ts`: include hero title `We build the control layer between your finance systems, approvals, evidence, and exceptions.` and the plain-language control layer definition.

- [ ] **Step 7: Run content contract test**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit Task 1**

```bash
git add lib/site-content tests/site-content-contract.test.mjs
git commit -m "feat: add typed site content registry"
```

---

### Task 2: Reusable Site Components

**Files:**
- Create: `components/site/section-header.tsx`
- Create: `components/site/site-hero.tsx`
- Create: `components/site/trust-strip.tsx`
- Create: `components/site/offer-ladder.tsx`
- Create: `components/site/proof-grid.tsx`
- Create: `components/site/tool-directory.tsx`
- Create: `components/site/workflow-diagram.tsx`
- Create: `components/site/control-checklist.tsx`
- Create: `components/site/diagnostic-cta.tsx`
- Create: `components/site/page-shell.tsx`

- [ ] **Step 1: Create render-only components**

Implement the components using existing class primitives from `app/globals.css`: `site-section`, `site-container`, `site-h2`, `site-h3`, `site-lead`, `site-body`, `site-button`, `site-button-secondary`, `site-grid`, `site-grid-three`, `site-card`, and `site-meta`.

Component requirements:

- `SiteHero` accepts `content: HeroContent`.
- `SectionHeader` accepts `content: SectionHeaderContent`.
- `TrustStrip` accepts `items: string[]`.
- `OfferLadder` accepts `stages: { id: string; title: string; body: string; offers: OfferCard[] }[]`.
- `ProofGrid` accepts `assets: ProofAsset[]` and renders plain cards when `href` is absent.
- `ToolDirectory` accepts `tools: ToolCard[]` and renders disabled-looking cards for `coming-soon` without fake links.
- `WorkflowDiagram` accepts three arrays: `currentStack`, `controlLayer`, and `outcomes`.
- `ControlChecklist` accepts `items: { id: string; title: string; body: string }[]`.
- `DiagnosticCTA` accepts title/body/CTA props and defaults to `primaryDiagnosticCta`.
- `PageShell` wraps children in `<main className="site-page">`.

- [ ] **Step 2: Guard against strategic copy in reusable components**

Do not hardcode these strategic strings in component files:

```txt
Finance operations and RegOps automation for teams worldwide.
Book Workflow Diagnostic
Asia-based. Globally delivered. Founder-led.
Finance Workflow Diagnostic
```

Those strings must come from `lib/site-content`.

- [ ] **Step 3: Run TypeScript check**

Run:

```bash
pnpm lint
```

Expected: PASS or unrelated pre-existing warnings only. Fix any new lint/type errors from this task.

- [ ] **Step 4: Commit Task 2**

```bash
git add components/site
git commit -m "feat: add reusable site section components"
```

---

### Task 3: Homepage And Global Shell

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/header.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/home/_shared/audit-cta.tsx`
- Modify: `components/home/_shared/audit-cta-href.ts`

- [ ] **Step 1: Update global CTA defaults**

Change default CTA label and href:

```ts
const DEFAULT_LABEL = "Book Workflow Diagnostic";
const DEFAULT_HREF = "/contact/?diagnostic=1";
```

Keep existing UTM behavior. The helper should append `src` and `campaign` to the diagnostic URL exactly as it did for audit URLs.

- [ ] **Step 2: Update header from navigation content**

Use `primaryNavigation` from `lib/site-content/navigation.ts`. Add the CTA separately from `primaryDiagnosticCta`.

Brand strapline:

```txt
Control Layer Automation
```

Mobile footer:

```txt
Asia-based. Globally delivered.
Founder-led. Built around your current stack.
```

- [ ] **Step 3: Update footer from navigation and brand content**

Footer brand copy must use `brandPositioning.footer`.

Footer bottom line:

```txt
Asia-based delivery. Founder-led. Built around existing systems.
```

Footer columns:

- Company from `footerCompanyLinks`.
- Finance Automation from `footerFinanceLinks`.
- Proof from `footerProofLinks`.
- Legal links stay hardcoded because they are stable legal utilities.

- [ ] **Step 4: Rewrite homepage composition**

`app/page.tsx` should import `homePageContent`, `offerStages`, `proofAssets`, `tools`, and the reusable site components.

Homepage section order:

1. `SiteHero`
2. `TrustStrip`
3. problem section using `SectionHeader` and body copy from `home.ts`
4. `WorkflowDiagram`
5. `OfferLadder`
6. `ProofGrid`
7. `ToolDirectory`
8. method section
9. `DiagnosticCTA`

Set metadata from `pageMetadata.home` and compose canonical with `siteConfig.siteUrl`.

- [ ] **Step 5: Update global metadata**

In `app/layout.tsx`, use:

```txt
Finance Operations and RegOps Automation | INVARITECH
```

Description:

```txt
Invaritech builds finance operations and RegOps automation for teams worldwide: payment controls, exception workflows, reporting bridges, and audit-ready internal tools around the systems they already use.
```

Set Open Graph locale to `en` and `<html lang="en">`.

- [ ] **Step 6: Run checks**

Run:

```bash
node --test tests/site-cta.test.mjs tests/site-content-contract.test.mjs
pnpm lint
```

Expected: PASS.

- [ ] **Step 7: Commit Task 3**

```bash
git add app/page.tsx app/layout.tsx components/header.tsx components/footer.tsx components/home/_shared/audit-cta.tsx components/home/_shared/audit-cta-href.ts tests/site-cta.test.mjs
git commit -m "feat: pivot homepage and global shell"
```

---

### Task 4: Finance Money Page

**Files:**
- Modify: `app/finance-exception-automation/page.tsx`
- Create if useful: `lib/site-content/finance.ts`

- [ ] **Step 1: Preserve the route and sharpen the hierarchy**

Keep `/finance-exception-automation/`.

The page hierarchy must be:

```txt
Core: exception automation and payment controls
Expansion: broader finance operations workflows
```

Hero title:

```txt
Finance exception automation and payment controls around your current stack.
```

Hero body:

```txt
We help finance and accounts payable teams catch duplicate bills, supplier-detail changes, approval gaps, invoice mismatches, and payment release risks without forcing a system replacement.
```

- [ ] **Step 2: Add finance pain patterns**

Render five pain cards:

- Duplicate supplier bills
- Supplier bank-detail changes
- Missing approval evidence
- PO, invoice, and receipt mismatches
- Payment release decisions without a clear audit trail

- [ ] **Step 3: Add current-stack section**

Use this section title:

```txt
Built around Xero, QuickBooks, NetSuite, spreadsheets, inboxes, and approval tools.
```

Use this body:

```txt
The accounting system stores the transaction. Your team still handles the exceptions around it. Invaritech builds the workflow layer that checks, routes, and records those exceptions before they become leakage or rework.
```

- [ ] **Step 4: Render focused offers and proof**

Show only:

- Finance Workflow Diagnostic
- Finance Control Sprint
- Finance Ops Automation Build
- Managed Automation Support

Do not lead with RegOps on this page. Include EUDR only as a lower-page proof note, not as a finance offer.

- [ ] **Step 5: Run checks and commit**

Run:

```bash
pnpm lint
```

Expected: PASS.

Commit:

```bash
git add app/finance-exception-automation/page.tsx lib/site-content/finance.ts
git commit -m "feat: rewrite finance automation money page"
```

---

### Task 5: Proof, Resources, About, And Contact Pages

**Files:**
- Modify: `app/work/page.tsx`
- Modify: `app/work/eudr-compliance-bridge/page.tsx`
- Modify: `app/resources/page.tsx`
- Modify: `components/resource-library-client.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/contact.tsx`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Make `/work/` proof-first**

Hero title:

```txt
Proof we can build governed workflow infrastructure.
```

Hero body:

```txt
Our work spans regulated submissions, finance exception logic, document extraction, and control-rule tools. The common thread is the same: messy workflow in, governed control layer out.
```

Use proof assets from `lib/site-content/proof.ts`. Tools may appear as proof cards, but the page must not become a resources library.

- [ ] **Step 2: Elevate EUDR as RegOps proof**

Update `/work/eudr-compliance-bridge/` top copy to say:

```txt
RegOps Bridge for high-volume, audit-ready regulatory submissions.
```

Use this proof framing:

```txt
The EUDR bridge proves Invaritech can build deterministic workflow infrastructure for regulated operations: structured validation, API bridges, submission evidence, and retry-safe processing.
```

- [ ] **Step 3: Reframe resources with anchors**

In `components/resource-library-client.tsx`:

- Set the tools section anchor to `id="tools"`.
- Set the guide/library section anchor to `id="guides"`.
- Hero title: `Tools and resources for finance controls, exceptions, and evidence.`
- Hero body: `Free tools, rule tables, checklists, and guides that show how we think about approval evidence, exception routing, duplicate payment risk, and month-end visibility.`

- [ ] **Step 4: Reframe About**

About hero title:

```txt
Asia-based, founder-led automation for finance and regulated operations.
```

About hero body:

```txt
We build governed workflow systems around the tools teams already use. One workflow first. Fixed scope. Written acceptance criteria. Managed support after delivery.
```

Remove Australia-cost comparison language from the hero.

- [ ] **Step 5: Reframe Contact as diagnostic**

Contact metadata title:

```txt
Book a Finance Workflow Diagnostic
```

Hero title when `diagnostic=1`:

```txt
Book a Finance Workflow Diagnostic.
```

Hero body:

```txt
Bring one finance or regulated operations workflow. We map the current process, identify the control gaps, assess automation fit, and recommend the smallest useful build scope.
```

Keep support for legacy `audit=1` query by treating it as diagnostic for now. Do not add a redirect.

- [ ] **Step 6: Light blog index cleanup**

Update blog index metadata and visible page title to remove Australia-specific positioning. Keep individual blog post rewrites out of scope except tests may update the month-end title later if required.

- [ ] **Step 7: Run checks and commit**

Run:

```bash
pnpm lint
node --test tests/site-content-contract.test.mjs
```

Expected: PASS.

Commit:

```bash
git add app/work/page.tsx app/work/eudr-compliance-bridge/page.tsx app/resources/page.tsx components/resource-library-client.tsx app/about/page.tsx app/contact/page.tsx components/contact.tsx app/blog/page.tsx
git commit -m "feat: pivot proof resources about and contact pages"
```

---

### Task 6: Metadata, Structured Data, Manifest, And Tests

**Files:**
- Modify: `app/structured-data.ts`
- Modify: `app/manifest.ts`
- Modify: `tests/seo-metadata.test.mjs`
- Modify: `tests/site-cta.test.mjs`
- Modify if needed: `app/sitemap.ts`

- [ ] **Step 1: Update structured data**

Service description:

```txt
Invaritech builds finance operations and RegOps automation for teams worldwide: payment controls, exception workflows, reporting bridges, and audit-ready internal tools around existing systems.
```

Area served should avoid country-only Australia positioning. Use global and APAC signals where schema supports them.

- [ ] **Step 2: Update manifest**

Manifest name:

```txt
INVARITECH Finance Operations Automation
```

Short name:

```txt
INVARITECH
```

Description:

```txt
Finance operations and RegOps automation around the systems teams already use.
```

- [ ] **Step 3: Update tests**

In `tests/site-cta.test.mjs`, replace audit expectations with diagnostic expectations:

```js
assert.equal(appendAuditCtaParams("/contact/?diagnostic=1", {}), "/contact/?diagnostic=1");
assert.equal(
    appendAuditCtaParams("/contact/?diagnostic=1", { src: "cold-email" }),
    "/contact/?diagnostic=1&src=cold-email"
);
```

In `tests/seo-metadata.test.mjs`, update expectations:

- Homepage/global title: `Finance Operations and RegOps Automation | INVARITECH`
- Work title: `Finance Operations and RegOps Automation Work`
- About title: `About INVARITECH | Finance Operations and RegOps Automation`
- Contact title: `Book a Finance Workflow Diagnostic`
- Header CTA href: `/contact/?diagnostic=1`
- Header CTA label: `Book a Call` or `Book Workflow Diagnostic`

- [ ] **Step 4: Run full verification**

Run:

```bash
node --test tests/*.test.mjs
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit Task 6**

```bash
git add app/structured-data.ts app/manifest.ts tests/seo-metadata.test.mjs tests/site-cta.test.mjs app/sitemap.ts
git commit -m "test: align metadata and diagnostics with pivot"
```

---

### Task 7: Visual QA And Final Polish

**Files:**
- Modify as needed: `app/globals.css`
- Modify as needed: `components/site/*.tsx`

- [ ] **Step 1: Start local dev server**

Run:

```bash
npm run dev
```

Expected: Next dev server starts and prints a local URL.

- [ ] **Step 2: Browser-check critical routes**

Open these routes:

- `/`
- `/finance-exception-automation/`
- `/work/`
- `/work/eudr-compliance-bridge/`
- `/resources/`
- `/about/`
- `/contact/?diagnostic=1`

Verify:

- No horizontal scroll at 375px.
- Header links fit at desktop width.
- CTA buttons do not wrap awkwardly.
- Tools and Resources anchors work.
- RegOps appears as proof, not as the homepage commercial lead.
- The finance money page is not generic finance automation.

- [ ] **Step 3: Scan for banned strategic language**

Run:

```bash
rg -n "Australia-first|Australian finance teams|AI transformation|cutting-edge|world-class|future of automation|automate anything" app components lib
```

Expected: no matches in public strategic copy. Blog post historical content may still include Australia if it is in long-form article context, but layout, nav, homepage, money page, resources, work, about, contact, metadata, manifest, and structured data should not.

- [ ] **Step 4: Run final verification**

Run:

```bash
node --test tests/*.test.mjs
pnpm lint
pnpm build
```

Expected: PASS.

- [ ] **Step 5: Commit final polish**

```bash
git add app components lib tests
git commit -m "fix: polish strategic pivot launch surfaces"
```

---

## Self-Review

Spec coverage:

- Central content registry: Task 1.
- Typed content with stable IDs: Task 1.
- Existing route preservation: Tasks 3 to 6, no new route tree.
- Homepage umbrella positioning: Task 3.
- Finance money page hierarchy: Task 4.
- RegOps as proof: Tasks 3 and 5.
- Tools and resources placeholders: Tasks 1 and 5.
- Diagnostic conversion page: Task 5.
- Global metadata and schema: Task 6.
- Visual QA: Task 7.

Placeholder scan:

- No `TBD`, `TODO`, or fake links are required.
- `ProofAsset.href` and `ToolCard.href` are optional for real placeholders.
- Coming-soon tools render without links.

Type consistency:

- `CTA`, `HeroContent`, `OfferCard`, `ProofAsset`, `ToolCard`, `PageMetadata`, and `NavigationItem` are defined once in `types.ts`.
- All content modules use `satisfies`.
- Routes compose content through typed render components.
