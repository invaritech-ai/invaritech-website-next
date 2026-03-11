import { Metadata } from "next";
import BackendClient from "./backend-client";
import { backendFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "Generative AI Backend Development Services",
    description: "Turn GenAI prototypes into production backends with evaluation harnesses, prompt versioning, cost controls, and observability. For engineering teams building AI-native products across APAC.",
    keywords: [
        "generative ai development services",
        "ai software development services",
        "ai engineering services",
        "ai ml development services",
        "ai/ml development services",
        "ai and ml development services",
        "ai development services",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/generative-ai-backend-development/",
    },
    openGraph: {
        title: "Generative AI Backend Development Services | INVARITECH",
        description:
            "Turn GenAI prototypes into production backends with evaluation harnesses, prompt versioning, cost controls, and observability.",
        url: "https://www.invaritech.ai/services/generative-ai-backend-development/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Generative AI Backend Development — INVARITECH" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Generative AI Backend Development Services | INVARITECH",
        description:
            "GenAI backends with evaluation harnesses, observability, prompt versioning, and cost controls. Prototype to production.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", name: "Invaritech", url: BASE };

export default function GenAIBackendPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
                { "@type": "ListItem", position: 3, name: "Generative AI Development Services", item: `${BASE}/services/generative-ai-backend-development/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Generative AI Backend Development Services",
            description: "Production GenAI backends with orchestration, evaluation harnesses, observability, prompt versioning, latency control, and safe deployment patterns.",
            url: `${BASE}/services/generative-ai-backend-development/`,
            provider: ORG,
            areaServed: "Worldwide",
            serviceType: "Generative AI Backend Development",
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: backendFaqs.map((faq) => ({
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
            <BackendClient />
        </>
    );
}
