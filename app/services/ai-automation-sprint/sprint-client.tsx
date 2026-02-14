	"use client";

	import { Badge } from "@/components/ui/badge";
	import { ArrowLeft, Check, ArrowRight, X, Clock, ShieldCheck, Zap, Server, Database } from "lucide-react";
	import Link from "next/link";
	import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
	import { ServiceBackground } from "@/components/ui/ServiceBackground";
	import { TextEffect } from "@/components/ui/text-effect";
	import { MagneticButton } from "@/components/ui/MagneticButton";
	import { useRef, useState } from "react";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const bottlenecks = [
    {
        title: "Automating high-ticket sales ops",
        items: ["CRM ↔ WhatsApp ↔ scheduling handoffs", "Manual document/receipt generation", "Status hidden across tools"],
        metric: "Measured on: cycle time, throughput, owner hours reclaimed"
    },
    {
        title: "AI for financial reconciliation",
        items: ["Email-driven intake", "Missing tagging/categorization", "Manual reconciliation + approvals"],
        metric: "Measured on: reconciliation lag, exception rate, review hours"
    },
    {
        title: "Reducing support costs",
        items: ["Scattered knowledge sources", "Inconsistent answers", "Escalations for routine questions"],
        metric: "Measured on: time-to-answer, escalation rate, QA rework"
    }
];

const faqs = [
    {
        q: "Is this just an AI discovery workshop?",
        a: "It starts with an AI discovery workshop, but it ends in build and measurable validation."
    },
    {
        q: "Do you build “AI strategy”?",
        a: "Yes, but only when strategy is the shortest path to safe execution."
    },
    {
        q: "What if we need more than 30 days?",
        a: "Then this becomes phase 1 of a delivery track. The goal is to prove value first."
    },
    {
        q: "Will our team be involved?",
        a: "Yes. We define owners, approvals, and operating boundaries from day one."
    },
    {
        q: "What do you need from us?",
        a: "A workflow owner, system access by Day 3, and enough data to baseline and validate outcomes."
    }
];

