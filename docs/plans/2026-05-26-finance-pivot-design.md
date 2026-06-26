# Finance Exception Automation Pivot — Design

**Date:** 2026-05-26
**Author:** Engineering (with marketing brief from Avi)
**Status:** Approved, ready for implementation plan
**Window:** 2 weeks
**Branch base:** `brand-story-copy-update` (continue on it)

---

## Goal

Reposition the website around a single message — **"Move faster without adding AP headcount"** — so cold-email visitors convert to booked Finance Workflow Audit calls. The site must also continue ranking for finance-keyword search and convert organic visitors through the same canonical CTA.

Three objectives in priority order:

1. **Cold-email conversion** — outreach traffic lands on `/finance-exception-automation`, books an audit through `/contact?audit=1`.
2. **Organic-search conversion** — search visitors landing on glossary, resources, or homepage funnel to the same audit CTA.
3. **SEO ranking** — preserve and extend keyword surface area (target: "finance exception automation," "duplicate invoice detection," existing three-way-match cluster).

Cold-email is the business-critical path. Everything else is secondary unless it directly improves cold-email conversion this week.

---

## Scope split

### Ship in 2-week window (critical path)

- **Component decomposition** of current homepage into `components/home/` (refactor only, no behavior change)
- **Homepage repositioning** — broader company-level positioning, 6 sections
- **`/finance-exception-automation`** — money page, 8 content sections
- **Nav rewire** — primary nav routes to `/finance-exception-automation` and its anchors; `/about`, `/work`, `/blog` move to footer
- **Canonical `AuditCTA`** — one component used everywhere, replaces `GlossaryPrimaryCTA`
- **Campaign parameter forwarding** — `?src=` and `?campaign=` propagate from landing page through CTA clicks to `/contact?audit=1`
- **Basic SEO** on money page — `Metadata` (title, description, canonical, OG), sitemap entry
- **CTA copy migration** — every "Book the audit" / "Book a free Finance Exception Audit" / generic `/contact` link → "Book a Finance Workflow Audit" pointing at `/contact?audit=1`

### Deferred (post cold-email launch)

- `/glossary/duplicate-invoice-detection/` SEO cluster page
- Advanced analytics (`money_page_section_view`, `systems_card_expand` events)
- Playwright-driven screenshot automation for demo preview tile (use a hand-captured static asset instead, swap later)
- Full JSON-LD schema on money page (`WebPage`, `ItemList`, `FAQPage`) — basic metadata only inside the window
- Expanded test suite (schema tests, internal-link audit tests beyond a smoke check)
- `/finance-workflow-exception-audit` audit explainer page
- Per-system pages (`/duplicate-invoice-exception-system`, `/vendor-change-control-system`, etc.)
- Visual rename of "Glossary" → "Finance Automation Guide" on `/glossary/three-way-match/` breadcrumb (low-risk, can land any time)

---

## Page roles

| Route | Role | Headline direction | Primary CTA |
|---|---|---|---|
| `/` | Company positioning (broad) | "AI workflow automation for document-heavy operations." | "Explore Finance Automation" → `/finance-exception-automation` |
| `/finance-exception-automation` | **Money page** (finance-narrow) | "Move faster without adding AP headcount." | "Book a Finance Workflow Audit" → `/contact?audit=1` |
| `/glossary/three-way-match/` | SEO + demo, education page (already shipped) | (existing) | "Book a Finance Workflow Audit" → `/contact?audit=1` |
| `/contact?audit=1` | Conversion form | (existing form) | (form submit) |

Homepage is the parent company page. Money page is the focused conversion page.

---

## Navigation

Primary nav (every page header):

```
Finance Automation  →  /finance-exception-automation
Demo                →  /glossary/three-way-match/
Systems             →  /finance-exception-automation#systems
How It Works        →  /finance-exception-automation#how
Resources           →  /resources/
Book Audit          →  /contact?audit=1
```

Footer:

