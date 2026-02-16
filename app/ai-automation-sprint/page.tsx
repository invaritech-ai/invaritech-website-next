import { Metadata } from "next";
import SprintMarketingPage from "../ops-efficiency-sprint/sprint-page";

export const metadata: Metadata = {
    title: "30-Day Drop-In AI Automation Sprint",
    description:
        "In 30 days, get one production-grade AI automation running on top of your existing systems with measurable before/after impact. No migration. No lock-in. No disruption.",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-automation-sprint/",
    },
};

export default function AIAutomationSprintPage() {
    return <SprintMarketingPage />;
}

