import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    async redirects() {
        return [
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
