import { Shield, Activity, Gauge, Ban, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const outcomes = [
    {
        icon: Activity,
        title: "One Real Bottleneck",
        description:
            "We scope one failure point that’s draining margin or capacity.",
    },
    {
        icon: Gauge,
        title: "One Production Automation",
        description:
            "A governed AI layer runs on top of your current systems with operator visibility.",
    },
    {
        icon: Shield,
        title: "One Measurable Delta",
        description:
            "Baseline vs. after is validated so decisions are made on proof, not opinion.",
    },
];

const noList = [
    {
        icon: Server,
        text: "No ERP or CRM replacement",
    },
    {
        icon: Lock,
        text: "No vendor lock-in licensing",
    },
    {
        icon: Ban,
        text: "No broad transformation programme",
    },
];

export default function WhatWeDoSection() {
    return (
        <section id="what-we-do" className="relative -mt-8 pb-24 pt-32 md:pb-32 md:pt-40 overflow-hidden">
            {/* Void Background with simple noise */}
            <div className="absolute inset-0 -z-30 bg-[#030305]"></div>
            <div className="absolute inset-0 -z-20 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
            
            {/* Scanner Beam - CSS Animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm animate-[scan_8s_ease-in-out_infinite] opacity-50 pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="text-white sticky top-32">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60"></div>
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Phase 1: The Wedge
                            </p>
                        </div>
                        
                        <h2 className="text-balance text-5xl font-bold leading-[0.9] md:text-7xl tracking-tight">
                            30-DAY<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">DROP-IN SPRINT</span>
                        </h2>
                        
                        <p className="mt-8 max-w-xl text-lg text-white/60 leading-relaxed">
                            Not a broad transformation program. We isolate <span className="text-white font-semibold">one bottleneck workflow</span>, build a governed AI layer over your existing tools, and validate impact against an agreed baseline in four weeks.
                        </p>

                        <div className="mt-12 p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                            <div className="rounded-xl bg-black/80 backdrop-blur-xl p-6 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <Ban className="w-12 h-12 text-red-500/50" />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">
                                    Explicitly Out of Scope
                                </p>
                                <div className="space-y-4">
                                    {noList.map((item) => (
                                        <div key={item.text} className="flex items-center gap-3 text-sm text-white/70">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {outcomes.map((item, index) => (
                            <div
                                key={item.title}
                                className={`group relative p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-primary/30 ${
                                    index === 0 ? "md:min-h-[280px]" : ""
                                }`}
                            >
                                <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity text-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed max-w-md">
                                    {item.description}
                                </p>
                                
                                {/* Corner accent */}
                                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-primary/0 border-r-primary/0 group-hover:border-b-primary/20 group-hover:border-r-primary/20 transition-all duration-300"></div>
                            </div>
                        ))}

                        <div className="mt-8 p-8 border border-primary/20 bg-primary/5 relative overflow-hidden group hover:border-primary/40 transition-colors">
                            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Ready to verify fit?</h3>
                                    <p className="text-sm text-white/60">Review scope, guardrails, and prerequisites before you book.</p>
                                </div>
                                <Button asChild size="lg" className="rounded-none bg-primary text-black hover:bg-white font-bold">
                                    <Link href="/services/ai-automation-sprint/">
                                        View Sprint Details
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
