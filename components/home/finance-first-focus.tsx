"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

export function FinanceFirstFocus() {
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        Finance exception automation is our first focus.
                    </h2>
                    <span className="section-mark-meta">Depth before breadth</span>
                </motion.header>

                <motion.div {...fadeUp} className="finance-first-grid">
                    <div className="finance-first-body">
                        <p>
                            Finance teams handle exceptions every day — duplicate
                            bills, vendor-detail changes, missing approvals,
                            invoice and PO mismatches, unusual amounts. Each one
                            is rule-driven, high-frequency, and high-stakes when
                            it goes wrong. That made it the right depth area.
                        </p>
                        <p>
                            We have built five fixed-scope finance exception
                            systems: duplicate-invoice detection, vendor change
                            control, approval-gap detection, three-way matching,
                            and an AP exception dashboard. They sit on top of
                            your accounting system, ingest your documents, and
                            route only the cases that need human review.
                        </p>
                    </div>
                    <div className="finance-first-cta">
                        <AuditCTA
                            location="mid"
                            label="See finance exception systems"
                            href="/finance-exception-automation"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
