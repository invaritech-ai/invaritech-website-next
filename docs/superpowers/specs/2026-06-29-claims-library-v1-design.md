# Claims Library V1 Design

Date: 2026-06-29
Status: Approved design, awaiting implementation plan
Owner: INVARITECH

## Summary

Build the first Claims authority cluster on `invaritech.ai`.

`invaritech.ai` is the hub: researched explainers, proof assets, tools, worksheet, sources, and internal links.

`claims-desk.invaritech.ai` remains the catcher: one redacted remittance or debit note in, one page back, no pitch.

The V1 wedge:

> Bring one retailer deduction back to the evidence. See what is supportable, what is missing proof, what is worth challenging, and what may raise Code risk.

This phase is proof-first and ungated. The public assets must show the method before asking for the handoff.

## Non-Negotiables

- Supplier-side only.
- Code-led, but not legal advice.
- No recovery guarantee.
- No "no recovery, no fee" positioning.
- No ERP access required for the first teardown.
- No gated value before results.
- Same verdict taxonomy everywhere:
  - supportable
  - missing proof
  - worth challenging
  - Code risk
- Every Claims Desk CTA must preserve source page attribution with UTM tags.
- Every page must be researched with primary sources where legal or regulatory claims appear.
- Every page should be written in the technical-founder voice: plain, factual, short sentences, no hype.

## Shared Page System

Create a Claims-specific content feel using the existing site tokens. The pages should feel like evidence packets, not agency landing pages.

Use:

- Dense but readable tables.
- Verdict stamps.
- Short source notes.
- Factual query blocks.
- Strong internal links.
- CTA blocks that point to Claims Desk only after the page gives value.

Avoid:

- Decorative marketing sections.
- Broad automation positioning.
- Legal-advice language.
- Vague "AI-powered" claims.
- Long paragraphs where a table would carry the evidence better.

## Shared Verdict Taxonomy

Use these exact labels across the sample teardown, checklist, worksheet, DIFOT checker, and future live teardown output.

| Verdict | Meaning |
| --- | --- |
| supportable | The deduction appears backed by the evidence currently visible. |
| missing proof | The deduction may be valid, but the required proof is missing or incomplete. |
| worth challenging | The available evidence conflicts with the retailer claim, or the claim basis is unclear enough to query. |
| Code risk | The deduction may raise a Food and Grocery Code issue where the Code applies. |

Do not use `Code-conditional` in V1 surfaces. Fold that concept into `Code risk`.

Clarify where needed that deduction types and verdict stamps are different things. Example: shrinkage is a deduction type; Code risk is a verdict stamp.

## CTA And Analytics Scheme

All authority pages point to `claims-desk.invaritech.ai`.

Use UTM tags that let GA and the Claims Desk form identify the source asset and placement.

Base format:

```text
https://claims-desk.invaritech.ai/?utm_source=invaritech&utm_campaign=claims-desk
```

Set `utm_medium` by source page or asset, and `utm_content` by placement.

Examples:

| Source | Medium | Content |
| --- | --- | --- |
| Sample teardown DIFOT example | sample-teardown | difot-example |
| Sample teardown promo example | sample-teardown | promo-scan-example |
| Sample teardown shrinkage example | sample-teardown | shrinkage-code-risk-example |
| DIFOT checker result CTA | difot-calculator | result-cta |
| Remittance advice page CTA | remittance-advice | page-cta |
| Worksheet CTA | remittance-advice | remittance-worksheet |
| Checklist CTA | claims-checklist | page-cta |
| Code page CTA | food-grocery-code | page-cta |
| Retailer deductions hub CTA | retailer-deductions | page-cta |

Done criteria:

- UTM params survive the hop from `invaritech.ai` to `claims-desk.invaritech.ai`.
- The Claims Desk form records the UTM values on submission.
- GA4 can report teardown requests from organic by source page and placement.

If cross-subdomain attribution is not already configured, add it to implementation scope.

## Page List

### V1 Proof And Search Pairing

