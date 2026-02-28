import { Button } from "@/components/ui/button";
import { Brain, FileText, Eye, DollarSign, Code } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

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
    <div className="size-10 flex items-center justify-center rounded-none bg-primary/10 border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/15 transition-colors">
        <div className="text-primary">
            {children}
        </div>
    </div>
);

export default function WhatWeBuild() {
    return (
        <section className="relative overflow-hidden py-16 md:py-32 bg-[#030305] border-t border-white/5">
            <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />

            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-8 bg-primary/60"></div>
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            What We Build
                        </p>
                    </div>
                    <h2 className="text-balance text-5xl font-bold leading-[0.9] tracking-tight text-white md:text-7xl mb-4">
                        Intelligent systems<br/>that reduce cost-to-serve.
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl">
                        Every engagement delivers one production-grade automation—auditable, governed, and measurably better than the baseline.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mb-px">
                    {solutions.map((solution) => (
                        <div
                            key={solution.title}
                            className="group bg-[#030305] p-6 hover:bg-white/[0.02] transition-colors border border-white/5 hover:border-primary/20"
                        >
                            <CardDecorator>
                                <solution.icon className="size-5" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-5 font-semibold text-white text-base">
                                {solution.title}
                            </h3>
                            <p className="mt-2 text-sm text-white/50 leading-relaxed mb-4">
                                {solution.description}
                            </p>
                            <div className="border-l-2 border-primary/30 bg-primary/5 pl-3 py-1.5">
                                <p className="text-xs font-mono text-primary/80 mb-0.5">Outcomes</p>
                                <p className="text-xs text-white/40 leading-relaxed">
                                    {solution.outcomes}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Button asChild variant="outline" size="lg" className="rounded-none border-white/10 bg-transparent text-white hover:bg-white hover:text-black transition-colors">
                        <Link href="/work/">
                            See proof of delivery →
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
