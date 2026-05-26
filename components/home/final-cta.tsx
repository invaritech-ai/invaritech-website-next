"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

export function FinalCTA() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.div {...fadeUp} className="final-cta-panel">
                    <h2 className="final-cta-headline">
                        Before you hire another AP person, see what can be automated first.
                    </h2>
                    <p className="final-cta-body">
                        The audit names the highest-value exception in your workflow
                        and recommends the smallest useful first system. Free for
                        qualified companies while we build proof. Becomes a paid $1k
                        audit later.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <AuditCTA location="footer" />
                        <AuditCTA
                            location="footer"
                            variant="secondary"
                            label="Try the 3-Way Matching Demo"
                            href="/glossary/three-way-match/"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
