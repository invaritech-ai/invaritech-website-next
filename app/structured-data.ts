export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.invaritech.ai/#organization",
            name: "INVARITECH",
            alternateName: "INVARITECH Automation Studio",
            description:
                "INVARITECH is a boutique automation studio. We design and build custom automation for small service businesses. From compliance bridges and data pipelines to admin suites for freelancers and agencies.",
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
                contactType: "customer service",
                email: "hello@invaritech.ai",
                availableLanguage: ["English"],
                areaServed: "Worldwide",
            },
            sameAs: [
                "https://x.com/invaritechai",
                "https://linkedin.com/company/invaritechai",
                "https://github.com/invaritech-ai",
            ],
            address: {
                "@type": "PostalAddress",
                addressCountry: "US",
            },
            foundingDate: "2024",
            numberOfEmployees: "1-10",
            industry: "Technology",
            knowsAbout: [
                "Business Automation",
                "Workflow Automation",
                "Compliance Automation",
                "Back-Office Systems",
                "Data Pipelines",
                "API Integration",
                "Compliance Bridges",
                "Admin Suites",
                "Process Automation",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://www.invaritech.ai/#website",
            url: "https://www.invaritech.ai",
            name: "INVARITECH - Automation & Back-Office Systems",
            description:
                "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites. Stop losing time between tools.",
            publisher: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                        "https://www.invaritech.ai/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
            },
        },
        {
            "@type": "WebPage",
            "@id": "https://www.invaritech.ai/#webpage",
            url: "https://www.invaritech.ai",
            name: "INVARITECH - Automation & Back-Office Systems for Small Service Businesses",
            description:
                "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites. Stop losing time between tools.",
            isPartOf: {
                "@id": "https://www.invaritech.ai/#website",
            },
            about: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: "https://www.invaritech.ai/logo-image.png",
                width: 1200,
                height: 630,
            },
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString(),
        },
        {
            "@type": "Service",
            name: "Compliance Workflow Bridge",
            description:
                "We turn your most painful compliance/reporting workflow into one auditable, automated pipeline in 6 weeks. Using tools you already have, we replace manual chaos with a single, reliable flow.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Automation & Compliance",
            areaServed: "Worldwide",
            audience: {
                "@type": "Audience",
                audienceType: "Regulated B2B Service Firms",
            },
        },
        {
            "@type": "Service",
            name: "WeekendSuite",
            description:
                "A simple admin suite for freelancers and tiny agencies. Turns every new inquiry into a same-day proposal, signed contract, and first invoice. Set up a professional client flow in a single weekend.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Admin Suite & Automation",
            areaServed: "Worldwide",
            audience: {
                "@type": "Audience",
                audienceType: "Freelancers & Small Agencies",
            },
        },
        {
            "@type": "Service",
            name: "Custom Automation",
            description:
                "Custom automation solutions for small service businesses. We help identify bottlenecks and deliver automation solutions within 6 weeks to give hours back to your business.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Business Automation",
            areaServed: "Worldwide",
        },
    ],
};
