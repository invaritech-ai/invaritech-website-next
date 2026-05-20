import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    async redirects() {
        return [
            // ── Blog ──────────────────────────────────────────────────────
            // Specific slug remaps (before wildcard)
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
            // Old /blogs/:slug → /blog/:slug/
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
            // Old /blogs/ index → /blog/
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

            // ── Work / Portfolio ──────────────────────────────────────────
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

            // ── Tools → Resources ─────────────────────────────────────────
            // Moved tools get specific destinations
            {
                source: "/tools/invoice-extractor",
                destination: "/resources/invoice-extractor/",
                permanent: true,
            },
            {
                source: "/tools/invoice-extractor/",
                destination: "/resources/invoice-extractor/",
                permanent: true,
            },
            {
                source: "/tools/cost-to-close-calculator",
                destination: "/resources/cost-to-close-calculator/",
                permanent: true,
            },
            {
                source: "/tools/cost-to-close-calculator/",
                destination: "/resources/cost-to-close-calculator/",
                permanent: true,
            },
            // Retired tools → resources index
            {
                source: "/tools/assessment",
                destination: "/resources/",
                permanent: true,
            },
            {
                source: "/tools/assessment/",
                destination: "/resources/",
                permanent: true,
            },
            {
                source: "/tools/burn-rate-calculator",
                destination: "/resources/",
                permanent: true,
            },
            {
                source: "/tools/burn-rate-calculator/",
                destination: "/resources/",
                permanent: true,
            },
            // Old geo pages → homepage
            {
                source: "/tools/invoice-processing-automation-hong-kong",
                destination: "/resources/invoice-processing-automation/",
                permanent: true,
            },
            {
                source: "/tools/invoice-processing-automation-hong-kong/",
                destination: "/resources/invoice-processing-automation/",
                permanent: true,
            },
            {
                source: "/tools/invoice-processing-automation-singapore",
                destination: "/resources/invoice-processing-automation/",
                permanent: true,
            },
            {
                source: "/tools/invoice-processing-automation-singapore/",
                destination: "/resources/invoice-processing-automation/",
                permanent: true,
            },
            // /assessment/ redirect page → resources
            {
                source: "/assessment",
                destination: "/resources/",
                permanent: true,
            },
            {
                source: "/assessment/",
                destination: "/resources/",
                permanent: true,
            },
            // Tools index → resources
            {
                source: "/tools",
                destination: "/resources/",
                permanent: true,
            },
            {
                source: "/tools/",
                destination: "/resources/",
                permanent: true,
            },

            // ── Services (removed) → Homepage ─────────────────────────────
            // Specific compliance-bridge link preserved for inbound equity
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
            // All other /services/* → homepage
            {
                source: "/services/:path*",
                destination: "/",
                permanent: true,
            },
            {
                source: "/solutions",
                destination: "/",
                permanent: true,
            },
            {
                source: "/solutions/",
                destination: "/",
                permanent: true,
            },

            // ── Old sprint / campaign pages (removed) → Homepage ──────────
            {
                source: "/weekend-suite",
                destination: "/",
                permanent: true,
            },
            {
                source: "/weekend-suite/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/ai-automation-sprint",
                destination: "/",
                permanent: true,
            },
            {
                source: "/ai-automation-sprint/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/ops-efficiency-sprint",
                destination: "/",
                permanent: true,
            },
            {
                source: "/ops-efficiency-sprint/",
                destination: "/",
                permanent: true,
            },
            {
                source: "/results",
                destination: "/",
                permanent: true,
            },
            {
                source: "/results/",
                destination: "/",
                permanent: true,
            },

            // ── Legal ─────────────────────────────────────────────────────
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

            // ── Careers ───────────────────────────────────────────────────
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
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;
