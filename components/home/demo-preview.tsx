"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { fadeUp } from "./_motion";

export function DemoPreview() {
    return (
        <section id="demo" className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        See how finance exception automation works.
                    </h2>
                    <span className="section-mark-meta">Live demo</span>
                </motion.header>

                <motion.div {...fadeUp} className="demo-preview-grid">
                    <div className="demo-preview-copy">
                        <p>
                            Our 3-way matching demo shows how invoices, purchase
                            orders, and delivery evidence can be compared
                            automatically — with exceptions routed for review
                            instead of manual checking.
                        </p>
                        <p className="demo-preview-reminder">
                            3-way matching is one example. The same approach can
                            be applied to duplicate bills, vendor changes,
                            missing approvals, and other payment-control checks.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/glossary/three-way-match/"
                                className="site-button audit-cta"
                            >
                                Try the demo
                                <span className="audit-cta-arrow" aria-hidden>↗</span>
                            </Link>
                            <Link
                                href="/contact?audit=1"
                                className="site-button-secondary audit-cta"
                            >
                                Book a walkthrough
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/glossary/three-way-match/"
                        className="demo-preview-tile"
                        aria-label="Open the three-way matcher demo"
                    >
                        <picture>
                            <source
                                srcSet="/images/finance/three-way-matcher-preview.webp"
                                type="image/webp"
                            />
                            <img
                                src="/images/finance/three-way-matcher-preview.png"
                                alt="Three-way matcher results showing matched, variance, missing, and duplicate invoice statuses"
                                loading="lazy"
                                width={1280}
                                height={720}
                                className="demo-preview-image"
                            />
                        </picture>
                        <span className="demo-preview-badge">Live demo · in-browser</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