- **Company:** About, Work, Blog, Contact, Privacy, Terms
- **Finance Automation:** `/finance-exception-automation`, `/glossary/three-way-match/`, `/resources/` (selected)
- **Tools:** `/resources/cost-to-close-calculator`, `/resources/invoice-extractor`, `/resources/supplier-payment-control-rule-table/`

Existing routes (`/about`, `/work`, `/blog`) stay live and reachable from the footer. No redirects, no SEO loss.

---

## Page content plans

### `/` — Company positioning homepage

Six visible sections plus footer/colophon:

1. **CoverHero** (`variant="homepage"`)
   - Headline: "AI workflow automation for document-heavy operations."
   - Subhead: "Invaritech builds custom automation systems for finance, compliance, and operations teams that need to move faster without adding headcount."
   - Trust line: "Built for teams using accounting systems, regulatory portals, document workflows, and approval chains."
   - Primary CTA: Explore Finance Automation → `/finance-exception-automation`
   - Secondary CTA: Try the matcher demo → `/glossary/three-way-match/`

2. **WhatWeAutomate** (NEW) — 3-card grid
   - Finance exception checks
   - Regulatory document workflows
   - Operations approval gaps
   - Each card: one-line example + inline anchor. Finance card links to money page; others reference Work/EUDR or stay anchor-only.

3. **DocumentHeavyProblem** — broader voice variant of current MessyMiddle
   - Title: "Your software stores the transaction. Your team still checks the exceptions."
   - 5-6 bullets covering finance + compliance + operations pains
   - Closer: "If your team manually checks these every week, that workflow is ready for automation."

4. **FinanceFirstFocus** (NEW) — funnel section
   - Title: "Finance exception automation is our first focus."
   - 2-3 paragraphs explaining the depth area (high frequency, high stakes, high manual cost). Names the 5 systems by category, no card detail (lives on money page).
   - Primary CTA: See finance exception systems → `/finance-exception-automation`

5. **ProofGrid** (`variant="broad"`) — sub-grouped
   - Row 1: **Finance exception logic** — EUDR document workflow + matcher demo
   - Row 2: **Adjacent automation capability** — WhatsApp booking, inventory ops, regulatory APIs
   - Brief framing line above each row

6. **HowWeWork** (broader voice variant of ServiceMethod)
   - Title: "Find · Encode · Automate · Monitor · Improve."
   - Reuse current 5 steps, broaden step copy where it mentions "exception" specifically
   - Primary CTA: Book a Finance Workflow Audit

Existing `Footnotes` and `Colophon` sections retained as-is. `LiveOpsStrip` and `RunLog` retained on hero (already shipped).

### `/finance-exception-automation` — Money page

Eight content sections per marketing brief:

1. **CoverHero** (`variant="landing"`)
   - Headline: "Move faster without adding AP headcount."
   - Subhead: "We build AI-powered finance exception systems that catch invoice mismatches, duplicate bills, vendor-detail changes, and approval gaps before payment release."
   - Trust line: "Built for growing businesses using accounting systems, spreadsheets, email approvals, and document-heavy finance workflows."
   - Primary CTA: Book a Finance Workflow Audit
   - Secondary CTA: Try the 3-Way Matching Demo → `/glossary/three-way-match/`
   - Reads `?src` and `?campaign` from URL on mount; forwards to all CTA hrefs and stores in `sessionStorage`

2. **Problem**
   - Title: "Your accounting system stores the transaction. Your team still checks the exceptions."
   - 6 pain bullets (from brief, voice-refined):
     - Duplicate supplier bills
     - Invoice, PO, and receipt mismatches
     - Vendor bank-detail changes
     - Missing approval evidence
     - Unusual amounts or descriptions
     - Documents scattered across email, folders, and accounting exports
   - Closer: "If your team manually checks these every week, that workflow is ready for automation."

