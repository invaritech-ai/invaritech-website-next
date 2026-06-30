import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClaimsCTA } from "@/components/claims/claims-cta";
import { VerdictStamp } from "@/components/claims/verdict-stamp";
import { CLAIM_SOURCES, type ClaimSource } from "@/lib/claims/claim-sources";

const BASE = "https://www.invaritech.ai";
const PAGE_URL = "https://www.invaritech.ai/resources/sample-claims-evidence-pack/";

const description =
    "A synthetic teardown showing how one DIFOT line, one promo scan line, and one shrinkage line can be framed as evidence questions before a supplier accepts the deduction.";

export const metadata: Metadata = {
    title: "Sample Claims Evidence-Pack Teardown",
    description,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "Sample Claims Evidence-Pack Teardown | INVARITECH",
        description,
        url: PAGE_URL,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sample Claims Evidence-Pack Teardown | INVARITECH",
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
            { "@type": "ListItem", position: 2, name: "Resources", item: `${BASE}/resources/` },
            {
                "@type": "ListItem",
                position: 3,
                name: "Sample claims evidence-pack teardown",
                item: PAGE_URL,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Sample claims evidence-pack teardown",
        description,
    },
];

const sourceMap = new Map(CLAIM_SOURCES.map((source) => [source.id, source]));
const acccAbout = sourceMap.get("accc-code-about");
const acccRights = sourceMap.get("accc-code-rights-responsibilities");
const legislation = sourceMap.get("food-grocery-code-legislation");
const codeSources = [acccAbout, acccRights, legislation].filter(
    (source): source is ClaimSource => Boolean(source),
);

