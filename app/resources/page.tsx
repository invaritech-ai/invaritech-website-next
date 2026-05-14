import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Accounts Payable Automation Resources — Workflow Guides & Templates",
    description:
        "Practical accounts payable automation resources, including invoice approval workflow guides, duplicate payment prevention checklists, supplier statement reconciliation support, and freight invoice audit tools.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Accounts Payable Automation Resources — INVARITECH",
        description:
            "Rule tables, guides, and checklists for invoice approval workflow, duplicate payment prevention, supplier statement reconciliation, and freight invoice audit controls.",
        url: "https://www.invaritech.ai/resources/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Accounts Payable Automation Resources",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Accounts Payable Automation Resources — INVARITECH",
        description:
            "Rule tables, guides, and checklists for invoice approval workflow, duplicate payment prevention, supplier statement reconciliation, and freight invoice audit.",
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
