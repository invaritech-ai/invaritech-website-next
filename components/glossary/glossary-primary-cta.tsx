"use client";

import Link from "next/link";
import { trackGlossaryEvent } from "@/lib/analytics/glossary-events";

type Props = {
    location: "hero" | "mid" | "footer";
    label: string;
    href?: string;
};

export function GlossaryPrimaryCTA({ location, label, href = "/contact" }: Props) {
    return (
        <Link
            href={href}
            className="site-button glossary-primary-cta"
            onClick={() => trackGlossaryEvent("cta_click", { location })}
        >
            {label}
            <span className="glossary-cta-arrow">↗</span>
        </Link>
    );
}
