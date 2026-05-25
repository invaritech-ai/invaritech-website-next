# Design: /glossary/three-way-match/

**Status:** Approved
**Date:** 2026-05-25
**Owner:** Aditi Garg (page byline), Avi (build)
**Goal:** Ship the first cluster page from the SEO research output. Single static glossary entry with embedded client-side tool, ~2,500 words, dual CTAs, FAQPage + Article schema.

---

## Context

The site needs discoverability. Ahrefs data confirms the three-way-match keyword cluster is the highest-ROI starting point: KD 2-4 across the cluster, combined US search volume ~1,750, the software variant carries a $20 CPC. Domain Rating is 11, so we cannot win head-to-head against medius (DR 71) on broad terms. Cluster pages aimed at low-KD long-tail are the realistic path.

This page targets:

| Keyword | KD | US SV | CPC |
|---|---|---|---|
| 3 way match | 2 | 600 | $2.50 |
| three way match | 4 | 450 | $2.00 |
| invoice matching software | 2 | 500 | $20.00 |
| three-way matching | 2 | 100 | n/a |
| invoice matching automation | 0 | 100 | n/a |

Combined target ~1,750 US SV, ~5,500 GSV. Realistic at DR 11.

## Decisions (grilling pass, 15 questions)

1. **URL:** `/glossary/three-way-match/`. New route. Single TSX page per entry, no dynamic slug yet. Refactor when entries 2-5 ship.
2. **Tool scope:** Pure client-side, paste-or-CSV input, pre-loaded sample data.
3. **Matching scope:** Real three-way (invoice + PO + GR), not two-way.
4. **Schema:** Five fields per record: PO Number, Vendor, Amount, Quantity, Line Description. GR omits Amount.
5. **Tolerance:** One adjustable knob (amount tolerance, default 2%). Everything else fixed defaults.
6. **Results display:** Summary count strip + sortable/filterable exception review queue table.
7. **Tool position:** Hybrid. Short intro + tool above the fold. Long-form content below.
8. **Content depth:** Standard, ~2,500 words across 8 H2 sections.
9. **CTA strategy:** Dual. Primary "Book a free Finance Exception Audit" appears three times. Secondary "Run on real export" form appears once, immediately below tool results.
10. **Schema markup:** Article + FAQPage + BreadcrumbList. Skip HowTo (deprecated) and SoftwareApplication (stretch).
11. **Visual style:** Lighter document-aesthetic. Same color palette and type. Drop marginalia rails, rotated stamps, run-log, doc-stamps. Keep section-mark eyebrows, exception-register table style.
12. **Byline:** Aditi Garg, Founder & Director. Schema author entity with LinkedIn (www.linkedin.com/in/aditigarg95) and Google Scholar (citations?user=0WE3rSUAAAAJ) sameAs.
13. **Glossary index page:** Defer. Build when 3+ entries exist.
14. **Analytics:** Standard. Tool interaction events + CTA clicks via gtag/GA4.
15. **Internal linking:** Comprehensive audit. Grep for related phrases, list candidates, update in a bounded half-day pass.

## File structure

```
app/glossary/three-way-match/page.tsx        Server component, static
components/glossary/
  three-way-matcher.tsx                       Client component, "use client"
  three-way-matcher/
    sample-data.ts                            Pre-loaded invoice/PO/GR rows
    match-engine.ts                           Pure functions, no React
    types.ts                                  TypeScript types
lib/seo/
  three-way-match-schema.ts                   JSON-LD generators
lib/analytics/
  glossary-events.ts                          gtag wrapper for custom events
```

## Page structure

### Above the fold

- Breadcrumb: Invaritech > Glossary > Three-Way Match
- Eyebrow: "Glossary · Reference"
- H1: "Three-Way Match: Invoice, PO, and Goods Receipt Matching"
- 60-80 word definition lede
- Byline block: Aditi Garg name, role, one-sentence bio, last-updated date, read time
- Primary CTA: Book a free Finance Exception Audit
- Secondary affordance: "Try the matcher below"
- The tool, full-width

### Below the fold (~2,500 words)

