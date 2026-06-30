import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClaimsCTA } from "@/components/claims/claims-cta";
import { CLAIM_SOURCES } from "@/lib/claims/claim-sources";

const BASE = "https://www.invaritech.ai";
const PAGE_URL = "https://www.invaritech.ai/glossary/food-and-grocery-code/";

const description =
    "A supplier-side summary of the Food and Grocery Code issues that can matter when retailer deductions involve shrinkage, set-offs, wastage, or fresh produce shortfall and damage timing.";

export const metadata: Metadata = {
    title: "The Food and Grocery Code: Which Retailer Deductions Suppliers Can Challenge",
    description,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "The Food and Grocery Code: Which Retailer Deductions Suppliers Can Challenge | INVARITECH",
        description,
        url: PAGE_URL,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "The Food and Grocery Code: Which Retailer Deductions Suppliers Can Challenge | INVARITECH",
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
            { "@type": "ListItem", position: 3, name: "Food and Grocery Code", item: PAGE_URL },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "The Food and Grocery Code: which retailer deductions suppliers can challenge",
        description,
    },
];

const sourceMap = new Map(CLAIM_SOURCES.map((source) => [source.id, source]));
const acccAbout = sourceMap.get("accc-code-about");
const acccRights = sourceMap.get("accc-code-rights-responsibilities");
const legislation = sourceMap.get("food-grocery-code-legislation");

const checks = [
    {
        title: "Shrinkage",
        body: "The Code can matter if a retailer tries to push post-possession shrinkage back onto the supplier. The factual hinge is when possession passed and what loss event is actually being described.",
        question:
            "What evidence shows when possession passed, and what exactly is the retailer saying caused the shrinkage?",
    },
    {
        title: "Set-offs",
        body: "A set-off question starts with the written basis the retailer says it has for netting one amount against another.",
        question:
            "What written consent or agreement clause is the retailer relying on for this set-off, and how was the amount calculated?",
    },
    {
        title: "Wastage",
        body: "Wastage analysis turns on the express agreement, the stated calculation method, whether the amount looks reasonable, and whether the retailer took steps to reduce the cost.",
        question:
            "What clause, calculation method, actual cost basis, and mitigation steps sit behind this wastage amount?",
    },
    {
        title: "Fresh produce shortfall and damaged-goods timing",
        body: "For fresh produce supplied to a Code-covered retailer, shortfall and damage claims have a timing boundary tied to delivery date and claim date.",
        question:
            "Is this fresh produce, when was delivery completed, when was the claim raised, and does the retailer evidence show the line was raised within 30 days?",
    },
];

export default function FoodAndGroceryCodePage() {
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
                                { label: "Glossary", href: "/glossary/" },
                                { label: "Food and Grocery Code" },
                            ]}
                        />

                        <div className="mt-12 mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Supplier Claims Glossary
                            </p>
                        </div>

                        <h1 className="site-h2">
                            The Food and Grocery Code: which retailer deductions suppliers can
                            challenge
                        </h1>
                        <p className="site-lead mt-6 max-w-4xl">
                            Current as of June 30, 2026. The current Code framework became mandatory on
                            April 1, 2025, and the transition period ended on April 1, 2026.
                        </p>

                        <section className="mt-14 grid gap-[1px] bg-border md:grid-cols-[1.05fr_0.95fr]">
                            <article className="bg-card p-6 md:p-8">
                                <p className="site-meta text-primary">Who the Code covers</p>
                                <p className="site-body mt-4">
                                    The current large grocery business list is ALDI, Coles Group,
                                    Metcash Food &amp; Grocery, and Woolworths Group.
                                </p>
                                <p className="site-body mt-4">
                                    Costco needs a separate coverage check. The list above does not include
                                    Costco. Confirm the current position before treating a Costco deduction
                                    as Code-governed.
                                </p>
                            </article>
                            <article className="bg-card p-6 md:p-8">
                                <p className="site-meta text-primary">What this page shows</p>
                                <p className="site-body mt-4">
                                    Use this page to see where the Code can make a deduction challengeable.
                                    Not legal advice.
                                </p>
                            </article>
                        </section>

                        <section className="mt-14 border-t border-border pt-12">
                            <p className="site-meta text-primary">Supplier-side checks</p>
                            <h2 className="site-h3 mt-4">Four deduction patterns where Code facts can change the answer</h2>
                            <div className="mt-8 grid gap-6 md:grid-cols-2">
                                {checks.map((check) => (
                                    <article key={check.title} className="border border-border bg-card p-6">
                                        <p className="site-meta text-primary">{check.title}</p>
                                        <p className="site-body mt-4">{check.body}</p>
                                        <div className="mt-5 border-t border-border pt-4">
                                            <p className="site-meta text-primary">A question you could ask the retailer</p>
                                            <p className="site-body mt-3">{check.question}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="mt-14 grid gap-10 border-t border-border pt-12 lg:grid-cols-[0.95fr_1.05fr]">
                            <div>
                                <p className="site-meta text-primary">Sources</p>
                                <h2 className="site-h3 mt-4">Primary references</h2>
                                <ul className="site-body mt-5 space-y-3">
                                    <li>
                                        <Link href={acccAbout?.url ?? "#"} className="underline decoration-border underline-offset-4">
                                            {acccAbout?.authority}: {acccAbout?.title}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={acccRights?.url ?? "#"} className="underline decoration-border underline-offset-4">
                                            {acccRights?.authority}: {acccRights?.title}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={legislation?.url ?? "#"} className="underline decoration-border underline-offset-4">
                                            {legislation?.authority}: {legislation?.title}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="https://grocerycodesupervisor.gov.au/"
                                            className="underline decoration-border underline-offset-4"
                                        >
                                            Grocery Code Supervisor
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="border border-border bg-card p-6 md:p-8">
                                <p className="site-meta text-primary">Claims Desk</p>
                                <h2 className="site-h3 mt-4">Send one deduction and see what holds up</h2>
                                <p className="site-body mt-4">
                                    Claims Desk reviews one redacted remittance and highlights which
                                    lines look supportable, missing proof, worth challenging, or Code
                                    risk. Evidence review only. Not legal advice.
                                </p>
                                <ClaimsCTA
                                    medium="food-grocery-code"
                                    content="page-cta"
                                    className="site-button mt-6 gap-2"
                                />
                                <Link
                                    href="/resources/retailer-deductions/"
                                    className="site-button-secondary mt-4"
                                >
                                    Back to retailer deductions
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
