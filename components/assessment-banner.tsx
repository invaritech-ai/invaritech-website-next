"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const outputs = [
    { label: "Viability Score", desc: "Is this worth building?" },
    { label: "Readiness Score", desc: "Is your stack ready?" },
    { label: "Risk Index", desc: "Complexity + error profile" },
    { label: "ROI Projection", desc: "Hours saved + cost avoided" },
    { label: "Automation Archetype", desc: "Your strategic position" },
];

export default function AssessmentBannerSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ab-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
            });


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 bg-background overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider-full" />

            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-center">

                    <div>
                        <div className="ab-header flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                Free Assessment &mdash; 2 min
                            </p>
                        </div>

                        <h2 className="ab-header font-editorial text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9] mb-6 text-foreground">
                            Find Your<br />
                            <span className="text-primary">ROI Wedge.</span>
                        </h2>

                        <p className="ab-header text-muted-foreground text-lg leading-relaxed max-w-lg mb-10">
                            Before you commit to a build, score your workflow&apos;s automation
                            potential. We calculate Viability, Readiness, and Risk — then
                            give you a projected monthly ROI and your Automation Archetype.
                        </p>

                        <Link
                            href="/tools/assessment/"
                            className="group relative inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-base overflow-hidden transition-all hover:bg-foreground hover:text-background shadow-sm"
                        >
                            <span className="relative z-10 flex items-center">
                                Score My Readiness
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>

                    <div className="ab-card border border-border bg-card p-8">
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-subtle mb-6">
                            What you receive
                        </div>
                        <div className="space-y-0">
                            {outputs.map((o, i) => (
                                <div
                                    key={i}
                                    className="flex items-start justify-between py-4 border-b border-border/60 last:border-0 group"
                                >
                                    <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors">
                                        {o.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-mono text-right max-w-[140px]">
                                        {o.desc}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
                            <span className="w-1 h-1 rounded-full bg-primary/40" />
                            Free &middot; No subscription &middot; Instant results
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