| Asset | URL | Job |
| --- | --- | --- |
| 20 Supermarket Claim Types checklist | `/resources/supermarket-claim-types-worth-checking/` | Existing proof index, sharpened and interlinked. |
| Sample claims evidence-pack teardown | `/resources/sample-claims-evidence-pack/` | Show the teardown method with synthetic examples. |
| DIFOT formula and penalty checker | `/resources/difot-calculator/` | Rank for DIFOT calculation terms and return evidence-led verdicts. |
| DIFOT glossary | `/glossary/difot/` | Rank for DIFOT meaning terms and link to checker. |
| Remittance advice guide | `/glossary/remittance-advice/` | Rank for remittance advice head terms and host worksheet. |
| Retailer Deduction Triage Worksheet | downloadable XLSX from remittance page | Encode the deduction matrix and triage method. |
| Food and Grocery Code guide | `/glossary/food-and-grocery-code/` | Supplier-side Code explainer and link asset. |
| Retailer deductions hub | `/resources/retailer-deductions/` | Cluster spine and proof library map. |

### Fast-Follow

| Asset | URL | Job |
| --- | --- | --- |
| OTIF glossary | `/glossary/otif/` | Support DIFOT/OTIF comparison and internal linking. |

## Sample Claims Evidence-Pack Teardown

URL: `/resources/sample-claims-evidence-pack/`

Purpose: show the Claims Desk method before anyone sends a file. This is a proof page, not a downloadable asset and not an SEO pillar by itself.

H1:

> Sample claims evidence-pack teardown

Opening caveat:

> This sample uses synthetic retailer-claim data. It shows how a deduction is checked against the evidence trail. It is illustrative, not a recovery guarantee. It is not legal advice.

### Structure

1. Hero and framing.
2. How to read the teardown.
3. Example 1: DIFOT penalty.
4. Example 2: promo scan / rebate claim.
5. Example 3: shrinkage charge.
6. Bottom sources and caveats.

### Method Explainer

Explain the teardown pattern:

- retailer assertion
- proof required
- proof found
- gap
- verdict
- suggested factual query
- next practical step

Suggested query blocks must be labelled:

> Suggested query, not a dispute letter.

### Example 1: DIFOT Penalty

Verdict: `worth challenging`

Synthetic claim:

- Claim: DIFOT penalty, week 32, `$4,280`
- Assertion: delivery was late or incomplete.
- Proof required: PO, ASN, booked window, POD, dock timestamp, retailer scorecard.
- Proof found: ASN and POD support full quantity; booked window does not match penalty note.
- Gap: retailer scorecard line detail and dock timestamp not supplied.
- Suggested query: "Please provide the DIFOT scorecard line, booked-window basis, dock timestamp, and calculation used for this deduction."
- Internal links: `/resources/difot-calculator/`, `/glossary/difot/`
- CTA content tag: `difot-example`

### Example 2: Promo Scan / Rebate Claim

Main verdict: `missing proof`

Show line-level stamps so `supportable` appears in the wild.

Synthetic claim:

- Claim: promo scan deduction, synthetic promo period, `$2,940`
- Assertion: scan rebate applies to eligible units sold.
- Proof required: promo agreement, eligible SKUs, store/banner scope, scan report, rate, period.
- Proof found:
  - Rate: `supportable`
  - Promo agreement: present
- Gap:
  - Scan volume: `missing proof`
  - SKU/store scope: `missing proof`
- Suggested query: "Please provide the scan report by SKU, store group, and promo dates used to calculate this deduction."
- Internal link: `/resources/retailer-deductions/`
- CTA content tag: `promo-scan-example`

### Example 3: Shrinkage Charge

Verdict: `Code risk`

Synthetic claim:

- Claim: shrinkage deduction, `$1,180`
- Assertion: supplier bears in-store shrinkage.
- Proof required: claim reason, possession point, supply agreement clause, retailer basis.
- Proof found: deduction reason says shrinkage after delivery.
- Code preconditions:
  - Code-covered retailer: ALDI, Coles, Metcash Food & Grocery, or Woolworths Group.
  - Loss happened after retailer took possession.
- Gap: no further document gap is required to raise the Code issue if both preconditions hold.
- Suggested query: "Please identify the basis for charging this shrinkage amount to us, including the possession point and any clause relied on."
- Internal link: `/glossary/food-and-grocery-code/`
- CTA content tag: `shrinkage-code-risk-example`

