import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MiniCase } from "@/components/mini-case";
import { TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Results & Proof - Measurable Outcomes from Our Implementations",
    description:
        "Results you can measure. Hours saved, avoided cost, SLA lift, error reduction—made visible. See real case studies and quantified outcomes from our Ops Efficiency Sprint implementations.",
    keywords: [
        "results",
        "case studies",
        "ROI",
        "efficiency gains",
        "hours saved",
        "cost reduction",
        "SLA improvement",
        "error reduction",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/results/",
    },
};

const exampleCase = {
    context: {
        industry: "Financial Services",
        teamSize: "12 FTEs",
        targetWorkflow: "Policy lookup & procedure guidance",
    },
    baseline: {
        volume: "8,000 lookups/month",
        aht: "4.5 min per case",
        errors: "15% escalation rate",
        sla: "85% on-time",
    },
    intervention: {
        lane: "Knowledge & Decision Support",
        features: [
            "Grounded answers with citations",
            "SSO/RBAC integration",
            "Real-time policy updates",
            "Audit trail logging",
            "Role-based access controls",
        ],
    },
    outcome: {
        hoursSaved: "400 hours/month (~33 hours/person)",
        costAvoided: "$36k/month at $90/hr",
        slaChange: "95% on-time (+10%)",
        errorDeltas: "5% escalation rate (-67%)",
    },
    proof: {
        description:
            "Measured over 3 months with 8,000+ policy lookups. Baseline established via time-motion study, post-launch tracking via system logs.",
        imageUrl: "/results/policy-lookup-graph.png",
    },
};

const additionalResults = [
    {
        title: "Report Drafting (Legal Services)",
        metrics: "1,200 drafts/month, −12 min per case → 240 hours saved/month",
        costImpact: "−15% rework at $250 each → +$4.5k/month",
        teamSize: "8-person legal team",
    },
    {
        title: "Intake Pipeline (Insurance)",
        metrics: "9,000 docs/month, −1.7 min per doc → 255 hours saved/month",
        costImpact: "~$19k/month at $75/hr",
        teamSize: "15-person processing team",
    },
    {
        title: "Invoice Processing (Manufacturing)",
        metrics:
            "5,000 invoices/month, −8 min per invoice → 667 hours saved/month",
        costImpact: "~$50k/month at $75/hr",
        teamSize: "20-person finance team",
    },
];

export default function Results() {
    return (
        <>
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Results you can measure
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Hours saved, avoided cost, SLA lift, error
                                reduction—made visible.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg">
                                    <Link href="/ops-efficiency-sprint">
                                        Start with the Sprint
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/results#eudr">
                                        Read the EUDR mini-case
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Case Study */}
                <section id="featured-case" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Featured Case Study
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Policy lookup optimization in financial services
                            </p>
                        </div>

                        <MiniCase {...exampleCase} />
                    </div>
                </section>

                {/* Additional Results */}
                <section id="snapshots" className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Results Snapshots
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Additional quantified outcomes from recent
                                implementations
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {additionalResults.map((result, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            {result.title}
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="bg-muted/30 rounded-lg p-3">
                                                <p className="text-sm font-medium text-primary mb-1">
                                                    Volume & Impact:
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {result.metrics}
                                                </p>
                                            </div>

                                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                                                <p className="text-sm font-medium text-primary mb-1">
                                                    Cost Impact:
                                                </p>
                                                <p className="text-sm text-primary">
                                                    {result.costImpact}
                                                </p>
                                            </div>

                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Users className="w-4 h-4 mr-2" />
                                                {result.teamSize}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EUDR Case Study */}
                <section id="eudr" className="py-16 md:py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                EUDR Compliance Backend
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Recent implementation in France
                            </p>
                        </div>

                        <Card>
                            <CardContent className="p-8">
                                <div className="flex items-start mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                        <TrendingUp className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-2">
                                            EUDR (France) Compliance Backend
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            Built compliance-grade backend APIs
                                            and workflows for data intake,
                                            validation, auditability, and
                                            integrations—observable, secure, and
                                            ready to scale.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">
                                            Key Deliverables:
                                        </h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                                Secure data intake and
                                                validation workflows
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                                Integration with existing
                                                business systems
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                                Real-time observability and
                                                monitoring
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                                Scalable architecture for future
                                                growth
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">
                                            Technical Features:
                                        </h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                                                SSO/RBAC integration
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                                                End-to-end audit trails
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                                                Data residency compliance
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                                                Automated monitoring and
                                                alerting
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-muted/30 rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Outcome:</strong>{" "}
                                        Compliance-grade system deployed in 6
                                        weeks with full observability from day
                                        one. Handles 10,000+ transactions daily
                                        with 99.9% uptime and complete audit
                                        trails for regulatory compliance.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to achieve similar results?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Start with the Ops Efficiency Sprint and see
                                measurable outcomes in 60 days.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg">
                                    <Link href="/ops-efficiency-sprint">
                                        Start with the Sprint
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
        </>
    );
}
