"use client";

import Link from "next/link";
import { motion } from "motion/react";

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

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
};

const stagger = (i: number) => ({
    ...fadeUp,
    transition: { ...fadeUp.transition, delay: 0.05 + i * 0.06 },
});

// ─────────────────────────────────────────────────────────────────────
// 1. Cover Hero
// ─────────────────────────────────────────────────────────────────────

function CoverHero() {
    return (
        <section className="site-home-hero relative overflow-hidden lg:min-h-screen">
            <div className="doc-container relative flex flex-col pt-28 pb-12 md:pt-32 md:pb-14 lg:min-h-screen lg:pt-32 lg:pb-10">
                {/* Top metadata strip */}
                <motion.div {...fadeUp} className="doc-strip mb-10 lg:mb-12">
                    <span className="doc-strip-cell">
                        <strong>INV / 2026 / 001</strong>
                    </span>
                    <span className="doc-strip-divider" />
                    <span className="doc-strip-cell">Issue 02 · Rev. 4</span>
                    <span className="doc-strip-divider" />
                    <span className="doc-strip-cell">Classification: Public</span>
                    <span className="doc-strip-divider" />
                    <span className="doc-strip-cell">First Wedge: Finance Exception</span>
                    <span className="doc-strip-spacer hidden md:inline-block" />
                    <span className="doc-strip-cell hidden md:inline-flex">
                        Filed <strong className="ml-1">25·05·2026</strong>
                    </span>
                </motion.div>

                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* Left — headline column */}
                    <div>
                        <motion.div {...stagger(0)} className="flex items-center gap-3 mb-8">
                            <span className="doc-stamp doc-stamp-forest">
                                Operating Doctrine · 12.1
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-subtle">
                                Hero Statement
                            </span>
                        </motion.div>

                        <motion.h1 {...stagger(1)} className="doc-hero-headline">
                            Move faster<br />
                            without <em>adding</em><br />
                            headcount.
                        </motion.h1>

                        <motion.p
                            {...stagger(2)}
                            className="mt-10 max-w-xl text-lg leading-relaxed text-foreground-muted"
                        >
                            Invaritech builds AI-powered automation systems for finance
                            and operations teams buried in invoices, documents,
                            approvals, and manual exception checks.
                        </motion.p>

                        <motion.div
                            {...stagger(3)}
                            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                        >
                            <Link href="/contact" className="site-button px-7">
                                Book a workflow audit
                                <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                            </Link>
                            <Link href="#exceptions" className="site-button-secondary px-7">
                                See the exception register
                            </Link>
                        </motion.div>

                        <motion.p
                            {...stagger(4)}
                            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle"
                        >
                            Free during launch · for selected finance teams
                        </motion.p>
                    </div>

                    {/* Right — variance exhibit (animated video, SVG fallback) */}
                    <motion.aside {...stagger(2)} className="lg:pl-8">
                        <VarianceExhibitVideo />
                    </motion.aside>
                </div>

                {/* Bottom rule strip — declaration of the wedge */}
                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.5 }}
                    className="mt-12 flex items-center gap-6 border-y border-border py-4 lg:mt-10"
                >
                    <span className="doc-stamp">First Wedge</span>
                    <p className="flex-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                        Catch duplicate bills, vendor-detail changes, invoice
                        exceptions, and approval gaps&nbsp;—&nbsp;before they become costly
                        manual work, payment leakage, or another AP hire.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// Hero-side data exhibit — Remotion-rendered video.
// The video itself contains the full exhibit chrome (title bar, axes,
// caption, stamp), so we render it edge-to-edge inside a token-styled
// frame to preserve the document aesthetic.
function VarianceExhibitVideo() {
    return (
        <figure className="relative border border-border bg-card">
            <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[3px] bg-primary"
            />
            <video
                src="/hero/hero.mp4"
                poster="/hero/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Animated AP variance exhibit: 16-week invoice series with two duplicate-candidate outliers flagged in copper."
                className="block aspect-[3/2] w-full"
            >
                {/* Inline SVG fallback for browsers without MP4 / video support */}
                <VarianceExhibit />
            </video>
        </figure>
    );
}

