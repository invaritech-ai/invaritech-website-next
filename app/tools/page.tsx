import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, Clock, Lock } from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";

export const metadata: Metadata = {
    title: "Free AI Automation Tools — No Signup | INVARITECH",
    description:
        "Free AI tools built for operations, finance, and support teams. Each tool is a working example of what INVARITECH deploys for enterprise clients across Singapore, Hong Kong, Malaysia, and Thailand. No signup required.",
    openGraph: {
        title: "Free AI Automation Tools | INVARITECH",
        description:
            "Free AI tools built for operations, finance, and support teams. Working examples of production-grade AI automation. No signup required.",
        url: "https://www.invaritech.ai/tools/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free AI Automation Tools — INVARITECH",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/tools/",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free AI Automation Tools",
    "description": "Free AI tools built for operations, finance, and support teams.",
    "url": "https://www.invaritech.ai/tools/",
    "provider": {
        "@type": "Organization",
        "name": "INVARITECH",
        "url": "https://www.invaritech.ai",
    },
    "hasPart": [
        {
            "@type": "SoftwareApplication",
            "name": "Invoice to CSV Extractor",
            "url": "https://www.invaritech.ai/tools/invoice-extractor/",
            "applicationCategory": "BusinessApplication",
            "offers": { "@type": "Offer", "price": "0" },
        },
    ],
};

const liveTools = [
    {
        id: "invoice-extractor",
        tags: ["FINANCE", "DOCUMENTS", "AP"],
        name: "Invoice to CSV Extractor",
        description:
            "Upload any invoice or receipt. AI extracts supplier name, date, line items, totals, and tax into a clean CSV. Works with GST, SST, and VAT invoices.",
        accepts: "PDF · JPG · PNG",
        output: "items.csv + summary.csv",
        time: "< 30 seconds",
        href: "/tools/invoice-extractor/",
    },
];

const upcomingTools = [
    {
        name: "Contract Summariser",
        description:
            "Upload any contract PDF. AI extracts key terms, obligations, renewal dates, and risk clauses into a structured brief.",
        tags: ["LEGAL", "COMPLIANCE", "PROCUREMENT"],
    },
    {
        name: "Email Triage Demo",
        description:
            "Paste a raw inbox export. AI categorises each thread, flags priority, and drafts a first-pass reply for each.",
        tags: ["OPS", "SUPPORT", "SALES"],
    },
];

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-black relative overflow-hidden selection:bg-primary selection:text-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* sr-only semantic content for crawlers */}
            <div className="sr-only">
                <h1>Free AI Automation Tools — No Signup Required</h1>
                <p>
                    Working AI tools built for operations, finance, and support teams. Used by
                    businesses in Singapore, Hong Kong, Malaysia, and Thailand to automate
                    document processing, invoice extraction, and workflow tasks. Each tool is
                    a live example of the automation INVARITECH deploys for enterprise clients.
                </p>
            </div>

            <ArtisticBackground />

            {/* Ghost typography */}
            <div className="absolute top-20 -right-20 select-none pointer-events-none opacity-[0.025] whitespace-nowrap z-0 overflow-hidden">
                <span className="text-[20rem] font-black tracking-tighter uppercase text-white">
                    TOOLS
                </span>
            </div>

            {/* Hero */}
            <section className="relative z-10 pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-8 bg-primary/60" />
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            AI Tools — Free, No Signup
                        </p>
                    </div>

                    <TextEffect
                        per="word"
                        as="h2"
                        preset="fade"
                        className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-white mix-blend-difference mb-8"
                    >
                        AI THAT WORKS.
                    </TextEffect>
                    <TextEffect
                        per="word"
                        as="h2"
                        preset="fade"
                        className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-white/20 mix-blend-difference mb-16"
                    >
                        BUILT TO PROVE IT.
                    </TextEffect>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-t border-white/10 pt-10">
                        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                            Every tool on this page is a working example of what INVARITECH deploys
                            for enterprise clients. Upload your files. Get results. No account required.
                        </p>
                        <Link
                            href="/assessment/"
                            className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors whitespace-nowrap group shrink-0"
                        >
                            <span className="w-4 h-px bg-primary/50 group-hover:w-8 transition-all duration-300" />
                            Score your readiness first
                        </Link>
                    </div>
                </div>
            </section>

            {/* Live Tools */}
            <section className="relative z-10 px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase mb-8 flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-primary/30" />
                        Active Deployments
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {liveTools.map((tool) => (
                            <Link key={tool.id} href={tool.href} className="group block">
                                <div className="border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 p-8 h-full relative overflow-hidden flex flex-col">
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />

                                    {/* Status */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex gap-2 flex-wrap">
                                            {tool.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[9px] font-mono tracking-widest uppercase text-primary/60 border border-primary/20 px-2 py-0.5"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-[9px] font-mono tracking-widest uppercase text-primary flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                            LIVE
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-white/10 bg-black/50 text-primary group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                                        <FileSpreadsheet className="h-5 w-5 relative z-10" />
                                        <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors mb-4">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-white/50 leading-relaxed flex-1 mb-8">
                                        {tool.description}
                                    </p>

                                    {/* Metadata */}
                                    <div className="border-t border-white/10 pt-6 grid grid-cols-3 gap-4 mb-6">
                                        <div>
                                            <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mb-1">Accepts</div>
                                            <div className="text-[10px] font-mono text-white/60">{tool.accepts}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mb-1 flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" /> Speed
                                            </div>
                                            <div className="text-[10px] font-mono text-white/60">{tool.time}</div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mb-1">Output</div>
                                            <div className="text-[10px] font-mono text-white/60">{tool.output}</div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono tracking-widest uppercase text-primary group-hover:gap-3 transition-all flex items-center gap-2">
                                            TRY IT <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Tools */}
            <section className="relative z-10 px-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-8 flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-white/10" />
                        Coming Online
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {upcomingTools.map((tool) => (
                            <div
                                key={tool.name}
                                className="border border-white/5 bg-white/[0.02] p-8 relative overflow-hidden"
                            >
                                {/* Blur overlay */}
                                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20 z-10" />

                                <div className="relative z-0">
                                    <div className="flex gap-2 flex-wrap mb-8">
                                        {tool.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[9px] font-mono tracking-widest uppercase text-white/20 border border-white/10 px-2 py-0.5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-white/5 bg-black/50 text-white/20">
                                        <Lock className="h-5 w-5" />
                                    </div>

                                    <h3 className="text-2xl font-bold tracking-tight text-white/30 mb-4">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-white/20 leading-relaxed">
                                        {tool.description}
                                    </p>
                                </div>

                                {/* Coming soon label */}
                                <div className="absolute bottom-4 right-4 z-20">
                                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/20">
                                        COMING SOON
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative z-10 border-t border-white/10 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-8 bg-primary/60" />
                                <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                    Beyond the Demo
                                </p>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white mb-8">
                                THESE ARE DEMOS.<br />
                                <span className="text-white/30">WE DEPLOY THE REAL THING.</span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                                Each tool here runs the same AI stack we deploy for enterprise clients across
                                Singapore, Hong Kong, Malaysia, and Thailand — connected to their ERP,
                                running at volume, with full governance and audit trails.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Link
                                href="/services/ai-automation-sprint/"
                                className="flex items-center justify-between w-full h-16 bg-primary text-black font-bold tracking-tighter text-xl hover:bg-white transition-all px-8 shadow-[0_0_35px_rgba(255,198,46,0.2)]"
                            >
                                SEE THE 30-DAY SPRINT
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contact/"
                                className="flex items-center justify-between w-full h-16 border border-white/10 px-8 text-white/60 hover:text-white hover:border-white/20 transition-all font-mono text-xs tracking-widest uppercase"
                            >
                                BOOK DISCOVERY CALL
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/assessment/"
                                className="flex items-center justify-between w-full h-12 px-8 text-primary/60 hover:text-primary transition-colors font-mono text-[10px] tracking-widest uppercase"
                            >
                                SCORE YOUR AUTOMATION READINESS →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
