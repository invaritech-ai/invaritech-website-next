import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClaimsCTA } from "@/components/claims/claims-cta";
import { WorksheetDownloadLink } from "@/components/claims/worksheet-download-link";

const BASE = "https://www.invaritech.ai";
const PAGE_URL = "https://www.invaritech.ai/glossary/remittance-advice/";

const description =
    "Definition-first remittance advice glossary page covering what it is, what it contains, how it differs from an invoice or receipt, and why it matters when supermarket deductions appear.";

export const metadata: Metadata = {
    title: "What is a remittance advice?",
    description,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "What is a remittance advice? | INVARITECH",
        description,
        url: PAGE_URL,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "What is a remittance advice? | INVARITECH",
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
            { "@type": "ListItem", position: 3, name: "Remittance advice", item: PAGE_URL },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: "Remittance advice",
        description:
            "A payer notice that tells a supplier which invoices or claim lines a payment relates to, including deductions, set-offs, references, and amounts.",
        url: PAGE_URL,
        inDefinedTermSet: `${BASE}/glossary/`,
    },
];

export default function RemittanceAdvicePage() {
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
                                { label: "Remittance Advice" },
                            ]}
                        />

                        <div className="mt-12 mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Supplier Claims Glossary
                            </p>
                        </div>

                        <h1 className="site-h2">What is a remittance advice?</h1>
                        <p className="site-lead mt-6 max-w-3xl">
                            A remittance advice is the payer&apos;s line-level explanation of what was
                            paid, what was withheld, and which invoices, credit notes, claims, or
                            deductions the payment was matched against.
                        </p>

                        <article className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="space-y-6">
                                <div>
                                    <p className="site-meta text-primary">Definition</p>
                                    <p className="site-body mt-3">
                                        A remittance advice shows how the payer allocated the payment.
                                        It names the invoices paid, credits applied, and deductions taken.
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta text-primary">Typical contents</p>
                                    <p className="site-body mt-3">
                                        A remittance advice usually includes invoice numbers, payment
                                        references, dates, amounts paid, credits applied, and any
                                        deductions or set-offs taken before cash landed.
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta text-primary">Invoice vs receipt</p>
                                    <p className="site-body mt-3">
                                        An invoice asks to be paid. A receipt confirms payment happened. A
                                        remittance advice sits between those two: it explains what the
                                        payer says they settled and what they say they withheld.
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta text-primary">Is it proof of payment?</p>
                                    <p className="site-body mt-3">
                                        Treat it as allocation evidence. Use bank settlement records to
                                        prove funds moved.
                                    </p>
                                </div>
                                <div>
                                    <p className="site-meta text-primary">Why supermarket suppliers care</p>
                                    <p className="site-body mt-3">
                                        In grocery, deduction work usually starts in the remittance advice.
                                        It shows which claims need proof, which lines look supportable, and
                                        which lines may raise a Code question.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5 border border-border bg-card p-6 md:p-8">
                                <div>
                                    <p className="site-meta text-primary">Use next</p>
                                    <h2 className="site-h3 mt-4">Turn one remittance into a triage list</h2>
                                    <p className="site-body mt-3">
                                        The worksheet gives you one row per deduction: retailer, dates,
                                        amount, a starting verdict, the evidence to ask for, and a question
                                        to send.
                                    </p>
                                </div>

                                <WorksheetDownloadLink />

                                <div className="border-t border-border pt-5">
                                    <p className="site-body">
                                        Claims Desk reviews one redacted remittance and marks each line as
                                        supportable, missing proof, worth challenging, or Code risk.
                                        Evidence review only. Not legal advice.
                                    </p>
                                    <ClaimsCTA
                                        medium="remittance-advice"
                                        content="page-cta"
                                        className="site-button mt-5 gap-2"
                                    />
                                </div>

                                <Link href="/resources/retailer-deductions/" className="site-button-secondary">
                                    Back to retailer deductions
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
