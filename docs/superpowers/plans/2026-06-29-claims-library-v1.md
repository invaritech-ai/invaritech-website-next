# Claims Library V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the proof-first Claims authority cluster on `invaritech.ai`: shared Claims data, tagged Claims Desk CTAs, DIFOT evidence checker, proof pages, remittance worksheet, Code explainer, hub, checklist wiring, and tests.

**Architecture:** Claims data lives in `lib/claims/` and drives the website plus the XLSX worksheet. Every Claims Desk link goes through one CTA builder. Static pages rely on Next build, route checks, and repo-wide invariants instead of copy-grep tests.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, GA4 via `lib/analytics/site-events.ts`, `node:test` with `node --experimental-strip-types`, and Python stdlib `zipfile` for deterministic formula-driven `.xlsx` output.

## Global Constraints

- Supplier-side only.
- Code-led, but not legal advice.
- No recovery guarantee.
- No "no recovery, no fee" positioning.
- No ERP access required for the first teardown.
- No gated value before results.
- Verdict taxonomy is exactly: `supportable`, `missing proof`, `worth challenging`, `Code risk`.
- Do not use `Code-conditional` in Claims surfaces.
- Every Claims Desk CTA must preserve source page attribution with UTM tags.
- No hardcoded `claims-desk.invaritech.ai` in any `app/**/page.tsx`; use `buildClaimsDeskUrl`.
- Analytics must not send claim text, invoice IDs, amounts, or supplier data.
- Every legal or regulatory claim must be sourced to primary sources where practical.
- Use technical-founder voice: plain, factual, short sentences, no hype.
- Keep Code content descriptive, not instructional.
- Leave unrelated dirty working-tree files untouched.
- V1 does not link to `/glossary/otif/`; add that link only when the OTIF page ships.
- The Node test environment must have `python3` on `PATH`; worksheet tests invoke the generator through Python.
- The XLSX generator must be byte-deterministic. Use fixed ZIP metadata timestamps and assert repeat generation returns identical bytes.

---

## File Structure

Create:

- `lib/claims/verdicts.ts` - canonical verdict labels.
- `lib/claims/deduction-matrix.json` - canonical deduction type matrix.
- `lib/claims/deduction-matrix.ts` - typed matrix accessors.
- `lib/claims/claims-desk-cta.ts` - single Claims Desk URL builder.
- `lib/claims/difot-penalty-checker.ts` - pure evidence-state verdict logic.
- `components/claims/verdict-stamp.tsx` - shared verdict stamp.
- `components/claims/claims-cta.tsx` - tracked CTA component.
- `components/claims/difot-penalty-checker.tsx` - client-side DIFOT checker UI.
- `components/claims/worksheet-download-link.tsx` - tracked worksheet download link.
- `scripts/generate-claims-worksheet.py` - deterministic formula-driven XLSX generator.
- `public/retailer-deduction-triage-worksheet.xlsx` - generated workbook.
- `app/resources/retailer-deductions/page.tsx`
- `app/resources/sample-claims-evidence-pack/page.tsx`
- `app/resources/difot-calculator/page.tsx`
- `app/glossary/difot/page.tsx`
- `app/glossary/remittance-advice/page.tsx`
- `app/glossary/food-and-grocery-code/page.tsx`
- `tests/claims-foundation.test.mjs`
- `tests/difot-penalty-checker.test.mjs`
- `tests/claims-worksheet.test.mjs`
- `tests/claims-invariants.test.mjs`

Modify:

- `lib/analytics/site-events.ts`
- `lib/resources.ts`
- `components/resource-library-client.tsx`
- `app/sitemap.ts`
- `app/resources/supermarket-claim-types-worth-checking/page.tsx`

Do not modify:

- Xero, Moneta, Minita, or broader finance-exception pages.
- Claims Desk subdomain code unless that repo is explicitly connected.

---

## Task 1: Claims Foundation

**Files:**

- Create: `lib/claims/verdicts.ts`
- Create: `lib/claims/deduction-matrix.json`
- Create: `lib/claims/deduction-matrix.ts`
- Create: `lib/claims/claims-desk-cta.ts`
- Create: `components/claims/verdict-stamp.tsx`
- Create: `components/claims/claims-cta.tsx`
- Modify: `lib/analytics/site-events.ts`
- Test: `tests/claims-foundation.test.mjs`

**Interfaces:**

- Produces: `CLAIMS_VERDICTS`, `type ClaimVerdict`, `isClaimVerdict(value: string): value is ClaimVerdict`
- Produces: `deductionTypes`, `deductionTypesById`, `getDeductionType(id: string)`
- Produces: `buildClaimsDeskUrl({ medium, content }: ClaimsDeskCtaInput): string`
- Produces: `<VerdictStamp verdict={verdict} />`
- Produces: `<ClaimsCTA medium="..." content="..." />`

- [ ] **Step 1: Write the foundation tests**

Create `tests/claims-foundation.test.mjs`:

```js
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildClaimsDeskUrl } from "../lib/claims/claims-desk-cta.ts";
import { deductionTypes, getDeductionType } from "../lib/claims/deduction-matrix.ts";
import { CLAIMS_VERDICTS } from "../lib/claims/verdicts.ts";

describe("Claims foundation", () => {
    it("keeps the exact four-stamp taxonomy", () => {
        assert.deepEqual(CLAIMS_VERDICTS, [
            "supportable",
            "missing proof",
            "worth challenging",
            "Code risk",
        ]);
    });

    it("builds Claims Desk URLs from medium and content", () => {
        assert.equal(
            buildClaimsDeskUrl({ medium: "sample-teardown", content: "difot-example" }),
            "https://claims-desk.invaritech.ai/?utm_source=invaritech&utm_medium=sample-teardown&utm_campaign=claims-desk&utm_content=difot-example"
        );
    });

    it("has the V1 deduction matrix coverage and deadline rules", () => {
        const ids = deductionTypes.map((type) => type.id);
        for (const required of [
            "difot-penalty",
            "otif-penalty",
            "promo-scan-rebate",
            "shrinkage",
            "shortfall",
            "damaged-goods",
            "wastage",
            "set-off",
            "post-audit-claim",
            "duplicate-already-credited",
        ]) {
            assert.ok(ids.includes(required), `${required} should exist`);
        }

        assert.ok(deductionTypes.length >= 16);
        assert.equal(getDeductionType("shrinkage").defaultVerdict, "Code risk");
        assert.equal(getDeductionType("shortfall").deadlineRule?.days, 30);
        assert.equal(getDeductionType("damaged-goods").deadlineRule?.days, 30);
    });
});
```

- [ ] **Step 2: Run the foundation tests to see the expected failure**

Run:

```bash
node --experimental-strip-types --test tests/claims-foundation.test.mjs
```

Expected: fails because `lib/claims/*` files are not created.

- [ ] **Step 3: Create verdict labels**

Create `lib/claims/verdicts.ts`:

```ts
export const CLAIMS_VERDICTS = [
    "supportable",
    "missing proof",
    "worth challenging",
    "Code risk",
] as const;

export type ClaimVerdict = (typeof CLAIMS_VERDICTS)[number];

export const verdictDescriptions: Record<ClaimVerdict, string> = {
    supportable: "The deduction appears backed by the evidence currently visible.",
    "missing proof": "The deduction may be valid, but the required proof is missing or incomplete.",
    "worth challenging":
        "The available evidence conflicts with the retailer claim, or the claim basis is unclear enough to query.",
    "Code risk": "The deduction may raise a Food and Grocery Code issue where the Code applies.",
};

export function isClaimVerdict(value: string): value is ClaimVerdict {
    return (CLAIMS_VERDICTS as readonly string[]).includes(value);
}
```

- [ ] **Step 4: Create the canonical deduction matrix**

Create `lib/claims/deduction-matrix.json` with at least these 16 entries. Keep the wording neutral and factual.

