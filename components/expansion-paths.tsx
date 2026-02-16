import Link from "next/link";
import { Network, Workflow, MessagesSquare, ServerCog, Target } from "lucide-react";

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
            "Connect data, approvals, and systems of record into a reliable pipeline.",
        href: "/services/ai-integration-services/",
    },
    {
        icon: MessagesSquare,
        title: "Enterprise AI Chatbot Deployment",
        description:
            "A governed interface: permissioned access, traceability, operating model.",
        href: "/services/enterprise-ai-chatbot-deployment/",
    },
    {
        icon: ServerCog,
        title: "Generative AI Backend Development",
        description:
            "Orchestration, evaluation, observability, latency and cost control.",
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
    return (
        <section className="relative overflow-hidden py-32 bg-[#030305] border-t border-white/5">
             {/* Void Background with simple noise */}
            <div className="absolute inset-0 -z-30 bg-[#030305]"></div>
            <div className="absolute inset-0 -z-20 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="mb-16 max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-8 bg-primary/60"></div>
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Phase 4: Scale
                        </p>
                    </div>
                    <h2 className="text-balance text-5xl font-bold leading-[0.9] md:text-7xl tracking-tight text-white">
                        THE SPRINT IS<br/>
                        <span className="text-white/40">JUST THE ENTRY POINT.</span>
                    </h2>
                    <p className="mt-8 text-white/60 text-lg leading-relaxed">
                        Once the wedge proves ROI, we expand the intelligence layer across the enterprise with workflow automation, integrations, governed assistants, and GenAI backend engineering.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paths.map((path) => (
                        <div
                            key={path.title}
                            className="group relative p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500"></div>
                            
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-white/10 bg-black/50 text-primary group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                                <path.icon className="h-5 w-5 relative z-10" />
                                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                {path.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-6 min-h-[60px]">
                                {path.description}
                            </p>
                            
                            <Link
                                href={path.href}
                                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors group/link"
                            >
                                <span className="w-4 h-px bg-primary/50 group-hover/link:w-8 transition-all duration-300"></span>
                                Explore
                            </Link>
                        </div>
                    ))}
                    
                    {/* "Connect the Dots" background graphic idea - simple SVG lines connecting cards? 
                        Maybe too complex for now, sticking to grid 
                    */}
                </div>
            </div>
        </section>
    );
}
