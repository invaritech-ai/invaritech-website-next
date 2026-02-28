import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Automation Readiness Assessment",
    "description":
        "Free 4-step tool to assess your organization's AI automation readiness. Score your workflow viability, operational readiness, and risk index. Receive an ROI projection and your Automation Archetype in under 2 minutes.",
    "url": "https://www.invaritech.ai/assessment/",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
    },
    "provider": {
        "@type": "Organization",
        "name": "INVARITECH",
        "url": "https://www.invaritech.ai",
    },
    "featureList": [
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
            {/* Structured data for Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/*
              Semantic landmark for crawlers. These headings and the feature list are
              immediately available in static HTML — no JS required.
              Visually, the wizard's own intro screen is the first thing users see.
            */}
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
            </div>

            <AssessmentWizard />
        </main>
    );
}