```json
[
  {
    "id": "difot-penalty",
    "label": "DIFOT penalty",
    "family": "DIFOT / OTIF",
    "defaultVerdict": "missing proof",
    "shortEvidence": "PO, ASN, booked window, POD, dock timestamp, retailer scorecard.",
    "codeCheck": "Usually an evidence issue, not a Code issue.",
    "neutralQuery": "Please provide the DIFOT scorecard line, booked-window basis, dock timestamp, and calculation used for this deduction.",
    "deadlineHelper": "Check the retailer portal claims article and your supply agreement for the dispute window."
  },
  {
    "id": "otif-penalty",
    "label": "OTIF penalty",
    "family": "DIFOT / OTIF",
    "defaultVerdict": "missing proof",
    "shortEvidence": "PO, ASN, booked window, POD, dock timestamp, retailer scorecard.",
    "codeCheck": "Usually an evidence issue, not a Code issue.",
    "neutralQuery": "Please provide the OTIF scorecard line, booked-window basis, dock timestamp, and calculation used for this deduction.",
    "deadlineHelper": "Check the retailer portal claims article and your supply agreement for the dispute window."
  },
  {
    "id": "promo-scan-rebate",
    "label": "Promo scan / rebate",
    "family": "Promotion funding",
    "defaultVerdict": "missing proof",
    "shortEvidence": "Promo agreement, SKU scope, store/banner scope, scan report, rate, period.",
    "codeCheck": "Check agreed funding, scope, and reasonableness.",
    "neutralQuery": "Please provide the scan report by SKU, store group, and promo dates used to calculate this deduction.",
    "deadlineHelper": "Check the retailer portal claims article and your promo agreement."
  },
  {
    "id": "shrinkage",
    "label": "Shrinkage",
    "family": "Code-sensitive claims",
    "defaultVerdict": "Code risk",
    "shortEvidence": "Claim reason, possession point, supply agreement clause, retailer basis.",
    "codeCheck": "Code risk if the retailer is Code-covered and the loss is post-possession.",
    "neutralQuery": "Please identify the basis for charging this shrinkage amount to us, including the possession point and any clause relied on.",
    "deadlineHelper": "Confirm whether the retailer is Code-covered and when possession passed."
  },
  {
    "id": "shortfall",
    "label": "Shortfall / short-delivery",
    "family": "Delivery variance",
    "defaultVerdict": "missing proof",
    "shortEvidence": "POD, delivery docket, ASN, retailer received quantity, claim date.",
    "codeCheck": "Check the Code's 30-day cap on retailer-raised shortfall claims.",
    "neutralQuery": "Please provide the received-quantity evidence and the delivery date used for this shortfall claim.",
    "deadlineHelper": "The Code caps retailer-raised shortfall claims at no later than 30 days after delivery where the Code applies.",
    "deadlineRule": { "kind": "claimRaisedWithinDays", "days": 30 }
  },
  {
    "id": "damaged-goods",
    "label": "Damaged goods",
    "family": "Delivery variance",
    "defaultVerdict": "missing proof",
    "shortEvidence": "POD condition notes, photos, carrier report, warehouse notes, claim date.",
    "codeCheck": "Check the Code's 30-day cap on retailer-raised damage claims.",
    "neutralQuery": "Please provide the delivery date, claim date, and damage evidence used for this claim.",
    "deadlineHelper": "The Code caps retailer-raised damage claims at no later than 30 days after delivery where the Code applies.",
    "deadlineRule": { "kind": "claimRaisedWithinDays", "days": 30 }
  },
  {
    "id": "wastage",
    "label": "Wastage",
    "family": "Code-sensitive claims",
    "defaultVerdict": "Code risk",
    "shortEvidence": "Wastage clause, calculation method, actual cost basis, mitigation evidence.",
    "codeCheck": "Check express agreement, reasonable amount, stated calculation, and retailer cost mitigation.",
    "neutralQuery": "Please provide the agreed wastage clause, calculation method, actual cost basis, and steps taken to reduce the cost.",
    "deadlineHelper": "Check the supply agreement and retailer portal claim window."
  },
  {
    "id": "set-off",
    "label": "Set-off",
    "family": "Code-sensitive claims",
    "defaultVerdict": "Code risk",
    "shortEvidence": "Written consent or set-off clause, amount basis, debit note.",
    "codeCheck": "Check written consent, agreement basis, and reasonableness.",
    "neutralQuery": "Please provide the written consent or supply agreement basis relied on for this set-off, plus the amount calculation.",
    "deadlineHelper": "Check the supply agreement, trading terms, and retailer portal claim window."
  },
  {
    "id": "post-audit-claim",
    "label": "Post-audit claim",
    "family": "Historic claims",
    "defaultVerdict": "missing proof",
    "shortEvidence": "Original PO, invoice, price list, promo agreement, prior remittance.",
    "codeCheck": "Check whether the set-off or charge basis is allowed by agreement and reasonable.",
    "neutralQuery": "Please provide the transaction trail and agreement basis used for this post-audit claim.",
    "deadlineHelper": "Check the trading terms, supply agreement, and portal window for historic claims."
  },
  {
    "id": "duplicate-already-credited",
    "label": "Duplicate / already credited",
    "family": "Duplicate claims",
    "defaultVerdict": "worth challenging",
    "shortEvidence": "Prior remittance, debit note, credit note, claim ID, invoice history.",
    "codeCheck": "Usually an evidence issue, not a Code issue.",
    "neutralQuery": "Please confirm whether this claim has already been deducted, set off, or credited, and provide the claim ID history.",
    "deadlineHelper": "Check the retailer portal claim window and your credit note history."
  },
  {
    "id": "overpricing-price-discrepancy",
    "label": "Overpricing / price discrepancy",
    "family": "Price variance",
    "defaultVerdict": "missing proof",
    "shortEvidence": "PO, agreed price list, invoice, effective-date evidence.",
    "codeCheck": "Usually an evidence issue, not a Code issue.",
    "neutralQuery": "Please provide the agreed price and effective date used to calculate this price discrepancy.",
    "deadlineHelper": "Check the retailer portal claim window and price-change terms."
  },
  {
    "id": "pallet-packaging-charge",
    "label": "Pallet / packaging charge",
    "family": "Operational charges",
    "defaultVerdict": "missing proof",
    "shortEvidence": "Pallet transfer records, CHEP or Loscam statements, agreement, delivery docket.",
    "codeCheck": "Check agreed basis and amount reasonableness where the Code applies.",
    "neutralQuery": "Please provide the pallet or packaging transfer records and agreement basis used for this charge.",
    "deadlineHelper": "Check the retailer portal claim window; some equipment windows are separate from trade deductions."
  },
  {
    "id": "freight-transport-deduction",
    "label": "Freight / transport deduction",
    "family": "Operational charges",
    "defaultVerdict": "missing proof",
    "shortEvidence": "Freight terms, carrier invoice, PO, delivery evidence.",
    "codeCheck": "Check agreed basis and amount reasonableness where the Code applies.",
    "neutralQuery": "Please provide the freight terms, carrier evidence, and calculation used for this deduction.",
    "deadlineHelper": "Check the supply agreement and retailer portal claim window."
  },
  {
    "id": "listing-ranging-fee",
    "label": "Listing / ranging fee",
    "family": "Trade spend",
    "defaultVerdict": "Code risk",
    "shortEvidence": "Trading terms, listing or ranging agreement, SKU evidence, claim note.",
    "codeCheck": "Check express written agreement and reasonableness.",
    "neutralQuery": "Please provide the express written agreement and amount basis used for this listing or ranging charge.",
    "deadlineHelper": "Check the supply agreement, trading terms, and retailer portal claim window."
  },
  {
    "id": "retail-media-activity-charge",
    "label": "Retail media / activity charge",
    "family": "Trade spend",
    "defaultVerdict": "missing proof",
    "shortEvidence": "Booking confirmation, activity proof, agreement, invoice or debit note.",
    "codeCheck": "Check express agreement, delivery proof, and amount basis.",
    "neutralQuery": "Please provide the booking confirmation, activity proof, and agreed amount basis for this activity charge.",
    "deadlineHelper": "Check the campaign agreement and retailer portal claim window."
  },
  {
    "id": "asn-edi-barcode-compliance",
    "label": "ASN / EDI / barcode compliance charge",
    "family": "Compliance charges",
    "defaultVerdict": "missing proof",
    "shortEvidence": "ASN log, EDI acknowledgement, label proof, warehouse receipt.",
    "codeCheck": "Usually an evidence issue, not a Code issue.",
    "neutralQuery": "Please provide the ASN, EDI, barcode, or label error evidence used for this compliance charge.",
    "deadlineHelper": "Check the retailer portal claim window and compliance-charge terms."
  }
]
```

