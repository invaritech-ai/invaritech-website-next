import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, Clock, Lock, Calculator, Gauge, Download, LineChart } from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";

export const metadata: Metadata = {
    title: "Free AI Tools for Finance & Operations — Invoice Extractor, Close Calculator, AI Readiness Assessment | INVARITECH",
    description:
        "Free AI-powered tools for finance and operations teams in Singapore, Hong Kong, Malaysia, and Thailand. Extract invoices to CSV, calculate your month-end close cost, and score your AI automation readiness. No signup required.",
    keywords: [
        "free AI tools for finance",
        "free AI automation tools",
        "invoice extractor tool",
        "invoice PDF to CSV free",
        "AI invoice parser",
        "extract invoice to spreadsheet",
        "invoice OCR tool free",
        "AP automation tool",
        "accounts payable automation tool",
        "month end close calculator",
        "close cycle cost calculator",
        "finance automation ROI calculator",
        "manual tax calculator",
        "month end close benchmark",
        "AI readiness assessment",
        "AI automation readiness assessment",
        "automation readiness test",
        "AI ROI assessment free",
        "business process automation tools",
        "finance automation tools Singapore",
        "finance automation tools Hong Kong",
        "free business automation tools no signup",
        "AI tools for finance teams",
        "workflow automation tools",
        "burn rate calculator",
        "cash runway calculator",
        "cash flow visibility tool",
        "net burn rate calculator free",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/tools/",
    },
    openGraph: {
        title: "Free AI Tools for Finance & Operations | INVARITECH",
        description:
            "Invoice Extractor, Month-End Close Calculator, and AI Readiness Assessment. Free, no signup. Used by finance teams in Singapore, Hong Kong, and Malaysia.",
        url: "https://www.invaritech.ai/tools/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free AI Automation Tools — INVARITECH",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free AI Tools for Finance & Ops — No Signup",
        description:
            "Invoice Extractor, Month-End Close Calculator, AI Readiness Assessment. Free, instant results.",
        images: ["/og-image.png"],
    },
};

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free AI Automation Tools for Finance & Operations",
        "description":
            "Free AI-powered tools for finance and operations teams. Extract invoices to CSV, calculate month-end close cost, and score AI automation readiness. No signup required.",
        "url": "https://www.invaritech.ai/tools/",
        "provider": {
            "@type": "Organization",
            "name": "INVARITECH",
            "url": "https://www.invaritech.ai",
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": 4,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": "AI Invoice to CSV Extractor",
                        "url": "https://www.invaritech.ai/tools/invoice-extractor/",
                        "description":
                            "Upload any invoice or receipt PDF, JPG, or PNG. AI extracts supplier name, invoice number, line items, quantities, unit prices, totals, and tax into a clean CSV. Works with GST, SST, and VAT invoices from Singapore, Malaysia, and Hong Kong.",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "featureList": [
                            "Extract invoice line items to CSV",
                            "Supports PDF, JPG, PNG invoices",
                            "GST, SST, and VAT invoice parsing",
                            "Exports items CSV and summary CSV",
                            "No signup required",
                            "5 free extractions per day",
                        ],
                    },
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": "Month-End Close Cost Calculator",
                        "url": "https://www.invaritech.ai/tools/cost-to-close-calculator/",
                        "description":
                            "Calculate the true annual cost of your manual month-end close cycle. Enter finance team size, hours per close, and loaded hourly rate. Get your annual manual tax, projected savings from automation, and close cycle benchmark vs 100 finance teams.",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "featureList": [
                            "Monthly and annual close cost calculation",
                            "Close cycle benchmark vs industry (Best-in-class to Below average)",
                            "Projected savings from automation (70% reduction baseline)",
                            "Hours reclaimed per year",
                            "Supports SGD, HKD, MYR, USD",
                            "No signup required",
                        ],
                    },
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": "Cash Runway & Burn Rate Calculator",
                        "url": "https://www.invaritech.ai/tools/burn-rate-calculator/",
                        "description":
                            "Free calculator for net monthly burn rate, cash runway in months, projected cash position at 3, 6, and 12 months, and the dollar cost of your reporting lag. Supports SGD, HKD, MYR, and USD. No signup required.",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "featureList": [
                            "Net monthly burn rate calculation",
                            "Cash runway in months",
                            "Projected cash at 3, 6, and 12 months",
                            "Reporting lag cost — dollar value of decisions on stale data",
                            "Supports SGD, HKD, MYR, USD",
                            "No signup required",
                        ],
                    },
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@type": "SoftwareApplication",
                        "name": "AI Automation Readiness Assessment",
                        "url": "https://www.invaritech.ai/tools/assessment/",
                        "description":
                            "Free 4-step AI automation readiness assessment. Answer 11 questions about your workflow, data, and team. Receive a Viability Score, Readiness Score, Risk Index, projected monthly hours saved, and Automation Archetype profile.",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "Web",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "featureList": [
                            "AI Automation Viability Score (0–100)",
                            "Operational Readiness Score (0–100)",
                            "Risk Index for AI deployment",
                            "Projected monthly hours saved and cost avoidance",
                            "Automation Archetype: one of 5 strategic profiles",
                            "Step-by-step automation roadmap",
                        ],
                    },
                },
            ],
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is the AI invoice extractor free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The invoice extractor is completely free with no signup required. You can extract up to 5 invoices per day. It supports PDF, JPG, and PNG invoices and works with GST, SST, and VAT formats.",
                },
            },
            {
                "@type": "Question",
                "name": "What does the month-end close cost calculator measure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Cost-to-Close Calculator measures your current annual close labor cost (your 'manual tax') based on team size, hours per close, and loaded hourly rate. It then projects your savings if 70% of manual hours are automated, and benchmarks your close cycle against industry data from 100 finance teams.",
                },
            },
            {
                "@type": "Question",
                "name": "What does the AI readiness assessment output?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The assessment produces a Viability Score (0–100), Readiness Score (0–100), Risk Index, projected monthly hours saved, estimated cost avoidance, and your Automation Archetype — one of 5 strategic profiles that maps to a tailored automation roadmap.",
                },
            },
            {
                "@type": "Question",
                "name": "Do these tools work for finance teams in Singapore and Hong Kong?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The invoice extractor handles SGD, HKD, and MYR invoices including GST and SST formats. The cost-to-close calculator includes currency options for SGD, HKD, MYR, and USD with region-specific loaded rate defaults. The readiness assessment is used by teams across Singapore, Hong Kong, Malaysia, and Thailand.",
                },
            },
            {
                "@type": "Question",
                "name": "How accurate is the automation savings estimate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The 70% manual hour reduction figure used in the Cost-to-Close Calculator is a conservative industry benchmark from published ROI studies by Netgain, DOKKA, and FloQast. INVARITECH clients in Hong Kong and Singapore typically achieve 75–85% reduction in manual close hours after a full 30-Day Sprint engagement.",
                },
            },
        ],
    },
];

