const HOMEPAGE_LAST_MODIFIED = "2026-05-15T00:00:00.000Z";

const SERVICE_DESCRIPTION =
    "Invaritech builds finance automation and compliance automation for teams handling messy invoices, approvals, exceptions, and audit trails around existing systems.";

const AREA_SERVED = [
    { "@type": "Place", name: "Worldwide" },
    { "@type": "AdministrativeArea", name: "APAC" },
];

export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.invaritech.ai/#organization",
            name: "INVARITECH",
            alternateName: "INVARITECH Finance Automation & Compliance Automation",
            description: SERVICE_DESCRIPTION,
            url: "https://www.invaritech.ai",
            logo: {
                "@type": "ImageObject",
                url: "https://www.invaritech.ai/logo-image.png",
                width: 516,
                height: 516,
            },
            image: {
                "@type": "ImageObject",
                url: "https://www.invaritech.ai/logo-image.png",
                width: 516,
                height: 516,
            },
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "hello@invaritech.ai",
                availableLanguage: ["English"],
                areaServed: AREA_SERVED,
            },
            sameAs: [
                "https://x.com/invaritechai",
                "https://linkedin.com/company/invaritechai",
                "https://github.com/invaritech-ai",
            ],
            foundingDate: "2025",
            industry: "Technology",
            knowsAbout: [
                "Finance Automation",
                "Compliance Automation",
                "Invoice Automation",
                "Accounts Payable Automation",
                "Invoice Approval Workflow",
                "Invoice Processing Automation",
                "Financial Close Automation",
                "Regulatory Compliance Automation",
                "Audit Trail Software",
                "Reporting Bridges",
                "Existing Systems Integration",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://www.invaritech.ai/#website",
            url: "https://www.invaritech.ai",
            name: "Finance Automation & Compliance Automation | INVARITECH",
            description: SERVICE_DESCRIPTION,
            publisher: {
                "@id": "https://www.invaritech.ai/#organization",
            },
        },
        {
            "@type": "WebPage",
            "@id": "https://www.invaritech.ai/#webpage",
            url: "https://www.invaritech.ai",
            name: "Finance Automation & Compliance Automation | INVARITECH",
            description: SERVICE_DESCRIPTION,
            isPartOf: {
                "@id": "https://www.invaritech.ai/#website",
            },
            about: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: "https://www.invaritech.ai/og-image.png",
                width: 1200,
                height: 630,
            },
            datePublished: "2024-01-01",
            dateModified: HOMEPAGE_LAST_MODIFIED,
        },
        {
            "@type": "Service",
            name: "Finance Automation & Compliance Automation",
            description: SERVICE_DESCRIPTION,
            url: "https://www.invaritech.ai/",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Finance Automation",
            areaServed: AREA_SERVED,
            audience: {
                "@type": "BusinessAudience",
                audienceType:
                    "Finance Operations, Financial Controllers, AP Managers, Shared Services, Compliance Operations, Regulatory Compliance Teams",
            },
        },
        {
            "@type": "Service",
            name: "Managed Finance & Compliance Automation Support",
            description:
                "Ongoing support for live finance and compliance automation workflows, including rule updates, exception queue tuning, reporting bridge maintenance, audit evidence checks, and small changes around existing systems.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Compliance Automation",
            areaServed: AREA_SERVED,
        },
    ],
};
