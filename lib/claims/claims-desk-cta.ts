const CLAIMS_DESK_BASE = "https://claims-desk.invaritech.ai/";

export const CLAIMS_DESK_CTA_MEDIA = [
    "sample-teardown",
    "difot-calculator",
    "remittance-advice",
    "food-grocery-code",
    "retailer-deductions",
    "claims-checklist",
    "difot-glossary",
] as const;

export const CLAIMS_DESK_CTA_CONTENTS = [
    "difot-example",
    "promo-scan-example",
    "shrinkage-code-risk-example",
    "result-cta",
    "remittance-worksheet",
    "page-cta",
] as const;

export type ClaimsDeskCtaMedium = (typeof CLAIMS_DESK_CTA_MEDIA)[number];
export type ClaimsDeskCtaContent = (typeof CLAIMS_DESK_CTA_CONTENTS)[number];

export type ClaimsDeskCtaInput = {
    medium: ClaimsDeskCtaMedium;
    content: ClaimsDeskCtaContent;
};

function isClaimsDeskCtaMedium(value: string): value is ClaimsDeskCtaMedium {
    return (CLAIMS_DESK_CTA_MEDIA as readonly string[]).includes(value);
}

function isClaimsDeskCtaContent(value: string): value is ClaimsDeskCtaContent {
    return (CLAIMS_DESK_CTA_CONTENTS as readonly string[]).includes(value);
}

export function buildClaimsDeskUrl({ medium, content }: ClaimsDeskCtaInput): string {
    if (!isClaimsDeskCtaMedium(medium)) {
        throw new Error(`Unsupported claims desk CTA medium: ${medium}`);
    }
    if (!isClaimsDeskCtaContent(content)) {
        throw new Error(`Unsupported claims desk CTA content: ${content}`);
    }

    const url = new URL(CLAIMS_DESK_BASE);
    url.searchParams.set("utm_source", "invaritech");
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", "claims-desk");
    url.searchParams.set("utm_content", content);
    return url.toString();
}
