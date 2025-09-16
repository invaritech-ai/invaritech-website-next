export const seoConfig = {
    siteName: "INVARITECH",
    siteUrl: "https://invaritech.ai",
    defaultTitle:
        "INVARITECH - Premium Digital Solutions & AI-Powered Development",
    titleTemplate: "%s | INVARITECH - Premium Digital Solutions",
    defaultDescription:
        "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions trusted by innovators worldwide.",

    // Social Media
    social: {
        twitter: "@invaritech",
        linkedin: "https://linkedin.com/company/invaritech",
        github: "https://github.com/invaritech",
    },

    // Contact Information
    contact: {
        email: "hello@invaritech.ai",
        phone: "+1 (555) 123-4567",
        address: {
            country: "US",
            region: "Global Services",
        },
    },

    // Business Information
    business: {
        founded: "2024",
        industry: "Technology",
        employees: "1-10",
        services: [
            "Backend Development",
            "AI Automation Solutions",
            "E-Commerce Development",
            "API Development",
            "Database Design",
            "Cloud Solutions",
            "Digital Transformation",
        ],
    },

    // SEO Keywords
    keywords: {
        primary: [
            "INVARITECH",
            "digital solutions",
            "AI development",
            "backend development",
            "automation",
            "e-commerce development",
            "premium software",
            "scalable systems",
        ],
        secondary: [
            "API development",
            "database design",
            "AI agents",
            "business automation",
            "Shopify development",
            "custom software",
            "enterprise solutions",
            "web development",
            "mobile app development",
            "cloud solutions",
            "digital transformation",
        ],
        longTail: [
            "premium digital solutions company",
            "AI-powered backend development",
            "custom e-commerce solutions",
            "enterprise automation services",
            "scalable API development",
            "luxury software development",
        ],
    },

    // Technical SEO
    technical: {
        language: "en",
        locale: "en_US",
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1",
        robots: {
            index: true,
            follow: true,
            nocache: false,
        },
    },

    // Performance
    performance: {
        preload: ["/logo.png", "/logo-image.png"],
        prefetch: ["/services", "/contact"],
    },

    // Analytics & Tracking
    analytics: {
        googleAnalytics: "GA_MEASUREMENT_ID",
        googleTagManager: "GTM-XXXXXXX",
        facebookPixel: "FB_PIXEL_ID",
    },

    // Verification Codes
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        yahoo: "your-yahoo-verification-code",
        bing: "your-bing-verification-code",
    },
};

export const generateMetadata = (pageData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: string;
}) => {
    const title = pageData?.title || seoConfig.defaultTitle;
    const description = pageData?.description || seoConfig.defaultDescription;
    const keywords = pageData?.keywords || seoConfig.keywords.primary;
    const image = pageData?.image || "/logo.png";
    const url = pageData?.url || seoConfig.siteUrl;
    const type = pageData?.type || "website";

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url,
            type,
            siteName: seoConfig.siteName,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: seoConfig.social.twitter,
            site: seoConfig.social.twitter,
        },
        alternates: {
            canonical: url,
        },
    };
};
