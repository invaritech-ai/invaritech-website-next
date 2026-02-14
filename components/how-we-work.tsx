import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { MagneticButton } from "@/components/ui/MagneticButton";

const sprintPhases = [
    {
        week: "Week 1",
        title: "System and Bottleneck Audit",
        description:
            "Map one high-cost workflow and lock baseline metrics, risk boundaries, and owner accountability.",
        output: "Automation spec + risk boundaries",
    },
    {
        week: "Week 2",
        title: "Drop-In AI Build",
        description:
            "Implement the AI logic layer with deterministic guardrails and minimally invasive integration pathways.",
        output: "Working automation in staging",
    },
    {
        week: "Week 3",
        title: "Production Hardening",
        description:
            "Add access controls, logging, monitoring, rollback paths, and failure-mode coverage.",
        output: "Production-ready automation",
    },
    {
        week: "Week 4",
        title: "Deployment and Handover",
        description:
            "Deploy live, validate KPI movement, and hand over operational guidance to internal teams.",
        output: "Automation running + measurable result",
    },
];

export default function HowWeWorkSection() {
    return (
        <section className="relative overflow-hidden bg-[#050507] py-32 border-t border-white/5">
            {/* Background Details */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
            
            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60"></div>
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Phase 3: Delivery System
                            </p>
                        </div>
                        <h2 className="text-balance text-5xl font-bold leading-[0.9] md:text-7xl tracking-tight text-white">
                            FOUR WEEKS.<br/>
                            <span className="text-primary">MEASURED IMPACT.</span>
                        </h2>
                        <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl">
                            Structured enough for governance and fast enough for momentum. A deterministic pipeline from bottleneck audit to production, with baseline and handover built in.
                        </p>
                    </div>
                    
                    <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
                        <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Fixed Engagement Fee</p>
                        <div className="text-2xl font-bold text-white">$10,000-$15,000 USD</div>
                        <div className="text-sm text-white/40 mt-1">$78,000-$117,000 HKD</div>
                    </div>
                </div>

                <div className="relative grid gap-8 md:grid-cols-4">
                    {/* Circuit Line */}
                    <div className="absolute top-12 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 hidden md:block"></div>

                    {sprintPhases.map((phase) => (
                        <div key={phase.week} className="relative group">
                            {/* Node */}
                            <div className="w-4 h-4 rounded-full bg-[#050507] border-2 border-primary relative z-10 mb-8 mx-auto md:mx-0 transition-transform group-hover:scale-150 duration-300">
                                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                            </div>
                            
                            <div className="pt-8 md:pt-4 border-l md:border-l-0 border-primary/20 pl-8 md:pl-0 ml-2 md:ml-0 relative">
                                <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary/80 mb-3">
                                    {phase.week}
                                </p>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                    {phase.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6 h-20">
                                    {phase.description}
                                </p>
                                
                                <div className="p-3 bg-white/5 border border-white/5 text-xs text-white/80 font-mono">
                                    <span className="text-primary mr-2">➜</span> {phase.output}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <a
                        href={BOOK_MEETING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <MagneticButton
                            strength={0.3}
                            className="bg-primary text-black px-16 py-8 text-xl font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,198,46,0.2)] rounded-none"
                            textClassName="group-hover:text-black tracking-wide"
                        >
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                </div>
            </div>
        </section>
    );
}
