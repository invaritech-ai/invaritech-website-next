"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { LiveOpsStrip } from "./live-ops-strip";
import { RunLog } from "./run-log";
import { VarianceExhibitVideo } from "./variance-exhibit-video";
import { fadeUp, stagger } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

type Variant = "homepage" | "landing";

type Props = {
    variant: Variant;
    /** Optional override; when omitted the component picks copy from variant. */
    secondaryHref?: string;
};

const COPY: Record<Variant, {
    headlineLines: React.ReactNode;
    subhead: string;
    primaryLabel: string;
    primaryLocation: "hero";
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    trustLine: string;
    bottomStrip: string;
}> = {
    homepage: {
        headlineLines: (
            <>
                AI workflow automation for{" "}
                <em>document-heavy</em>
                <br />
                operations.
            </>
        ),
        subhead:
            "Invaritech builds custom automation systems for finance, compliance, and operations teams that need to move faster without adding headcount.",
        primaryLabel: "Explore Finance Automation",
        primaryLocation: "hero",
        primaryHref: "/finance-exception-automation",
        secondaryLabel: "Try the matcher demo",
        secondaryHref: "/glossary/three-way-match/",
        trustLine:
            "Built for teams using accounting systems, regulatory portals, document workflows, and approval chains.",
        bottomStrip:
            "Finance exception automation · regulatory document workflows · operations approval gaps · evidence capture. Built around existing systems, not on top of them.",
    },
    landing: {
        headlineLines: (
            <>
                Move faster without
                <br />
                adding <em>AP headcount</em>.
            </>
        ),
        subhead:
            "We build AI-powered finance exception systems that catch invoice mismatches, duplicate bills, vendor-detail changes, and approval gaps before payment release.",
        primaryLabel: "Book a Finance Workflow Audit",
        primaryLocation: "hero",
        primaryHref: "/contact?audit=1",
        secondaryLabel: "Try the 3-Way Matching Demo",
        secondaryHref: "/glossary/three-way-match/",
        trustLine:
            "Built for growing businesses using accounting systems, spreadsheets, email approvals, and document-heavy finance workflows.",
        bottomStrip:
            "Catch duplicate bills, vendor-detail changes, invoice exceptions, and approval gaps. Before they become manual work, payment leakage, or another AP hire.",
    },
};

export function CoverHero({ variant }: Props) {
    const c = COPY[variant];

    return (
        <section className="site-home-hero relative overflow-hidden lg:min-h-screen">
            <div className="doc-container relative flex flex-col pt-28 pb-12 md:pt-32 md:pb-14 lg:min-h-screen lg:pt-32 lg:pb-10">
                <motion.div {...fadeUp} className="mb-10 lg:mb-12">
                    <LiveOpsStrip />
                </motion.div>

                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    <div>
                        <motion.h1 {...stagger(1)} className="doc-hero-headline">
                            {c.headlineLines}
                        </motion.h1>

                        <motion.p
                            {...stagger(2)}
                            className="mt-10 max-w-xl text-lg leading-relaxed text-foreground-muted"
                        >
                            {c.subhead}
                        </motion.p>

                        <motion.div
                            {...stagger(3)}
                            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                        >
                            <AuditCTA
                                location="hero"
                                label={c.primaryLabel}
                                href={c.primaryHref}
                            />
                            <Link href={c.secondaryHref} className="site-button-secondary audit-cta-secondary">
                                {c.secondaryLabel}
                            </Link>
                        </motion.div>

                        <motion.p
                            {...stagger(4)}
                            className="home-trust-line mt-6"
                        >
                            {c.trustLine}
                        </motion.p>
                    </div>

                    <motion.aside {...stagger(2)} className="lg:pl-8">
                        <div className="grid gap-4">
                            <VarianceExhibitVideo />
                            <RunLog />
                        </div>
                    </motion.aside>
                </div>

                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.5 }}
                    className="mt-12 border-y border-border py-4 lg:mt-10"
                >
                    <p className="home-bottom-strip">{c.bottomStrip}</p>
                </motion.div>
            </div>
        </section>
    );
}
