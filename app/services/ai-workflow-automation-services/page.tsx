import { Metadata } from "next";
import WorkflowClient from "./workflow-client";

export const metadata: Metadata = {
    title: "AI Workflow Automation Services | High-Governance Workflow Automation Consulting",
    description: "Move from manual sprawl to audited pipelines. We deliver AI workflow automation services built for scale: deterministic fallbacks, human-in-the-loop approvals, and measurable ROI.",
    keywords: ["workflow automation consulting", "ai workflow automation services", "intelligent process automation", "operational liquidity", "business process automation"],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-workflow-automation-services/",
    },
};

export default function AIWorkflowAutomationPage() {
    return <WorkflowClient />;
}
