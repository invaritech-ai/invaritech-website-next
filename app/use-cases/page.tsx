import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Search,
    FileText,
    Upload,
    Calculator,
    CheckCircle,
    XCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Use Cases - High-ROI Workflows We Implement in Weeks",
    description:
        "High-ROI use cases we implement in weeks. Policy lookup & procedure guidance, Report/estimate drafting, Intake automation, Reconciliations & approvals.",
    keywords: [
        "use cases",
        "policy lookup",
        "report drafting",
        "intake automation",
        "reconciliations",
        "approvals",
        "workflow automation",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/use-cases/",
    },
};

const useCases = [
    {
        icon: Search,
        title: "Policy lookup & procedure guidance",
        before: {
            title: "Before",
            issues: [
                "4–6 minutes per lookup",
                "Inconsistent guidance across teams",
                "Multiple escalations to find correct procedures",
                "Time wasted searching through documents",
                "Inconsistent application of policies",
            ],
        },
        after: {
            title: "After",
            benefits: [
                "Grounded answers with citations in <90 seconds",
                "Access-controlled, role-based responses",
                "Consistent guidance across all teams",
                "Reduced escalations by 80%",
                "Audit trail for all policy lookups",
            ],
        },
        metrics:
            "8,000 lookups/month → 400 hours saved/month (~$36k/month at $90/hr)*",
    },
    {
        icon: FileText,
        title: "Report/estimate drafting",
        before: {
            title: "Before",
            issues: [
                "Manual drafting takes 2-4 hours per report",
                "Heavy rework due to inconsistent formats",
                "Multiple review cycles",
                "Version control issues",
                "Quality inconsistencies",
            ],
        },
        after: {
            title: "After",
            benefits: [
                "Agentic first draft in 15-30 minutes",
                "Human approval and refinement workflow",
                "Versioned logs and change tracking",
                "Consistent formatting and structure",
                "Reduced rework by 60%",
            ],
        },
        metrics:
            "1,200 drafts/month → 240 hours saved/month; −15% rework at $250 each → +$4.5k/month*",
    },
    {
        icon: Upload,
        title: "Intake automation (invoices, claims, tickets, forms, images/video)",
        before: {
            title: "Before",
            issues: [
                "Manual entry of data from documents",
                "Scattered attachments across systems",
                "Inconsistent data extraction",
                "High error rates in data entry",
                "Slow processing times",
            ],
        },
        after: {
            title: "After",
            benefits: [
                "OCR/extraction with 95%+ accuracy",
                "Automated routing based on content",
                "QC with end-to-end traceability",
                "Centralized document management",
                "Real-time processing status",
            ],
        },
        metrics:
            "9,000 docs/month → 255 hours saved/month (~$19k/month at $75/hr)*",
    },
    {
        icon: Calculator,
        title: "Reconciliations & approvals",
        before: {
            title: "Before",
            issues: [
                "Slow handoffs between teams",
                "Spreadsheet sprawl and version control issues",
                "Manual matching and verification",
                "Exception handling delays",
                "Lack of audit trails",
            ],
        },
        after: {
            title: "After",
            benefits: [
                "Deterministic pipelines with automated matching",
                "Exception surfacing and alerting",
                "Complete audit trails for all transactions",
                "Automated approval workflows",
                "Real-time reconciliation status",
            ],
        },
        metrics:
            "Reduced reconciliation time by 70% → $25k/month in avoided costs*",
    },
];

export default function UseCases() {
    return (
        <>
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                High-ROI use cases we implement in weeks
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Pick one workflow to start. Prove value. Expand.
	                            </p>
	                            <Button asChild size="lg">
	                                <Link href="/assessment/">
	                                    Get your Ops Efficiency Score
	                                </Link>
	                            </Button>
	                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="space-y-16">
                            {useCases.map((useCase, index) => (
                                <div
                                    key={index}
                                    className="grid lg:grid-cols-2 gap-8 items-start"
                                >
                                    {/* Use Case Header */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center mb-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                                                <useCase.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h2 className="text-3xl font-bold">
                                                {useCase.title}
                                            </h2>
                                        </div>
                                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
                                            <p className="text-sm font-medium text-primary">
                                                Impact:
                                            </p>
                                            <p className="text-sm text-primary">
                                                {useCase.metrics}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Before */}
                                    <Card className="border-destructive/20 bg-destructive/5">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <XCircle className="w-5 h-5 text-destructive mr-2" />
                                                <h3 className="text-xl font-semibold text-destructive">
                                                    {useCase.before.title}
                                                </h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {useCase.before.issues.map(
                                                    (issue, issueIndex) => (
                                                        <li
                                                            key={issueIndex}
                                                            className="flex items-start text-sm"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                            <span className="text-destructive">
                                                                {issue}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* After */}
                                    <Card className="border-primary/20 bg-primary/5">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <CheckCircle className="w-5 h-5 text-primary mr-2" />
                                                <h3 className="text-xl font-semibold text-primary">
                                                    {useCase.after.title}
                                                </h3>
                                            </div>
                                            <ul className="space-y-2">
                                                {useCase.after.benefits.map(
                                                    (benefit, benefitIndex) => (
                                                        <li
                                                            key={benefitIndex}
                                                            className="flex items-start text-sm"
                                                        >
                                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                            <span className="text-primary">
                                                                {benefit}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to implement your highest-ROI workflow?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Start with one use case and expand based on
                                proven results.
                            </p>
	                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
	                                <Button asChild size="lg">
	                                    <Link href="/assessment/">
	                                        Get your Ops Efficiency Score
	                                    </Link>
	                                </Button>
	                                <Button asChild variant="outline" size="lg">
	                                    <Link href="/services/ai-automation-sprint/">
	                                        See the Sprint
	                                    </Link>
	                                </Button>
	                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            {/* Disclaimer */}
            <section className="py-12 px-6 border-t border-muted bg-muted/50">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground/60 italic">
                        *Modeled Estimate: Projections based on client-provided data, industry benchmarks for task duration, and standard hourly rates. Actual results may vary based on implementation scope and adoption.
                    </p>
                </div>
            </section>
        </>
    );
}
