import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { InvoiceExtractor } from "@/components/tools/InvoiceExtractor";

export const metadata: Metadata = {
    title: "Invoice Data Extractor — INVARITECH Tools",
    description:
        "Upload a PDF or image invoice and extract structured line-item data as JSON or CSV. Powered by AI document parsing.",
    alternates: {
        canonical: "https://www.invaritech.ai/tools/invoice-extractor/",
    },
    openGraph: {
        title: "Invoice Data Extractor — INVARITECH Tools",
        description:
            "Upload a PDF or image invoice and extract structured line-item data as JSON or CSV. Powered by AI document parsing.",
        url: "https://www.invaritech.ai/tools/invoice-extractor/",
        type: "website",
    },
};

export default function InvoiceExtractorPage() {
    return (
        <main className="min-h-screen bg-[#030305] relative overflow-hidden">
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