export default function SprintClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useGSAP(() => {
        // Hero entrance
        gsap.fromTo(".hero-content > *", 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
            }
        );

        // Section reveals
        gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
            gsap.fromTo(section, 
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                }
            );
        });

        // Staggered lists
        gsap.utils.toArray<HTMLElement>(".stagger-list").forEach((list) => {
            const items = list.querySelectorAll(".stagger-item");
            gsap.fromTo(items,
                { y: 20, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: list,
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
            <ServiceBackground theme="orange" />

            {/* Nav Back */}
            <div className="absolute top-24 left-6 z-20 md:top-32 md:left-12 hero-content">
                <Link href="/services/" className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-mono group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative z-10 hero-content">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div>
                            <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
                                Service Offering
                            </Badge>
                            <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter mix-blend-difference text-white">
                                <TextEffect per="word" preset="slide" className="inline-block">
                                    AI POC
                                </TextEffect>
                                <br />
                                <span className="text-white/50">DEVELOPMENT SERVICES</span>
                            </h1>
                        </div>
                        <div className="md:max-w-md md:mb-4">
                            <p className="text-xl md:text-2xl font-light text-white mb-4">
                                Move from prototype to production in 30 days.
                            </p>
                            <p className="text-muted-foreground">
                                Detailed scope. Measurable delta. Governance built in.
                            </p>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-12 grid md:grid-cols-2 gap-12">
                        <div>
	                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
	                                <strong className="text-white">AI PoC development services for teams that need proof, not hype.</strong><br/>
	                                In 30 days, we deliver one scoped AI pilot project development track on top of your existing systems, with governance and a measurable before/after delta.
                                    These AI proof of concept development services include an AI discovery workshop, an AI readiness assessment service, and an AI feasibility study up front. If leadership alignment is missing, we run an AI strategy workshop to lock decisions fast.
	                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                                    <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                                        See If You Qualify
                                    </MagneticButton>
                                </a>
                                <Link href="/results/">
                                    <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 text-lg hover:bg-white/10 transition-colors">
                                        See Work / Results
                                    </MagneticButton>
                                </Link>
                            </div>
	                            <p className="mt-6 text-sm text-muted-foreground/60 font-mono">
	                                Limited capacity. Best fit if we can start within 2 weeks.
	                            </p>
	                            <p className="mt-2 text-xs text-white/40 font-mono uppercase tracking-widest">
	                                Ideal for: COOs, CTOs, Heads of Product, Ops leaders
	                            </p>
	                        </div>
	                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
	                            <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-6">Built For Production</h3>
	                            <ul className="space-y-4">
	                                {["Access control & audit logs", "Deterministic fallbacks", "Measurable impact (before/after)", "Runbook & handover"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-white/80">
                                        <Check className="w-5 h-5 text-primary" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

	             {/* The "Week 2" Reality */}
	             <section className="reveal-section py-24 px-6 relative z-10 bg-black/20 border-y border-white/10 backdrop-blur-sm">
	                <div className="max-w-4xl mx-auto">
	                    <div className="flex flex-col md:flex-row gap-12 items-start">
	                        <div className="md:w-1/3">
	                            <h2 className="text-3xl font-bold mb-4">The &quot;Week 2&quot; Reality</h2>
	                            <p className="text-muted-foreground">The Sprint is capped at 30 days provided these prerequisites are met.</p>
	                        </div>
                        <div className="md:w-2/3 stagger-list space-y-6">
                            {[
                                { text: "System access (accounts/API keys/SSO) granted by Day 3", icon: Clock },
                                { text: "A workflow owner available for decisions", icon: ShieldCheck },
                                { text: "Access to representative data to baseline impact", icon: Database }
                            ].map((item, i) => (
                                <div key={i} className="stagger-item flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-white/90 pt-1">{item.text}</p>
                                </div>
                            ))}
                            <p className="stagger-item text-sm text-red-400/80 font-mono pt-4 border-t border-white/10">
                                If blocked, we tell you immediately. We re-scope or stop. No burn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Who it's for */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
	                        <div>
	                            <h2 className="text-4xl font-bold mb-8">Who It’s For</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    These AI PoC development services are built for teams with real workflows, real data, and real owners.
                                </p>
	                            <ul className="space-y-6 stagger-list">
	                                {[
	                                    "Teams with real workflows (not toy demos)",
	                                    "Production data and real stakeholders",
	                                    "Tried internal AI experiments that never reached production",
	                                    "Bought tools but still rely on manual coordination",
	                                    "Paid vendors who missed deadlines",
	                                    "Need execution, not another AI strategy deck"
	                                ].map((item, i) => (
	                                    <li key={i} className="stagger-item flex items-start gap-3 text-lg text-muted-foreground">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
		                            <div className="mt-12 p-6 border border-white/10 rounded-xl bg-white/5">
		                                <p className="text-white/80 italic">
		                                    &ldquo;If engagement cannot begin within 2 weeks, this is not a fit.&rdquo;
		                                </p>
		                            </div>
		                            <div className="mt-6 p-6 border border-white/10 rounded-xl bg-black/40">
		                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Not A Fit If</h3>
		                                <ul className="space-y-3 text-sm text-muted-foreground stagger-list">
		                                    {[
		                                        "You want a “magic bullet” to fix every organizational problem at once",
		                                        "Your primary goal is to replace humans rather than scale their output",
		                                        "You believe a production-grade system can be built over a weekend",
		                                        "You want open-ended AI without explicit constraints and approvals",
		                                    ].map((item) => (
		                                        <li key={item} className="stagger-item flex gap-2">
		                                            <X className="w-4 h-4 text-red-400 mt-0.5" /> {item}
		                                        </li>
		                                    ))}
		                                </ul>
		                            </div>
	                        </div>
	                        <div>
	                            <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-8">Typical Triggers</h3>
	                            <div className="grid gap-4 stagger-list">
                                {[
                                    { role: "CEO", quote: "We need a new angle shipped." },
                                    { role: "COO", quote: "Improve throughput without retraining the org." },
                                    { role: "CFO", quote: "Reduce cost-to-serve with accountability." },
                                    { role: "CTO", quote: "Turn AI noise into a controlled production system." }
	                                ].map((trigger, i) => (
	                                    <div key={i} className="stagger-item p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors bg-black/40">
	                                        <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">{trigger.role}</span>
	                                        <p className="text-white font-light">&ldquo;{trigger.quote}&rdquo;</p>
	                                    </div>
	                                ))}
	                            </div>
	                        </div>
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center">
                         <h2 className="text-4xl font-bold mb-4">What You Get</h2>
                         <p className="text-muted-foreground">By Day 30, you have production-grade behavior. Not a sandbox toy.</p>
                    </div>
                    
	                    <div className="grid md:grid-cols-3 gap-8 stagger-list">
	                        {[
	                            { title: "Working Pilot", desc: "Deployment-ready automation tied to one bottleneck.", icon: Zap },
	                            { title: "Measurement Plan", desc: "Baseline vs Actuals: time, errors, throughput, cost.", icon: Clock },
	                            { title: "Controlled Integration", desc: "Works with your existing systems. No replatforming.", icon: Server },
	                            { title: "Guardrails", desc: "Permissions, approvals, logs, fallbacks, rollback.", icon: ShieldCheck },
	                            { title: "Handover", desc: "Runbook, operating guidance, next-step roadmap.", icon: Check }
	                        ].map((item, i) => (
                            <div key={i} className="stagger-item bg-black/40 border border-white/10 p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
	                </div>
	            </section>

	            {/* Governance & Guardrails */}
	            <section className="reveal-section py-24 px-6 relative z-10 bg-black/20 border-y border-white/10 backdrop-blur-sm">
	                <div className="max-w-6xl mx-auto">
	                    <div className="grid md:grid-cols-2 gap-16 items-start">
	                        <div>
	                            <h2 className="text-4xl font-bold mb-6">Governance & Guardrails</h2>
	                            <p className="text-lg text-muted-foreground leading-relaxed">
	                                We don’t ship open-ended “autonomous agents” to make business-critical decisions.
	                                We build the engine. You keep the steering wheel.
	                            </p>
	                        </div>
	                        <div className="stagger-list space-y-4">
	                            {[
	                                "System-altering actions require explicit human approval",
	                                "Role-based access control, least-privilege permissions, and clear ownership",
	                                "Audit logs and traceability across prompts, tools, and outcomes",
	                                "Deterministic fallbacks and rollback paths when the model is uncertain",
	                            ].map((item) => (
	                                <div key={item} className="stagger-item flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
	                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
	                                        <ShieldCheck className="w-5 h-5" />
	                                    </div>
	                                    <p className="text-white/90 pt-1">{item}</p>
	                                </div>
	                            ))}
	                            <p className="stagger-item text-xs text-white/50 font-mono pt-4 border-t border-white/10">
	                                Outcome: production-grade behavior your team can operate and trust, not a demo that collapses under real constraints.
	                            </p>
	                        </div>
	                    </div>
	                </div>
	            </section>

	            {/* Real Bottlenecks */}
	            <section className="reveal-section py-24 px-6 relative z-10">
	                <div className="max-w-6xl mx-auto">
	                    <h2 className="text-4xl font-bold mb-16">Real Bottlenecks We Fix</h2>
	                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {bottlenecks.map((item, i) => (
                            <div key={i} className="border-l-2 border-primary/30 pl-6 py-2 hover:border-primary transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <ul className="space-y-2 mb-6">
                                    {item.items.map((sub, j) => (
                                        <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span> {sub}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs font-mono text-white/50">{item.metric}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stack Compatibility */}
             <section className="reveal-section py-24 px-6 relative z-10 border-y border-white/10 bg-black/20">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Stack Compatibility</h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        We ship on top of your existing stack. We don’t ask you to replatform.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {["AWS", "Azure", "GCP", "Postgres", "SQL", "ERP", "CRM", "Helpdesk", "Internal APIs", "Webhooks"].map(tech => (
                            <span key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="inline-block p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                        <strong>No-go:</strong> Closed platforms with no API, legacy on-prem with no gateway, or black-box data access.
                    </div>
                </div>
            </section>

            {/* Sprint Structure - Timeline */}
            <section className="reveal-section py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">The Sprint Structure</h2>
                        <p className="text-xl text-muted-foreground font-light">Buffered, real-world safe. Executed in 4 phases.</p>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent transform md:-translate-x-1/2" />

                        <div className="space-y-12 md:space-y-24">
                            {[
                                { phase: "01", title: "Discovery & Assessment", days: "Days 1–7", desc: "Identify highest-ROI wedge. Define success criteria.", output: "Build spec + baseline plan." },
                                { phase: "02", title: "Targeted Build", days: "Days 8–21", desc: "Core logic and integrations under real constraints.", output: "Working pilot in staging." },
                                { phase: "03", title: "Hardening & Governance", days: "Days 22–27", desc: "Access control, audit logs, failure modes.", output: "Production-grade behavior." },
                                { phase: "04", title: "Validation & Handover", days: "Days 28–30", desc: "Validate KPI movement. Hand over operating model.", output: "Measurable result + roadmap." }
                            ].map((step, i) => (
                                <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    {/* Content Side */}
                                    <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-24 text-left' : 'md:pr-24 md:text-right'}`}>
                                        <div className="inline-block mb-4">
                                            <span className="text-xs font-mono font-bold text-primary border border-primary/30 bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">
                                                {step.days}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{step.desc}</p>
                                        <p className="text-sm font-mono text-white/60 border-t border-white/10 pt-4 inline-block">
                                            <span className="text-primary">Output:</span> {step.output}
                                        </p>
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-black border-2 border-primary transform md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>

                                    {/* Empty Balance Side */}
                                    <div className="hidden md:block md:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-5xl mx-auto">
                     <h2 className="text-3xl font-bold mb-12 text-center">Why The Sprint?</h2>
                     <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-2xl border border-white/10 opacity-60 hover:opacity-100 transition-opacity">
                            <h3 className="text-lg font-bold text-white mb-4">Internal R&D</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex gap-2"><X className="w-4 h-4 text-red-400" /> Slow cycles</li>
                                <li className="flex gap-2"><X className="w-4 h-4 text-red-400" /> Unclear ownership</li>
                                <li className="flex gap-2"><X className="w-4 h-4 text-red-400" /> Prototypes die before production</li>
                            </ul>
                        </div>
	                        <div className="p-8 rounded-2xl border border-white/10 opacity-60 hover:opacity-100 transition-opacity">
	                            <h3 className="text-lg font-bold text-white mb-4">Big Consulting</h3>
	                            <ul className="space-y-4 text-sm text-muted-foreground">
	                                <li className="flex gap-2"><X className="w-4 h-4 text-red-400" /> Expensive &quot;strategy&quot;</li>
	                                <li className="flex gap-2"><X className="w-4 h-4 text-red-400" /> No accountable build</li>
	                                <li className="flex gap-2"><X className="w-4 h-4 text-red-400" /> Months of slide decks</li>
	                            </ul>
	                        </div>
                        <div className="p-8 rounded-2xl border border-primary/50 bg-primary/5 transform md:-translate-y-4 shadow-2xl shadow-primary/10 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                                Recommended
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">The Sprint</h3>
                            <ul className="space-y-4 text-sm text-white">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> 30-day cap</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Governed delivery</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Measurable validation</li>
                            </ul>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-sm text-white/50 mb-2">Investment</p>
                                <p className="text-2xl font-bold text-white">$10k – $15k USD</p>
                                <p className="text-sm font-mono text-white/60 mb-1">($78k – $117k HKD)</p>
                                <p className="text-xs text-white/40">For a tightly scoped wedge</p>
                            </div>
                        </div>
                     </div>
                </div>
            </section>

             {/* FAQ */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-white">{faq.q}</span>
                                    <span className={`text-primary transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                                    </span>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="reveal-section py-32 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter mix-blend-difference text-white">
                        SEE IF YOU <span className="text-primary">QUALIFY</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30-minute diagnostic. One ROI wedge. Go / no-go. <br/>
                        <span className="text-sm mt-4 block text-white/40 font-mono uppercase tracking-widest">Ideal for: COOs, CTOs, Heads of Product, Ops leaders</span>
                    </p>
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton 
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold hover:bg-white transition-colors"
                        >
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                </div>
            </section>

        </main>
    );
}
