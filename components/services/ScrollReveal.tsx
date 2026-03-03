"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".hero-content > *",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power4.out",
                },
            );

            gsap.utils.toArray<HTMLElement>(".stagger-list").forEach((list) => {
                const items = list.querySelectorAll(".stagger-item");
                if (items.length > 0) {
                    gsap.fromTo(
                        items,
                        { y: 20, opacity: 0 },
                        {
                            scrollTrigger: {
                                trigger: list,
                                start: "top 85%",
                            },
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: "power2.out",
                        },
                    );
                }
            });

            gsap.utils
                .toArray<HTMLElement>(".reveal-section")
                .forEach((section) => {
                    gsap.fromTo(
                        section,
                        { y: 30, opacity: 0 },
                        {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                            },
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            ease: "power3.out",
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
