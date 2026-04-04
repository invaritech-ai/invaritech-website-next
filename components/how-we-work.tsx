"use client";

import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const sprintPhases = [
    {
        week: "Week 1",
        title: "System and Bottleneck Audit",
        description:
            "Map one high-cost workflow and lock baseline metrics, risk boundaries, and owner accountability.",
        output: "Automation spec + risk boundaries",
    },
    {
        week: "Week 2",
        title: "Drop-In AI Build",
        description:
            "Implement the AI logic layer with deterministic guardrails and minimally invasive integration pathways.",
        output: "Working automation in staging",
    },
    {
        week: "Week 3",
        title: "Production Hardening",
        description:
            "Add access controls, logging, monitoring, rollback paths, and failure-mode coverage.",
        output: "Production-ready automation",
    },
    {
        week: "Week 4",
        title: "Deployment and Handover",
        description:
            "Deploy live, validate KPI movement, and hand over operational guidance to internal teams.",
        output: "Automation running + measurable result",
    },
];

export default function HowWeWorkSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hww-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 28,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });

            gsap.from(".hww-phase", {
                scrollTrigger: {
                    trigger: ".hww-timeline",
                    start: "top 85%",
                    once: true,
                },
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
            });

            gsap.from(".hww-cta", {
                scrollTrigger: {
                    trigger: ".hww-cta",
                    start: "top 90%",
                    once: true,
                },
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-card py-24 md:py-32">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider-full" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-3xl">
                        <div className="hww-header flex items-center gap-3 mb-6">
                            <span className="text-[11px] font-mono text-primary/50">04</span>
                            <div className="h-[1px] w-6 bg-primary/30" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                Phase 3: Delivery System
                            </p>
                        </div>
                        <h2 className="hww-header font-editorial text-5xl font-semibold leading-[0.9] md:text-7xl tracking-tight text-foreground">
                            Four Weeks.<br />
                            <span className="text-primary">Measured Impact.</span>
                        </h2>
                        <p className="hww-header mt-8 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                            Structured enough for governance and fast enough for momentum. A deterministic pipeline from bottleneck audit to production, with baseline and handover built in.
                        </p>
                    </div>

                    <div className="p-6 border border-border bg-background">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">Fixed Engagement Fee</p>
                        <div className="text-2xl font-semibold text-foreground">$10,000-$15,000 USD</div>
                        <div className="text-sm text-muted-foreground mt-1">$78,000-$117,000 HKD</div>
                    </div>
                </div>

                <div className="hww-timeline relative grid gap-8 md:grid-cols-4">
                    <div className="absolute top-[18px] left-0 w-full h-[1px] bg-border hidden md:block" />

                    {sprintPhases.map((phase, i) => (
                        <div key={phase.week} className="hww-phase relative group">
                            <div className="w-[9px] h-[9px] bg-background border-2 border-primary relative z-10 mb-8 mx-auto md:mx-0 transition-transform group-hover:scale-150 duration-300">
                            </div>

                            <div className="pt-6 md:pt-4 border-l md:border-l-0 border-border pl-8 md:pl-0 ml-[3px] md:ml-0 relative">
                                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/70 mb-3">
                                    {phase.week}
                                </p>
                                <h3 className="font-editorial text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {phase.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {phase.description}
                                </p>

                                <div className="p-3 bg-background border border-border text-xs text-foreground font-mono">
                                    <span className="text-primary mr-2">&rarr;</span> {phase.output}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hww-cta mt-24 text-center">
                    <a
                        href={BOOK_MEETING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <MagneticButton
                            strength={0.3}
                            className="bg-primary text-white px-14 py-7 text-xl font-semibold hover:bg-foreground transition-all duration-300 shadow-sm rounded-none"
                            textClassName="group-hover:text-white tracking-wide"
                        >
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                </div>
            </div>
        </section>
    );
}
