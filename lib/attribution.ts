export interface AttributionData {
    submit_page_url: string;
    submit_page_path: string;
    submit_page_title: string;
    referrer: string;
    landing_page_url: string;
    landing_page_path: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
    utm_id: string;
    utm_source_platform: string;
    utm_creative_format: string;
    utm_marketing_tactic: string;
    gclid: string;
    gbraid: string;
    wbraid: string;
    fbclid: string;
    msclkid: string;
    li_fat_id: string;
}

const LANDING_URL_KEY = "landing_url";
const LANDING_PATH_KEY = "landing_path";

export function captureFirstLanding(): void {
    try {
        if (!sessionStorage.getItem(LANDING_URL_KEY)) {
            sessionStorage.setItem(LANDING_URL_KEY, window.location.href);
            sessionStorage.setItem(LANDING_PATH_KEY, window.location.pathname);
        }
    } catch {
        // sessionStorage unavailable (private browsing, storage full, etc.)
    }
}

function param(params: URLSearchParams, key: string): string {
    return params.get(key) ?? "";
}

export function getAttributionData(): AttributionData {
    const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
    );

    let landingUrl = "";
    let landingPath = "";
    try {
        landingUrl = sessionStorage.getItem(LANDING_URL_KEY) ?? "";
        landingPath = sessionStorage.getItem(LANDING_PATH_KEY) ?? "";
    } catch {
        // ignore
    }

    return {
        submit_page_url: typeof window !== "undefined" ? window.location.href : "",
        submit_page_path: typeof window !== "undefined" ? window.location.pathname : "",
        submit_page_title: typeof document !== "undefined" ? document.title : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        landing_page_url: landingUrl,
        landing_page_path: landingPath,
        utm_source: param(params, "utm_source"),
        utm_medium: param(params, "utm_medium"),
        utm_campaign: param(params, "utm_campaign"),
        utm_term: param(params, "utm_term"),
        utm_content: param(params, "utm_content"),
        utm_id: param(params, "utm_id"),
        utm_source_platform: param(params, "utm_source_platform"),
        utm_creative_format: param(params, "utm_creative_format"),
        utm_marketing_tactic: param(params, "utm_marketing_tactic"),
        gclid: param(params, "gclid"),
        gbraid: param(params, "gbraid"),
        wbraid: param(params, "wbraid"),
        fbclid: param(params, "fbclid"),
        msclkid: param(params, "msclkid"),
        li_fat_id: param(params, "li_fat_id"),
    };
}