### Sources

Use a bottom source block:

- ACCC Food and Grocery Code guidance
- ACCC Rights and responsibilities
- ACCC Resolving disputes
- Competition and Consumer (Industry Codes - Food and Grocery) Regulations 2024

## DIFOT Formula And Penalty Checker

URLs:

- `/resources/difot-calculator/`
- `/glossary/difot/`

The calculator URL exists for search intent, but the page must not be an arithmetic widget. DIFOT math is commodity. The value is the evidence model and the exact factual query.

H1 for tool page:

> DIFOT calculator: formula, example, and penalty checker

### Tool Page Above The Fold

Include:

- DIFOT meaning.
- DIFOT formula.
- One worked example.
- Caveat: "The arithmetic is easy. The hard part is proving whether the retailer's penalty matches the evidence."

### Penalty Checker Inputs

Keep the form as lean as the verdict allows. It should produce a useful result from a few clicks.

Minimum inputs:

- retailer
- claim reason / note
- missing or available evidence:
  - PO
  - ASN
  - booked window
  - POD
  - dock timestamp
  - retailer scorecard line

Optional inputs:

- units ordered
- units delivered
- booked delivery window
- actual dock / arrival timestamp
- claim amount

Do not gate a useful verdict behind optional arithmetic fields.

### Output

The output is a decision, not a percentage.

Return:

- verdict stamp: `supportable`, `missing proof`, `worth challenging`, or rare `Code risk`
- the missing evidence that matters most
- likely conflict: supplier records vs retailer scorecard
- suggested factual query
- whether the line belongs in Claims Desk for evidence reconstruction

Suggested query example:

> Please provide the DIFOT scorecard line, booked-window basis, dock timestamp, and calculation used for this deduction.

### Result Logic

General rules:

- `supportable`: supplier inputs show short delivery or late arrival and key evidence is present.
- `missing proof`: scorecard, booked window, dock timestamp, or POD is missing.
- `worth challenging`: supplier evidence shows full delivery/on-time arrival, or the claim contradicts the booked window or POD.
- `Code risk`: not normally returned for DIFOT alone. Explain that Code risk is more common for shrinkage, set-offs, wastage, shortfall, and damage timing.

### Privacy And Analytics

- Runs in the browser.
- No entered claim data leaves the page.
- GA event records only non-sensitive fields:
  - result verdict
  - retailer category
  - has claim amount yes/no
  - evidence completeness yes/no
- CTA tag: `utm_medium=difot-calculator&utm_content=result-cta`

### SEO Body

The page must answer:

- What is DIFOT?
- DIFOT formula.
- DIFOT calculation example.
- DIFOT vs OTIF.
- Why a DIFOT penalty may be wrong.
- Evidence to pull before accepting a DIFOT deduction.

The glossary page should focus on the definition and comparison, then link to the tool.

## Remittance Advice Page And XLSX

URL: `/glossary/remittance-advice/`

The page targets the head term. The download targets usefulness, not the generic "remittance advice template" intent.

Page H1:

> What is a remittance advice?

Download name:

> Retailer Deduction Triage Worksheet

Positioning:

> Use this when you receive a supermarket remittance with deductions, short-pays, debit notes, or claim lines.

### Page Sections

1. What a remittance advice is.
2. What is on a remittance advice.
3. Remittance advice vs invoice vs receipt.
4. Is a remittance advice proof of payment?
5. Why supermarket suppliers should inspect deductions on it.
6. How to use the Retailer Deduction Triage Worksheet.
7. CTA to Claims Desk.

Judge this page on impressions and assisted reach. It will pull non-FMCG accounting traffic. Judge the worksheet download and Claims Desk handoffs separately.

### Workbook Tabs

#### Start Here

Include:

- What this is: a local worksheet for triaging retailer deductions.
- What it is not: not legal advice, not a recovery guarantee, not a dispute letter.
- Four stamps: `supportable`, `missing proof`, `worth challenging`, `Code risk`.
- Privacy note: runs locally in Excel; no data leaves the file.
- Version note: current as of June 2026; verify against the current ACCC guidance and your supply agreement.

