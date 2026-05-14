"use client";

import {
    ArrowRight,
    ClipboardList,
    Route,
    ShieldCheck,
    FileSpreadsheet,
    ListChecks,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import ResourceDownloadForm from "@/components/resource-download-form";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";
import { BOOK_MEETING_URL, BOOK_MEETING_CTA } from "@/lib/marketing";

const PREVIEW_ROWS = [
    {
        condition: "Changed payment detail",
        check: "Callback verification",
        route: "Controller",
        evidence: "Callback log + email",
        sla: "24 hrs",
    },
    {
        condition: "Carrier surcharge variance",
        check: "Match rate card",
        route: "AP Owner",
        evidence: "Rate card + POD",
        sla: "48 hrs",
    },
    {
        condition: "Missing proof-of-delivery",
        check: "Hold invoice",
        route: "Ops Finance",
        evidence: "POD attachment",
        sla: "72 hrs",
    },
    {
        condition: "PO / invoice mismatch",
        check: "Three-way match",
        route: "Finance Manager",
        evidence: "PO + GRN + invoice",
        sla: "48 hrs",
    },
    {
        condition: "Duplicate invoice variant",
        check: "Dedup check",
        route: "AP Lead",
        evidence: "Prior payment record",
        sla: "24 hrs",
    },
];

const whoItIsFor = [
    {
        icon: ClipboardList,
        title: "AP Managers and Controllers",
        body: "Teams dealing with supplier payment-change requests, bank detail changes, invoice approval workflow gaps, and release checks.",
    },
    {
        icon: Route,
        title: "Finance Ops and Shared Services",
        body: "Centralised teams managing invoice exceptions across multiple business units or supplier groups.",
    },
    {
        icon: ShieldCheck,
        title: "Freight, wholesale, manufacturing, and mining finance teams",
        body: "Teams with high supplier invoice volumes where exceptions create rework, duplicate payment risk, leakage, or audit exposure.",
    },
];

const whatIsInside = [
    {
        n: "01",
        title: "Exception condition library",
        body: "Pre-built list of supplier payment and invoice exception conditions, ready to adapt to your team.",
    },
    {
        n: "02",
        title: "Control check column",
        body: "What payment approval check must pass before the exception can proceed: callback, evidence, match, or hold.",
    },
    {
        n: "03",
        title: "Routing and owner fields",
        body: "Who handles each exception type, with a default SLA per condition and an escalation path.",
    },
    {
        n: "04",
        title: "Evidence standard",
        body: "What documentation must be attached before an exception can be approved.",
    },
    {
        n: "05",
        title: "Audit trail fields",
        body: "Owner, timestamp, approval note, and decision status — replayable at month-end or on request.",
    },
];

export default function ResourceRuleTableClient() {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            {/* ── Breadcrumb ────────────────────────────────────────── */}
            <div className="site-container pt-32 md:pt-36">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Resources", href: "/resources/" },
                        { label: "Supplier Payment Control Rule Table" },
                    ]}
                />
            </div>

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="pt-16 pb-20 md:pt-20 md:pb-28">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="mb-8 flex items-center gap-3" data-reveal="block">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Rule Table
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Supplier Payment Control Rule Table
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            For finance teams checking supplier payment-detail changes,
                            invoice exceptions, and payment approvals before release.
                            Map the approval check, owner, evidence, routing, and audit
                            trail for each exception type.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Who it's for ──────────────────────────────────────── */}
            <section className="site-section">
                <div className="site-container">
                    <div className="mb-10 flex items-center gap-3" data-reveal="block">
                        <div className="h-px w-8 bg-primary/60" />
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Who it&apos;s for
                        </p>
                    </div>
                    <div
                        className="grid gap-[1px] bg-border md:grid-cols-3"
                        data-reveal="stagger"
                    >
                        {whoItIsFor.map((item) => (
                            <div
                                key={item.title}
                                className="site-card bg-background"
                                data-reveal-child
                            >
                                <item.icon
                                    className="size-5 text-primary"
                                    aria-hidden="true"
                                />
                                <h2 className="site-card-title mt-5">{item.title}</h2>
                                <p className="site-card-body mt-2">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── What's inside ─────────────────────────────────────── */}
            <section className="border-y border-border bg-card py-16 md:py-24">
                <div className="site-container">
                    <div
                        className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
                    >
                        <div data-reveal="block">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    What&apos;s inside
                                </p>
                            </div>
                            <h2 className="site-h2">Five sections. No filler.</h2>
                            <p className="site-body mt-6">
                                Each section maps to a real step in the invoice exception
                                management process, from first flag to final release
                                decision. Use it as-is, or adapt the names, owners, and
                                routing to your current workflow.
                            </p>
                        </div>

                        <div
                            className="site-home-step-ledger"
                            data-reveal="stagger"
                        >
                            {whatIsInside.map((item) => (
                                <div
                                    key={item.n}
                                    className="site-home-step"
                                    data-reveal-child
                                >
                                    <div
                                        className="site-home-step-node"
                                        aria-hidden="true"
                                    >
                                        {item.n}
                                    </div>
                                    <div>
                                        <h3 className="site-card-title">
                                            {item.title}
                                        </h3>
                                        <p className="site-home-step-body">
                                            {item.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Request section ───────────────────────────────────── */}
            <section className="site-section" id="request">
                <div className="site-container">
                    <div className="mb-10 flex items-center gap-3" data-reveal="block">
                        <div className="h-px w-8 bg-primary/60" />
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Request access
                        </p>
                    </div>
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
                        {/* Left: mini preview */}
                        <div
                            className="exception-packet"
                            role="region"
                            aria-label="Rule table preview"
                            data-reveal="block"
                        >
                            <div className="exception-packet-bar" aria-hidden="true" />
                            <div className="exception-packet-inner">
                                <p className="exception-packet-eyebrow">
                                    Rule Table — Preview
                                </p>
                                <div className="exception-packet-header">
                                    <span
                                        className="control-stamp control-stamp-held"
                                        aria-label="Gated resource"
                                    >
                                        Gated
                                    </span>
                                </div>
                                <p className="exception-packet-section-label">
                                    Sample control rules
                                </p>
                                <div className="exception-packet-desktop">
                                    <table
                                        className="exception-packet-table"
                                        aria-label="Rule table preview"
                                    >
                                        <thead>
                                            <tr className="exception-packet-table-head">
                                                <th scope="col">Exception condition</th>
                                                <th scope="col">Check</th>
                                                <th scope="col">Route to</th>
                                                <th scope="col">Evidence required</th>
                                                <th scope="col">SLA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PREVIEW_ROWS.map((row) => (
                                                <tr
                                                    key={row.condition}
                                                    className="exception-packet-table-row"
                                                >
                                                    <td>{row.condition}</td>
                                                    <td>{row.check}</td>
                                                    <td>{row.route}</td>
                                                    <td>{row.evidence}</td>
                                                    <td>{row.sla}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-3 font-mono text-[10px] tracking-[0.1em] text-foreground-subtle">
                                    5 of 18 rows shown — request access for full workbook
                                </p>
                                <div className="mt-6 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-foreground-subtle">
                                        <FileSpreadsheet
                                            className="size-3.5 text-primary"
                                            aria-hidden="true"
                                        />
                                        Workbook (.xlsx)
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-foreground-subtle">
                                        <ListChecks
                                            className="size-3.5 text-primary"
                                            aria-hidden="true"
                                        />
                                        18 control rules
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: download form */}
                        <div data-reveal="block">
                            <ResourceDownloadForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Secondary CTA ─────────────────────────────────────── */}
            <section className="site-section">
                <div className="site-container">
                    <div
                        className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center"
                        data-reveal="block"
                    >
                        <div>
                            <h2 className="site-h3">
                                Prefer to talk through a live exception first?
                            </h2>
                            <p className="site-body mt-3">
                                Bring one real supplier payment exception or invoice
                                approval workflow. We will tell you whether it fits a
                                fixed-scope control sprint.
                            </p>
                        </div>
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-button-secondary gap-2"
                        >
                            {BOOK_MEETING_CTA}
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
