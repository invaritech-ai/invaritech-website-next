import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Tools and Resources for Operations Optimization",
    description:
        "Practical tools, checklists, calculators, and guides for supplier claims, finance operations, payment evidence, and compliance workflows.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Tools and Resources for Ops Optimization - INVARITECH",
        description:
            "Practical tools, checklists, calculators, and guides for supplier claims, finance operations, payment evidence, and compliance workflows.",
        url: "https://www.invaritech.ai/resources/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Tools and Resources for Ops Optimization",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tools and Resources for Ops Optimization - INVARITECH",
        description:
            "Practical tools, checklists, calculators, and guides for supplier claims, finance operations, payment evidence, and compliance workflows.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: `${BASE}/resources/`,
        },
    ],
};

const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Tools and Resources for Ops Optimization",
    description:
        "Practical tools, checklists, calculators, and guides for supplier claims, finance operations, payment evidence, and compliance workflows.",
    url: `${BASE}/resources/`,
    isPartOf: {
        "@type": "WebSite",
        name: "INVARITECH",
        url: BASE,
    },
    about: [
        "ops optimization tools",
        "supplier claims",
        "accounts payable controls",
        "three-way match",
        "payment evidence",
        "compliance workflows",
    ],
};

export default function ResourcesPage() {
    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <Script
                id="resources-webpage-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webpageSchema),
                }}
            />
            <ResourceLibraryClient />
        </>
    );
}
