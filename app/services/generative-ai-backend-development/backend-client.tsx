"use client";

import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Check,
    ArrowRight,
    Terminal,
    GitBranch,
    ShieldCheck,
    Cpu,
    BrainCircuit,
    Activity,
    DollarSign,
    Server,
    Code,
    StopCircle,
    LineChart,
    Users,
} from "lucide-react";
import Link from "next/link";
import { BOOK_MEETING_URL } from "@/lib/marketing";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "How do you prevent spaghetti code?",
        answer: "By refusing to use unrestricted AI for code execution. We plan the architecture first. AI is a bridge for unstructured data, not the architect of your system.",
    },
    {
        question: "Is it really stack-agnostic?",
        answer: "Yes. We build microservices that plug in. If we can speak to your systems via API or database, we can build the AI-native layer you need.",
    },
    {
        question: "What is “chat recreation”?",
        answer: "The ability to replay a specific interaction inside the evaluation harness to see exactly where a model failed, then version and fix the prompt/model behavior permanently.",
    },
    {
        question: "Do you also do classic ML?",
        answer: "Yes, when it’s the right tool. “AI/ML development services” should be chosen by problem fit, not hype.",
    },
    {
        question: "Do you build agents?",
        answer: "Only with approvals, bounded actions, and hard safety boundaries. No open-ended autonomy for writes.",
    },
    {
        question: "What’s the best first step?",
        answer: "Request a Technical Audit. If scope is unclear or risk is high, start with the Sprint to validate impact safely.",
    },
];

