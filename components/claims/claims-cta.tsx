"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { trackSiteEvent } from "@/lib/analytics/site-events";
import {
    buildClaimsDeskUrl,
    type ClaimsDeskCtaContent,
    type ClaimsDeskCtaMedium,
} from "@/lib/claims/claims-desk-cta";

type Props = {
    medium: ClaimsDeskCtaMedium;
    content: ClaimsDeskCtaContent;
    children?: ReactNode;
    className?: string;
};

export function ClaimsCTA({
    medium,
    content,
    children = "Send one redacted remittance",
    className = "site-button gap-2",
}: Props) {
    const href = buildClaimsDeskUrl({ medium, content });

    return (
        <Link
            href={href}
            className={className}
            onClick={() => {
                trackSiteEvent("claims_cta_click", { medium, content });
            }}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
    );
}