- [ ] **Step 5: Create typed matrix accessors**

Create `lib/claims/deduction-matrix.ts`:

```ts
import matrix from "./deduction-matrix.json";
import type { ClaimVerdict } from "./verdicts";

export type DeadlineRule = {
    kind: "claimRaisedWithinDays";
    days: number;
};

export type DeductionType = {
    id: string;
    label: string;
    family: string;
    defaultVerdict: ClaimVerdict;
    shortEvidence: string;
    codeCheck: string;
    neutralQuery: string;
    deadlineHelper: string;
    deadlineRule?: DeadlineRule;
};

export const deductionTypes = matrix as DeductionType[];

export const deductionTypesById = new Map(
    deductionTypes.map((deductionType) => [deductionType.id, deductionType]),
);

export function getDeductionType(id: string): DeductionType {
    const deductionType = deductionTypesById.get(id);
    if (!deductionType) {
        throw new Error(`Unknown deduction type: ${id}`);
    }
    return deductionType;
}
```

- [ ] **Step 6: Create the CTA URL builder**

Create `lib/claims/claims-desk-cta.ts`:

```ts
const CLAIMS_DESK_BASE = "https://claims-desk.invaritech.ai/";

export type ClaimsDeskCtaInput = {
    medium: string;
    content: string;
};

export function buildClaimsDeskUrl({ medium, content }: ClaimsDeskCtaInput): string {
    const url = new URL(CLAIMS_DESK_BASE);
    url.searchParams.set("utm_source", "invaritech");
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", "claims-desk");
    url.searchParams.set("utm_content", content);
    return url.toString();
}
```

- [ ] **Step 7: Create shared components**

Create `components/claims/verdict-stamp.tsx`:

```tsx
import type { ClaimVerdict } from "@/lib/claims/verdicts";

const classes: Record<ClaimVerdict, string> = {
    supportable: "border-emerald-700/30 bg-emerald-700/10 text-emerald-800",
    "missing proof": "border-amber-700/30 bg-amber-700/10 text-amber-800",
    "worth challenging": "border-primary/30 bg-primary/10 text-primary",
    "Code risk": "border-red-700/30 bg-red-700/10 text-red-800",
};

export function VerdictStamp({ verdict }: { verdict: ClaimVerdict }) {
    return (
        <span
            className={`inline-flex border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] ${classes[verdict]}`}
        >
            {verdict}
        </span>
    );
}
```

Create `components/claims/claims-cta.tsx`:

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { trackSiteEvent } from "@/lib/analytics/site-events";
import { buildClaimsDeskUrl } from "@/lib/claims/claims-desk-cta";

type Props = {
    medium: string;
    content: string;
    children?: ReactNode;
    className?: string;
};

export function ClaimsCTA({
    medium,
    content,
    children = "Send one redacted remittance",
    className = "site-button gap-2",
}: Props) {
    const href = buildClaimsDeskUrl({ medium, content });

    return (
        <Link
            href={href}
            className={className}
            onClick={() => {
                trackSiteEvent("claims_cta_click", { medium, content });
            }}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
    );
}
```

- [ ] **Step 8: Extend analytics event names**

Modify `lib/analytics/site-events.ts` so `SiteEventName` includes:

```ts
    | "claims_cta_click"
    | "claims_difot_checker_run"
    | "claims_worksheet_download";
```

- [ ] **Step 9: Run tests and commit**

Run:

```bash
node --experimental-strip-types --test tests/claims-foundation.test.mjs
pnpm lint
```

Expected: PASS.

Commit:

```bash
git add lib/claims/verdicts.ts lib/claims/deduction-matrix.json lib/claims/deduction-matrix.ts lib/claims/claims-desk-cta.ts components/claims/verdict-stamp.tsx components/claims/claims-cta.tsx lib/analytics/site-events.ts tests/claims-foundation.test.mjs
git commit -m "feat(claims): add shared claims foundation"
```

---

## Task 2: DIFOT Evidence Checker And Ranking Pages

**Files:**

- Create: `lib/claims/difot-penalty-checker.ts`
- Create: `components/claims/difot-penalty-checker.tsx`
- Create: `app/resources/difot-calculator/page.tsx`
- Create: `app/glossary/difot/page.tsx`
- Test: `tests/difot-penalty-checker.test.mjs`

**Interfaces:**

- Consumes: `ClaimVerdict`, `ClaimsCTA`, `VerdictStamp`, `trackSiteEvent`
- Produces: `evaluateDifotPenalty(input: DifotPenaltyInput): DifotPenaltyResult`

- [ ] **Step 1: Write the behavioral DIFOT test**

Create `tests/difot-penalty-checker.test.mjs`:

```js
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { evaluateDifotPenalty } from "../lib/claims/difot-penalty-checker.ts";

