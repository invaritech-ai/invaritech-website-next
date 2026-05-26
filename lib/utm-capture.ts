"use client";

import { useEffect } from "react";

const SESSION_SRC_KEY = "invaritech.utm.src";
const SESSION_CAMPAIGN_KEY = "invaritech.utm.campaign";

export type UtmParams = {
    src?: string;
    campaign?: string;
};

/**
 * Parse src/campaign params from a URL or path+search string. Pure function,
 * testable.
 */
export function parseUtmParams(urlOrPath: string): UtmParams {
    // URL constructor needs a base for relative paths; use a placeholder.
    const url = new URL(urlOrPath, "https://placeholder.local");
    const out: UtmParams = {};
    const src = url.searchParams.get("src");
    const campaign = url.searchParams.get("campaign");
    if (src && src.length > 0) out.src = src;
    if (campaign && campaign.length > 0) out.campaign = campaign;
    return out;
}

/**
 * Client-side hook: on mount, reads ?src and ?campaign from the current URL
 * and stores them in sessionStorage for later CTA pickup. Safe to call from
 * any page; only acts when in a browser context.
 */
export function useUtmCapture(): void {
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const params = parseUtmParams(window.location.pathname + window.location.search);
            if (params.src) window.sessionStorage.setItem(SESSION_SRC_KEY, params.src);
            if (params.campaign) window.sessionStorage.setItem(SESSION_CAMPAIGN_KEY, params.campaign);
        } catch {
            // sessionStorage unavailable; ignore.
        }
    }, []);
}
