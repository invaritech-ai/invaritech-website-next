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
        title: "Approval evidence",
        body: "Evidence fields for decisions, timestamps, owners, and approval notes.",
    },
    {
        icon: ShieldCheck,
        title: "Exception routing",
        body: "Routing logic for mismatches, payment changes, and release blockers.",
    },
    {
        icon: FileSpreadsheet,
        title: "Month-end visibility",
        body: "Queue structure for surfacing unresolved control work before close.",
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
                                    Finance Controls Resource Library
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Tools and resources for finance controls, exceptions, and evidence.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Free tools, rule tables, checklists, and guides that show how we think
                            about approval evidence, exception routing, duplicate payment risk, and
                            month-end visibility.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Featured Asset Panel ──────────────────────────────── */}
            <section id="tools" className="scroll-mt-24 border-y border-border bg-card py-16 md:py-24">
                <div className="site-container">
                    <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                        {/* Left: copy + resource notes */}
                        <div data-reveal="block">
                            <div className="mb-8 inline-flex items-center gap-3 border border-primary/30 bg-primary/[0.05] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                                <FileSpreadsheet className="size-4" aria-hidden="true" />
                                Free control tool
                            </div>
                            <h2 className="site-h2">
                                Invoice Approval Workflow & Supplier Payment Controls Rule Table
                            </h2>
                            <p className="site-lead mt-6">
                                An interactive rule table for mapping approval evidence, exception
                                routing, duplicate payment risk, and payment-release checks before
                                month-end problems become harder to trace.
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
                                Use it as a starting point for reviewing the checks, owners,
                                evidence, exception paths, and audit trail your team needs before
                                payment release.
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
            <section id="guides" className="site-section scroll-mt-24">
                <div className="site-container">
                    <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end" data-reveal="block">
                        <div>
                            <div className="mb-8 flex items-center gap-3">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Guides and Checklists
                                </p>
                            </div>
                            <h2 className="site-h2">Resource library</h2>
                        </div>
                        <p className="site-body text-foreground-subtle">
                            Open tools, practical guides, checklists, and templates for teams
                            tightening controls around finance operations, exceptions, and evidence.
                        </p>
                    </div>

                    {/* Filter tabs */}
                    <div
                        aria-label="Filter resources by category"
                        className="mb-8 flex flex-wrap gap-2 border-b border-border pb-6"
                        data-reveal="block"
                    >
                        {CATEGORY_KEYS.map((key) => (
                            <button
                                key={key}
                                aria-pressed={activeCategory === key}
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
                            <h2 className="site-h3">Have a live finance control problem?</h2>
                            <p className="site-body mt-3">
                                Bring one approval workflow, exception queue, reconciliation issue,
                                or duplicate payment example. We will map the current process and
                                identify the smallest useful automation scope.
                            </p>
                        </div>
                        <Link
                            href="/contact/?diagnostic=1"
                            className="site-button gap-2"
                        >
                            Book Workflow Diagnostic
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
