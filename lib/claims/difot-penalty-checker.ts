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
                "Supplier records show evidence that conflicts with the penalty. Reconcile the retailer scorecard against the booked window, POD, and dock timestamp.",
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
            "Use this as an evidence check, not as the retailer's official scorecard.",
    };
}
