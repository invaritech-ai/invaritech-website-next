"use client";

import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Check,
    ArrowRight,
    X,
    User,
    Lock,
    MessageSquare,
    Fingerprint,
    Activity,
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
        question: "Do you build custom chatbot systems or configure tools?",
        answer: "Both. Tool choice is secondary. Governance and adoption are primary.",
    },
    {
        question: "Can it connect to our documents and systems?",
        answer: "Yes, with permissioned access, logging, and controlled tool boundaries.",
    },
    {
        question: "What about hallucinations?",
        answer: "We reduce risk through architecture, not hope: deterministic tool calls, structured outputs, citations, limited context injection, and escalation paths.",
    },
    {
        question: "What makes you different from SaaS chatbot vendors?",
        answer: "We deploy inside your existing systems, enforce governance, tie the bot to defined objectives, and avoid open-ended experimentation.",
    },
    {
        question: "How do we start?",
        answer: "Start with a Sprint if you want a governed pilot in 30 days, or begin with a Fit Audit to define objective + access boundaries.",
    },
];

export default function ChatbotClient() {
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
            <ServiceBackground theme="purple" />

            {/* Nav Back */}
            <div className="absolute top-24 left-6 z-20 md:top-32 md:left-12 hero-content">
                <Link
                    href="/services/"
                    className="group flex items-center text-muted-foreground hover:text-purple-400 transition-colors text-sm uppercase tracking-wider font-mono"
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
                        className="mb-6 border-purple-500/50 text-priority px-4 py-1 text-xs uppercase tracking-widest text-purple-400"
                    >
                        Service Offering
                    </Badge>

                    <h1 className="text-[8vw] md:text-[5vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-difference text-white">
                        <TextEffect
                            per="word"
                            preset="slide"
                            className="inline-block"
                        >
                            AI CHATBOT
                        </TextEffect>
                        <br />
                        <span className="text-white/50">
                            DEVELOPMENT SERVICES
                        </span>
                        {/* <span className="block text-white/30 text-base md:text-lg font-mono mt-4">(Governed & Multilingual)</span> */}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                        <div className="md:w-2/3 border-l-2 border-primary/50 pl-8">
                            <p className="text-xl md:text-2xl text-white font-medium mb-6">
                                Control, not Curiosity.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                We deploy a governed enterprise AI chatbot
                                solution inside your existing systems with
                                RBAC/ABAC, audit logs, deterministic tool usage,
                                and multilingual capability.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                We provide AI chatbot development services for
                                business websites, internal operations, and
                                multilingual customer support. If you need an AI
                                chatbot for business website use, we deploy it
                                inside governed workflows with RBAC/ABAC and
                                audit logs. This includes multilingual AI
                                chatbot development like Cantonese AI chatbot
                                for website deployments, Mandarin AI chatbot
                                development, and Bahasa AI chatbot development.
                                Our enterprise AI chatbot development and
                                generative AI chatbot development approach
                                focuses on governance, not novelty. If you need
                                AI agent development services, we scope them
                                inside explicit tool boundaries and audit logs.
                            </p>
                            <p className="text-lg text-white/80 font-mono">
                                No open-ended experiments. No token-burning
                                toys. No shadow AI.
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">
                                    Support Line
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    If there isn’t a defined objective, we don’t
                                    deploy.
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
                                Request a Chatbot Fit Audit
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

            {/* Who It's For */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Who It&apos;s For
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                If you just need an open-ended chatbot, ChatGPT
                                already exists. This is for teams that need
                                governance and clear ownership.
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-6 stagger-list">
                                {[
                                    {
                                        text: "Handle sensitive or high-stakes knowledge (policies, contracts, finance)",
                                    },
                                    {
                                        text: "Need governance and clear ownership, not a “cool bot”",
                                    },
                                    {
                                        text: "Want measurable outcomes (time-to-answer, escalations)",
                                    },
                                    {
                                        text: "Operate across languages (English, Cantonese, Mandarin, Bahasa)",
                                    },
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="stagger-item flex gap-4 items-center"
                                    >
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-muted-foreground text-lg">
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Most Fail */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-red-50">
                            Why Most Fail
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-list">
                            {[
                                {
                                    title: "No Defined Objective",
                                    desc: "So nobody owns success.",
                                },
                                {
                                    title: "No RBAC/ABAC",
                                    desc: "Everyone can see everything.",
                                },
                                {
                                    title: "No Traceability",
                                    desc: "No one can explain what happened.",
                                },
                                {
                                    title: "Blind Retrieval",
                                    desc: "Context injection without boundaries.",
                                },
                                {
                                    title: "No Adoption Model",
                                    desc: "Middle management rejects it.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="stagger-item p-6 border border-red-500/10 rounded-xl bg-black/40 hover:bg-red-900/20 transition-colors"
                                >
                                    <X className="w-6 h-6 text-red-500 mb-4" />
                                    <h3 className="font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-red-200/60">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What "Enterprise" Means (Governance) */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-6 border-primary/50 text-priority px-4 py-1 text-xs uppercase tracking-widest text-primary"
                        >
                            Governed by Default
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            What “Enterprise” Means to Us
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Governance is not optional. An employee should not
                            be able to query executive compensation or access HR
                            salary bands.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-list">
                        {[
                            {
                                title: "RBAC / ABAC",
                                desc: "Least-privilege access to data and tools.",
                                icon: Lock,
                            },
                            {
                                title: "Tool Boundaries",
                                desc: "Deterministic tool usage (no blind execution).",
                                icon: Activity,
                            },
                            {
                                title: "Citations",
                                desc: "Traceable answers with source references.",
                                icon: MessageSquare,
                            },
                            {
                                title: "Audit Logs",
                                desc: "Queries, sources, actions, and outputs logged.",
                                icon: Fingerprint,
                            },
                            {
                                title: "Escalation Paths",
                                desc: "Human review for high-risk actions.",
                                icon: User,
                            },
                            {
                                title: "Monitoring",
                                desc: "Evaluation and drift detection over time.",
                                icon: Activity,
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="stagger-item p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valid Objective & Adoption */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Valid Objective */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Check className="w-6 h-6 text-primary" /> Valid
                                Objectives
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Reduce support resolution time by routing and drafting responses",
                                    "Improve knowledge lookup for SOPs (with access controls)",
                                    "Fetch open tickets aligned to documented procedures",
                                    "Provide governed multilingual support",
                                    "Display structured data cross-referenced against rules",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-3 text-muted-foreground border-b border-white/5 pb-3 last:border-0 last:pb-0"
                                    >
                                        <span className="text-primary font-mono text-sm pt-1">
                                            0{i + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Adoption Reality */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <User className="w-6 h-6 text-primary" />{" "}
                                Adoption Reality
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Chatbots are rejected by teams who fear
                                redundancy or distrust the data. Adoption
                                requires accuracy, governance, and usefulness
                                inside workflow.
                            </p>
                            <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-widest">
                                    Multilingual Deployment
                                </h4>
                                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        English
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        Cantonese
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        Mandarin
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                        Bahasa
                                    </span>
                                </div>
                                <p className="mt-4 text-xs text-white/50 italic">
                                    Language is identity. Governed AI should
                                    respect that.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infrastructure Model */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">
                        No Forced Lock-In
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        We don’t force subscription dependency. Depending on
                        your constraints, you can host inside your VPC, use
                        approved providers, or keep cost visibility.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 stagger-list">
                        <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                            <h4 className="font-bold text-white mb-2">
                                Host Yourself
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                VPC or on-prem where required.
                            </p>
                        </div>
                        <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                            <h4 className="font-bold text-white mb-2">
                                Approved Models
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Use providers you already trust.
                            </p>
                        </div>
                        <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                            <h4 className="font-bold text-white mb-2">
                                Cost Visibility
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Cost-per-task, not mystery bills.
                            </p>
                        </div>
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
                        One Objective. Clear Boundaries. <br />{" "}
                        <span className="text-primary">Go / No-Go.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30 minutes. Request a Chatbot Fit Audit.
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
                            Request a Chatbot Fit Audit
                        </MagneticButton>
                    </a>
                </div>
            </section>
        </main>
    );
}
