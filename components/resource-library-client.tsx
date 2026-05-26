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
import RuleTablePreview from "@/components/rule-table-preview";

const resourceNotes = [
    {
        icon: ListChecks,
        title: "Invoice approval checks",
        body: "Ordered checks for catching invoice exceptions before payment release.",
    },
    {
        icon: ShieldCheck,
        title: "Fraud evidence standard",
        body: "What evidence to attach for vendor bank detail changes and high-risk approvals.",
    },
    {
        icon: FileSpreadsheet,
        title: "Exception queue design",
        body: "Owner, status, SLA, approval note, and audit trail fields in one queue.",
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
                                    Accounts Payable Automation Resources
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Practical resources for invoice approval workflow and AP automation.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Rule tables, checklists, and guides for teams reducing duplicate payments,
                            improving supplier statement reconciliation, and preventing payment diversion fraud.
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
                                Invoice Approval Workflow & Supplier Payment Controls Rule Table
                            </h2>
                            <p className="site-lead mt-6">
                                An interactive table for mapping invoice approval workflow steps,
                                supplier payment controls, exception routing, and payment approval checks
                                before payment is released.
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
                                Use it as a starting point for reviewing the checks, owners, evidence,
                                and audit trail your team needs before payment release.
                            </p>
                        </div>

                        {/* Right: mini rule-table preview */}
                        <RuleTablePreview
                            footer={
                                <Link
                                    href="/resources/supplier-payment-control-rule-table/interactive/"
                                    className="site-button gap-2"
                                >
                                    Open Rule Table
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            }
                        />
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
                                Bring one real invoice approval workflow, supplier statement
                                reconciliation issue, or duplicate payment example. We will run the
                                first checks and tell you where the control risk sits.
                            </p>
                        </div>
                        <Link
                            href="/contact?audit=1&src=resources"
                            className="site-button gap-2"
                        >
                            Book a Finance Workflow Audit
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
