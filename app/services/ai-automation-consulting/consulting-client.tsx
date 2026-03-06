import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ArrowRight, ShieldCheck, Zap, BarChart3, Target, ClipboardCheck, Layers, FileText, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { BOOK_MEETING_URL } from "@/lib/marketing";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/services/ScrollReveal";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { consultingFaqs } from "@/lib/service-faqs";
import { FounderTrustSection } from "@/components/services/FounderTrustSection";
import { AssessmentTeaser } from "@/components/services/AssessmentTeaser";


export default function ConsultingClient() {
    return (
        <ScrollReveal className="min-h-screen bg-background relative overflow-hidden">
            <ServiceBackground theme="teal" />

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
                            AI AUTOMATION CONSULTING
                        </TextEffect>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-start mt-12">
                        <div className="md:w-2/3 border-l-2 border-primary/50 pl-8">
                            <p className="text-xl md:text-2xl text-white font-medium mb-6">
                                AI automation consulting for leadership teams who need clarity before committing capital.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                We identify the highest-ROI workflow wedge, define governance boundaries, and produce a build-ready execution plan. Every engagement ends with something your CTO can build, your COO can own, and your CEO can approve.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                If scope is already clear, go straight to the Sprint. Choose consulting when you have multiple automation ideas with no clear prioritisation, a compliance blocker, or stakeholders who disagree on what success looks like.
                            </p>
                            <p className="text-lg text-white/80 font-mono italic border-t border-white/10 pt-6">
                                &ldquo;If AI cannot be tied to a measurable operational objective, it should not be funded.&rdquo;
                            </p>
                        </div>
                        <div className="md:w-1/3 space-y-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-4">Best For</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Leadership teams with multiple automation ideas and no clear prioritisation, a compliance blocker, or stakeholders who disagree on success criteria.
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Typical Timeline</h3>
                                <p className="text-sm text-muted-foreground">2–4 week engagement, ending in a Sprint-ready execution spec.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">What Happens After</h3>
                                <p className="text-sm text-muted-foreground">Most clients proceed directly to the 30-Day Sprint. The spec is ready to build.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                                Book a Consulting Fit Call
                            </MagneticButton>
                        </a>
	                            <Link href="/services/ai-automation-sprint/">
	                            <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 text-lg hover:bg-white/10">
	                                View the 30-Day Sprint
	                            </MagneticButton>
	                        </Link>
                    </div>
                </div>
            </section>

            {/* What It Is NOT */}
            <section className="reveal-section py-6 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row gap-4 items-start">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/30 shrink-0 pt-1">Not this</span>
                        <div className="flex flex-wrap gap-3">
                            <span className="text-xs text-white/50 border border-white/10 px-3 py-1.5 font-mono">Not a strategy deck — we produce executable, Sprint-ready specs</span>
                            <span className="text-xs text-white/50 border border-white/10 px-3 py-1.5 font-mono">Not tool selection — we recommend based on workflow fit, then build</span>
                            <span className="text-xs text-white/50 border border-white/10 px-3 py-1.5 font-mono">Not innovation theater — every engagement ends with something buildable</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deliverables Section */}
            <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Execution-First Deliverables</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            We do not generate idea lists or innovation roadmaps. We deliver build-ready specifications.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-list">
                        {[
                            { title: "Ranked Opportunities", desc: "ROI + feasibility ranking for your AI automation initiatives.", icon: Target },
                            { title: "Margin Framing", desc: "Cost-to-serve analysis: what moves, and by how much.", icon: BarChart3 },
                            { title: "Governance Model", desc: "RBAC, approvals, and escalation paths defined clearly.", icon: ShieldCheck },
                            { title: "Risk Assessment", desc: "Data boundaries and integration risk evaluation.", icon: AlertCircle },
                            { title: "Architecture Advice", desc: "Build vs Buy vs Integrate recommendations for your stack.", icon: Layers },
                            { title: "Execution Spec", desc: "Sprint-ready specification with acceptance criteria and success metrics.", icon: FileText }
                        ].map((item, i) => (
                            <div key={i} className="stagger-item p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all hover:border-primary/40 group">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <p className="text-primary font-mono text-sm px-6 py-3 border border-primary/20 rounded-full inline-block bg-primary/5">
                            Outcome: Something your CTO can build, COO can own, and CEO can approve.
                        </p>
                    </div>
                </div>
            </section>

             {/* Why Most Fails Section */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <AlertCircle className="size-48 text-red-500" />
                        </div>
                        <div className="max-w-2xl">
	                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Most AI Automation Consulting Fails</h2>
	                            <p className="text-xl text-muted-foreground mb-12">
	                                Strategy without execution is cost without return. Most AI automation consulting stops at recommendations.
	                            </p>
                            <div className="grid sm:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono">The Standard Fluff</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2 text-sm text-white/60 line-through"><ArrowRight className="size-3" /> 40-slide decks</li>
                                        <li className="flex items-center gap-2 text-sm text-white/60 line-through"><ArrowRight className="size-3" /> High-level maps</li>
                                        <li className="flex items-center gap-2 text-sm text-white/60 line-through"><ArrowRight className="size-3" /> Generic playbooks</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-primary mb-4 font-mono">Our Production Path</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2 text-sm text-white"><Check className="size-3 text-primary" /> Delivery-first spec</li>
                                        <li className="flex items-center gap-2 text-sm text-white"><Check className="size-3 text-primary" /> Accountable ROI</li>
                                        <li className="flex items-center gap-2 text-sm text-white"><Check className="size-3 text-primary" /> Bounded execution</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-lg font-bold text-white">We design consulting to end where execution begins.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* When to Choose Section */}
            <section className="reveal-section py-24 px-6 relative z-10 border-y border-white/10 bg-black/20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">When to Choose Consulting</h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                If scope is already clear, go straight to the Sprint. Choose consulting when you need clarity first.
                            </p>
	                            <Link href="/services/ai-automation-sprint/">
	                                <MagneticButton className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-sm flex items-center gap-2">
	                                    Compare with the Sprint <ArrowRight className="w-4 h-4" />
	                                </MagneticButton>
	                            </Link>
                        </div>
                        <div className="space-y-4 stagger-list">
                            {[
                                "Multiple automation ideas but no prioritization",
                                "Compliance or security is blocking implementation",
                                "Stakeholders disagree on success criteria",
                                "You need risk classification before building",
                                "You’re unsure whether AI is even appropriate"
                            ].map((item, i) => (
                                <div key={i} className="stagger-item flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-xl">
                                    <div className="size-2 rounded-full bg-primary shrink-0" />
                                    <span className="text-white/90 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* Governance First Section */}
             <section className="reveal-section py-24 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest bg-primary/5">
                        Non-Negotiable
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Governance First</h2>
                    <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
                        Governance is not a compliance checkbox. It is a margin and reputation control system. AI automation consulting without governance is irresponsible.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-list text-left">
                        {[
                            { title: "Tolerance Levels", desc: "Assist vs recommend vs execute boundaries.", icon: Target },
                            { title: "Data Exposure", desc: "Strict boundaries for model training and access.", icon: Lock },
                            { title: "Fallbacks", desc: "Deterministic patterns for when models fail.", icon: Zap },
                            { title: "Audit Logs", desc: "Comprehensive logging and audit requirements.", icon: ClipboardCheck },
                            { title: "Cost Guardrails", desc: "Hard budget limits before hitting scale.", icon: BarChart3 },
                            { title: "Reputation Control", desc: "Ensuring brand safety in every automated step.", icon: ShieldCheck }
                        ].map((item, i) => (
                            <div key={i} className="stagger-item p-6 border border-white/5 rounded-2xl bg-black/40">
                                <div className="flex items-center gap-4 mb-4">
                                    <item.icon className="size-5 text-primary" />
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Work Section */}
            <section className="reveal-section py-24 px-6 relative z-10 bg-white/5 border-t border-white/10 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">The Path to Production</h2>
                    <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-white/10">
                        {[
                            { title: "Identify the Wedge", desc: "Pick the one workflow where friction and fatigue are highest." },
                            { title: "Baseline the Cost", desc: "Time, errors, cycle time, SLA, and cost-to-serve." },
                            { title: "Design the Boundaries", desc: "Governance, approvals, data exposure, and safe failure modes." },
                            { title: "Choose the Path", desc: "Build vs buy vs integrate, based on your constraints." },
                            { title: "Deliver the Spec", desc: "Build-ready plan with acceptance criteria and a Sprint track." }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 pl-16 group">
                                <div className="absolute left-0 top-0 size-10 rounded-full bg-background border border-white/20 flex items-center justify-center text-sm font-bold text-white/50 group-hover:border-primary group-hover:text-primary transition-colors">
                                    {i + 1}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FounderTrustSection />

            {/* FAQ */}
             <section className="reveal-section py-24 px-6 relative z-10 border-t border-white/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center font-mono tracking-tighter">FAQ</h2>
                    <FaqAccordion faqs={consultingFaqs} />
                </div>
            </section>

            <AssessmentTeaser />

             {/* Final CTA */}
             <section className="reveal-section py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
	                    <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter mix-blend-difference text-white">
	                        Let&apos;s Find Your <span className="text-primary">Wedge</span>.
	                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
                        30 minutes. One workflow map. Go / no-go.
                    </p>
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold hover:bg-white transition-colors"
                        >
                            Book a Consulting Fit Call
                        </MagneticButton>
                    </a>
                    <div className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/services/ai-automation-sprint/" className="text-sm font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Scope already clear? See the Sprint
                        </Link>
                        <Link href="/services/ai-workflow-automation-services/" className="text-sm font-mono tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Workflow optimisation
                        </Link>
                        <Link href="/blog/cash-flow-visibility-automation/" className="text-sm font-mono tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Finance workflow case study
                        </Link>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}