// Hero-side data exhibit. A stylised variance plot drawn as inline SVG.
// Retained as the canonical static representation and as <video> fallback.
function VarianceExhibit() {
    // Mock invoice-amount series with two clear duplicate-candidate outliers.
    const data = [
        { x: 0, y: 42 }, { x: 1, y: 48 }, { x: 2, y: 51 }, { x: 3, y: 46 },
        { x: 4, y: 54 }, { x: 5, y: 50 }, { x: 6, y: 88, flag: true },
        { x: 7, y: 47 }, { x: 8, y: 52 }, { x: 9, y: 49 }, { x: 10, y: 55 },
        { x: 11, y: 89, flag: true }, { x: 12, y: 53 }, { x: 13, y: 48 },
        { x: 14, y: 51 }, { x: 15, y: 50 },
    ];
    const w = 360;
    const h = 180;
    const pad = { l: 18, r: 12, t: 12, b: 20 };
    const xMax = data.length - 1;
    const yMax = 100;
    const sx = (x: number) => pad.l + (x / xMax) * (w - pad.l - pad.r);
    const sy = (y: number) => pad.t + (1 - y / yMax) * (h - pad.t - pad.b);
    const path = data
        .map((d, i) => `${i === 0 ? "M" : "L"} ${sx(d.x).toFixed(1)} ${sy(d.y).toFixed(1)}`)
        .join(" ");

    return (
        <div className="variance-exhibit">
            <div className="variance-exhibit-bar" />
            <div className="variance-exhibit-head">
                <span className="variance-exhibit-title">Exhibit A · AP variance</span>
                <span className="variance-exhibit-id">FIG · 001</span>
            </div>

            <svg
                viewBox={`0 0 ${w} ${h}`}
                className="w-full h-auto"
                role="img"
                aria-label="Variance plot showing two duplicate-candidate outliers"
            >
                {/* Grid */}
                {[0, 25, 50, 75, 100].map((g) => (
                    <line
                        key={g}
                        x1={pad.l}
                        x2={w - pad.r}
                        y1={sy(g)}
                        y2={sy(g)}
                        stroke="var(--border)"
                        strokeWidth="1"
                        strokeDasharray={g === 50 ? "0" : "2 4"}
                    />
                ))}
                {/* Series line */}
                <path
                    d={path}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                />
                {/* Threshold band (acceptable variance) */}
                <rect
                    x={pad.l}
                    y={sy(65)}
                    width={w - pad.l - pad.r}
                    height={sy(35) - sy(65)}
                    fill="var(--primary)"
                    opacity="0.05"
                />
                {/* Dots */}
                {data.map((d) => (
                    <circle
                        key={d.x}
                        cx={sx(d.x)}
                        cy={sy(d.y)}
                        r={d.flag ? 4 : 2}
                        fill={d.flag ? "var(--accent)" : "var(--background)"}
                        stroke={d.flag ? "var(--accent)" : "var(--primary)"}
                        strokeWidth={d.flag ? 1.5 : 1}
                    />
                ))}
                {/* Annotation for outliers */}
                {data.filter((d) => d.flag).map((d, i) => (
                    <g key={i}>
                        <line
                            x1={sx(d.x)}
                            y1={sy(d.y) - 8}
                            x2={sx(d.x)}
                            y2={sy(d.y) - 24}
                            stroke="var(--accent)"
                            strokeWidth="1"
                        />
                        <text
                            x={sx(d.x) - 6}
                            y={sy(d.y) - 28}
                            fill="var(--accent)"
                            fontSize="8"
                            fontFamily="var(--font-mono)"
                            letterSpacing="1"
                        >
                            DUP·{i + 1}
                        </text>
                    </g>
                ))}
                {/* Y-axis labels */}
                {[0, 50, 100].map((g) => (
                    <text
                        key={g}
                        x={pad.l - 4}
                        y={sy(g) + 3}
                        textAnchor="end"
                        fontSize="7"
                        fontFamily="var(--font-mono)"
                        fill="var(--foreground-subtle)"
                        letterSpacing="1"
                    >
                        {g}
                    </text>
                ))}
            </svg>

            <p className="variance-exhibit-caption">
                Sample AP export, 16-week window. Two near-duplicates flagged
                against historical median (<strong>+76%, +78%</strong>). Both
                approved manually in the original ledger.
            </p>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 2. The Messy Middle (problem)
// ─────────────────────────────────────────────────────────────────────

function MessyMiddle() {
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <span className="section-mark-numeral">§ 01</span>
                    <h2 className="section-mark-title">The messy middle</h2>
                    <span className="section-mark-meta">Where leakage hides</span>
                </motion.header>

                <motion.div {...fadeUp} className="marginalia">
                    <aside className="marginalia-rail">
                        <span className="marginalia-rail-key">Enemy</span>
                        Business-critical work trapped in human memory, inboxes,
                        spreadsheets, and disconnected systems.
                    </aside>

                    <div className="marginalia-body">
                        <p>
                            Your accounting system stores transactions. Your inbox
                            stores documents. Your spreadsheet stores exceptions.
                            Your approval tool stores decisions. But the actual
                            business logic lives in people&apos;s heads.<sup>1</sup>
                        </p>
                        <p>
                            Most growing finance teams don&apos;t fail because they
                            lack another SaaS subscription. They struggle because
                            the work <em>between</em> systems is still manual.
                        </p>
                    </div>
                </motion.div>

                <motion.div {...fadeUp} className="relative">
                    <div className="gap-schematic">
                        {[
                            { label: "System A", name: "Accounting", stores: "Transactions, vendor master, GL codes." },
                            { label: "System B", name: "Inbox", stores: "PDFs, emails, scanned bills, approvals." },
                            { label: "System C", name: "Spreadsheet", stores: "Exception list, reviewer notes, hold flags." },
                            { label: "System D", name: "Approval tool", stores: "Sign-offs, evidence, audit history." },
                        ].map((c) => (
                            <div key={c.label} className="gap-cell">
                                <div>
                                    <div className="gap-cell-label">{c.label}</div>
                                    <div className="gap-cell-name mt-1">{c.name}</div>
                                </div>
                                <div className="gap-cell-stores">{c.stores}</div>
                            </div>
                        ))}
                        <div className="gap-overlay">
                            <div className="gap-overlay-rule" />
                            <div className="gap-overlay-stamp">Gap · manual checks</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 3. Exception Register (use cases as indexed table)
// ─────────────────────────────────────────────────────────────────────

const REGISTER = [
    {
        idx: "01",
        name: "Duplicate Invoice Exception System",
        catches: "Exact and near-duplicate supplier bills before payment release.",
        tier: "light" as const,
        tierLabel: "Tier 01",
        price: "$4k–12k",
        href: "/work#duplicate-invoice",
    },
    {
        idx: "02",
        name: "Vendor Change Control System",
        catches: "Bank-detail and master-data changes — routed for approval evidence.",
        tier: "mid" as const,
        tierLabel: "Tier 02",
        price: "$5k–15k",
        href: "/work#vendor-change",
    },
    {
        idx: "03",
        name: "Approval Gap Detection System",
        catches: "Bills or payments missing required approval evidence trails.",
        tier: "mid" as const,
        tierLabel: "Tier 02",
        price: "$6k–18k",
        href: "/work#approval-gap",
    },
    {
        idx: "04",
        name: "Invoice & Document Matching System",
        catches: "Invoices, POs, delivery notes, and service evidence — compared.",
        tier: "heavy" as const,
        tierLabel: "Tier 03",
        price: "$8k–25k",
        href: "/work#document-matching",
    },
    {
        idx: "05",
        name: "AP Exception Dashboard",
        catches: "Single review queue for every exception type, with reviewer assignment.",
        tier: "heavy" as const,
        tierLabel: "Tier 03",
        price: "$10k–30k",
        href: "/work#exception-dashboard",
    },
];

function ExceptionRegister() {
    return (
        <section id="exceptions" className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <span className="section-mark-numeral">§ 02</span>
                    <h2 className="section-mark-title">Exception register</h2>
                    <span className="section-mark-meta">Five starting systems · fixed scope</span>
                </motion.header>

                <motion.div {...fadeUp} className="exception-register">
                    <div className="exception-register-head">
                        <span>Item</span>
                        <span>System</span>
                        <span>Tier</span>
                        <span>Launch range</span>
                        <span />
                    </div>
                    {REGISTER.map((row, i) => (
                        <motion.div
                            key={row.idx}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link
                                href={row.href}
                                className="exception-register-row"
                            >
                                <span className="exception-register-index">{row.idx}</span>
                                <span className="exception-register-title">
                                    <span className="exception-register-name">{row.name}</span>
                                    <span className="exception-register-catches">{row.catches}</span>
                                </span>
                                <span
                                    className={`exception-register-tier exception-register-tier-${row.tier}`}
                                >
                                    {row.tierLabel}
                                </span>
                                <span className="exception-register-price">{row.price}</span>
                                <span className="exception-register-arrow">→</span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    {...fadeUp}
                    className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle"
                >
                    Launch ranges depend on workflow complexity, data sources, and exception rules.
                </motion.p>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// 4. Service method (5 steps with vertical thread)
// ─────────────────────────────────────────────────────────────────────

const METHOD = [
    {
        title: "Find the leakage",
        body: "Audit current workflow, documents, exports, approvals, and manual checks.",
        output: "Workflow map · exception risk list",
    },
    {
        title: "Encode the rules",
        body: "Convert business logic into deterministic checks, AI-assisted matching, and exception rules.",
        output: "Rule library · acceptance criteria",
    },
    {
        title: "Automate the checks",
        body: "Build the workflow layer that reviews documents and data before humans waste time.",
        output: "Working automation · alerts",
    },
    {
        title: "Monitor the exceptions",
        body: "Surface only the cases that need human judgment. Everything else is logged and dismissed.",
        output: "Exception dashboard · digest",
    },
    {
        title: "Improve the workflow",
        body: "Use real usage data to make the process faster, safer, and less dependent on headcount.",
        output: "Rule updates · monthly delta",
    },
];

function ServiceMethod() {
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <span className="section-mark-numeral">§ 03</span>
                    <h2 className="section-mark-title">How builds work</h2>
                    <span className="section-mark-meta">
                        Find · Encode · Automate · Monitor · Improve
                    </span>
                </motion.header>

                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.aside {...fadeUp} className="marginalia-rail">
                        <span className="marginalia-rail-key">Service method</span>
                        Every engagement starts with a fixed scope, clear inputs,
                        and written acceptance criteria. No open-ended discovery.
                        No vague AI promises. Every build hands over working
                        automation, documented rules, and a monitoring plan.
                    </motion.aside>

                    <div className="site-home-step-ledger">
                        {METHOD.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: 12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                                className="site-home-step"
                            >
                                <div className="site-home-step-node">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="text-lg font-medium text-foreground site-font-display">
                                            {step.title}
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-subtle">
                                            → {step.output}
                                        </span>
                                    </div>
                                    <p className="site-home-step-body">{step.body}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
                    <span className="section-mark-numeral">§ 04</span>
                    <h2 className="section-mark-title">Why generic SaaS breaks here</h2>
                    <span className="section-mark-meta">Built for shape, not specifics</span>
                </motion.header>

                <motion.div {...fadeUp} className="compare-grid">
                    <div className="compare-cell compare-cell-stale">
                        <div className="compare-cell-label">Configuration A · Off-the-shelf</div>
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
                        <div className="compare-cell-label">Configuration B · Invaritech</div>
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
                    Xero, MYOB, QuickBooks, and ERP exports. We do not replace your
                    accounting system.<sup className="ml-0.5 text-accent">2</sup>
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
        label: "Exhibit A",
        meta: "Case · 2025/EUDR",
        title: "EUDR Compliance Bridge",
        body: "Regulatory document workflow with REST/SOAP integration, evidence capture, and exception routing across a hundred-plus document types.",
        proves: "Complex document workflows",
        href: "/work/eudr-compliance-bridge",
    },
    {
        label: "Exhibit B",
        meta: "Demo · 2026/RT",
        title: "Supplier Payment Control Rule Table",
        body: "Interactive rule-table demo: filter, severity-rank, and configure payment-control rules against a sample AP register.",
        proves: "Rule library + exception logic",
        href: "/resources/supplier-payment-control-rule-table",
    },
    {
        label: "Exhibit C",
        meta: "Tool · 2026/IE",
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
                    <span className="section-mark-numeral">§ 05</span>
                    <h2 className="section-mark-title">Exhibits</h2>
                    <span className="section-mark-meta">What we have automated</span>
                </motion.header>

                <motion.p
                    {...fadeUp}
                    className="max-w-2xl text-base leading-relaxed text-foreground-muted"
                >
                    Production work shipped to date. Each piece demonstrates one
                    capability that recurs across finance-exception builds:
                    document handling, exception routing, integration, or
                    evidence capture.
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
                                    <span>Proves · <strong>{ex.proves}</strong></span>
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
                    <span className="section-mark-numeral">§ 06</span>
                    <h2 className="section-mark-title">Free finance exception audit</h2>
                    <span className="section-mark-meta">Free during launch</span>
                </motion.header>

                <motion.div {...fadeUp} className="audit-cta">
                    <div className="audit-cta-stamp">
                        <span className="doc-stamp">Launch offer</span>
                    </div>
                    <div className="audit-cta-grid">
                        <div>
                            <h3 className="audit-cta-headline">
                                Show us the finance workflow your team
                                checks <em className="italic text-primary">manually</em>.
                            </h3>
                            <p className="audit-cta-supporting">
                                We will identify the highest-value exception
                                pattern in your current AP workflow and
                                recommend the smallest useful first system.
                                Free during launch for selected finance teams.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link href="/contact" className="site-button px-7">
                                    Book the audit
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
// Page export
// ─────────────────────────────────────────────────────────────────────

export default function ExceptionAutomationHome() {
    return (
        <main className="site-page">
            <CoverHero />
            <MessyMiddle />
            <ExceptionRegister />
            <ServiceMethod />
            <WhyCustom />
            <Exhibits />
            <AuditCTA />
            <Footnotes />
        </main>
    );
}
