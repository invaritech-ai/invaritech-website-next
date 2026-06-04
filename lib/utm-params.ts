"use client";

type UtmParams = {
    src?: string;
    campaign?: string;
};

/**
 * Parse src/campaign params from a URL or path+search string.
 */
export function parseUtmParams(urlOrPath: string): UtmParams {
    const url = new URL(urlOrPath, "https://placeholder.local");
    const out: UtmParams = {};
    const src = url.searchParams.get("src");
    const campaign = url.searchParams.get("campaign");
    if (src && src.length > 0) out.src = src;
    if (campaign && campaign.length > 0) out.campaign = campaign;
    return out;
}
