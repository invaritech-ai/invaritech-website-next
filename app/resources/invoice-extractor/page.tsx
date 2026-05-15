import { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { InvoiceExtractor } from "@/components/tools/InvoiceExtractor";

export const metadata: Metadata = {
    title: "Invoice Data Extractor for AP Teams",
    description:
        "Use a free invoice data extractor to parse PDF, JPG, and PNG invoices. Extract supplier details, invoice numbers, line items, tax, totals, and CSV files for AP review.",
    keywords: [
        "invoice data extractor",
        "free invoice data extractor",
        "PDF invoice parser",
        "PDF invoice to CSV",
        "invoice to CSV",
        "AI invoice extraction",
        "extract invoice line items",
        "extract data from invoice PDF",
        "invoice parser online",
        "invoice OCR tool",
        "invoice OCR",
        "accounts payable OCR",
        "receipt data extractor",
        "AP automation tool",
        "invoice processing automation",
        "invoice approval workflow",
        "accounts payable automation",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/resources/invoice-extractor/",
    },
    openGraph: {
        title: "Invoice Data Extractor for AP Teams",
        description:
            "Extract invoice fields and line items from PDF, JPG, or PNG files into CSV for accounts payable review and approval workflows.",
        url: "https://www.invaritech.ai/resources/invoice-extractor/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free Invoice Data Extractor for AP Teams",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Invoice Data Extractor for AP Teams",
        description:
            "Extract invoice fields and line items into CSV for accounts payable review. Free, no signup.",
        images: ["/og-image.png"],
    },
};

const faqItems = [
    {
        question: "What is an invoice data extractor?",
        answer:
            "An invoice data extractor reads an invoice file and turns key fields into structured data. This tool extracts supplier details, invoice number, dates, currency, line items, subtotal, tax, and total from PDF, JPG, and PNG invoices.",
    },
    {
        question: "Can I convert a PDF invoice to CSV?",
        answer:
            "Yes. Upload a PDF invoice, run the extractor, then download an items CSV or summary CSV. The CSV output can be reviewed in a spreadsheet or prepared for import into compatible accounting and AP workflows.",
    },
    {
        question: "Does the tool extract invoice line items?",
        answer:
            "Yes. When line items are visible in the invoice, the extractor returns item description, quantity, unit price, and line total where available.",
    },
    {
        question: "Is this the same as full accounts payable automation?",
        answer:
            "No. Invoice extraction is the intake step. A production AP workflow should also include validation rules, exception routing, approval checks, evidence capture, and audit trails before posting or payment release.",
    },
    {
        question: "Do I need to create an account?",
        answer:
            "No. The tool is free to try without signup and is rate limited to 5 invoice extractions per day per IP address.",
    },
];

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Invoice Data Extractor",
        alternateName: ["PDF Invoice Parser", "Invoice OCR Tool", "Invoice to CSV Converter"],
        description:
            "Upload a PDF, JPG, or PNG invoice and extract supplier details, invoice number, dates, line items, tax, subtotal, and total into CSV for accounts payable review.",
        url: "https://www.invaritech.ai/resources/invoice-extractor/",
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
            url: "https://www.invaritech.ai",
        },
        featureList: [
            "Extract invoice line items to CSV",
            "Parse PDF, JPG, and PNG invoices",
            "Extract supplier name, invoice number, date, currency, tax, subtotal, and total",
            "Export items CSV and summary CSV",
            "Help accounts payable teams review invoice exceptions",
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
    "Payment method when visible",
];

const workflowSteps = [
    {
        title: "Upload an invoice",
        body: "Use a PDF, JPG, or PNG invoice up to 10 MB. The tool works best on clear digital PDFs and readable scans.",
    },
    {
        title: "Extract structured fields",
        body: "The extractor reads header fields and line item tables, then returns normalized invoice data for review.",
    },
    {
        title: "Download CSV output",
        body: "Export item-level CSV or summary CSV so finance teams can review exceptions, reconcile values, or prepare data for the next AP workflow step.",
    },
];