const completeEvidence = {
    hasPo: true,
    hasAsn: true,
    hasBookedWindow: true,
    hasPod: true,
    hasDockTimestamp: true,
    hasRetailerScorecardLine: true,
};

describe("evaluateDifotPenalty", () => {
    it("returns missing proof when the scorecard line is absent", () => {
        const result = evaluateDifotPenalty({
            retailer: "Coles",
            claimReason: "DIFOT penalty week 32",
            evidence: { ...completeEvidence, hasRetailerScorecardLine: false },
        });
        assert.equal(result.verdict, "missing proof");
        assert.match(result.primaryGap, /scorecard/i);
        assert.match(result.neutralQuery, /DIFOT scorecard line/);
    });

    it("returns worth challenging when supplier evidence conflicts with the penalty", () => {
        const result = evaluateDifotPenalty({
            retailer: "Woolworths",
            claimReason: "DIFOT penalty",
            evidence: completeEvidence,
            supplierRecord: { deliveredInFull: true, arrivedInsideWindow: true },
        });
        assert.equal(result.verdict, "worth challenging");
        assert.match(result.primaryGap, /conflicts/i);
    });

    it("returns supportable when supplier inputs show late or short delivery and evidence is complete", () => {
        const result = evaluateDifotPenalty({
            retailer: "Metcash",
            claimReason: "DIFOT penalty",
            evidence: completeEvidence,
            supplierRecord: { deliveredInFull: false, arrivedInsideWindow: false },
        });
        assert.equal(result.verdict, "supportable");
    });
});
```

- [ ] **Step 2: Run the DIFOT test to see the expected failure**

Run:

```bash
node --experimental-strip-types --test tests/difot-penalty-checker.test.mjs
```

Expected: fails because the checker module is not created.

- [ ] **Step 3: Implement pure DIFOT logic**

Create `lib/claims/difot-penalty-checker.ts`:

```ts
import type { ClaimVerdict } from "./verdicts";

export type DifotRetailer = "Coles" | "Woolworths" | "Metcash" | "ALDI" | "Costco" | "Other";

export type DifotEvidenceState = {
    hasPo: boolean;
    hasAsn: boolean;
    hasBookedWindow: boolean;
    hasPod: boolean;
    hasDockTimestamp: boolean;
    hasRetailerScorecardLine: boolean;
};

export type DifotSupplierRecord = {
    deliveredInFull?: boolean;
    arrivedInsideWindow?: boolean;
};

export type DifotPenaltyInput = {
    retailer: DifotRetailer;
    claimReason: string;
    evidence: DifotEvidenceState;
    supplierRecord?: DifotSupplierRecord;
};

export type DifotPenaltyResult = {
    verdict: ClaimVerdict;
    primaryGap: string;
    evidenceToRequest: string[];
    neutralQuery: string;
    methodNote: string;
};

const evidenceLabels: Array<[keyof DifotEvidenceState, string]> = [
    ["hasPo", "PO"],
    ["hasAsn", "ASN"],
    ["hasBookedWindow", "booked delivery window"],
    ["hasPod", "POD"],
    ["hasDockTimestamp", "dock timestamp"],
    ["hasRetailerScorecardLine", "retailer scorecard line"],
];

export function evaluateDifotPenalty(input: DifotPenaltyInput): DifotPenaltyResult {
    const missing = evidenceLabels
        .filter(([key]) => !input.evidence[key])
        .map(([, label]) => label);

    const neutralQuery =
        "Please provide the DIFOT scorecard line, booked-window basis, dock timestamp, and calculation used for this deduction.";

    if (missing.length > 0) {
        return {
            verdict: "missing proof",
            primaryGap: `Missing evidence: ${missing.join(", ")}.`,
            evidenceToRequest: missing,
            neutralQuery,
            methodNote:
                "The arithmetic is simple. The scorecard basis and delivery evidence are what decide whether the penalty holds.",
        };
    }

    if (
        input.supplierRecord?.deliveredInFull === true &&
        input.supplierRecord?.arrivedInsideWindow === true
    ) {
        return {
            verdict: "worth challenging",
            primaryGap:
                "Supplier records conflict with the penalty. Reconcile the retailer scorecard against the booked window, POD, and dock timestamp.",
            evidenceToRequest: ["scorecard calculation", "booked-window basis", "dock timestamp used"],
            neutralQuery,
            methodNote:
                "A retailer scorecard can count differently from supplier records. Ask for the line-level basis before accepting the penalty.",
        };
    }

    if (
        input.supplierRecord?.deliveredInFull === false ||
        input.supplierRecord?.arrivedInsideWindow === false
    ) {
        return {
            verdict: "supportable",
            primaryGap:
                "Your own inputs show short delivery or delivery outside the booked window, and the core evidence is present.",
            evidenceToRequest: [],
            neutralQuery,
            methodNote:
                "Not every deduction is wrong. Keep the evidence pack with the remittance line before writing it off.",
        };
    }

    return {
        verdict: "missing proof",
        primaryGap:
            "The core evidence exists, but no supplier-side pass/fail signal was entered. Compare the scorecard to the booked window, POD, and dock timestamp.",
        evidenceToRequest: ["supplier pass/fail basis"],
        neutralQuery,
        methodNote:
            "The checker is an evidence model, not the retailer's official scorecard.",
    };
}
```

- [ ] **Step 4: Build the client checker UI**

Create `components/claims/difot-penalty-checker.tsx`.

Required behavior:

- Minimum fields: retailer, claim note, six evidence checkboxes.
- Optional radio group: not sure, full and on time, short or late.
- Results show verdict, primary gap, method note, neutral query, and Claims Desk CTA.
- Track `claims_difot_checker_run` with non-sensitive fields only: verdict, retailer, evidence completeness.

- [ ] **Step 5: Create the DIFOT pages**

Create `app/resources/difot-calculator/page.tsx`:

- H1: "DIFOT calculator: formula, example, and penalty checker".
- Canonical: `https://www.invaritech.ai/resources/difot-calculator/`.
- Include text sections for DIFOT meaning, formula, worked example, why the math is not the hard part, evidence to request, and the checker.
- Link up to `/resources/retailer-deductions/`.
- Do not link to `/glossary/otif/` in V1.

