import { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
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
        <ToolPageShell
            breadcrumb="Cost-to-Close Calculator"
            eyebrow="LIVE TOOL // FINANCE"
            titleParts={["Cost-to-Close", "Calculator"]}
            description="Three inputs. Instant result. See exactly how much your current close cycle costs and how much automation saves — benchmarked against 100 finance teams across Southeast Asia."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="WHAT THIS DEMONSTRATES"
            footerText="This calculator uses the same cost model we run for clients during our AI readiness assessments. The 70% reduction figure is conservative — clients in Hong Kong and Singapore typically see 75–85% in manual hour reduction after a full 30-Day Sprint."
            footerLink={{
                href: "/blog/month-end-close-automation/",
                label: "Read: How to Cut Your Close from 10 Days to 3",
            }}
        >
            <CostToCloseCalculator />
        </ToolPageShell>
    );
}
