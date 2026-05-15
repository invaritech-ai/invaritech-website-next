import {
    ArrowRight,
    ClipboardCheck,
    Gauge,
    Landmark,
    Route,
    Truck,
    Warehouse,
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
        details: "Surcharge variance, duplicate invoice variants, missing PODs, and rate-card mismatches.",
        buyers: "AP Manager, Controller, Finance Ops",
    },
    {
        icon: Warehouse,
        companyType: "Wholesale & distribution",
        pain: "Silent leakage from duplicate and erroneous payments",
        details: "PO-invoice mismatch, split shipments, supplier statement gaps, credits, and returns.",
        buyers: "Finance Manager, AP Lead, Shared Services",
    },
    {
        icon: Gauge,
        companyType: "Manufacturing",
        pain: "Manual review load from three-way match exceptions",
        details: "PO, goods receipt, invoice mismatch, material price variance, and unit conversion issues.",
        buyers: "Controller, Finance Ops, Operations Finance",
    },
    {
        icon: Landmark,
        companyType: "Mining & construction",
        pain: "High-value payment control risk",
        details: "Progress claim validation, retention release, variation mismatch, and project cost-code errors.",
        buyers: "Commercial Finance, AP Manager, Controller",
    },
];

const workflowSteps = [
    {
        title: "Map the control problem",
        body: "We isolate one payment-control workflow where exceptions create rework, leakage, or audit gaps.",
    },
    {
        title: "Lock the objective",
        body: "Before build starts, we agree three measurable acceptance criteria that are inside our control.",
    },
    {
        title: "Build around current systems",
        body: "We add rule logic, invoice exception management routing, payment approval checks, evidence capture, and audit trails without forcing a system change.",
    },
    {
        title: "Keep it working",
        body: "After delivery, we maintain the control with rule updates, tuning, monitoring, and hands-on support.",
    },
];

const acceptanceCriteria = [
    "Every in-scope exception is routed before payment release.",
    "Every approved exception has verification evidence attached.",
    "Every release decision is replayable with owner, timestamp, and audit notes.",
];

const trustCards = [
    {
        title: "Control design",
        body: "Rules, queues, approval evidence, release decisions, and replayable audit trails.",
    },
    {
        title: "Founder-led service",
        body: "The people who scope the workflow stay close to the build and support.",
    },
    {
        title: "Ongoing managed care",
        body: "Low-cost maintenance after delivery so the agreed control keeps working as rules change.",
    },
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
                            We help Australian finance and accounts payable teams strengthen controls
                            around invoice exceptions, payment approvals, duplicate payments, and supplier
                            payment workflows without replacing the software they already use.
                        </p>
                        <p className="site-home-hero-support">
                            Founder-led. One client at a time. Fixed scope first, then managed support.
                        </p>
                        <div className="site-button-row-center">
                            <Link href="/resources/" className="site-button">
                                {RULE_TABLE_CTA}
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

            {/* ── The Problem ───────────────────────────────────────── */}
            <section className="site-section site-section-muted">
                <div className="site-container">
<div className="site-home-section-intro" data-reveal="block">
                        <p className="site-kicker">The problem</p>
                        <h2 className="site-h2">What your finance team is dealing with</h2>
                        <p className="site-body">
                            Accounts payable controls rarely fail in one obvious place. Invoice approval
                            workflow gaps, supplier statement reconciliation issues, freight invoice audit
                            misses, and duplicate vendor payments show up as daily symptoms your team has
                            learned to work around.
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
                            Are your payment controls still living in inboxes, spreadsheets, and tribal knowledge?
                        </p>
                        <p className="site-home-question-body">
                            We design accounts payable controls and supplier payment workflows that handle
                            invoice exceptions, payment approval checks, and audit trails inside your
                            current stack.
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
                            Built for Australian finance teams in freight, logistics, wholesale, distribution,
                            manufacturing, mining, and construction.
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

            {/* ── How It Works ──────────────────────────────────────── */}
            <section className="site-section site-section-muted">
                <div className="site-home-process-grid">
                    <div className="site-copy-center" data-reveal="block">
                        <p className="site-kicker">How it works</p>
                        <h2 className="site-h2">A fixed-scope control sprint</h2>
                        <p className="site-body">
                            One workflow. One owner. Fixed scope. Measurable control improvements.
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
            <section className="site-section">
                <div className="site-container">
                    <div className="site-home-final-panel" data-reveal="block">
                        <div className="site-home-final-layout">
                            <div className="site-home-final-copy">
                                <Route className="site-icon" aria-hidden="true" />
                                <h2 className="site-h2">Start with the rule table.</h2>
                                <p className="site-body">
                                    Request the workbook we use to map supplier payment controls, invoice
                                    exception routing, payment approval checks, and audit notes before
                                    payment release.
                                </p>
                                <p className="site-small">
                                    Use it to see how we think before booking a call.
                                </p>
                            </div>

                            <div className="site-home-final-actions">
                                <Link href="/resources/" className="site-button">
                                    {RULE_TABLE_CTA}
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

                    <div className="site-home-trust-ledger" data-reveal="stagger">
                        {trustCards.map((card, index) => (
                            <div key={card.title} className="site-home-trust-entry" data-reveal-child>
                                <span className="site-home-trust-number" aria-hidden="true">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="site-card-title">{card.title}</h3>
                                    <p className="site-card-body">{card.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
