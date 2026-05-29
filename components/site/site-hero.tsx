import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CTA, HeroContent } from "@/lib/site-content/types";

type SiteHeroProps = {
    content: HeroContent;
    className?: string;
};

function ctaClassName(variant: CTA["variant"]) {
    return variant === "secondary" || variant === "text"
        ? "site-button-secondary"
        : "site-button";
}

export function SiteHero({ content, className }: SiteHeroProps) {
    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="site-meta">{content.eyebrow}</p>
                    <h1 className="site-h2 mt-5">{content.title}</h1>
                    <p className="site-lead mx-auto mt-6 max-w-3xl">
                        {content.body}
                    </p>
                    <div className="site-button-row-center mt-10">
                        <Link
                            href={content.primaryCta.href}
                            className={ctaClassName(content.primaryCta.variant)}
                        >
                            {content.primaryCta.label}
                        </Link>
                        {content.secondaryCta ? (
                            <Link
                                href={content.secondaryCta.href}
                                className={ctaClassName(
                                    content.secondaryCta.variant,
                                )}
                            >
                                {content.secondaryCta.label}
                            </Link>
                        ) : null}
                    </div>
                    {content.trustLine ? (
                        <p className="site-meta mx-auto mt-8 max-w-3xl">
                            {content.trustLine}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

export default SiteHero;