export default function SampleClaimsEvidencePackPage() {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="pt-32 pb-20 md:pt-36">
                <div className="site-container">
                    <div className="mx-auto max-w-5xl">
                        <Breadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Resources", href: "/resources/" },
                                { label: "Sample Claims Evidence-Pack" },
                            ]}
                        />

                        <div className="mt-12 max-w-4xl">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Claims Proof Library
                                </p>
                            </div>

                            <h1 className="site-h2">Sample claims evidence-pack teardown</h1>
                            <p className="site-lead mt-6 max-w-3xl">
                                These examples use sample supplier and retailer data. They show how to
                                review a deduction before treating it as settled.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-[1px] bg-border md:grid-cols-3">
                            <div className="bg-card p-5">
                                <p className="site-meta text-primary">Sample data</p>
                                <p className="site-body mt-3">
                                    Names, claim IDs, dates, and amounts below are illustrative only.
                                </p>
                            </div>
                            <div className="bg-card p-5">
                                <p className="site-meta text-primary">Illustrative scope</p>
                                <p className="site-body mt-3">
                                    Illustrative, not a recovery guarantee.
                                </p>
                            </div>
                            <div className="bg-card p-5">
                                <p className="site-meta text-primary">Legal</p>
                                <p className="site-body mt-3">Not legal advice.</p>
                            </div>
                        </div>

                        <section className="mt-14 border-t border-border pt-12">
                            <p className="site-meta text-primary">Method</p>
                            <h2 className="site-h3 mt-4">What the teardown is actually doing</h2>
                            <p className="site-body mt-4 max-w-3xl">
                                Each line starts with the retailer assertion, then checks the proof trail,
                                timing basis, and any Code condition that could change the answer. The
                                point is to surface the missing document, mismatch, or precondition before
                                the supplier replies.
                            </p>
                        </section>

                        <section className="mt-12 space-y-8">
                            <article className="border border-border bg-card p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="site-meta text-primary">Example 1</p>
                                    <VerdictStamp verdict="worth challenging" />
                                </div>
                                <h2 className="site-h3 mt-4">DIFOT penalty with a timing mismatch</h2>
                                <p className="site-body mt-4">
                                    A retailer claims late arrival against a booked 10:00 to 12:00 window.
                                    The supplier packet has a dock timestamp at 10:41. The scorecard note
                                    uses gate-in time instead. That mismatch is enough to ask which timing
                                    rule drove the debit.
                                </p>
                                <ul className="site-body mt-5 list-disc space-y-2 pl-5">
                                    <li>Evidence packet: PO, ASN, booked slot confirmation, POD, dock log.</li>
                                    <li>Gap: the retailer basis and the supplier basis do not match.</li>
                                    <li>What to ask: which timestamp and booked-window rule drove the debit?</li>
                                </ul>
                                <ClaimsCTA
                                    medium="sample-teardown"
                                    content="difot-example"
                                    className="site-button mt-6 gap-2"
                                >
                                    Send a remittance with a DIFOT penalty
                                </ClaimsCTA>
                            </article>

                            <article className="border border-border bg-card p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="site-meta text-primary">Example 2</p>
                                    <VerdictStamp verdict="missing proof" />
                                </div>
                                <h2 className="site-h3 mt-4">Promo scan deduction without the scan file</h2>
                                <p className="site-body mt-4">
                                    The remittance shows a rebate amount and a campaign code. The scan
                                    extract is missing by SKU, store group, and promo dates. That line stays
                                    in missing proof until the volume basis appears.
                                </p>
                                <div className="mt-5 border-l-2 border-primary/30 pl-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="site-meta text-primary">Line-level note</p>
                                        <VerdictStamp verdict="supportable" />
                                    </div>
                                    <p className="site-body mt-3">
                                        Once the scan report shows the exact SKU set, store scope, rate,
                                        and dates against the signed mechanic, one line can still look
                                        supportable even if the current evidence pack is incomplete.
                                    </p>
                                </div>
                                <ClaimsCTA
                                    medium="sample-teardown"
                                    content="promo-scan-example"
                                    className="site-button mt-6 gap-2"
                                >
                                    Send a remittance with a promo scan deduction
                                </ClaimsCTA>
                            </article>

                            <article className="border border-border bg-card p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="site-meta text-primary">Example 3</p>
                                    <VerdictStamp verdict="Code risk" />
                                </div>
                                <h2 className="site-h3 mt-4">Shrinkage charge after retailer possession</h2>
                                <p className="site-body mt-4">
                                    The claim note describes store-level shrink after signed delivery. That
                                    creates Code risk only if three preconditions hold: the retailer is
                                    Code-covered, possession had already passed, and the loss is
                                    post-possession shrinkage rather than a delivery variance.
                                </p>
                                <ul className="site-body mt-5 list-disc space-y-2 pl-5">
                                    <li>Supplier-side check: where did possession pass?</li>
                                    <li>Agreement check: is there a clause the retailer says it relies on?</li>
                                    <li>Factual check: is the claimed loss really post-possession shrinkage?</li>
                                </ul>
                                <p className="mt-5 text-xs leading-relaxed text-foreground-subtle">
                                    Source note: this example follows ACCC Food and Grocery Code guidance
                                    and the current Code text. Illustrative only. Not legal advice.
                                </p>
                                <ClaimsCTA
                                    medium="sample-teardown"
                                    content="shrinkage-code-risk-example"
                                    className="site-button mt-6 gap-2"
                                >
                                    Send a remittance with a shrinkage charge
                                </ClaimsCTA>
                            </article>
                        </section>

                        <section className="mt-12 border-t border-border pt-8">
                            <p className="site-meta text-primary">Sources for Code example</p>
                            <div className="mt-4 grid gap-3 text-sm text-foreground-subtle">
                                {codeSources.map((source) => (
                                    <Link
                                        key={source.id}
                                        href={source.url}
                                        className="underline-offset-4 hover:text-primary hover:underline"
                                    >
                                        {source.authority}: {source.title}
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <div className="mt-12 border-t border-border pt-8">
                            <Link href="/resources/retailer-deductions/" className="site-button-secondary">
                                Back to retailer deductions
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
