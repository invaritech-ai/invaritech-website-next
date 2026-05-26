"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

type Variant = "broad" | "finance";

type Props = { variant: Variant; src?: string };

const COPY: Record<Variant, {
    title: string;
    meta: string;
    headline: React.ReactNode;
    supporting: string;
    deliverables: string[];
    secondaryLabel: string;
}> = {
    broad: {
        title: "Free finance exception audit",
        meta: "Free during launch",
        headline: (
            <>
                Show us the finance workflow your team
                checks <em className="italic text-primary">manually</em>.
            </>
        ),
        supporting:
            "We will identify the highest-value exception pattern and recommend the smallest useful first system to build. Free during launch for selected finance teams.",
        deliverables: [
            "Current workflow review",
            "Sample export review where available",
            "Manual exception check mapping",
            "Payment-control risk list",
            "Recommended first system",
            "Launch range + acceptance criteria",
        ],
        secondaryLabel: "Send a sample export",
    },
    finance: {
        title: "Book a Finance Exception Audit Call",
        meta: "Free for qualified companies. Paid $1k later.",
        headline: (
            <>
                Inspect one finance workflow. Find the highest-value exception to
                automate first.
            </>
        ),
        supporting:
            "You send us a sample AP export or a screen-share. We map the workflow, list the manual checks, rank the exceptions by risk and effort, and write a fixed-scope build estimate for the first system.",
        deliverables: [
            "Workflow map",
            "Manual check inventory",
            "Exception ranking",
            "Recommended first system",
            "Fixed-scope build estimate",
            "30-minute findings call",
        ],
        secondaryLabel: "Send a sample AP export",
    },
};

export function AuditCTASection({ variant, src }: Props) {
    const c = COPY[variant];
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">{c.title}</h2>
                    <span className="section-mark-meta">{c.meta}</span>
                </motion.header>

                <motion.div {...fadeUp} className="audit-cta-panel">
                    <div className="audit-cta-grid">
                        <div>
                            <h3 className="audit-cta-headline">{c.headline}</h3>
                            <p className="audit-cta-supporting">{c.supporting}</p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <AuditCTA location="mid" src={src} />
                                <AuditCTA
                                    location="mid"
                                    variant="secondary"
                                    label={c.secondaryLabel}
                                    src={src}
                                />
                            </div>
                        </div>

                        <ul className="audit-cta-list">
                            {c.deliverables.map((d) => <li key={d}>{d}</li>)}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
