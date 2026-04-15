"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const proofSignals = [
    {
        title: "Compliance Backend Automation",
        detail:
            "A regulated workflow moved from manual handling into a fully auditable production flow with rollback controls.",
        metric: "Thousands of submissions compressed into minutes",
        image: "/eudr-preview.webp",
        href: "/work/",
        category: "Automation",
    },
    {
        title: "Existing Stack, Smarter Throughput",
        detail:
            "Custom logic layered over existing tools removed re-keying and delay chains while preserving core systems.",
        metric: "Zero replatforming required",
        image: "/app.webp",
        href: "/work/",
        category: "Integration",
    },
    {
        title: "China Coast Community",
        detail:
            "Modernizing operational flow and donor engagement for a premier elderly care charity in Hong Kong.",
        metric: "Live Site",
        image: "/ccc-isometric.webp",
        href: "https://www.chinacoastcommunity.org.hk",
        category: "Web & Automation",
    },
];

export default function SelectedWorkSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".sw-header", {
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider-full" />

            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="sw-header flex items-center gap-3 mb-6">
                            <span className="text-[11px] font-mono text-primary/50">03</span>
                            <div className="h-[1px] w-6 bg-primary/30" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                Phase 2: The Build
                            </p>
                        </div>
                        <h2 className="sw-header font-editorial text-5xl font-semibold leading-[0.9] md:text-7xl tracking-tight text-foreground mb-6">
                            Proof of<br />
                            <span className="text-primary">Leverage</span>
                        </h2>
                        <p className="sw-header text-muted-foreground max-w-xl text-lg">
                            Outcomes and controls you can defend internally. Production-grade delivery with auditability, fallbacks, and measurable deltas.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild variant="outline" size="lg" className="rounded-none border-border bg-transparent text-foreground hover:bg-foreground hover:text-background transition-colors">
                            <Link href="/work/">View All Work</Link>
                        </Button>
                    </div>
                </div>

                <div className="sw-grid grid gap-6 md:grid-cols-6">
                    {proofSignals.map((signal, index) => (
                        <Link
                            key={signal.title}
                            href={signal.href}
                            className={cn(
                                "sw-card group relative overflow-hidden bg-card border border-border hover:border-primary/20 transition-all duration-500 block w-full",
                                index === 0 ? "md:col-span-4 aspect-[16/10] md:aspect-[16/9]" : "md:col-span-2 aspect-square md:aspect-auto",
                                index === 2 && "md:col-span-3 md:aspect-[16/8]",
                                index === 1 && "md:col-span-2"
                            )}
                        >
                            <Image
                                src={signal.image}
                                alt={signal.title}
                                fill
                                className="object-cover transition duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                                <div className="flex flex-col gap-2 mb-3">
                                    <span className="text-primary text-[10px] font-mono uppercase tracking-[0.3em]">
                                        {signal.category}
                                    </span>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/25 bg-primary/10 text-primary text-xs font-mono tracking-wider w-fit">
                                        <div className="w-1 h-1 bg-primary" />
                                        {signal.metric}
                                    </div>
                                </div>
                                <h3 className="font-editorial text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                                    {signal.title}
                                </h3>
                                <p className="text-white/70 text-sm max-w-md line-clamp-2 group-hover:text-white/90 transition-colors">
                                    {signal.detail}
                                </p>
                            </div>

                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                                <ArrowUpRight className="w-7 h-7 text-white" />
                            </div>
                        </Link>
                    ))}

                    <div className="sw-card md:col-span-3 bg-primary/[0.04] border border-primary/15 p-8 flex flex-col justify-center items-start group hover:border-primary/30 transition-colors">
                        <h3 className="font-editorial text-3xl font-semibold text-foreground mb-4">Start Your Sprint</h3>
                        <p className="text-muted-foreground mb-8 max-w-sm">
                            Ready to build your own proof point? Book a 30-minute diagnostic to identify one ROI wedge.
                        </p>
                        <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold">
                            <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                                {BOOK_MEETING_CTA}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
