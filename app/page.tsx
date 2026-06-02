import type { Metadata } from "next";
import Link from "next/link";

import { AvailableWorkGrid } from "@/components/site/available-work-grid";
import { DiagnosticCTA } from "@/components/site/diagnostic-cta";
import { OfferLadder } from "@/components/site/offer-ladder";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeader } from "@/components/site/section-header";
import { SiteHero } from "@/components/site/site-hero";
import { WorkflowDiagram } from "@/components/site/workflow-diagram";
import { homePageContent } from "@/lib/site-content/home";
import { offerStages } from "@/lib/site-content/offers";
import { pageMetadata } from "@/lib/site-content/pages";
import { proofAssets } from "@/lib/site-content/proof";
import { siteConfig } from "@/lib/site-content/brand";
import { tools } from "@/lib/site-content/tools";

const meta = pageMetadata.home;

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
        locale: siteConfig.locale,
        siteName: siteConfig.name,
        url: `${siteConfig.siteUrl}${meta.canonical}`,
        images: [
            {
                url: siteConfig.defaultOgImage,
                width: 1200,
                height: 630,
                alt: meta.title,
            },
        ],
    },
};

export default function Home() {
    return (
        <PageShell>
            <SiteHero content={homePageContent.hero} className="site-section-hero site-home-hero" />

            <section className="site-section border-t border-border">
                <div className="site-container">
                    <SectionHeader content={homePageContent.pillars.header} />
                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                        {homePageContent.pillars.cards.map((pillar) => (
                            <article key={pillar.id} className="site-card">
                                <p className="site-meta">{pillar.eyebrow}</p>
                                <h3 className="site-h3 mt-5">{pillar.title}</h3>
                                <p className="site-body mt-4">{pillar.body}</p>
                                <div className="mt-7 grid gap-[1px] bg-border">
                                    {pillar.proof.map((item) => (
                                        <p key={item} className="bg-background px-4 py-3 text-sm text-foreground-muted">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                                <Link href={pillar.href} className="site-button-secondary mt-7">
                                    {pillar.ctaLabel}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="site-section border-t border-border">
                <div className="site-container">
                    <SectionHeader content={homePageContent.problem.header} />
                    <div className="site-grid-three mt-10">
                        {homePageContent.problem.points.map((point) => (
                            <article key={point.id} className="site-card">
                                <h3 className="site-h3">{point.title}</h3>
                                <p className="site-body mt-4">{point.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-card/40">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader
                        content={{
                            eyebrow: "How it works",
                            title: "Keep your tools. Lose the manual checking.",
                            body: "We don't ask you to rip out the software you already use. We add the workflow around it that checks exceptions, records evidence, and routes decisions.",
                        }}
                    />
                </div>
                <WorkflowDiagram
                    currentStack={homePageContent.workflow.currentStack.items}
                    controlLayer={homePageContent.workflow.controlLayer.items}
                    outcomes={homePageContent.workflow.governedOutcome.items}
                    labels={{
                        currentStack: homePageContent.workflow.currentStack.title,
                        controlLayer: homePageContent.workflow.controlLayer.title,
                        outcomes: homePageContent.workflow.governedOutcome.title,
                    }}
                    className="pt-10"
                />
            </section>

            <section className="border-t border-border">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader
                        content={{
                            eyebrow: "Offer ladder",
                            title: "Diagnose. Build. Support.",
                            body: "The service ladder is deliberately narrow at the start. One workflow first, then a fixed-scope build, then managed support when the workflow is live.",
                        }}
                    />
                </div>
                <OfferLadder stages={offerStages} className="pt-10" />
            </section>

            <section className="border-t border-border bg-card/40" id="tools">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader
                        content={{
                            eyebrow: "Proof and tools",
                            title: "Proof and tools you can open today.",
                            body: "Start with live assets: the RegOps bridge case study, AP matching demo, invoice extraction, payment-control rules, and close-cost calculator.",
                        }}
                    />
                </div>
                <AvailableWorkGrid
                    proofAssets={proofAssets}
                    tools={tools}
                    className="pt-10"
                />
            </section>

            <section className="site-section border-t border-border bg-card/40">
                <div className="site-container">
                    <SectionHeader content={homePageContent.method.header} />
                    <div className="site-grid-three mt-10">
                        {homePageContent.method.steps.map((step) => (
                            <article key={step.id} className="site-card">
                                <h3 className="site-h3">{step.title}</h3>
                                <p className="site-body mt-4">{step.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <DiagnosticCTA
                title={homePageContent.finalCta.title}
                body={homePageContent.finalCta.body}
                cta={homePageContent.finalCta.cta}
                className="border-t border-border"
            />
        </PageShell>
    );
}
