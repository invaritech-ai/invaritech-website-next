import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "INVARITECH Finance Operations Automation",
        short_name: "INVARITECH",
        description: "Finance operations and RegOps automation around the systems teams already use.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait-primary",
        scope: "/",
        lang: "en",
        dir: "ltr",
        categories: ["business", "productivity", "technology"],
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
        screenshots: [
            {
                src: "/manifest-screenshot-1280x720.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "INVARITECH Finance Operations Automation Homepage",
            },
        ],
    };
}
