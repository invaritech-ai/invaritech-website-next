import { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
    title: "AI Automation & Integration Services | 30-Day Sprint",
    description:
        "Build production-grade AI on the infrastructure you already own. Start with a 30-day Sprint, then scale via workflow automation, integrations, enterprise chatbots, and GenAI backend engineering.",
    openGraph: {
        title: "AI Automation & Integration Services | 30-Day Sprint | INVARITECH",
        description:
            "Build production-grade AI on the infrastructure you already own. Start with a 30-day Sprint, then scale via workflow automation, integrations, enterprise chatbots, and GenAI backend engineering.",
        url: "https://www.invaritech.ai/services/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AI Automation & Integration Services",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/",
    },
};

export default function ServicesPage() {
    return <ServicesClient />;
}
