import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
        short_name: "INVARITECH",
        description:
            "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions.",
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
                src: "/logo-image.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/logo-image.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
        screenshots: [
            {
                src: "/logo.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "INVARITECH Homepage",
            },
        ],
    };
}
