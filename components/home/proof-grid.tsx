"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { fadeUp } from "./_motion";

type Variant = "broad" | "finance-emphasis";

type Exhibit = {
    label: string;
    meta: string;
    title: string;
    body: string;
    proves: string;
    href: string;
};

const FINANCE: Exhibit[] = [
    {
        label: "Case study",
        meta: "2025",
        title: "EUDR Compliance Bridge",
        body: "Regulatory document workflow with REST/SOAP integration, evidence capture, and exception routing across a hundred-plus document types.",
        proves: "Complex document workflows",
        href: "/work/eudr-compliance-bridge",
    },
    {
        label: "Live demo",
        meta: "Interactive",
        title: "Three-Way Matcher",
        body: "Compare invoices, POs, and goods receipts in the browser. Surfaces every canonical AP exception type against sample data.",
        proves: "Finance exception logic",
        href: "/glossary/three-way-match/",
    },
    {
        label: "Live tool",
        meta: "Free",
        title: "Invoice Extractor",
        body: "Upload a supplier invoice PDF; extract structured fields, vendor metadata, and line items for downstream rule application.",
        proves: "Document intelligence pipeline",
        href: "/resources/invoice-extractor",
    },
    {
        label: "Interactive",
        meta: "Reference",
        title: "Supplier Payment Control Rule Table",
        body: "Filter, severity-rank, and configure payment-control rules against a sample AP register.",
        proves: "Rule library + exception logic",
        href: "/resources/supplier-payment-control-rule-table",
    },
];

const ADJACENT: Exhibit[] = [
    {
        label: "Capability",
        meta: "Workflow",
        title: "Inventory Workflow Automation",
        body: "Messaging-driven inventory operations workflows with structured-data capture and approval routing.",
        proves: "Messaging-driven workflows",
        href: "/work",
    },
    {
        label: "Capability",
        meta: "Workflow",
        title: "WhatsApp Booking Automation",
        body: "Appointment booking and coordination flows delivered through messaging, with downstream data sync.",
        proves: "Conversational operations",
        href: "/work",
    },
    {
        label: "Capability",
        meta: "Integration",
        title: "Regulatory API Bridges",
        body: "REST-to-SOAP and other protocol bridges for high-volume regulatory document submission.",
        proves: "Integration & protocol bridges",
        href: "/work/eudr-compliance-bridge",
    },
];

type Props = { variant: Variant };

export function ProofGrid({ variant }: Props) {
    const isFinanceEmphasis = variant === "finance-emphasis";
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">Built from real automation work</h2>
                    <span className="section-mark-meta">
                        {isFinanceEmphasis ? "Finance · adjacent capability" : "Capability across workflows"}
                    </span>
                </motion.header>

                <motion.div {...fadeUp} className="proof-row-head">
                    <span className="proof-row-key">Finance exception logic</span>
                </motion.div>
                <div className={isFinanceEmphasis ? "exhibit-grid proof-grid-emphasis" : "exhibit-grid"}>
                    {FINANCE.map((ex, i) => (
                        <motion.div
                            key={ex.href}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link href={ex.href} className="exhibit-card">
                                <div className="exhibit-card-header">
                                    <span className="exhibit-card-label">{ex.label}</span>
                                    <span className="exhibit-card-meta">{ex.meta}</span>
                                </div>
                                <h3 className="exhibit-card-title">{ex.title}</h3>
                                <p className="exhibit-card-body">{ex.body}</p>
                                <div className="exhibit-card-footer">
                                    <span><strong>{ex.proves}</strong></span>
                                    <span>↗</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div {...fadeUp} className="proof-row-head proof-row-head-second">
                    <span className="proof-row-key">Adjacent automation capability</span>
                </motion.div>
                <div className="exhibit-grid proof-grid-adjacent">
                    {ADJACENT.map((ex, i) => (
                        <motion.div
                            key={ex.href + ex.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link href={ex.href} className="exhibit-card">
                                <div className="exhibit-card-header">
                                    <span className="exhibit-card-label">{ex.label}</span>
                                    <span className="exhibit-card-meta">{ex.meta}</span>
                                </div>
                                <h3 className="exhibit-card-title">{ex.title}</h3>
                                <p className="exhibit-card-body">{ex.body}</p>
                                <div className="exhibit-card-footer">
                                    <span><strong>{ex.proves}</strong></span>
                                    <span>↗</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
