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
