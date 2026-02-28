import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "AI Automation Readiness Assessment — Free ROI Calculator | INVARITECH",
    description:
        "Score your workflow's AI automation potential in 2 minutes. Get a Viability Score, Readiness Score, Risk Index, and projected monthly ROI — free, no subscription.",
    keywords: [
        "AI automation readiness assessment",
        "AI ROI calculator",
        "enterprise AI feasibility tool",
        "AI workflow automation readiness",
        "AI implementation readiness",
        "automation viability score",
    ],
    openGraph: {
        title: "AI Automation Readiness Assessment — Free ROI Calculator | INVARITECH",
        description:
            "Score your workflow's AI automation potential in 2 minutes. Viability, Readiness, and Risk scores plus projected ROI — free for enterprise and mid-market teams.",
        url: "https://www.invaritech.ai/assessment/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AI Automation Readiness Assessment | INVARITECH",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/assessment/",
    },
};

export default function AssessmentLayout({
    children,
}: {
    children: ReactNode;
}) {
    return children;
}
