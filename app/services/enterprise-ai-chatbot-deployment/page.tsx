import { Metadata } from "next";
import ChatbotClient from "./chatbot-client";
import { chatbotFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Chatbot Development Services | Enterprise Deployment (Governed & Multilingual)",
    description: "AI chatbot development services for enterprises that need governance. Deploy a controlled enterprise AI chatbot solution with RBAC/ABAC, audit logs, citations, tool boundaries, and multilingual support.",
    keywords: [
        "ai chatbot development services",
        "enterprise ai chatbot development",
        "generative ai chatbot development",
        "ai chatbot for business website",
        "cantonese ai chatbot for website",
        "mandarin ai chatbot development",
        "bahasa ai chatbot development",
        "ai agent development services",
        "custom chatbot development services",
        "multilingual ai chatbot development",
        "enterprise ai chatbot solution",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/enterprise-ai-chatbot-deployment/",
    },
    openGraph: {
        title: "Enterprise AI Chatbot Development | Governed & Multilingual | INVARITECH",
        description:
            "Governed enterprise AI chatbots with RBAC/ABAC, audit trails, Cantonese/Mandarin/Bahasa support, and bounded tool access. Deployed inside your existing systems.",
        url: "https://www.invaritech.ai/services/enterprise-ai-chatbot-deployment/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Enterprise AI Chatbot Development — INVARITECH" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Enterprise AI Chatbot Development | INVARITECH",
        description:
            "Governed enterprise chatbots: RBAC/ABAC, audit trails, Cantonese/Mandarin/Bahasa support. Deployed inside your existing infrastructure.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", name: "Invaritech", url: BASE };

export default function AIChatbotDeploymentPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
                { "@type": "ListItem", position: 3, name: "AI Chatbot Development Services", item: `${BASE}/services/enterprise-ai-chatbot-deployment/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Chatbot Development Services",
            description: "Governed enterprise AI chatbots with RBAC/ABAC, audit trails, multilingual support, and bounded tool access. Deployed inside your existing systems.",
            url: `${BASE}/services/enterprise-ai-chatbot-deployment/`,
            provider: ORG,
            areaServed: "Worldwide",
            serviceType: "Enterprise AI Chatbot Development",
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: chatbotFaqs.map((faq) => ({
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
            <ChatbotClient />
        </>
    );
}