Create `app/glossary/difot/page.tsx`:

- H1: "What is DIFOT?"
- Canonical: `https://www.invaritech.ai/glossary/difot/`.
- Definition-first copy.
- Link to `/resources/difot-calculator/`, `/resources/retailer-deductions/`, and `/glossary/remittance-advice/`.
- Do not link to `/glossary/otif/` in V1.

- [ ] **Step 6: Verify and commit**

Run:

```bash
node --experimental-strip-types --test tests/difot-penalty-checker.test.mjs tests/claims-foundation.test.mjs
pnpm lint
pnpm build
```

Expected: PASS.

Commit:

```bash
git add lib/claims/difot-penalty-checker.ts components/claims/difot-penalty-checker.tsx app/resources/difot-calculator/page.tsx app/glossary/difot/page.tsx tests/difot-penalty-checker.test.mjs
git commit -m "feat(claims): add DIFOT evidence checker"
```

---

## Task 3: Proof Pages And Worksheet

**Files:**

- Create: `app/resources/sample-claims-evidence-pack/page.tsx`
- Create: `app/glossary/remittance-advice/page.tsx`
- Create: `app/glossary/food-and-grocery-code/page.tsx`
- Create: `scripts/generate-claims-worksheet.py`
- Create: `public/retailer-deduction-triage-worksheet.xlsx`
- Create: `components/claims/worksheet-download-link.tsx`
- Test: `tests/claims-worksheet.test.mjs`

**Interfaces:**

- Consumes: `deduction-matrix.json`, `ClaimsCTA`, `VerdictStamp`
- Produces: three indexable content pages and a valid XLSX worksheet

- [ ] **Step 1: Write the worksheet behavior test**

Create `tests/claims-worksheet.test.mjs`:

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { describe, it } from "node:test";

const matrix = JSON.parse(readFileSync("lib/claims/deduction-matrix.json", "utf8"));

describe("Retailer Deduction Triage Worksheet", () => {
    it("has deadline rules for shortfall and damaged goods", () => {
        for (const id of ["shortfall", "damaged-goods"]) {
            const row = matrix.find((item) => item.id === id);
            assert.equal(row.deadlineRule.kind, "claimRaisedWithinDays");
            assert.equal(row.deadlineRule.days, 30);
        }
    });

    it("generates a valid XLSX package from the matrix", () => {
        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });
        assert.ok(existsSync("public/retailer-deduction-triage-worksheet.xlsx"));

        const listing = execFileSync(
            "python3",
            ["-m", "zipfile", "-l", "public/retailer-deduction-triage-worksheet.xlsx"],
            { encoding: "utf8" },
        );

        for (const expected of [
            "[Content_Types].xml",
            "xl/workbook.xml",
            "xl/worksheets/sheet1.xml",
            "xl/worksheets/sheet2.xml",
            "xl/worksheets/sheet3.xml",
            "xl/worksheets/sheet4.xml",
        ]) {
            assert.ok(listing.includes(expected), `${expected} should be present`);
        }
    });

    it("generates byte-identical XLSX output across runs", () => {
        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });
        const first = readFileSync("public/retailer-deduction-triage-worksheet.xlsx");

        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });
        const second = readFileSync("public/retailer-deduction-triage-worksheet.xlsx");

        assert.deepEqual(first, second);
    });
});
```

- [ ] **Step 2: Build the worksheet generator**

Create `scripts/generate-claims-worksheet.py`.

Implementation constraints:

- Python stdlib only.
- Use `zipfile`.
- Write ZIP entries with `ZipInfo` objects and fixed `date_time = (1980, 1, 1, 0, 0, 0)`.
- Do not use `ZipFile.write` on real files because filesystem mtimes make the workbook nondeterministic.
- Read `lib/claims/deduction-matrix.json`.
- Write `public/retailer-deduction-triage-worksheet.xlsx`.
- Four tabs:
  - `Start Here`
  - `Claim Ledger`
  - `Deduction Type Matrix`
  - `Summary`
- Include formula-driven auto-fill from `Deduction Type Matrix` using `INDEX` / `MATCH`.
- Include 30-day flag formula for shortfall and damaged goods using claim date and delivery date.
- Include `High`, `Medium`, `Low` priority bands.
- Do not hand-roll dropdown data validation in V1.
- Do not hand-roll conditional formatting in V1.

Required workbook behavior:

- The matrix tab contains every JSON deduction type.
- The ledger tab has columns for retailer, dates, deduction type, reason note, amount, verdict, evidence, Code check, neutral query, gap, priority, owner, and status.
- The summary tab totals amount by verdict and lists the Claims Desk handoff line.

- [ ] **Step 3: Generate and validate the worksheet**

Run:

```bash
python3 scripts/generate-claims-worksheet.py
python3 -m zipfile -l public/retailer-deduction-triage-worksheet.xlsx
node --experimental-strip-types --test tests/claims-worksheet.test.mjs
```

Expected: workbook is present, zip listing succeeds, test PASS.

- [ ] **Step 4: Create the worksheet download link**

Create `components/claims/worksheet-download-link.tsx` before wiring the remittance page:

```tsx
"use client";

