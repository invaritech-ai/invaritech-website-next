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
                statusCode: 301,
            },
            {
                source: "/blogs/building-vs-buying-automation-software/",
                destination: "/blog/building-vs-buying-custom-automation/",
                statusCode: 301,
            },
            {
                source: "/blogs/compliance-automation-for-small-teams",
                destination: "/blog/compliance-automation-done-right/",
                statusCode: 301,
            },
            {
                source: "/blogs/compliance-automation-for-small-teams/",
                destination: "/blog/compliance-automation-done-right/",
                statusCode: 301,
            },
            // Old /blogs/:slug → /blog/:slug/
            {
                source: "/blogs/:slug",
                destination: "/blog/:slug/",
                statusCode: 301,
            },
            {
                source: "/blogs/:slug/",
                destination: "/blog/:slug/",
                statusCode: 301,
            },
            // Old /blogs/ index → /blog/
            {
                source: "/blogs",
                destination: "/blog/",
                statusCode: 301,
            },
            {
                source: "/blogs/",
                destination: "/blog/",
                statusCode: 301,
            },

            // ── Work / Portfolio ──────────────────────────────────────────
            {
                source: "/use-cases",
                destination: "/work/",
                statusCode: 301,
            },
            {
                source: "/use-cases/",
                destination: "/work/",
                statusCode: 301,
            },
            {
                source: "/portfolio",
                destination: "/work/",
                statusCode: 301,
            },
            {
                source: "/portfolio/",
                destination: "/work/",
                statusCode: 301,
            },

            // ── Tools → Resources ─────────────────────────────────────────
            // Moved tools get specific destinations
            {
                source: "/tools/invoice-extractor",
                destination: "/resources/invoice-extractor/",
                statusCode: 301,
            },
            {
                source: "/tools/invoice-extractor/",
                destination: "/resources/invoice-extractor/",
                statusCode: 301,
            },
            {
                source: "/tools/cost-to-close-calculator",
                destination: "/resources/cost-to-close-calculator/",
                statusCode: 301,
            },
            {
                source: "/tools/cost-to-close-calculator/",
                destination: "/resources/cost-to-close-calculator/",
                statusCode: 301,
            },
            // Retired tools → resources index
            {
                source: "/tools/assessment",
                destination: "/resources/",
                statusCode: 301,
            },
            {
                source: "/tools/assessment/",
                destination: "/resources/",
                statusCode: 301,
            },
            {
                source: "/tools/burn-rate-calculator",
                destination: "/resources/",
                statusCode: 301,
            },
            {
                source: "/tools/burn-rate-calculator/",
                destination: "/resources/",
                statusCode: 301,
            },
            // Old geo pages → homepage
            {
                source: "/tools/invoice-processing-automation-hong-kong",
                destination: "/resources/invoice-processing-automation/",
                statusCode: 301,
            },
            {
                source: "/tools/invoice-processing-automation-hong-kong/",
                destination: "/resources/invoice-processing-automation/",
                statusCode: 301,
            },
            {
                source: "/tools/invoice-processing-automation-singapore",
                destination: "/resources/invoice-processing-automation/",
                statusCode: 301,
            },
            {
                source: "/tools/invoice-processing-automation-singapore/",
                destination: "/resources/invoice-processing-automation/",
                statusCode: 301,
            },
            // /assessment/ redirect page → resources
            {
                source: "/assessment",
                destination: "/resources/",
                statusCode: 301,
            },
            {
                source: "/assessment/",
                destination: "/resources/",
                statusCode: 301,
            },
            // Tools index → resources
            {
                source: "/tools",
                destination: "/resources/",
                statusCode: 301,
            },
            {
                source: "/tools/",
                destination: "/resources/",
                statusCode: 301,
            },

            // ── Finance / resource URL migrations ───────────────────────────
            {
                source: "/finance-operations-automation",
                destination: "/finance-automation/",
                statusCode: 301,
            },
            {
                source: "/finance-operations-automation/",
                destination: "/finance-automation/",
                statusCode: 301,
            },
            {
                source: "/finance-exception-automation",
                destination: "/finance-automation/",
                statusCode: 301,
            },
            {
                source: "/finance-exception-automation/",
                destination: "/finance-automation/",
                statusCode: 301,
            },
            {
                source: "/resources/supplier-payment-control-rule-table",
                destination: "/resources/accounts-payable-controls/",
                statusCode: 301,
            },
            {
                source: "/resources/supplier-payment-control-rule-table/",
                destination: "/resources/accounts-payable-controls/",
                statusCode: 301,
            },
            {
                source: "/resources/supplier-payment-control-rule-table/interactive",
                destination: "/resources/accounts-payable-controls/",
                statusCode: 301,
            },
            {
                source: "/resources/supplier-payment-control-rule-table/interactive/",
                destination: "/resources/accounts-payable-controls/",
                statusCode: 301,
            },

            // ── Services (removed) → Homepage ─────────────────────────────
            // Specific compliance-bridge link preserved for inbound equity
            {
                source: "/services/compliance-bridge",
                destination: "/work/eudr-compliance-bridge/",
                statusCode: 301,
            },
            {
                source: "/services/compliance-bridge/",
                destination: "/work/eudr-compliance-bridge/",
                statusCode: 301,
            },
            // All other /services/* → homepage
            {
                source: "/services/:path*",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/solutions",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/solutions/",
                destination: "/",
                statusCode: 301,
            },

            // ── Old sprint / campaign pages (removed) → Homepage ──────────
            {
                source: "/weekend-suite",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/weekend-suite/",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/ai-automation-sprint",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/ai-automation-sprint/",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/ops-efficiency-sprint",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/ops-efficiency-sprint/",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/results",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/results/",
                destination: "/",
                statusCode: 301,
            },

            // ── Legal ─────────────────────────────────────────────────────
            {
                source: "/terms-of-service",
                destination: "/terms/",
                statusCode: 301,
            },
            {
                source: "/terms-of-service/",
                destination: "/terms/",
                statusCode: 301,
            },
            {
                source: "/privacy-policy",
                destination: "/privacy/",
                statusCode: 301,
            },
            {
                source: "/privacy-policy/",
                destination: "/privacy/",
                statusCode: 301,
            },

            // ── Careers ───────────────────────────────────────────────────
            {
                source: "/careers/full-stack-developer",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/careers/full-stack-developer/",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/careers",
                destination: "/",
                statusCode: 301,
            },
            {
                source: "/careers/",
                destination: "/",
                statusCode: 301,
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
