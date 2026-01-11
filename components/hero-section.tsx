import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";

const transitionVariants = {
    hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            type: "spring" as const,
            bounce: 0.3,
            duration: 1.5,
        },
    },
};

export default function HeroSection() {
    return (
        <>
            <div className="overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
                >
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section className="relative min-h-screen flex items-center">
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        delayChildren: 1,
                                    },
                                },
                            },
                            item: {
                                hidden: {
                                    opacity: 0,
                                    y: 20,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            },
                        }}
                        className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-0 -z-20"
                    >
                        <Image
                            src="/hero-bg.jpg"
                            alt="INVARITECH digital solutions background"
                            className="size-full object-cover object-top invert dark:invert-0"
                            fill
                            sizes="100vw"
                            priority
                        />
                    </AnimatedGroup>

                    <div
                        aria-hidden
                        className="absolute inset-0 -z-10 size-full [background:linear-gradient(to_bottom,transparent_0%,transparent_20%,var(--color-background)_85%),radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
                    />

                    <div className="relative w-full pt-24 md:pt-36 pb-24 md:pb-36">
                        <div className="mx-auto max-w-7xl px-3 sm:px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <TextEffect
                                    per="char"
                                    preset="fade-in-blur"
                                    as="p"
                                    className="mx-auto mb-4 block w-full max-w-2xl text-balance text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base"
                                >
                                    Your vision, intelligently executed
                                </TextEffect>
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="h1"
                                    className="mx-auto mt-0 max-w-full sm:max-w-4xl text-balance text-4xl max-md:font-semibold md:text-6xl xl:text-5xl"
                                >
                                    Time is your most valuable asset. Reclaim
                                    it.
                                </TextEffect>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mx-auto mt-8 max-w-full sm:max-w-2xl text-balance text-lg"
                                >
                                    We permanently remove repetitive work so the
                                    same team frees hours that translate into
                                    revenue.
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        item: transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
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
                                            <a
                                                href="https://calendly.com/hello-invaritech/30min"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="text-nowrap">
                                                    Reclaim your time
                                                </span>
                                            </a>
                                        </Button>
                                    </div>
                                    <div
                                        key={2}
                                        className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                                    >
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="rounded-xl px-5 text-base"
                                        >
                                            <Link href="/work/">
                                                <span className="text-nowrap">
                                                    See our work
                                                </span>
                                            </Link>
                                        </Button>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
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
                                        src="/app.webp"
                                        alt="INVARITECH application interface showcasing premium digital solutions"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup> */}
                    </div>
                </section>
            </div>
        </>
    );
}
