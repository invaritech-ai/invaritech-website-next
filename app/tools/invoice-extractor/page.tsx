import { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { InvoiceExtractor } from "@/components/tools/InvoiceExtractor";

export const metadata: Metadata = {
    title: "Free AI Invoice Data Extractor — PDF to CSV | INVARITECH Tools",
    description:
        "Upload any invoice or receipt (PDF, JPG, PNG) and extract supplier name, line items, totals, and tax into a clean CSV. Free. No signup. Works with GST, SST, and VAT invoices.",
    keywords: [
        "invoice data extractor",
        "PDF invoice parser",
        "invoice to CSV",
        "AI invoice extraction",
        "extract invoice line items",
        "invoice OCR tool",
        "receipt data extractor",
        "AP automation tool",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/tools/invoice-extractor/",
    },
    openGraph: {
        title: "Free AI Invoice Data Extractor — PDF to CSV",
        description:
            "Upload any invoice or receipt. AI extracts supplier, line items, totals, and tax into a clean CSV. Free, no signup. Works with GST, SST, and VAT.",
        url: "https://www.invaritech.ai/tools/invoice-extractor/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free AI Invoice Data Extractor — INVARITECH Tools",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free AI Invoice Data Extractor — PDF to CSV",
        description:
            "Upload any invoice or receipt. AI extracts line items and totals into a clean CSV. Free, no signup.",
        images: ["/og-image.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Invoice Data Extractor",
    description:
        "Upload any invoice or receipt (PDF, JPG, PNG) and extract supplier name, line items, totals, and tax into a clean CSV. Works with GST, SST, and VAT invoices.",
    url: "https://www.invaritech.ai/tools/invoice-extractor/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    provider: {
        "@type": "Organization",
        name: "INVARITECH",
        url: "https://www.invaritech.ai",
    },
    featureList: [
        "Extract invoice line items to CSV",
        "Supports PDF, JPG, and PNG invoices",
        "Handles GST, SST, and VAT invoices",
        "Exports items CSV and summary CSV",
        "No signup required",
    ],
};

export default function InvoiceExtractorPage() {
    return (
        <ToolPageShell
            breadcrumb="Invoice Extractor"
            eyebrow="LIVE TOOL // FINANCE"
            titleParts={["Invoice Data", "Extractor"]}
            description="Upload a PDF or image invoice. Get structured line-item data back as JSON, items CSV, or summary CSV — ready for your ERP or spreadsheet."
            maxWidth="3xl"
            jsonLd={jsonLd}
            footerLabel="WHAT THIS DEMONSTRATES"
            footerText="This is the same document parsing layer we integrate into ERP pipelines and finance workflows for clients in Hong Kong and Singapore. Accepts messy PDFs, scanned receipts, and vendor invoices with varying formats."
            footerLink={{
                href: "/services/ai-integration-services/",
                label: "See AI Integration Services",
            }}
        >
            <InvoiceExtractor />
        </ToolPageShell>
    );
}
