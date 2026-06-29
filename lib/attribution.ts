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

export function appendAttributionToFormData(fd: FormData): void {
    const attribution = getAttributionData();
    for (const [key, value] of Object.entries(attribution)) {
        fd.set(key, value);
    }
}

export function extractAttributionFromFormData(fd: FormData): AttributionData {
    const s = (key: string) => {
        const value = fd.get(key);
        return typeof value === "string" ? value : "";
    };

    return {
        submit_page_url: s("submit_page_url"),
        submit_page_path: s("submit_page_path"),
        submit_page_title: s("submit_page_title"),
        referrer: s("referrer"),
        landing_page_url: s("landing_page_url"),
        landing_page_path: s("landing_page_path"),
        utm_source: s("utm_source"),
        utm_medium: s("utm_medium"),
        utm_campaign: s("utm_campaign"),
        utm_term: s("utm_term"),
        utm_content: s("utm_content"),
        utm_id: s("utm_id"),
        utm_source_platform: s("utm_source_platform"),
        utm_creative_format: s("utm_creative_format"),
        utm_marketing_tactic: s("utm_marketing_tactic"),
        gclid: s("gclid"),
        gbraid: s("gbraid"),
        wbraid: s("wbraid"),
        fbclid: s("fbclid"),
        msclkid: s("msclkid"),
        li_fat_id: s("li_fat_id"),
    };
}

function param(params: URLSearchParams, key: string): string {
    return params.get(key) ?? "";
}

function getAttributionData(): AttributionData {
    const isClient = typeof window !== "undefined";
    const hasDocument = typeof document !== "undefined";
    const params = new URLSearchParams(isClient ? window.location.search : "");

    let landingUrl = "";
    let landingPath = "";
    try {
        landingUrl = sessionStorage.getItem(LANDING_URL_KEY) ?? "";
        landingPath = sessionStorage.getItem(LANDING_PATH_KEY) ?? "";
    } catch {
        // ignore
    }

    return {
        submit_page_url: isClient ? window.location.href : "",
        submit_page_path: isClient ? window.location.pathname : "",
        submit_page_title: hasDocument ? document.title : "",
        referrer: hasDocument ? document.referrer : "",
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
