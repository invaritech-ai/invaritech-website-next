# INVARITECH Website Payment Control Rebuild Design

Date: 2026-05-12
Branch: `codex/website-overhaul`

## Goal

Rebuild the public website around the new service direction:

INVARITECH designs, builds, and maintains payment controls for finance teams that need fewer manual exceptions, cleaner approvals, and less dollar leakage without changing systems.

The site must stop presenting INVARITECH as a generic AI automation studio. AI can remain a delivery method later in the page or in technical content, but it should not lead the positioning.

## Approved Positioning

Headline:

Clean up payment controls without changing systems.

Primary promise:

We help finance teams reduce manual exception chasing, tighten approvals, and reduce dollar leakage across the software they already use.

Support line:

Australia-first. Founder-led. One client at a time.

Service model:

- Fixed-scope control sprint first.
- Three measurable acceptance criteria agreed before work begins.
- Bugs are on us.
- Objective delivery is on us.
- New features are scoped separately after the original objective is delivered.
- Ongoing managed support keeps live controls working after delivery.

Primary CTA:

Request the Rule Table.

Secondary CTA:

Book a Scoping Call.

## Public IA

Keep only these active public routes:

- `/`
- `/resources/`
- `/blog/`
- `/blog/[slug]/`
- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

All old broad service, tool, work, assessment, result, sprint, and careers pages should be removed from the active public IA.

## Redirect Policy

Use temporary redirects during the launch branch so redirect targets can still change before final production hardening. Convert high-confidence redirects to permanent only after copy and analytics are stable.

Redirect targets:

- `/services/*` -> `/`
- `/tools/*` -> `/resources/`
- `/work/*` -> `/about/`
- `/careers/` -> `/`
- `/assessment/` -> `/`
- `/results/` -> `/`
- `/ops-efficiency-sprint/` -> `/`
- `/ai-automation-sprint/` -> `/`

Keep `/contact/` active.

## Homepage Design

The homepage is the primary sales page. It should be lean and conversion focused.

Sections:

1. Hero
2. Problem
3. Who it is for
4. How it works
5. Final CTA

Hero:

- H1: Clean up payment controls without changing systems.
- Subhead: We help finance teams reduce manual exception chasing, tighten approvals, and reduce dollar leakage across the software they already use.
- Support: Australia-first. Founder-led. One client at a time.
- Primary CTA: Request the Rule Table.
- Secondary CTA: Book a Scoping Call.

Problem section:

- Header: What your finance team is dealing with.
- Lead with daily symptoms, not abstract categories.
- Include examples such as invoice-to-PO mismatches, supplier statement gaps, missing proof-of-delivery documents, carrier surcharge variances, duplicate payments, and approvals that rely on memory.
- Ask whether controls still live in inboxes, spreadsheets, and tribal knowledge.

Who it is for:

- Header: Built for teams like yours.
- Company type first.
- Use four vertical cards:
  - Freight and logistics: margin leakage from carrier overcharges.
  - Wholesale and distribution: silent leakage from duplicate and erroneous payments.
  - Manufacturing: manual review load from three-way-match exceptions.
  - Mining and construction: high-value payment control risk.

How it works:

- Header: A fixed-scope control sprint.
- Steps:
  1. Map the control problem.
  2. Lock the objective.
  3. Build around current systems.
  4. Keep it working.

Acceptance criteria examples:

- Every in-scope exception is routed before payment release.
- Every approved exception has verification evidence attached.
- Every release decision is replayable with owner, timestamp, and audit notes.

Avoid on the homepage:

- Generic AI automation language.
- Hard quantified claims like guaranteed recovery percentages.
- Overclaiming fraud detection.
- Positioning as a software-only product.

## Resources Page

Purpose:

Convert low-friction interest into a captured lead through a practical asset.

Page headline:

Practical payment-control resources for finance teams.

Primary asset:

Supplier Payment Control Rule Table.

Description:

A practical workbook for mapping payment-change checks, exception routing, approval evidence, and audit notes before payment release.

Form fields:

- Work email.
- Company.
- Role.
- Industry.
- Main exception type.

Implementation:

- Use the existing `/api/contact` path first.
- Keep the visible form simple.
- Layer Apollo form enrichment later without requiring a broad form redesign.
- Enrichment should help identify company context, not replace the buyer's self-reported exception problem.

## Blog Page

Purpose:

Long-form discovery and authority building.

Positioning:

Operational playbooks for cleaner finance ops.

Content types:

- Step-by-step guides.
- Workflow teardowns.
- Operational notes.
- Practical DIYs.

Categories:

- AP Controls.
- Invoice Exceptions.
- Payment Risk.
- Finance Ops.
- Audit Trails.

The blog may retain existing posts during transition, but the page framing and new future content direction should shift away from broad AI automation.

## About Page

Purpose:

Explain why the service model is founder-led and high-accountability.

Headline:

Founder-led payment control design.

Core points:

- One client at a time.
- Direct principal involvement.
- Objectives agreed before work begins.
- Bugs are on us.
- New scope stays separate.
- Ongoing managed support after delivery.

Founder bios stay, but the surrounding narrative should connect founders to governed finance workflow delivery rather than generic AI delivery.

