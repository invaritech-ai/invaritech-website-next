import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { CostToCloseCalculator } from "@/components/tools/CostToCloseCalculator";

export const metadata: Metadata = {
    title: "Free Month-End Close Cost Calculator | INVARITECH Tools",
    description:
        "Calculate your annual month-end close cost in 30 seconds. Enter team size, hours per close, and loaded hourly rate. See your hidden manual tax and projected savings from automation.",
    keywords: [
        "month end close cost calculator",
        "finance automation ROI calculator",
        "close cycle cost",
        "month end close automation savings",
        "manual tax calculator",
        "finance team ROI",
        "close cycle benchmarks",
        "AP automation ROI",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/tools/cost-to-close-calculator/",
    },
    openGraph: {
        title: "Free Month-End Close Cost Calculator — INVARITECH Tools",
        description:
            "How much is your manual close cycle costing you? Enter 3 numbers and see your annual manual tax and savings from automation.",
        url: "https://www.invaritech.ai/tools/cost-to-close-calculator/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Month-End Close Cost Calculator — INVARITECH Tools",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Month-End Close Cost Calculator",
        description:
            "3 inputs. Instant result. See your annual close cost and savings from automation.",
        images: ["/og-image.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Month-End Close Cost Calculator",
    description:
        "Calculate your annual month-end close cost and see your savings potential from automation. Benchmarks based on industry data from 100 finance professionals.",
    url: "https://www.invaritech.ai/tools/cost-to-close-calculator/",
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
        "Calculate monthly and annual close cost",
        "Benchmark your close cycle against industry data",
        "See projected savings from automation",
        "Supports SGD, HKD, MYR, USD",
        "No signup required",
    ],
};

export default function CostToCloseCalculatorPage() {
    return (
        <main className="min-h-screen bg-[#030305] relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArtisticBackground />

            <div className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-10">
                        <Link
                            href="/tools/"
                            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            All Tools
                        </Link>
                        <span className="text-white/15 font-mono text-[10px]">/</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                            Cost-to-Close Calculator
                        </span>
                    </div>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                LIVE TOOL // FINANCE
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white mb-6">
                            Cost-to-Close{" "}
                            <span className="text-primary">Calculator</span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Three inputs. Instant result. See exactly how much your current close
                            cycle costs and how much automation saves — benchmarked against 100
                            finance teams across Southeast Asia.
                        </p>
                    </header>

                    {/* Tool */}
                    <CostToCloseCalculator />

                    {/* Footer context */}
                    <div className="mt-20 pt-12 border-t border-white/10">
                        <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-4">
                            WHAT THIS DEMONSTRATES
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xl mb-8">
                            This calculator uses the same cost model we run for clients during our
                            AI readiness assessments. The 70% reduction figure is conservative —
                            clients in Hong Kong and Singapore typically see 75–85% in manual hour
                            reduction after a full 30-Day Sprint.
                        </p>
                        <Link
                            href="/blog/month-end-close-automation/"
                            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors"
                        >
                            <ArrowRight className="w-3 h-3" />
                            Read: How to Cut Your Close from 10 Days to 3
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
