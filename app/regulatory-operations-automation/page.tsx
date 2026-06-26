import type { Metadata } from "next";

import { DiagnosticCTA } from "@/components/site/diagnostic-cta";
import { PageShell } from "@/components/site/page-shell";
import { ProofGrid } from "@/components/site/proof-grid";
import { SectionHeader } from "@/components/site/section-header";
import { SiteHero } from "@/components/site/site-hero";
import { siteConfig } from "@/lib/site-content/brand";
import { pageMetadata } from "@/lib/site-content/pages";
import { regopsPageContent } from "@/lib/site-content/regops";

const meta = pageMetadata.regulatoryOperationsAutomation;

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
                url: "/eudr-preview.webp",
                width: 1200,
                height: 630,
                alt: meta.title,
            },
        ],
    },
};

export default function RegulatoryOperationsAutomationPage() {
    return (
        <PageShell>
            <SiteHero content={regopsPageContent.hero} className="site-section-hero" />

            <section className="site-section border-t border-border bg-card/40">
                <div className="site-container">
                    <div className="grid gap-5 md:grid-cols-2">
                        {regopsPageContent.status.map((item) => (
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
                    <SectionHeader content={regopsPageContent.problems.header} />
                    <div className="site-grid-three mt-10">
                        {regopsPageContent.problems.cards.map((card) => (
                            <article key={card.id} className="site-card">
                                <h3 className="site-h3">{card.title}</h3>
                                <p className="site-body mt-4">{card.body}</p>
                            </article>
                        ))}
                        {Array.from({
                            length:
                                (3 - (regopsPageContent.problems.cards.length % 3)) % 3,
                        }).map((_, fillerIndex) => (
                            <div
                                key={`regops-problem-filler-${fillerIndex}`}
                                aria-hidden
                                className="hidden bg-background md:block"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="site-section border-t border-border bg-card/40">
                <div className="site-container">
                    <SectionHeader content={regopsPageContent.operatingModel.header} />
                    <div className="site-grid-three mt-10">
                        {regopsPageContent.operatingModel.cards.map((card) => (
                            <article key={card.id} className="site-card">
                                <h3 className="site-h3">{card.title}</h3>
                                <p className="site-body mt-4">{card.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border">
                <div className="site-container pt-12 md:pt-16 lg:pt-20">
                    <SectionHeader content={regopsPageContent.proof.header} />
                </div>
                <ProofGrid assets={regopsPageContent.proof.assets} className="pt-10" />
            </section>

            <DiagnosticCTA
                title={regopsPageContent.finalCta.title}
                body={regopsPageContent.finalCta.body}
                cta={regopsPageContent.finalCta.cta}
                secondaryCta={regopsPageContent.finalCta.secondaryCta}
                className="border-t border-border"
            />
        </PageShell>
    );
}
