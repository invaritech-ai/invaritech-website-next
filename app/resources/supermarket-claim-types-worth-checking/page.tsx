import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildClaimsDeskUrl } from "@/lib/claims/claims-desk-cta";

const BASE = "https://www.invaritech.ai";
const PAGE_PATH = "/resources/supermarket-claim-types-worth-checking/";
const PAGE_URL = `${BASE}${PAGE_PATH}`;
const CLAIMS_DESK_URL = buildClaimsDeskUrl({
    medium: "claims-checklist",
    content: "page-cta",
});

const description =
    "A public checklist for Australian FMCG suppliers: 20 supermarket claim types to check before deductions, short-pays, debit notes, or portal claims age out.";

export const metadata: Metadata = {
    title: "20 Supermarket Claim Types Worth Checking",
    description,
    robots: { index: true, follow: true },
    alternates: {
        canonical: "https://www.invaritech.ai/resources/supermarket-claim-types-worth-checking/",
    },
    openGraph: {
        title: "20 Supermarket Claim Types Worth Checking | INVARITECH",
        description,
        url: PAGE_URL,
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "20 Supermarket Claim Types Worth Checking",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "20 Supermarket Claim Types Worth Checking | INVARITECH",
        description,
        images: ["/og-image.png"],
    },
};

type ClaimRow = {
    claim: string;
    check: string;
    evidence: string;
    flag?: "Red flag" | "Code risk";
};

const claimRows: ClaimRow[] = [
    {
        claim: "Short-delivery / shortfall",
        check: "Did fewer units arrive than you billed? A shortfall claim must be made within 30 days of delivery.",
        evidence: "Signed POD, delivery docket, ASN, invoice, retailer received quantity",
    },
    {
        claim: "Carton or unit count variance",
        check: "Did the claim use the wrong pack size, carton count, or unit conversion?",
        evidence: "PO, invoice line detail, master data, delivery docket",
    },
    {
        claim: "DIFOT penalty",
        check: "Did you actually deliver late or incomplete on the agreed measure?",
        evidence: "ASN, booked delivery window, gate or dock timestamp, POD, retailer DIFOT scorecard",
    },
    {
        claim: "Damaged goods",
        check: "Did goods arrive damaged, or did the claim appear after clean delivery? Damaged-goods claims must be made within 30 days of delivery.",
        evidence: "POD condition notes, photos, carrier report, warehouse notes",
    },
    {
        claim: "Wastage charge",
        flag: "Code risk",
        check: "Chargeable only if expressly agreed in the supply agreement, reasonable in amount, with a stated calculation method, and the retailer took steps to reduce the cost.",
        evidence: "Supply agreement wastage clause, claim basis, calculation, batch or lot evidence",
    },
    {
        claim: "Shrinkage charge",
        flag: "Red flag",
        check: "Under the Code a large grocery business cannot require a supplier to pay for shrinkage after the retailer takes possession.",
        evidence: "Claim reason code, supply agreement, remittance line",
    },
    {
        claim: "Overpricing / price discrepancy",
        check: "Did the invoice price differ from the agreed price?",
        evidence: "PO, agreed price list, invoice, effective-date evidence",
    },
    {
        claim: "Retro price adjustment",
        check: "Did the retailer apply a later price to an earlier invoice?",
        evidence: "Price change notice, effective date, PO date, invoice date",
    },
    {
        claim: "Promo funding claim",
        check: "Does the deduction match the agreed promo amount and cap?",
        evidence: "Signed promo agreement, funding cap, mechanic, claim amount",
    },
    {
        claim: "Promo date mismatch",
        check: "Was the claim tied to sales outside the agreed promo window?",
        evidence: "Promo agreement start and end dates, scan or sell-through report",
    },
    {
        claim: "Promo scope mismatch",
        check: "Did the claim include stores, SKUs, banners, or quantities outside the deal?",
        evidence: "Promo agreement, SKU list, store scope, order data",
    },
    {
        claim: "Scan deal or rebate",
        check: "Does the claimed rate match the agreed rate and the actual eligible volume?",
        evidence: "Scan or rebate agreement, sales report, rate card, eligible volume",
    },
    {
        claim: "Markdown or clearance funding",
        check: "Does the markdown or clearance deduction match what was agreed, for the right units and period?",
        evidence: "Markdown agreement, units, period, claim basis, sell-through",
    },
    {
        claim: "Retail media or activity charge",
        check: "Was the activity agreed, delivered, and charged at the agreed amount?",
        evidence: "Booking confirmation, activity proof, agreement, invoice or debit note",
    },
    {
        claim: "Listing, ranging or new-line fee",
        flag: "Code risk",
        check: "Payments for shelf space or positioning need express written agreement and a reasonable amount.",
        evidence: "Trading terms, listing or ranging agreement, SKU evidence, claim note",
    },
    {
        claim: "ASN, EDI or barcode compliance charge",
        check: "Was the ASN, barcode, label, or EDI file actually missing or wrong?",
        evidence: "ASN log, EDI acknowledgement, label proof, warehouse receipt",
    },
    {
        claim: "Pallet or packaging charge",
        check: "Did the pallet, packaging, or handling charge match the agreed basis and transfer records?",
        evidence: "Pallet transfer records, CHEP or Loscam statements, supply agreement, delivery docket",
    },
    {
        claim: "Freight or transport deduction",
        check: "Was the freight deduction allowed, calculated correctly, and tied to the right shipment?",
        evidence: "Freight terms, carrier invoice, PO, delivery evidence",
    },
    {
        claim: "Duplicate or already-credited claim",
        check: "Has the same claim already been deducted, set off, or credited?",
        evidence: "Prior remittance, debit note, credit note, claim ID, invoice history",
    },
    {
        claim: "Post-audit claim",
        check: "Does a historic claim match the original agreement and transaction trail?",
        evidence: "Original PO, invoice, price list, promo agreement, prior remittance",
    },
];

