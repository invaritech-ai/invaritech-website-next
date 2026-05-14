import { Metadata } from "next";
import Script from "next/script";
import ResourceRuleTableClient from "@/components/resource-rule-table-client";

export const metadata: Metadata = {
    title: "Supplier Payment Control Rule Table — Download",
    description:
        "A rule table workbook for mapping supplier payment-change checks, exception routing, approval evidence, and audit notes before payment release. Free for finance teams.",
    alternates: {
        canonical:
            "https://www.invaritech.ai/resources/supplier-payment-control-rule-table/",
    },
    openGraph: {
        title: "Supplier Payment Control Rule Table — INVARITECH",
        description:
            "Rule table workbook for mapping payment exceptions, routing, approval evidence, and audit trails. Free for finance teams.",
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
        title: "Supplier Payment Control Rule Table — INVARITECH",
        description:
            "Rule table workbook for mapping payment exceptions, routing, approval evidence, and audit trails.",
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
            "Rule table workbook for mapping payment exceptions, routing, approval evidence, and audit notes before payment release.",
        author: {
            "@type": "Organization",
            name: "INVARITECH",
            url: BASE,
        },
        url: `${BASE}/resources/supplier-payment-control-rule-table/`,
        encodingFormat:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
