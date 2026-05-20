const HOMEPAGE_LAST_MODIFIED = "2026-05-15T00:00:00.000Z";

export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.invaritech.ai/#organization",
            name: "INVARITECH",
            alternateName: "INVARITECH Payment Control Design",
            description:
                "INVARITECH designs, builds, and maintains payment controls for finance teams that need fewer manual exceptions, cleaner approvals, and less payment leakage without changing systems.",
            url: "https://www.invaritech.ai",
            logo: {
                "@type": "ImageObject",
                url: "https://www.invaritech.ai/logo-image.png",
                width: 512,
                height: 512,
            },
            image: {
                "@type": "ImageObject",
                url: "https://www.invaritech.ai/logo-image.png",
                width: 1200,
                height: 630,
            },
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "hello@invaritech.ai",
                availableLanguage: ["English"],
                areaServed: [
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Place", name: "APAC" },
                ],
            },
            sameAs: [
                "https://x.com/invaritechai",
                "https://linkedin.com/company/invaritechai",
                "https://github.com/invaritech-ai",
            ],
            foundingDate: "2025",
            industry: "Technology",
            knowsAbout: [
                "Payment Control Design",
                "Accounts Payable Controls",
                "Invoice Exception Management",
                "Supplier Payment Verification",
                "Audit Trail Design",
                "Finance Operations",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://www.invaritech.ai/#website",
            url: "https://www.invaritech.ai",
            name: "INVARITECH - Payment Control Design for Finance Teams",
            description:
                "Founder-led payment control design for finance teams that need fewer manual exceptions, cleaner approvals, and less payment leakage without changing systems.",
            publisher: {
                "@id": "https://www.invaritech.ai/#organization",
            },
        },
        {
            "@type": "WebPage",
            "@id": "https://www.invaritech.ai/#webpage",
            url: "https://www.invaritech.ai",
            name: "INVARITECH - Payment Control Design for Australian Finance Teams",
            description:
                "We help finance teams reduce manual exception chasing, tighten approvals, and reduce dollar leakage across the systems they already use.",
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
            name: "Fixed-Scope Payment Control Sprint",
            description:
                "INVARITECH designs and builds one payment-control workflow with agreed acceptance criteria, exception routing, approval evidence, audit trails, and ongoing managed support.",
            url: "https://www.invaritech.ai/",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Payment Control Design",
            areaServed: [
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Place", name: "APAC" },
                ],
            audience: {
                "@type": "BusinessAudience",
                audienceType: "AP Manager, Financial Controller, Finance Operations, Shared Services",
            },
            offers: {
                "@type": "AggregateOffer",
                priceCurrency: "AUD",
                lowPrice: "10000",
                highPrice: "15000",
                offerCount: "1",
            },
        },
        {
            "@type": "Service",
            name: "Managed Finance Workflow Support",
            description:
                "Ongoing support for live finance controls, including rule updates, exception queue tuning, monitoring, audit-log maintenance, and small changes that keep the agreed objective working.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Managed Payment Control Support",
            areaServed: [
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Place", name: "APAC" },
                ],
        },
    ],
};
