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
