import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
// import { SystemDiagram } from "@/components/ui/system-diagram";
import { HeroHeader } from "./header";
import { ArrowRight } from "lucide-react";

const transitionVariants = {
    hidden: {
        opacity: 0,
        filter: "blur(8px)",
        y: 8,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.2,
            duration: 0.4,
        },
    },
};

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
                >
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <div className="mask-b-from-35% mask-b-to-90% absolute inset-0 -z-20">
                            <Image
                                src="/hero-bg.jpg"
                                alt="INVARITECH digital solutions background"
                                className="size-full object-cover object-top invert dark:invert-0"
                                fill
                                sizes="100vw"
                                priority
                            />
                        </div>

                        <div
                            aria-hidden
                            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                        />

                        <div className="mx-auto max-w-7xl px-3 sm:px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <div className="mx-auto mt-8 max-w-full sm:max-w-2xl text-balance text-sm font-medium relative">
                                    <div className="relative inline-block">
                                        <Link
                                            href="/solutions"
                                            className="group bg-foreground/10 rounded-full px-4 py-2 border border-border/50 shadow-lg hover:bg-foreground/15 transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
                                        >
                                            <TextEffect
                                                preset="fade-in-blur"
                                                speedSegment={0.8}
                                                as="span"
                                                className="relative text-foreground font-medium drop-shadow-[0_0_6px_rgba(var(--foreground),0.3)]"
                                            >
                                                Your vision, intelligently
                                                executed
                                            </TextEffect>
                                            <div className="w-px h-4 bg-foreground/60"></div>
                                            <div className="w-4 h-4 rounded-full border border-foreground/60 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-200 relative overflow-hidden">
                                                {/* Default arrow */}
                                                <ArrowRight
                                                    size={8}
                                                    className="text-foreground transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0"
                                                />
                                                {/* Hover arrow (inverted) */}
                                                <ArrowRight
                                                    size={8}
                                                    className="text-background absolute transition-all duration-300 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.8}
                                    delay={0.1}
                                    as="h1"
                                    className="mx-auto mt-4 max-w-full sm:max-w-2xl text-balance text-2xl max-md:font-semibold md:text-2xl lg:mt-8 xl:text-5xl"
                                >
                                    Intelligent automation for growth companies
                                </TextEffect>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.8}
                                    delay={0.2}
                                    as="p"
                                    className="mx-auto mt-8 max-w-full sm:max-w-2xl text-balance text-lg"
                                >
                                    Cut 30 hours per person in 60 days. Or save
                                    $50,000 per month on average.*
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.02,
                                                    delayChildren: 0.2,
                                                },
                                            },
                                        },
                                        item: transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row"
                                >
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                                    >
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-5 text-base"
                                        >
                                            <Link href="/assessment">
                                                <span className="text-nowrap">
                                                    Get your Ops Efficiency
                                                    Score
                                                </span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <div
                                        key={2}
                                        className="bg-foreground/5 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                                    >
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                            className="rounded-xl px-5 text-base"
                                        >
                                            <Link href="/ops-efficiency-sprint#demo-plan">
                                                <span className="text-nowrap">
                                                    See the 6‑week Demo Plan
                                                </span>
                                            </Link>
                                        </Button>
                                    </div>
                                </AnimatedGroup>

                                {/* System Diagram - Hidden */}
                                {/* <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.3,
                                                },
                                            },
                                        },
                                        item: transitionVariants,
                                    }}
                                    className="mt-16"
                                >
                                    <SystemDiagram />
                                </AnimatedGroup> */}
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.02,
                                            delayChildren: 0.25,
                                        },
                                    },
                                },
                                item: transitionVariants,
                            }}
                        >
                            <div className="mask-b-from-55% relative mr-0 mt-8 overflow-hidden px-1 sm:px-2 sm:mt-12 md:mt-20">
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-2 sm:p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <Image
                                        className="bg-background aspect-15/8 relative rounded-2xl scale-x-[-1]"
                                        src="/app.png"
                                        alt="INVARITECH application interface showcasing premium digital solutions"
                                        width="2700"
                                        height="1440"
                                        priority
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>
        </>
    );
}
