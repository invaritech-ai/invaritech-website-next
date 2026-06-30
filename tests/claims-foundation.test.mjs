import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    buildClaimsDeskUrl,
    CLAIMS_DESK_CTA_CONTENTS,
    CLAIMS_DESK_CTA_MEDIA,
} from "../lib/claims/claims-desk-cta.ts";
import { claimSourcesById } from "../lib/claims/claim-sources.ts";
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

        assert.deepEqual(CLAIMS_DESK_CTA_MEDIA, [
            "sample-teardown",
            "difot-calculator",
            "remittance-advice",
            "food-grocery-code",
            "retailer-deductions",
            "claims-checklist",
            "difot-glossary",
        ]);
        assert.deepEqual(CLAIMS_DESK_CTA_CONTENTS, [
            "difot-example",
            "promo-scan-example",
            "shrinkage-code-risk-example",
            "result-cta",
            "remittance-worksheet",
            "page-cta",
        ]);
    });

    it("rejects unsupported Claims Desk CTA tags", () => {
        assert.throws(
            () =>
                buildClaimsDeskUrl({
                    medium: "sample-teardown",
                    content: "invoice-12345",
                }),
            /Unsupported claims desk CTA content: invoice-12345/,
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

    it("requires primary sources for Code-related deduction rows", () => {
        const codeRelatedIds = [
            "shrinkage",
            "shortfall",
            "damaged-goods",
            "wastage",
            "set-off",
            "post-audit-claim",
            "pallet-packaging-charge",
            "freight-transport-deduction",
            "listing-ranging-fee",
            "retail-media-activity-charge",
        ];

        for (const id of codeRelatedIds) {
            const deductionType = getDeductionType(id);
            assert.ok(
                deductionType.sourceIds?.length,
                `${id} should declare primary-source references`,
            );

            for (const sourceId of deductionType.sourceIds ?? []) {
                const source = claimSourcesById.get(sourceId);
                assert.ok(source, `${id} source ${sourceId} should resolve`);
                assert.ok(source?.authority);
                assert.match(source?.url ?? "", /^https:\/\/(www\.)?(accc\.gov\.au|legislation\.gov\.au)\//);
            }
        }
    });

});
