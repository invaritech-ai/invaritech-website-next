import { ArrowRight, Check, Zap, Database, MessageSquare, Code, Cpu, Workflow } from "lucide-react";
import Link from "next/link";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { CoreThesisSection } from "@/app/components/services/core-thesis-section";
import { ServicesScrollReveal } from "@/components/services/ServicesScrollReveal";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { servicesFaqs } from "@/lib/service-faqs";
import { FounderTrustSection } from "@/components/services/FounderTrustSection";
import { AssessmentTeaser } from "@/components/services/AssessmentTeaser";
import { Button } from "@/components/ui/button";

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
        description: "Consulting that leads to execution. If it doesn't feed into Sprint or delivery, it stops.",
        outcome: "Wedge selection + governance model + delivery-ready acceptance criteria.",
        link: "/services/ai-automation-consulting/",
        cta: "View AI Automation Consulting",
        icon: Cpu,
    },
];

export default function ServicesPage() {
    return (
        <ServicesScrollReveal className="min-h-screen bg-background relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]" style={{ backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative z-10 hero-content">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            Production-Grade AI
                        </p>
                    </div>

                    <h1 className="font-editorial text-6xl md:text-[9rem] leading-[0.88] font-semibold tracking-tight mb-12 text-foreground max-w-6xl">
                        BUILD ON THE<br />
                        <span className="text-muted-foreground">INFRASTRUCTURE</span><br />
                        YOU ALREADY OWN.
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl border-l-2 border-primary/30 pl-6">
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                            Stop chasing demos. We layer governed AI systems over your existing ERP, CRM, and legacy tools to drive measurable ROI in weeks, not quarters.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-12">
                        <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold h-13 px-8">
                            <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                                {BOOK_MEETING_CTA}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Start Here */}
            <section className="py-24 px-6 relative z-10 border-t border-border bg-card">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-primary/60" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Start Here</p>
                    </div>

                    <div className="start-here-card group/sprint relative overflow-hidden border border-border bg-background hover:border-primary/30 transition-all duration-500">
                        <div className="grid md:grid-cols-2 items-stretch">
                            {/* Left */}
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary mb-6">30-Day Fixed Engagement</p>
                                <h2 className="font-editorial text-3xl md:text-5xl font-semibold mb-6">
                                    The AI Automation<br />
                                    <span className="text-primary">Sprint</span>
                                </h2>
                                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                                    One wedge. One build. One measurable delta.
                                </p>
                                <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold w-fit">
                                    <Link href="/services/ai-automation-sprint/" className="flex items-center gap-2">
                                        View the Sprint <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Right: sprint phases */}
                            <div className="border-t md:border-t-0 md:border-l border-border bg-card p-8 md:p-12 flex flex-col justify-center">
                                <div className="space-y-7">
                                    {[
                                        { week: "W1", phase: "Scope & Baseline", desc: "Identify one wedge. Define the measurable delta against a live baseline." },
                                        { week: "W2", phase: "Build", desc: "First working prototype running against your actual systems." },
                                        { week: "W3", phase: "Parallel Run", desc: "Live data validation alongside existing process. No cutover risk." },
                                        { week: "W4", phase: "Go-Live + Handoff", desc: "Production deploy. Operating runbook. Ownership fully transferred." },
                                    ].map((item, i) => (
                                        <div
                                            key={item.week}
                                            className="flex gap-5 items-start transition-transform duration-500 group-hover/sprint:translate-x-1.5"
                                            style={{ transitionDelay: `${i * 65}ms` }}
                                        >
                                            <div className="text-xs font-mono text-primary shrink-0 mt-0.5 tracking-widest pt-px">{item.week}</div>
                                            <div
                                                className="h-px bg-primary/30 mt-[9px] shrink-0 w-5 group-hover/sprint:bg-primary/60 transition-colors duration-500"
                                                style={{ transitionDelay: `${i * 65}ms` }}
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">{item.phase}</p>
                                                <p
                                                    className="text-xs text-muted-foreground font-mono leading-relaxed group-hover/sprint:text-foreground/70 transition-colors duration-500"
                                                    style={{ transitionDelay: `${i * 65}ms` }}
                                                >{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-border">
                                    <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.2em]">Fixed scope · Measurable output · 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Directory */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="h-[1px] w-8 bg-primary/60" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">All Services</p>
                    </div>

                    <div className="service-cards-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <Link
                                    href={service.link}
                                    key={service.title}
                                    className="service-card group relative p-8 border border-border bg-card hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="size-12 border border-border bg-background flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                            <Icon className="size-6 text-primary" />
                                        </div>
                                        <span className="text-[11px] font-mono text-muted-foreground/50">0{index + 1}</span>
                                    </div>

                                    <h3 className="font-editorial text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow text-[15px]">
                                        {service.description}
                                    </p>

                                    <div className="mt-auto space-y-6">
                                        <div className="pl-4 border-l border-primary/20 py-1">
                                            <p className="text-sm text-muted-foreground">
                                                Outcome: <span className="text-foreground">{service.outcome}</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center text-primary text-sm font-semibold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                            {service.cta} <ArrowRight className="ml-2 size-4" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Core Thesis */}
            <CoreThesisSection />

            {/* Fit Section */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Fit Assessment</span>
                        <div className="h-[1px] w-8 bg-primary/40" />
                    </div>
                    <h2 className="font-editorial text-3xl md:text-5xl font-semibold mb-12">Fit Assessment</h2>

                    <div className="border border-border bg-card p-8 md:p-12 mb-8 text-left">
                        <p className="text-xl md:text-2xl font-light mb-8 text-center text-foreground/90">
                            We&apos;re a fit if you can start within 1–2 weeks with:
                        </p>
                        <ul className="space-y-4 max-w-lg mx-auto mb-12">
                            {["A workflow owner", "Access to the systems involved", "A baseline we can measure against"].map((item) => (
                                <li key={item} className="flex items-center gap-4 text-lg text-muted-foreground">
                                    <div className="size-6 border border-primary/30 bg-primary/[0.06] flex items-center justify-center text-primary shrink-0">
                                        <Check className="size-4" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-center text-muted-foreground text-sm font-mono uppercase tracking-widest border-t border-border pt-8">
                            If that&apos;s not true yet, we&apos;ll tell you what&apos;s missing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Proof Section */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-border bg-card">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Selected Proof</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="group border border-border bg-background p-8 hover:border-primary/20 hover:bg-secondary/40 transition-colors">
                            <h3 className="font-editorial text-xl font-semibold text-foreground mb-2">EUDR Compliance Bridge</h3>
                            <p className="text-muted-foreground mb-4">Custom backend + system integration enabling high-volume regulatory submissions.</p>
                            <Link href="/work/eudr-compliance-bridge/" className="text-primary hover:text-foreground text-sm uppercase tracking-wider inline-flex items-center gap-2 font-mono transition-colors">
                                View Case Study <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="group border border-border bg-background p-8 hover:border-primary/20 hover:bg-secondary/40 transition-colors">
                            <h3 className="font-editorial text-xl font-semibold text-foreground mb-2">China Coast Community (Charity)</h3>
                            <p className="text-muted-foreground mb-4">Full-stack website rebuild with CRM-connected donation flow.</p>
                            <Link href="/work/" className="text-primary hover:text-foreground text-sm uppercase tracking-wider inline-flex items-center gap-2 font-mono transition-colors">
                                View Work <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <FounderTrustSection />

            {/* FAQ */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-card border-t border-border">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-16">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Common Questions</span>
                        <div className="h-[1px] w-8 bg-primary/40" />
                    </div>
                    <h2 className="font-editorial text-4xl font-semibold mb-16 text-center">FAQ</h2>
                    <FaqAccordion faqs={servicesFaqs} />
                </div>
            </section>

            <AssessmentTeaser />

            {/* Final CTA */}
            <section className="reveal-section py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Get Started</span>
                        <div className="h-[1px] w-8 bg-primary/40" />
                    </div>
                    <h2 className="font-editorial text-4xl md:text-7xl font-semibold mb-8 tracking-tight">
                        READY TO FIND YOUR<br />
                        <span className="text-primary">ROI WEDGE?</span>
                    </h2>

                    <div className="max-w-2xl mx-auto mb-12 space-y-6 text-muted-foreground text-lg md:text-xl font-light">
                        <p>
                            We don&apos;t do discovery calls that turn into sales pitches. This is a 30-minute diagnostic to identify one ROI wedge and confirm whether your stack is ready for intelligence layering.
                        </p>
                        <p className="text-sm font-mono text-primary/80 uppercase tracking-widest">
                            If it isn&apos;t, we&apos;ll tell you what&apos;s missing and why, for free.
                        </p>
                    </div>

                    <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold h-14 px-12 text-base">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            {BOOK_MEETING_CTA}
                        </a>
                    </Button>
                </div>
            </section>
        </ServicesScrollReveal>
    );
}
