"use client";

import Link from "next/link";
import {
    ArrowRight,
    Calculator,
    FileSearch,
    FileText,
    ListChecks,
    ShieldCheck,
} from "lucide-react";

import { resources } from "@/lib/resources";
import ResourceCard from "@/components/resource-card";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

const problemPaths = [
    {
        icon: FileSearch,
        label: "Extract invoice data",
        title: "Turn one supplier invoice into CSV",
        body: "Use the free invoice extractor for supplier details, invoice numbers, dates, totals, tax, and line items.",
        href: "/resources/invoice-extractor/",
        cta: "Open invoice extractor",
    },
    {
        icon: ListChecks,
        label: "Check payment controls",
        title: "Decide what AP should hold, match, and evidence",
        body: "Use the accounts payable controls checklist before invoice approval or payment release.",
        href: "/resources/accounts-payable-controls/",
        cta: "Open AP controls",
    },
    {
        icon: ListChecks,
        label: "Check three-way match",
        title: "Compare PO, invoice, and receipt fields",
        body: "Use the three-way match tool to classify mismatches before approval or payment release.",
        href: "/glossary/three-way-match/",
        cta: "Open matcher",
    },
    {
        icon: FileText,
        label: "Understand invoice automation",
        title: "Map invoice OCR, exceptions, approvals, and audit trails",
        body: "Read the automated invoice processing guide before buying software or scoping a build.",
        href: "/resources/invoice-processing-automation/",
        cta: "Read the guide",
    },
    {
        icon: Calculator,
        label: "Estimate close effort",
        title: "Price the manual work hiding in month-end close",
        body: "Use the cost-to-close calculator to baseline manual finance effort before automation.",
        href: "/resources/cost-to-close-calculator/",
        cta: "Open calculator",
    },
];

const clusterLinks = [
    {
        title: "Finance automation overview",
        body: "Start here if you are deciding where automation belongs around AP, invoice approvals, payment controls, and close work.",
        href: "/finance-automation/",
        cta: "Read finance automation",
    },
    {
        title: "Invoice processing path",
        body: "Use this when the pain starts at invoice intake, OCR, validation, exception routing, or approval evidence.",
        href: "/resources/invoice-processing-automation/",
        cta: "Read invoice guide",
    },
    {
        title: "AP control path",
        body: "Use this when AP is unsure whether a payment should be released, held, escalated, or documented.",
        href: "/resources/accounts-payable-controls/",
        cta: "Check AP controls",
    },
    {
        title: "Three-way match path",
        body: "Use this when the blocker is a PO, invoice, receipt, quantity, price, or evidence mismatch.",
        href: "/glossary/three-way-match/",
        cta: "Open matcher",
    },
];

const complianceProofPoints = [
    {
        label: "Intake",
        body: "Supplier evidence, commodity records, and submission inputs are collected before the regulated filing step.",
    },
    {
        label: "Validation",
        body: "Schema, geo-data, and required evidence checks happen before anything is sent to the external system.",
    },
    {
        label: "Submission evidence",
        body: "Statuses, retries, references, and operator actions stay traceable after the bridge runs.",
    },
];

