"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { LiveOpsStrip } from "@/components/home/live-ops-strip";
import { Problem } from "@/components/home/problem";
import { RunLog } from "@/components/home/run-log";
import { ServiceMethod } from "@/components/home/service-method";
import { SystemsRegister } from "@/components/home/systems-register";
import { VarianceExhibitVideo } from "@/components/home/variance-exhibit-video";
import { fadeUp, stagger } from "@/components/home/_motion";

/**
 * Exception Automation — homepage.
 *
 * Document aesthetic. The page reads like the front matter of a forensic
 * accounting audit deliverable. Copy is intentionally placeholder — locked
 * during rebrand, replaced in copy pass.
 *
 * Section order follows the Positioning DNA Doctrine §12.2:
 *   Hero → Problem → Use cases → How it works → Why custom → Proof → CTA
 */

// ─────────────────────────────────────────────────────────────────────
// 1. Cover Hero
// ─────────────────────────────────────────────────────────────────────

function CoverHero() {
    return (
        <section className="site-home-hero relative overflow-hidden lg:min-h-screen">
            <div className="doc-container relative flex flex-col pt-28 pb-12 md:pt-32 md:pb-14 lg:min-h-screen lg:pt-32 lg:pb-10">
                {/* Live operations strip */}
                <motion.div {...fadeUp} className="mb-10 lg:mb-12">
                    <LiveOpsStrip />
                </motion.div>

                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* Left — headline column */}
                    <div>
                        <motion.h1 {...stagger(1)} className="doc-hero-headline">
                            Your AP team should review{" "}
                            <em>exceptions</em>,<br />
                            not{" "}
                            <span className="doc-redline">
                                <span className="doc-redline-mark">strike</span>
                                check everything manually
                            </span>
                            hunt for them.
                        </motion.h1>

                        <motion.p
                            {...stagger(2)}
                            className="mt-10 max-w-xl text-lg leading-relaxed text-foreground-muted"
                        >
                            Invaritech builds finance exception automation systems
                            with agentic review interfaces. Fixed-scope builds for
                            finance teams that want to reduce manual checks, catch
                            payment-control risks, and move faster without adding
                            AP headcount.
                        </motion.p>

                        <motion.div
                            {...stagger(3)}
                            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                        >
                            <Link href="/contact" className="site-button px-7">
                                Book a free Finance Exception Audit
                                <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                            </Link>
                            <Link href="#exceptions" className="site-button-secondary px-7">
                                See what we automate
                            </Link>
                        </motion.div>

                        <motion.p
                            {...stagger(4)}
                            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle"
                        >
                            Free during launch · for selected finance teams
                        </motion.p>
                    </div>

                    {/* Right — variance exhibit + run log */}
                    <motion.aside {...stagger(2)} className="lg:pl-8">
                        <div className="grid gap-4">
                            <VarianceExhibitVideo />
                            <RunLog />
                        </div>
                    </motion.aside>
                </div>

                {/* Bottom rule strip */}
                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.5 }}
                    className="mt-12 border-y border-border py-4 lg:mt-10"
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                        Catch duplicate bills, vendor-detail changes, invoice
                        exceptions, and approval gaps. Before they become manual
                        work, payment leakage, or another AP hire.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 5. Why custom (Generic SaaS vs Invaritech Control Layer)
// ─────────────────────────────────────────────────────────────────────

function WhyCustom() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">Why custom beats off-the-shelf here</h2>
                    <span className="section-mark-meta">Your exceptions are not standard</span>
                </motion.header>

                <motion.div {...fadeUp} className="compare-grid">
                    <div className="compare-cell compare-cell-stale">
                        <div className="compare-cell-label">Off-the-shelf</div>
                        <div className="compare-cell-title">
                            Generic AP / accounting tool
                        </div>
                        <ul className="compare-cell-list">
                            <li>Detects exact-match duplicates only.</li>
                            <li>No knowledge of your supplier naming conventions.</li>
                            <li>Cannot enforce approval evidence by amount or vendor risk.</li>
                            <li>Routes everything for review — including the boring 95%.</li>
                            <li>Cannot read your inbox, PDFs, or sheet-based holds.</li>
                        </ul>
                    </div>
                    <div className="compare-cell compare-cell-live">
                        <div className="compare-cell-label">Invaritech</div>
                        <div className="compare-cell-title">
                            Custom exception &amp; control layer
                        </div>
                        <ul className="compare-cell-list">
                            <li>Exact, fuzzy, and semantic duplicate detection.</li>
                            <li>Encodes your supplier naming, references, and PO patterns.</li>
                            <li>Approval rules per amount band, vendor risk, and document trail.</li>
                            <li>Surfaces only the 5% worth a reviewer&apos;s time.</li>
                            <li>Connects accounting exports, inbox, documents, and sheets.</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.p
                    {...fadeUp}
                    className="mt-8 max-w-2xl font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle"
                >
                    We work <em className="not-italic text-foreground">on top of</em>{" "}
                    QuickBooks, NetSuite, SAP, Xero, and ERP exports. We do not
                    replace your accounting system.
                </motion.p>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 6. Exhibits (proof)
