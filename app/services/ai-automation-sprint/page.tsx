import { Metadata } from "next";
import SprintClient from "./sprint-client";
import { sprintFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Automation Sprint — Production in 30 Days",
    description: "Go from AI prototype to production in 30 days. Fixed-scope sprint with discovery workshop, guardrails, audit logs, and measurable before/after impact. For ops and finance teams across APAC.",
    keywords: [
        "ai poc development services",
        "ai proof of concept development services",
        "ai pilot project development",
        "ai readiness assessment service",
        "ai discovery workshop",
        "ai strategy workshop",
        "ai feasibility study",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-automation-sprint/",
    },
    openGraph: {
        title: "AI Automation Sprint — Production in 30 Days | INVARITECH",
        description:
            "Go from AI prototype to production in 30 days. Fixed-scope sprint with discovery workshop, guardrails, audit logs, and measurable before/after impact.",
        url: "https://www.invaritech.ai/services/ai-automation-sprint/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Automation Sprint — INVARITECH" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Automation Sprint — Production in 30 Days | INVARITECH",
        description:
            "Fixed-scope 30-day sprint. One workflow, measurable baseline delta, no 6-month retainers. For ops and finance teams across APAC.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", name: "Invaritech", url: BASE };

export default function AIAutomationSprintPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
                { "@type": "ListItem", position: 3, name: "AI PoC Development Sprint", item: `${BASE}/services/ai-automation-sprint/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI PoC Development Services — 30-Day Sprint",
            description: "Ship one governed AI proof of concept in 30 days. Includes discovery workshop, readiness assessment, guardrails, audit logs, and a measurable baseline delta.",
            url: `${BASE}/services/ai-automation-sprint/`,
            provider: ORG,
            areaServed: "Worldwide",
            serviceType: "AI Proof of Concept Development",
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: sprintFaqs.map((faq) => ({
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
            <SprintClient />
        </>
    );
}
