"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ServicesScrollRevealProps {
    children: React.ReactNode;
    className?: string;
}

export function ServicesScrollReveal({ children, className }: ServicesScrollRevealProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".hero-content > *",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: "power4.out" },
            );

            gsap.fromTo(
                ".start-here-card",
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: { trigger: ".start-here-card", start: "top 85%" },
                    y: 0, opacity: 1, duration: 0.2, ease: "power2.out",
                },
            );

            // Rolling counter for the "30" in the Sprint card
            const counterEl = containerRef.current?.querySelector(".sprint-counter") as HTMLElement | null;
            if (counterEl) {
                const counterObj = { value: 0 };
                gsap.to(counterObj, {
                    value: 30,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: { trigger: ".start-here-card", start: "top 85%" },
                    onUpdate: () => {
                        counterEl.innerText = Math.ceil(counterObj.value).toString();
                    },
                });
            }

            gsap.fromTo(
                ".thesis-item",
                { x: -20, opacity: 0 },
                {
                    scrollTrigger: { trigger: ".thesis-item", start: "top 85%" },
                    x: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: "power2.out",
                },
            );

            gsap.fromTo(
                ".method-step",
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: ".method-step", start: "top 85%" },
                    y: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: "power3.out",
                },
            );

            gsap.fromTo(
                ".service-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: { trigger: ".service-cards-grid", start: "top 85%" },
                    y: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: "power2.out",
                },
            );

            gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
                gsap.fromTo(
                    section,
                    { y: 30, opacity: 0 },
                    {
                        scrollTrigger: { trigger: section, start: "top 85%" },
                        y: 0, opacity: 1, duration: 0.2, ease: "power2.out",
                    },
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <main ref={containerRef} className={className}>
            {children}
        </main>
    );
}
