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
