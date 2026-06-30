import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildClaimsDeskUrl } from "@/lib/claims/claims-desk-cta";

const BASE = "https://www.invaritech.ai";
const PAGE_URL = "https://www.invaritech.ai/glossary/difot/";
const CLAIMS_DESK_URL = buildClaimsDeskUrl({
    medium: "difot-glossary",
    content: "page-cta",
});

const description =
    "Definition-first DIFOT reference for suppliers: what delivered in full, on time means, how retailers tend to measure it, and what evidence matters when a penalty appears.";

export const metadata: Metadata = {
    title: "What is DIFOT?",
    description,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "What is DIFOT? | INVARITECH",
        description,
        url: PAGE_URL,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "What is DIFOT? | INVARITECH",
        description,
        images: ["/og-image.png"],
    },
};

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Glossary", item: `${BASE}/glossary/` },
            { "@type": "ListItem", position: 3, name: "DIFOT", item: PAGE_URL },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "DIFOT",
        description:
            "Delivered in full, on time. A retailer supply-chain measure used to score whether the ordered quantity arrived within the agreed delivery window.",
        url: PAGE_URL,
        inDefinedTermSet: `${BASE}/glossary/`,
    },
];

export default function DifotGlossaryPage() {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="pt-32 pb-20 md:pt-36">
                <div className="site-container">
                    <div className="mx-auto max-w-4xl">
                        <Breadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Glossary", href: "/glossary/" },
                                { label: "DIFOT" },
                            ]}
                        />

                        <div className="mt-12 mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Supplier Claims Glossary
                            </p>
                        </div>

                        <h1 className="site-h2">What is DIFOT?</h1>
                        <p className="site-lead mt-6 max-w-3xl">
                            DIFOT means delivered in full, on time. In practice, it is a retailer
                            scorecard that asks two questions: did the full ordered quantity arrive, and
                            did it arrive inside the booked receiving window?
                        </p>

                        <article className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="space-y-6">
                                <div>
                                    <p className="site-meta text-primary">Definition</p>
                                    <p className="site-body mt-3">
                                        DIFOT is a compliance measure for supply execution, not a legal
                                        conclusion. Retailers often use it to trigger deductions when a
                                        shipment looks short, late, or both.
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta text-primary">What changes the result</p>
                                    <p className="site-body mt-3">
                                        The headline phrase is stable, but the measure underneath can vary:
                                        order-level versus line-level scoring, gate-in time versus dock
                                        time, and different rules for split deliveries or substitutions.
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta text-primary">Supplier-side view</p>
                                    <p className="site-body mt-3">
                                        When a DIFOT penalty appears, the first job is to check the
                                        scorecard line against your own PO, ASN, POD, booked window, and
                                        timestamp trail. That is evidence work, not abstract KPI debate.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5 border border-border bg-card p-6 md:p-8">
                                <div>
                                    <p className="site-meta text-primary">Use next</p>
                                    <h2 className="site-h3 mt-4">Where to go from the definition</h2>
                                </div>

                                <Link href="/resources/difot-calculator/" className="site-button-secondary">
                                    Open the DIFOT calculator
                                </Link>
                                <Link href="/resources/retailer-deductions/" className="site-button-secondary">
                                    Compare retailer deductions
                                </Link>
                                <Link href="/glossary/remittance-advice/" className="site-button-secondary">
                                    Read the remittance advice glossary
                                </Link>

                                <div className="border-t border-border pt-5">
                                    <p className="site-body">
                                        Claims Desk can review one redacted remittance and tell you which
                                        lines look supportable, missing proof, worth challenging, or Code
                                        risk. Evidence review only. Not legal advice.
                                    </p>
                                    <Link href={CLAIMS_DESK_URL} className="site-button mt-5">
                                        Send one redacted remittance
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
