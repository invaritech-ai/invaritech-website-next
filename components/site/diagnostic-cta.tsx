import Link from "next/link";
import { primaryDiagnosticCta } from "@/lib/site-content/brand";
import { cn } from "@/lib/utils";
import type { CTA } from "@/lib/site-content/types";

type DiagnosticCTAProps = {
    title: string;
    body: string;
    cta?: CTA;
    secondaryCta?: CTA;
    className?: string;
};

function ctaClassName(variant: CTA["variant"]) {
    return variant === "secondary" || variant === "text"
        ? "site-button-secondary"
        : "site-button";
}

export function DiagnosticCTA({
    title,
    body,
    cta = primaryDiagnosticCta,
    secondaryCta,
    className,
}: DiagnosticCTAProps) {
    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="site-card grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="site-h2">{title}</h2>
                        <p className="site-body mt-5 max-w-3xl">{body}</p>
                    </div>
                    <div className="site-button-row md:flex-col">
                        <Link href={cta.href} className={ctaClassName(cta.variant)}>
                            {cta.label}
                        </Link>
                        {secondaryCta ? (
                            <Link
                                href={secondaryCta.href}
                                className={ctaClassName(secondaryCta.variant)}
                            >
                                {secondaryCta.label}
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
