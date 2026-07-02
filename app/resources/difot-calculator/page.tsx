import type { Metadata } from "next";
import Link from "next/link";

import { DifotPenaltyChecker } from "@/components/claims/difot-penalty-checker";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildClaimsDeskUrl } from "@/lib/claims/claims-desk-cta";

const BASE = "https://www.invaritech.ai";
const PAGE_PATH = "/resources/difot-calculator/";
const PAGE_URL = `${BASE}${PAGE_PATH}`;
const CLAIMS_DESK_URL = buildClaimsDeskUrl({
    medium: "difot-calculator",
    content: "page-cta",
});

const description =
    "DIFOT meaning, formula, a worked example, the evidence that actually decides the deduction, and a supplier-side checker for supermarket penalty lines.";

export const metadata: Metadata = {
    title: "DIFOT calculator: formula, example, and penalty checker",
    description,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "DIFOT calculator: formula, example, and penalty checker | INVARITECH",
        description,
        url: PAGE_URL,
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "DIFOT calculator: formula, example, and penalty checker",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "DIFOT calculator: formula, example, and penalty checker | INVARITECH",
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
            { "@type": "ListItem", position: 3, name: "DIFOT calculator", item: PAGE_URL },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "DIFOT calculator: formula, example, and penalty checker",
        description,
        isPartOf: {
            "@type": "WebSite",
            name: "INVARITECH",
            url: BASE,
        },
        about: ["DIFOT", "retailer deductions", "supplier evidence", "FMCG claims"],
    },
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "DIFOT penalty checker",
        description:
            "Supplier-side DIFOT evidence checker that ranks a retailer penalty line as supportable, missing proof, or worth challenging.",
        url: PAGE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "AUD",
        },
    },
];

const evidenceItems = [
    "Retailer scorecard line with the deduction amount and the measure used.",
    "Booked delivery window, not just the planned ship date.",
    "Dock or gate timestamp the retailer used to call the delivery late.",
    "POD and ASN showing what you actually delivered.",
    "PO line showing the ordered quantity and any agreed exceptions.",
];

export default function DifotCalculatorPage() {
    return (
        <ToolPageShell
            breadcrumb="DIFOT Calculator"
            eyebrow="Claims Reference + Tool"
            titleParts={["DIFOT calculator:", "formula, example, and penalty checker"]}
            description="DIFOT math is usually the easy part. The hard part is whether the booked window, POD, ASN, dock timestamp, and retailer scorecard all point to the same story."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="Next layer"
            footerText="Use this to decide whether to accept, query, or challenge a DIFOT line before it disappears into a remittance file. Evidence review only. Not legal advice."
            footerLink={{
                href: CLAIMS_DESK_URL,
                label: "Send one redacted remittance",
            }}
        >
            <section className="grid gap-[1px] bg-border md:grid-cols-[1.05fr_0.95fr]">
                <article className="space-y-6 bg-card p-6 md:p-8">
                    <div>
                        <p className="site-meta text-primary">Meaning</p>
                        <h2 className="site-h3 mt-4">What DIFOT means</h2>
                        <p className="site-body mt-3">
                            DIFOT usually means delivered in full, on time. Retailers use it to score
                            whether the ordered quantity arrived inside the booked receiving window.
                            Suppliers get caught when the label sounds simple but the scorecard basis is
                            not visible.
                        </p>
                    </div>

                    <div>
                        <p className="site-meta text-primary">Formula</p>
                        <h2 className="site-h3 mt-4">The basic calculation</h2>
                        <p className="site-body mt-3">
                            The common starting point is:
                        </p>
                        <div className="mt-4 border border-border bg-background p-5">
                            <p className="font-mono text-sm text-foreground">
                                DIFOT % = (deliveries that were in full and on time / total deliveries) x 100
                            </p>
                        </div>
                        <p className="site-body mt-3">
                            Some retailers measure at order level. Others measure at line, case, or unit
                            level. Some use gate-in time. Others use unload-complete time. That is why the
                            scorecard basis matters more than the formula headline.
                        </p>
                    </div>
                </article>

                <aside className="space-y-6 bg-background p-6 md:p-8">
                    <div>
                        <p className="site-meta text-primary">Worked example</p>
                        <h2 className="site-h3 mt-4">One order, one penalty line</h2>
                        <p className="site-body mt-3">
                            Say the retailer counted 9 compliant deliveries out of 10 and posted a 90%
                            DIFOT result. Your delivery looked late because the scorecard used the dock
                            timestamp, but your slot booking and POD show the truck arrived inside the
                            window. The 90% number can be numerically correct and still applied against the
                            wrong basis for that line.
                        </p>
                    </div>

                    <div>
                        <p className="site-meta text-primary">Context</p>
                        <h2 className="site-h3 mt-4">Why the math is not the hard part</h2>
                        <p className="site-body mt-3">
                            Most DIFOT disputes are not about division. They are about missing scorecard
                            lines, unclear time basis, booked-window assumptions, or a mismatch between
                            what the supplier recorded and what the retailer system counted.
                        </p>
                    </div>

                    <div className="border border-border bg-card p-5">
                        <p className="site-meta text-primary">Related page</p>
                        <p className="site-body mt-3">
                            For the wider supplier-side shortlist, use the retailer deductions page and
                            rank which claims are supportable, missing proof, worth challenging, or Code
                            risk.
                        </p>
                        <Link href="/resources/retailer-deductions/" className="site-button-secondary mt-5">
                            View retailer deductions
                        </Link>
                    </div>
                </aside>
            </section>

            <section className="mt-16 border-t border-border pt-12">
                <p className="site-meta text-primary">Evidence pack</p>
                <h2 className="site-h3 mt-4">Evidence to request before you accept the line</h2>
                <div className="mt-6 grid gap-[1px] bg-border">
                    {evidenceItems.map((item) => (
                        <div key={item} className="bg-card p-4 text-sm leading-relaxed text-foreground-subtle">
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12">
                <p className="site-meta text-primary">Checker</p>
                <h2 className="site-h3 mt-4">Run the DIFOT evidence check</h2>
                <p className="site-body mt-3 max-w-3xl">
                    The checker below does one job: sort a DIFOT deduction into supportable, missing
                    proof, or worth challenging based on the evidence you actually have in hand.
                </p>
                <div className="mt-8">
                    <DifotPenaltyChecker />
                </div>
            </section>
        </ToolPageShell>
    );
}
