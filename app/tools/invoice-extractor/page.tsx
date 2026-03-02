import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
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
    "name": "Invoice Data Extractor",
    "description": "Upload any invoice or receipt (PDF, JPG, PNG) and extract supplier name, line items, totals, and tax into a clean CSV. Works with GST, SST, and VAT invoices.",
    "url": "https://www.invaritech.ai/tools/invoice-extractor/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
    },
    "provider": {
        "@type": "Organization",
        "name": "INVARITECH",
        "url": "https://www.invaritech.ai",
    },
    "featureList": [
        "Extract invoice line items to CSV",
        "Supports PDF, JPG, and PNG invoices",
        "Handles GST, SST, and VAT invoices",
        "Exports items CSV and summary CSV",
        "No signup required",
    ],
};

export default function InvoiceExtractorPage() {
    return (
        <main className="min-h-screen bg-[#030305] relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArtisticBackground />

            <div className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                LIVE TOOL // FINANCE
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white mb-6">
                            Invoice Data{" "}
                            <span className="text-primary">Extractor</span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Upload a PDF or image invoice. Get structured line-item data back as
                            JSON, items CSV, or summary CSV — ready for your ERP or spreadsheet.
                        </p>
                    </header>

                    {/* Tool */}
                    <InvoiceExtractor />

                    {/* Footer context */}
                    <div className="mt-20 pt-12 border-t border-white/10">
                        <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-4">
                            WHAT THIS DEMONSTRATES
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xl mb-8">
                            This is the same document parsing layer we integrate into ERP pipelines and
                            finance workflows for clients in Hong Kong and Singapore. Accepts messy PDFs,
                            scanned receipts, and vendor invoices with varying formats.
                        </p>
                        <Link
                            href="/services/ai-integration-services/"
                            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors"
                        >
                            <ArrowRight className="w-3 h-3" />
                            See AI Integration Services
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
