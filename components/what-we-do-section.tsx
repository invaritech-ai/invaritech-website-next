"use client";

import { Shield, Activity, Gauge, Ban, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const outcomes = [
    {
        icon: Activity,
        title: "One Real Bottleneck",
        description:
            "We scope one bottleneck, name the owner, and agree what measurably better looks like before we start.",
    },
    {
        icon: Gauge,
        title: "One Production Automation",
        description:
            "A governed AI layer runs over your existing systems—operators can approve, trace, and roll back from day one.",
    },
    {
        icon: Shield,
        title: "One Measurable Delta",
        description:
            "Before and after is measured against the agreed baseline—you see the delta, not just the code.",
    },
];

const noList = [
    {
        icon: Server,
        text: "No ERP or CRM replacement",
    },
    {
        icon: Lock,
        text: "No vendor lock-in licensing",
    },
    {
        icon: Ban,
        text: "No broad transformation programme",
    },
];

export default function WhatWeDoSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".wwd-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });

            gsap.from(".wwd-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    once: true,
                },
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
            });

            gsap.from(".wwd-nope", {
                scrollTrigger: {
                    trigger: ".wwd-nope",
                    start: "top 85%",
                    once: true,
                },
                opacity: 0,
                x: -20,
                duration: 0.5,
                ease: "power2.out",
            });

            gsap.from(".wwd-cta", {
                scrollTrigger: {
                    trigger: ".wwd-cta",
                    start: "top 90%",
                    once: true,
                },
                opacity: 0,
                y: 16,
                duration: 0.5,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="what-we-do" className="relative pb-24 pt-32 md:pb-32 md:pt-40 overflow-hidden bg-background">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="lg:sticky lg:top-32">
                        <div className="wwd-header flex items-center gap-3 mb-6">
                            <span className="text-[11px] font-mono text-primary/50">01</span>
                            <div className="h-[1px] w-6 bg-primary/30" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                Phase 1: The Wedge
                            </p>
                        </div>

                        <h2 className="wwd-header font-editorial text-5xl font-semibold leading-[0.9] md:text-7xl tracking-tight text-foreground">
                            30-Day<br />
                            <span className="text-muted-foreground">Drop-In Sprint</span>
                        </h2>

                        <p className="wwd-header mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                            Not a broad transformation program. We isolate <span className="text-foreground font-medium">one bottleneck workflow</span>, build a governed AI layer over your existing tools, and validate impact against an agreed baseline.
                        </p>

                        <div className="wwd-nope mt-12 border border-border bg-card p-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A3420] mb-4">
                                Explicitly Out of Scope
                            </p>
                            <div className="space-y-3">
                                {noList.map((item) => (
                                    <div key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="w-1 h-1 bg-[#9A3420]/60" />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {outcomes.map((item) => (
                            <div
                                key={item.title}
                                className="wwd-card group relative p-8 border border-border bg-card hover:bg-secondary/50 transition-all duration-400 hover:border-primary/20"
                            >
                                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-70 transition-opacity text-primary">
                                    <item.icon className="w-5 h-5" />
                                </div>

                                <h3 className="font-editorial text-2xl font-semibold text-foreground mb-4 group-hover:translate-x-1 transition-transform duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed max-w-md text-[15px]">
                                    {item.description}
                                </p>
                            </div>
                        ))}

                        <div className="wwd-cta mt-8 p-8 border border-primary/15 bg-primary/[0.03] relative overflow-hidden group hover:border-primary/30 transition-colors">
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="font-editorial text-xl font-semibold text-foreground mb-2">Ready to verify fit?</h3>
                                    <p className="text-sm text-muted-foreground">Review scope, guardrails, and prerequisites before you book.</p>
                                </div>
                                <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold">
                                    <Link href="/services/ai-automation-sprint/">
                                        View Sprint Details
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