const codeChecks = [
    "Set-offs against your invoices need written consent, or the supply agreement allowing it and a reasonable amount.",
    "Shrinkage after the retailer takes possession cannot be charged back to a supplier.",
    "Wastage needs express agreement, a reasonable amount, a stated calculation, and retailer cost mitigation.",
    "Shelf space or listing payments need express written agreement and a reasonable amount.",
    "Damaged-goods and shortfall claims must be made no later than 30 days after delivery.",
    "Payment is due within a reasonable time after invoice, per the agreed timeframe.",
];

const triageSteps = [
    {
        title: "Assertion",
        body: "What is the retailer claiming: claim ID, invoice, amount, reason code, and date?",
    },
    {
        title: "Test",
        body: "What proves or disproves it, and is the claim permitted under the Code?",
    },
    {
        title: "Deadline",
        body: "How many days are left before the claim becomes harder to challenge?",
    },
];

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
                name: "20 Supermarket Claim Types Worth Checking",
                item: PAGE_URL,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "20 Supermarket Claim Types Worth Checking",
        description,
        about: [
            "supermarket claims",
            "retailer deductions",
            "FMCG supplier claims",
            "Food and Grocery Code",
        ],
        isPartOf: {
            "@type": "WebSite",
            name: "INVARITECH",
            url: BASE,
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Supermarket claim types worth checking",
        itemListElement: claimRows.map((row, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: row.claim,
            description: row.check,
        })),
    },
];

function FlagLabel({ flag }: { flag?: ClaimRow["flag"] }) {
    if (!flag) return null;

    return (
        <span className="mr-2 inline-flex border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] text-primary">
            {flag}
        </span>
    );
}

