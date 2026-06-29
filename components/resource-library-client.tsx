import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { resources } from "@/lib/resources";
import ResourceCard from "@/components/resource-card";

const resourceGroups = [
    {
        id: "supplier-claims",
        title: "Supplier Claims & Deductions",
        body: "Retailer claims, short-pays, debit notes, promo deductions, and duplicate credits.",
        slugs: ["supermarket-claim-types-worth-checking"],
    },
    {
        id: "finance-operations",
        title: "Finance Operations",
        body: "Invoice extraction, AP controls, matching, invoice processing, and close-effort tools.",
        slugs: [
            "invoice-extractor",
            "accounts-payable-controls",
            "three-way-match",
            "invoice-processing-automation",
            "cost-to-close-calculator",
        ],
    },
    {
        id: "compliance-operations",
        title: "Compliance Operations",
        body: "Evidence intake, validation, submission workflows, and audit-ready operational proof.",
        slugs: ["eudr-regops-bridge-case-note"],
    },
];

function resourcesFor(slugs: string[]) {
    return slugs
        .map((slug) => resources.find((resource) => resource.slug === slug))
        .filter((resource): resource is (typeof resources)[number] =>
            Boolean(resource),
        );
}

export default function ResourceLibraryClient() {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <section className="site-section-hero">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="mb-8 flex items-center gap-3">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Tools & resources
                                </p>
                            </div>
                            <h1 className="site-h2">
                                Tools and resources for operations optimization.
                            </h1>
                        </div>
                        <p className="site-lead">
                            Practical tools, checklists, calculators, and guides
                            for supplier claims, finance operations, payment
                            evidence, and compliance workflows.
                        </p>
                    </div>
                </div>
            </section>

            <section
                id="tools"
                className="site-section scroll-mt-24 border-y border-border bg-card"
            >
                <div className="site-container space-y-14">
                    {resourceGroups.map((group) => {
                        const groupResources = resourcesFor(group.slugs);

                        if (groupResources.length === 0) return null;

                        return (
                            <section
                                key={group.id}
                                aria-labelledby={`${group.id}-heading`}
                            >
                                <div className="mb-6 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
                                    <div>
                                        <h2
                                            id={`${group.id}-heading`}
                                            className="site-h3"
                                        >
                                            {group.title}
                                        </h2>
                                    </div>
                                    <p className="site-body text-foreground-subtle">
                                        {group.body}
                                    </p>
                                </div>
                                <div
                                    className={[
                                        "grid gap-[1px] bg-border",
                                        groupResources.length === 1
                                            ? "max-w-xl"
                                            : "md:grid-cols-2 lg:grid-cols-3",
                                    ].join(" ")}
                                >
                                    {groupResources.map((resource) => (
                                        <ResourceCard
                                            key={resource.slug}
                                            resource={resource}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </section>

            <section className="site-section">
                <div className="site-container">
                    <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                            <h2 className="site-h3">
                                Have an ops workflow worth tightening?
                            </h2>
                            <p className="site-body mt-3">
                                Bring one supplier claim, invoice process,
                                compliance workflow, or finance control problem.
                                We will map the current process and identify the
                                smallest useful automation scope.
                            </p>
                        </div>
                        <Link
                            href="/contact/?diagnostic=1"
                            className="site-button gap-2"
                        >
                            Share a Workflow
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
