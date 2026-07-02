"use client";

import { Suspense } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ClipboardList,
    FileCheck2,
    ShieldCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SupplierPaymentControlTool } from "@/components/supplier-payment-control-tool";

export type FaqItem = {
    question: string;
    answer: string;
};

const workflowUses = [
    {
        icon: ClipboardList,
        title: "Before invoice approval",
        body: "Use the checklist to decide which exceptions need review, which evidence must be attached, and which owner signs off before AP moves the invoice forward.",
    },
    {
        icon: ShieldCheck,
        title: "Before payment release",
        body: "Use the release decision output to stop duplicate payments, bank-detail fraud risk, unsupported approvals, and missing evidence from slipping into the payment run.",
    },
    {
        icon: FileCheck2,
        title: "Before automation scoping",
        body: "Use the recommended controls to see what should stay manual, what should become a hold or match step, and what is worth encoding into an automated workflow.",
    },
];

const relatedLinks = [
    {
        label: "Automated invoice processing guide",
        title: "See how AP controls fit the full invoice workflow",
        body: "Use this guide when the question moves from one control to the full intake, approval, exception, posting, and audit-trail flow.",
        href: "/resources/invoice-processing-automation/",
        cta: "Read the guide",
    },
    {
        label: "Free invoice extractor",
        title: "Test the intake step on a real supplier invoice",
        body: "Extract invoice fields into CSV first, then use the checklist to decide what AP still needs to review before approval or payment release.",
        href: "/resources/invoice-extractor/",
        cta: "Open the extractor",
    },
    {
        label: "Three-way match exceptions",
        title: "Check PO, receipt, and invoice mismatch logic",
        body: "Use this when the AP issue is not only approval evidence, but also whether the invoice matches the purchase order and goods receipt.",
        href: "/resources/three-way-match/",
        cta: "Review the matcher",
    },
    {
        label: "Finance automation",
        title: "Place AP controls in the wider finance model",
        body: "Connect payment controls to invoice exceptions, approval workflow, payment release, and month-end follow-up.",
        href: "/finance-automation/",
        cta: "See the wider model",
    },
];

export default function ResourceRuleTableClient({ faqs }: { faqs: FaqItem[] }) {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <div className="site-container pt-32 md:pt-36">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Resources", href: "/resources/" },
                        { label: "Accounts Payable Controls Checklist" },
                    ]}
                />
            </div>

            <section className="pt-14 pb-14 md:pt-18 md:pb-18">
                <div className="site-container">
                    <div className="max-w-5xl">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Accounts payable controls
                            </p>
                        </div>
                        <h1 className="site-h2">
                            Accounts Payable Controls Checklist
                        </h1>
                        <p className="site-lead mt-8 max-w-4xl">
                            Use this tool to decide which payment controls, invoice approval
                            workflow checks, evidence requirements, owners, and release decisions
                            apply before AP approves or pays an invoice.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-[1px] bg-border lg:grid-cols-3">
                        {workflowUses.map((item) => (
                            <article key={item.title} className="bg-background p-6 md:p-7">
                                <item.icon className="size-5 text-primary" aria-hidden="true" />
                                <h2 className="site-card-title mt-5">{item.title}</h2>
                                <p className="site-card-body mt-3">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-card py-12 md:py-16">
                <div className="site-container">
                    <div className="max-w-3xl">
                        <p className="site-meta text-primary">Interactive checklist</p>
                        <h2 className="site-h3 mt-4">
                            Choose the AP scenario. Get the control pack.
                        </h2>
                        <p className="site-body mt-3">
                            Start with the exception or payment situation. The tool recommends the
                            checks, evidence, owner lane, and release posture AP should use before
                            anything gets approved or paid.
                        </p>
                    </div>
                    <div className="mt-10">
                        <Suspense fallback={<div className="border border-border bg-background p-6 text-sm text-foreground-subtle">Loading the AP controls checklist...</div>}>
                            <SupplierPaymentControlTool />
                        </Suspense>
                    </div>
                </div>
            </section>

            <section className="site-section">
                <div className="site-container">
                    <div className="max-w-3xl">
                        <p className="site-meta text-primary">Related finance resources</p>
                        <h2 className="site-h3 mt-4">
                            Keep the control decision connected to the rest of the workflow.
                        </h2>
                        <p className="site-body mt-3">
                            Use the checklist when AP needs a release decision. Use the linked
                            guides and tools when the work expands into invoice intake, matching,
                            exception routing, or a broader finance automation rollout.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-[1px] bg-border lg:grid-cols-2">
                        {relatedLinks.map((link) => (
                            <article key={link.href} className="bg-background p-6 md:p-7">
                                <p className="site-meta text-primary">{link.label}</p>
                                <h3 className="site-card-title mt-4">{link.title}</h3>
                                <p className="site-card-body mt-3">{link.body}</p>
                                <Link
                                    href={link.href}
                                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
                                >
                                    {link.cta}
                                    <ArrowRight className="size-3" aria-hidden="true" />
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-card py-12 md:py-16">
                <div className="site-container">
                    <div className="max-w-3xl">
                        <p className="site-meta text-primary">Questions</p>
                        <h2 className="site-h3 mt-4">
                            What AP teams usually ask before they document controls
                        </h2>
                    </div>

                    <div className="mt-8 grid gap-[1px] bg-border">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="bg-background px-6 py-5 md:px-7"
                            >
                                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-foreground">
                                    {faq.question}
                                </summary>
                                <p className="site-card-body mt-4 max-w-4xl">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="site-section">
                <div className="site-container">
                    <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                            <p className="site-meta text-primary">Next step</p>
                            <h2 className="site-h3 mt-4">Share one manual workflow.</h2>
                            <p className="site-body mt-3 max-w-3xl">
                                Bring one approval path, exception, or handoff that still runs
                                manually. We will tell you which checks should stay manual, which
                                should become explicit, and whether it is worth scoping.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/contact/?diagnostic=1"
                                className="site-button gap-2"
                            >
                                Share a Workflow
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/resources/invoice-extractor/"
                                className="site-button-secondary"
                            >
                                Try the invoice extractor
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
