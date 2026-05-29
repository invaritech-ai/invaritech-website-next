import type { Metadata } from "next";

import { DiagnosticCTA } from "@/components/site/diagnostic-cta";
import { OfferLadder } from "@/components/site/offer-ladder";
import { PageShell } from "@/components/site/page-shell";
import { ProofGrid } from "@/components/site/proof-grid";
import { SectionHeader } from "@/components/site/section-header";
import { SiteHero } from "@/components/site/site-hero";
import { ToolDirectory } from "@/components/site/tool-directory";
import { TrustStrip } from "@/components/site/trust-strip";
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
            <TrustStrip items={homePageContent.trustStrip} className="border-t border-border bg-card/40" />

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
                            eyebrow: "Control layer",
                            title: "Current stack in. Governed workflow out.",
                            body: "We do not ask teams to rip out the software they already use. We build the workflow layer that checks exceptions, records evidence, and routes decisions around it.",
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

            <section className="border-t border-border bg-card/40">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader
                        content={{
                            eyebrow: "Proof",
                            title: "RegOps proves the operating discipline. Finance is the commercial focus.",
                            body: "The EUDR bridge shows regulated workflow infrastructure. The finance tools show the same control logic applied to exceptions, evidence, and payment risk.",
                        }}
                    />
                </div>
                <ProofGrid assets={proofAssets} className="pt-10" />
            </section>

            <section className="border-t border-border" id="tools">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader
                        content={{
                            eyebrow: "Tools and resources",
                            title: "Free tools that show how we think about controls.",
                            body: "These are proof assets and practical starting points. The future tools stay visible as placeholders until we ship them.",
                        }}
                    />
                </div>
                <ToolDirectory tools={tools} className="pt-10" />
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