const useCases = [
    {
        title: "Manual invoice data entry",
        body: "Turn supplier invoices into structured rows before someone retypes vendor, date, tax, total, and line item values.",
    },
    {
        title: "Invoice exception review",
        body: "Use extracted fields to spot missing totals, line item mismatches, unexpected tax, or invoices that need approval checks before release.",
    },
    {
        title: "CSV preparation for AP workflows",
        body: "Create a cleaner spreadsheet starting point before importing, reconciling, or routing invoice data through your existing process.",
    },
];

export default function InvoiceExtractorPage() {
    return (
        <ToolPageShell
            breadcrumb="Invoice Extractor"
            eyebrow="Free invoice OCR tool"
            titleParts={["Invoice Data Extractor:", "PDF Invoice Parser to CSV"]}
            description="Upload a PDF, JPG, or PNG invoice and extract supplier details, invoice number, date, currency, line items, subtotal, tax, and total. Download CSV output for accounts payable review, invoice exception checks, or spreadsheet cleanup before the next AP workflow step."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="Where this fits"
            footerText="Invoice extraction is only one step in an accounts payable control. In production, structured invoice data should connect to validation rules, invoice exception management, approval routing, evidence capture, and audit trails around the systems your team already uses. Rate limited to 5 extractions per day per IP address."
            footerLink={{
                href: "/blog/ai-invoice-data-extraction/",
                label: "Read the invoice extraction architecture guide",
            }}
        >
            <InvoiceExtractor />
            <section className="mt-16 border-t border-border pt-12">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            What it extracts
                        </p>
                        <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                            Convert invoice PDFs and images into structured CSV data.
                        </h2>
                        <p className="site-body mt-5">
                            The tool is designed for finance and accounts payable teams that need a
                            fast way to parse invoice data before review. It is not a replacement for
                            AP approval controls, but it gives you cleaner invoice fields to inspect
                            before routing, matching, or posting.
                        </p>
                    </div>
                    <div className="grid gap-[1px] bg-border sm:grid-cols-2">
                        {extractedFields.map((field) => (
                            <div key={field} className="bg-background p-4 text-sm text-foreground-muted">
                                {field}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    How it works
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    From invoice upload to CSV export in three steps.
                </h2>
                <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-3">
                    {workflowSteps.map((step, index) => (
                        <article key={step.title} className="bg-background p-6">
                            <p className="mb-5 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="site-card-title">{step.title}</h3>
                            <p className="site-card-body mt-3">{step.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    Common AP use cases
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    Use invoice OCR as the intake layer, not the whole control.
                </h2>
                <p className="site-body mt-5 max-w-3xl">
                    Search demand around invoice OCR, PDF invoice parsing, and invoice-to-CSV
                    tools usually comes from the same operational pain: finance teams want to stop
                    manually typing supplier invoices. The next step is deciding what happens after
                    extraction.
                </p>
                <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-3">
                    {useCases.map((useCase) => (
                        <article key={useCase.title} className="bg-background p-6">
                            <h3 className="site-card-title">{useCase.title}</h3>
                            <p className="site-card-body mt-3">{useCase.body}</p>
                        </article>
                    ))}
                </div>
                <div className="mt-8 grid gap-5 border border-border bg-card p-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h3 className="site-h3">Need controls after extraction?</h3>
                        <p className="site-body mt-3">
                            If your team needs approval checks, exception routing, or payment-release
                            evidence after invoice parsing, start with the supplier payment control
                            rule table.
                        </p>
                    </div>
                    <Link
                        href="/resources/supplier-payment-control-rule-table/interactive/"
                        className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                        View the Rule Table
                    </Link>
                </div>
            </section>

            <section className="mt-16 border-t border-border pt-12">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-primary">
                    FAQ
                </p>
                <h2 className="font-editorial text-3xl font-semibold leading-tight md:text-5xl">
                    Invoice extractor questions
                </h2>
                <div className="mt-8 divide-y divide-border border-y border-border">
                    {faqItems.map((item) => (
                        <div key={item.question} className="py-6">
                            <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                            <p className="site-body mt-2">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </ToolPageShell>
    );
}
