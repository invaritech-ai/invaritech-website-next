# SERP CTR Testing Cadence

## Rotation Cycle
- **Default:** Rotate title tags and meta descriptions every **30 days**
- **Exception:** Rotate sooner only if CTR < 1% after 14 days with 500+ impressions
- Google needs ~3-4 weeks to re-evaluate snippet performance after a change

## GSC Metrics to Track (per page)
| Metric | Where | Frequency |
|--------|-------|-----------|
| Impressions | GSC → Performance → Pages | Weekly check |
| CTR | GSC → Performance → Pages | Weekly check |
| Avg Position | GSC → Performance → Pages | Weekly check |
| Clicks | GSC → Performance → Pages | Weekly check |

## Decision Matrix

### High impressions + Low CTR (< 2%)
**Diagnosis:** Snippet problem — title/meta not compelling enough for the query
**Action:** Rewrite title and meta description. Focus on:
- Stronger outcome language
- Clearer service/deliverable match
- Better CTA in meta

### Decent CTR (> 3%) + Low position (> 10)
**Diagnosis:** Authority or content depth problem
**Action:** Do NOT change title/meta. Instead:
- Add more on-page content (FAQ, case study snippets, structured data)
- Build backlinks to the page
- Improve internal linking

### Low impressions + Low position
**Diagnosis:** Page not ranking for target queries
**Action:**
- Review keyword targeting — are you targeting the right terms?
- Check for cannibalisation with other pages
- Add supporting content (blog posts linking to the service page)

### High CTR + High position
**Diagnosis:** Working. Don't touch it.
**Action:** None. Monitor for regression.

## Variant Log

| Date | Page | Change Type | Old Title/Meta | New Title/Meta | Impressions (before) | CTR (before) | Impressions (after) | CTR (after) | Notes |
|------|------|-------------|----------------|----------------|---------------------|--------------|--------------------|--------------| ------|
| 2026-03-11 | All service pages | Initial rewrite | See git history | Current | — | — | — | — | Baseline set |
| 2026-03-13 | Workflow (W) | Industry use cases + manufacturing FAQ + geo depth | See git diff | Added "Who We Work With" section, 2 new FAQs, broadened hero copy | 11 impr (workflow automation consulting) | 0% | — | — | Defending position 1 for "manufacturing workflow automation consulting" |
| 2026-03-13 | All service pages | Structured data areaServed | "Worldwide" | SG/HK/MY/PH country list | — | — | — | — | Geo signal alignment |
| 2026-03-13 | Consulting (A) | Geo mention in hero | No geo in body copy | Added SG/HK/MY/PH to hero paragraph | 10 impr (ai automation consulting) | 0% | — | — | Position 46.8, climbing |

## Pages to Monitor (Priority Order)
1. `/services/ai-automation-sprint/` — core revenue page
2. `/services/ai-automation-consulting/` — high commercial intent
3. `/services/` — hub page, drives navigation
4. `/services/ai-workflow-automation-services/` — finance vertical
5. `/services/ai-integration-services/` — enterprise vertical
6. `/services/enterprise-ai-chatbot-deployment/` — multilingual niche
7. `/services/generative-ai-backend-development/` — technical audience
8. `/tools/invoice-extractor/` — TOFU lead gen
9. `/tools/assessment/` — TOFU lead gen

## GSC Baseline — 2026-03-13

| Keyword | Clicks | Impressions | Avg Position | Primary Page | Action |
|---------|--------|-------------|-------------|-------------|--------|
| manufacturing workflow automation consulting | 0 | 1 | 1.0 | W | Defend — added manufacturing section |
| workflow automation consulting | 0 | 11 | 27.3 | W | Monitor — climbing |
| workflow automation consulting services | 0 | 1 | 28.0 | W | Monitor |
| ai automation consulting | 0 | 10 | 46.8 | A | Monitor — climbing |
| automation consulting | 0 | 2 | 25.5 | A/S | Monitor |
| workflow automation consultant | 0 | 2 | 77.0 | W | Low priority — needs content depth |
| ai compliance automation tools vs traditional | 0 | 1 | 6.0 | — | Incidental — do not chase |
| regops | 0 | 5 | 6.8 | — | Incidental — do not chase |

**Next review:** 2026-04-13 (30-day cycle)

## Process
1. Export GSC data on the 1st and 15th of each month
2. Compare against previous period
3. Flag any page with CTR drop > 1 percentage point
4. Log changes in the variant log above before making edits
5. Never change more than 3 pages in a single rotation cycle
