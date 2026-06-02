import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CTA, OfferCard } from "@/lib/site-content/types";

type OfferStage = {
    id: string;
    title: string;
    body: string;
    offers: OfferCard[];
};

type OfferLadderProps = {
    stages: OfferStage[];
    className?: string;
};

function ctaClassName(variant: CTA["variant"]) {
    return variant === "secondary" || variant === "text"
        ? "site-button-secondary"
        : "site-button";
}

export function OfferLadder({ stages, className }: OfferLadderProps) {
    if (stages.length === 0) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="space-y-14">
                    {stages.map((stage, index) => (
                        <section
                            key={stage.id}
                            className="border-t border-border pt-8"
                        >
                            <div className="max-w-3xl">
                                <p className="site-meta">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h3 className="site-h3 mt-5">
                                    {stage.title}
                                </h3>
                                <p className="site-body mt-4">{stage.body}</p>
                            </div>
                            <div className="site-grid-three mt-8">
                                {stage.offers.map((offer) => (
                                    <article
                                        key={offer.id}
                                        className="site-card"
                                    >
                                        <p className="site-meta">
                                            {offer.audience}
                                        </p>
                                        <h4 className="site-h3 mt-4 text-2xl md:text-2xl">
                                            {offer.title}
                                        </h4>
                                        <p className="site-body mt-4">
                                            {offer.promise}
                                        </p>
                                        {offer.includes.length > 0 ? (
                                            <ul className="mt-6 space-y-3">
                                                {offer.includes.map(
                                                    (item) => (
                                                        <li
                                                            key={item}
                                                            className="site-body text-base md:text-base"
                                                        >
                                                            {item}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : null}
                                        {offer.cta ? (
                                            <Link
                                                href={offer.cta.href}
                                                className={cn(
                                                    ctaClassName(
                                                        offer.cta.variant,
                                                    ),
                                                    "mt-7",
                                                )}
                                            >
                                                {offer.cta.label}
                                            </Link>
                                        ) : null}
                                    </article>
                                ))}
                                {Array.from({
                                    length:
                                        (3 - (stage.offers.length % 3)) % 3,
                                }).map((_, fillerIndex) => (
                                    <div
                                        key={`offer-filler-${fillerIndex}`}
                                        aria-hidden
                                        className="hidden bg-background md:block"
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
