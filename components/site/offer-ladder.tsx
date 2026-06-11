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
                <div className="offer-ladder-ledger">
                    {stages.map((stage, index) => (
                        <section
                            key={stage.id}
                            className="offer-ladder-stage"
                            data-reveal="block"
                        >
                            <div className="offer-ladder-stage-head">
                                <p className="site-meta">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h3 className="site-h3 mt-4">{stage.title}</h3>
                                <p className="site-body mt-4 text-base md:text-base">
                                    {stage.body}
                                </p>
                            </div>
                            <div
                                className={cn(
                                    "offer-ladder-offers",
                                    stage.offers.length > 1 &&
                                        "offer-ladder-offers-many",
                                )}
                            >
                                {stage.offers.map((offer) => (
                                    <article
                                        key={offer.id}
                                        className={cn(
                                            "offer-ladder-offer",
                                            stage.offers.length === 1 &&
                                                "offer-ladder-offer-wide",
                                        )}
                                    >
                                        <div>
                                            <p className="site-meta">
                                                {offer.audience}
                                            </p>
                                            <h4 className="offer-ladder-offer-title">
                                                {offer.title}
                                            </h4>
                                            <p className="site-body mt-4 text-base md:text-base">
                                                {offer.promise}
                                            </p>
                                        </div>
                                        <div className="offer-ladder-offer-detail">
                                            {offer.includes.length > 0 ? (
                                                <ul className="offer-ladder-offer-list">
                                                    {offer.includes.map(
                                                        (item) => (
                                                            <li key={item}>
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
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