3. **DemoPreview** `id="demo"`
   - Title: "See how finance exception automation works."
   - Static screenshot/preview tile of the matcher results (hand-captured PNG/WebP at `public/images/finance/three-way-matcher-preview.webp`, ~640px wide; auto-capture deferred)
   - Body: "Our 3-way matching demo shows how invoices, purchase orders, and delivery evidence can be compared automatically — with exceptions routed for review instead of manual checking."
   - Reminder line: "3-way matching is one example. The same approach can be applied to duplicate bills, vendor changes, missing approvals, and other payment-control checks."
   - Primary CTA: Try the demo → `/glossary/three-way-match/`
   - Secondary CTA: Book a walkthrough → `/contact?audit=1`

4. **SystemsRegister** `id="systems"`
   - Title: "Fixed-scope finance exception systems."
   - 5 cards: Duplicate Invoice Exception System · Vendor Change Control System · Approval Gap Detection System · 3-Way Matching Exception System · AP Exception Dashboard
   - Each card expands on click to reveal detail panel (typical inputs, what it catches, sample exception types, fixed-scope price). Same-page anchors `#dup-invoice`, `#vendor-change`, `#approval-gap`, `#three-way`, `#dashboard` for shareable links.
   - Card body wording follows brief verbatim (refined for voice).

5. **ServiceMethod** `id="how"`
   - Title: "Start with one workflow. Prove value. Then expand."
   - 5 steps from brief:
     1. Audit the workflow
     2. Identify the highest-value exception
     3. Build the first system
     4. Route exceptions for review
     5. Improve over time
   - Reuse current `ServiceMethod` visual (vertical thread)

6. **WhyNotAccounting**
   - Title: "We do not replace your accounting software. We automate the checks around it."
   - Lede: "Accounting systems are excellent at recording transactions. But every business has custom rules around approvals, documents, vendors, evidence, thresholds, and exception handling. That is where manual work creeps back in."
   - 2-column comparison table (5 rows, brief verbatim, voice-refined):

     | Existing systems          | Invaritech automation layer                 |
     | ------------------------- | ------------------------------------------- |
     | Stores bills and payments | Flags risky or duplicate candidates         |
     | Holds supplier records    | Detects sensitive supplier changes          |
     | Tracks transactions       | Connects documents, approvals, and evidence |
     | Exports reports           | Creates review queues and exception logic   |
     | Supports finance work     | Automates the checks around finance work    |

7. **AuditCTASection**
   - Title: "Book a Finance Workflow Exception Audit."
   - Lede: "We inspect one finance workflow and identify which checks can be automated first. You receive a workflow map, exception-risk list, recommended first build, and a fixed-scope implementation plan."
   - Deliverables list:
     - Workflow map
     - Manual check inventory
     - Exception risk list
     - Sample automation opportunities
     - Recommended first system
     - Fixed-scope build estimate
   - Price hidden inside 2-week window (per brief option)
   - Primary CTA: Book a Finance Workflow Audit

8. **ProofGrid** (`variant="finance-emphasis"`)
   - Same component as homepage but finance row gets visual priority (top placement, larger cards)
   - Adjacent automation row second

9. **FinalCTA**
   - Headline: "Before hiring another AP/admin person, check what can be automated first."
   - One-line repeat of audit pitch
   - Primary CTA: Book a Finance Workflow Audit
   - Secondary CTA: Try the 3-Way Matching Demo

### `/glossary/three-way-match/` — small updates

Already shipped. Inside-window updates:

- All `GlossaryPrimaryCTA` callsites switch to the new shared `AuditCTA` (after CTA consolidation)
- Hrefs become `/contact?audit=1&src=glossary-3wm`
- "Related reading" updates:
  - Remove `/work#document-matching`
  - Add `/finance-exception-automation#systems` ("See the full system catalog")
  - Keep `/resources/invoice-extractor` and `/resources/supplier-payment-control-rule-table`
- Breadcrumb visual rename ("Glossary" → "Finance Automation Guide") is **deferred** (low-priority, post-launch)

