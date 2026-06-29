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
