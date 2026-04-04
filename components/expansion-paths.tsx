"use client";

import Link from "next/link";
import { Network, Workflow, MessagesSquare, ServerCog, Target } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const paths = [
    {
        icon: Workflow,
        title: "Workflow Automation Consulting",
        description:
            "Reduce handoffs, exceptions, and reconciliation drag across teams.",
        href: "/services/ai-workflow-automation-services/",
    },
    {
        icon: Network,
        title: "AI Integration Services",
        description:
            "Connect data, approvals, and systems of record into one governed, auditable pipeline—no point-to-point duct tape.",
        href: "/services/ai-integration-services/",
    },
    {
        icon: MessagesSquare,
        title: "Enterprise AI Chatbot Deployment",
        description:
            "A governed assistant that answers from your own data—permissioned access, full audit trails, and operator controls built in.",
        href: "/services/enterprise-ai-chatbot-deployment/",
    },
    {
        icon: ServerCog,
        title: "Generative AI Backend Development",
        description:
            "Production-grade AI backend engineering: versioned model routing, eval harnesses, observability, and cost guardrails.",
        href: "/services/generative-ai-backend-development/",
    },
    {
        icon: Target,
        title: "AI Automation Consulting",
        description:
            "Strategy that leads to execution: wedge selection, governance, acceptance criteria.",
        href: "/services/ai-automation-consulting/",
    },
];

export default function ExpansionPathsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ep-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 28,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });

            gsap.from(".ep-card", {
                scrollTrigger: {
                    trigger: ".ep-grid",
                    start: "top 85%",
                    once: true,
                },
                opacity: 0,
                y: 20,
                duration: 0.45,
                stagger: 0.07,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider-full" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="mb-16 max-w-3xl">
                    <div className="ep-header flex items-center gap-3 mb-6">
                        <span className="text-[11px] font-mono text-primary/50">05</span>
                        <div className="h-[1px] w-6 bg-primary/30" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            Phase 4: Scale
                        </p>
                    </div>
                    <h2 className="ep-header font-editorial text-5xl font-semibold leading-[0.9] md:text-7xl tracking-tight text-foreground">
                        The Sprint Is<br />
                        <span className="text-muted-foreground">Just the Entry Point.</span>
                    </h2>
                    <p className="ep-header mt-8 text-muted-foreground text-lg leading-relaxed">
                        Once the wedge validates ROI, we expand the intelligence layer—more workflows, more systems, more teams—until automation becomes a structural advantage, not a one-off project.
                    </p>
                </div>

                <div className="ep-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {paths.map((path) => (
                        <div
                            key={path.title}
                            className="ep-card group relative p-8 border border-border bg-card hover:border-primary/20 transition-all duration-400"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/30 transition-all duration-500" />

                            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center border border-border bg-secondary/50 text-primary group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                                <path.icon className="h-4 w-4 relative z-10" />
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </div>

                            <h3 className="font-editorial text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                {path.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[60px]">
                                {path.description}
                            </p>

                            <Link
                                href={path.href}
                                className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors group/link"
                            >
                                <span className="w-3 h-[1px] bg-primary/40 group-hover/link:w-6 transition-all duration-300" />
                                Explore
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
