import {
    BOOK_MEETING_CTA,
    BOOK_MEETING_URL,
    BRAND_EYEBROW,
} from "@/lib/marketing";
import {
    ArrowRight,
    Check,
    Shield,
    Gauge,
    Workflow,
    Lock,
    CircleDollarSign,
    Cpu,
    LineChart,
} from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextEffect } from "@/components/ui/text-effect";

const icp = [
    "Already run ERP, CRM, support tools, and internal systems",
    "Have real workflows and production data",
    "Are operationally strained, not experimenting",
    "Need measurable improvement without replatforming",
];

const buyers = ["COO", "Head of Operations", "CTO / Tech Lead"];

const timeline = [
    {
        week: "01",
        title: "System & Bottleneck Audit",
        points: [
            "Map one high-cost workflow (time, errors, headcount, delays)",
            "Identify automation surface without touching core systems",
            "Define baseline metrics and success criteria",
        ],
        output: "Automation spec + risk boundaries",
        icon: Workflow,
    },
    {
        week: "02",
        title: "Drop-In AI Build",
        points: [
            "Build AI logic layer with deterministic rules and guardrails",
            "Integrate read-only or minimally invasive data pathways",
            "Implement reliable fallback handling",
        ],
        output: "Working automation in staging",
        icon: Cpu,
    },
    {
        week: "03",
        title: "Production Hardening",
        points: [
            "Access controls, policy boundaries, and role restrictions",
            "Structured logs, monitoring, and rollback safety",
            "Edge cases and failure modes tested",
        ],
        output: "Production-ready automation",
        icon: Shield,
    },
    {
        week: "04",
        title: "Deployment & Handover",
        points: [
            "Deploy into live operations",
            "Validate KPI movement against baseline",
            "Deliver handover docs and operating guidance",
        ],
        output: "Automation live + measurable result",
        icon: LineChart,
    },
];

const dontDo = [
    "Replace ERP / CRM",
    "Migrate data",
    "Sell licenses",
    "Lock teams into new platforms",
    "Automate everything at once",
];

const pricingReasons = [
    "Cheaper than hiring full-time for this scope",
    "Lower risk than broad transformation projects",
    "Small enough to approve, large enough to matter",
];

export default function SprintMarketingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <ArtisticBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
                    <div className="max-w-2xl">
                        <TextEffect
                            per="char"
                            preset="fade"
                            className="text-xs md:text-sm font-mono tracking-[0.2em] text-primary mb-8 block"
                        >
                            {BRAND_EYEBROW}
                        </TextEffect>

                        <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mb-12 mix-blend-difference text-white">
                            <TextEffect
                                per="word"
                                preset="slide"
                                className="inline-block"
                            >
                                THE 30-DAY
                            </TextEffect>
                            <br />
                            <span className="text-white/50">SPRINT</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed border-l-2 border-primary/50 pl-6">
                            One production-grade automation shipped on top of
                            your existing systems, with measurable before/after
                            impact.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MagneticButton
                                strength={0.4}
                                className="bg-primary text-black px-12 py-6 text-xl font-bold tracking-wider hover:bg-primary/90 transition-colors"
                                textClassName="group-hover:text-black"
                            >
                                {BOOK_MEETING_CTA}
                            </MagneticButton>
                        </a>
                        <p className="text-sm font-mono text-muted-foreground/60">
                            LIMITED AVAILABILITY / Q1 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* The Promise - Grid Layout */}
            <section className="py-24 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium flex items-center gap-3">
                                <Gauge className="w-6 h-6 text-primary" />
                                Impact
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Time saved, error reduction, throughput gain, or
                                visibility uplift tied to baseline metrics.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium flex items-center gap-3">
                                <Shield className="w-6 h-6 text-primary" />
                                Guardrails
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Access controls, logs, monitoring, deterministic
                                fallbacks, and rollback paths.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium flex items-center gap-3">
                                <Workflow className="w-6 h-6 text-primary" />
                                Non-Invasive
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                ERP, CRM, support tooling, and internal systems
                                stay in place while we add an intelligence
                                layer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline - Process Spec Style */}
            <section className="py-32 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-[8vw] md:text-[6vw] font-bold leading-none mb-24 opacity-20">
                        EXECUTION
                    </h2>

                    <div className="space-y-24">
                        {timeline.map((phase) => (
                            <div
                                key={phase.week}
                                className="group grid md:grid-cols-12 gap-8 md:gap-12 border-t border-white/10 pt-12 items-start"
                            >
                                <div className="md:col-span-2">
                                    <span className="text-6xl md:text-8xl font-bold text-white/10 group-hover:text-primary/50 transition-colors duration-500">
                                        {phase.week}
                                    </span>
                                </div>
                                <div className="md:col-span-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <phase.icon className="w-6 h-6 text-primary" />
                                        <h3 className="text-3xl font-bold">
                                            {phase.title}
                                        </h3>
                                    </div>
                                    <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-primary/80 border border-white/10">
                                        OUTPUT: {phase.output.toUpperCase()}
                                    </div>
                                </div>
                                <div className="md:col-span-6">
                                    <ul className="space-y-6">
                                        {phase.points.map((point) => (
                                            <li
                                                key={point}
                                                className="flex items-start gap-4 text-lg text-muted-foreground"
                                            >
                                                <ArrowRight className="w-5 h-5 text-primary/50 mt-1 shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Audience & Pricing - Split Layout */}
            <section className="py-24 bg-gradient-to-b from-transparent to-black/80">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24">
                    {/* Left: Who it's for */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-8">
                                Specification
                            </h2>
                            <div className="space-y-6">
                                {icp.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-4 p-4 border border-white/5 rounded-lg hover:border-primary/20 transition-colors"
                                    >
                                        <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                                        <p className="text-muted-foreground">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CircleDollarSign className="w-5 h-5 text-primary" />
                                Buyer Roles
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {buyers.map((b) => (
                                    <span
                                        key={b}
                                        className="px-4 py-2 text-sm font-mono border border-white/10 rounded-full text-white/70 bg-white/5"
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Pricing + exclusions */}
                    <div className="space-y-12">
                        <div className="border border-white/10 bg-white/5 rounded-2xl p-8">
                            <div className="text-sm font-mono tracking-widest uppercase text-primary mb-3">
                                Investment
                            </div>
                            <div className="text-5xl md:text-7xl font-bold mb-2 tracking-tighter">
                                $10k – $15k USD
                            </div>
                            <div className="text-xl md:text-2xl font-mono text-muted-foreground mb-6">
                                ($78k – $117k HKD)
                            </div>
                            <div className="space-y-4 mb-8">
                                {pricingReasons.map((reason) => (
                                    <p
                                        key={reason}
                                        className="flex items-center gap-3 text-sm text-muted-foreground"
                                    >
                                        <Check className="w-4 h-4 text-primary" />
                                        {reason}
                                    </p>
                                ))}
                            </div>
                            <a
                                href={BOOK_MEETING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full"
                            >
                                <MagneticButton
                                    className="w-full bg-primary text-black justify-center font-bold px-12 py-6 text-xl"
                                    textClassName="group-hover:text-black"
                                >
                                    {BOOK_MEETING_CTA}
                                </MagneticButton>
                            </a>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-red-500" />
                                Scope Exclusions
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {dontDo.map((item) => (
                                    <div
                                        key={item}
                                        className="text-sm text-muted-foreground/60 border-l border-white/10 pl-4"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

