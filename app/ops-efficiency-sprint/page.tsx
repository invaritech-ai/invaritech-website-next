import { Metadata } from "next";
import FooterSection from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle,
    Clock,
    DollarSign,
    Shield,
    Zap,
    Target,
    Users,
    TrendingUp,
    AlertTriangle,
    FileText,
    Database,
    Eye,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Ops Efficiency Sprint - From Manual to Measurable in 60 Days",
    description:
        "Cut 30 hours per person per month in 60 days—or save $50,000/month on average. Pick one high-ROI workflow. Crude PoC by week 3 (Milestone Gate). If accepted, production v1 by day 60.",
    keywords: [
        "ops efficiency sprint",
        "automation",
        "ROI",
        "operations",
        "efficiency",
        "60 days",
    ],
};

const lanes = [
    {
        icon: Database,
        title: "Knowledge & Decision Support",
        description:
            "Retrieval over policies/data with citations, SSO/RBAC, audit logs",
        outcomes: "Faster answers, fewer escalations, consistent guidance",
    },
    {
        icon: FileText,
        title: "Agentic Read-Heavy Workflows",
        description:
            "Draft reports/estimates; every write/action approved and logged",
        outcomes: "Minutes saved per task, lower rework, better SLAs",
    },
    {
        icon: Eye,
        title: "Intake & Processing",
        description:
            "OCR, extraction, detection/counting/fault detection; routing and QC",
        outcomes: "Shorter handling time, fewer errors, full traceability",
    },
    {
        icon: DollarSign,
        title: "Finance & Back-Office",
        description:
            "Invoice consolidation, reconciliations, scheduled payments",
        outcomes: "Reduced bottlenecks, predictable closes, fewer exceptions",
    },
];

const timeline = [
    {
        week: "Week 0-1",
        title: "Discovery & baselines",
        description:
            "Identify a single high-ROI workflow, define data access (minimal/synthetic), and set a KPI board: AHT, touches/case, SLA, error rate, cost/process.",
    },
    {
        week: "Week 2-3",
        title: "Crude PoC (Milestone Gate)",
        description:
            "End-to-end flow with logs, approvals, and an initial minutes-saved estimate. Acceptance Criteria: end-to-end demo; access controls and audit logs; projected minutes saved; polish backlog for v1.",
    },
    {
        week: "Weeks 4-6",
        title: "Polish to production-grade v1",
        description:
            "Guardrails, observability, and rollbacks; deploy; begin the measurement window.",
    },
    {
        week: "By Day 60",
        title: "Measurement & ROI review",
        description:
            "Track hours saved and avoided cost on live workload. Share a clear before/after.",
    },
];

const results = [
    {
        title: "Policy lookup",
        metrics: "8,000 lookups/month, −3.0 min per case",
        result: "400 hours saved/month (~33 hours per person for a 12‑person team; ~$36k/month at $90/hr)",
    },
    {
        title: "Report drafting",
        metrics: "1,200 drafts/month, −12 min per case",
        result: "240 hours saved/month; −15% rework at $250 each → +$4.5k/month",
    },
    {
        title: "Intake pipeline",
        metrics: "9,000 docs/month, −1.7 min per doc",
        result: "255 hours saved/month (~$19k/month at $75/hr)",
    },
];