#### Claim Ledger

One deduction line per row.

Columns:

- retailer
- remittance date
- invoice number
- claim / debit note ID
- claim date
- delivery date
- deduction type dropdown
- retailer reason code / note
- amount deducted
- dispute deadline, optional
- days left, calculated if deadline exists
- verdict dropdown
- evidence required, short auto-fill from deduction type
- Code check, short auto-fill from deduction type
- suggested factual query reference or short query
- evidence found / notes
- gap
- priority band
- owner
- status

Keep this sheet scannable. Avoid duplicating long paragraphs in every row.

#### Deduction Type Matrix

Reference table that powers the auto-fill.

It must encode:

- evidence required
- Code check
- suggested factual query
- deadline helper

Deduction types:

- DIFOT penalty
- OTIF penalty
- promo scan / rebate
- shrinkage
- shortfall
- damaged goods
- wastage
- set-off
- post-audit claim
- duplicate / already credited
- overpricing / price discrepancy
- pallet / packaging charge
- freight / transport deduction
- listing / ranging fee
- retail media / activity charge
- ASN / EDI / barcode compliance charge

Examples:

| Type | Evidence | Code Check | Neutral Query |
| --- | --- | --- | --- |
| DIFOT penalty | PO, ASN, booked window, POD, dock timestamp, retailer scorecard | Usually evidence issue, not Code issue | Please provide the DIFOT scorecard line, booked-window basis, dock timestamp, and calculation used for this deduction. |
| Promo scan / rebate | Promo agreement, SKU scope, store/banner scope, scan report, rate, period | Check agreed funding and reasonableness | Please provide the scan report by SKU, store group, and promo dates used to calculate this deduction. |
| Shrinkage | Claim reason, possession point, supply agreement clause | Code risk if covered retailer and post-possession loss | Please identify the basis for charging this shrinkage amount to us, including the possession point and any clause relied on. |
| Shortfall | POD, delivery docket, ASN, retailer received quantity, claim date | Auto-flag if raised more than 30 days after delivery | Please provide the received-quantity evidence and the delivery date used for this shortfall claim. |
| Set-off | Written consent or supply agreement set-off clause, amount basis | Check written consent, agreement basis, and reasonableness | Please provide the written consent or supply agreement basis relied on for this set-off, plus the amount calculation. |

#### Summary

Include:

- total deducted
- total by verdict
- total worth challenging
- total Code risk
- total missing proof
- top priorities by amount and deadline
- closing line: "Lines you cannot rebuild from your own files are candidates for Claims Desk."

### Worksheet Logic

#### 30-Day Auto-Flag

For `shortfall` and `damaged goods` lines:

- If `claim date - delivery date > 30 days`, auto-flag:
  - Code check: "Raised outside the Code's 30-day window; worth checking."
  - Do not overwrite the user's verdict. If a suggested verdict is shown, use `worth challenging` and keep the Code basis in the Code-check column.

#### Deadline Helper

Be honest that there is no uniform dispute deadline.

Add a helper on the Matrix tab:

- Check the retailer portal claims article.
- Check the supply agreement and trading terms.
- Metcash charge-through has a published 60-day operational window for relevant cases.
- The Code's 30-day cap is on the retailer raising shortfall and damage claims, not a universal supplier dispute deadline.

#### Priority Band

Use bands, not model-looking precision:

- High
- Medium
- Low

Inputs:

- amount deducted
- verdict
- deadline / days left, if known
- 30-day flag, if applicable

Do not show fake numeric scores like `87.3`.

## Food And Grocery Code Page

URL: `/glossary/food-and-grocery-code/`

H1:

> The Food and Grocery Code: which retailer deductions suppliers can challenge

This page is a trust and link asset. It should be the best plain-English supplier-side Code explainer in the Australian grocery claims space.

### Framing Rules

- Keep it descriptive, not instructional.
- Lead with what the Code says as a statement of fact.
- Present suggested queries as factual questions a supplier could ask, not as instructions for how to win a dispute.
- Repeat: not legal advice.
- Date-stamp near the top: current as of June 2026; check ACCC for updates.

