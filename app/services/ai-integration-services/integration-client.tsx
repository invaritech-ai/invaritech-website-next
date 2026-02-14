"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, X, ShieldCheck, Zap, Server, Database, Lock, Eye, AlertTriangle } from "lucide-react";
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
        question: "Do we own the gateway code?",
        answer: "Yes. This is not a SaaS connector. You own the integration layer we build.",
    },
    {
        question: "How do you prevent data leakage to proprietary models?",
        answer: "We scope to your constraints. For sensitive workloads, we can avoid public APIs and deploy within your VPC or on-prem using approved models and controls.",
    },
    {
        question: "Is this for chatbots?",
        answer: "This is for objective-driven systems. Chat is an interface. The gateway is infrastructure that makes AI usable inside governed workflows.",
    },
    {
        question: "How do we start?",
        answer: "Start with an Infrastructure Audit to map your data surface, APIs, and policy constraints. If the wedge is clear, we scope the build (or recommend the Sprint first).",
    },
];

export default function IntegrationClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useGSAP(() => {
        // Hero entrance
        gsap.fromTo(".hero-content > *", 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.2,
                stagger: 0.05,
                ease: "power4.out",
            }
        );

        // Stagger list animations
        gsap.utils.toArray<HTMLElement>(".stagger-list").forEach((list) => {
            const items = list.querySelectorAll(".stagger-item");
            if (items.length > 0) {
                gsap.fromTo(items, 
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
                    }
                );
            }
        });

        // Reveal sections
        gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
            gsap.fromTo(section, 
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
                }
            );
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
            <ServiceBackground theme="green" />

            {/* Nav Back */}
            <div className="absolute top-24 left-6 z-20 md:top-32 md:left-12 hero-content">
                <Link href="/services/" className="group flex items-center text-muted-foreground hover:text-emerald-400 transition-colors text-sm uppercase tracking-wider font-mono">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative z-10 hero-content">
                <div className="max-w-5xl mx-auto">
                    <Badge variant="outline" className="mb-6 border-emerald-500/50 text-priority px-4 py-1 text-xs uppercase tracking-widest text-emerald-400">
                        Service Offering
                    </Badge>
                    
                    <h1 className="text-[8vw] md:text-[5vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            AI INTEGRATION
                        </TextEffect>
                        <br />
                        <span className="text-white/50">SERVICES</span>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                        <div className="md:w-2/3 border-l-2 border-primary/50 pl-8">
                            <p className="text-xl md:text-2xl text-white font-medium mb-6">
                                Custom Gateways for Sovereign Data.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Our AI integration services connect large language models and AI tools into your existing ERP, CRM, and internal systems without replacing your infrastructure.
                            </p>
	                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
	                                We provide AI system integration services and generative AI integration services for enterprises that require governance and data sovereignty. We can deliver AI integration consulting services or build the integration layer end-to-end, with visibility, controls, and safe failure modes.
	                            </p>
	                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
	                                Teams also call this AI integration services for businesses, gen AI integration services, AI tool integration services, integration services for AI tools, or AI agent integration services for businesses. The name doesn’t matter. Ownership, auditability, and safe failure modes do.
	                            </p>
	                            <p className="text-lg text-white/80 font-mono">
	                                No replatforming. No shadow AI. No brittle “glue code.”
	                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Support Line</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Available as a standalone build or a managed service (host & maintain).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                                Request an Infrastructure Audit
                            </MagneticButton>
                        </a>
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                             <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 text-lg hover:bg-white/10">
                                Book a Meeting
                            </MagneticButton>
                        </a>
                    </div>
                </div>
            </section>

            {/* Gateway Philosophy */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Gateway Philosophy</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Most integration proposals quietly lock you into proprietary middleware. We build integration layers that guarantee sovereignty without lock-in.
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-6 stagger-list">
                                {[
                                    { title: "You own the logic", desc: "The integration layer is built around your workflows and policies." },
                                    { title: "You choose the operating model", desc: "Host it yourself, or we run it for you under a retainer." },
                                    { title: "Model agility", desc: "Switch providers (or move to self-hosted) without rewriting the workflow." }
                                ].map((item, i) => (
                                    <li key={i} className="stagger-item flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                        <div>
                                            <strong className="text-white block mb-1">{item.title}</strong>
                                            <span className="text-muted-foreground text-sm leading-relaxed">{item.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

             {/* Bring AI to Data */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bring the AI to the Data</h2>
                            <p className="text-xl text-muted-foreground">
                                For sensitive workloads, we don’t force “data export as a strategy.”
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 stagger-list">
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Server className="w-5 h-5 text-primary" /> VPC-First
                                </h3>
                                <p className="text-sm text-muted-foreground">Deployed inside your private cloud environment where possible.</p>
                            </div>
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Database className="w-5 h-5 text-primary" /> On-Prem Ready
                                </h3>
                                <p className="text-sm text-muted-foreground">Air-gapped or local deployment support where required.</p>
                            </div>
                            <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40">
                                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-primary" /> Vendor Controls
                                </h3>
                                <p className="text-sm text-muted-foreground">Strict allowlists and data residency constraints respected.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enterprise Rigor */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20">
                <div className="max-w-5xl mx-auto">
                     <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Enterprise-Grade Rigor</h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-list">
                        {[
                            { title: "Idempotency", desc: "One event equals one action. No double-triggering or accidental reprocessing." },
                            { title: "Retries + Rate Limits", desc: "Safe retry behavior that doesn’t turn provider outages into internal incidents." },
                            { title: "RBAC / Least Privilege", desc: "The model only sees what the workflow owner is authorized to access." },
                            { title: "Deterministic Fallbacks", desc: "If a model fails, the system enters a safe path and alerts a human." },
                            { title: "Rollback Paths", desc: "Controlled releases and reversible changes for every deployment." }
                        ].map((item, i) => (
                            <div key={i} className="stagger-item p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* Integration Matrix Table */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">The Integration Matrix</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Designed for change. Options depend on your security policies and constraints.
                        </p>
                    </div>

                    <div className="overflow-hidden border border-white/10 rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 bg-white/5 font-mono text-sm uppercase tracking-wider text-white/50 border-b border-white/10">
                            <div className="p-4 md:p-6">Capability</div>
                            <div className="p-4 md:p-6">What it enables</div>
                        </div>
                        
                        {[
                            { cap: "Provider flexibility", enable: "Move between OpenAI / Anthropic / Vertex / self-hosted as constraints evolve" },
                            { cap: "Cloud → VPC → on-prem pathways", enable: "Keep sensitive workloads inside your boundary" },
                            { cap: "Logic continuity", enable: "Keep business process identical even if you switch models to control OpEx", highlight: true },
                            { cap: "Observability by default", enable: "Know what ran, what failed, and why, without guesswork" }
                        ].map((row, i) => (
                            <div key={i} className={`grid grid-cols-1 md:grid-cols-2 border-b border-white/10 group hover:bg-white/5 transition-colors ${row.highlight ? 'bg-primary/5' : 'bg-black/20'}`}>
                                <div className={`p-6 border-b md:border-b-0 border-white/5 font-bold flex items-center gap-2 ${row.highlight ? 'text-primary' : 'text-white'}`}>
                                    {row.highlight && <Zap className="w-4 h-4" />} {row.cap}
                                </div>
                                <div className="p-6 text-muted-foreground">
                                    {row.enable}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Visibility */}
             <section className="reveal-section py-24 px-6 relative z-10 border-y border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
                                Mission
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Integrations Shouldn’t Be a Black Box</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                We turn “shadow AI” into boring infrastructure. We replace silent corruption and API anxiety with visible tickets and safe, human-led overrides.
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full space-y-4 stagger-list">
                             {[
                                { title: "State Tracking", desc: "Pending / success / failed states visible in your dashboard." },
                                { title: "Alerts + Overrides", desc: "Clear escalation when a step fails or confidence is low." },
                                { title: "Token & Cost Monitoring", desc: "Cost-per-task visibility so finance doesn’t get surprised." },
                                { title: "Audit Logs", desc: "Every decision, model call, tool call, and write is traceable." }
                             ].map((item, i) => (
                                 <div key={i} className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                    <Eye className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* The Hard No */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-8">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">The Hard No</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        No interface, no integration. If your system has no workable API, database connection, webhook, or export path, we can’t build a governed bridge.
                    </p>
                    <div className="bg-red-900/10 border border-red-500/20 p-8 rounded-2xl text-left max-w-2xl mx-auto">
                        <h4 className="font-bold text-red-400 mb-4">We also won’t build:</h4>
                        <ul className="space-y-3 text-red-100/80">
                            <li className="flex gap-2"><X className="w-5 h-5 shrink-0" /> “Black box” automations where we can’t baseline outcomes</li>
                            <li className="flex gap-2"><X className="w-5 h-5 shrink-0" /> Production workflows with ungoverned model autonomy for writes</li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* FAQ */}
             <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-white">{faq.question}</span>
                                    <span className={`text-primary transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                                    </span>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
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
                        Connect <span className="text-primary">Without</span> Surrendering <br/> Your Stack.
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30 minutes. We review your stack, your integration surface, and your data policies.
                    </p>
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton 
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold hover:bg-white transition-colors"
                        >
                            Request an Infrastructure Audit
                        </MagneticButton>
                    </a>
                </div>
            </section>
        </main>
    );
}