import Link from "next/link";
import { Download } from "lucide-react";

import { trackSiteEvent } from "@/lib/analytics/site-events";

export function WorksheetDownloadLink() {
    return (
        <Link
            href="/retailer-deduction-triage-worksheet.xlsx"
            className="site-button-secondary gap-2"
            onClick={() => {
                trackSiteEvent("claims_worksheet_download", {
                    medium: "remittance-advice",
                    content: "remittance-worksheet",
                });
            }}
        >
            Download the worksheet
            <Download className="size-4" aria-hidden="true" />
        </Link>
    );
}
```

- [ ] **Step 5: Create the sample teardown page**

Create `app/resources/sample-claims-evidence-pack/page.tsx`.

Required content:

- H1: "Sample claims evidence-pack teardown".
- Synthetic-data caveat.
- "Illustrative, not a recovery guarantee."
- "Not legal advice."
- Method explainer.
- DIFOT example with `worth challenging` and CTA `medium="sample-teardown" content="difot-example"`.
- Promo scan example with main `missing proof` and line-level `supportable`.
- Shrinkage example with `Code risk` and explicit Code preconditions.
- Links up to `/resources/retailer-deductions/`.

- [ ] **Step 6: Create the remittance advice page**

Create `app/glossary/remittance-advice/page.tsx`.

Required content:

- H1: "What is a remittance advice?"
- Canonical: `https://www.invaritech.ai/glossary/remittance-advice/`.
- Definition, remittance contents, invoice vs receipt, proof-of-payment answer, supermarket-deduction pivot.
- Download link through `WorksheetDownloadLink`.
- Claims Desk CTA `medium="remittance-advice" content="page-cta"`.
- Link up to `/resources/retailer-deductions/`.

- [ ] **Step 7: Create the Food and Grocery Code page**

Create `app/glossary/food-and-grocery-code/page.tsx`.

Required content:

- H1: "The Food and Grocery Code: which retailer deductions suppliers can challenge".
- Current as of June 2026.
- Mandatory since 1 April 2025.
- Transition period ended 1 April 2026.
- Covered list: ALDI, Coles Group, Metcash Food & Grocery, Woolworths Group.
- Costco note.
- Four supplier-side deduction checks: shrinkage, set-offs, wastage, shortfall / damage timing.
- Descriptive framing only.
- Neutral factual questions.
- Sources: ACCC pages, legislation.gov.au, Grocery Code Supervisor.
- Claims Desk CTA `medium="food-grocery-code" content="page-cta"`.
- Link up to `/resources/retailer-deductions/`.

- [ ] **Step 8: Verify and commit**

Run:

```bash
node --experimental-strip-types --test tests/claims-worksheet.test.mjs
pnpm lint
pnpm build
```

Expected: PASS.

Commit:

```bash
git add app/resources/sample-claims-evidence-pack/page.tsx app/glossary/remittance-advice/page.tsx app/glossary/food-and-grocery-code/page.tsx components/claims/worksheet-download-link.tsx scripts/generate-claims-worksheet.py public/retailer-deduction-triage-worksheet.xlsx tests/claims-worksheet.test.mjs
git commit -m "feat(claims): add proof pages and worksheet"
```

---

## Task 4: Hub, Checklist, Registries, Invariants, Attribution QA

**Files:**

- Create: `app/resources/retailer-deductions/page.tsx`
- Create: `tests/claims-invariants.test.mjs`
- Modify: `app/resources/supermarket-claim-types-worth-checking/page.tsx`
- Modify: `lib/resources.ts`
- Modify: `components/resource-library-client.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**

- Consumes: `deductionTypes`, `ClaimsCTA`, `buildClaimsDeskUrl`
- Produces: complete Claims cluster and repo-wide drift checks

- [ ] **Step 1: Build the retailer deductions hub**

Create `app/resources/retailer-deductions/page.tsx`.

Required content:

- H1: "Retailer deductions: the supplier's guide".
- Four verdict stamps.
- Deduction family blocks.
- Links to:
  - `/resources/sample-claims-evidence-pack/`
  - `/resources/difot-calculator/`
  - `/glossary/difot/`
  - `/glossary/remittance-advice/`
  - `/glossary/food-and-grocery-code/`
  - `/resources/supermarket-claim-types-worth-checking/`
- Claims Desk CTA `medium="retailer-deductions" content="page-cta"`.

- [ ] **Step 2: Rewire the existing checklist**

Modify `app/resources/supermarket-claim-types-worth-checking/page.tsx`:

- Replace legacy `Code-conditional` copy with `Code risk`.
- Use the four stamp language.
- Add links to the hub, sample teardown, DIFOT checker, remittance advice page, and Code page.
- Route Claims Desk CTA through `buildClaimsDeskUrl` or `ClaimsCTA`.
- Use `medium="claims-checklist" content="page-cta"`.

- [ ] **Step 3: Register resources and sitemap entries**

Modify `lib/resources.ts` and add:

- `retailer-deductions`
- `sample-claims-evidence-pack`
- `difot-calculator`
- `remittance-advice`
- `food-and-grocery-code`

Modify `components/resource-library-client.tsx` supplier claims group to include the new slugs.

Modify `app/sitemap.ts` and add:

- `/resources/retailer-deductions/`
- `/resources/sample-claims-evidence-pack/`
- `/resources/difot-calculator/`
- `/glossary/difot/`
- `/glossary/remittance-advice/`
- `/glossary/food-and-grocery-code/`

- [ ] **Step 4: Add repo-wide Claims invariants**

Create `tests/claims-invariants.test.mjs`:

```js
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