### Sections

1. Plain opening.
2. Who the Code covers.
3. Four supplier-side deduction checks.
4. Where the Code sits in a teardown.
5. Dispute path, lightly.
6. Sources.

### Plain Opening

Include:

- The Code became mandatory on 1 April 2025.
- The transition period ended on 1 April 2026.
- All Code requirements now apply to grocery supply agreements with covered large grocery businesses.
- This page is a supplier-side evidence guide, not legal advice.

### Who The Code Covers

Covered large grocery businesses:

- ALDI
- Coles Group
- Metcash Food & Grocery
- Woolworths Group

Costco note:

> Costco is not on the current ACCC covered list. For Costco and other non-covered retailers, work from the contract and evidence trail, not the Code.

### Four Supplier-Side Deduction Checks

Each block uses:

- What the claim looks like.
- What the Code issue is.
- Evidence to pull.
- Factual question a supplier could ask.
- Where it appears in the worksheet.

#### Shrinkage

Code story:

- After-possession shrinkage cannot be charged back where the Code applies.

Preconditions:

- Covered retailer.
- Loss happened after retailer took possession.

Factual query:

> Please identify the basis for charging this shrinkage amount to us, including the possession point and any clause relied on.

#### Set-Offs

Code story:

- Set-off needs written consent, or a supply agreement basis and reasonable amount.

Evidence:

- Written consent.
- Agreement clause.
- Debit note.
- Amount calculation.

Factual query:

> Please provide the written consent or supply agreement basis relied on for this set-off, plus the amount calculation.

#### Wastage

Code story:

- Wastage generally requires express agreement, reasonable amount, stated calculation, and retailer cost mitigation.

Evidence:

- Wastage clause.
- Calculation.
- Actual cost basis.
- Mitigation evidence.

Factual query:

> Please provide the agreed wastage clause, calculation method, actual cost basis, and steps taken to reduce the cost.

#### Shortfall / Damage Timing

Code story:

- Damage, shortfall, and similar claims must be raised within a reasonable time and no later than 30 days after delivery.

Evidence:

- Delivery date.
- Claim date.
- POD.
- Delivery docket.
- ASN.

Worksheet logic:

- Auto-flag if `claim date - delivery date > 30 days`.

Factual query:

> Please provide the delivery date, claim date, and received-quantity or damage evidence used for this claim.

### Dispute Path

Keep this factual and short:

1. Raise it with the retailer.
2. Retailer Code Mediator.
3. Code Supervisor process review.
4. Mediation or arbitration.
5. ACCC enforces the Code but is not the dispute-resolution body.
6. Independent legal advice can be sought at any time.

### Sources

Use a bottom source block and limited inline links:

- ACCC About the Food and Grocery Code.
- ACCC Rights and responsibilities.
- ACCC Resolving disputes.
- Competition and Consumer (Industry Codes - Food and Grocery) Regulations 2024.
- Grocery Code Supervisor.

## 20 Supermarket Claim Types Checklist

Existing URL: `/resources/supermarket-claim-types-worth-checking/`

Role: first public proof index and claim-type map.

Changes:

- Replace `Code-conditional` with `Code risk`.
- Use the four stamp language.
- Add internal links:
  - DIFOT row to `/resources/difot-calculator/` and `/glossary/difot/`
  - shrinkage, set-off, wastage, shortfall rows to `/glossary/food-and-grocery-code/`
  - remittance mentions to `/glossary/remittance-advice/`
  - sample teardown to `/resources/sample-claims-evidence-pack/`
  - hub to `/resources/retailer-deductions/`
- Add "How to use this with the worksheet."
- Keep it as a claim-type index, not a legal guide.
- Add Claims Desk CTA with `utm_medium=claims-checklist`.

## Retailer Deductions Hub

URL: `/resources/retailer-deductions/`

Role: cluster spine.

H1:

> Retailer deductions: the supplier's guide

Purpose:

- Tie all proof assets and explainers together.
- Give visitors a clear map of the Claims authority library.
- Link down to every child page.
- Receive links back from every child page.

Sections:

1. What retailer deductions are.
2. Why remittance lines need evidence.
3. The four verdict stamps.
4. Deduction family blocks:
   - short-delivery / shortfall
   - promo scan / rebate
   - shrinkage
   - DIFOT / OTIF
   - duplicate / already credited
   - wastage
   - overpricing
   - set-off
   - post-audit
5. Proof assets:
   - sample teardown
   - worksheet
   - DIFOT checker
   - checklist
6. Code-led checks.
7. Claims Desk CTA.

CTA tag: `utm_medium=retailer-deductions&utm_content=page-cta`

## Cluster Linking Map

Every child page links:

- Up to `/resources/retailer-deductions/`.
- To one conversion asset: worksheet or Claims Desk.
- Sideways to the most relevant sibling page.

| Page | Up Link | Conversion Link | Sideways Links |
| --- | --- | --- | --- |
| `/resources/sample-claims-evidence-pack/` | hub | Claims Desk | DIFOT checker, Code page |
| `/resources/difot-calculator/` | hub | Claims Desk | DIFOT glossary, OTIF, sample teardown |
| `/glossary/difot/` | hub | DIFOT checker | OTIF, remittance advice |
| `/glossary/remittance-advice/` | hub | Worksheet + Claims Desk | checklist, sample teardown |
| `/glossary/food-and-grocery-code/` | hub | Claims Desk | worksheet, sample teardown |
| `/resources/supermarket-claim-types-worth-checking/` | hub | Worksheet + Claims Desk | Code page, DIFOT checker |
| `/resources/retailer-deductions/` | n/a | Claims Desk | all child pages |

## Metrics

Use different metrics by asset job.

### Authority / SEO Metrics

- GSC impressions.
- Top-20 keyword count.
- Indexed pages.
- Internal link coverage.
- External links to Code page and proof assets.

### Conversion Metrics

- Claims Desk teardown requests from organic.
- Claims Desk teardown requests by source page.
- Claims Desk teardown requests by `utm_content`.
- Worksheet downloads.
- DIFOT checker result CTA clicks.

### Tool Metrics

Track only non-sensitive values:

- verdict returned
- retailer category
- evidence completeness yes/no
- CTA clicked yes/no

Do not send claim text, invoice IDs, amounts, or supplier data to analytics.

## Implementation Notes

- Use existing Next.js App Router patterns.
- Use existing GA4 `trackSiteEvent` wrapper, extended with Claims-safe event names.
- Add static routes to `app/sitemap.ts`.
- Add pages to `lib/resources.ts` where they should appear in the resource library.
- Use a shared Claims CTA builder to avoid UTM drift.
- Consider a shared verdict stamp component.
- Generate the XLSX as a static file under `public/` during implementation, using a deterministic script if practical.
- Add tests for:
  - resource registration
  - sitemap entries
  - CTA URL tags
  - four-stamp taxonomy consistency
  - no legacy `Code-conditional` label in Claims pages
  - DIFOT checker pure result logic
  - worksheet matrix data shape if generated from source data

## Out Of Scope For V1

- Xero exception automation.
- Moneta / Minita pages.
- CSV upload for DIFOT.
- Batch on-site claim upload.
- Legal letter generation.
- Dispute lodgement workflow.
- Recovery promises.
- Claiming official retailer scorecard replication.

## Source References

- ACCC, About the Food and Grocery Code: https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct/about-the-food-and-grocery-code
- ACCC, Rights and responsibilities: https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct/rights-and-responsibilities-under-the-food-and-grocery-code
- ACCC, Resolving disputes: https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct/resolving-disputes-under-the-food-and-grocery-code
- The Code: https://www.legislation.gov.au/F2024L01651/latest/text
- Grocery Code Supervisor: https://grocerycodesupervisor.gov.au

## Open Implementation Decisions

These are implementation choices, not product-scope blockers:

- Whether the XLSX is generated by script or committed as a static binary.
- Whether Claims-specific page components live under `components/claims/` or extend current resource shells.
- Exact GA4 event names for Claims interactions.
- Whether cross-subdomain tracking needs code on both `invaritech.ai` and `claims-desk.invaritech.ai`.
