import Link from "next/link";
import { ArrowRight } from "lucide-react";

const outputs = [
    { label: "Viability Score", desc: "Is this worth building?" },
    { label: "Readiness Score", desc: "Is your stack ready?" },
    { label: "Risk Index", desc: "Complexity + error profile" },
    { label: "ROI Projection", desc: "Hours saved + cost avoided" },
    { label: "Automation Archetype", desc: "Your strategic position" },
];

export default function AssessmentBannerSection() {
    return (
        <section className="relative py-24 bg-[#030305] border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
            {/* Ambient glow */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-center">

                    {/* Left: pitch */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Free Assessment — 2 min
                            </p>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-6 text-white">
                            FIND YOUR<br />
                            <span className="text-primary">ROI WEDGE.</span>
                        </h2>

                        <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-10">
                            Before you commit to a build, score your workflow&apos;s automation
                            potential. We calculate Viability, Readiness, and Risk — then
                            give you a projected monthly ROI and your Automation Archetype.
                        </p>

                        <Link href="/assessment/">
                            <button className="group relative px-8 py-4 bg-primary text-black font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_35px_rgba(255,198,46,0.2)]">
                                <span className="relative z-10 flex items-center">
                                    Score My Readiness
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>

                    {/* Right: output preview card */}
                    <div className="border border-white/10 bg-white/[0.03] p-8">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-primary/60 mb-6">
                            What you receive
                        </div>
                        <div className="space-y-0">
                            {outputs.map((o, i) => (
                                <div
                                    key={i}
                                    className="flex items-start justify-between py-4 border-b border-white/5 last:border-0 group"
                                >
                                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                        {o.label}
                                    </span>
                                    <span className="text-xs text-white/30 font-mono text-right max-w-[140px]">
                                        {o.desc}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            Free · No subscription · Instant results
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
