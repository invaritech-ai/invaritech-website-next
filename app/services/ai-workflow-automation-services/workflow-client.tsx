import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Check,
    ArrowRight,
    X,
    ShieldCheck,
    Database,
    FileText,
    GitBranch,
    Lock,
    Calculator,
    LineChart,
} from "lucide-react";
import Link from "next/link";
import { BOOK_MEETING_URL } from "@/lib/marketing";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/services/ScrollReveal";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { workflowFaqs } from "@/lib/service-faqs";
import { FounderTrustSection } from "@/components/services/FounderTrustSection";
import { AssessmentTeaser } from "@/components/services/AssessmentTeaser";


export default function WorkflowClient() {
    return (
        <ScrollReveal className="min-h-screen bg-background relative overflow-hidden">
            <ServiceBackground theme="blue" />

            {/* Nav Back */}
            <div className="absolute top-24 left-6 z-20 md:top-32 md:left-12 hero-content">
                <Link
                    href="/services/"
                    className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-mono"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
                    Back to Services
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative z-10 hero-content">
                <div className="max-w-5xl mx-auto">
                    <Badge
                        variant="outline"
                        className="mb-6 border-primary/50 text-priority px-4 py-1 text-xs uppercase tracking-widest text-primary"
                    >
                        Service Offering
                    </Badge>

                    <h1 className="text-[8vw] md:text-[5vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-difference text-white">
                        <TextEffect
                            per="word"
                            preset="slide"
                            className="inline-block"
                        >
                            WORKFLOW AUTOMATION
                        </TextEffect>
                        <br />
                        <span className="text-white/50">
                            CONSULTING SERVICES
                        </span>
                    </h1>
                    <div className="text-primary/80 text-sm md:text-base font-mono uppercase tracking-[0.2em] mb-12">
                        (Deterministic & AI-Enabled)
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                        <div className="md:w-2/3 border-l-2 border-primary/50 pl-8">
                            <p className="text-xl md:text-2xl text-white font-medium mb-6">
                                We turn operational friction into operational
                                liquidity for finance, manufacturing, and
                                operations teams across APAC.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                We map your highest-friction workflows, remove
                                the handoffs and reconciliation drag, and deploy
                                custom infrastructure — deterministic automation,
                                AI, or both — to get more output without adding
                                headcount.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                We operate at the process layer, not the chatbot
                                layer. Deterministic fallbacks and
                                human-in-the-loop approvals that integrate
                                directly with Xero, NetSuite, SAP, or your
                                existing ERP. Serving teams in Singapore, Hong
                                Kong, Malaysia, and the Philippines.
                            </p>
                            <p className="text-lg text-white/80 font-mono">
                                We are practitioners, not advisors. We build the
                                pipeline.
                            </p>
                        </div>
                        <div className="md:w-1/3 space-y-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">
                                    Best For
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    CFOs, Controllers, and Ops leads in finance,
                                    manufacturing, and logistics dealing with
                                    100+ recurring monthly exceptions,
                                    spreadsheet drift, or a 10-day close cycle.
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">
                                    Typical Timeline
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Workflow Assessment → 30-day Sprint → 90-day
                                    stabilization.
                                </p>
                            </div>
                            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">
                                    Engagement
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Fixed-scope. Starts at <span className="text-white font-semibold">USD $10,000</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                                Book a Workflow Assessment
                            </MagneticButton>
                        </a>
                    </div>

                    <div className="mt-12 p-6 border border-white/10 rounded-xl bg-black/40 max-w-2xl">
                        <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Not A Fit If</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {[
                                "You want a Zapier-style no-code integration — we build production infrastructure, not glue",
                                "Your workflow has no clear owner or defined outcome metric",
                                "You need RPA bots to click through legacy UIs — we work at the data layer, not the screen layer",
                                "You expect full AP automation in a single sprint — we scope one workflow at a time",
                            ].map((item) => (
                                <li key={item} className="flex gap-2">
                                    <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* What It Is NOT */}
            <section className="reveal-section py-6 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row gap-4 items-start">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/30 shrink-0 pt-1">
                            Not this
                        </span>
                        <div className="flex flex-wrap gap-3">
                            <span className="text-xs text-white/50 border border-white/10 px-3 py-1.5 font-mono">
                                Not RPA point-and-click — we map entire workflow
                                contracts, not individual clicks
                            </span>
                            <span className="text-xs text-white/50 border border-white/10 px-3 py-1.5 font-mono">
                                Not a Zapier stack — no-code breaks at
                                auditability and governance boundaries
                            </span>
                            <span className="text-xs text-white/50 border border-white/10 px-3 py-1.5 font-mono">
                                Not a chatbot — we automate processes
                                end-to-end, not individual conversations
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries We Serve */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Who We Work With
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        Operations and finance teams in manufacturing,
                        logistics, and professional services across Singapore,
                        Hong Kong, Malaysia, and the Philippines.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 stagger-list">
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-4">
                                Finance & Accounting
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Month-end close acceleration, AP intake
                                automation, bank reconciliation, and exception
                                resolution for controllers managing multi-entity
                                books.
                            </p>
                            <p className="text-xs font-mono text-primary/60 uppercase tracking-widest">
                                CFOs · Controllers · Finance Ops
                            </p>
                        </div>
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-4">
                                Manufacturing & Supply Chain
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Production order tracking, quality inspection
                                workflows, supplier document intake, and
                                compliance reporting — replacing manual
                                spreadsheet handoffs with audited pipelines.
                            </p>
                            <p className="text-xs font-mono text-primary/60 uppercase tracking-widest">
                                Ops Managers · Plant Controllers · Supply Chain Leads
                            </p>
                        </div>
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                            <h3 className="text-xl font-bold mb-4">
                                Logistics & Professional Services
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Freight documentation processing, customs
                                compliance workflows, timesheet-to-invoice
                                pipelines, and client reporting automation for
                                firms scaling without adding ops headcount.
                            </p>
                            <p className="text-xs font-mono text-primary/60 uppercase tracking-widest">
                                COOs · Managing Partners · Ops Directors
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Finance Pipelines */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Financial Pipelines We Build
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        We don&apos;t sell generic bots. We build specialized
                        engines for the most expensive bottlenecks in your
                        finance department.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 stagger-list">
                        {/* AP */}
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Accounts Payable & Invoice Intake
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                Eliminate manual data entry and 3-way matching
                                errors. We build extraction pipelines that parse
                                invoices on arrival and route them for immediate
                                approval.
                            </p>
                            <div className="pt-4 border-t border-white/10 mt-auto">
                                <Link
                                    href="/blog/ai-invoice-data-extraction/"
                                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary hover:text-white transition-colors"
                                >
                                    <ArrowRight className="w-3 h-3" /> Read the
                                    Architecture
                                </Link>
                            </div>
                        </div>

                        {/* Month-End Close */}
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col">
                            <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Month-End Close Reconciliation
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                Stop burning 10 days on spreadsheet drift. We
                                deploy deterministic matching engines to clear
                                90% of your bank reconciliation automatically.
                            </p>
                            <div className="pt-4 border-t border-white/10 mt-auto">
                                <Link
                                    href="/blog/month-end-close-automation/"
                                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-blue-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="w-3 h-3" /> Cut Your
                                    Close to 3 Days
                                </Link>
                            </div>
                        </div>

                        {/* Cash Flow */}
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col">
                            <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                                <LineChart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Cash Flow Visibility & Forecasting
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                Unified bank file ingestion across multiple
                                regional entities. Stop downloading CSVs and
                                start modeling runway with real-time aggregated
                                data.
                            </p>
                            <div className="pt-4 border-t border-white/10 mt-auto">
                                <Link
                                    href="/blog/cash-flow-visibility-automation/"
                                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-purple-400 hover:text-white transition-colors"
                                >
                                    <ArrowRight className="w-3 h-3" /> Read the
                                    Architecture
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Table */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Our &ldquo;No-Guess&rdquo; Architecture
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Most AI agencies rely on probability and hope. We
                            rely on strict data contracts. We separate work by
                            risk using a clear architectural boundary.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/10 rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-4 bg-white/5 font-mono text-sm uppercase tracking-wider text-white/50 border-b border-white/10">
                            <div className="p-4 md:p-6">Layer</div>
                            <div className="p-4 md:p-6">What it does</div>
                            <div className="p-4 md:p-6">How it behaves</div>
                            <div className="p-4 md:p-6">Safety rule</div>
                        </div>

                        {/* Row 1: Reading */}
                        <div className="grid grid-cols-1 md:grid-cols-4 bg-black/20 border-b border-white/10 group hover:bg-white/5 transition-colors">
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-primary font-bold flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Reading
                                (Probabilistic)
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                Invoice parsing, CSV ingestion, bank file
                                normalization
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                AI structures messy inputs into standard JSON
                            </div>
                            <div className="p-6 text-white/80 font-mono text-sm flex items-center">
                                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs border border-yellow-500/20">
                                    Low-confidence flags a human
                                </span>
                            </div>
                        </div>

                        {/* Row 2: Writing */}
                        <div className="grid grid-cols-1 md:grid-cols-4 bg-black/40 group hover:bg-white/5 transition-colors">
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-blue-400 font-bold flex items-center gap-2">
                                <Database className="w-4 h-4" /> Writing
                                (Deterministic)
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                Ledger entries, ERP syncs, bank reconciliations
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                Hard-coded matching logic + explicit approval
                                gates
                            </div>
                            <div className="p-6 text-white/80 font-mono text-sm flex items-center">
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs border border-green-500/20">
                                    Zero probabilistic writes
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-white/60 text-sm font-mono border border-white/10 inline-block px-4 py-2 rounded-full bg-black/40">
                            Confidence scores can inform insights. They do not
                            authorize operations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Governance Gap */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                The Governance Gap
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                Why &ldquo;no-code automation&rdquo; often
                                breaks at scale.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-muted-foreground leading-relaxed">
                                    When people hear &ldquo;workflow automation
                                    services,&rdquo; they picture a messy tangle
                                    of hidden logic: 400 disconnected
                                    automations, no owner, and no audit trail.
                                </p>
                                <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-xl">
                                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                        <X className="w-4 h-4" /> The
                                        &ldquo;Messy Tangle&rdquo;
                                    </h4>
                                    <p className="text-sm text-red-200/60">
                                        Legacy automation often means silent
                                        failures, unknown errors, and debugging
                                        nightmares.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4 stagger-list">
                                <h3 className="text-lg font-bold text-white mb-4">
                                    We Build Visibility-First:
                                </h3>
                                {[
                                    "Clear ownership per step",
                                    "Explicit error-handling paths",
                                    "Audit logs you can trust",
                                    "Deterministic rules for critical actions",
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="stagger-item flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-lg"
                                    >
                                        <Check className="w-5 h-5 text-primary" />
                                        <span className="text-white/90">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                                <p className="text-sm text-primary font-mono mt-4 pt-4 border-t border-white/10">
                                    If a step fails, you know why in seconds,
                                    not hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20">
                <div className="max-w-4xl mx-auto">
                    <Badge
                        variant="outline"
                        className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest"
                    >
                        Our Methodology
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">
                        How We Scope, Build, and Measure.
                    </h2>
                    <div className="space-y-12">
                        {[
                            {
                                phase: "Phase 1 / Scope",
                                title: "The 2-Week Diagnostic",
                                desc: "We don't guess. We map your exact workflow and establish a rigid data contract. You receive a complete architecture map and a cost-baseline document quantifying your current manual leak. If the workflow doesn't materially affect your margins or cycle time, we will tell you not to build it.",
                            },
                            {
                                phase: "Phase 2 / Build",
                                title: "The 30-Day Sprint",
                                desc: "We don't sell 6-month digital transformation retainers. We execute in fixed-price, 30-day sprints. We engineer the ingestion layer, write the deterministic matching logic, and build the exception dashboards. You receive a deployed pipeline with a full, immutable audit log.",
                            },
                            {
                                phase: "Phase 3 / Deploy",
                                title: "Parallel Run & Go-Live",
                                desc: "We run the automated pipeline in parallel with your manual team for one full cycle. We measure the SLA delta, ensure edge cases are caught safely, and flip the switch for authoritative ERP syncs.",
                            },
                            {
                                phase: "Phase 4 / Measure",
                                title: "90-Day Stabilization",
                                desc: "We stick around to ensure the engine doesn't break at scale. You receive a final ROI report comparing your new operational throughput directly against the Phase 1 baseline.",
                            },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-primary font-mono text-xl">
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-widest text-primary/60 mb-1">
                                        {step.phase}
                                    </p>
                                    <h3 className="text-2xl font-bold mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROI Calculator */}
            <section className="reveal-section py-16 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-4xl mx-auto bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
                    <Calculator className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Calculate Your Manual Tax
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Stop guessing how much inefficient workflows cost you.
                        Use our interactive calculator to find your actual
                        month-end close cost in under 30 seconds — or check
                        your cash runway and reporting lag cost directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/tools/cost-to-close-calculator/">
                            <MagneticButton className="bg-white text-black px-8 py-3 font-bold hover:bg-primary transition-colors">
                                Close Cost Calculator
                            </MagneticButton>
                        </Link>
                        <Link href="/tools/burn-rate-calculator/">
                            <MagneticButton className="bg-primary/10 border border-primary/30 text-primary px-8 py-3 font-bold hover:bg-primary hover:text-black transition-colors">
                                Cash Runway Calculator
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Guardrails */}
            <section className="reveal-section py-24 px-6 relative z-10 border-y border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <Badge
                                variant="outline"
                                className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest"
                            >
                                Safety First
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                The &ldquo;Anti-Havoc&rdquo; Guardrails
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                We don&apos;t gamble with company secrets or
                                public reputation. Every automation includes
                                strict safety protocols.
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full space-y-4 stagger-list">
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <GitBranch className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">
                                        Deterministic Fallbacks
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        If a model fails or follows an
                                        improbable path, the system enters a
                                        safe state and alerts a human.
                                    </p>
                                </div>
                            </div>
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <Lock className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">
                                        Token Discipline
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        We optimize cost vs performance; no
                                        endless agent loops burning your budget.
                                    </p>
                                </div>
                            </div>
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">
                                        Auditability
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Every decision, AI or human, is logged.
                                        You get visibility you can trust.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FounderTrustSection />

            {/* FAQ */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5 border-t border-white/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        FAQ
                    </h2>
                    <FaqAccordion faqs={workflowFaqs} />
                </div>
            </section>

            <AssessmentTeaser />

            {/* Final CTA */}
            <section className="reveal-section py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter mix-blend-difference text-white">
                        Build for <span className="text-primary">Scale</span>{" "}
                        not Just <br /> Efficiency.
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30 minutes. One workflow map. Zero magic bullets.
                    </p>
                    <a
                        href={BOOK_MEETING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MagneticButton
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold hover:bg-white transition-colors"
                        >
                            Request a Workflow Diagnostic
                        </MagneticButton>
                    </a>
                    <div className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/services/ai-automation-sprint/"
                            className="text-sm font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors flex items-center gap-2"
                        >
                            <ArrowRight className="w-3 h-3" /> Start with the
                            30-Day Sprint
                        </Link>
                        <Link
                            href="/services/ai-integration-services/"
                            className="text-sm font-mono tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-2"
                        >
                            <ArrowRight className="w-3 h-3" /> Need ERP
                            integration?
                        </Link>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}
