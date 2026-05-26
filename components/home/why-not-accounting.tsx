"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";

const COMPARISON_ROWS: { existing: string; invaritech: string }[] = [
    { existing: "Stores bills and payments", invaritech: "Flags risky or duplicate candidates" },
    { existing: "Holds supplier records", invaritech: "Detects sensitive supplier changes" },
    { existing: "Tracks transactions", invaritech: "Connects documents, approvals, and evidence" },
    { existing: "Exports reports", invaritech: "Creates review queues and exception logic" },
    { existing: "Supports finance work", invaritech: "Automates the checks around finance work" },
];

export function WhyNotAccounting() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        We do not replace your accounting software. We automate the checks around it.
                    </h2>
                    <span className="section-mark-meta">Existing tools vs. automation layer</span>
                </motion.header>

                <motion.p
                    {...fadeUp}
                    className="why-not-accounting-lede"
                >
                    Accounting systems are excellent at recording transactions.
                    But every business has custom rules around approvals,
                    documents, vendors, evidence, thresholds, and exception
                    handling. That is where manual work creeps back in.
                </motion.p>

                <motion.div {...fadeUp} className="why-not-accounting-table-wrap">
                    <table className="why-not-accounting-table">
                        <thead>
                            <tr>
                                <th scope="col">Existing systems</th>
                                <th scope="col">Invaritech automation layer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <tr key={row.existing}>
                                    <td>{row.existing}</td>
                                    <td>{row.invaritech}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.p
                    {...fadeUp}
                    className="why-not-accounting-footer"
                >
                    We work <em className="not-italic text-foreground">on top of</em>{" "}
                    QuickBooks, NetSuite, SAP, Xero, MYOB, and ERP exports. We do not
                    replace your accounting system.
                </motion.p>
            </div>
        </section>
    );
}
