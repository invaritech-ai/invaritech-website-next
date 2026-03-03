import { Metadata } from "next";
import IntegrationClient from "./integration-client";
import { integrationFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Integration Services | Generative AI System Integration (Model-Agnostic)",
    description: "Generative AI integration services for enterprises. We build a governed integration layer (custom gateway) to connect AI to ERP/CRM/legacy systems with idempotency, audit logs, RBAC, fallbacks, and deployment flexibility.",
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
