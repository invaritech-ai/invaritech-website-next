import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ArrowRight, X, Clock, ShieldCheck, Zap, Server, Database } from "lucide-react";
import Link from "next/link";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/services/ScrollReveal";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { sprintFaqs } from "@/lib/service-faqs";
import { FounderTrustSection } from "@/components/services/FounderTrustSection";
import { AssessmentTeaser } from "@/components/services/AssessmentTeaser";

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


export default function SprintClient() {
    return (
        <ScrollReveal className="min-h-screen bg-background relative overflow-hidden">
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
                            <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest rounded-none">
                                Service Offering
                            </Badge>
                            <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-bold tracking-tighter text-foreground">
                                <TextEffect per="word" preset="slide" className="inline-block">
                                    AI POC
                                </TextEffect>
                                <br />
                                <span className="text-foreground/30">DEVELOPMENT SERVICES</span>
                            </h1>
                        </div>
                        <div className="md:max-w-md md:mb-4">
                            <p className="text-xl md:text-2xl font-light text-foreground mb-4">
                                Move from prototype to production in 30 days.
                            </p>
                            <p className="text-muted-foreground">
                                Detailed scope. Measurable delta. Governance built in.
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-border pt-12 grid md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                <strong className="text-foreground">AI PoC development services for teams that need proof, not hype.</strong><br/>
                                In 30 days, we deliver one scoped, production-ready automation on top of your existing systems — governance baked in and a measurable before/after delta. Starts with a focused discovery and readiness check. If leadership alignment is missing, we handle that first.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                                    <MagneticButton className="bg-primary text-primary-foreground px-8 py-4 text-lg font-bold hover:bg-foreground transition-colors">
                                        See If You Qualify
                                    </MagneticButton>
                                </a>
                            </div>
                            <p className="mt-6 text-sm text-muted-foreground/60 font-mono">
                                Limited capacity. Best fit if we can start within 2 weeks.
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground/50 font-mono uppercase tracking-widest">
                                Ideal for: COOs, CTOs, Heads of Product, Ops leaders
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-card border border-border p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Best For</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    COOs, CTOs, and ops leaders who need one measurable automation in 30 days — not a roadmap, a result.
                                </p>
                            </div>
                            <div className="bg-card border border-border p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Typical Timeline</h3>
                                <p className="text-sm text-muted-foreground">Discovery (Days 1–7) → Build (Days 8–21) → Hardening (Days 22–27) → Validation + Handover (Days 28–30).</p>
                            </div>
                            <div className="bg-card border border-border p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">What Happens After</h3>
                                <p className="text-sm text-muted-foreground">Runbook, operating model, and measurable delta. Most clients expand to the next wedge or move to workflow automation.</p>
                            </div>
                            <div className="bg-primary/[0.06] border border-primary/20 p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Engagement</h3>
                                <p className="text-sm text-muted-foreground">Fixed-scope. Starts at <span className="text-foreground font-semibold">USD $10,000</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The "Week 2" Reality */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-card border-y border-border">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/3">
                            <h2 className="font-editorial text-3xl font-semibold mb-4 text-foreground">The &quot;Week 2&quot; Reality</h2>
                            <p className="text-muted-foreground">The Sprint is capped at 30 days provided these prerequisites are met.</p>
                        </div>
                        <div className="md:w-2/3 stagger-list space-y-6">
                            {[
                                { text: "System access (accounts/API keys/SSO) granted by Day 3", icon: Clock },
                                { text: "A workflow owner available for decisions", icon: ShieldCheck },
                                { text: "Access to representative data to baseline impact", icon: Database }
                            ].map((item, i) => (
                                <div key={i} className="stagger-item flex items-start gap-4 p-4 bg-background border border-border">
                                    <div className="bg-primary/10 p-2 text-primary">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-foreground pt-1">{item.text}</p>
                                </div>
                            ))}
                            <p className="stagger-item text-sm text-destructive/80 font-mono pt-4 border-t border-border">
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
                            <h2 className="font-editorial text-4xl font-semibold mb-8 text-foreground">Who It&apos;s For</h2>
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
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-12 p-6 border border-border bg-card">
                                <p className="text-foreground/70 italic">
                                    &ldquo;If engagement cannot begin within 2 weeks, this is not a fit.&rdquo;
                                </p>
                            </div>
                            <div className="mt-6 p-6 border border-border bg-card">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Not A Fit If</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground stagger-list">
                                    {[
                                        "You want a \"magic bullet\" to fix every organizational problem at once",
                                        "Your primary goal is to replace humans rather than scale their output",
                                        "You believe a production-grade system can be built over a weekend",
                                        "You want open-ended AI without explicit constraints and approvals",
                                    ].map((item) => (
                                        <li key={item} className="stagger-item flex gap-2">
                                            <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" /> {item}
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
                                    <div key={i} className="stagger-item p-6 border border-border hover:border-primary/30 transition-colors bg-card">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">{trigger.role}</span>
                                        <p className="text-foreground font-light">&ldquo;{trigger.quote}&rdquo;</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deliverables */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-card border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center">
                         <h2 className="font-editorial text-4xl font-semibold mb-4 text-foreground">What You Get</h2>
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
                            <div key={i} className="stagger-item bg-background border border-border p-8 hover:border-primary/20 transition-colors group">
                                <div className="size-12 bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/15 transition-colors">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Governance & Guardrails */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="font-editorial text-4xl font-semibold mb-6 text-foreground">Governance &amp; Guardrails</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We don&apos;t ship open-ended &ldquo;autonomous agents&rdquo; to make business-critical decisions.
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
                                <div key={item} className="stagger-item flex items-start gap-3 p-4 bg-card border border-border">
                                    <div className="bg-primary/10 p-2 text-primary shrink-0">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <p className="text-foreground pt-1">{item}</p>
                                </div>
                            ))}
                            <p className="stagger-item text-xs text-muted-foreground/70 font-mono pt-4 border-t border-border">
                                Outcome: production-grade behavior your team can operate and trust, not a demo that collapses under real constraints.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Real Bottlenecks */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-card border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-editorial text-4xl font-semibold mb-16 text-foreground">Real Bottlenecks We Fix</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {bottlenecks.map((item, i) => (
                            <div key={i} className="border-l-2 border-primary/30 pl-6 py-2 hover:border-primary transition-colors">
                                <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
                                <ul className="space-y-2 mb-6">
                                    {item.items.map((sub, j) => (
                                        <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span> {sub}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs font-mono text-muted-foreground/60">{item.metric}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stack Compatibility */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="font-editorial text-3xl font-semibold mb-6 text-foreground">Stack Compatibility</h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        We ship on top of your existing stack. We don&apos;t ask you to replatform.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {["AWS", "Azure", "GCP", "Postgres", "SQL", "ERP", "CRM", "Helpdesk", "Internal APIs", "Webhooks"].map(tech => (
                            <span key={tech} className="px-4 py-2 border border-border bg-card text-sm text-foreground/80 font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="inline-block p-4 bg-destructive/[0.06] border border-destructive/20 text-destructive text-sm">
                        <strong>No-go:</strong> Closed platforms with no API, legacy on-prem with no gateway, or black-box data access.
                    </div>
                </div>
            </section>

            {/* Sprint Structure - Timeline */}
            <section className="reveal-section py-32 px-6 relative z-10 bg-card border-y border-border">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="font-editorial text-4xl md:text-5xl font-semibold mb-6 text-foreground">The Sprint Structure</h2>
                        <p className="text-xl text-muted-foreground font-light">Buffered, real-world safe. Executed in 4 phases.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent transform md:-translate-x-1/2" />
                        <div className="space-y-12 md:space-y-24">
                            {[
                                { phase: "01", title: "Discovery & Assessment", days: "Days 1–7", desc: "Identify highest-ROI wedge. Define success criteria.", output: "Build spec + baseline plan." },
                                { phase: "02", title: "Targeted Build", days: "Days 8–21", desc: "Core logic and integrations under real constraints.", output: "Working pilot in staging." },
                                { phase: "03", title: "Hardening & Governance", days: "Days 22–27", desc: "Access control, audit logs, failure modes.", output: "Production-grade behavior." },
                                { phase: "04", title: "Validation & Handover", days: "Days 28–30", desc: "Validate KPI movement. Hand over operating model.", output: "Measurable result + roadmap." }
                            ].map((step, i) => (
                                <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-24 text-left' : 'md:pr-24 md:text-right'}`}>
                                        <div className="inline-block mb-4">
                                            <span className="text-xs font-mono font-bold text-primary border border-primary/30 bg-primary/[0.06] px-3 py-1 uppercase tracking-wider">
                                                {step.days}
                                            </span>
                                        </div>
                                        <h3 className="font-editorial text-3xl font-semibold text-foreground mb-4">{step.title}</h3>
                                        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{step.desc}</p>
                                        <p className="text-sm font-mono text-muted-foreground border-t border-border pt-4 inline-block">
                                            <span className="text-primary">Output:</span> {step.output}
                                        </p>
                                    </div>
                                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-background border-2 border-primary transform md:-translate-x-1/2 flex items-center justify-center z-10">
                                        <div className="w-2 h-2 bg-primary" />
                                    </div>
                                    <div className="hidden md:block md:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                     <h2 className="font-editorial text-3xl font-semibold mb-12 text-center text-foreground">Why The Sprint?</h2>
                     <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 border border-border bg-card opacity-60 hover:opacity-100 transition-opacity">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Internal R&amp;D</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex gap-2"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> Slow cycles</li>
                                <li className="flex gap-2"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> Unclear ownership</li>
                                <li className="flex gap-2"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> Prototypes die before production</li>
                            </ul>
                        </div>
                        <div className="p-8 border border-border bg-card opacity-60 hover:opacity-100 transition-opacity">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Big Consulting</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li className="flex gap-2"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> Expensive &quot;strategy&quot;</li>
                                <li className="flex gap-2"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> No accountable build</li>
                                <li className="flex gap-2"><X className="w-4 h-4 text-destructive shrink-0 mt-0.5" /> Months of slide decks</li>
                            </ul>
                        </div>
                        <div className="p-8 border border-primary/40 bg-primary/[0.04] transform md:-translate-y-4 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                Recommended
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-4">The Sprint</h3>
                            <ul className="space-y-4 text-sm text-foreground">
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 30-day cap</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Governed delivery</li>
                                <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Measurable validation</li>
                            </ul>
                            <div className="mt-8 pt-8 border-t border-border">
                                <p className="text-sm text-muted-foreground/60 mb-2">Investment</p>
                                <p className="text-2xl font-bold text-foreground">$10k – $15k USD</p>
                                <p className="text-sm font-mono text-muted-foreground mb-1">($78k – $117k HKD)</p>
                                <p className="text-xs text-muted-foreground/60 leading-relaxed">For a tightly scoped, high-impact wedge. Complex enterprise builds are priced based on depth and integration scale.</p>
                            </div>
                        </div>
                     </div>
                </div>
            </section>

            <FounderTrustSection />

            {/* FAQ */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-card border-y border-border">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-editorial text-4xl font-semibold mb-12 text-center text-foreground">FAQ</h2>
                    <FaqAccordion faqs={sprintFaqs} />
                </div>
            </section>

            <AssessmentTeaser />

            {/* Final CTA */}
            <section className="reveal-section py-32 px-6 relative z-10 border-t border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-editorial text-5xl md:text-7xl font-semibold mb-8 tracking-tight text-foreground">
                        SEE IF YOU <span className="text-primary">QUALIFY</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30-minute diagnostic. One ROI wedge. Go / no-go. <br/>
                        <span className="text-sm mt-4 block text-muted-foreground/50 font-mono uppercase tracking-widest">Ideal for: COOs, CTOs, Heads of Product, Ops leaders</span>
                    </p>
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton
                            strength={0.3}
                            className="bg-primary text-primary-foreground px-12 py-6 text-xl font-bold hover:bg-foreground transition-colors"
                        >
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                    <div className="mt-12 pt-12 border-t border-border flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/services/ai-workflow-automation-services/" className="text-sm font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Scale with Workflow Automation
                        </Link>
                        <Link href="/services/ai-integration-services/" className="text-sm font-mono tracking-widest uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Need system integration?
                        </Link>
                        <Link href="/blog/cash-flow-visibility-automation/" className="text-sm font-mono tracking-widest uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> See cash visibility use case
                        </Link>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}
