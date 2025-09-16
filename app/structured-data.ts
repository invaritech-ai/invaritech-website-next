export const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "INVARITECH",
    description:
        "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Trusted by innovators worldwide for backend development, automation, AI agentic solutions, and e-commerce stores.",
    url: "https://invaritech.ai",
    logo: "https://invaritech.ai/logo.png",
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "English",
    },
    sameAs: [
        "https://twitter.com/invaritech",
        "https://linkedin.com/company/invaritech",
    ],
    address: {
        "@type": "PostalAddress",
        addressCountry: "US",
    },
    foundingDate: "2024",
    services: [
        {
            "@type": "Service",
            name: "Backend Development",
            description:
                "Scalable, robust APIs and databases engineered for performance and reliability.",
        },
        {
            "@type": "Service",
            name: "Automation",
            description:
                "Smart workflows that save time and cut costs through intelligent process optimization.",
        },
        {
            "@type": "Service",
            name: "AI Agentic Solutions",
            description:
                "Intelligent assistants and autonomous business workflows powered by cutting-edge AI.",
        },
        {
            "@type": "Service",
            name: "E-Commerce Stores",
            description:
                "Bespoke, performance-driven Shopify & custom builds that convert visitors to customers.",
        },
    ],
};
