"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Zap, Database, MessageSquare, Code, Cpu, Workflow } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "AI PoC Development Services",
        description: "A 30-day Sprint to ship one governed AI PoC with time-to-value as the product.",
        outcome: "A working pilot or deployment-ready automation tied to a measurable baseline.",
        link: "/services/ai-automation-sprint/",
        cta: "View AI PoC Development Services",
        icon: Zap,
    },
    {
        title: "Workflow Automation Consulting Services",
        description: "Operational liquidity for teams stuck in handoffs, exceptions, and manual coordination.",
        outcome: "Shorter cycle time, earlier exception surfacing, less reconciliation drag.",
        link: "/services/ai-workflow-automation-services/",
        cta: "View Workflow Automation Consulting",
        icon: Workflow,
    },
    {
        title: "AI Integration Services",
        description: "Connect data, tools, and approvals into a reliable production pipeline. No replatforming; just AI working inside your current stack.",
        outcome: "AI features that work inside systems of record (not beside them).",
        link: "/services/ai-integration-services/",
        cta: "View AI Integration Services",
        icon: Database,
    },
    {
        title: "AI Chatbot Development Services",
        description: "A governed enterprise chatbot people trust: permissioned access, traceability, operating model.",
        outcome: "Faster answers, fewer escalations, consistent guidance across teams and languages.",
        link: "/services/enterprise-ai-chatbot-deployment/",
        cta: "View AI Chatbot Development",
        icon: MessageSquare,
    },
    {
        title: "Generative AI Development Services",
        description: "Deep engineering for production GenAI: orchestration, evaluation, observability, latency and cost control.",
        outcome: "An AI backend you can operate, measure, and evolve safely.",
        link: "/services/generative-ai-backend-development/",
        cta: "View Generative AI Development",
        icon: Code,
    },
    {
        title: "AI Automation Consulting Services",
        description: "Consulting that leads to execution. If it doesn’t feed into Sprint or delivery, it stops.",
        outcome: "Wedge selection + governance model + delivery-ready acceptance criteria.",
        link: "/services/ai-automation-consulting/",
        cta: "View AI Automation Consulting",
        icon: Cpu,
    },
];

