import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClaimsCTA } from "@/components/claims/claims-cta";
import { VerdictStamp } from "@/components/claims/verdict-stamp";
import { CLAIMS_VERDICTS } from "@/lib/claims/verdicts";
import { deductionTypes } from "@/lib/claims/deduction-matrix";

const BASE = "https://www.invaritech.ai";
const PAGE_PATH = "/resources/retailer-deductions/";
const PAGE_URL = `${BASE}${PAGE_PATH}`;

const description =
    "A supplier-side guide to retailer deductions, evidence gaps, Code risk, and the proof assets FMCG suppliers can use before accepting a short-pay.";

export const metadata: Metadata = {
    title: "Retailer deductions: the supplier's guide",
    description,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "Retailer deductions: the supplier's guide | INVARITECH",
        description,
        url: PAGE_URL,
        type: "article",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Retailer deductions supplier guide",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Retailer deductions: the supplier's guide | INVARITECH",
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
            { "@type": "ListItem", position: 3, name: "Retailer deductions", item: PAGE_URL },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Retailer deductions: the supplier's guide",
        description,
        about: [
            "retailer deductions",
            "supplier short-pays",
            "FMCG claims",
            "Food and Grocery Code",
        ],
    },
];

const proofAssets = [
    {
        title: "Sample evidence-pack teardown",
        body: "See how one DIFOT line, one promo scan line, and one shrinkage line get brought back to the evidence.",
        href: "/resources/sample-claims-evidence-pack/",
    },
    {
        title: "DIFOT penalty checker",
        body: "Use a short supplier-side checker to identify the evidence gap behind one DIFOT deduction.",
        href: "/resources/difot-calculator/",
    },
    {
        title: "20 supermarket claim types",
        body: "Use the public checklist when triaging a remittance, debit note, portal claim, or batch of short-paid invoices.",
        href: "/resources/supermarket-claim-types-worth-checking/",
    },
    {
        title: "Remittance advice guide",
        body: "Start with the generic accounting term, then pivot to supermarket deductions and worksheet triage.",
        href: "/glossary/remittance-advice/",
    },
    {
        title: "DIFOT glossary",
        body: "Plain-English meaning, formula, calculation basis, and the evidence that decides a penalty line.",
        href: "/glossary/difot/",
    },
    {
        title: "Food and Grocery Code explainer",
        body: "Supplier-side summary of where Code facts can make a deduction challengeable.",
        href: "/glossary/food-and-grocery-code/",
    },
];

const familyLabels: Record<string, string> = {
    "DIFOT / OTIF": "Delivery score penalties",
    "Delivery variance": "Delivery quantity and condition",
    "Promotion funding": "Promotion and rebate claims",
    "Code-sensitive claims": "Charges the Code may limit",
    "Duplicate claims": "Duplicate or already-credited lines",
    "Price variance": "Price and rate differences",
    "Trade spend": "Trade spend and activity charges",
    "Operational charges": "Freight, pallet, and handling charges",
    "Compliance charges": "ASN, EDI, barcode, and label charges",
    "Historic claims": "Historic and post-audit claims",
};

const familyOrder = [
    "DIFOT / OTIF",
    "Delivery variance",
    "Promotion funding",
    "Code-sensitive claims",
    "Duplicate claims",
    "Price variance",
    "Trade spend",
    "Operational charges",
    "Compliance charges",
    "Historic claims",
];

const familyBlocks = familyOrder
    .map((family) => ({
        family,
        rows: deductionTypes.filter((type) => type.family === family),
    }))
    .filter((block) => block.rows.length > 0);

export default function RetailerDeductionsPage() {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="pt-32 pb-20 md:pt-36">
                <div className="site-container">
                    <div className="mx-auto max-w-6xl">
                        <Breadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Resources", href: "/resources/" },
                                { label: "Retailer Deductions" },
                            ]}
                        />

                        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="h-px w-8 bg-primary/60" />
                                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                        Supplier Claims Hub
                                    </p>
                                </div>
                                <h1 className="site-h2">Retailer deductions: the supplier&apos;s guide</h1>
                            </div>
                            <p className="site-lead">
                                Bring one deduction back to the evidence before it becomes just another
                                short-pay in the remittance file.
                            </p>
                        </div>

                        <section className="mt-12 grid gap-[1px] bg-border md:grid-cols-4">
                            {CLAIMS_VERDICTS.map((verdict) => (
                                <article key={verdict} className="bg-card p-5">
                                    <VerdictStamp verdict={verdict} />
                                    <p className="site-card-body mt-4">
                                        {verdict === "supportable" &&
                                            "The retailer has the evidence, agreement basis, and calculation trail."}
                                        {verdict === "missing proof" &&
                                            "The claim may be valid, but the line is missing the proof needed to accept it."}
                                        {verdict === "worth challenging" &&
                                            "The documents show a mismatch, duplicate, timing issue, or basis problem."}
                                        {verdict === "Code risk" &&
                                            "The claim depends on a Code-covered rule or precondition, not just arithmetic."}
                                    </p>
                                </article>
                            ))}
                        </section>

                        <section className="mt-14 border-t border-border pt-12">
                            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                                <div>
                                    <p className="site-meta text-primary">Deduction families</p>
                                    <h2 className="site-h3 mt-4">Start with the claim type, then ask for the proof.</h2>
                                    <p className="site-body mt-4">
                                        These are the deduction types worth checking. Start with the type,
                                        then pull the evidence. A triage guide, not a recovery promise.
                                    </p>
                                </div>
                                <div className="grid gap-[1px] bg-border md:grid-cols-2">
                                    {familyBlocks.map((block) => (
                                        <article key={block.family} className="bg-card p-5">
                                            <p className="site-meta text-primary">{familyLabels[block.family]}</p>
                                            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
                                                {block.rows.map((row) => (
                                                    <li key={row.id}>
                                                        <span className="font-semibold text-foreground">{row.label}</span>
                                                        <span className="block">{row.whatItIs}</span>
                                                        <span className="mt-1 block">
                                                            Evidence to pull: {row.shortEvidence}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="mt-14 border-t border-border pt-12">
                            <p className="site-meta text-primary">Proof assets</p>
                            <h2 className="site-h3 mt-4">Use the page that matches the line in front of you.</h2>
                            <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-2 lg:grid-cols-3">
                                {proofAssets.map((asset) => (
                                    <Link
                                        key={asset.href}
                                        href={asset.href}
                                        className="group bg-card p-6 transition-colors hover:bg-background"
                                    >
                                        <h3 className="site-card-title group-hover:text-primary">{asset.title}</h3>
                                        <p className="site-card-body mt-3">{asset.body}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section className="mt-14 grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <p className="site-meta text-primary">Claims Desk</p>
                                <h2 className="site-h3 mt-4">Send one redacted remittance.</h2>
                                <p className="site-body mt-4 max-w-3xl">
                                    Claims Desk marks each line as supportable, missing proof, worth
                                    challenging, or Code risk. Evidence review only. Not legal advice.
                                </p>
                            </div>
                            <ClaimsCTA
                                medium="retailer-deductions"
                                content="page-cta"
                                className="site-button gap-2"
                            >
                                Get a free claims teardown
                            </ClaimsCTA>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
