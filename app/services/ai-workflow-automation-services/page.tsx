import { Metadata } from "next";
import WorkflowClient from "./workflow-client";

// export const metadata: Metadata = {
//     title: "Workflow Automation Consulting Services | AI Workflow Automation Services",
//     description: "Move from manual sprawl to audited pipelines. We deliver AI workflow automation services built for scale: deterministic fallbacks, human-in-the-loop approvals, and measurable ROI.",
//     keywords: [
//         "workflow automation consulting",
//         "workflow automation consulting services",
//         "ai workflow automation services",
//         "ai workflow automation consulting",
//         "business process automation services",
//         "intelligent process automation services",
//         "process automation services",
//         "intelligent process automation",
//         "business process automation",
//     ],
//     alternates: {
//         canonical: "https://www.invaritech.ai/services/ai-workflow-automation-services/",
//     },
// };

export const metadata: Metadata = {
    title: "Workflow Automation Consulting | Ship in 6 Weeks | Invaritech",
    description:
        "Stop building from scratch. We deliver AI workflow automation pipelines built for scale, featuring deterministic fallbacks and human-in-the-loop approvals.",
    keywords: [
        "workflow automation consulting",
        "ai workflow automation services",
        "business process automation",
        "intelligent process automation",
        "drop-in ai backend",
    ],
    alternates: {
        canonical:
            "https://www.invaritech.ai/services/ai-workflow-automation-services/",
    },
};

export default function AIWorkflowAutomationPage() {
    return <WorkflowClient />;
}