---

## Component & file plan

### Decomposition (Phase 1 — refactor only)

```
components/home/
  _motion.ts                       fadeUp, stagger, ease constants
  _shared/
    audit-cta.tsx                  Canonical AuditCTA; replaces GlossaryPrimaryCTA
    eyebrow.tsx                    Reusable eyebrow molecule
    section-mark.tsx               Reusable section-header molecule
  live-ops-strip.tsx
  run-log.tsx
  variance-exhibit-video.tsx
  variance-exhibit.tsx
  cover-hero.tsx                   accepts variant: "homepage" | "landing"
  problem.tsx                      variant: "broad" | "finance"
  service-method.tsx               variant: "broad" | "finance"
  systems-register.tsx             new prop: expandable cards
  why-not-accounting.tsx           includes ComparisonTable sub-component
  audit-cta-section.tsx            full-section audit pitch (uses AuditCTA component)
  proof-grid.tsx                   variant: "broad" | "finance-emphasis"
  footnotes.tsx
  colophon.tsx

components/exception-automation-home.tsx  →  thin composer (~30 lines), homepage variant
```

### New sections (Phase 2/3)

```
components/home/
  what-we-automate.tsx             3-card grid: finance / compliance / operations
  finance-first-focus.tsx          homepage funnel section → money page
  demo-preview.tsx                 money page: preview tile + CTAs
  final-cta.tsx                    money page: last-section pitch
  why-not-accounting/
    comparison-table.tsx           5-row table sub-component
```

### Routes

```
app/finance-exception-automation/
  page.tsx                         money page composer + metadata

app/page.tsx                       unchanged composer entry (renders updated exception-automation-home)
```

`app/glossary/duplicate-invoice-detection/` deferred.

### Asset

```
public/images/finance/
  three-way-matcher-preview.webp   hand-captured screenshot, 640w + 1280w
  three-way-matcher-preview.png    fallback
```

Capture method: run dev server, load `/glossary/three-way-match/`, paste sample data, click Match now, take a tight screenshot of the results table including count strip. Manual one-time capture inside the window; Playwright automation deferred.

### CTA architecture

`components/home/_shared/audit-cta.tsx`:

```tsx
type AuditCTAProps = {
    location: "hero" | "mid" | "footer" | "nav" | "card";
    label?: string;                                  // default: "Book a Finance Workflow Audit"
    variant?: "primary" | "secondary";              // default: "primary"
    src?: string;                                    // analytics + URL param
    campaign?: string;                               // URL param
    className?: string;                              // for one-off layout tweaks
};
```

Behavior:
- Builds href as `/contact?audit=1` plus any `src`/`campaign` params.
- If no `src` prop passed, falls back to `sessionStorage` (set on landing by `useUtmCapture`).
- Fires `trackSiteEvent("cta_click", { location, src, campaign })` on click.
- Uses `.site-button` (primary) or `.site-button-secondary` (variant) plus `.audit-cta` class for layout tweaks. No hardcoded inline Tailwind for design-token clusters (same rule applied to glossary refactor).

### Nav update

```
components/header.tsx              menuItems array updated to 6 entries (5 nav + Book Audit)
                                   anchor links use Next Link; mobile menu mirrors
components/footer.tsx              add "Finance Automation" column with money page +
                                   glossary + tools; keep existing Company column
```

### Analytics (lite)

`lib/analytics/glossary-events.ts` renamed to `lib/analytics/site-events.ts`. Existing event names preserved for backward compat. One new helper:

```typescript
export function useUtmCapture(): void;   // on mount, reads ?src/?campaign, stores in sessionStorage
```

Advanced events (`money_page_section_view`, `systems_card_expand`) deferred.

### SEO (lite)

