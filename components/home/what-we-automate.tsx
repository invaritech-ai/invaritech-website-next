"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { fadeUp } from "./_motion";

const CARDS = [
    {
        eyebrow: "Focus area",
        title: "Finance exception checks",
        body: "Duplicate bills, vendor changes, approval gaps, invoice and PO matching, payment-control rules.",
        href: "/finance-exception-automation",
        cta: "See finance systems",
    },
    {
        eyebrow: "Adjacent",
        title: "Regulatory document workflows",
        body: "Multi-document submission, evidence capture, exception routing across a hundred-plus document types.",
        href: "/work/eudr-compliance-bridge",
        cta: "See EUDR case study",
    },
    {
        eyebrow: "Adjacent",
        title: "Operations approval gaps",
        body: "Approvals scattered across messaging, email, and spreadsheets. Routed for review with evidence attached.",
        href: "/work",
        cta: "See selected work",
    },
];

export function WhatWeAutomate() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        We automate the checks around your systems of record.
                    </h2>
                    <span className="section-mark-meta">Where work happens between systems</span>
                </motion.header>

                <div className="what-we-automate-grid">
                    {CARDS.map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link href={c.href} className="what-we-automate-card">
                                <span className="what-we-automate-eyebrow">{c.eyebrow}</span>
                                <h3 className="what-we-automate-title">{c.title}</h3>
                                <p className="what-we-automate-body">{c.body}</p>
                                <span className="what-we-automate-cta">
                                    {c.cta} <span aria-hidden>↗</span>
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
