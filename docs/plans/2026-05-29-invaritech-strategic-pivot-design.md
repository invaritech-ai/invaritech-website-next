# Invaritech Strategic Pivot Design

## Goal

Reposition Invaritech as an Asia-based automation studio building finance operations and RegOps systems for teams worldwide. The site should communicate one strategic idea: Invaritech builds the control layer between the systems companies already use.

This is a controlled messaging and information architecture correction, not a ground-up rebuild. Existing routes stay where they are strategically useful. New routes are added only when the current sitemap cannot support the finance operations and RegOps positioning.

## Positioning

Primary public line:

> Finance operations and RegOps automation for teams worldwide.

Sharper homepage line:

> We build the control layer between your finance systems, approvals, evidence, and exceptions.

Plain-language definition:

> The control layer is the workflow, rules, evidence, approvals, and exception handling that sits around the systems you already use.

Internal positioning:

> Invaritech helps finance and regulated operations teams automate the messy work between systems: exceptions, approvals, evidence, reporting, reconciliations, and audit trails. We are Asia-based, globally delivered, and founder-led.

## Architecture

The site becomes a content-driven static Next site:

```txt
app/*                       thin route wrappers and metadata
components/site/*           reusable presentation components
lib/site-content/*          editable strategic content
lib/site-content/types.ts   shared content types
lib/site-content/brand.ts   positioning, CTAs, approved terms, banned terms, site config
lib/site-content/navigation.ts
lib/site-content/home.ts
lib/site-content/offers.ts
lib/site-content/proof.ts
lib/site-content/tools.ts
lib/site-content/pages.ts
```

Strategic copy belongs in content modules. Components render structure. Routes compose sections. URLs are changed only deliberately.

The content registry stays pragmatic. Brand-wide copy, offers, proof assets, tools, page metadata, CTAs, and navigation are centralized. Long-form blog posts and legal pages do not need to move into the registry in this pass.

## Content Types

Create `lib/site-content/types.ts`.

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
```

Use `satisfies` on content exports so edits fail fast.

```ts
export const financeOffers = [
    // ...
] satisfies OfferCard[];
```

Centralize the canonical base URL in `brand.ts`:

```ts
export const siteConfig = {
    siteUrl: "https://www.invaritech.ai",
};
```

`PageMetadata.canonical` should be a path, not a full URL.

## Route Policy

We are not rebuilding the sitemap. We are preserving useful existing routes and changing the strategic meaning of the site.

- `/`: umbrella homepage for finance operations and RegOps automation.
- `/finance-exception-automation/`: commercial money page. Core: exception automation and payment controls. Expansion: broader finance operations workflows.
- `/work/`: proof library. Case studies, demos, shipped systems, client/project proof, RegOps proof, and finance proof as it emerges.
- `/work/eudr-compliance-bridge/`: elevated RegOps Bridge case study.
- `/resources/`: tools and resources library.
- `/resources/invoice-extractor/`: live tool page.
- `/resources/cost-to-close-calculator/`: live calculator page.
- `/resources/supplier-payment-control-rule-table/`: rule table page.
- `/resources/invoice-processing-automation/`: guide page.
- `/glossary/three-way-match/`: AP exception proof and demo.
- `/about/`: Asia-based, founder-led delivery model.
- `/contact/`: Finance Workflow Diagnostic conversion page.
- `/blog/`: placeholder content library. Light metadata and title cleanup only for this pass.
- `/privacy/` and `/terms/`: keep, minimal cleanup only if needed.

Redirect policy:

- Do not create compatibility routes for the new information architecture.
- Keep existing sitemap URLs where useful.
- Only add redirects when a URL is intentionally retired or renamed.
- Existing redirect rules stay unless they conflict with the pivot.

Soft-launch navigation:

- Home: `/`
- Finance Automation: `/finance-exception-automation/`
- RegOps: `/work/eudr-compliance-bridge/`
- Tools: `/resources/#tools`
- Work: `/work/`
- Resources: `/resources/#guides`
- About: `/about/`
- Book a Call: `/contact/?diagnostic=1`

## Copy Architecture

The site should say one thing at different levels of specificity.

Homepage:

