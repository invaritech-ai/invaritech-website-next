"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        if (titleRef.current) {
            // Split text (manual splitting for simplicity without extra plugins for now)
            const text = titleRef.current.innerText;
            titleRef.current.innerHTML = text
                .split("")
                .map((char) => `<span class="inline-block opacity-0 translate-y-20">${char === " " ? "&nbsp;" : char}</span>`)
                .join("");
            
            tl.to(titleRef.current.children, {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1.5,
            });
        }

        if (subtitleRef.current) {
            tl.fromTo(
                subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=1"
            );
        }

        if (ctaRef.current) {
            tl.fromTo(
                ctaRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
                "-=0.8"
            );
        }

        // Parallax effect on scroll
        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            y: 100,
            opacity: 0.5,
        });

    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden"
        >
            <div className="max-w-[90vw] z-10">
                <h1
                    ref={titleRef}
                    className="text-[10vw] font-bold tracking-tighter mb-8 leading-[0.8] mix-blend-difference flex flex-wrap justify-center gap-x-[0.2em] md:gap-x-0"
                >
                    VISIONARY AUTOMATION
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
                >
                    We craft digital intelligence. Elevating enterprise operations into a streamlined art form.
                </p>
                
	                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
	                    <Link
	                        href="/work/"
	                        className="group relative px-8 py-4 bg-foreground text-background font-bold text-lg rounded-none hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
	                    >
	                        VIEW OUR WORK
	                        <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
	                    </Link>
	                    <Link
	                        href="/ai-automation-sprint/"
	                        className="px-8 py-4 border border-foreground/20 text-foreground font-bold text-lg hover:border-primary hover:text-primary transition-colors duration-300 rounded-none backdrop-blur-sm"
	                    >
	                        VIEW THE AI AUTOMATION SPRINT
	                    </Link>
	                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10 animate-pulse" />
        </section>
    );
}
