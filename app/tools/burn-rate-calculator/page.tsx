import { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { BurnRateCalculator } from "@/components/tools/BurnRateCalculator";

export const metadata: Metadata = {
    title: "Free Cash Runway & Burn Rate Calculator | INVARITECH Tools",
    description:
        "Enter your cash balance, monthly costs, and revenue. Get your net burn rate, cash runway in months, projected cash at 3/6/12 months, and the dollar value of your current reporting lag. Free, instant, no signup.",
    keywords: [
        "burn rate calculator",
        "cash runway calculator",
        "monthly burn rate",
        "cash flow calculator",
        "cash position calculator",
        "startup runway calculator",
        "finance automation tool",
        "cash flow visibility",
        "rolling forecast calculator",
        "cash burn calculator free",
        "net burn rate calculator",
        "cash runway months",
        "how long will my cash last",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/tools/burn-rate-calculator/",
    },
    openGraph: {
        title: "Free Cash Runway & Burn Rate Calculator — INVARITECH Tools",
        description:
            "How many months of runway do you have? Enter 3 numbers and see your burn rate, runway, 12-month cash projection, and reporting lag cost. Free, no signup.",
        url: "https://www.invaritech.ai/tools/burn-rate-calculator/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Cash Runway & Burn Rate Calculator — INVARITECH Tools",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Cash Runway & Burn Rate Calculator",
        description:
            "3 inputs. Instant result. See your burn rate, runway in months, and the cost of your reporting lag.",
        images: ["/og-image.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cash Runway & Burn Rate Calculator",
    description:
        "Free calculator for net monthly burn rate, cash runway in months, projected cash position at 3, 6, and 12 months, and reporting lag cost. Supports SGD, HKD, MYR, and USD. No signup required.",
    url: "https://www.invaritech.ai/tools/burn-rate-calculator/",
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
        "Net monthly burn rate calculation",
        "Cash runway in months",
        "Projected cash at 3, 6, and 12 months",
        "Reporting lag cost — dollar value of decisions made on stale data",
        "Cash positive vs. burn mode classification",
        "Supports SGD, HKD, MYR, USD",
        "No signup required",
    ],
};

export default function BurnRateCalculatorPage() {
    return (
        <ToolPageShell
            breadcrumb="Burn Rate Calculator"
            eyebrow="LIVE TOOL // FINANCE"
            titleParts={["Cash Runway &", "Burn Rate Calculator"]}
            description="Enter your cash balance, monthly operating costs, and average monthly revenue. Get your net burn rate, runway in months, projected cash at 3/6/12 months, and the dollar cost of your current reporting lag."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="WHAT THIS DEMONSTRATES"
            footerText="The reporting lag metric in this calculator is the core problem we solve for finance teams in Singapore and Hong Kong. If decisions are being made on data that is 10–15 days old, the fix is not faster reporting — it is automated cash visibility: continuous pulls from ERP, bank feeds, and payroll connected into a rolling 13-week forecast that updates without a human trigger."
            footerLink={{
                href: "/blog/cash-flow-visibility-automation/",
                label: "Read: Cash Flow Visibility Automation",
            }}
        >
            <BurnRateCalculator />
        </ToolPageShell>
    );
}
