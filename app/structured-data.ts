export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://www.invaritech.ai/#organization",
            name: "INVARITECH",
            alternateName: "INVARITECH AI Automation Studio",
            description:
                "INVARITECH delivers drop-in AI automations for medium and enterprise teams. We plug intelligence into existing ERP, CRM, and internal workflows without disruptive rebuilds.",
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
            foundingDate: "2025",
            industry: "Technology",
            knowsAbout: [
                "Enterprise AI Automation",
                "Workflow Automation",
                "ERP Integration",
                "CRM Integration",
                "Operational Efficiency",
                "AI Guardrails",
                "Production AI Systems",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://www.invaritech.ai/#website",
            url: "https://www.invaritech.ai",
            name: "INVARITECH - Drop-In AI Automations for Enterprises",
            description:
                "Drop-In AI automations for enterprises that cannot afford disruption. One production-grade automation in 30 days.",
            publisher: {
                "@id": "https://www.invaritech.ai/#organization",
            },
        },
        {
            "@type": "WebPage",
            "@id": "https://www.invaritech.ai/#webpage",
            url: "https://www.invaritech.ai",
            name: "INVARITECH - Drop-In AI Automations for Enterprises That Cannot Afford Disruption",
            description:
                "We add intelligence to your existing systems safely, incrementally, and measurably. In 30 days you get one production-grade AI automation with measurable before/after impact.",
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
            name: "30-Day Drop-In AI Automation Sprint",
            description:
                "In 30 days, INVARITECH delivers one production-grade AI automation running on top of your existing infrastructure, solving one clearly defined bottleneck with measurable before/after impact.",
            url: "https://www.invaritech.ai/services/ai-automation-sprint/",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Enterprise AI Automation Sprint",
            areaServed: "Worldwide",
            audience: {
                "@type": "BusinessAudience",
                audienceType: "COO, Head of Operations, CTO, Tech Lead",
            },
            offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "10000",
                highPrice: "15000",
                offerCount: "1",
            },
        },
        {
            "@type": "Service",
            name: "Custom Software on Existing Infrastructure",
            description:
                "Custom software and AI layers that make current enterprise systems smarter without replatforming or locking teams into new vendors.",
            provider: {
                "@id": "https://www.invaritech.ai/#organization",
            },
            serviceType: "Custom Software Development",
            areaServed: "Worldwide",
        },
    ],
};
