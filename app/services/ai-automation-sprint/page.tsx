import { Metadata } from "next";
import SprintClient from "./sprint-client";

export const metadata: Metadata = {
    title: "AI Automation Sprint | AI PoC Development Services in 30 Days",
    description: "AI PoC development services to move from prototype to production in 30 days. Includes AI discovery workshop, readiness assessment, guardrails, audit logs, and measurable impact.",
    keywords: ["ai poc development services", "ai proof of concept development services", "ai pilot project development", "ai readiness assessment service", "ai discovery workshop", "ai strategy workshop"],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-automation-sprint/",
    },
};

export default function AIAutomationSprintPage() {
    return <SprintClient />;
}
