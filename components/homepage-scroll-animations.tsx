"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger is registered in LenisScroll — no re-registration needed.
// Import ensures the plugin is available in this module's scope.
void ScrollTrigger;

export default function HomepageScrollAnimations() {
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // Ledger lines — draw in from left on scroll
        gsap.utils.toArray<HTMLElement>("[data-reveal='ledger-line']").forEach((el) => {
            gsap.fromTo(
                el,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 88%", once: true },
                },
            );
        });

        // Block reveals — single element fades up
        gsap.utils.toArray<HTMLElement>("[data-reveal='block']").forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 28 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 85%", once: true },
                },
            );
        });

        // Rule glints — a soft light sweeps along a section's top rule,
        // scrubbed to scroll so it tracks the reader in both directions.
        gsap.utils.toArray<HTMLElement>("[data-glint]").forEach((glint) => {
            const track = glint.parentElement;
            const section = track?.closest("section");
            if (!track || !section) return;
            gsap.fromTo(
                glint,
                { x: -160 },
                {
                    x: () => track.offsetWidth + 160,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 92%",
                        end: "top 28%",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                },
            );
        });

        // Stagger reveals — children fan in sequentially
        gsap.utils.toArray<HTMLElement>("[data-reveal='stagger']").forEach((container) => {
            const children = container.querySelectorAll<HTMLElement>("[data-reveal-child]");
            if (!children.length) return;
            gsap.fromTo(
                children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.07,
                    ease: "power2.out",
                    scrollTrigger: { trigger: container, start: "top 82%", once: true },
                },
            );
        });
    });

    return null;
}
