import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InvoiceExtractor } from "@/components/tools/InvoiceExtractor";

export const metadata: Metadata = {
    title: "Free Invoice OCR Tool: PDF Invoice Parser to CSV",
    description:
        "Use a free invoice OCR tool to extract supplier details, invoice numbers, dates, line items, tax, and totals from PDF, JPG, and PNG invoices to CSV. No signup required.",
    keywords: [
        "free invoice OCR tool",
        "invoice OCR",
        "invoice data extractor",
        "free invoice data extractor",
        "PDF invoice parser",
        "invoice parser online",
        "PDF invoice to CSV",
        "invoice to CSV",
        "extract invoice line items",
        "extract data from invoice PDF",
        "accounts payable OCR",
        "invoice processing automation",
        "automated invoice processing",
        "invoice approval workflow",
        "accounts payable automation",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/resources/invoice-extractor/",
    },
    openGraph: {
        title: "Free Invoice OCR Tool: PDF Invoice Parser to CSV",
        description:
            "Extract supplier details, invoice numbers, dates, line items, tax, and totals from PDF, JPG, and PNG invoices to CSV for AP review.",
        url: "https://www.invaritech.ai/resources/invoice-extractor/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free Invoice OCR Tool for AP Teams",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Invoice OCR Tool: PDF Invoice Parser to CSV",
        description:
            "Extract invoice fields and line items into CSV for AP review. No signup required.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";

const faqItems = [
    {
        question: "What is invoice OCR?",
        answer:
            "Invoice OCR reads an invoice file and turns visible fields into structured data. This tool extracts supplier details, invoice number, dates, currency, line items, subtotal, tax, and total from PDF, JPG, and PNG invoices.",
    },
    {
        question: "Can I convert a PDF invoice to CSV?",
        answer:
            "Yes. Upload a PDF invoice, run the extractor, then download an items CSV or summary CSV. The CSV output is meant for review, spreadsheet cleanup, and the next step in an AP workflow.",
    },
    {
        question: "Does the tool extract invoice line items?",
        answer:
            "Yes. When line items are visible, the extractor returns item description, quantity, unit price, and line total where available.",
    },
    {
        question: "Is invoice OCR the same as invoice processing automation?",
        answer:
            "No. Invoice OCR is the intake step. Invoice processing automation also covers validation rules, exception routing, invoice approval workflow checks, evidence capture, and audit trails before posting or payment release.",
    },
    {
        question: "Do I need to create an account?",
        answer:
            "No. The tool is free to try without signup. Downloads work immediately. If you want the result in your inbox, you can enter your email after a successful extraction.",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Free Invoice OCR Tool: PDF Invoice Parser to CSV",
        description:
            "Free invoice OCR tool for extracting supplier details, invoice numbers, dates, line items, tax, and totals from PDF, JPG, and PNG invoices to CSV.",
        url: `${BASE}/resources/invoice-extractor/`,
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            {
                "@type": "ListItem",
                position: 2,
                name: "Resources",
                item: `${BASE}/resources/`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Invoice Extractor",
                item: `${BASE}/resources/invoice-extractor/`,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Invoice Data Extractor",
        alternateName: [
            "Free Invoice OCR Tool",
            "PDF Invoice Parser",
            "Invoice to CSV Converter",
        ],
        description:
            "Upload a PDF, JPG, or PNG invoice and extract supplier details, invoice number, dates, currency, line items, tax, subtotal, and total into CSV for accounts payable review.",
        url: `${BASE}/resources/invoice-extractor/`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "AUD",
        },
        provider: {
            "@type": "Organization",
            name: "INVARITECH",
            url: BASE,
        },
        featureList: [
            "Extract invoice line items to CSV",
            "Parse PDF, JPG, and PNG invoices",
            "Extract supplier name, invoice number, date, currency, tax, subtotal, and total",
            "Export items CSV and summary CSV",
            "Use invoice OCR before AP review and approval checks",
            "No signup required",
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    },
];

const extractedFields = [
    "Supplier or vendor name",
    "Invoice or document number",
    "Invoice date",
    "Currency",
    "Line item descriptions",
    "Quantities and units",
    "Unit prices and line totals",
    "Subtotal, tax, tip, and total",
];

const nextStepLinks = [
    {
        label: "How invoice processing works",
        title: "Automated invoice processing guide",
        body: "See how invoice OCR fits with validation rules, exception states, approval evidence, posting boundaries, and audit trails.",
        href: "/resources/invoice-processing-automation/",
        cta: "Read the guide",
    },
    {
        label: "Map payment controls",
        title: "Accounts payable controls checklist",
        body: "Map invoice approval workflow checks, owners, evidence requirements, and payment release controls around the extracted data.",
        href: "/resources/accounts-payable-controls/",
        cta: "Open the checklist",
    },
    {
        label: "Check matching exceptions",
        title: "Three-way match exceptions",
        body: "Use extracted invoice fields to support PO, invoice, and receipt checks before payment or posting.",
        href: "/glossary/three-way-match/",
        cta: "Review the workflow",
    },
    {
        label: "See the wider model",
        title: "Finance automation for AP teams",
        body: "Place invoice intake next to approval routing, exception handling, payment controls, and month-end follow-up.",
        href: "/finance-automation/",
        cta: "See how it fits",
    },
];

export default function InvoiceExtractorPage() {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="site-container pt-32 md:pt-36">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Resources", href: "/resources/" },
                        { label: "Invoice Extractor" },
                    ]}
                />
            </div>

            <section className="pt-16 pb-14 md:pt-20 md:pb-20">
                <div className="site-container">
                    <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
                        <div>
                            <div className="site-eyebrow">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Free invoice OCR tool</p>
                            </div>

                            <h1 className="site-h2 max-w-3xl">
                                Free Invoice OCR Tool:{" "}
                                <span className="text-primary">PDF Invoice Parser to CSV</span>
                            </h1>

                            <p className="site-lead mt-6 max-w-xl">
                                Upload one supplier invoice and extract supplier details, invoice
                                number, dates, currency, line items, subtotal, tax, and total.
                                Download the CSV now, or email the result to yourself after a
                                successful extraction.
                            </p>
                        </div>

                        <div className="lg:pt-1">
                            <div className="mb-5 flex items-center justify-between gap-4 border-b border-border pb-5">
                                <div>
                                    <p className="tool-kicker">Use the tool</p>
                                    <p className="tool-copy mt-2">
                                        Best for first-pass AP intake, spreadsheet cleanup, and
                                        line-item extraction before approval or exception review.
                                    </p>
                                </div>
                                <span className="control-stamp control-stamp-held">
                                    5 per day
                                </span>
                            </div>
                            <InvoiceExtractor />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-border pt-12 md:pt-16">
                <div className="site-container">
                    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                What it extracts
                            </p>
                            <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                                Pull the invoice data out before anyone retypes it.
                            </h2>
                            <p className="site-body mt-5">
                                This page is for invoice OCR and invoice-to-CSV work. It helps AP
                                teams turn supplier files into structured rows for review. It does
                                not pretend to replace invoice approval workflow, exception routing,
                                or payment controls around the invoice.
                            </p>
                        </div>
                        <div className="grid gap-[1px] bg-border sm:grid-cols-2">
                            {extractedFields.map((field) => (
                                <div
                                    key={field}
                                    className="bg-background p-4 text-sm text-foreground-muted"
                                >
                                    {field}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12 md:pt-16">
                <div className="site-container">
                    <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                        Where invoice OCR stops
                    </p>
                    <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                        Invoice OCR is the intake step. Invoice processing automation is the workflow around it.
                    </h2>
                    <div className="mt-8 grid gap-[1px] bg-border lg:grid-cols-2">
                        <article className="bg-background p-6 md:p-8">
                            <p className="tool-label">This free tool handles</p>
                            <h3 className="site-card-title mt-4">Invoice OCR and CSV extraction</h3>
                            <div className="mt-5 space-y-3">
                                {[
                                    "Read invoice PDFs and images",
                                    "Extract supplier fields and line items",
                                    "Normalize values into CSV output",
                                    "Give AP a cleaner starting point before review",
                                ].map((item) => (
                                    <p key={item} className="site-card-body">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </article>

                        <article className="bg-background p-6 md:p-8">
                            <p className="tool-label">The next workflow layer handles</p>
                            <h3 className="site-card-title mt-4">
                                Invoice processing automation and AP controls
                            </h3>
                            <div className="mt-5 space-y-3">
                                {[
                                    "Validation rules for totals, vendors, and duplicates",
                                    "Invoice exception routing and owner assignment",
                                    "Invoice approval workflow checks and evidence requirements",
                                    "Posting, payment release, and audit trail boundaries",
                                ].map((item) => (
                                    <p key={item} className="site-card-body">
                                        {item}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-7 flex flex-wrap gap-4">
                                <Link
                                    href="/resources/invoice-processing-automation/"
                                    className="text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
                                >
                                    Automated invoice processing guide
                                </Link>
                                <Link
                                    href="/resources/accounts-payable-controls/"
                                    className="text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
                                >
                                    Accounts payable controls checklist
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12 md:pt-16">
                <div className="site-container">
                    <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                        Next steps
                    </p>
                    <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                        If this tool helps, the next step is to map the workflow around the invoice.
                    </h2>
                    <div className="mt-8 grid gap-[1px] bg-border lg:grid-cols-2">
                        {nextStepLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="group bg-background p-6 transition-colors hover:bg-card md:p-8"
                            >
                                <p className="tool-label">{item.label}</p>
                                <h3 className="site-card-title mt-4">{item.title}</h3>
                                <p className="site-card-body mt-4">{item.body}</p>
                                <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
                                    {item.cta}
                                    <ArrowRight className="size-3.5" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                    <p className="site-body mt-8 max-w-3xl">
                        If you want the implementation logic behind the extractor itself, read the{" "}
                        <Link
                            href="/blog/ai-invoice-data-extraction/"
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            invoice extraction architecture guide
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12 pb-24 md:pt-16">
                <div className="site-container">
                    <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                        FAQ
                    </p>
                    <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                        Invoice extractor questions
                    </h2>
                    <div className="mt-8 divide-y divide-border border-y border-border">
                        {faqItems.map((item) => (
                            <div key={item.question} className="py-6">
                                <h3 className="text-lg font-semibold text-foreground">
                                    {item.question}
                                </h3>
                                <p className="site-body mt-2">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