const faqs = [
    {
        question: "Do you replace our systems?",
        answer: "No. We layer intelligence and automation on top of what you already run.",
    },
    {
        question: "Do you do AI strategy only?",
        answer: "Only when it leads into Sprint execution or a delivery track.",
    },
    {
        question: "Can you work with our internal engineers?",
        answer: "Yes. We can integrate with your team or deliver end-to-end.",
    },
    {
        question: "Do you support multilingual deployments?",
        answer: "Yes, including governed chat and workflows.",
    },
    {
        question: "Are you expensive?",
        answer: "We’re priced for accountability. If we can’t identify an ROI that significantly outweighs our fee during discovery, we won’t take your money.",
    },
];

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useGSAP(() => {
        // Hero entrance
        gsap.fromTo(".hero-content > *", 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.2, // Faster
                stagger: 0.05, // Faster stagger
                ease: "power4.out",
            }
        );

        // "Start Here" entrance
        gsap.fromTo(".start-here-card", 
            { y: 60, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".start-here-card",
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.2, // Max speed as requested
                ease: "power2.out",
            }
        );

        // Rolling Counter for "30"
        if (counterRef.current) {
            const counterObj = { value: 0 };
            gsap.to(counterObj, {
                value: 30,
                duration: 0.5, // Kept slightly longer so it's visible, but fast
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".start-here-card",
                    start: "top 85%",
                },
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.innerText = Math.ceil(counterObj.value).toString();
                    }
                }
            });
        }

        // Thesis items
        gsap.fromTo(".thesis-item", 
            { x: -20, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".thesis-item",
                    start: "top 85%",
                },
                x: 0,
                opacity: 1,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.out",
            }
        );

        // Method steps
        gsap.fromTo(".method-step", 
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".method-step",
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.2,
                stagger: 0.05,
                ease: "power3.out",
            }
        );

        // Service cards stagger
        // Using fromTo ensures they don't get stuck at opacity: 0 if logic fails
        gsap.fromTo(".service-card", 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".service-cards-grid",
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.out",
            }
        );

        // Generic section fades
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
            <ArtisticBackground />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative z-10 hero-content">
                <div className="max-w-[1800px] mx-auto">
                    <TextEffect
                        per="char"
                        preset="fade"
                        className="text-xs md:text-sm font-mono tracking-[0.2em] text-primary mb-8 block"
                    >
                        PRODUCTION-GRADE AI
                    </TextEffect>

                    <h1 className="text-[8vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter mb-12 mix-blend-difference text-white max-w-6xl">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            BUILD ON THE
                        </TextEffect>
                        <br />
                        <span className="text-white/50">INFRASTRUCTURE</span>
                        <br />
                        <TextEffect per="word" preset="slide" className="inline-block" delay={0.5}>
                            YOU ALREADY OWN.
                        </TextEffect>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl border-l-2 border-primary/50 pl-6">
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                            Stop chasing demos. We layer governed AI systems over your existing ERP, CRM, and legacy tools to drive measurable ROI in weeks, not quarters.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                                {BOOK_MEETING_CTA}
                            </MagneticButton>
                        </a>
                        <Link href="/results/">
                            <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 text-lg hover:bg-white/10 transition-colors">
                                See Work / Results
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Start Here Section */}
            <section className="py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Badge variant="outline" className="border-primary text-primary px-3 py-1 uppercase tracking-wider">
                            Start Here
                        </Badge>
                        <div className="h-px bg-white/10 flex-grow" />
                    </div>

                    <div className="start-here-card group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-primary/30">
                        <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    The 30-Day <br />
                                    <span className="text-primary">AI Automation Sprint</span>
                                </h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    One wedge. One build. One measurable delta.
                                </p>
                                <Link href="/services/ai-automation-sprint/">
                                    <MagneticButton className="bg-white/10 hover:bg-white/20 border-white/10 text-white px-8 py-4">
                                        View the Sprint <ArrowRight className="ml-2 w-5 h-5" />
                                    </MagneticButton>
                                </Link>
                            </div>
                            <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
                                <div className="text-center p-6 relative z-10">
                                    <div className="text-6xl font-bold text-white/20 mb-2">
                                        <span ref={counterRef}>0</span>
                                    </div>
                                    <div className="text-sm font-mono uppercase tracking-widest text-primary">Day Cycle</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Thesis & Method */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
                    {/* Core Thesis */}
                    <div>
                        <h2 className="text-2xl font-mono text-primary mb-8 tracking-widest uppercase">
                            Core Thesis: Layered Intelligence
                        </h2>
                        <div className="space-y-8 text-lg text-muted-foreground">
                            <p>
                                Most AI projects fail because they start by replacing systems of record.
                            </p>
                            <p className="text-white font-medium text-xl">
                                We do the opposite:
                            </p>
	                            <ul className="space-y-4">
	                                <li className="thesis-item flex items-start gap-3">
	                                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
	                                    <span>Keep your stack intact.</span>
	                                </li>
	                                <li className="thesis-item flex items-start gap-3">
	                                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
	                                    <span>Add an intelligence layer where it creates measurable leverage.</span>
	                                </li>
	                                <li className="thesis-item flex items-start gap-3">
	                                    <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
	                                    <span>Govern it like production software: permissions, logs, fallbacks, rollback.</span>
	                                </li>
	                            </ul>
	                            <p>
	                                <span className="block">
	                                    Start with{" "}
	                                    <Link
	                                        href="/services/ai-automation-sprint/"
	                                        className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-primary/70 hover:text-primary transition-colors"
	                                    >
	                                        AI PoC development services
	                                    </Link>{" "}
	                                    to validate one measurable wedge on top of your existing stack, without replatforming.
	                                </span>
	                                <span className="block mt-4">
	                                    If you need a lower-friction entry point with strict governance, deploy{" "}
	                                    <Link
	                                        href="/services/enterprise-ai-chatbot-deployment/"
	                                        className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-primary/70 hover:text-primary transition-colors"
	                                    >
	                                        AI chatbot development services
	                                    </Link>{" "}
	                                    as the interface: permissioned, auditable, and cost-controlled.
	                                </span>
	                                <span className="block mt-4">
	                                    Once ROI is proven, expand with{" "}
	                                    <Link
	                                        href="/services/ai-workflow-automation-services/"
	                                        className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-primary/70 hover:text-primary transition-colors"
	                                    >
	                                        workflow automation consulting services
	                                    </Link>{" "}
	                                    and{" "}
	                                    <Link
	                                        href="/services/ai-integration-services/"
	                                        className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-primary/70 hover:text-primary transition-colors"
	                                    >
	                                        AI integration services
	                                    </Link>{" "}
	                                    to operationalize the system across teams and systems of record.
	                                </span>
	                                <span className="block mt-4">
	                                    When scale is the constraint, implement{" "}
	                                    <Link
	                                        href="/services/generative-ai-backend-development/"
	                                        className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-primary/70 hover:text-primary transition-colors"
	                                    >
	                                        generative AI development services
	                                    </Link>{" "}
	                                    and{" "}
	                                    <Link
	                                        href="/services/ai-automation-consulting/"
	                                        className="text-white underline decoration-white/20 underline-offset-4 hover:decoration-primary/70 hover:text-primary transition-colors"
	                                    >
	                                        AI automation consulting services
	                                    </Link>{" "}
	                                    to harden architecture, control unit cost, and protect margins.
	                                </span>
	                            </p>
	                            <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl mt-8">
	                                <p className="text-white font-bold">
	                                    We do not burn money on AI where simpler systems work better.
	                                </p>
	                            </div>
	                        </div>
                    </div>

                    {/* Method */}
                    <div>
                        <h2 className="text-2xl font-mono text-primary mb-8 tracking-widest uppercase">
                            The Invaritech Method
                        </h2>
                        <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                            {[
                                {
                                    step: "Identify",
                                    desc: "Define the ROI wedge: one workflow, one owner, one baseline, one acceptance criteria."
                                },
                                {
                                    step: "Validate",
                                    desc: "Ship a working pilot under real constraints with governance built in."
                                },
                                {
                                    step: "Scale",
                                    desc: "Turn the pilot into durable production: automation across teams, integrations across systems, governed assistants, and GenAI backend engineering."
                                }
                            ].map((method, i) => (
                                <div key={method.step} className="method-step relative z-10 pl-16">
                                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border border-white/20 flex items-center justify-center text-sm font-bold text-white/50">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{method.step}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{method.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Directory */}
            <section className="py-24 px-6 relative z-10 bg-black/20">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex items-center justify-between mb-16">
                         <h2 className="text-[5vw] font-bold leading-none opacity-20">
                            SERVICES
                        </h2>
                    </div>

                    <div className="service-cards-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <Link 
                                    href={service.link} 
                                    key={service.title}
                                    className="service-card group relative p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon className="size-6 text-primary" />
                                        </div>
                                        <span className="text-xs font-mono text-white/20">0{index + 1}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                                        {service.description}
                                    </p>
                                    
                                    <div className="mt-auto space-y-6">
                                        <div className="pl-4 border-l border-white/10 py-1">
                                            <p className="text-sm text-white/70 italic">
                                                Outcome: <span className="text-white">{service.outcome}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center text-primary text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                            {service.cta} <ArrowRight className="ml-2 size-4" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Fit Section */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">Fit Assessment</h2>
                    
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8 text-left">
                        <p className="text-xl md:text-2xl font-light mb-8 text-center text-white/90">
                            We’re a fit if you can start within 1–2 weeks with:
                        </p>
                        <ul className="space-y-4 max-w-lg mx-auto mb-12">
                            {["A workflow owner", "Access to the systems involved", "A baseline we can measure against"].map((item) => (
                                <li key={item} className="flex items-center gap-4 text-lg text-muted-foreground">
                                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                        <Check className="size-4" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-center text-white/60 text-sm font-mono uppercase tracking-widest border-t border-white/10 pt-8">
                            If that’s not true yet, we’ll tell you what’s missing.
                        </p>
                    </div>
                </div>
            </section>

             {/* Proof Section */}
             <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-mono text-primary mb-12 tracking-widest uppercase">
                        Selected Proof
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                         <div className="group border border-white/10 bg-black/40 p-8 rounded-2xl hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-2">EUDR Compliance Bridge</h3>
                            <p className="text-muted-foreground mb-4">Custom backend + system integration enabling high-volume regulatory submissions.</p>
                            <Link href="/work/eudr-compliance-bridge/" className="text-primary hover:underline text-sm uppercase tracking-wider inline-flex items-center">
                                View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                         </div>
                         <div className="group border border-white/10 bg-black/40 p-8 rounded-2xl hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-2">China Coast Community (Charity)</h3>
                            <p className="text-muted-foreground mb-4">Full-stack website rebuild with CRM-connected donation flow.</p>
                            <Link href="/work/" className="text-primary hover:underline text-sm uppercase tracking-wider inline-flex items-center">
                                View Work <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                         </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center">FAQ</h2>
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
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">
                        READY TO FIND YOUR <br />
                        <span className="text-primary">ROI WEDGE?</span>
                    </h2>
                    
                    <div className="max-w-2xl mx-auto mb-12 space-y-6 text-muted-foreground text-lg md:text-xl font-light">
                        <p>
                            We don’t do discovery calls that turn into sales pitches. This is a 30-minute diagnostic to identify one ROI wedge and confirm whether your stack is ready for intelligence layering.
                        </p>
                        <p className="text-sm font-mono text-primary/80 uppercase tracking-widest">
                            If it isn’t, we’ll tell you what’s missing and why, for free.
                        </p>
                    </div>

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
