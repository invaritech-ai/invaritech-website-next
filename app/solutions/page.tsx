import { Metadata } from "next";
import FooterSection from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Brain,
    FileText,
    Eye,
    DollarSign,
    Code,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Solutions - Intelligent Systems for Modern Operations",
    description:
        "Intelligent systems that reduce cost-to-serve and make work auditable. Knowledge & Decision Support, Agentic Workflows, Intake & Processing, Finance & Back-Office, and Engineering discipline.",
    keywords: [
        "operations automation",
        "knowledge management",
        "agentic workflows",
        "document processing",
        "finance automation",
        "engineering discipline",
    ],
};

const solutions = [
    {
        icon: Brain,
        title: "Knowledge & Decision Support",
        description:
            "Retrieval over policies/data with citations, SSO/RBAC, audit logs—so teams get the right procedure in seconds, not minutes.",
        outcomes: "Faster answers, fewer escalations, consistent guidance",
        features: [
            "Policy and procedure retrieval",
            "Citation-backed responses",
            "SSO/RBAC integration",
            "Complete audit trails",
            "Real-time knowledge updates",
        ],
        anchor: "knowledge",
    },
    {
        icon: FileText,
        title: "Agentic Workflows (with approvals)",
        description:
            "Draft reports/estimates; every write/action approved and logged. Minutes saved per task, lower rework, better SLAs.",
        outcomes: "Minutes saved per task, lower rework, better SLAs",
        features: [
            "Automated report generation",
            "Human approval workflows",
            "Version control and tracking",
            "Quality assurance gates",
            "Performance analytics",
        ],
        anchor: "agentic",
    },
    {
        icon: Eye,
        title: "Intake & Processing (Docs/Data/Vision)",
        description:
            "OCR, extraction, detection/counting/fault detection; routing and QC with audit trails. Shorter handling time, fewer errors, full traceability.",
        outcomes: "Shorter handling time, fewer errors, full traceability",
        features: [
            "OCR and document processing",
            "Object detection and counting",
            "Automated routing and validation",
            "Quality control workflows",
            "End-to-end traceability",
        ],
        anchor: "intake",
    },
    {
        icon: DollarSign,
        title: "Finance & Back-Office Pipelines",
        description:
            "Invoice consolidation, reconciliations, scheduled payments and approvals—backed by idempotent webhooks, versioning, and rollbacks.",
        outcomes: "Reduced bottlenecks, predictable closes, fewer exceptions",
        features: [
            "Invoice processing automation",
            "Automated reconciliations",
            "Scheduled payment workflows",
            "Exception handling",
            "Financial reporting",
        ],
        anchor: "finance",
    },
    {
        icon: Code,
        title: "Engineering discipline",
        description:
            "Secure APIs, queues, batching, rate limits, observability; versioned routing, A/B tests, and canary rollouts for safe change management.",
        outcomes:
            "Reliable systems, controlled deployments, measurable performance",
        features: [
            "Secure API development",
            "Queue management and batching",
            "Rate limiting and throttling",
            "Comprehensive observability",
            "A/B testing and canary deployments",
        ],
        anchor: "engineering",
    },
];

export default function Solutions() {
    return (
        <>
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Solutions for modern operations
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Intelligent systems that reduce cost-to-serve
                                and make work auditable.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/ops-efficiency-sprint">
                                    See the Ops Efficiency Sprint
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Solutions Grid */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {solutions.map((solution, index) => (
                                <Card
                                    key={index}
                                    id={solution.anchor}
                                    className="hover:shadow-lg transition-all duration-300"
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                                                <solution.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h2 className="text-2xl font-semibold">
                                                {solution.title}
                                            </h2>
                                        </div>
                                        <p className="text-muted-foreground text-lg">
                                            {solution.description}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <h3 className="font-semibold mb-2">
                                                Outcomes:
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {solution.outcomes}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-3">
                                                Key Features:
                                            </h3>
                                            <ul className="space-y-2">
                                                {solution.features.map(
                                                    (feature, featureIndex) => (
                                                        <li
                                                            key={featureIndex}
                                                            className="flex items-center text-sm"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Link
                                                    href={`/solutions#${solution.anchor}`}
                                                >
                                                    Learn more
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to implement intelligent operations?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Choose your highest-ROI workflow and see
                                measurable results in 60 days.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg">
                                    <Link href="/ops-efficiency-sprint">
                                        See the Ops Efficiency Sprint
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/assessment">
                                        Get your Ops Efficiency Score
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSection />
        </>
    );
}