import { CLAIMS_VERDICTS } from "../lib/claims/verdicts.ts";

function walkFiles(dir) {
    return readdirSync(dir).flatMap((entry) => {
        const path = join(dir, entry);
        const stat = statSync(path);
        if (stat.isDirectory()) return walkFiles(path);
        return [path];
    });
}

const claimsSurfaceFiles = [
    ...walkFiles("lib/claims").filter((path) => /\.(ts|json)$/.test(path)),
    ...walkFiles("components/claims").filter((path) => /\.(ts|tsx)$/.test(path)),
    ...walkFiles("app/resources").filter((path) => /page\.tsx$/.test(path) && /claim|deduction|difot|remittance|retailer/.test(path)),
    ...walkFiles("app/glossary").filter((path) => /page\.tsx$/.test(path) && /difot|remittance|food-and-grocery-code/.test(path)),
];

describe("Claims invariants", () => {
    it("keeps the exact verdict taxonomy", () => {
        assert.deepEqual(CLAIMS_VERDICTS, [
            "supportable",
            "missing proof",
            "worth challenging",
            "Code risk",
        ]);
    });

    it("keeps legacy Code-conditional wording out of Claims surfaces", () => {
        const offenders = claimsSurfaceFiles.filter((file) =>
            readFileSync(file, "utf8").includes("Code-conditional"),
        );
        assert.deepEqual(offenders, []);
    });

    it("does not hardcode the Claims Desk domain in page components", () => {
        const pageFiles = [...walkFiles("app/resources"), ...walkFiles("app/glossary")].filter((path) =>
            path.endsWith("page.tsx"),
        );
        const offenders = pageFiles.filter((file) =>
            readFileSync(file, "utf8").includes("claims-desk.invaritech.ai"),
        );
        assert.deepEqual(offenders, []);
    });
});
```

- [ ] **Step 5: Verify all local tests, links, lint, and build**

Run:

```bash
node --experimental-strip-types --test tests/claims-foundation.test.mjs tests/difot-penalty-checker.test.mjs tests/claims-worksheet.test.mjs tests/claims-invariants.test.mjs tests/internal-links.test.mjs
pnpm lint
pnpm build
```

Expected: all tests PASS, lint PASS, build PASS.

- [ ] **Step 6: Manual attribution QA after deployment**

Acceptance test:

1. Visit a deployed authority page.
2. Click a Claims Desk CTA.
3. Confirm the outbound URL includes `utm_source=invaritech`, correct `utm_medium`, `utm_campaign=claims-desk`, and correct `utm_content`.
4. Submit a test teardown request on Claims Desk.
5. Confirm the form submission record includes the same UTM fields.
6. Confirm GA4 can report the conversion by source page and placement.

If the Claims Desk form does not record the UTM values, add UTM capture on `claims-desk.invaritech.ai` before calling V1 complete.

- [ ] **Step 7: Publish checklist**

After deploy:

- Submit new URLs via IndexNow.
- Add target keywords to Rank Tracker:
  - remittance advice
  - remittance advice meaning
  - what is remittance advice
  - difot
  - difot meaning
  - difot formula
  - difot calculator
  - difot calculation
  - food and grocery code of conduct
  - retailer deductions
  - supplier deductions
  - short-pays
- Confirm GSC indexing requests for new pages.

- [ ] **Step 8: Commit Task 4**

```bash
git add app/resources/retailer-deductions/page.tsx app/resources/supermarket-claim-types-worth-checking/page.tsx lib/resources.ts components/resource-library-client.tsx app/sitemap.ts tests/claims-invariants.test.mjs
git commit -m "feat(claims): wire Claims resource cluster"
```

---

## Review Checklist

- The plan has four implementation tasks.
- Static page copy is covered by build, internal-link tests, and invariants, not per-page string grep tests.
- The behavioral tests are limited to `buildClaimsDeskUrl`, exact stamp taxonomy, matrix shape, DIFOT logic, worksheet generation, and drift invariants.
- The worksheet avoids hand-rolled dropdown validation and conditional formatting in V1.
- The DIFOT pages do not link to `/glossary/otif/` before that page exists.
- Cross-subdomain attribution remains a release gate.

## Execution Handoff

Recommended execution is subagent-driven because the four tasks are separable and reviewable.
