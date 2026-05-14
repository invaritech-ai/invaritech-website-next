"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, ListChecks, ShieldCheck } from "lucide-react";
import {
    getAllResources,
    CATEGORY_LABELS,
    CATEGORY_KEYS,
    type CategoryKey,
} from "@/lib/resources";
import ResourceCard from "@/components/resource-card";
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

const resourceNotes = [
    {
        icon: ListChecks,
        title: "Ordered checks",
        body: "Rule logic for spotting exceptions before a payment is released.",
    },
    {
        icon: ShieldCheck,
        title: "Evidence standard",
        body: "What should be attached before an exception can be approved.",
    },
    {
        icon: FileSpreadsheet,
        title: "Queue design",
        body: "Owner, status, SLA, approval note, and audit trail fields.",
    },
];

export default function ResourceLibraryClient() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
    const allResources = getAllResources();

    const filtered =
        activeCategory === "all"
            ? allResources
            : allResources.filter((r) => r.category === activeCategory);

    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="site-section-hero">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="mb-8 flex items-center gap-3" data-reveal="block">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Payment Control Resources
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Practical accounts payable control resources for finance teams.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Rule tables, checklists, and guides for teams managing invoice
                            approval workflow gaps, invoice exceptions, and payment approval checks.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Featured Asset Panel ──────────────────────────────── */}
            <section className="border-y border-border bg-card py-16 md:py-24">
                <div className="site-container">
                    <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                        {/* Left: copy + resource notes */}
                        <div data-reveal="block">
                            <div className="mb-8 inline-flex items-center gap-3 border border-primary/30 bg-primary/[0.05] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                                <FileSpreadsheet className="size-4" aria-hidden="true" />
                                Featured resource
                            </div>
                            <h2 className="site-h2">
                                Supplier Payment Control Rule Table
                            </h2>
                            <p className="site-lead mt-6">
                                A zero-fluff workbook for mapping supplier payment controls,
                                invoice exception routing, payment approval checks, and audit notes
                                before a payment is ever released.
                            </p>
                            <div className="mt-10 grid gap-[1px] bg-border sm:grid-cols-3">
                                {resourceNotes.map((note) => (
                                    <div key={note.title} className="bg-background p-5">
                                        <note.icon
                                            className="mb-5 size-5 text-primary"
                                            aria-hidden="true"
                                        />
                                        <h3 className="site-card-title">{note.title}</h3>
                                        <p className="site-card-body mt-2">{note.body}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-sm leading-relaxed text-foreground-subtle">
                                Most resources stay open. The workbook request asks for a few
                                operational fields because accounts payable controls vary by
                                industry, workflow, and exception type.
                            </p>
                        </div>

                        {/* Right: mini rule-table preview */}
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
                                <Link
                                    href="/resources/supplier-payment-control-rule-table/"
                                    className="site-button mt-6 gap-2"
                                >
                                    View &amp; Request Rule Table
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Library Index ─────────────────────────────────────── */}
            <section className="site-section">
                <div className="site-container">
                    <div className="mb-10 flex items-center gap-3" data-reveal="block">
                        <div className="h-px w-8 bg-primary/60" />
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Resource Library
                        </p>
                    </div>

                    {/* Filter tabs */}
                    <div
                        role="tablist"
                        aria-label="Filter resources by category"
                        className="mb-8 flex flex-wrap gap-2 border-b border-border pb-6"
                        data-reveal="block"
                    >
                        {CATEGORY_KEYS.map((key) => (
                            <button
                                key={key}
                                role="tab"
                                aria-selected={activeCategory === key}
                                onClick={() => setActiveCategory(key)}
                                className={[
                                    "px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-colors",
                                    activeCategory === key
                                        ? "border border-primary bg-primary text-primary-foreground"
                                        : "border border-border bg-transparent text-foreground-subtle hover:border-primary/40 hover:text-foreground",
                                ].join(" ")}
                            >
                                {CATEGORY_LABELS[key]}
                            </button>
                        ))}
                    </div>

                    {/* Resource cards */}
                    <div
                        className="grid gap-[1px] bg-border md:grid-cols-2 lg:grid-cols-3"
                        data-reveal="stagger"
                    >
                        {filtered.map((resource) => (
                            <div key={resource.slug} data-reveal-child>
                                <ResourceCard resource={resource} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ─────────────────────────────────────────── */}
            <section className="site-section">
                <div className="site-container">
                    <div
                        className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center"
                        data-reveal="block"
                    >
                        <div>
                                <h2 className="site-h3">Have a live exception problem?</h2>
                                <p className="site-body mt-3">
                                    Bring one real invoice approval workflow or supplier payment
                                    exception example. We will tell you if it is a fit for a
                                    fixed-scope control sprint.
                                </p>
                            </div>
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="site-button gap-2"
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
