import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import Link from "next/link";

const proofSignals = [
    {
        title: "Compliance Backend Automation",
        detail:
            "A regulated workflow moved from manual handling into a fully auditable production flow with rollback controls.",
        metric: "Thousands of submissions compressed into minutes",
        image: "/eudr-preview.webp",
        href: "/work/eudr-compliance-bridge/",
    },
    {
        title: "Existing Stack, Smarter Throughput",
        detail:
            "Custom logic layered over existing tools removed re-keying and delay chains while preserving core systems.",
        metric: "Zero replatforming required",
        image: "/app.webp",
        href: "/work/",
    },
    {
        title: "Operating Model Discipline",
        detail:
            "Each sprint closes with ownership, baseline comparison, and handover so internal teams can operate safely.",
        metric: "Before and after KPI validation",
        image: "/ccc-isometric.webp",
        href: "/work/",
    },
];

export default function SelectedWorkSection() {
    return (
        <section className="relative overflow-hidden py-32 bg-[#030305]">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60"></div>
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Phase 2: The Build
                            </p>
                        </div>
                        <h2 className="text-balance text-5xl font-bold leading-[0.9] md:text-7xl tracking-tight text-white mb-6">
                            PROOF OF<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-400/50">LEVERAGE</span>
                        </h2>
                        <p className="text-white/60 max-w-xl text-lg">
                            Outcomes you can defend in a governance review. Real production deltas, not demo-ware.
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <Button asChild variant="outline" size="lg" className="rounded-none border-white/10 bg-transparent text-white hover:bg-white hover:text-black transition-colors">
                            <Link href="/work/">View All Work</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-6">
                    {proofSignals.map((signal, index) => (
                        <Link
                            key={signal.title}
                            href={signal.href}
                            className={`group relative overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-500 block ${
                                index === 0 ? "md:col-span-4 aspect-[16/9]" : "md:col-span-2 aspect-square md:aspect-auto"
                            } ${index === 2 ? "md:col-span-3 aspect-[16/8]" : ""} ${index === 1 ? "md:col-span-2" : ""}`}
                        >
                            <Image
                                src={signal.image}
                                alt={signal.title}
                                fill
                                className="object-cover transition duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            
                            {/* Cinematic Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-wider">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                    {signal.metric}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {signal.title}
                                </h3>
                                <p className="text-white/60 text-sm max-w-md line-clamp-2 group-hover:text-white/80 transition-colors">
                                    {signal.detail}
                                </p>
                            </div>
                            
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                                <ArrowUpRight className="w-8 h-8 text-white" />
                            </div>
                        </Link>
                    ))}
                    
                    {/* Filler Card for Grid Balance if needed, or just keep as is */}
                     <div className="md:col-span-3 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 flex flex-col justify-center items-start group hover:border-primary/40 transition-colors">
                         <h3 className="text-3xl font-bold text-white mb-4">Start Your Sprint</h3>
                         <p className="text-white/60 mb-8 max-w-sm">
                             Ready to build your own proof point? Book a fit assessment to identify your wedge.
                         </p>
                         <Button asChild size="lg" className="rounded-none bg-primary text-black hover:bg-white font-bold">
                             <a href={BOOK_MEETING_URL} target="_blank">
                                 {BOOK_MEETING_CTA}
                             </a>
                         </Button>
                     </div>
                </div>
            </div>
        </section>
    );
}
