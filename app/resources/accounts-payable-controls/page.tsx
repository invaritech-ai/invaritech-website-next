import { Metadata } from "next";
import Script from "next/script";
import ResourceRuleTableClient, {
    type FaqItem,
} from "@/components/resource-rule-table-client";

const BASE = "https://www.invaritech.ai";
const PAGE_PATH = "/resources/accounts-payable-controls/";
const PAGE_URL = `${BASE}${PAGE_PATH}`;

const faqs: FaqItem[] = [
    {
        question: "What are accounts payable controls?",
        answer:
            "Accounts payable controls are the checks that happen before an invoice is approved or a payment is released. They define who reviews the exception, what evidence must be attached, and what gets recorded in the audit trail.",
    },
    {
        question: "How does invoice approval workflow fit into AP controls?",
        answer:
            "Invoice approval workflow is one part of AP controls. The wider control layer also covers supplier bank-detail changes, duplicate invoice risk, payment-release checks, evidence standards, and escalation paths.",
    },
    {
        question: "Can I use this before buying automation?",
        answer:
            "Yes. This page is meant to help AP teams decide which controls they need before they connect a live accounting tenant or scope a custom workflow build.",
    },
];

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
                name: "Accounts Payable Controls Checklist",
                item: PAGE_URL,
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Accounts Payable Controls Checklist",
        description:
            "Free accounts payable controls checklist for invoice approval workflow, payment controls, approval evidence, and payment release checks.",
        about: [
            "accounts payable controls",
            "invoice approval workflow",
            "payment controls",
            "payment approval workflow",
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Accounts Payable Controls Checklist",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description:
            "Interactive AP controls checklist for deciding which approval checks, evidence requirements, owners, and release decisions apply to a payment or invoice scenario.",
        url: PAGE_URL,
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    },
];

export const metadata: Metadata = {
    title: "Accounts Payable Controls Checklist for Invoice Approval Workflow",
    description:
        "Free accounts payable controls checklist for invoice approval workflow, payment controls, approval evidence, and payment release checks. Use the interactive tool to decide what to hold, match, callback, or escalate.",
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "Accounts Payable Controls Checklist | INVARITECH",
        description:
            "Use the AP controls checklist to map invoice approval workflow checks, required evidence, owners, and payment release decisions.",
        url: PAGE_URL,
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Accounts Payable Controls Checklist",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Accounts Payable Controls Checklist | INVARITECH",
        description:
            "Interactive AP controls checklist for payment controls, invoice approval workflow, and payment release checks.",
        images: ["/og-image.png"],
    },
};

export default function AccountsPayableControlsPage() {
    return (
        <>
            {schemas.map((schema, index) => (
                <Script
                    key={index}
                    id={`accounts-payable-controls-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <ResourceRuleTableClient faqs={faqs} />
        </>
    );
}
