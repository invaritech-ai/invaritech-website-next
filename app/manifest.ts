import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "INVARITECH - Premium Digital Solutions",
        short_name: "INVARITECH",
        description:
            "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/logo-image.png",
                sizes: "any",
                type: "image/png",
            },
        ],
    };
}
