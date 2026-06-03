import { Metadata } from "next";
import Script from "next/script";
import ResourceRuleTableClient from "@/components/resource-rule-table-client";

export const metadata: Metadata = {
    title: "Supplier Payment Control Rule Table for AP Teams",
    description:
        "View a supplier payment control rule table for mapping payment approval checks, invoice exception routing, evidence, and audit notes before release.",
    alternates: {
        canonical:
            "https://www.invaritech.ai/resources/supplier-payment-control-rule-table/",
    },
    openGraph: {
        title: "Supplier Payment Control Rule Table for AP Teams | INVARITECH",
        description:
            "Interactive rule table for mapping supplier payment controls, payment approval checks, invoice exceptions, routing, evidence, and audit trails.",
        url: "https://www.invaritech.ai/resources/supplier-payment-control-rule-table/",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Supplier Payment Control Rule Table",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Supplier Payment Control Rule Table for AP Teams | INVARITECH",
        description:
            "Map supplier payment controls, payment approval checks, invoice exceptions, routing, evidence, and audit trails.",
        images: ["/og-image.png"],
    },
};

const BASE = "https://www.invaritech.ai";

const schemas = [
    {
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
            {
                "@type": "ListItem",
                position: 3,
                name: "Supplier Payment Control Rule Table",
                item: `${BASE}/resources/supplier-payment-control-rule-table/`,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Supplier Payment Control Rule Table",
        description:
            "Interactive rule table for mapping supplier payment controls, payment approval checks, invoice exceptions, routing, evidence, and audit notes before release.",
        author: {
            "@type": "Organization",
            name: "INVARITECH",
            url: BASE,
        },
        url: `${BASE}/resources/supplier-payment-control-rule-table/`,
        encodingFormat: "text/html",
    },
];

export default function RuleTablePage() {
    return (
        <>
            {schemas.map((schema, i) => (
                <Script
                    key={i}
                    id={`schema-rule-table-${i}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <ResourceRuleTableClient />
        </>
    );
}
