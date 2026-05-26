"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { trackSiteEvent } from "@/lib/analytics/site-events";
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

const DEFAULT_LABEL = "Book a Finance Workflow Audit";
const DEFAULT_HREF = "/contact?audit=1";

const SESSION_SRC_KEY = "invaritech.utm.src";
const SESSION_CAMPAIGN_KEY = "invaritech.utm.campaign";

export function AuditCTA({
    location,
    label = DEFAULT_LABEL,
    variant = "primary",
    href = DEFAULT_HREF,
    src,
    campaign,
    className = "",
}: Props) {
    // Read sessionStorage on mount so SSR-rendered href doesn't differ on first
    // paint, and we get hydration without warnings.
    const [storedSrc, setStoredSrc] = useState<string | undefined>(undefined);
    const [storedCampaign, setStoredCampaign] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            setStoredSrc(window.sessionStorage.getItem(SESSION_SRC_KEY) ?? undefined);
            setStoredCampaign(window.sessionStorage.getItem(SESSION_CAMPAIGN_KEY) ?? undefined);
        } catch {
            // sessionStorage unavailable; ignore.
        }
    }, []);

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
