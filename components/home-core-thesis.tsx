"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type ThesisPoint = {
    id: string;
    title: string;
    detail: string;
};

const points: ThesisPoint[] = [
    {
        id: "stack-intact",
        title: "Keep your stack intact.",
        detail: "No rip-and-replace. We work with what you already run.",
    },
    {
        id: "measurable-leverage",
        title: "Add intelligence where it creates measurable leverage.",
        detail: "Target one bottleneck with a named owner and an agreed baseline.",
    },
    {
        id: "govern-like-software",
        title: "Govern it like production software.",
        detail: "Access control, audit trails, fallbacks, and rollback paths are not “phase two.”",
    },
];

export default function HomeCoreThesis() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 110,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-black py-20 md:py-32"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(65%_70%_at_10%_20%,rgba(255,198,46,0.12),transparent_60%),radial-gradient(60%_70%_at_85%_40%,rgba(58,255,213,0.08),transparent_65%)]" />
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="max-w-3xl text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/90">
                            Core Thesis
                        </p>
                        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.95] md:text-6xl">
                            Layered intelligence beats replacement.
                        </h2>
                        <p className="mt-5 max-w-2xl text-lg text-white/75">
                            Most AI projects fail because they start by
                            replacing systems of record. We do the opposite:
                            keep what runs the business, then add an
                            intelligence layer exactly where it creates
                            leverage.
                        </p>
                    </div>

                    <div className="hidden lg:block text-right">
                        <div className="inline-block border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 backdrop-blur">
                            A thesis you can defend in governance reviews.
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* Spine - Pulsing Energy Beam */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-white to-primary shadow-[0_0_30px_rgba(255,140,0,0.6)] md:left-1/2 md:-translate-x-1/2 rounded-full"
                    />
                    
                    {/* Beam Head */}
                    <motion.div 
                        style={{ top: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }) }} // Approximate tracking
                        className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-4 h-12 bg-primary blur-lg opacity-50 -translate-y-full"
                    />

                    <div className="space-y-16 md:space-y-24 py-10">
                        {points.map((point, index) => (
                            <SpineCard
                                key={point.id}
                                point={point}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-20 rounded-none border border-primary/20 bg-primary/5 p-8 text-center text-white backdrop-blur md:mt-32">
                    <p className="text-balance text-3xl font-bold md:text-5xl tracking-tight">
                        We don’t burn money on AI where simpler systems work
                        better.
                    </p>
                </div>
            </div>
        </section>
    );
}

function SpineCard({ point, index }: { point: ThesisPoint; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={cn(
                "relative md:flex md:items-center md:justify-between",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            {/* Dot + connector */}
            <div className="absolute left-4 top-7 h-3 w-3 rounded-full border border-white/25 bg-black md:left-1/2 md:-translate-x-1/2">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    className="h-full w-full rounded-full bg-primary"
                />
            </div>
            <div className="absolute left-4 top-7 h-px w-10 bg-white/15 md:hidden" />

            <motion.div
                initial={{
                    opacity: 0,
                    x: isEven ? -26 : 26,
                    filter: "blur(12px)",
                }}
                animate={{
                    opacity: isInView ? 1 : 0,
                    x: isInView ? 0 : isEven ? -26 : 26,
                    filter: isInView ? "blur(0px)" : "blur(12px)",
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="ml-12 max-w-xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] md:ml-0 md:w-[46%] hover:border-primary/30 transition-colors duration-500"
            >
                <h3 className="text-2xl font-bold leading-tight md:text-4xl tracking-tight mb-4">
                    {point.title}
                </h3>
                <p className="text-base text-white/70 md:text-lg leading-relaxed font-light">
                    {point.detail}
                </p>
            </motion.div>

            <div className="hidden md:block md:w-[46%]" />
        </div>
    );
}
