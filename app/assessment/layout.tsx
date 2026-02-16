import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Ops Efficiency Assessment - Score Your Workflow ROI",
    description:
        "Get your Ops Efficiency Score in minutes. Estimate hours saved, cost avoided, and the highest-ROI automation lane for your team.",
    openGraph: {
        title: "Ops Efficiency Assessment - Score Your Workflow ROI | INVARITECH",
        description:
            "Get your Ops Efficiency Score in minutes. Estimate hours saved, cost avoided, and the highest-ROI automation lane for your team.",
        url: "https://www.invaritech.ai/assessment/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Ops Efficiency Assessment | INVARITECH",
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
