import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/private/",
                    "/admin/",
                    "/api/",
                    "/_next/",
                    "/dist/",
                    "/*.json$",
                    "/google-apps-script/",
                ],
                crawlDelay: 1,
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/private/", "/admin/", "/api/"],
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: ["/private/", "/admin/", "/api/"],
            },
        ],
        sitemap: "https://www.invaritech.ai/sitemap.xml",
        host: "https://www.invaritech.ai",
    };
}