> Invaritech builds the control layer between your finance systems, approvals, evidence, and exceptions.

Money page:

> We start with finance exception automation and payment controls.

RegOps proof:

> The EUDR bridge proves we can build deterministic, audit-ready workflow infrastructure for regulated operations.

Resources:

> Free tools and guides that show how we think about controls, exceptions, and evidence.

Contact:

> Book a Finance Workflow Diagnostic.

Primary CTA:

> Book Workflow Diagnostic

Supporting CTA sentence:

> Start with a Finance Workflow Diagnostic.

Secondary CTA:

> View Work

Avoid:

- AI transformation
- automate anything
- future of automation
- generic custom software
- world-class
- cutting-edge
- Australia-first
- Australian finance teams

Use:

- control layer
- exceptions
- approvals
- evidence
- audit trail
- reconciliation
- reporting bridge
- governed workflow
- current stack
- fixed scope
- managed support

## Offer Ladder

The offer ladder has five offers, but it should visually collapse into three stages.

1. Diagnose
   - Finance Workflow Diagnostic

2. Build
   - Finance Control Sprint
   - Finance Ops Automation Build
   - RegOps Bridge

3. Support
   - Managed Automation Support

This reduces choice overload while preserving the actual service ladder.

## Visual Direction

The site should feel like finance infrastructure. It should not feel like a generic SaaS landing page or AI agency site.

Use:

- rule tables
- exception queues
- approval flows
- audit timelines
- system diagrams
- before and after workflow maps
- control checklists
- current stack to control layer to governed outcome diagrams

Avoid:

- robots
- magic AI visuals
- fake glossy dashboards
- generic startup gradients
- future of work imagery

Design style:

- restrained, grid-based, editorial-document layout
- off-white background, dark ink, existing green and copper accents
- dense but readable sections
- 8px or smaller radius
- tabular data and rule-like UI where useful
- section bands instead of nested cards

## Conversion Flow

Homepage:

1. Hero: umbrella positioning and diagnostic CTA.
2. Trust strip: Asia-based, globally delivered, founder-led, built around your existing systems.
3. Problem: work lives between systems.
4. Control layer diagram: current stack to Invaritech layer to governed outcome.
5. Offer ladder: Diagnose, Build, Support.
6. Proof: EUDR, three-way matcher, invoice extractor, rule table.
7. Tools and resources preview with placeholders.
8. Method: one workflow first, fixed scope, managed support.
9. Final CTA: Finance Workflow Diagnostic.

Money page:

1. Hero: finance exception automation and payment controls.
2. Pain patterns: duplicate bills, supplier changes, approval gaps, PO mismatches, payment release evidence.
3. Current stack: built around Xero, QuickBooks, NetSuite, spreadsheets, inboxes, and approval tools without forcing a system replacement.
4. Workflow diagram.
5. Offers: Finance Control Sprint and Finance Ops Automation Build.
6. Proof and tools.
7. CTA.

RegOps should stay visible on the homepage as proof and a secondary pillar, but it should not compete with finance as the commercial direction.

## Component Contract

Core reusable components:

- `SiteHero`
- `SectionHeader`
- `TrustStrip`
- `OfferLadder`
- `ProofGrid`
- `ToolDirectory`
- `WorkflowDiagram`
- `ControlChecklist`
- `DiagnosticCTA`
- `PageShell`

Rules:

- Components render typed content.
- Components may own structural UI labels like `aria-label`.
- Components must not own strategic copy.
- Do not duplicate CTA strings across components.
- Do not repeat offer, proof, or tool copy across page files.
- Use stable `id` fields for keys, analytics, anchors, and future CMS migration.

## Psychology

Apply the following models ethically:

- Status quo bias: emphasize that Invaritech works around the current stack.
- Risk reduction: fixed scope, one workflow, written acceptance criteria.
- Authority: EUDR proof, reconciliation experience, founder-led model.
- Reciprocity: free tools and resources before the ask.
- Paradox of choice: one primary CTA and one diagnostic offer.

## Out Of Scope

- Full i18n infrastructure.
- New `/finance-operations-automation/` route.
- New `/tools/` route.
- Full blog rewrite.
- New free tools.
- New case studies beyond placeholders.
- CMS integration.
