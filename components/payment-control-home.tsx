import {
    ArrowRight,
    ClipboardCheck,
    Gauge,
    Landmark,
    Route,
    Truck,
    Warehouse,
    ScanLine,
    ShieldCheck,
    Users,
} from "lucide-react";
import Link from "next/link";

import { BOOK_MEETING_CTA, BOOK_MEETING_URL, BRAND_EYEBROW, RULE_TABLE_CTA } from "@/lib/marketing";
import SystemsScramble from "@/components/systems-scramble";
import ExceptionPacket from "@/components/exception-packet";
import RouteLineAnimation from "@/components/route-line-animation";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

const pressureGroups = [
    {
        label: "Rework",
        items: [
            "PO-invoice mismatch",
            "Missing proof-of-delivery",
            "Partial receipts not matched",
        ],
    },
    {
        label: "Leakage",
        items: [
            "Carrier surcharge variance",
            "Duplicate payment variants",
            "Missed credits and returns",
        ],
    },
    {
        label: "Control gaps",
        items: [
            "Approvals based on memory",
            "Supplier statement gaps",
            "Missing evidence on release",
        ],
    },
];

const verticals = [
    {
        icon: Truck,
        companyType: "Freight & logistics",
        pain: "Margin leakage from carrier overcharges",
        details: "Surcharge variance, duplicate invoice variants, missing PODs, and rate-card mismatches your team catches manually, if at all.",
        buyers: "AP Manager, Controller, Finance Ops",
    },
    {
        icon: Warehouse,
        companyType: "Wholesale & distribution",
        pain: "Silent leakage from duplicate and erroneous payments",
        details: "PO-invoice mismatch, split shipments, supplier statement gaps, credits and returns that never came back.",
        buyers: "Finance Manager, AP Lead, Shared Services",
    },
    {
        icon: Gauge,
        companyType: "Manufacturing",
        pain: "Manual review load from three-way match exceptions",
        details: "PO, goods receipt, invoice mismatch, landing in someone's inbox and waiting until month-end to matter.",
        buyers: "Controller, Finance Ops, Operations Finance",
    },
    {
        icon: Landmark,
        companyType: "Construction",
        pain: "High-value payment control risk",
        details: "Progress claims that move through email. Retentions released on memory. Variation approvals nobody can reconstruct six months later.",
        buyers: "Commercial Finance, AP Manager, Controller",
    },
];

const workflowSteps = [
    {
        title: "Map the real problem",
        body: "We find the one payment-control workflow where exceptions are creating rework, leakage, or audit gaps.",
    },
    {
        title: "Write down what done means",
        body: "Before build starts, we agree three measurable acceptance criteria that are inside our control. Both parties sign off.",
    },
    {
        title: "Build around what you already use",
        body: "Rule logic, exception routing, payment approval checks, evidence capture, and audit trails without forcing a system change.",
    },
    {
        title: "Keep it working",
        body: "After delivery, we maintain the control with rule updates, tuning, monitoring, and hands-on support.",
    },
];

const acceptanceCriteria = [
    "Every in-scope exception is routed before payment release.",
    "Every approved exception has verification evidence on file.",
    "Every decision is replayable: owner, timestamp, audit notes.",
];

const trustSignals = [
    {
        icon: ShieldCheck,
        label: "Reconciliation systems built for Goldman Sachs",
    },
    {
        icon: Users,
        label: "One team per client. Your project never shares attention.",
    },
    {
        icon: ClipboardCheck,
        label: "Acceptance criteria in writing before build starts.",
    },
];

const scanChecks = [
    "Duplicate payments: same supplier and amount in a 30-day window",
    "Near-duplicate payments: same supplier, similar amount, different invoice numbers",
    "Vendor master anomalies: accounts changed recently, mismatched ABNs",
    "Round-number invoice patterns: a common indicator of manual manipulation",
    "High-frequency invoicing from a single supplier: split billing to avoid approval thresholds",
];

