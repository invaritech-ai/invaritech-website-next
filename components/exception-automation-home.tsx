"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { AuditCTASection } from "@/components/home/audit-cta-section";
import { Colophon } from "@/components/home/colophon";
import { Footnotes } from "@/components/home/footnotes";
import { LiveOpsStrip } from "@/components/home/live-ops-strip";
import { Problem } from "@/components/home/problem";
import { ProofGrid } from "@/components/home/proof-grid";
import { RunLog } from "@/components/home/run-log";
import { ServiceMethod } from "@/components/home/service-method";
import { SystemsRegister } from "@/components/home/systems-register";
import { VarianceExhibitVideo } from "@/components/home/variance-exhibit-video";
import { WhyNotAccounting } from "@/components/home/why-not-accounting";
import { fadeUp, stagger } from "@/components/home/_motion";

/**
 * Exception Automation — homepage.
 *
 * Document aesthetic. The page reads like the front matter of a forensic
 * accounting audit deliverable. Copy is intentionally placeholder — locked
 * during rebrand, replaced in copy pass.
 *
 * Section order follows the Positioning DNA Doctrine §12.2:
 *   Hero → Problem → Use cases → How it works → Why custom → Proof → CTA
 */

// ─────────────────────────────────────────────────────────────────────
// 1. Cover Hero
// ─────────────────────────────────────────────────────────────────────

function CoverHero() {
    return (
        <section className="site-home-hero relative overflow-hidden lg:min-h-screen">
            <div className="doc-container relative flex flex-col pt-28 pb-12 md:pt-32 md:pb-14 lg:min-h-screen lg:pt-32 lg:pb-10">
                {/* Live operations strip */}
                <motion.div {...fadeUp} className="mb-10 lg:mb-12">
                    <LiveOpsStrip />
                </motion.div>

                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* Left — headline column */}
                    <div>
                        <motion.h1 {...stagger(1)} className="doc-hero-headline">
                            Your AP team should review{" "}
                            <em>exceptions</em>,<br />
                            not{" "}
                            <span className="doc-redline">
                                <span className="doc-redline-mark">strike</span>
                                check everything manually
                            </span>
                            hunt for them.
                        </motion.h1>

                        <motion.p
                            {...stagger(2)}
                            className="mt-10 max-w-xl text-lg leading-relaxed text-foreground-muted"
                        >
                            Invaritech builds finance exception automation systems
                            with agentic review interfaces. Fixed-scope builds for
                            finance teams that want to reduce manual checks, catch
                            payment-control risks, and move faster without adding
                            AP headcount.
                        </motion.p>

                        <motion.div
                            {...stagger(3)}
                            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                        >
                            <Link href="/contact" className="site-button px-7">
                                Book a free Finance Exception Audit
                                <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                            </Link>
                            <Link href="#exceptions" className="site-button-secondary px-7">
                                See what we automate
                            </Link>
                        </motion.div>

                        <motion.p
                            {...stagger(4)}
                            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle"
                        >
                            Free during launch · for selected finance teams
                        </motion.p>
                    </div>

                    {/* Right — variance exhibit + run log */}
                    <motion.aside {...stagger(2)} className="lg:pl-8">
                        <div className="grid gap-4">
                            <VarianceExhibitVideo />
                            <RunLog />
                        </div>
                    </motion.aside>
                </div>

                {/* Bottom rule strip */}
                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.5 }}
                    className="mt-12 border-y border-border py-4 lg:mt-10"
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                        Catch duplicate bills, vendor-detail changes, invoice
                        exceptions, and approval gaps. Before they become manual
                        work, payment leakage, or another AP hire.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// Page export
// ─────────────────────────────────────────────────────────────────────

export default function ExceptionAutomationHome() {
    return (
        <main className="site-page">
            <CoverHero />
            <Problem variant="broad" />
            <SystemsRegister />
            <ServiceMethod variant="broad" />
            <WhyNotAccounting />
            <ProofGrid variant="broad" />
            <AuditCTASection variant="broad" />
            <Footnotes />
            <Colophon />
        </main>
    );
}
