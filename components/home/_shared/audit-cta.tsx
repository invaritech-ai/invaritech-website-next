"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { trackSiteEvent } from "@/lib/analytics/site-events";
import {
    SESSION_CAMPAIGN_KEY,
    SESSION_SRC_KEY,
    UTM_CAPTURE_EVENT,
} from "@/lib/utm-capture";
import { appendAuditCtaParams } from "./audit-cta-href";

type Location = "hero" | "mid" | "footer" | "nav" | "card";
type Variant = "primary" | "secondary";

type Props = {
    location: Location;
    label?: string;
    variant?: Variant;
    /** Override default audit href. Defaults to /contact?audit=1. */
    href?: string;
    /** Explicit src; otherwise falls back to sessionStorage utm_src. */
    src?: string;
    /** Explicit campaign; otherwise falls back to sessionStorage utm_campaign. */
    campaign?: string;
    className?: string;
};

const DEFAULT_LABEL = "Book Workflow Diagnostic";
const DEFAULT_HREF = "/contact/?diagnostic=1";

function subscribeSessionStorage(callback: () => void) {
    if (typeof window === "undefined") return () => {};
    const timeoutId = window.setTimeout(callback, 0);
    window.addEventListener("storage", callback);
    window.addEventListener(UTM_CAPTURE_EVENT, callback);
    return () => {
        window.clearTimeout(timeoutId);
        window.removeEventListener("storage", callback);
        window.removeEventListener(UTM_CAPTURE_EVENT, callback);
    };
}

function readSessionValue(key: string) {
    if (typeof window === "undefined") return undefined;
    try {
        return window.sessionStorage.getItem(key) ?? undefined;
    } catch {
        return undefined;
    }
}

export function AuditCTA({
    location,
    label = DEFAULT_LABEL,
    variant = "primary",
    href = DEFAULT_HREF,
    src,
    campaign,
    className = "",
}: Props) {
    const storedSrc = useSyncExternalStore(
        subscribeSessionStorage,
        () => readSessionValue(SESSION_SRC_KEY),
        () => undefined,
    );
    const storedCampaign = useSyncExternalStore(
        subscribeSessionStorage,
        () => readSessionValue(SESSION_CAMPAIGN_KEY),
        () => undefined,
    );

    const effectiveSrc = src ?? storedSrc;
    const effectiveCampaign = campaign ?? storedCampaign;
    const finalHref = appendAuditCtaParams(href, { src: effectiveSrc, campaign: effectiveCampaign });

    const baseClass = variant === "secondary" ? "site-button-secondary" : "site-button";

    return (
        <Link
            href={finalHref}
            className={`${baseClass} audit-cta audit-cta-${variant} ${className}`.trim()}
            onClick={() => {
                trackSiteEvent("cta_click", {
                    location,
                    src: effectiveSrc ?? "",
                    campaign: effectiveCampaign ?? "",
                });
            }}
        >
            {label}
            <span className="audit-cta-arrow" aria-hidden>↗</span>
        </Link>
    );
}
