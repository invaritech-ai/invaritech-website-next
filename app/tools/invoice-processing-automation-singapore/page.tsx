import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { BOOK_MEETING_URL } from "@/lib/marketing";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "Invoice Processing Automation Singapore | Free AI Tool + 30-Day Sprint",
    description: "Automate invoice processing for your Singapore finance team. Free AI extraction tool for GST invoices. Full AP automation sprints from $10K. No signup required.",
    keywords: [
        "invoice processing automation Singapore",
        "invoice automation Singapore",
        "AP automation Singapore",
        "GST invoice processing automation",
        "accounts payable automation Singapore",
        "invoice data extraction Singapore",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/tools/invoice-processing-automation-singapore/",
    },
    openGraph: {
        title: "Invoice Processing Automation Singapore | INVARITECH",
        description: "Free AI invoice extraction tool for Singapore finance teams. Try it on your GST invoices now — no signup. Full AP automation sprints available.",
        url: "https://www.invaritech.ai/tools/invoice-processing-automation-singapore/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Invoice Processing Automation Singapore — INVARITECH" }],
    },
};

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.invaritech.ai" },
            { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.invaritech.ai/tools/" },
            { "@type": "ListItem", position: 3, name: "Invoice Processing Automation Singapore", item: "https://www.invaritech.ai/tools/invoice-processing-automation-singapore/" },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Invoice Processing Automation for Singapore Finance Teams",
        description: "AI-powered invoice processing automation for Singapore SMEs. Handles GST invoices, multi-currency, and cross-border vendor documents.",
        url: "https://www.invaritech.ai/tools/invoice-processing-automation-singapore/",
        provider: { "@type": "Organization", name: "INVARITECH", url: "https://www.invaritech.ai" },
        areaServed: "Singapore",
        serviceType: "Invoice Processing Automation",
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Does the invoice extractor handle Singapore GST invoices?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. The tool extracts GST amounts, GST registration numbers, and tax-inclusive totals from Singapore-format invoices. It handles both standard-rated (9%) and zero-rated invoices." },
            },
            {
                "@type": "Question",
                name: "Can it process multi-currency invoices common in Singapore?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. The AI model identifies and preserves the invoice currency (SGD, USD, EUR, etc.) and extracts amounts without conversion, so your AP team retains the original figures." },
            },
            {
                "@type": "Question",
                name: "How long does a full AP automation sprint take for a Singapore company?",
                acceptedAnswer: { "@type": "Answer", text: "Our 30-day sprint delivers a production-ready invoice processing automation integrated with your existing ERP or spreadsheet workflow. Fixed scope, fixed price, defined outcome." },
            },
        ],
    },
];

const painPoints = [
    { icon: Clock, text: "Finance teams spend 6-12 hours per week manually keying invoice data into spreadsheets or ERP systems" },
    { icon: AlertCircle, text: "GST input tax claims are delayed or missed due to manual extraction errors" },
    { icon: FileText, text: "Cross-border invoices from Malaysia, China, and the US arrive in inconsistent formats with no standard template" },
    { icon: AlertCircle, text: "Month-end close is delayed because AP reconciliation is a manual bottleneck" },
];

const features = [
    "Extracts supplier name, invoice number, date, line items, subtotal, GST, and total",
    "Handles GST-registered Singapore vendor invoices",
    "Supports multi-currency: SGD, USD, EUR, MYR, and more",
    "Accepts PDF, JPG, and PNG — including scanned and photographed invoices",
    "Exports clean CSV ready for Xero, QuickBooks, or any ERP",
    "No signup. No data stored. Free.",
];

export default function InvoiceAutomationSingaporePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="min-h-screen bg-background text-foreground">

                {/* Hero */}
                <section className="pt-40 pb-20 px-6 border-b border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">Singapore // Finance Automation</p>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
                            Invoice Processing Automation<br />
                            <span className="text-primary">for Singapore Finance Teams</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                            Singapore SMEs spend thousands of hours per year manually processing invoices. We built a free AI tool to extract invoice data instantly — and a 30-day sprint to automate the entire AP workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/tools/invoice-extractor/">
                                <MagneticButton className="bg-primary text-black px-8 py-4 font-bold hover:bg-white transition-colors">
                                    Try the Free Invoice Extractor
                                </MagneticButton>
                            </Link>
                            <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                                <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 hover:bg-white/10 transition-colors">
                                    Book a 30-Min AP Audit
                                </MagneticButton>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Pain Points */}
                <section className="py-20 px-6 border-b border-white/10 bg-black/20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">The Problem</p>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
                            Manual invoice processing is costing Singapore finance teams more than they realise
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {painPoints.map((item, i) => (
                                <div key={i} className="flex gap-4 p-6 border border-white/10 bg-white/5">
                                    <item.icon className="size-5 text-primary shrink-0 mt-0.5" />
                                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Free Tool CTA */}
                <section className="py-20 px-6 border-b border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">Free Tool</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                    Extract invoice data in seconds. Free.
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    Upload any Singapore invoice — GST-registered vendor, cross-border supplier, scanned PDF, or photographed receipt. The AI model extracts every field and returns a clean CSV in under 30 seconds.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                            <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/tools/invoice-extractor/">
                                    <MagneticButton className="bg-primary text-black px-8 py-4 font-bold hover:bg-white transition-colors flex items-center gap-2">
                                        Try the Invoice Extractor <ArrowRight className="size-4" />
                                    </MagneticButton>
                                </Link>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-8">
                                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">What you get</p>
                                <div className="space-y-4">
                                    {[
                                        { label: "Items CSV", desc: "One row per line item — ready for ERP import" },
                                        { label: "Summary CSV", desc: "Invoice header, totals, GST, and currency" },
                                        { label: "Structured JSON", desc: "For developers connecting to their own systems" },
                                    ].map((item, i) => (
                                        <div key={i} className="border-t border-white/10 pt-4">
                                            <p className="font-bold text-white text-sm mb-1">{item.label}</p>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Full Sprint */}
                <section className="py-20 px-6 border-b border-white/10 bg-black/20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">Full Automation</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                    Need the full AP automation system?
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    The free tool handles extraction. The 30-day sprint builds the complete pipeline: vendor inbox monitoring, automatic extraction, ERP integration, exception flagging, and audit trail — all running without manual intervention.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    Fixed scope. Fixed price from $10,000 SGD. Deployed to production in 30 days. MoU signed before any work begins.
                                </p>
                                <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                                    <MagneticButton className="bg-transparent border border-primary/50 text-primary px-8 py-4 hover:bg-primary/10 transition-colors flex items-center gap-2">
                                        Book a 30-Min AP Audit <ArrowRight className="size-4" />
                                    </MagneticButton>
                                </a>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: "01", title: "Inbox monitoring", desc: "Vendor invoices arrive by email — system picks them up automatically" },
                                    { step: "02", title: "AI extraction", desc: "Every field extracted, validated, and flagged if confidence is low" },
                                    { step: "03", title: "ERP integration", desc: "Clean data pushed to Xero, NetSuite, SAP, or your spreadsheet" },
                                    { step: "04", title: "Exception handling", desc: "Mismatches, missing fields, and anomalies routed to a human queue" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-5 border border-white/10 bg-white/5">
                                        <span className="text-xs font-mono text-primary/60 pt-0.5 shrink-0">{item.step}</span>
                                        <div>
                                            <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 px-6 border-b border-white/10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 font-mono tracking-tighter text-white">FAQ</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    q: "Does the invoice extractor handle Singapore GST invoices?",
                                    a: "Yes. The tool extracts GST amounts, GST registration numbers, and tax-inclusive totals from Singapore-format invoices. It handles both standard-rated (9%) and zero-rated invoices.",
                                },
                                {
                                    q: "Can it process multi-currency invoices common in Singapore?",
                                    a: "Yes. The AI model identifies and preserves the invoice currency (SGD, USD, EUR, MYR, etc.) and extracts amounts without conversion, so your AP team retains the original figures.",
                                },
                                {
                                    q: "How long does a full AP automation sprint take for a Singapore company?",
                                    a: "Our 30-day sprint delivers a production-ready invoice processing automation integrated with your existing ERP or spreadsheet workflow. Fixed scope, fixed price, defined outcome.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="border-t border-white/10 pt-6">
                                    <p className="font-bold text-white mb-3">{item.q}</p>
                                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter text-white">
                            Start with the free tool.<br />
                            <span className="text-primary">Scale when you are ready.</span>
                        </h2>
                        <p className="text-muted-foreground mb-10 text-lg">
                            No signup. No commitment. Upload your first Singapore invoice in the next 60 seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/tools/invoice-extractor/">
                                <MagneticButton className="bg-primary text-black px-10 py-5 text-lg font-bold hover:bg-white transition-colors">
                                    Try the Free Tool
                                </MagneticButton>
                            </Link>
                            <Link href="/tools/invoice-processing-automation-hong-kong/">
                                <MagneticButton className="bg-transparent border border-white/20 text-white px-10 py-5 text-lg hover:bg-white/10 transition-colors">
                                    Hong Kong version
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
