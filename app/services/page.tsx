import { Metadata } from "next";
import ServicesClient from "./services-client";
import { servicesFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Automation & Integration Services | 30-Day Sprint",
    description:
        "Build production-grade AI on the infrastructure you already own. Start with a 30-day Sprint, then scale via workflow automation, integrations, enterprise chatbots, and GenAI backend engineering.",
    openGraph: {
        title: "AI Automation & Integration Services | 30-Day Sprint | INVARITECH",
        description:
            "Build production-grade AI on the infrastructure you already own. Start with a 30-day Sprint, then scale via workflow automation, integrations, enterprise chatbots, and GenAI backend engineering.",
        url: "https://www.invaritech.ai/services/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AI Automation & Integration Services",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/",
    },
};

const BASE = "https://www.invaritech.ai";
const ORG = { "@type": "Organization", "name": "Invaritech", "url": BASE };

export default function ServicesPage() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/services/` },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: servicesFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Invaritech",
            url: BASE,
            description:
                "Production-grade AI automation and integration services. 30-day Sprint, workflow automation, AI integrations, enterprise chatbots, and GenAI backend engineering.",
            founder: [
                { "@type": "Person", name: "Avishek Majumder", jobTitle: "Co-founder & CEO" },
                { "@type": "Person", name: "Aditi Garg", jobTitle: "Director & Founder" },
            ],
            areaServed: "Worldwide",
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServicesClient />
        </>
    );
}
