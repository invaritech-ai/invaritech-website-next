"use client";

import { Button } from "@/components/ui/button";
import { Brain, FileText, Eye, DollarSign, Code } from "lucide-react";
import { ReactNode, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const solutions = [
    {
        icon: Brain,
        title: "Knowledge & Decision Support",
        description:
            "Retrieval over policies/data with citations, SSO/RBAC, audit logs—so teams get the right procedure in seconds, not minutes.",
        outcomes: "Faster answers, fewer escalations, consistent guidance",
    },
    {
        icon: FileText,
        title: "Agentic Read-Heavy Workflows",
        description:
            "Draft defect summaries, client-ready reports, work orders, and estimates. Every write/action is approved and fully traceable.",
        outcomes: "Minutes saved per task, lower rework, better SLAs",
    },
    {
        icon: Eye,
        title: "Intake & Processing",
        description:
            "OCR, entity extraction, object detection/counting/fault detection. Automated routing, validation, and QC with audit trails.",
        outcomes: "Shorter handling time, fewer errors, full traceability",
    },
    {
        icon: DollarSign,
        title: "Finance & Back-Office Pipelines",
        description:
            "Invoice consolidation, reconciliations, scheduled payments and approvals—backed by idempotent webhooks, versioning, and rollbacks.",
        outcomes: "Reduced bottlenecks, predictable closes, fewer exceptions",
    },
    {
        icon: Code,
        title: "Engineering Discipline",
        description:
            "Secure APIs, queues, batching, rate limits, observability; versioned model routing, A/B tests, and canary rollouts for safe change management.",
        outcomes:
            "Reliable systems, controlled deployments, measurable performance",
    },
];

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="size-9 flex items-center justify-center border border-border bg-secondary/50 group-hover:border-primary/30 group-hover:bg-primary/[0.06] transition-colors">
        <div className="text-primary">
            {children}
        </div>
    </div>
);

export default function WhatWeBuild() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".wwb-header", {
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

            gsap.from(".wwb-card", {
                scrollTrigger: {
                    trigger: ".wwb-grid",
                    start: "top 85%",
                    once: true,
                },
                opacity: 0,
                y: 20,
                duration: 0.45,
                stagger: 0.06,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-32 bg-card">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider-full" />

            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-12">
                    <div className="wwb-header flex items-center gap-3 mb-6">
                        <span className="text-[11px] font-mono text-primary/50">02</span>
                        <div className="h-[1px] w-6 bg-primary/30" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            What We Build
                        </p>
                    </div>
                    <h2 className="wwb-header font-editorial text-5xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-7xl mb-4">
                        Intelligent systems<br />that reduce cost-to-serve.
                    </h2>
                    <p className="wwb-header text-lg text-muted-foreground max-w-2xl">
                        Every engagement delivers one production-grade automation—auditable, governed, and measurably better than the baseline.
                    </p>
                </div>

                <div className="wwb-grid grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border">
                    {solutions.map((solution) => (
                        <div
                            key={solution.title}
                            className="wwb-card group bg-background p-6 hover:bg-card transition-colors"
                        >
                            <CardDecorator>
                                <solution.icon className="size-4" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-5 font-semibold text-foreground text-base">
                                {solution.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed mb-4">
                                {solution.description}
                            </p>
                            <div className="border-l-2 border-primary/25 bg-primary/[0.03] pl-3 py-1.5">
                                <p className="text-[10px] font-mono text-primary/70 mb-0.5">Outcomes</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {solution.outcomes}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Button asChild variant="outline" size="lg" className="rounded-none border-border bg-transparent text-foreground hover:bg-foreground hover:text-background transition-colors">
                        <Link href="/work/">
                            See proof of delivery &rarr;
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
