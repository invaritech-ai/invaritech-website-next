import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";

import { DiagnosticCTA } from "@/components/site/diagnostic-cta";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeader } from "@/components/site/section-header";
import { SiteHero } from "@/components/site/site-hero";
import { WorkflowDiagram } from "@/components/site/workflow-diagram";
import { UtmCaptureClient } from "@/components/home/_shared/utm-capture-client";
import { siteConfig } from "@/lib/site-content/brand";
import { financePageContent } from "@/lib/site-content/finance";
import { pageMetadata } from "@/lib/site-content/pages";

const meta = pageMetadata.financeAutomation;
const pageUrl = `${siteConfig.siteUrl}${meta.canonical}`;
const ogImageUrl = `${siteConfig.siteUrl}/finance-exception-automation.webp`;

const painCardLinks: Record<string, string> = {
    "xero-ap-volume": "/resources/invoice-processing-automation/",
    "invoice-approval-workflow": "/resources/invoice-processing-automation/",
    "invoice-exception-management": "/resources/invoice-processing-automation/",
    "duplicate-invoice-detection": "/blog/ai-invoice-data-extraction/",
    "three-way-match-exceptions": "/glossary/three-way-match/",
    "payment-controls-release-evidence": "/resources/accounts-payable-controls/?scenario=payment-release-review",
};

const financeAutomationStructuredData = [
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteConfig.siteUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Finance Automation",
                item: pageUrl,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: siteConfig.locale,
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.siteUrl,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.siteUrl,
            logo: {
                "@type": "ImageObject",
                url: `${siteConfig.siteUrl}/logo-image.png`,
            },
        },
        primaryImageOfPage: {
            "@type": "ImageObject",
            url: ogImageUrl,
            width: 1200,
            height: 630,
        },
        about: [
            "finance automation",
            "accounts payable automation",
            "invoice automation",
            "invoice approval workflow",
            "invoice exception management",
            "payment controls",
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Finance Automation for AP Teams",
        serviceType: "Finance Automation",
        description:
            "Finance automation for AP teams that need invoice exceptions, approval evidence, payment controls, and month-end follow-up made visible around existing accounting systems.",
        provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.siteUrl,
        },
        areaServed: "Global",
        audience: {
            "@type": "Audience",
            audienceType:
                "Finance teams, accounts payable teams, controllers, and shared services teams",
        },
    },
];

