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
