import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/private/", "/admin/", "/api/", "/google-apps-script/", "/results/", "/results/*"],
            },
            {
                userAgent: "GPTBot",
                allow: "/",
            }
        ],
        sitemap: "https://www.invaritech.ai/sitemap.xml",
        host: "https://www.invaritech.ai",
    };
}
