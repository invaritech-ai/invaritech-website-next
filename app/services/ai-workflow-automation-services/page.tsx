import { Metadata } from "next";
import WorkflowClient from "./workflow-client";
import { workflowFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "Workflow Automation Consulting | Ship in 6 Weeks | Invaritech",
    description:
        "Workflow automation consulting for finance and ops teams. One workflow, 30 days, fixed price. Deployed to production, not delivered as a deck.",
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
        title: "Workflow Automation Consulting | INVARITECH",
        description:
            "Custom workflow automation pipelines for finance teams — deterministic fallbacks, human-in-the-loop approvals, and full audit trails. Delivered in 6 weeks.",
        url: "https://www.invaritech.ai/services/ai-workflow-automation-services/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Workflow Automation Consulting — INVARITECH" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Workflow Automation Consulting | INVARITECH",
        description: "Custom finance automation pipelines with deterministic fallbacks and audit trails. Built in 6 weeks, not 6 months.",
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
