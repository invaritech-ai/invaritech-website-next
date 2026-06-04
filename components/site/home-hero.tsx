"use client";

import Link from "next/link";
import {
    type PointerEvent as ReactPointerEvent,
    useCallback,
    useRef,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { CTA, HeroContent } from "@/lib/site-content/types";

type HomeHeroProps = {
    content: HeroContent;
    className?: string;
};

function ctaClassName(variant: CTA["variant"]) {
    return variant === "secondary" || variant === "text"
        ? "site-button-secondary"
        : "site-button";
}

/**
 * Primary CTA with a restrained magnetic pull. Pure pointer-driven, no library:
 * the anchor leans a fraction toward the cursor while hovered, springs back on
 * leave. Disabled for touch and reduced-motion.
 */
function MagneticCta({ cta, reduce }: { cta: CTA; reduce: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const raf = useRef(0);

    const onMove = useCallback(
        (event: ReactPointerEvent<HTMLAnchorElement>) => {
            if (reduce || event.pointerType === "touch") return;
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            if (raf.current) return;
            raf.current = requestAnimationFrame(() => {
                raf.current = 0;
                el.style.transform = `translate(${(dx * 0.16).toFixed(
                    2,
                )}px, ${(dy * 0.22).toFixed(2)}px)`;
            });
        },
        [reduce],
    );

    const onLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        if (raf.current) {
            cancelAnimationFrame(raf.current);
            raf.current = 0;
        }
        el.style.transform = "";
    }, []);

    return (
        <Link
            ref={ref}
            href={cta.href}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className={cn(ctaClassName(cta.variant), "hero-magnetic")}
        >
            {cta.label}
        </Link>
    );
}

export function HomeHero({ content, className }: HomeHeroProps) {
    const reduce = useReducedMotion() ?? false;

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container relative z-10">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="site-meta hero-rise">{content.eyebrow}</p>
                    {/* H1 is the LCP element: rendered at full opacity, never animated. */}
                    <h1 className="site-h2 mt-5">{content.title}</h1>
                    <p className="site-lead mx-auto mt-6 max-w-3xl hero-rise hero-rise-1">
                        {content.body}
                    </p>
                    <div className="site-button-row-center mt-10 hero-rise hero-rise-2">
                        <MagneticCta cta={content.primaryCta} reduce={reduce} />
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
                        <p className="site-meta mx-auto mt-8 max-w-3xl hero-rise hero-rise-3">
                            {content.trustLine}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