1. What three-way matching actually checks (~300 words)
2. Why it matters (~250 words)
3. The seven canonical three-way match exceptions (~500 words)
4. Manual three-way match vs. automated (~300 words)
5. Beyond client-side: OCR, LLM matching, agentic workflows (~300 words)
6. How Invaritech builds three-way match automation (~250 words, includes Matthew Baldwin EUDR testimonial as adjacent proof)
7. FAQ (~300 words, six Q&As, FAQPage schema-marked)
8. Related glossary entries (placeholder, links to /work#document-matching and /resources/invoice-extractor for now)

Primary CTA repeats after Sections 4 and 7. Secondary CTA appears once, directly under tool results.

## Tool specification

### Input shape

Three text areas (tabbed on mobile):

```
Invoice rows:  PO Number | Vendor | Amount | Quantity | Line Description
PO rows:       PO Number | Vendor | Amount | Quantity | Line Description
GR rows:       PO Number | Vendor | Quantity Received | Line Description
```

Pre-loaded with sample data: 15 invoices, 12 POs, 10 GRs. Sample is designed to surface each of the 7 exception types exactly once on first run.

Secondary input path: 3 file drop zones below the textareas accept CSV uploads. Same parser, sourced from FileReader.

### Controls

- Amount tolerance dropdown: 0% / 1% / 2% / 5% / 10%, default 2%
- "Match Now" button
- "Reset sample" button (restores pre-loaded data)

### Matching engine

Pure functions in `match-engine.ts`:

- **PO Number:** exact join, case-insensitive, whitespace-stripped
- **Vendor:** exact, case-insensitive
- **Amount:** within tolerance band (configured percentage or $50 minimum, whichever larger)
- **Quantity:** exact for invoice vs PO. Under-receipt flagged as variance for GR vs invoice
- **Line description:** Jaccard token overlap > 0.5 threshold

### Output statuses

| Status | Color | Trigger |
|---|---|---|
| MATCHED | green | All three documents align |
| AMOUNT_VARIANCE | copper | PO/invoice amount diff exceeds tolerance |
| QUANTITY_VARIANCE | copper | GR qty does not equal invoice qty |
| MISSING_PO | red | Invoice has no matching PO |
| MISSING_GR | red | Invoice + PO matched but no GR |
| VENDOR_MISMATCH | red | Same PO# but different vendors |
| LINE_DESC_MISMATCH | amber | Jaccard < 0.5 |
| DUPLICATE_INVOICE | red | Same PO# matched to two invoices |

### Results panel

- Top: count strip with status badges
- Filter chips: All / Matched / Variance / Missing / Duplicate
- Sortable table: Invoice → PO → GR → Status → Reason (explainable text)
- Privacy callout below tool

### Privacy copy

> This runs entirely in your browser. Your data never leaves your device. Open DevTools, Network tab to verify. Server-side automation enables PDF OCR, fuzzy vendor normalization, semantic line-item matching, and agentic exception routing. Not available in this client-side demo.

## CTA copy

### Primary (appears 3x)

```
Book a free Finance Exception Audit
We review your full AP workflow and recommend the smallest useful first
system. Free during launch.
```

Placements: hero, mid-page after Section 4, after FAQ.

### Secondary (1x, immediately below tool results)

```
Want this running on your real AP export?

Drop your invoice / PO / GR CSVs. We will run the full server-side
matcher with OCR, fuzzy vendor normalization, and agentic exception
routing. We will send back a one-page exception report within 24 hours.
No call required.

[email field]
[Invoice CSV] [PO CSV] [GR CSV]
[Send for analysis]
```

Backend: posts to existing /contact action or new /api/glossary-secondary route. First 5-10 submissions handled manually before any server-side matcher infra is built.

## Schema markup

Three JSON-LD blocks on the page:

1. **BreadcrumbList:** Invaritech > Glossary > Three-Way Match
2. **Article:** with author Aditi (sameAs LinkedIn + Scholar), datePublished, dateModified, articleSection: "Glossary"
3. **FAQPage:** six Question/Answer entities matching the six FAQ Qs in Section 7

## Byline block

```
By Aditi Garg · Founder & Director, Invaritech

Aditi directs automation builds at Invaritech, including the EU TRACES
regulatory document workflow. She is now applying the same exception-
routing approach to finance and AP teams.

Last updated: [date] · ~12 min read
```

## Visual style

Lighter document-aesthetic:

- Color: forest green (`--primary`), copper accent (`--accent`), paper (`--background`)
- Type: Source Serif 4 (display + body), IBM Plex Mono (eyebrows + labels), Source Sans 3 (UI)
- Section-mark eyebrows on every H2 (`h-px w-8 bg-primary/60` + `font-mono uppercase tracking-[0.22em] text-primary`)
- Body column max-width `max-w-2xl` (~720px). Tool spans wider container
- Line-height 1.7 on long-form prose
- Anchor-linkable H2s for deep links
- Drop: marginalia rails, rotated stamps, run-log treatment, doc-stamps, large sequence numerals

The exception-register table style from the homepage is reused for tool results since the data shape is identical.

## Internal linking (audit and update)

Half-day bounded pass:

1. grep the codebase for: `three-way match`, `three way match`, `invoice matching`, `AP exception`, `duplicate invoice`, `PO matching`, `document matching`
2. List every match. Decide per-match: add inline link / leave alone / replace
3. Update homepage `What we automate` table: add secondary "Learn how three-way matching works" link next to existing `/work#document-matching` link
4. Update `/work/eudr-compliance-bridge` case study: add "Related capability: three-way matching" inline reference
5. Add `/glossary/three-way-match/` to footer Resources block (create block if none exists)

## Analytics events

All events via gtag, GA4 destination, no PII in props.

| Event | Properties |
|---|---|
| glossary_tool_run | tolerance_percent, input_method, has_gr_data |
| glossary_tool_tolerance_change | new_value |
| glossary_tool_csv_upload | success, error_type, file_type |
| glossary_secondary_cta_submit | has_invoice_csv, has_po_csv, has_gr_csv |
| glossary_filter_chip_click | filter |
| cta_click | location, page |

Wrapped in `lib/analytics/glossary-events.ts`.

## Out of scope

- `/glossary/` index page (defer until 3+ entries)
- MDX migration of blog
- Server-side matcher backend (manual handling of first submissions)
- Vendor fuzzy matching, PDF OCR, semantic line-item matching, agentic routing in the demo tool
- A/B test infrastructure
- Comment system, social share buttons
- Newsletter signup
- Glossary entries 2 through N

## Success criteria

- Page ships at `/glossary/three-way-match/` with all 8 H2 sections written
- Tool runs in browser, sample data demonstrates all 7 exception types on first click
- CSV upload works for all 3 inputs with graceful error handling
- All three JSON-LD schemas validate in Google Rich Results Test
- Lighthouse: Performance > 90, SEO 100, Accessibility > 95
- Internal linking audit completed and changes merged
- GA4 events fire correctly (verified in DebugView)
- pnpm build green, no console errors

## Risks and mitigations

- **Risk:** Sample data feels artificial. **Mitigation:** Aditi reviews sample for realism before ship.
- **Risk:** Secondary CTA generates more submissions than can be manually processed. **Mitigation:** Cap at 5 active submissions, queue the rest with auto-reply.
- **Risk:** Schema rich result rejected for FAQ section (FAQs read as promotional). **Mitigation:** All 6 Qs are genuine reference questions, no sales angle.
- **Risk:** Page ranks but does not convert. **Mitigation:** Analytics events let us see if visitors run the tool. No-tool-run visitors signal a hero/tool placement problem.
- **Risk:** Building the file structure invites scope creep into a generic glossary system. **Mitigation:** This is one TSX file. No `[slug]` dynamic route. Refactor only when entries 2-5 are scoped.

## Implementation order (preview, full plan to come from writing-plans)

1. Match engine + types + sample data (pure TS, testable in isolation)
2. Tool UI component (textareas, controls, results table, filter chips)
3. CSV upload + parser
4. Page layout above the fold
5. Long-form content sections 1-8
6. Schema JSON-LD generators
7. Analytics events wrapper
8. Internal linking audit pass
9. Secondary CTA form + manual handling pipeline
10. Build, Lighthouse, schema validation, ship
