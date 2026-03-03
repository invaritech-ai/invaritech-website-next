import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export const metadata: Metadata = {
    title: "Free AI Automation Readiness Assessment — Viability Score, Archetype & Roadmap | INVARITECH",
    description:
        "Take our free AI automation readiness assessment. Answer 11 questions about your workflow, data, and team. Get a Viability Score, Readiness Score, Risk Index, projected monthly hours saved, and your Automation Archetype in under 5 minutes.",
    keywords: [
        "AI automation readiness assessment",
        "AI readiness assessment free",
        "AI automation viability score",
        "automation readiness test",
        "business automation assessment",
        "AI ROI assessment",
        "workflow automation readiness",
        "AI automation potential score",
        "automation archetype",
        "AI readiness calculator",
        "finance automation readiness",
        "operations automation assessment",
        "AI implementation readiness",
        "free AI assessment tool",
        "AI readiness Singapore",
        "AI readiness Hong Kong",
        "automation ROI calculator free",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/tools/assessment/",
    },
    openGraph: {
        title: "Free AI Automation Readiness Assessment | INVARITECH",
        description:
            "11 questions. Under 5 minutes. Get your Viability Score, Readiness Score, Risk Index, and a personalised automation roadmap. No signup required.",
        url: "https://www.invaritech.ai/tools/assessment/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free AI Automation Readiness Assessment — INVARITECH",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free AI Readiness Assessment — Viability Score + Archetype",
        description:
            "11 questions. Get your AI automation viability score, risk index, and personalised roadmap. Free, no signup.",
        images: ["/og-image.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Automation Readiness Assessment",
    description:
        "Free 4-step tool to assess your organization's AI automation readiness. Score your workflow viability, operational readiness, and risk index. Receive an ROI projection and your Automation Archetype in under 2 minutes.",
    url: "https://www.invaritech.ai/tools/assessment/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
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
        "AI Automation Viability Score",
        "Operational Readiness Assessment",
        "Risk Index Calculation",
        "Projected Monthly Hours Saved",
        "Cost Avoidance Projection",
        "Automation Archetype Classification",
    ],
};

export default function AssessmentPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-black selection:bg-primary selection:text-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb — fixed overlay, same style as ToolPageShell breadcrumb */}
            <div className="fixed top-[88px] left-0 right-0 z-50 px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <Link
                            href="/tools/"
                            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            All Tools
                        </Link>
                        <span className="text-white/15 font-mono text-[10px]">/</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                            AI Readiness Assessment
                        </span>
                    </div>
                </div>
            </div>

            {/* SEO-visible content (crawlable, visually hidden) */}
            <div className="sr-only">
                <h1>AI Automation Readiness Assessment — Free ROI Calculator</h1>
                <p>
                    Discover your organization&apos;s AI automation potential with our free
                    readiness assessment. Answer 4 short questions to receive a Viability
                    Score, Readiness Score, Risk Index, and projected monthly ROI — including
                    estimated hours saved and cost avoidance based on your workflow type and
                    volume.
                </p>
                <p>
                    Used by operations, finance, support, and sales teams at mid-market and
                    enterprise companies to identify their highest-ROI automation wedge before
                    committing to a build. No subscription required. Results in under 2 minutes.
                </p>
                <ul>
                    <li>AI Automation Viability Score (0–100)</li>
                    <li>Operational Readiness Assessment (0–100)</li>
                    <li>Risk Index for AI deployment</li>
                    <li>Projected monthly hours saved</li>
                    <li>Estimated cost avoidance per month</li>
                    <li>Automation Archetype: one of 5 strategic profiles</li>
                </ul>
                <p>
                    The assessment covers your primary business function — operations, finance,
                    customer support, sales, marketing, legal, or HR — and calibrates outputs
                    to your workflow volume and data quality. Results are calculated immediately
                    in your browser with no email required. Ideal for department leads and
                    operations managers at mid-market companies in Singapore, Hong Kong, and
                    Southeast Asia evaluating AI automation investments.
                </p>
            </div>

            <AssessmentWizard />
        </main>
    );
}
