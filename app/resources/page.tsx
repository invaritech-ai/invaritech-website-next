import { Metadata } from "next";
import Script from "next/script";
import ResourceLibraryClient from "@/components/resource-library-client";

export const metadata: Metadata = {
    title: "Finance Controls Tools and Resources",
    description:
        "Free tools, rule tables, checklists, and guides for finance controls, approval evidence, exception routing, duplicate payment risk, and month-end visibility.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
    openGraph: {
        title: "Finance Controls Tools and Resources - INVARITECH",
        description:
            "Free tools, rule tables, checklists, and guides for finance controls, approval evidence, exception routing, duplicate payment risk, and month-end visibility.",
        url: "https://www.invaritech.ai/resources/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Finance Controls Tools and Resources",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Finance Controls Tools and Resources - INVARITECH",
        description:
            "Free tools, rule tables, checklists, and guides for finance controls, approval evidence, exception routing, duplicate payment risk, and month-end visibility.",
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