export default function BackendClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useGSAP(
        () => {
            // Hero entrance
            gsap.fromTo(
                ".hero-content > *",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.2,
                    stagger: 0.05,
                    ease: "power4.out",
                },
            );

            // Stagger list animations
            gsap.utils.toArray<HTMLElement>(".stagger-list").forEach((list) => {
                const items = list.querySelectorAll(".stagger-item");
                if (items.length > 0) {
                    gsap.fromTo(
                        items,
                        { y: 20, opacity: 0 },
                        {
                            scrollTrigger: {
                                trigger: list,
                                start: "top 85%",
                            },
                            y: 0,
                            opacity: 1,
                            duration: 0.2,
                            stagger: 0.05,
                            ease: "power2.out",
                        },
                    );
                }
            });

            // Reveal sections
            gsap.utils
                .toArray<HTMLElement>(".reveal-section")
                .forEach((section) => {
                    gsap.fromTo(
                        section,
                        { y: 30, opacity: 0 },
                        {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                            },
                            y: 0,
                            opacity: 1,
                            duration: 0.2,
                            ease: "power2.out",
                        },
                    );
                });
        },
        { scope: containerRef },
    );

    return (
        <main
            ref={containerRef}
            className="min-h-screen bg-background relative overflow-hidden"
        >
            <ServiceBackground theme="crimson" />

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
                        className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest"
                    >
                        Service Offering
                    </Badge>

                    <h1 className="text-[8vw] md:text-[5vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-difference text-white">
                        <TextEffect
                            per="word"
                            preset="slide"
                            className="inline-block"
                        >
                            GENERATIVE AI
                        </TextEffect>
                        <br />
                        <span className="text-white/50">
                            DEVELOPMENT SERVICES
                        </span>
                        {/* <span className="block text-white/30 text-base md:text-lg font-mono mt-4">For Production-Scale Systems</span> */}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                        <div className="md:w-2/3 border-l-2 border-primary/50 pl-8">
                            <h2 className="text-xl md:text-3xl text-white font-bold mb-6">
                                Turn brittle GenAI prototypes into
                                production-grade AI backends.
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Stop building prototypes that scale costs faster
                                than revenue. We design AI-native microservices
                                that are cost-controlled, versioned, testable,
                                and governed by default.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Our generative AI development services combine
                                AI engineering services and AI/ML development
                                services (including AI ML development services
                                and AI and ML development services) to deliver
                                production-grade systems, not experimental
                                features.
                            </p>
                            <p className="text-lg text-white/80 font-mono">
                                Usage scales. Margins stay protected.
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">
                                    Support Line
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-primary" />{" "}
                                        Microservice-first
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-primary" />{" "}
                                        Stack-agnostic
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-primary" />{" "}
                                        AI-native
                                    </div>
                                </div>
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
                                Request a Technical Audit
                            </MagneticButton>
                        </a>
                        <Link href="/work/">
                            <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 text-lg hover:bg-white/10">
                                See Work / Results
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Who this is for */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Who This Is For
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                This is for leadership teams who want AI revenue
                                without AI chaos. If you need a demo, start with
                                a Sprint. If you need production discipline,
                                start here.
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-4 stagger-list">
                                {[
                                    {
                                        text: "Teams that already shipped a GenAI feature",
                                        icon: Users,
                                    },
                                    {
                                        text: "Founders watching token bills climb",
                                        icon: DollarSign,
                                    },
                                    {
                                        text: "CTOs tired of prompt tweaking in production",
                                        icon: Terminal,
                                    },
                                    {
                                        text: "Companies afraid scaling users will destroy margins",
                                        icon: LineChart,
                                    },
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="stagger-item flex gap-4 p-4 border border-white/5 rounded-lg bg-white/5"
                                    >
                                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-white font-medium">
                                                {item.text}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* What this service is */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">
                        Engineering Discipline Applied to AI
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        This is not generic AI software development services or
                        AI development services. We engineer the layer that
                        makes AI safe, profitable, and maintainable.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 stagger-list text-left">
                        <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                            <h3 className="font-bold text-white mb-2">
                                Beyond Works &quot;Sometimes&quot;
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                For teams that need reliability and uptime, not
                                just a cool demo.
                            </p>
                        </div>
                        <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                            <h3 className="font-bold text-white mb-2">
                                Cost Control
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Architected to keep margins healthy as you scale
                                user count.
                            </p>
                        </div>
                        <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                            <h3 className="font-bold text-white mb-2">
                                Change Management
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Pass security reviews without slowing delivery
                                to zero.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering Standard: Prompts as Code */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge
                                variant="outline"
                                className="mb-4 border-primary/50 text-priority px-3 py-1 text-xs uppercase tracking-widest text-primary"
                            >
                                The Standard
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Prompts as Code
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                We don’t treat prompts as “messages” or
                                “settings.” Prompts are code. Outcome: prompt
                                updates stop being a gamble.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <GitBranch className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="text-white block">
                                            Version Control
                                        </strong>
                                        <span className="text-muted-foreground text-sm">
                                            Prompts and configs are versioned in
                                            Git like core infrastructure.
                                        </span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Check className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="text-white block">
                                            Deterministic Evaluation
                                        </strong>
                                        <span className="text-muted-foreground text-sm">
                                            Evaluation harnesses with golden
                                            datasets to prevent regressions. No
                                            subjective &quot;looks good&quot;.
                                        </span>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <Server className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <strong className="text-white block">
                                            Release Discipline
                                        </strong>
                                        <span className="text-muted-foreground text-sm">
                                            Prompt/model changes ship behind
                                            flags, with rollback paths.
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-sm text-muted-foreground overflow-hidden">
                            <div className="flex gap-2 mb-4">
                                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <span className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-2">
                                <p>
                                    <span className="text-purple-400">git</span>{" "}
                                    commit -m &quot;feat: optimize
                                    categorization prompt&quot;
                                </p>
                                <p>
                                    <span className="text-blue-400">
                                        Running evaluators...
                                    </span>
                                </p>
                                <p className="pl-4">
                                    ✓ extraction_accuracy: 98.5%{" "}
                                    <span className="text-green-500">
                                        (+2.1%)
                                    </span>
                                </p>
                                <p className="pl-4">✓ toxicity_check: PASSED</p>
                                <p className="pl-4">
                                    ✓ cost_per_token: $0.0002{" "}
                                    <span className="text-green-500">
                                        (-15%)
                                    </span>
                                </p>
                                <p>
                                    <span className="text-green-400">
                                        Deployment approved.
                                    </span>{" "}
                                    Rolling out to 5% canary.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Table */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            The Right-Tool Architecture
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            We don’t use LLMs where traditional ML or
                            deterministic code wins. We architect for
                            efficiency.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/10 rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 bg-white/5 font-mono text-sm uppercase tracking-wider text-white/50 border-b border-white/10">
                            <div className="p-4 md:p-6">Task Type</div>
                            <div className="p-4 md:p-6">Best Tool</div>
                            <div className="p-4 md:p-6">Why It Wins</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 bg-black/20 border-b border-white/10 group hover:bg-white/5 transition-colors">
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-white font-bold">
                                Predictive Intelligence
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-primary font-mono flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4" /> Traditional
                                ML
                            </div>
                            <div className="p-6 text-muted-foreground text-sm">
                                Deterministic, high-speed, lower OpEx for OCR,
                                object detection, entity extraction.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 bg-black/20 border-b border-white/10 group hover:bg-white/5 transition-colors">
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-white font-bold">
                                Bridge Logic
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-blue-400 font-mono flex items-center gap-2">
                                <Cpu className="w-4 h-4" /> Generative AI
                            </div>
                            <div className="p-6 text-muted-foreground text-sm">
                                Converts unstructured text into structured
                                formats and back.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 bg-black/20 group hover:bg-white/5 transition-colors">
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-white font-bold">
                                Business Logic
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-green-400 font-mono flex items-center gap-2">
                                <Code className="w-4 h-4" /> Deterministic Code
                            </div>
                            <div className="p-6 text-muted-foreground text-sm">
                                Updates, writes, and database alterations are
                                never “guessed” by AI.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Anti-Havoc Backend */}
            <section className="reveal-section py-24 px-6 relative z-10 border-y border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <Badge
                                variant="outline"
                                className="mb-6 border-primary/50 text-priority px-4 py-1 text-xs uppercase tracking-widest text-primary"
                            >
                                Hard Boundaries
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                The Anti-Havoc Backend
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Unrestricted AI code generation is the quickest
                                path to unmaintainable spaghetti. We enforce
                                hard boundaries.
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full space-y-4 stagger-list">
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <StopCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">
                                        No Silent Writes
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        AI does not alter databases or execute
                                        decisions without checks.
                                    </p>
                                </div>
                            </div>
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">
                                        Least Privilege
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Tool access is scoped to the workflow,
                                        not “whatever the model wants.”
                                    </p>
                                </div>
                            </div>
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <Activity className="w-6 h-6 text-blue-400 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">
                                        Auditability
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Every model call, tool call, and state
                                        transition is logged.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Telemetry */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Telemetry That Protects Margins
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                If you can’t tie token spend to a measured
                                business outcome, it isn’t a strategy. It’s a
                                cost center.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Usage Attribution",
                                    desc: "Cost per task, customer, or workflow.",
                                },
                                {
                                    title: "Telemetry ROI",
                                    desc: "Tie spend to hours reclaimed and SLA lift.",
                                },
                                {
                                    title: "Chat Recreation",
                                    desc: "Replay real interactions to fix failure modes.",
                                },
                                {
                                    title: "Model Routing",
                                    desc: "Optimize model selection to control spend.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-4 border border-white/10 rounded-lg bg-black/20 text-center"
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-3" />
                                    <h4 className="font-bold text-white mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        What We Build
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 stagger-list">
                        <div className="stagger-item">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Server className="w-5 h-5 text-primary" />{" "}
                                Microservices & APIs
                            </h3>
                            <p className="text-muted-foreground">
                                For AI-native features like RAG, extraction,
                                drafting, and triage.
                            </p>
                        </div>
                        <div className="stagger-item">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <Check className="w-5 h-5 text-primary" /> Eval
                                Harnesses
                            </h3>
                            <p className="text-muted-foreground">
                                Golden datasets and regression gates to ensure
                                massive reliability.
                            </p>
                        </div>
                        <div className="stagger-item">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <LineChart className="w-5 h-5 text-primary" />{" "}
                                Observability Stack
                            </h3>
                            <p className="text-muted-foreground">
                                Logs, traces, cost monitoring, and dashboards.
                            </p>
                        </div>
                        <div className="stagger-item">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-primary" />{" "}
                                Guardrails
                            </h3>
                            <p className="text-muted-foreground">
                                Policy boundaries, approvals, fallbacks, and
                                safe rollout patterns (feature flags).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why This vs Full Stack */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Why This vs. A &quot;Full Stack&quot; Shop
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Generalist shops build &quot;AI features&quot;. We
                        engineer the layer that makes AI safe, profitable, and
                        maintainable.
                    </p>
                    <div className="inline-block border border-white/20 rounded-xl p-8 bg-black/40">
                        <p className="font-mono text-primary text-lg mb-4">
                            The Difference is the Plumbing
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
                            <span className="px-3 py-1 border border-white/10 rounded-full">
                                Idempotency
                            </span>
                            <span className="px-3 py-1 border border-white/10 rounded-full">
                                Regression Control
                            </span>
                            <span className="px-3 py-1 border border-white/10 rounded-full">
                                Token Discipline
                            </span>
                            <span className="px-3 py-1 border border-white/10 rounded-full">
                                Safe Change Management
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Production Health Metrics */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        Production Health Metrics
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            {
                                label: "Human Hours Reclaimed",
                                val: "Countable",
                            },
                            {
                                label: "Verified Decision Rate",
                                val: "% Safe Actions",
                            },
                            { label: "Prompt Regression", val: "Zero" },
                            { label: "ROI Visibility", val: "100%" },
                            { label: "Margin Delta", val: "Protect" },
                        ].map((m, i) => (
                            <div
                                key={i}
                                className="p-6 border border-white/10 rounded-xl bg-white/5 text-center hover:border-primary/50 transition-colors"
                            >
                                <div className="text-2xl font-bold text-white mb-2">
                                    {m.val}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                    {m.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        FAQ
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(openFaq === i ? null : i)
                                    }
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-white">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`text-primary transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                                    >
                                        <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="reveal-section py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter mix-blend-difference text-white">
                        Ready for{" "}
                        <span className="text-primary">Production</span>?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30 minutes. We review your architecture, failure modes,
                        and cost model.
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
                            Request a Technical Audit
                        </MagneticButton>
                    </a>
                </div>
            </section>
        </main>
    );
}