## Contact Page

Purpose:

Quiet page for people who are not ready to book or want to ask whether a specific workflow is a fit.

Headline:

Talk to us about a finance control problem.

Subhead:

Use this page if you are not ready for a formal call yet, or if you want to ask whether a specific payment, invoice, or exception workflow is a fit for a control sprint.

Fields:

- Name.
- Work email.
- Company.
- Role.
- What are you trying to clean up?

Primary CTA:

Send the Context.

Secondary CTA:

Prefer a direct conversation? Book a scoping call.

## Navigation And Footer

Header nav:

- Home.
- Resources.
- Blog.
- About.
- Book a Call.

Footer:

- Short payment-control positioning.
- Same core navigation.
- Legal links.
- Email and social links.

Do not include old services, tools, careers, or work links in primary navigation.

## SEO And Structured Data

Global metadata should shift from enterprise AI automation to payment control design.

Sitemap should include only:

- Kept public routes.
- Blog posts.
- Legal pages.

Structured data should include:

- Organization: payment control design.
- WebSite: payment control design for finance teams.
- WebPage: homepage promise.
- Service: fixed-scope payment control sprint.
- Service: managed payment control support.

Area served:

- Australia.
- APAC where useful as supporting context.

## Visual Direction

Use a quiet, operational, finance-control aesthetic:

- Dense but readable.
- Strong editorial typography.
- Minimal decorative noise.
- Cards only for repeated items.
- Clear bands for page sections.
- No purple-heavy AI gradients.
- Avoid visual language that makes the service look like a generic SaaS product.

The design should feel like a controlled operating manual, not a hype page.

## Website Copy Standard

Public website copy must sound like a technical founder speaking plainly to a finance operator.

Hard rules:

- Do not use em dashes.
- Do not use en dashes.
- Do not use formulaic contrast lines like `It is not an X problem. It is a Y problem.`
- Do not use obvious AI-written rhetoric such as `not just X, but Y`, `X is not merely Y`, `the future of`, `unlock`, `supercharge`, `seamless`, `transform`, or `revolutionize`.
- Prefer short direct sentences.
- Use concrete nouns from the buyer's work: invoice, payment, approver, evidence, exception, supplier, carrier, statement, POD, queue, audit trail.
- Use contractions sparingly. Prefer steady, professional copy.

Approved style:

- `We help finance teams reduce manual exception chasing, tighten approvals, and reduce dollar leakage across the software they already use.`
- `Are your payment controls still living in inboxes, spreadsheets, and tribal knowledge?`
- `Every release decision is replayable with owner, timestamp, and audit notes.`

## Design System Requirement

Before rebuilding pages, define the reusable design language in `app/globals.css`.

The implementation should establish shared primitives for:

- Colors and section backgrounds.
- Border radius.
- Desktop, tablet, and mobile section spacing.
- Horizontal page margins.
- Typography scale.
- Grids.
- Cards.
- Buttons.
- Form inputs.
- Notices and divider panels.

Rebuilt pages should use semantic site classes such as `site-page`, `site-section`, `site-container`, `site-h1`, `site-h2`, `site-lead`, `site-card`, `site-button`, and `site-input`.

Do not scatter random one-off Tailwind classes across page JSX for colors, margins, padding, gaps, text sizing, borders, or radius. If a visual pattern is needed, add a named design primitive first, then use that primitive on the page.

## Typography Specification

Font families:

- Display font: `--font-display`, using Georgia, Cambria, and Times New Roman fallbacks.
- Body font: `--font-body`, using the local Geist variable font.
- Label font: `--font-label`, using the local Geist Mono variable font.

Usage:

- `site-h1`, `site-h2`, and `site-h3` use the display font.
- `site-lead`, `site-body`, `site-small`, forms, cards, and paragraphs use the body font.
- `site-kicker`, `site-meta`, `site-label`, and compact operational labels use the label font.

Scale:

- Hero heading: mobile `text-6xl`, tablet `text-8xl`, desktop `text-[8.5rem]`, line height `0.9`.
- Section heading: mobile `text-4xl`, tablet and desktop `text-6xl`, tight line height.
- Card heading: mobile `text-2xl`, tablet and desktop `text-3xl`, tight line height.
- Lead copy: mobile `text-xl`, tablet and desktop `text-2xl`, relaxed line height.
- Body copy: mobile `text-base`, tablet and desktop `text-lg`, relaxed line height.
- Labels: `11px` mono uppercase with controlled tracking.

Rules:

- Do not choose fonts inside page JSX.
- Do not add ad hoc `text-*`, `leading-*`, `tracking-*`, or `font-*` classes in page JSX when a `site-*` typography primitive exists.
- If a new type style is needed, define it in `app/globals.css` first.

## Implementation Guardrails

- Delete or redirect old public routes only after redirect handling is in place.
- Do not mix old AI automation page copy with the new payment-control narrative.
- Keep implementation scoped to public site routing, content, metadata, and lead capture.
- Do not refactor unrelated shared components unless needed to remove public references to old pages.
- Run `pnpm lint`.
- Run `pnpm build`; if the known Turbopack sandbox error recurs, rerun with elevated permissions.
