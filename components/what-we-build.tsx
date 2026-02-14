import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        title: "Engineering discipline",
        description:
            "Secure APIs, queues, batching, rate limits, observability; versioned model routing, A/B tests, and canary rollouts for safe change management.",
        outcomes:
            "Reliable systems, controlled deployments, measurable performance",
    },
];

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-16 flex items-center justify-center">
        <div className="bg-muted/50 rounded-xl p-3 shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
            <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                {children}
            </div>
        </div>
    </div>
);

export default function WhatWeBuild() {
    return (
        <section className="bg-muted py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        What we build
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Intelligent systems that reduce cost-to-serve and make
                        work auditable.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {solutions.map((solution, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-lg transition-all duration-300"
                        >
                            <CardHeader className="pb-3">
                                <CardDecorator>
                                    <solution.icon
                                        className="size-6"
                                        aria-hidden
                                    />
                                </CardDecorator>
                                <h3 className="mt-6 font-semibold text-lg">
                                    {solution.title}
                                </h3>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <p className="text-sm text-muted-foreground mb-4">
                                    {solution.description}
                                </p>
                                <div className="bg-muted/30 rounded-lg p-3">
                                    <p className="text-xs font-medium text-primary mb-1">
                                        Outcomes:
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {solution.outcomes}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/solutions/">
                            Explore a sample: See the minimal live demo
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
