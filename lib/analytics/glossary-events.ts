type GlossaryEventName =
    | "glossary_tool_run"
    | "glossary_tool_tolerance_change"
    | "glossary_tool_csv_upload"
    | "glossary_secondary_cta_submit"
    | "glossary_filter_chip_click"
    | "cta_click";

type GlossaryEventProps = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (command: "event", eventName: string, params?: GlossaryEventProps) => void;
    }
}

export function trackGlossaryEvent(name: GlossaryEventName, props: GlossaryEventProps = {}): void {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, { page: "glossary/three-way-match", ...props });
}