export default function OpsEfficiencySprint() {
    return (
        <>
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Ops Efficiency Sprint: from manual to measurable
                                in 60 days
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Pick one high-ROI workflow. Crude PoC by week 3
                                (Milestone Gate). If accepted, production v1 by
                                day 60.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg">
                                    <Link href="/assessment">
                                        Get your Ops Efficiency Score
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/contact">
                                        Book Architecture & Roadmap
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What you get */}
                <section id="what-you-get" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                What you get
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Production-grade v1 in one lane with full
                                guardrails
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {lanes.map((lane, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                            <lane.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="font-semibold">
                                            {lane.title}
                                        </h3>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {lane.description}
                                        </p>
                                        <div className="bg-muted/30 rounded-lg p-3">
                                            <p className="text-xs font-medium text-primary mb-1">
                                                Outcomes:
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {lane.outcomes}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="border-accent/20 bg-accent/5">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <Shield className="w-5 h-5 text-accent mr-2" />
                                        <h3 className="font-semibold">
                                            Guardrails
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        SSO/RBAC, audit logs, observability,
                                        rollback plan
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/20 bg-primary/5">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <Target className="w-5 h-5 text-primary mr-2" />
                                        <h3 className="font-semibold">
                                            KPI board
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Hours saved, avoided cost, SLA hit rate,
                                        error deltas
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-chart-5/20 bg-chart-5/5">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <TrendingUp className="w-5 h-5 text-chart-5 mr-2" />
                                        <h3 className="font-semibold">
                                            Measurement
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Real-time tracking with alerts, logs,
                                        and clear ownership
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section id="how-it-works" className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                How it works
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {timeline.map((phase, index) => (
                                <Card key={index} className="relative">
                                    <CardContent className="p-8">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-6">
                                                <span className="text-lg font-bold text-primary">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <h3 className="text-xl font-semibold mr-4">
                                                        {phase.title}
                                                    </h3>
                                                    <Badge variant="outline">
                                                        {phase.week}
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {phase.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>

                                    {index < timeline.length - 1 && (
                                        <div className="absolute left-8 top-20 w-0.5 h-8 bg-border"></div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Risk control & payment */}
                <section id="risk-control" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Risk control & payment
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Firm structure to protect both parties
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="text-center p-6">
                                <CardContent className="pt-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <DollarSign className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        40% at kickoff
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Initial payment to begin discovery and
                                        development work.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-6 border-2 border-destructive/20 bg-destructive/5">
                                <CardContent className="pt-6">
                                    <div className="w-16 h-16 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="w-8 h-8 text-destructive" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Week 3 Milestone Gate
                                    </h3>
                                    <p className="text-muted-foreground">
                                        If PoC accepted at week 3/start week 4:
                                        60% due; we ship v1 by day 60.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center p-6">
                                <CardContent className="pt-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        If not accepted
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Engagement pauses. You keep artifacts
                                        and code delivered. No refunds/credits.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Pricing
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                $25k–$60k (tiered by lane and complexity)
                            </p>
                        </div>

                        <Card className="max-w-2xl mx-auto">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold mb-2">
                                        $25k–$60k
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        Tiered by lane and complexity
                                    </p>
                                    <div className="space-y-4 text-left">
                                        <div className="flex items-center">
                                            <CheckCircle className="w-5 h-5 text-primary mr-3" />
                                            <span className="text-sm">
                                                Includes all development and
                                                deployment
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="w-5 h-5 text-primary mr-3" />
                                            <span className="text-sm">
                                                Full documentation and training
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="w-5 h-5 text-primary mr-3" />
                                            <span className="text-sm">
                                                30-day post-launch support
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Results snapshot */}
                <section id="results" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Results snapshot
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Examples from recent implementations
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {results.map((result, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-3">
                                            {result.title}
                                        </h3>
                                        <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Volume & Impact:
                                            </p>
                                            <p className="text-sm font-mono">
                                                {result.metrics}
                                            </p>
                                        </div>
                                        <div className="bg-primary/10 rounded-lg p-4">
                                            <p className="text-sm font-medium text-primary">
                                                Result:
                                            </p>
                                            <p className="text-sm text-primary">
                                                {result.result}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security & governance */}
                <section id="security" className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Security & governance
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                GDPR/DPA alignment, UK/EEA hosting options.
                                SSO/RBAC, logging, and audit trails by default.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <Shield className="w-5 h-5 text-primary mr-2" />
                                        <h3 className="font-semibold">
                                            Identity & Access
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        SSO/RBAC, least privilege, approval
                                        gates
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <FileText className="w-5 h-5 text-accent mr-2" />
                                        <h3 className="font-semibold">
                                            Auditability
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        End-to-end logging, versioned routing,
                                        traceable decisions
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <Database className="w-5 h-5 text-primary mr-2" />
                                        <h3 className="font-semibold">
                                            Data handling
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Data residency options (UK/EEA),
                                        encryption in transit/at rest
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-3">
                                        <Zap className="w-5 h-5 text-chart-5 mr-2" />
                                        <h3 className="font-semibold">
                                            Reliability
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Queues, rate limits, retries, canary
                                        rollouts, circuit breakers
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Recent work */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Recent work
                            </h2>
                        </div>

                        <Card>
                            <CardContent className="p-8">
                                <div className="flex items-start mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-2">
                                            EUDR compliance backend (France)
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Secure intake, validation, and audit
                                            workflows across systems—observable
                                            from day one and ready to scale.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Assumptions & Measurement */}
                <section id="assumptions" className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Assumptions & Measurement
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Transparent methodology behind our efficiency
                                calculations
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Clock className="w-6 h-6 text-primary mr-3" />
                                        <h3 className="font-semibold">
                                            30 hours per person per month
                                        </h3>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-mono text-muted-foreground">
                                            Hours saved = (Monthly cases ×
                                            minutes saved per case ÷ 60) ÷
                                            number of involved FTEs
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                            <span className="text-sm text-muted-foreground">
                                                Baseline via time-motion or logs
                                            </span>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                            <span className="text-sm text-muted-foreground">
                                                Measured post-launch on ≥300
                                                cases or ≥6 weeks of volume
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <DollarSign className="w-6 h-6 text-primary mr-3" />
                                        <h3 className="font-semibold">
                                            $50,000 per month avoided cost
                                        </h3>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-mono text-muted-foreground">
                                            Avoided cost = (Hours saved ×
                                            fully-loaded hourly rate) + (Error
                                            reduction × cost per error) +
                                            (Cycle-time reduction × value/day)
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                            <span className="text-sm text-muted-foreground">
                                                Fully-loaded hourly rate
                                                provided by client
                                            </span>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                            <span className="text-sm text-muted-foreground">
                                                Default $75–$120/hour by role
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Users className="w-6 h-6 text-chart-5 mr-3" />
                                        <h3 className="font-semibold">
                                            Smaller teams equivalence
                                        </h3>
                                    </div>
                                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-mono text-muted-foreground">
                                            Save 300 hours/month per 10 FTEs, or
                                            eliminate 1 FTE worth of manual
                                            handling per 10 FTEs
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-chart-5 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                            <span className="text-sm text-muted-foreground">
                                                Reallocated, not replaced
                                            </span>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-1.5 h-1.5 bg-chart-5 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                            <span className="text-sm text-muted-foreground">
                                                Assumes data access, workflow
                                                owner, and timely approvals (≤1
                                                business day)
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Demo Plan */}
                <section id="demo-plan" className="py-16 md:py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                6-week Demo Plan
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                See our approach in action with a focused
                                demonstration
                            </p>
                        </div>

                        <Card className="max-w-2xl mx-auto">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold mb-4">
                                        Ready to see the Sprint in action?
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        Book a 20-minute Architecture & Roadmap
                                        discussion to explore how the Ops
                                        Efficiency Sprint can work for your
                                        specific use case.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button asChild size="lg">
                                            <Link href="/contact">
                                                Book Architecture & Roadmap
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                        >
                                            <Link href="/assessment">
                                                Get your Ops Efficiency Score
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <FooterSection />
        </>
    );
}
