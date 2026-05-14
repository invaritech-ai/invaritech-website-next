import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Accounts Payable Control Resources — Rule Tables, Guides & Checklists",
    description:
        "Practical resources for accounts payable controls, including invoice approval workflow guides, payment approval checks, and invoice exception management templates.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Accounts Payable Control Resources — INVARITECH",
        description:
            "Rule tables, guides, and checklists for accounts payable controls, invoice approval workflow, payment approval checks, and exception handling.",
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
        title: "Accounts Payable Control Resources — INVARITECH",
        description:
            "Rule tables, guides, and checklists for accounts payable controls, invoice approval workflow, payment approval checks, and exception handling.",
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