export default function ResourceLibraryClient() {
    const financeResources = resources.filter(
        (resource) => resource.pillar === "finance-ops",
    );
    const complianceResources = resources.filter(
        (resource) => resource.pillar === "regops",
    );

    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <section className="site-section-hero">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="mb-8 flex items-center gap-3" data-reveal="block">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Free finance automation tools
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Free finance automation tools for AP teams.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Use live tools and guides for invoice extraction, AP controls,
                            three-way match checks, invoice processing automation, and close
                            cost analysis. Each resource here is available now.
                        </p>
                    </div>
                </div>
            </section>

            <section id="tools" className="scroll-mt-24 border-y border-border bg-card py-14 md:py-20">
                <div className="site-container">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <div data-reveal="block">
                            <div className="mb-8 inline-flex items-center gap-3 border border-primary/30 bg-primary/[0.05] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                                <ListChecks className="size-4" aria-hidden="true" />
                                Start with the problem
                            </div>
                            <h2 className="site-h2">
                                Choose the right finance automation resource.
                            </h2>
                            <p className="site-lead mt-6">
                                AP teams usually do not need another generic ebook. They need a
                                fast way to test the work in front of them: invoice data,
                                approval checks, exception rules, and close effort.
                            </p>
                        </div>
                        <div className="grid gap-[1px] bg-border" data-reveal="stagger">
                            {problemPaths.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group grid gap-5 bg-background p-6 transition-colors hover:bg-background-soft md:grid-cols-[12rem_1fr_auto] md:items-center"
                                    data-reveal-child
                                >
                                    <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-primary">
                                        <item.icon className="size-4" aria-hidden="true" />
                                        {item.label}
                                    </div>
                                    <div>
                                        <h3 className="site-card-title">{item.title}</h3>
                                        <p className="site-card-body mt-2">{item.body}</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
                                        {item.cta}
                                        <ArrowRight className="size-3" aria-hidden="true" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="guides" className="site-section scroll-mt-24">
                <div className="site-container">
                    <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end" data-reveal="block">
                        <div>
                            <div className="mb-8 flex items-center gap-3">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Live finance tools
                                </p>
                            </div>
                            <h2 className="site-h2">Open tools for invoice and AP work.</h2>
                        </div>
                        <p className="site-body text-foreground-subtle">
                            These resources are built for operators who need to move from
                            manual checking to a clearer finance automation path. Use them
                            before buying software, scoping a build, or changing an approval
                            workflow.
                        </p>
                    </div>

                    <div
                        className="grid gap-[1px] bg-border md:grid-cols-2 lg:grid-cols-3"
                        data-reveal="stagger"
                    >
                        {financeResources.map((resource) => (
                            <div key={resource.slug} data-reveal-child>
                                <ResourceCard resource={resource} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-card py-14 md:py-18">
                <div className="site-container">
                    <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-start" data-reveal="block">
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Finance automation path
                                </p>
                            </div>
                            <h2 className="site-h3">
                                Use the tools as a working sequence.
                            </h2>
                        </div>
                        <div className="grid gap-[1px] bg-border">
                            {clusterLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group grid gap-4 bg-background p-5 transition-colors hover:bg-background-soft sm:grid-cols-[1fr_auto] sm:items-center"
                                >
                                    <div>
                                        <h3 className="site-card-title">{link.title}</h3>
                                        <p className="site-card-body mt-2">{link.body}</p>
                                    </div>
                                    <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
                                        {link.cta}
                                        <ArrowRight className="size-3" aria-hidden="true" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {complianceResources.length > 0 && (
                <section className="site-section">
                    <div className="site-container">
                        <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end" data-reveal="block">
                            <div>
                                <div className="mb-8 flex items-center gap-3">
                                    <div className="h-px w-8 bg-primary/60" />
                                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                        Compliance automation
                                    </p>
                                </div>
                                <h2 className="site-h3">A shipped compliance bridge example.</h2>
                            </div>
                            <p className="site-body text-foreground-subtle">
                                Most tools here support AP and finance work. This compliance
                                example shows the same operating model in regulated submissions:
                                intake, validation, retry handling, status tracking, and
                                audit-ready evidence.
                            </p>
                        </div>
                        {complianceResources.length === 1 ? (
                            <Link
                                href={complianceResources[0].href}
                                className="group grid overflow-hidden border border-border bg-background transition-colors hover:bg-background-soft lg:grid-cols-[0.82fr_1.18fr]"
                                data-reveal="block"
                                aria-label={`Read guide: ${complianceResources[0].title}`}
                            >
                                <article className="flex flex-col gap-6 p-6 md:p-8">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
                                            Guide
                                        </span>
                                        <span className="border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                                            Compliance automation
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="site-card-title text-3xl md:text-4xl">
                                            {complianceResources[0].title}
                                        </h3>
                                        <p className="site-card-body mt-4 max-w-xl">
                                            {complianceResources[0].excerpt}
                                        </p>
                                    </div>

                                    <dl className="mt-auto grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 border-t border-border pt-5">
                                        <dt className="site-meta">Industry</dt>
                                        <dd className="text-sm text-foreground-muted">
                                            {complianceResources[0].industry}
                                        </dd>
                                        <dt className="site-meta">Format</dt>
                                        <dd className="text-sm text-foreground-muted">
                                            {complianceResources[0].format}
                                        </dd>
                                    </dl>

                                    <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
                                        Read guide
                                        <ArrowRight className="size-3" aria-hidden="true" />
                                    </span>
                                </article>

                                <div className="border-t border-border bg-card lg:border-l lg:border-t-0">
                                    <div className="grid h-full">
                                        {complianceProofPoints.map((point, index) => (
                                            <div
                                                key={point.label}
                                                className={[
                                                    "grid gap-4 p-6 md:grid-cols-[9rem_1fr] md:p-8",
                                                    index > 0 ? "border-t border-border" : "",
                                                ].join(" ")}
                                            >
                                                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-primary">
                                                    <ShieldCheck className="size-4" aria-hidden="true" />
                                                    {point.label}
                                                </div>
                                                <p className="site-card-body">{point.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="grid gap-[1px] bg-border md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
                                {complianceResources.map((resource) => (
                                    <div key={resource.slug} data-reveal-child>
                                        <ResourceCard resource={resource} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <section className="site-section">
                <div className="site-container">
                    <div
                        className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center"
                        data-reveal="block"
                    >
                        <div>
                            <h2 className="site-h3">Have a live finance control problem?</h2>
                            <p className="site-body mt-3">
                                Bring one approval workflow, exception queue, reconciliation
                                issue, or duplicate payment example. We will map the current
                                process and identify the smallest useful automation scope.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 md:justify-end">
                            <Link
                                href="/contact/?diagnostic=1"
                                className="site-button gap-2"
                            >
                                Share a Workflow
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/finance-automation/"
                                className="site-button-secondary gap-2"
                            >
                                Read Finance Automation
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <HomepageScrollAnimations />
        </main>
    );
}
