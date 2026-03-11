import { Metadata } from "next";
import IntegrationClient from "./integration-client";
import { integrationFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Integration Services for Enterprise Systems",
    description: "Connect generative AI to your ERP, CRM, and legacy systems through a governed integration layer. Model-agnostic, with audit logs, RBAC, and fallback routing. For enterprise teams across APAC.",
    keywords: [
        "ai integration services",
        "ai integration consulting services",
        "ai system integration services",
        "enterprise ai integration services",
        "ai integration services for businesses",
        "generative ai integration services",
        "gen ai integration services",
        "ai agent integration services",
        "ai tool integration services",
        "integration services for ai tools",
        "model-agnostic ai integration",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-integration-services/",
    },
    openGraph: {
        title: "AI Integration Services for Enterprise Systems | INVARITECH",
        description:
            "Connect generative AI to your ERP, CRM, and legacy systems through a governed integration layer. Model-agnostic, with audit logs, RBAC, and fallback routing.",
        url: "https://www.invaritech.ai/services/ai-integration-services/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Integration Services — INVARITECH" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Integration Services for Enterprise Systems | INVARITECH",
        description:
            "Governed integration gateway connecting AI to ERP, CRM, and legacy systems. Model-agnostic, RBAC-controlled, and audit-logged.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", name: "Invaritech", url: BASE };

export default function AIIntegrationServicesPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
                { "@type": "ListItem", position: 3, name: "AI Integration Services", item: `${BASE}/services/ai-integration-services/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Integration Services",
            description: "Connect AI to ERP, CRM, and legacy systems via a governed integration gateway. Model-agnostic, idempotent, and audit-logged for enterprise compliance.",
            url: `${BASE}/services/ai-integration-services/`,
            provider: ORG,
            areaServed: "Worldwide",
            serviceType: "Enterprise AI System Integration",
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: integrationFaqs.map((faq) => ({
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
            <IntegrationClient />
        </>
    );
}
