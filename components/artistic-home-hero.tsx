"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Terminal } from "lucide-react";
import {
    BOOK_MEETING_CTA,
    BOOK_MEETING_URL,
    BRAND_EYEBROW,
} from "@/lib/marketing";

export default function ArtisticHomeHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-eyebrow", {
                opacity: 0,
                y: 12,
                duration: 0.6,
                ease: "power2.out",
            });

            gsap.from(".hero-line", {
                opacity: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.08,
                ease: "power2.out",
            });

            gsap.from(".hero-sub", {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.3,
                ease: "power2.out",
            });

            gsap.from(".hero-cta", {
                opacity: 0,
                y: 16,
                duration: 0.5,
                delay: 0.5,
                ease: "power2.out",
            });

            gsap.from(".hero-chip", {
                opacity: 0,
                y: 10,
                duration: 0.4,
                stagger: 0.05,
                delay: 0.6,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-background overflow-hidden flex flex-col items-center justify-center -mt-20 pt-20"
        >
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.04] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
                <div className="hero-eyebrow mb-10 mt-32 flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-primary/40" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                        {BRAND_EYEBROW}
                    </span>
                    <div className="h-[1px] w-8 bg-primary/40" />
                </div>

                <h1 className="max-w-6xl mx-auto flex flex-col gap-1 font-editorial select-none">
                    <span className="hero-line text-6xl md:text-[8.5rem] lg:text-[10rem] font-semibold leading-[0.88] tracking-tight text-foreground block">
                        BUILD
                    </span>
                    <span className="hero-line text-6xl md:text-[8.5rem] lg:text-[10rem] font-semibold leading-[0.88] tracking-tight text-primary block">
                        GOVERNED AI
                    </span>
                    <span className="hero-line text-3xl md:text-5xl lg:text-6xl leading-[1] tracking-tight text-muted-foreground font-light block mt-3">
                        ON YOUR INFRASTRUCTURE
                    </span>
                </h1>

                <div className="hero-sub mt-12 max-w-2xl">
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        One production-grade AI automation, live in 30 days — layered on your existing stack with governance built in: permissions, audit logs, and rollback paths.
                    </p>
                    <span className="text-primary/70 block mt-3 font-mono text-xs uppercase tracking-[0.2em]">
                        No migration. No vendor lock-in. Before/after KPI validation.
                    </span>
                </div>

                <div className="hero-cta mt-12 flex flex-col sm:flex-row items-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="h-13 px-8 rounded-none bg-primary text-white font-semibold text-base hover:bg-foreground transition-all duration-300 shadow-sm"
                    >
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            {BOOK_MEETING_CTA} <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-13 px-8 rounded-none border-border bg-transparent text-foreground hover:bg-foreground hover:text-background backdrop-blur-sm transition-all duration-300 group"
                    >
                        <Link href="/services/ai-automation-sprint/">
                            <Terminal className="mr-2 h-4 w-4 text-primary group-hover:text-background transition-colors" />
                            Explore the Sprint
                        </Link>
                    </Button>
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-3">
                    {[
                        "Fixed scope: $10,000-$15,000 USD ($78,000-$117,000 HKD)",
                        "Governed by default: audit logs + approvals",
                        "Start in 1-2 weeks if qualified",
                        "Before/after KPI validation",
                    ].map((text, i) => (
                        <div key={i} className="hero-chip flex items-center gap-2 px-4 py-2 bg-secondary/60 border border-border/50 text-[11px] font-mono text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}
