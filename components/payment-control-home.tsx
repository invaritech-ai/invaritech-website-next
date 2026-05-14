import {
    ArrowRight,
    ClipboardCheck,
    FileWarning,
    Gauge,
    Landmark,
    Route,
    ShieldCheck,
    Truck,
    Warehouse,
} from "lucide-react";
import Link from "next/link";

import { BOOK_MEETING_CTA, BOOK_MEETING_URL, BRAND_EYEBROW, RULE_TABLE_CTA } from "@/lib/marketing";
import SystemsScramble from "@/components/systems-scramble";

const proofRows = [
    {
        label: "Control",
        body: "Supplier, carrier, invoice, and claim exceptions routed before release.",
    },
    {
        label: "Evidence",
        body: "Verification notes, approver, timestamp, and source documents held together.",
    },
    {
        label: "Outcome",
        body: "Fewer manual reviews, cleaner approvals, and less leakage from preventable errors.",
    },
];

const symptoms = [
    "Invoice-to-PO mismatches",
    "Supplier statement gaps",
    "Missing proof-of-delivery documents",
    "Carrier surcharge variances",
    "Duplicate payment variants",
    "Approvals that rely on memory instead of evidence",
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
        body: "We add rule logic, exception routing, approvals, evidence capture, and audit trails without forcing a system change.",
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
            <section className="site-section-hero site-home-hero">
                <div className="site-home-hero-grid">
                    <div className="site-home-hero-copy">
                        <p className="site-kicker">{BRAND_EYEBROW}</p>
                        <h1 className="site-h1">
                            Clean up payment controls without changing{" "}
                            <SystemsScramble />.
                        </h1>
                        <p className="site-lead">
                            We help finance teams reduce manual exception chasing, tighten approvals, and
                            reduce dollar leakage across the software they already use.
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

                    <div className="site-home-proof" aria-label="Control design summary">
                        {proofRows.map((row) => (
                            <div key={row.label} className="site-home-proof-row">
                                <span className="site-home-proof-label">{row.label}</span>
                                <p className="site-home-proof-text">{row.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="site-section site-section-muted">
                <div className="site-container">
                    <div className="site-home-section-intro">
                        <p className="site-kicker">The problem</p>
                        <h2 className="site-h2">What your finance team is dealing with</h2>
                        <p className="site-body">
                            Finance workflows rarely break in one obvious place. The friction shows up as
                            daily symptoms that your team has learned to work around.
                        </p>
                    </div>

                    <div className="site-home-symptom-grid">
                        {symptoms.map((symptom) => (
                            <div key={symptom} className="site-home-symptom-card">
                                <FileWarning className="site-icon" aria-hidden="true" />
                                <p className="site-card-title">{symptom}</p>
                            </div>
                        ))}
                    </div>

                    <div className="site-home-question">
                        <p className="site-home-question-title">
                            Are your payment controls still living in inboxes, spreadsheets, and tribal knowledge?
                        </p>
                        <p className="site-home-question-body">
                            We turn manual exception chasing into controlled, auditable workflows inside your current stack.
                        </p>
                    </div>
                </div>
            </section>

            <section className="site-section">
                <div className="site-container">
                    <div className="site-home-section-intro">
                        <p className="site-kicker">Who it is for</p>
                        <h2 className="site-h2">Built for teams like yours</h2>
                        <p className="site-body">
                            Built for Australian finance teams in freight, logistics, wholesale, distribution,
                            manufacturing, mining, and construction.
                        </p>
                    </div>

                    <div className="site-home-vertical-grid">
                        {verticals.map((vertical) => {
                            const Icon = vertical.icon;

                            return (
                                <article key={vertical.companyType} className="site-home-vertical-card">
                                    <Icon className="site-icon" aria-hidden="true" />
                                    <p className="site-meta">{vertical.companyType}</p>
                                    <h3 className="site-h3">{vertical.pain}</h3>
                                    <p className="site-card-body">{vertical.details}</p>
                                    <p className="site-home-card-meta">{vertical.buyers}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="site-section site-section-muted">
                <div className="site-home-process-grid">
                    <div className="site-copy-center">
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

                    <div className="site-home-step-grid">
                        {workflowSteps.map((step, index) => (
                            <div key={step.title} className="site-home-step">
                                <span className="site-home-step-index">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="site-card-title">{step.title}</h3>
                                    <p className="site-home-step-body">{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="site-section">
                <div className="site-container">
                    <div className="site-home-final-panel">
                        <div className="site-home-final-layout">
                            <div className="site-home-final-copy">
                                <Route className="site-icon" aria-hidden="true" />
                                <h2 className="site-h2">Start with the rule table.</h2>
                                <p className="site-body">
                                    Request the workbook we use to map exception routing, evidence capture,
                                    approval checks, and audit notes before payment release.
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

                    <div className="site-home-trust-grid">
                        {trustCards.map((card) => (
                            <div key={card.title} className="site-home-trust-card">
                                <ShieldCheck className="site-icon" aria-hidden="true" />
                                <h3 className="site-card-title">{card.title}</h3>
                                <p className="site-card-body">{card.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
