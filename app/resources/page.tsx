import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Free Finance & Compliance Automation Tools",
    description:
        "Free finance and compliance automation tools, rule tables, checklists, guides, and proof notes for invoice approval, exceptions, evidence, and audit trails.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Free Finance & Compliance Automation Tools - INVARITECH",
        description:
            "Free finance and compliance automation tools, rule tables, checklists, guides, and proof notes for invoice approval, exceptions, evidence, and audit trails.",
        url: "https://www.invaritech.ai/resources/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Free Finance & Compliance Automation Tools",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Finance & Compliance Automation Tools - INVARITECH",
        description:
            "Free finance and compliance automation tools, rule tables, checklists, guides, and proof notes for invoice approval, exceptions, evidence, and audit trails.",
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
