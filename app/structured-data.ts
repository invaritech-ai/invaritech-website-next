const HOMEPAGE_LAST_MODIFIED = "2026-05-15T00:00:00.000Z";

const SERVICE_DESCRIPTION =
    "Invaritech builds Finance Ops and RegOps automation for teams handling messy documents, approvals, exceptions, and evidence trails around existing systems.";

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
            alternateName: "INVARITECH Finance Ops and RegOps Automation",
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
                "Finance Operations Automation",
                "Finance Ops Automation",
                "RegOps Automation",
                "Regulatory Operations Automation",
                "Accounts Payable Controls",
                "Invoice Exception Management",
                "Payment Controls",
                "Exception Workflows",
                "Reporting Bridges",
                "Audit-Ready Internal Tools",
                "Existing Systems Integration",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://www.invaritech.ai/#website",
            url: "https://www.invaritech.ai",
            name: "Finance Ops and RegOps Automation | INVARITECH",
            description: SERVICE_DESCRIPTION,
            publisher: {
                "@id": "https://www.invaritech.ai/#organization",
            },
        },
        {
            "@type": "WebPage",
            "@id": "https://www.invaritech.ai/#webpage",
            url: "https://www.invaritech.ai",
            name: "Finance Ops and RegOps Automation | INVARITECH",
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
            name: "Finance Ops and RegOps Automation",
            description: SERVICE_DESCRIPTION,
            url: "https://www.invaritech.ai/",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Finance Operations Automation",
            areaServed: AREA_SERVED,
            audience: {
                "@type": "BusinessAudience",
                audienceType:
                    "Finance Operations, Financial Controllers, AP Managers, Shared Services, Compliance Operations, RegOps Teams",
            },
        },
        {
            "@type": "Service",
            name: "Managed Finance and RegOps Workflow Support",
            description:
                "Ongoing support for live finance operations and RegOps workflows, including rule updates, exception queue tuning, reporting bridge maintenance, audit evidence checks, and small changes around existing systems.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "RegOps Automation",
            areaServed: AREA_SERVED,
        },
    ],
};
