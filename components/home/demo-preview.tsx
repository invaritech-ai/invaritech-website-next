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
                        See it work on three documents.
                    </h2>
                    <span className="section-mark-meta">Live demo · in-browser</span>
                </motion.header>

                <motion.div {...fadeUp} className="demo-preview-grid">
                    <div className="demo-preview-copy">
                        <p>
                            Open the matcher. Paste invoice, PO, and goods-receipt rows.
                            Watch it flag duplicates, amount variances, missing receipts,
                            vendor mismatches, and three more exception types. Runs in your
                            browser. Your data never leaves the page.
                        </p>
                        <p className="demo-preview-reminder">
                            Three-way matching is one example. The same pattern works for
                            duplicate bills, vendor changes, approval gaps, and other
                            payment-control checks.
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
