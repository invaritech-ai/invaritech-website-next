import { Metadata } from "next";
import ConsultingClient from "./consulting-client";
import { consultingFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Automation Consulting | Production-Ready Execution",
    description: "AI automation consulting for leadership teams who need clarity before committing capital. We rank ROI wedges, define governance boundaries, and deliver a build-ready execution plan your team can run.",
    keywords: [
        "ai automation consulting",
        "ai automation consulting services",
        "ai automation consulting firms",
        "ai automation consulting companies",
        "ai automation consulting for businesses",
        "ai and automation consulting",
        "ai infrastructure automation consulting",
        "ai process automation consulting",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-automation-consulting/",
    },
};

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", name: "Invaritech", url: BASE };

export default function AIConsultingPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
                { "@type": "ListItem", position: 3, name: "AI Automation Consulting", item: `${BASE}/services/ai-automation-consulting/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Automation Consulting Services",
            description: "Delivery-first AI automation consulting. We rank ROI wedges, define governance requirements, and hand off a build-ready specification — not a strategy deck.",
            url: `${BASE}/services/ai-automation-consulting/`,
            provider: ORG,
            areaServed: "Worldwide",
            serviceType: "AI Automation Consulting",
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: consultingFaqs.map((faq) => ({
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
            <ConsultingClient />
        </>
    );
}
