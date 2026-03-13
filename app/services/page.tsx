import { Metadata } from "next";
import ServicesClient from "./services-client";
import { servicesFaqs } from "@/lib/service-faqs";

export const metadata: Metadata = {
    title: "AI Automation & Integration Services | 30-Day Delivery",
    description:
        "Enterprise AI automation services for teams in Singapore, Hong Kong, Malaysia, and the Philippines. One production-grade automation, deployed in 30 days. Book a scoping call.",
    openGraph: {
        title: "AI Automation & Integration Services | 30-Day Delivery | INVARITECH",
        description:
            "Enterprise AI automation services for teams in Singapore, Hong Kong, Malaysia, and the Philippines. One production-grade automation, deployed in 30 days.",
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
    twitter: {
        card: "summary_large_image",
        title: "AI Automation & Integration Services | 30-Day Delivery | INVARITECH",
        description:
            "Enterprise AI automation for teams across APAC. One production-grade automation deployed on your existing systems in 30 days.",
        images: ["/og-image.png"],
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
            areaServed: [
                { "@type": "Country", name: "Singapore" },
                { "@type": "Country", name: "Hong Kong" },
                { "@type": "Country", name: "Malaysia" },
                { "@type": "Country", name: "Philippines" },
            ],
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
