"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ArrowRight, X, Clock, ShieldCheck, Zap, Server, Database, MessageSquare, Briefcase, FileText, GitBranch, Lock } from "lucide-react";
import Link from "next/link";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "Do you promise to replace employees?",
        answer: "No. We promise to make them more effective. We build for scale, not headcount reduction.",
    },
    {
        question: "What if the AI makes a mistake?",
        answer: "Business-critical actions never run on guesses. If the AI is unsure, the system stops, falls back, or requests human approval.",
    },
    {
        question: "Is this just “intelligent process automation” or RPA?",
        answer: "It can include those techniques, but the point is governance: audited pipelines with clear ownership and safe failure modes.",
    },
    {
        question: "Is this just a bunch of Zaps?",
        answer: "No. No-code is a tool. Operational liquidity is the goal. When reliability and auditability matter, we build custom pipelines.",
    },
];

export default function WorkflowClient() {
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

        // Stagger list animations for various sections
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
            <ServiceBackground theme="blue" />

            {/* Nav Back */}
            <div className="absolute top-24 left-6 z-20 md:top-32 md:left-12 hero-content">
                <Link href="/services/" className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-mono">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative z-10 hero-content">
                <div className="max-w-5xl mx-auto">
                    <Badge variant="outline" className="mb-6 border-primary/50 text-priority px-4 py-1 text-xs uppercase tracking-widest text-primary">
                        Service Offering
                    </Badge>
                    
                    <h1 className="text-[8vw] md:text-[5vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            AI WORKFLOW
                        </TextEffect>
                        <br />
                        <span className="text-white/50">AUTOMATION</span>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                        <div className="md:w-2/3 border-l-2 border-primary/50 pl-8">
                            <p className="text-xl md:text-2xl text-white font-medium mb-6">
                                Workflow automation consulting that turns operational friction into operational liquidity.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                We don’t sell the “magic bullet” of total human replacement. We build governed systems that remove the fatigue tax: the repetitive, high-friction work that silently caps throughput.
                            </p>
                            <p className="text-lg text-white/80 font-mono">
                                One audited pipeline. No agentic havoc. Scalability by design.
                            </p>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Ideally Suited For</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Teams moving from prototype thinking to production reality. Best for COOs and Ops leaders who need to scale without linearity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                                Request a Workflow Diagnostic
                            </MagneticButton>
                        </a>
                    </div>
                </div>
            </section>

            {/* Scalability Manifesto */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Scalability Manifesto</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                We’re passionate about plugging scalability leaks. Human time is too valuable to waste on reconciliation, data entry, and chasing status updates.
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-6 stagger-list">
                                {[
                                    { title: "Computers don’t feel fatigue", desc: "Reliability is the natural byproduct of letting systems handle the repetitive 90%." },
                                    { title: "Scale should be non-linear", desc: "You shouldn’t have to double headcount just to double throughput." },
                                    { title: "Top-line focus", desc: "We automate the boring so experts spend their 40 hours on high-value work." }
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

             {/* Governance Gap */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Governance Gap</h2>
                            <p className="text-xl text-muted-foreground">
                                Why “no-code automation” often breaks at scale.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-muted-foreground leading-relaxed">
                                    When people hear “workflow automation services,” they picture a messy tangle of hidden logic: 400 disconnected automations, no owner, and no audit trail.
                                </p>
                                <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-xl">
                                    <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                        <X className="w-4 h-4" /> The "Messy Tangle"
                                    </h4>
                                    <p className="text-sm text-red-200/60">Legacy automation often means silent failures, unknown errors, and debugging nightmares.</p>
                                </div>
                            </div>
                            <div className="space-y-4 stagger-list">
                                <h3 className="text-lg font-bold text-white mb-4">We Build Visibility-First:</h3>
                                {[
                                    "Clear ownership per step",
                                    "Explicit error-handling paths",
                                    "Audit logs you can trust",
                                    "Deterministic rules for critical actions"
                                ].map((item, i) => (
                                    <div key={i} className="stagger-item flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-lg">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span className="text-white/90">{item}</span>
                                    </div>
                                ))}
                                <p className="text-sm text-primary font-mono mt-4 pt-4 border-t border-white/10">
                                    If a step fails, you know why in seconds, not hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Table */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our “No-Guess” Architecture</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Most AI agencies rely on probability and hope. We rely on governance. We separate work by risk using a clear architectural boundary.
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
                                <FileText className="w-4 h-4" /> Reading (Probabilistic)
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                Extraction, classification, summarization, triage
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                AI interprets messy inputs; confidence can inform review
                            </div>
                            <div className="p-6 text-white/80 font-mono text-sm flex items-center">
                                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs border border-yellow-500/20">Low-confidence flags a human</span>
                            </div>
                        </div>

                         {/* Row 2: Writing */}
                         <div className="grid grid-cols-1 md:grid-cols-4 bg-black/40 group hover:bg-white/5 transition-colors">
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-blue-400 font-bold flex items-center gap-2">
                                <Database className="w-4 h-4" /> Writing (Deterministic)
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                Database writes, financial syncs, external actions
                            </div>
                            <div className="p-6 border-b md:border-b-0 border-white/5 text-muted-foreground">
                                Hard-coded rules + API integrity + approvals
                            </div>
                            <div className="p-6 text-white/80 font-mono text-sm flex items-center">
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs border border-green-500/20">Human-in-the-loop or strict logic</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-white/60 text-sm font-mono border border-white/10 inline-block px-4 py-2 rounded-full bg-black/40">
                            Confidence scores can inform insights. They do not authorize operations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Finance + Ops Workflows (Audited & Governed)</h2>
                    <div className="grid md:grid-cols-2 gap-8 stagger-list">
                        {/* Case 1 */}
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">High-Stakes Financial Intake</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">Before</h4>
                                    <p className="text-muted-foreground text-sm">Email-driven chaos, manual extraction, reconciliation drift.</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-primary mb-2">After</h4>
                                    <p className="text-white text-sm">Extraction + validation → deterministic matching → human approval gate.</p>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-sm font-mono text-white/80">Result: reduced reconciliation lag, fewer expensive exceptions, full auditability.</p>
                                </div>
                            </div>
                        </div>

                        {/* Case 2 */}
                        <div className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Scaling High-Ticket Operations</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">Before</h4>
                                    <p className="text-muted-foreground text-sm">Response times vary by staff fatigue; manual CRM entry causes downstream errors.</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-blue-400 mb-2">After</h4>
                                    <p className="text-white text-sm">Automated triage + data enrichment → human-led final comms and approvals.</p>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-sm font-mono text-white/80">Result: higher throughput capacity without a hiring spree.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Guardrails */}
             <section className="reveal-section py-24 px-6 relative z-10 border-y border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
                                Safety First
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">The “Anti-Havoc” Guardrails</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                We don’t gamble with company secrets or public reputation. Every automation includes strict safety protocols.
                            </p>
                        </div>
                        <div className="md:w-1/2 w-full space-y-4 stagger-list">
                             <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <GitBranch className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Deterministic Fallbacks</h4>
                                    <p className="text-sm text-muted-foreground">If a model fails or follows an improbable path, the system enters a safe state and alerts a human.</p>
                                </div>
                             </div>
                             <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <Lock className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Token Discipline</h4>
                                    <p className="text-sm text-muted-foreground">We optimize cost vs performance; no endless agent loops burning your budget.</p>
                                </div>
                             </div>
                             <div className="stagger-item p-6 border border-white/10 rounded-xl bg-black/40 flex gap-4">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Auditability</h4>
                                    <p className="text-sm text-muted-foreground">Every decision, AI or human, is logged. You get visibility you can trust.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="reveal-section py-24 px-6 relative z-10">
                 <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">How We Work</h2>
                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                        {[
                            { title: "Isolate the Wedge", desc: "Identify the one bottleneck where fatigue and exceptions are highest." },
                            { title: "Baseline the Leak", desc: "Quantify cycle time, error rate, reconciliation lag, and cost-to-serve." },
                            { title: "Map the Architecture", desc: "Define Reading vs Writing boundaries (and approval gates)." },
                            { title: "Deploy First Pipeline", desc: "Ship the wedge with logs, fallbacks, and rollback." },
                            { title: "Scale the Engine", desc: "Expand once ROI is proven and the operating model is stable." }
                        ].map((step, i) => (
                             <div key={i} className="relative z-10 pl-16">
                                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border border-white/20 flex items-center justify-center text-sm font-bold text-white/50">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
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
                        Build for <span className="text-primary">Scale</span> not Just <br/> Efficiency.
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30 minutes. One workflow map. Zero magic bullets.
                    </p>
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton 
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold hover:bg-white transition-colors"
                        >
                            Request a Workflow Diagnostic
                        </MagneticButton>
                    </a>
                </div>
            </section>
        </main>
    );
}