// ─────────────────────────────────────────────────────────────────────

const EXHIBITS = [
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
        title: "Supplier Payment Control Rule Table",
        body: "Filter, severity-rank, and configure payment-control rules against a sample AP register.",
        proves: "Rule library + exception logic",
        href: "/resources/supplier-payment-control-rule-table",
    },
    {
        label: "Live tool",
        meta: "Free",
        title: "Invoice Extractor",
        body: "Upload a supplier invoice PDF; extract structured fields, vendor metadata, and line items for downstream rule application.",
        proves: "Document intelligence pipeline",
        href: "/resources/invoice-extractor",
    },
];

function Exhibits() {
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">See what we have automated</h2>
                    <span className="section-mark-meta">Case study · demo · live tool</span>
                </motion.header>

                <motion.p
                    {...fadeUp}
                    className="max-w-2xl text-base leading-relaxed text-foreground-muted"
                >
                    Each piece below shows one capability that recurs across
                    finance exception builds: document handling, exception
                    routing, integration, or evidence capture.
                </motion.p>

                <div className="exhibit-grid">
                    {EXHIBITS.map((ex, i) => (
                        <motion.div
                            key={ex.label}
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

// ─────────────────────────────────────────────────────────────────────
// 7. Audit CTA (stamped panel)
// ─────────────────────────────────────────────────────────────────────

function AuditCTA() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">Free finance exception audit</h2>
                    <span className="section-mark-meta">Free during launch</span>
                </motion.header>

                <motion.div {...fadeUp} className="audit-cta">
                    <div className="audit-cta-grid">
                        <div>
                            <h3 className="audit-cta-headline">
                                Show us the finance workflow your team
                                checks <em className="italic text-primary">manually</em>.
                            </h3>
                            <p className="audit-cta-supporting">
                                We will identify the highest-value exception
                                pattern and recommend the smallest useful first
                                system to build. Free during launch for selected
                                finance teams.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link href="/contact" className="site-button px-7">
                                    Book a free Finance Exception Audit
                                    <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                                </Link>
                                <Link href="/contact" className="site-button-secondary px-7">
                                    Send a sample export
                                </Link>
                            </div>
                        </div>

                        <ul className="audit-cta-list">
                            <li>Current workflow review</li>
                            <li>Sample export review where available</li>
                            <li>Manual exception check mapping</li>
                            <li>Payment-control risk list</li>
                            <li>Recommended first system</li>
                            <li>Launch range + acceptance criteria</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 8. Footnotes
// ─────────────────────────────────────────────────────────────────────

function Footnotes() {
    return (
        <section className="border-t border-border bg-card/40 py-14">
            <div className="doc-container">
                <div className="footnotes">
                    <div className="footnotes-title">Footnotes · cited claims</div>
                    <ol className="footnotes-list">
                        <li>
                            Positioning DNA & Strategic Doctrine, §4.1 — &ldquo;The
                            company exists to automate the messy middle.&rdquo;
                        </li>
                        <li>
                            Doctrine §5 (Positioning hierarchy, Platform angle):
                            &ldquo;Works on top of existing systems like Xero, MYOB,
                            QuickBooks, ERP exports, inboxes, and spreadsheets.&rdquo;
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 9. Colophon (set-in footer — typefaces, palette, build)
// ─────────────────────────────────────────────────────────────────────

function Colophon() {
    const buildDate = new Date().toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
    return (
        <section className="colophon">
            <div className="doc-container">
                <div className="colophon-grid">
                    <div className="colophon-block">
                        <div className="colophon-label">Colophon</div>
                        <p className="colophon-statement">
                            Set in <em>Source Serif 4</em> and <em>IBM Plex Mono</em>.
                            Composed as a forensic-accounting deliverable: numbered
                            sections, marginalia, exhibits, footnotes. Rendered{" "}
                            {buildDate}, Melbourne.
                        </p>
                    </div>
                    <div className="colophon-block">
                        <div className="colophon-label">Typefaces</div>
                        <div className="colophon-row">
                            <span>Display / body</span>
                            <strong>Source Serif 4</strong>
                        </div>
                        <div className="colophon-row">
                            <span>Mono / metadata</span>
                            <strong>IBM Plex Mono</strong>
                        </div>
                        <div className="colophon-row">
                            <span>Sans (UI)</span>
                            <strong>Source Sans 3</strong>
                        </div>
                    </div>
                    <div className="colophon-block">
                        <div className="colophon-label">Palette</div>
                        <div className="colophon-row">
                            <span>Forest (primary)</span>
                            <strong>#0F5132</strong>
                        </div>
                        <div className="colophon-row">
                            <span>Copper (accent)</span>
                            <strong>#B45309</strong>
                        </div>
                        <div className="colophon-row">
                            <span>Paper</span>
                            <strong>#F7F7F4</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// Page export
// ─────────────────────────────────────────────────────────────────────

export default function ExceptionAutomationHome() {
    return (
        <main className="site-page">
            <CoverHero />
            <Problem variant="broad" />
            <SystemsRegister />
            <ServiceMethod variant="broad" />
            <WhyCustom />
            <Exhibits />
            <AuditCTA />
        </main>
    );
}
