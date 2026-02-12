import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import {
    BOOK_MEETING_CTA,
    BOOK_MEETING_URL,
    BRAND_EYEBROW,
} from "@/lib/marketing";

const transitionVariants = {
    hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 14,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 1.1,
        },
    },
};

const proofPoints = [
    "One bottleneck, one production automation",
    "No migration and no vendor lock-in",
    "Guardrails, fallbacks, and rollback paths",
    "Before/after KPI validation",
];

export default function HeroSection() {
    return (
        <section className="relative isolate overflow-hidden pb-28 pt-28 md:pb-36 md:pt-36">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-30">
                <div className="absolute inset-0 bg-[linear-gradient(125deg,#031714_0%,#0a3830_48%,#03100e_100%)] dark:bg-[linear-gradient(125deg,#02110f_0%,#0b2c27_48%,#010707_100%)]" />
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:52px_52px]" />
                <div className="absolute -left-16 top-10 h-96 w-96 rounded-full bg-primary/35 blur-3xl" />
                <div className="absolute -right-16 top-36 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 right-0 h-52 bg-[linear-gradient(180deg,transparent_0%,#041916_70%,#05201b_100%)]" />
            </div>

            <div className="mx-auto max-w-7xl px-3 sm:px-6">
                <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
                    <div className="text-white">
                        <TextEffect
                            per="char"
                            preset="fade-in-blur"
                            as="p"
                            className="mb-5 block text-sm font-medium uppercase tracking-[0.26em] text-white/80 md:text-base"
                        >
                            {BRAND_EYEBROW}
                        </TextEffect>

                        <TextEffect
                            preset="fade-in-blur"
                            speedSegment={0.45}
                            as="h1"
                            className="max-w-4xl text-balance text-5xl font-semibold leading-[0.9] md:text-7xl xl:text-[5.45rem]"
                        >
                            Enterprise AI Automation Without Disruption
                        </TextEffect>

                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.4}
                            delay={0.35}
                            as="p"
                            className="mt-8 max-w-2xl text-balance text-xl text-white/85"
                        >
                            We add intelligence to your existing systems safely,
                            incrementally, and measurably.
                        </TextEffect>

                        <div className="mt-7 inline-flex items-center rounded-full border border-primary/50 bg-primary/20 px-5 py-2 text-sm font-medium text-white">
                            £8,000-£12,000 per sprint · fixed scope for faster
                            internal approval
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.62,
                                        },
                                    },
                                },
                                item: transitionVariants,
                            }}
                            className="mt-9"
                        >
                            <div className="inline-block rounded-2xl border border-white/45 bg-white/10 p-1 backdrop-blur">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_35px_rgba(45,219,188,0.35)] hover:bg-primary/90"
                                >
                                    <a
                                        href={BOOK_MEETING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {BOOK_MEETING_CTA}
                                    </a>
                                </Button>
                            </div>
                        </AnimatedGroup>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.04,
                                            delayChildren: 0.86,
                                        },
                                    },
                                },
                                item: transitionVariants,
                            }}
                            className="mt-8 grid gap-3 sm:grid-cols-2"
                        >
                            {proofPoints.map((point) => (
                                <div
                                    key={point}
                                    className="rounded-xl border border-white/25 bg-black/25 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-md"
                                >
                                    {point}
                                </div>
                            ))}
                        </AnimatedGroup>
                    </div>

                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.45,
                                    },
                                },
                            },
                            item: transitionVariants,
                        }}
                        className="relative"
                    >
                        <div className="relative rounded-[2rem] border border-white/15 bg-black/35 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-6">
                            <div className="mb-4 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-white">
                                <span>30-Day Drop-In AI Automation Sprint</span>
                                <span className="rounded-full border border-primary/45 bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                                    Live Build
                                </span>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-white/15">
                                <Image
                                    className="aspect-[16/10] object-cover"
                                    src="/app.webp"
                                    alt="INVARITECH automation dashboard"
                                    width="1600"
                                    height="1000"
                                    priority
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(58,255,213,0.35),transparent_32%)]" />
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs font-medium text-white/90">
                                    Week 1: Bottleneck audit + KPI baseline
                                </div>
                                <div className="rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-xs font-medium text-white/90">
                                    Week 2-4: Build, harden, deploy
                                </div>
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(70%_70%_at_50%_45%,rgba(9,51,44,0.95)_0%,rgba(8,31,28,0.8)_45%,transparent_100%)] blur-2xl"
            />
        </section>
    );
}
