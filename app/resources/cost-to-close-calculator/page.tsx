import { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CostToCloseCalculator } from "@/components/tools/CostToCloseCalculator";

export const metadata: Metadata = {
    title: "Month-End Close Cost Calculator",
    description:
        "Calculate the annual cost of manual month-end close work, reconciliation, approval delays, and finance team review time in 30 seconds.",
    keywords: [
        "month end close cost calculator",
        "finance automation ROI calculator",
        "close cycle cost",
        "month end close automation savings",
        "manual tax calculator",
        "finance team ROI",
        "AP automation ROI",
        "finance workflow automation",
        "approval workflow cost",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/resources/cost-to-close-calculator/",
    },
    openGraph: {
        title: "Free Month-End Close Cost Calculator for Finance Teams",
        description:
            "Enter 3 numbers to estimate the annual cost of manual close work, reconciliation, approval delays, and finance team review time.",
        url: "https://www.invaritech.ai/resources/cost-to-close-calculator/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Month-End Close Cost Calculator | INVARITECH",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Month-End Close Cost Calculator for Finance Teams",
        description:
            "Estimate your annual manual close cost in 30 seconds.",
        images: ["/og-image.png"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Month-End Close Cost Calculator",
    description:
        "Calculate the annual cost of manual month-end close work, reconciliation, approval delays, and finance team review time.",
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
        "Estimate time and cost tied to manual finance workflows",
        "No signup required",
    ],
};

export default function CostToCloseCalculatorPage() {
    return (
        <ToolPageShell
            breadcrumb="Cost-to-Close Calculator"
            eyebrow="Live Tool"
            titleParts={["Cost-to-Close", "Calculator"]}
            description="Three inputs. Instant result. Estimate what month-end close, reconciliation, and approval follow-up cost your finance team each year."
            maxWidth="4xl"
            jsonLd={jsonLd}
            footerLabel="Where this fits"
            footerText="This calculator is a first-pass model. In a control sprint, we replace broad estimates with your actual close steps, exception queues, approval checks, and evidence requirements before recommending what should be automated or left alone."
            footerLink={{
                href: "/blog/month-end-close-automation/",
                label: "Read the close automation guide",
            }}
        >
            <CostToCloseCalculator />
            <section className="mt-16 border-t border-border pt-12">
                <div className="grid gap-5 border border-border bg-card p-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <p className="site-meta text-primary">Finance automation context</p>
                        <h2 className="site-h3 mt-4">Close cost is one signal, not the whole automation case.</h2>
                        <p className="site-body mt-3 max-w-3xl">
                            Use the broader finance automation pillar to connect month-end close
                            work with invoice exceptions, approval evidence, payment controls, and
                            accounting-system handoffs.
                        </p>
                    </div>
                    <Link href="/finance-automation/" className="site-button-secondary">
                        View the finance automation pillar
                    </Link>
                </div>
            </section>
        </ToolPageShell>
    );
}
