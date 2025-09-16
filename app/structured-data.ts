export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://invaritech.ai/#organization",
            name: "INVARITECH",
            alternateName: "INVARITECH Digital Solutions",
            description:
                "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions trusted by innovators worldwide.",
            url: "https://invaritech.ai",
            logo: {
                "@type": "ImageObject",
                url: "https://invaritech.ai/logo.png",
                width: 512,
                height: 512,
            },
            image: {
                "@type": "ImageObject",
                url: "https://invaritech.ai/logo.png",
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
                "https://twitter.com/invaritech",
                "https://linkedin.com/company/invaritech",
                "https://github.com/invaritech",
            ],
            address: {
                "@type": "PostalAddress",
                addressCountry: "US",
            },
            foundingDate: "2024",
            numberOfEmployees: "1-10",
            industry: "Technology",
            knowsAbout: [
                "Backend Development",
                "AI Development",
                "Automation",
                "E-commerce Development",
                "API Development",
                "Database Design",
                "Cloud Solutions",
                "Digital Transformation",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://invaritech.ai/#website",
            url: "https://invaritech.ai",
            name: "INVARITECH - Premium Digital Solutions",
            description:
                "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions.",
            publisher: {
                "@id": "https://invaritech.ai/#organization",
            },
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                        "https://invaritech.ai/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
            },
        },
        {
            "@type": "WebPage",
            "@id": "https://invaritech.ai/#webpage",
            url: "https://invaritech.ai",
            name: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
            description:
                "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions trusted by innovators worldwide.",
            isPartOf: {
                "@id": "https://invaritech.ai/#website",
            },
            about: {
                "@id": "https://invaritech.ai/#organization",
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: "https://invaritech.ai/logo.png",
                width: 1200,
                height: 630,
            },
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString(),
        },
        {
            "@type": "Service",
            name: "Backend Development",
            description:
                "Scalable, robust APIs and databases engineered for performance and reliability. Custom backend solutions built with modern technologies.",
            provider: {
                "@id": "https://invaritech.ai/#organization",
            },
            serviceType: "Software Development",
            areaServed: "Worldwide",
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Backend Development Services",
                itemListElement: [
                    {
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: "API Development",
                            description:
                                "RESTful and GraphQL APIs built for scale and performance",
                        },
                    },
                    {
                        "@type": "Offer",
                        itemOffered: {
                            "@type": "Service",
                            name: "Database Design",
                            description:
                                "Optimized database architecture and implementation",
                        },
                    },
                ],
            },
        },
        {
            "@type": "Service",
            name: "AI Automation Solutions",
            description:
                "Smart workflows and AI agents that save time and cut costs through intelligent process optimization and automation.",
            provider: {
                "@id": "https://invaritech.ai/#organization",
            },
            serviceType: "AI Development",
            areaServed: "Worldwide",
        },
        {
            "@type": "Service",
            name: "E-Commerce Development",
            description:
                "Bespoke, performance-driven Shopify stores and custom e-commerce solutions that convert visitors to customers.",
            provider: {
                "@id": "https://invaritech.ai/#organization",
            },
            serviceType: "E-commerce Development",
            areaServed: "Worldwide",
        },
    ],
};
