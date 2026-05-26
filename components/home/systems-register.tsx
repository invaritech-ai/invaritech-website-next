"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

import { fadeUp } from "./_motion";

type System = {
    idx: string;
    anchor: string;
    name: string;
    catches: string;
    price: string;
    /** When defined, card is a link to that route; otherwise card is expandable. */
    href?: string;
    detail?: {
        inputs: string[];
        catchesList: string[];
        outputs: string[];
    };
};

const SYSTEMS: System[] = [
    {
        idx: "01",
        anchor: "dup-invoice",
        name: "Duplicate Invoice Exception System",
        catches: "Flags exact and near-duplicate supplier bills before payment using supplier, amount, invoice number, date, description, and fuzzy matching.",
        price: "USD 4k to 12k",
        detail: {
            inputs: ["Accounting export (AP)", "Inbox attachments (PDF, scanned)", "Vendor master"],
            catchesList: ["Exact duplicates", "Near-duplicates by amount + supplier", "Re-imported invoices", "Supplier-side billing-system retries"],
            outputs: ["Review queue of candidate duplicates", "Audit trail with evidence links", "Pre-payment hold flag for accounting system"],
        },
    },
    {
        idx: "02",
        anchor: "vendor-change",
        name: "Vendor Change Control System",
        catches: "Detects supplier bank-detail and master-data changes, routes them for approval, and captures evidence before payment risk increases.",
        price: "USD 5k to 15k",
        detail: {
            inputs: ["Vendor master snapshots", "Change request emails", "Approval policy thresholds"],
            catchesList: ["Bank-detail changes", "Tax-ID changes", "Address changes near month-end", "Changes lacking written authorization"],
            outputs: ["Change-control review queue", "Two-party approval audit trail", "Evidence pack stored against vendor record"],
        },
    },
    {
        idx: "03",
        anchor: "approval-gap",
        name: "Approval Gap Detection System",
        catches: "Finds bills or payments where approval evidence is missing, incomplete, or scattered across email, documents, and accounting exports.",
        price: "USD 6k to 18k",
        detail: {
            inputs: ["AP export", "Email/Slack approval threads", "Policy thresholds by amount and vendor"],
            catchesList: ["Bills paid without approval", "Approvals below threshold", "Approval evidence outside policy window", "Out-of-cycle exception approvals"],
            outputs: ["Gap report with evidence links", "Pre-pay hold list", "Monthly close audit pack"],
        },
    },
    {
        idx: "04",
        anchor: "three-way",
        name: "3-Way Matching Exception System",
        catches: "Compares invoices, purchase orders, and delivery/receipt evidence, then surfaces mismatches for human review.",
        price: "USD 8k to 25k",
        href: "/glossary/three-way-match/",
    },
    {
        idx: "05",
        anchor: "dashboard",
        name: "AP Exception Dashboard",
        catches: "Creates one review queue for duplicate candidates, vendor changes, missing approvals, mismatches, unusual amounts, and other finance exceptions.",
        price: "USD 10k to 30k",
        detail: {
            inputs: ["Outputs of the four systems above", "Reviewer roster", "Notification preferences"],
            catchesList: ["Cross-system exception state", "Reviewer assignment per exception type", "SLA breaches"],
            outputs: ["Single review queue", "Exportable monthly exception report", "Reviewer performance metrics"],
        },
    },
];

export function SystemsRegister() {
    const [openIdx, setOpenIdx] = useState<string | null>(null);

    return (
        <section id="systems" className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">Fixed-scope finance exception systems</h2>
                    <span className="section-mark-meta">Five builds. One umbrella.</span>
                </motion.header>

                <motion.div {...fadeUp} className="exception-register">
                    <div className="exception-register-head">
                        <span>#</span>
                        <span>What it does</span>
                        <span>Price range</span>
                        <span />
                    </div>
                    {SYSTEMS.map((row, i) => {
                        const isOpen = openIdx === row.anchor;
                        const inner = (
                            <>
                                <span className="exception-register-index">{row.idx}</span>
                                <span className="exception-register-title">
                                    <span className="exception-register-name">{row.name}</span>
                                    <span className="exception-register-catches">{row.catches}</span>
                                </span>
                                <span className="exception-register-price">{row.price}</span>
                                <span className="exception-register-arrow">{row.href ? "↗" : (isOpen ? "−" : "+")}</span>
                            </>
                        );
                        return (
                            <motion.div
                                key={row.idx}
                                id={row.anchor}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
                            >
                                {row.href ? (
                                    <Link href={row.href} className="exception-register-row">
                                        {inner}
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setOpenIdx(isOpen ? null : row.anchor)}
                                        aria-expanded={isOpen}
                                        aria-controls={`${row.anchor}-detail`}
                                        className="exception-register-row exception-register-row-button"
                                    >
                                        {inner}
                                    </button>
                                )}
                                {!row.href && row.detail && isOpen && (
                                    <div id={`${row.anchor}-detail`} className="exception-register-detail">
                                        <div className="exception-register-detail-col">
                                            <h4 className="exception-register-detail-head">Typical inputs</h4>
                                            <ul>{row.detail.inputs.map((s) => <li key={s}>{s}</li>)}</ul>
                                        </div>
                                        <div className="exception-register-detail-col">
                                            <h4 className="exception-register-detail-head">What it catches</h4>
                                            <ul>{row.detail.catchesList.map((s) => <li key={s}>{s}</li>)}</ul>
                                        </div>
                                        <div className="exception-register-detail-col">
                                            <h4 className="exception-register-detail-head">Outputs</h4>
                                            <ul>{row.detail.outputs.map((s) => <li key={s}>{s}</li>)}</ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.p {...fadeUp} className="exception-register-footnote">
                    Price ranges depend on workflow complexity, data sources, and exception rules.
                </motion.p>
            </div>
        </section>
    );
}