export default function PaymentControlHome() {
    return (
        <main id="main-content" className="site-page" tabIndex={-1}>

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="site-section-hero site-home-hero">
                <div className="site-home-hero-grid">
                    <div className="site-home-hero-copy">
                        <p className="site-kicker">{BRAND_EYEBROW}</p>
                        <h1 className="site-h1">
                            Clean up payment controls without changing{" "}
                            <span className="site-h1-systems-wrap">
                                <span className="site-h1-systems-text">systems</span>
                                <span className="site-h1-scramble-overlay" aria-hidden="true">
                                    <SystemsScramble />
                                </span>
                            </span>.
                        </h1>
                        <p className="site-lead">
                            We built reconciliation systems used by Goldman Sachs.
                            We work out of Asia, not Sydney, which is why we cost
                            half what a local firm would. One workflow. One team. Fixed scope.
                        </p>
                        <p className="site-home-hero-support">
                            The person who scopes it builds it. Written acceptance
                            criteria before anything starts. Managed support after delivery.
                        </p>
                        <div className="site-button-row-center">
                            <Link href="/contact/?scan=1" className="site-button">
                                Get Your Free AP Controls Scan
                                <ArrowRight className="site-button-icon" aria-hidden="true" />
                            </Link>
                            <a
                                href={BOOK_MEETING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="site-button-secondary"
                            >
                                {BOOK_MEETING_CTA}
                            </a>
                        </div>
                    </div>

                    <div className="site-home-hero-artefact">
                        <ExceptionPacket />
                        <RouteLineAnimation />
                    </div>
                </div>
            </section>

            {/* ── Trust Strip ───────────────────────────────────────── */}
            <section className="border-y border-border bg-card py-6" aria-label="Trust signals">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-6 sm:grid-cols-3">
                        {trustSignals.map((signal) => {
                            const Icon = signal.icon;
                            return (
                                <div key={signal.label} className="flex items-center gap-3">
                                    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                    <p className="text-[13px] leading-snug text-foreground-subtle">
                                        {signal.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── The Problem ───────────────────────────────────────── */}
            <section className="site-section site-section-muted">
                <div className="site-container">
                    <div className="site-home-section-intro" data-reveal="block">
                        <p className="site-kicker">The problem</p>
                        <h2 className="site-h2">AP controls don&apos;t fail spectacularly. They fail quietly.</h2>
                        <p className="site-body">
                            In the gap between what your team checks and what actually moves.
                            A carrier invoice comes in 15% over the agreed rate. Someone flags
                            it by email. It sits for three days. Either it gets paid wrong or
                            a person chases it down manually.
                        </p>
                        <p className="site-body">
                            That&apos;s one invoice. You have thirty more this week.
                        </p>
                    </div>

                    <div className="pressure-ledger" aria-label="Common payment control pressure points">
                        <div className="pressure-ledger-bar" aria-hidden="true" />
                        <div className="pressure-ledger-inner">
                            <div className="pressure-ledger-grid" data-reveal="stagger">
                                {pressureGroups.map((group) => (
                                    <div key={group.label} className="pressure-col" data-reveal-child>
                                        <p className="pressure-col-label">{group.label}</p>
                                        <div className="pressure-col-rule" aria-hidden="true" />
                                        <ul className="pressure-col-list" aria-label={group.label}>
                                            {group.items.map((item) => (
                                                <li key={item} className="pressure-item">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="site-home-question" data-reveal="block">
                        <p className="site-home-question-title">
                            Are your payment controls still living in inboxes, spreadsheets, and one person&apos;s memory?
                        </p>
                        <p className="site-home-question-body">
                            We build AP controls and supplier payment workflows that handle
                            invoice exceptions, payment approval checks, and audit trails
                            inside the systems you already use.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Who It's For ──────────────────────────────────────── */}
            <section className="site-section">
                <div className="site-container">
                    <div className="site-home-section-intro" data-reveal="block">
                        <p className="site-kicker">Who it is for</p>
                        <h2 className="site-h2">Built for teams like yours</h2>
                        <p className="site-body">
                            Australian finance teams in freight, logistics, wholesale,
                            distribution, manufacturing, and construction, where supplier
                            volume and payment complexity create daily manual work.
                        </p>
                    </div>

                    <div className="site-home-vertical-ledger" data-reveal="stagger">
                        {verticals.map((vertical, index) => {
                            const Icon = vertical.icon;
                            return (
                                <article
                                    key={vertical.companyType}
                                    className="ledger-entry"
                                    data-reveal-child
                                >
                                    <span className="ledger-entry-number" aria-hidden="true">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <div className="ledger-entry-meta">
                                            <Icon className="ledger-entry-icon" aria-hidden="true" />
                                            <p className="site-meta">{vertical.companyType}</p>
                                        </div>
                                        <h3 className="site-h3">{vertical.pain}</h3>
                                        <p className="site-card-body">{vertical.details}</p>
                                        <p className="site-home-card-meta">{vertical.buyers}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── AP Controls Scan ──────────────────────────────────── */}
            <section className="site-section site-section-muted">
                <div className="site-container">
                    <div className="site-home-section-intro" data-reveal="block">
                        <p className="site-kicker">Start here</p>
                        <h2 className="site-h2">Find out what your AP data is hiding. It&apos;s free.</h2>
                        <p className="site-body">
                            Send us a 90-day export from Xero or MYOB. We run five checks
                            against it and return a 2-page findings report within 48 hours.
                        </p>
                        <p className="site-body">
                            No call. No pitch. Just findings from your own data. We built
                            this because showing you something real beats anything we could
                            say in an introduction. If we find a duplicate payment you
                            didn&apos;t know about, you&apos;ll know we can do the work.
                            If we find nothing, we&apos;ll tell you that honestly.
                        </p>
                    </div>

                    <div className="mx-auto max-w-3xl" data-reveal="block">
                        <div className="border border-border bg-background p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <ScanLine className="size-5 text-primary" aria-hidden="true" />
                                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                    What we check
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {scanChecks.map((check) => (
                                    <li key={check} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-subtle">
                                        <span className="mt-1.5 size-1.5 shrink-0 bg-primary/60 rounded-full" aria-hidden="true" />
                                        {check}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 border-t border-border pt-6 text-xs text-foreground-subtle leading-relaxed">
                                We sign a mutual NDA before you send anything. Your file is
                                encrypted in transit, never shared, and deleted within 7 days.
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-reveal="block">
                            <Link href="/contact/?scan=1" className="site-button">
                                Request Your Free AP Controls Scan
                                <ArrowRight className="site-button-icon" aria-hidden="true" />
                            </Link>
                            <Link href="/resources/supplier-payment-control-rule-table/interactive/" className="site-button-secondary">
                                {RULE_TABLE_CTA}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How It Works ──────────────────────────────────────── */}
            <section className="site-section">
                <div className="site-home-process-grid">
                    <div className="site-copy-center" data-reveal="block">
                        <p className="site-kicker">How it works</p>
                        <h2 className="site-h2">One workflow. One team. Nothing starts until the scope is written down.</h2>
                        <p className="site-body">
                            Each client gets a dedicated delivery team. That team owns the
                            workflow, the acceptance criteria, and the support after launch.
                        </p>

                        <div className="site-home-criteria">
                            <p className="site-meta">What done means</p>
                            <ul className="site-home-criteria-list">
                                {acceptanceCriteria.map((criterion) => (
                                    <li key={criterion} className="site-home-criteria-item">
                                        <ClipboardCheck className="site-home-criteria-icon" aria-hidden="true" />
                                        {criterion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="site-home-step-ledger" data-reveal="stagger">
                        {workflowSteps.map((step, index) => (
                            <div key={step.title} className="site-home-step" data-reveal-child>
                                <div className="site-home-step-node" aria-hidden="true">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                                <div>
                                    <h3 className="site-card-title">{step.title}</h3>
                                    <p className="site-home-step-body">{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ─────────────────────────────────────────── */}
            <section className="site-section site-section-muted">
                <div className="site-container">
                    <div className="site-home-final-panel" data-reveal="block">
                        <div className="site-home-final-layout">
                            <div className="site-home-final-copy">
                                <Route className="site-icon" aria-hidden="true" />
                                <h2 className="site-h2">Not sure we&apos;re the right fit? Start with the scan.</h2>
                                <p className="site-body">
                                    Send us your AP data. If we find something worth fixing,
                                    we&apos;ll tell you exactly what it would take. If we
                                    don&apos;t, you&apos;ll know your controls are clean in
                                    those five areas.
                                </p>
                                <p className="site-small">
                                    Either way, within 48 hours you&apos;ll know more about
                                    your payment controls than you do today.
                                </p>
                            </div>

                            <div className="site-home-final-actions">
                                <Link href="/contact/?scan=1" className="site-button">
                                    Get Your Free AP Controls Scan
                                    <ArrowRight className="site-button-icon" aria-hidden="true" />
                                </Link>
                                <a
                                    href={BOOK_MEETING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="site-button-secondary"
                                >
                                    {BOOK_MEETING_CTA}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
