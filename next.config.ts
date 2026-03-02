import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    async redirects() {
        return [
            // Specific blog slug remaps (must come before the wildcard below)
            {
                source: "/blogs/building-vs-buying-automation-software",
                destination: "/blog/building-vs-buying-custom-automation/",
                permanent: true,
            },
            {
                source: "/blogs/building-vs-buying-automation-software/",
                destination: "/blog/building-vs-buying-custom-automation/",
                permanent: true,
            },
            {
                source: "/blogs/compliance-automation-for-small-teams",
                destination: "/blog/compliance-automation-done-right/",
                permanent: true,
            },
            {
                source: "/blogs/compliance-automation-for-small-teams/",
                destination: "/blog/compliance-automation-done-right/",
                permanent: true,
            },
            // Old /blogs/ path → current /blog/ path (preserves crawl equity)
            {
                source: "/blogs/:slug",
                destination: "/blog/:slug/",
                permanent: true,
            },
            {
                source: "/blogs/:slug/",
                destination: "/blog/:slug/",
                permanent: true,
            },
            // Old /blogs/ index → current /blog/ index
            {
                source: "/blogs",
                destination: "/blog/",
                permanent: true,
            },
            {
                source: "/blogs/",
                destination: "/blog/",
                permanent: true,
            },
            // Old /solutions/ → /services/
            {
                source: "/solutions",
                destination: "/services/",
                permanent: true,
            },
            {
                source: "/solutions/",
                destination: "/services/",
                permanent: true,
            },
            // Old service slugs → current service pages
            {
                source: "/services/ai-automation",
                destination: "/services/ai-workflow-automation-services/",
                permanent: true,
            },
            {
                source: "/services/ai-automation/",
                destination: "/services/ai-workflow-automation-services/",
                permanent: true,
            },
            {
                source: "/services/backend-development",
                destination: "/services/generative-ai-backend-development/",
                permanent: true,
            },
            {
                source: "/services/backend-development/",
                destination: "/services/generative-ai-backend-development/",
                permanent: true,
            },
            {
                source: "/services/ecommerce-development",
                destination: "/services/",
                permanent: true,
            },
            {
                source: "/services/ecommerce-development/",
                destination: "/services/",
                permanent: true,
            },
            // Old compliance-bridge service → EUDR work case study
            {
                source: "/services/compliance-bridge",
                destination: "/work/eudr-compliance-bridge/",
                permanent: true,
            },
            {
                source: "/services/compliance-bridge/",
                destination: "/work/eudr-compliance-bridge/",
                permanent: true,
            },
            // Old /use-cases/ → /work/
            {
                source: "/use-cases",
                destination: "/work/",
                permanent: true,
            },
            {
                source: "/use-cases/",
                destination: "/work/",
                permanent: true,
            },
            // Old /portfolio/ → /work/
            {
                source: "/portfolio",
                destination: "/work/",
                permanent: true,
            },
            {
                source: "/portfolio/",
                destination: "/work/",
                permanent: true,
            },
            // Old /weekend-suite/ → 30-Day Sprint
            {
                source: "/weekend-suite",
                destination: "/services/ai-automation-sprint/",
                permanent: true,
            },
            {
                source: "/weekend-suite/",
                destination: "/services/ai-automation-sprint/",
                permanent: true,
            },
            // Old legal page slugs
            {
                source: "/terms-of-service",
                destination: "/terms/",
                permanent: true,
            },
            {
                source: "/terms-of-service/",
                destination: "/terms/",
                permanent: true,
            },
            {
                source: "/privacy-policy",
                destination: "/privacy/",
                permanent: true,
            },
            {
                source: "/privacy-policy/",
                destination: "/privacy/",
                permanent: true,
            },
            // Old career detail page → careers index
            {
                source: "/careers/full-stack-developer",
                destination: "/careers/",
                permanent: true,
            },
            {
                source: "/careers/full-stack-developer/",
                destination: "/careers/",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
