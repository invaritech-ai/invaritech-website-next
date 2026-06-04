import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Free Finance Automation Tools for AP Controls and Invoice Workflows",
    description:
        "Free finance automation tools for AP teams: invoice extraction, AP controls, three-way match checks, invoice processing automation, and close cost analysis.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Free Finance Automation Tools for AP Controls and Invoice Workflows - INVARITECH",
        description:
            "Free finance automation tools for AP teams: invoice extraction, AP controls, three-way match checks, invoice processing automation, and close cost analysis.",
        url: "https://www.invaritech.ai/resources/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free Finance Automation Tools",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Finance Automation Tools for AP Controls and Invoice Workflows - INVARITECH",
        description:
            "Free finance automation tools for AP teams: invoice extraction, AP controls, three-way match checks, invoice processing automation, and close cost analysis.",
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
    name: "Free Finance Automation Tools for AP Controls and Invoice Workflows",
    description:
        "Free finance automation tools for AP teams: invoice extraction, AP controls, three-way match checks, invoice processing automation, and close cost analysis.",
    url: `${BASE}/resources/`,
    isPartOf: {
        "@type": "WebSite",
        name: "INVARITECH",
        url: BASE,
    },
    about: [
        "finance automation tools",
        "accounts payable controls",
        "three-way match",
        "invoice processing automation",
        "invoice automation tools",
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