const liveTools = [
    {
        id: "invoice-extractor",
        tags: ["FINANCE", "DOCUMENTS", "AP"],
        name: "Invoice to CSV Extractor",
        description:
            "Upload any invoice or receipt. AI extracts supplier name, date, line items, totals, and tax into a clean CSV. Works with GST, SST, and VAT invoices from Singapore, Malaysia, and Hong Kong.",
        accepts: "PDF · JPG · PNG",
        output: "items.csv + summary.csv",
        time: "< 30 seconds",
        href: "/tools/invoice-extractor/",
        icon: "spreadsheet",
    },
    {
        id: "cost-to-close",
        tags: ["FINANCE", "CLOSE CYCLE", "ROI"],
        name: "Cost-to-Close Calculator",
        description:
            "Enter team size, hours per close, and loaded rate. Get your annual manual tax and savings projection — benchmarked against 100 finance teams across Southeast Asia.",
        accepts: "3 inputs",
        output: "Annual cost + savings",
        time: "Instant",
        href: "/tools/cost-to-close-calculator/",
        icon: "calculator",
    },
    {
        id: "burn-rate-calculator",
        tags: ["FINANCE", "CASH FLOW", "RUNWAY"],
        name: "Cash Runway & Burn Rate Calculator",
        description:
            "Enter cash balance, monthly costs, and revenue. Get net burn rate, runway in months, projected cash at 3/6/12 months, and the dollar cost of your current reporting lag.",
        accepts: "4 inputs",
        output: "Runway · Burn · Projections",
        time: "Instant",
        href: "/tools/burn-rate-calculator/",
        icon: "linechart",
    },
    {
        id: "ai-readiness-assessment",
        tags: ["STRATEGY", "AI READINESS", "ROI"],
        name: "AI Readiness Assessment",
        description:
            "Answer 11 questions about your workflow, data quality, and team structure. Receive a Viability Score, Readiness Score, Risk Index, projected monthly ROI, and your Automation Archetype — one of 5 strategic profiles.",
        accepts: "11 questions",
        output: "Score + archetype + roadmap",
        time: "2–5 minutes",
        href: "/tools/assessment/",
        icon: "gauge",
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

function ToolIcon({ icon }: { icon: string }) {
    if (icon === "calculator") return <Calculator className="h-5 w-5 relative z-10" />;
    if (icon === "gauge") return <Gauge className="h-5 w-5 relative z-10" />;
    if (icon === "linechart") return <LineChart className="h-5 w-5 relative z-10" />;
    return <FileSpreadsheet className="h-5 w-5 relative z-10" />;
}

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-black relative overflow-hidden selection:bg-primary selection:text-black">
            {jsonLd.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            {/* Semantic landmark for crawlers — keyword-rich, sr-only */}
            <div className="sr-only">
                <h1>Free AI Automation Tools for Finance and Operations — No Signup Required</h1>
                <p>
                    INVARITECH provides free AI-powered tools for finance and operations teams in
                    Singapore, Hong Kong, Malaysia, and Thailand. Every tool on this page is a live
                    working example of the automation we deploy for enterprise and mid-market clients.
                    No account required, no credit card, no trial period. Use them now.
                </p>

                <h2>AI Invoice Data Extractor — Free PDF to CSV Converter</h2>
                <p>
                    Our free AI invoice extractor converts PDF, JPG, and PNG invoices into structured
                    CSV data in under 30 seconds. It extracts supplier name, invoice number, document
                    date, currency, line items, quantities, unit prices, line totals, subtotal, tax
                    amount, and grand total. The tool handles GST invoices from Singapore, SST invoices
                    from Malaysia, and VAT invoices from international vendors. It works with messy
                    scanned PDFs, photos of receipts, and digital invoices in multiple formats.
                    Finance teams use it to eliminate manual data entry for accounts payable, speed up
                    invoice processing, and feed data directly into ERP systems like NetSuite, Xero,
                    and SAP. Free. 5 extractions per day. No signup required.
                </p>

                <h2>Month-End Close Cost Calculator — Finance Automation ROI Tool</h2>
                <p>
                    The Cost-to-Close Calculator measures the true annual cost of your manual
                    month-end close cycle — what we call your &quot;manual tax.&quot; Enter your
                    finance team size, average hours spent per close per person, and your loaded
                    hourly cost in SGD, HKD, MYR, or USD. The calculator instantly shows your
                    monthly close cost, annual manual tax, close cycle benchmark versus 100 finance
                    teams (best-in-class is 3 days, industry average is 6–7 days), projected cost
                    after automation (70% reduction in manual hours, per industry benchmarks), and
                    annual savings from finance process automation. Use it to build the business
                    case for month-end close automation, accounts payable automation, or ERP
                    integration projects. Instant results, no signup.
                </p>

                <h2>Cash Runway & Burn Rate Calculator — Free Finance Tool</h2>
                <p>
                    The Cash Runway and Burn Rate Calculator is a free tool for CFOs, controllers,
                    and finance managers who need to know how much runway they have and how much
                    cash movement their reporting lag is hiding. Enter your current cash balance,
                    monthly operating costs, and average monthly revenue in SGD, HKD, MYR, or USD.
                    The calculator instantly shows your net monthly burn rate, cash runway in months,
                    projected cash position at 3, 6, and 12 months, and your reporting lag cost —
                    the dollar value of cash movement that happens before your finance report arrives.
                    The reporting lag metric is the core problem we solve for finance teams in
                    Singapore and Hong Kong: decisions made on data that is 10–15 days old miss
                    the entire window of cash inflows and outflows that occurred since the last close.
                    Free, no signup, instant results.
                </p>

                <h2>AI Automation Readiness Assessment — Free Viability Score and Roadmap</h2>
                <p>
                    The AI Automation Readiness Assessment is a free 4-step diagnostic tool for
                    operations, finance, customer support, sales, and legal teams. Answer 11
                    questions about your workflow type, transaction volume, process maturity, data
                    structure, and executive buy-in. Receive a Viability Score (0–100) measuring
                    your AI automation potential, a Readiness Score (0–100) for organisational
                    readiness, a Risk Index for deployment risk, projected monthly hours saved,
                    estimated monthly cost avoidance, and your Automation Archetype — one of five
                    strategic profiles. Each archetype comes with a personalised automation roadmap
                    and recommended next steps. Used by CFOs, COOs, and operations managers at
                    companies with 50 to 2,000+ employees in Singapore, Hong Kong, Malaysia, and
                    Thailand. Free, no subscription, results in under 5 minutes.
                </p>

                <h2>Frequently Asked Questions</h2>
                <dl>
                    <dt>Is the invoice extractor free?</dt>
                    <dd>
                        Yes. Free with no signup. Up to 5 invoice extractions per day. Supports PDF,
                        JPG, and PNG. Works with GST, SST, and VAT invoice formats.
                    </dd>
                    <dt>What currencies does the close calculator support?</dt>
                    <dd>
                        SGD (Singapore Dollar), HKD (Hong Kong Dollar), MYR (Malaysian Ringgit), and
                        USD. Each currency has region-specific loaded hourly rate defaults.
                    </dd>
                    <dt>How long does the AI readiness assessment take?</dt>
                    <dd>
                        2 to 5 minutes. 11 multiple-choice questions across 4 steps. Results are
                        computed immediately — no waiting for an email.
                    </dd>
                    <dt>Are these tools connected to INVARITECH client deployments?</dt>
                    <dd>
                        Yes. The invoice extractor runs the same document parsing layer we integrate
                        into enterprise AP automation pipelines. The assessment uses the same scoring
                        model our engineers run during client discovery calls.
                    </dd>
                </dl>

                <h2>Free Finance Downloads — No Email Required</h2>
                <p>
                    Three free downloadable PDF resources for finance teams running month-end close.
                    No signup or email required. Download directly.
                </p>
                <ul>
                    <li>
                        3-Day Close Checklist (PDF) — Day-by-day task checklist for running a 3-day
                        month-end close. Includes owner assignment fields and ERP posting confirmation.
                    </li>
                    <li>
                        Bank File Health Check (PDF) — Pre-close audit checklist for bank statement
                        exports. Catches merged cells, date format mismatches, and missing column
                        headers before they stall Day 1 reconciliation.
                    </li>
                    <li>
                        ROI Summary (PDF) — One-page financial model for the automation business case.
                        Shows current close cost calculation and projected return on automation investment.
                    </li>
                </ul>
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
                            Four live tools. Every one is a working slice of what INVARITECH deploys
                            for enterprise clients. Upload files. Run calculations. Score your readiness.
                            No account, no trial, no friction.
                        </p>
                        <Link
                            href="/contact/"
                            className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors whitespace-nowrap group shrink-0"
                        >
                            <span className="w-4 h-px bg-primary/50 group-hover:w-8 transition-all duration-300" />
                            Talk to an engineer
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
                                        <ToolIcon icon={tool.icon} />
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
                                            <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mb-1">
                                                Accepts
                                            </div>
                                            <div className="text-[10px] font-mono text-white/60">
                                                {tool.accepts}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mb-1 flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" /> Speed
                                            </div>
                                            <div className="text-[10px] font-mono text-white/60">
                                                {tool.time}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-mono tracking-widest uppercase text-white/30 mb-1">
                                                Output
                                            </div>
                                            <div className="text-[10px] font-mono text-white/60">
                                                {tool.output}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono tracking-widest uppercase text-primary group-hover:gap-3 transition-all flex items-center gap-2">
                                            TRY IT{" "}
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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

            {/* Free Downloads */}
            <section className="relative z-10 px-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-8 flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-white/10" />
                        Free Downloads — No Email Required
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {[
                            {
                                title: "3-Day Close Checklist",
                                description:
                                    "Day-by-day task checklist for a 3-day close. Assign owners, track sign-off checkpoints, and confirm ERP posting. Print it, share it, run it.",
                                tags: ["FINANCE", "CLOSE CYCLE"],
                                href: "/3-day-close-checklist.pdf",
                                filename: "3-day-close-checklist.pdf",
                            },
                            {
                                title: "Bank File Health Check",
                                description:
                                    "Pre-close audit for your bank statement exports. Catches merged cells, date format mismatches, and missing headers before they stall Day 1 reconciliation.",
                                tags: ["FINANCE", "RECONCILIATION"],
                                href: "/bank-file-health-check.pdf",
                                filename: "bank-file-health-check.pdf",
                            },
                            {
                                title: "ROI Summary",
                                description:
                                    "One-page financial model for the business case. Quantifies your current close cost and projected return on automation. Use it in your next board or finance committee meeting.",
                                tags: ["FINANCE", "ROI"],
                                href: "/roi-summary.pdf",
                                filename: "roi-summary.pdf",
                            },
                        ].map((doc) => (
                            <a
                                key={doc.title}
                                href={doc.href}
                                download={doc.filename}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 p-8 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/15 transition-all duration-500" />

                                <div className="flex gap-2 flex-wrap mb-8">
                                    {doc.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[9px] font-mono tracking-widest uppercase text-white/25 border border-white/10 px-2 py-0.5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/25 border border-white/10 px-2 py-0.5 ml-auto">
                                        PDF
                                    </span>
                                </div>

                                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-white/8 bg-black/50 text-white/40 group-hover:text-white/70 transition-colors">
                                    <Download className="h-5 w-5" />
                                </div>

                                <h3 className="text-xl font-bold tracking-tight text-white/60 group-hover:text-white/90 transition-colors mb-3">
                                    {doc.title}
                                </h3>
                                <p className="text-sm text-white/25 group-hover:text-white/40 leading-relaxed transition-colors">
                                    {doc.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-[9px] font-mono tracking-widest uppercase text-white/25 group-hover:text-white/50 transition-colors">
                                    <Download className="w-2.5 h-2.5" />
                                    DOWNLOAD PDF
                                </div>
                            </a>
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
                                THESE ARE DEMOS.
                                <br />
                                <span className="text-white/30">WE DEPLOY THE REAL THING.</span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                                Each tool here runs the same AI stack we deploy for enterprise clients
                                across Singapore, Hong Kong, Malaysia, and Thailand — connected to their
                                ERP, running at volume, with full governance and audit trails.
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
