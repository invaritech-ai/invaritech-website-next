import { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CostToCloseCalculator } from "@/components/tools/CostToCloseCalculator";

export const metadata: Metadata = {
    title: "Free Month-End Close Cost Calculator | INVARITECH",
    description:
        "Calculate your annual month-end close cost in 30 seconds. Enter team size, hours per close, and loaded hourly rate to see your hidden manual cost and projected savings.",
    keywords: [
        "month end close cost calculator",
        "finance automation ROI calculator",
        "close cycle cost",
        "month end close automation savings",
        "manual tax calculator",
        "finance team ROI",
        "AP automation ROI",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/resources/cost-to-close-calculator/",
    },
    openGraph: {
        title: "Free Month-End Close Cost Calculator — INVARITECH",
        description:
            "How much is your manual close cycle costing you? Enter 3 numbers and see your annual manual cost and savings from automation.",
        url: "https://www.invaritech.ai/resources/cost-to-close-calculator/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Month-End Close Cost Calculator — INVARITECH",
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
        "Calculate your annual month-end close cost and see your savings potential from automation.",
    url: "https://www.invaritech.ai/resources/cost-to-close-calculator/",
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
        "Calculate monthly and annual close cost",
        "Benchmark your close cycle against industry data",
        "See projected savings from automation",
        "No signup required",
    ],
};

export default function CostToCloseCalculatorPage() {
    return (
        <ToolPageShell
            breadcrumb="Cost-to-Close Calculator"
            eyebrow="LIVE TOOL // FINANCE"
            titleParts={["Cost-to-Close", "Calculator"]}
            description="Three inputs. Instant result. See exactly how much your current close cycle costs and how much automation saves."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="WHAT THIS DEMONSTRATES"
            footerText="This calculator uses the same cost model we run during control scoping. The 70% reduction figure is conservative — finance teams typically see 75–85% in manual hour reduction after automating exception handling and approval workflows."
            footerLink={{
                href: "/blog/month-end-close-automation/",
                label: "Read: How to Cut Your Close from 10 Days to 3",
            }}
        >
            <CostToCloseCalculator />
        </ToolPageShell>
    );
}