export default function SupermarketClaimTypesPage() {
    return (
        <ToolPageShell
            breadcrumb="Supermarket Claim Types"
            eyebrow="FMCG Claims Checklist"
            titleParts={["20 Supermarket Claim Types", "Worth Checking Before They Age Out"]}
            description="Use this against one recent remittance advice, debit note, or portal claim. The goal is simple: decide which claims are supportable, missing proof, worth challenging, or Code risk."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="Want a second set of eyes?"
            footerText="Claims Desk reviews one redacted remittance and marks each line as supportable, missing proof, worth challenging, or Code risk. Evidence checklist only. Not legal advice."
            footerLink={{
                href: CLAIMS_DESK_URL,
                label: "Get a free claims teardown",
            }}
        >
            <section className="grid gap-[1px] bg-border md:grid-cols-[1.05fr_0.95fr]">
                <article className="bg-card p-6 md:p-8">
                    <p className="site-meta text-primary">Two tests</p>
                    <h2 className="site-h3 mt-4">
                        A retailer claim is an assertion.
                    </h2>
                    <p className="site-body mt-4">
                        First: is it supported by the document trail? Second: is it even
                        permitted under the Food and Grocery Code? Not every deduction is wrong.
                        The money sits in the claims that fail one of those tests.
                    </p>
                </article>
                <aside className="bg-background p-6 md:p-8">
                    <p className="site-meta text-primary">Use this with</p>
                    <ul className="mt-5 grid gap-3 text-sm text-foreground-muted">
                        {[
                            "One recent remittance advice",
                            "A retailer debit note",
                            "A portal claim export",
                            "A batch of short-paid invoices",
                        ].map((item) => (
                            <li key={item} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary/70" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </section>

            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Claim ledger
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    The 20 claim types to check.
                </h2>
                <p className="site-body mt-5 max-w-3xl">
                    Pull the evidence first. Then decide whether the line is supportable, missing
                    proof, worth challenging, or Code risk.
                </p>
                <p className="mt-5 text-xs font-mono uppercase tracking-[0.16em] text-foreground-subtle sm:hidden">
                    Scroll table sideways
                </p>

                <div className="mt-8 overflow-x-auto border border-border bg-background">
                    <table className="w-full min-w-[760px] border-collapse">
                        <thead className="bg-card">
                            <tr>
                                <th className="border-b border-border px-4 py-3 text-left text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
                                    Claim type
                                </th>
                                <th className="border-b border-border px-4 py-3 text-left text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
                                    What to check
                                </th>
                                <th className="border-b border-border px-4 py-3 text-left text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
                                    Evidence to pull
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {claimRows.map((row, index) => (
                                <tr
                                    key={row.claim}
                                    className="border-b border-border transition-colors hover:bg-card"
                                >
                                    <td className="w-[24%] px-4 py-4 align-top text-sm font-semibold text-foreground">
                                        <span className="mr-2 font-mono text-xs text-primary">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        {row.claim}
                                    </td>
                                    <td className="w-[42%] px-4 py-4 align-top text-sm leading-relaxed text-foreground-muted">
                                        <FlagLabel flag={row.flag} />
                                        {row.check}
                                    </td>
                                    <td className="px-4 py-4 align-top text-sm leading-relaxed text-foreground-muted">
                                        {row.evidence}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mt-14 grid gap-[1px] bg-border md:grid-cols-[0.9fr_1.1fr]">
                <article className="bg-card p-6 md:p-8">
                    <p className="site-meta text-primary">Where the Code can change the answer</p>
                    <h2 className="site-h3 mt-4">Some claims need more than proof.</h2>
                    <p className="site-body mt-4">
                        A claim can fail because the evidence is missing, but it can also fail
                        because the Code limits what the retailer can charge back.
                    </p>
                    <p className="mt-5 text-xs leading-relaxed text-foreground-subtle">
                        Source:{" "}
                        <Link
                            href="https://www.accc.gov.au/business/industry-codes/food-and-grocery-code-of-conduct"
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            ACCC Food and Grocery Code guidance
                        </Link>
                        . Evidence checklist only. Not legal advice.
                    </p>
                </article>
                <div className="grid gap-[1px] bg-border">
                    {codeChecks.map((check) => (
                        <div key={check} className="bg-background p-5 text-sm leading-relaxed text-foreground-muted">
                            {check}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-14 pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Fast triage
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    Turn a remittance line into a decision.
                </h2>
                <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-3">
                    {triageSteps.map((step, index) => (
                        <article key={step.title} className="bg-background p-6">
                            <p className="site-meta text-primary">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="site-card-title mt-4">{step.title}</h3>
                            <p className="site-card-body mt-3">{step.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-14 border border-border bg-card p-7">
                <p className="site-meta text-primary">Claims Desk</p>
                <h2 className="site-h3 mt-4">Send one redacted remittance.</h2>
                <p className="site-body mt-4 max-w-3xl">
                    We mark each line as supportable, missing proof, worth challenging, or
                    Code risk. You get a one-page evidence teardown back.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link href={CLAIMS_DESK_URL} className="site-button gap-2">
                        Get a free claims teardown
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/resources/"
                        className="site-button bg-transparent text-foreground hover:bg-background"
                    >
                        View all resources
                    </Link>
                </div>
            </section>
        </ToolPageShell>
    );
}
