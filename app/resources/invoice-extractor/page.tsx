import { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { InvoiceExtractor } from "@/components/tools/InvoiceExtractor";

export const metadata: Metadata = {
    title: "Invoice Data Extractor for AP Teams",
    description:
        "Upload a PDF, JPG, or PNG invoice and extract supplier, line items, totals, and tax to CSV for accounts payable review and invoice approval workflows.",
    keywords: [
        "invoice data extractor",
        "PDF invoice parser",
        "invoice to CSV",
        "AI invoice extraction",
        "extract invoice line items",
        "invoice OCR tool",
        "receipt data extractor",
        "AP automation tool",
        "invoice approval workflow",
        "accounts payable automation",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/resources/invoice-extractor/",
    },
    openGraph: {
        title: "Free Invoice Data Extractor for AP Teams",
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
        title: "Free Invoice Data Extractor for AP Teams",
        description:
            "Extract invoice fields and line items into CSV for accounts payable review. Free, no signup.",
        images: ["/og-image.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Invoice Data Extractor",
    description:
        "Upload a PDF, JPG, or PNG invoice and extract supplier name, line items, totals, and tax into CSV for accounts payable review.",
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
        "Supports PDF, JPG, and PNG invoices",
        "Exports items CSV and summary CSV",
        "Helps accounts payable teams review invoice exceptions",
        "No signup required",
    ],
};

export default function InvoiceExtractorPage() {
    return (
        <ToolPageShell
            breadcrumb="Invoice Extractor"
            eyebrow="Live Tool"
            titleParts={["Invoice Data", "Extractor"]}
            description="Upload a PDF, JPG, or PNG invoice and extract supplier, document number, date, currency, line items, subtotal, tax, and total. Use the CSV output to review invoice exceptions, prepare approval checks, or move cleaner data into your AP workflow."
            maxWidth="3xl"
            jsonLd={jsonLd}
            footerLabel="Where this fits"
            footerText="Invoice extraction is only one step in an accounts payable control. In production, we connect this kind of structured data to invoice exception management, approval routing, evidence capture, and audit trails around the systems your team already uses. Rate limited to 5 extractions per day per IP address."
        >
            <InvoiceExtractor />
        </ToolPageShell>
    );
}
