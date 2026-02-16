import { Metadata } from "next";
import SprintMarketingPage from "./sprint-page";

// Legacy URL: keep accessible for existing links, but prevent indexing.
export const metadata: Metadata = {
    title: "30-Day Drop-In AI Automation Sprint",
    description:
        "In 30 days, get one production-grade AI automation running on top of your existing systems with measurable before/after impact. No migration. No lock-in. No disruption.",
    keywords: [
        "30-day AI automation sprint",
        "enterprise AI automation",
        "drop-in AI",
        "workflow automation",
        "ERP CRM automation",
    ],
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-automation-sprint/",
    },
};

export default function OpsEfficiencySprintAliasPage() {
    return <SprintMarketingPage />;
}

