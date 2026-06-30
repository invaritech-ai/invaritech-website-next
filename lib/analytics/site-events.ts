type SiteEventName =
    | "glossary_tool_run"
    | "glossary_tool_tolerance_change"
    | "glossary_tool_csv_upload"
    | "glossary_filter_chip_click"
    | "cta_click"
    | "claims_cta_click"
    | "claims_difot_checker_run"
    | "claims_worksheet_download";

type SiteEventProps = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (command: "event", eventName: string, params?: SiteEventProps) => void;
    }
}

export function trackSiteEvent(name: SiteEventName, props: SiteEventProps = {}): void {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, props);
}
