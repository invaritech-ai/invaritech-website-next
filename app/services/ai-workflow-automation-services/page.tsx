import { Metadata } from "next";
import WorkflowClient from "./workflow-client";
import { workflowFaqs } from "@/lib/service-faqs";

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

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", name: "Invaritech", url: BASE };

export default function AIWorkflowAutomationPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
                { "@type": "ListItem", position: 3, name: "Workflow Automation Consulting", item: `${BASE}/services/ai-workflow-automation-services/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Workflow Automation Services",
            description: "Govern and automate mission-critical business workflows with AI. Audited pipelines, deterministic fallbacks, and human-in-the-loop approvals built into every flow.",
            url: `${BASE}/services/ai-workflow-automation-services/`,
            provider: ORG,
            areaServed: "Worldwide",
            serviceType: "AI Workflow Automation",
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: workflowFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WorkflowClient />
        </>
    );
}