export const metadata: Metadata = {
    title: {
        absolute: meta.title,
    },
    description: meta.description,
    alternates: {
        canonical: `${siteConfig.siteUrl}${meta.canonical}`,
    },
    openGraph: {
        title: meta.title,
        description: meta.description,
        type: "website",
        url: pageUrl,
        images: [
            {
                url: "/finance-exception-automation.webp",
                width: 1200,
                height: 630,
                alt: meta.title,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: ["/finance-exception-automation.webp"],
    },
};

function LinkRow({
    href,
    label,
    body,
}: {
    href: string;
    label: string;
    body: string;
}) {
    return (
        <Link
            href={href}
            className="group grid gap-3 border-t border-border py-5 transition-colors first:border-t-0 hover:bg-card/60 sm:grid-cols-[0.42fr_1fr_auto] sm:px-4"
        >
            <span className="site-card-title text-xl leading-tight group-hover:text-primary">
                {label}
            </span>
            <span className="site-card-body">{body}</span>
            <ArrowRight
                className="mt-1 size-4 text-primary transition-transform group-hover:translate-x-1"
                aria-hidden
            />
        </Link>
    );
}

function PainCard({
    card,
}: {
    card: {
        id: string;
        title: string;
        body: string;
    };
}) {
    const href = painCardLinks[card.id];

    const content = (
        <>
            <h3 className="site-h3">{card.title}</h3>
            <p className="site-body mt-4 text-base md:text-base">{card.body}</p>
            {href ? (
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open related guide
                    <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                    />
                </span>
            ) : null}
        </>
    );

    if (!href) {
        return (
            <article className="border border-border bg-background p-6">
                {content}
            </article>
        );
    }

    return (
        <Link
            href={href}
            className="group block h-full border border-border bg-background p-6 transition-colors hover:border-primary/40 hover:bg-card/60"
        >
            {content}
        </Link>
    );
}

export default function FinanceAutomationPage() {
    return (
        <PageShell>
            <UtmCaptureClient />
            <Script
                id="finance-automation-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(financeAutomationStructuredData),
                }}
            />
            <SiteHero
                content={financePageContent.hero}
                className="site-section-hero"
            />

            <section className="border-t border-border bg-card/40 py-10 md:py-12">
                <div className="site-container">
                    <div className="grid gap-5 md:grid-cols-2">
                        {financePageContent.hierarchy.map((item) => (
                            <article key={item.id} className="site-card">
                                <p className="site-meta">{item.title}</p>
                                <p className="site-body mt-4">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border py-10 md:py-12 lg:py-14">
                <div className="site-container">
                    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <SectionHeader
                            content={financePageContent.definition.header}
                        />
                        <div className="grid gap-[1px] bg-border">
                            {financePageContent.definition.points.map(
                                (point, index) => (
                                    <article
                                        key={point.id}
                                        className="grid gap-5 bg-background p-6 sm:grid-cols-[4rem_1fr]"
                                    >
                                        <p className="site-meta text-primary">
                                            {String(index + 1).padStart(2, "0")}
                                        </p>
                                        <div>
                                            <h3 className="site-card-title">
                                                {point.title}
                                            </h3>
                                            <p className="site-card-body mt-3">
                                                {point.body}
                                            </p>
                                        </div>
                                    </article>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-card/40 py-10 md:py-12 lg:py-14">
                <div className="site-container">
                    <SectionHeader content={financePageContent.startingPoints.header} />
                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                        {financePageContent.startingPoints.groups.map((group) => (
                            <section
                                key={group.id}
                                className="border border-border bg-background"
                            >
                                <div className="border-b border-border p-6">
                                    <h3 className="site-h3">{group.title}</h3>
                                    <p className="site-body mt-3 text-base md:text-base">
                                        {group.body}
                                    </p>
                                </div>
                                <div className="p-2">
                                    {group.links.map((link) => (
                                        <LinkRow key={link.href} {...link} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border py-10 md:py-12 lg:py-14">
                <div className="site-container">
                    <SectionHeader content={financePageContent.pains.header} />
                    <div className="mt-10 grid gap-[1px] bg-border md:grid-cols-2 lg:grid-cols-3">
                        {financePageContent.pains.cards.map((card) => (
                            <PainCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-card/40">
                <div className="site-container pt-10 md:pt-12 lg:pt-14">
                    <SectionHeader
                        content={financePageContent.currentStack.header}
                    />
                </div>
                <WorkflowDiagram
                    currentStack={
                        financePageContent.currentStack.currentStack.items
                    }
                    controlLayer={
                        financePageContent.currentStack.controlLayer.items
                    }
                    outcomes={financePageContent.currentStack.outcomes.items}
                    labels={{
                        currentStack:
                            financePageContent.currentStack.currentStack.title,
                        controlLayer:
                            financePageContent.currentStack.controlLayer.title,
                        outcomes:
                            financePageContent.currentStack.outcomes.title,
                    }}
                    className="pt-8"
                />
            </section>

            <section className="border-t border-border bg-card/40">
                <div className="site-container py-10 md:py-12 lg:py-14">
                    <SectionHeader
                        content={financePageContent.paidDeployment.header}
                    />
                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                        <section className="border border-border bg-background">
                            <div className="border-b border-border p-6">
                                <p className="site-meta text-primary">
                                    Use First
                                </p>
                                <h3 className="site-h3 mt-4">
                                    Common checks, tools, and guides.
                                </h3>
                            </div>
                            <div className="divide-y divide-border">
                                {financePageContent.paidDeployment.free.map(
                                    (item) => (
                                        <article key={item.id} className="p-6">
                                            <h4 className="site-card-title">
                                                {item.title}
                                            </h4>
                                            <p className="site-card-body mt-3">
                                                {item.body}
                                            </p>
                                        </article>
                                    ),
                                )}
                            </div>
                        </section>
                        <section className="border border-primary/35 bg-background">
                            <div className="border-b border-primary/20 p-6">
                                <p className="site-meta text-primary">
                                    Bring Us In
                                </p>
                                <h3 className="site-h3 mt-4">
                                    Company-specific workflow logic.
                                </h3>
                            </div>
                            <div className="divide-y divide-border">
                                {financePageContent.paidDeployment.paid.map(
                                    (item) => (
                                        <article key={item.id} className="p-6">
                                            <h4 className="site-card-title">
                                                {item.title}
                                            </h4>
                                            <p className="site-card-body mt-3">
                                                {item.body}
                                            </p>
                                        </article>
                                    ),
                                )}
                            </div>
                        </section>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-8">
                        <Link
                            href="/resources/invoice-extractor/"
                            className="site-button-secondary"
                        >
                            Use the free invoice extractor
                        </Link>
                        <Link
                            href="/resources/accounts-payable-controls/"
                            className="site-button-secondary"
                        >
                            Check AP controls first
                        </Link>
                    </div>
                </div>
            </section>

            <DiagnosticCTA
                title={financePageContent.finalCta.title}
                body={financePageContent.finalCta.body}
                cta={financePageContent.finalCta.cta}
                secondaryCta={financePageContent.finalCta.secondaryCta}
                className="border-t border-border"
            />
        </PageShell>
    );
}
