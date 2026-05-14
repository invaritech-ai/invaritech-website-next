import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Payment Control Resources — Rule Tables, Checklists & Guides",
    description:
        "Practical rule tables, checklists, and guides for finance teams reducing invoice exceptions, approval gaps, and manual payment checks.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Payment Control Resources — INVARITECH",
        description:
            "Rule tables, checklists, and guides for finance teams dealing with invoice exceptions, approval gaps, and manual payment checks.",
        url: "https://www.invaritech.ai/resources/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Payment Control Resources",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Payment Control Resources — INVARITECH",
        description:
            "Rule tables, checklists, and guides for finance teams dealing with invoice exceptions, approval gaps, and manual payment checks.",
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
            <ResourceLibraryClient />
        </>
    );
}
