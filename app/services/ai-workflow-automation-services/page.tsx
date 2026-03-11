import { Metadata } from "next";
import WorkflowClient from "./workflow-client";
import { workflowFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "Workflow Automation Services for Enterprise Ops",
    description:
        "Workflow automation for finance and operations teams. One workflow scoped, built, and deployed to production — fixed price. Serving teams in Singapore, Hong Kong, Malaysia, and the Philippines.",
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
    openGraph: {
        title: "Workflow Automation Services for Enterprise Ops | INVARITECH",
        description:
            "Custom workflow automation pipelines for finance and ops teams — deterministic fallbacks, human-in-the-loop approvals, and full audit trails. Deployed to production, fixed price.",
        url: "https://www.invaritech.ai/services/ai-workflow-automation-services/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Workflow Automation Consulting — INVARITECH" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Workflow Automation Services for Enterprise Ops | INVARITECH",
        description: "Custom workflow automation pipelines for finance and ops teams. Deterministic fallbacks, audit trails, deployed to production.",
        images: ["/og-image.png"],
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