- `app/finance-exception-automation/page.tsx` exports `metadata`: title, description, canonical, OG. Target keywords: "finance exception automation," "AP exception system," "invoice exception automation."
- `app/sitemap.ts` adds `/finance-exception-automation` at priority 0.8
- No JSON-LD schemas on money page inside the window (deferred)
- `app/glossary/three-way-match/page.tsx` schema unchanged (already shipped)

### Testing (lite)

- `tests/site-cta.test.mjs` — NEW: `AuditCTA` builds correct hrefs from props
- Smoke: existing `tests/internal-links.test.mjs` updated to include money page URL (one assertion)
- Existing test suite continues to pass (28/28)
- No new schema tests inside the window

---

## Phase ordering & commit cadence

```
Phase 1   Refactor: extract sections, no behavior change       ~10 commits
Phase 2   Homepage rewrite (broader content)                   ~6  commits
Phase 3   Money page build (8 sections + metadata + sitemap)   ~10 commits
Phase 4   Nav update + footer reshuffle                        ~2  commits
Phase 5   CTA consolidation + AuditCTA migration               ~3  commits
Phase 6   Campaign parameter forwarding (useUtmCapture)        ~2  commits
Phase 7   Tests + final validation                             ~2  commits
                                                                ─────────────
                                                                ~35 commits
```

Per-phase gates:
- `pnpm build` — must succeed
- Test suite — must stay green (28/28 + 1 new in Phase 7 = 29)
- Visual diff against prior commit (eyeball homepage + money page)

---

## Visual & styling rules

- **No hardcoded inline design-token Tailwind classes** for colors, borders, panel shapes, typography clusters. Use named classes in `app/globals.css` (same rule applied to glossary refactor). Add a `/* Home page */` and `/* Money page */` section near the existing `/* Glossary page */` block with new `.home-*` and `.finance-page-*` classes as needed.
- Layout-positioning utilities (`mt-8`, `gap-3`, `grid-cols-*`) inline is acceptable.
- All new classes use `@apply` with Tailwind utilities, matching existing `.site-*`/`.glossary-*` conventions.
- Forensic-audit voice maintained: monospace eyebrows, document/redline aesthetic, sparse color, dense information.

---

## Open items / explicit deferrals

These are flagged for the writing-plans skill so they appear in the implementation plan's "Follow-up after launch" section:

1. **`/glossary/duplicate-invoice-detection/`** — 1500-2000 word SEO page mirroring three-way-match template
2. **JSON-LD schemas on money page** — `WebPage` + `ItemList(systems)` + `FAQPage`
3. **Advanced analytics** — `money_page_section_view` (scroll-observed), `systems_card_expand` event
4. **Playwright screenshot automation** — auto-capture matcher preview on each release
5. **`/finance-workflow-exception-audit`** explainer page (separate from `/contact?audit=1`)
6. **Per-system pages** — `/duplicate-invoice-exception-system`, `/vendor-change-control-system`, etc.
7. **Glossary visual rename** — "Glossary" breadcrumb label → "Finance Automation Guide"
8. **Money page Rich Results validation** — once schemas land

---

## Success criteria (cold-email launch readiness)

The pivot ships when all of these are true:

- [ ] `/finance-exception-automation` renders all 8 content sections
- [ ] Every CTA on the money page points to `/contact?audit=1` with optional `&src`/`&campaign`
- [ ] Cold-email URL pattern works: `/finance-exception-automation?src=cold-email&campaign=X` → captured → forwarded to `/contact?audit=1&src=cold-email&campaign=X`
- [ ] Primary nav routes "Finance Automation," "Systems," "How It Works" to the money page
- [ ] Homepage no longer leads with finance-specific hero copy; "Explore Finance Automation" is the primary CTA
- [ ] `/about`, `/work`, `/blog` removed from primary nav, available in footer
- [ ] Build green, 29/29 tests passing
- [ ] Mobile 375px visual check on both new/updated pages
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO = 100 on money page

---

## Implementation plan

To be generated next by the `superpowers:writing-plans` skill from this design doc.
