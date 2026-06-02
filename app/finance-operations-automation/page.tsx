import type { Metadata } from "next";
import Link from "next/link";

import { DiagnosticCTA } from "@/components/site/diagnostic-cta";
import { OfferLadder } from "@/components/site/offer-ladder";
import { PageShell } from "@/components/site/page-shell";
import { ProofGrid } from "@/components/site/proof-grid";
import { SectionHeader } from "@/components/site/section-header";
import { SiteHero } from "@/components/site/site-hero";
import { WorkflowDiagram } from "@/components/site/workflow-diagram";
import { UtmCaptureClient } from "@/components/home/_shared/utm-capture-client";
import { siteConfig } from "@/lib/site-content/brand";
import { financePageContent } from "@/lib/site-content/finance";
import { pageMetadata } from "@/lib/site-content/pages";

const meta = pageMetadata.financeOperationsAutomation;

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    alternates: {
        canonical: `${siteConfig.siteUrl}${meta.canonical}`,
    },
    openGraph: {
        title: meta.title,
        description: meta.description,
        type: "website",
        url: `${siteConfig.siteUrl}${meta.canonical}`,
        images: [
            {
                url: "/finance-exception-automation.webp",
                width: 1200,
                height: 630,
                alt: meta.title,
            },
        ],
    },
};

export default function FinanceOperationsAutomationPage() {
    return (
        <PageShell>
            <UtmCaptureClient />
            <SiteHero
                content={financePageContent.hero}
                className="site-section-hero"
            />

            <section className="site-section border-t border-border bg-card/40">
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

            <section className="site-section border-t border-border">
                <div className="site-container">
                    <SectionHeader content={financePageContent.pains.header} />
                    <div className="site-grid-three mt-10">
                        {financePageContent.pains.cards.map((card) => (
                            <article key={card.id} className="site-card">
                                <h3 className="site-h3">{card.title}</h3>
                                <p className="site-body mt-4">{card.body}</p>
                            </article>
                        ))}
                        {Array.from({
                            length:
                                (3 - (financePageContent.pains.cards.length % 3)) % 3,
                        }).map((_, fillerIndex) => (
                            <div
                                key={`pain-filler-${fillerIndex}`}
                                aria-hidden
                                className="hidden bg-background md:block"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-card/40">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
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
                    className="pt-10"
                />
            </section>

            <section className="border-t border-border">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader content={financePageContent.offers.header} />
                </div>
                <OfferLadder
                    stages={financePageContent.offers.stages}
                    className="pt-10"
                />
            </section>

            <section className="border-t border-border bg-card/40">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader content={financePageContent.proof.header} />
                </div>
                <ProofGrid
                    assets={financePageContent.proof.assets}
                    className="pt-10"
                />
                <div className="site-container pb-12 md:pb-16 lg:pb-20">
                    <aside className="site-card">
                        <p className="site-meta">
                            {financePageContent.proof.eudrNote.title}
                        </p>
                        <p className="site-body mt-4 max-w-4xl">
                            {financePageContent.proof.eudrNote.body}
                        </p>
                        <Link
                            href={financePageContent.proof.eudrNote.href}
                            className="site-button-secondary mt-7"
                        >
                            {financePageContent.proof.eudrNote.ctaLabel}
                        </Link>
                    </aside>
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
