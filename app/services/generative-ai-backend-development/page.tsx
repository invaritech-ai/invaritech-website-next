import { Metadata } from "next";
import BackendClient from "./backend-client";

export const metadata: Metadata = {
    title: "Generative AI Backend Development | Generative AI Development Services",
    description: "Generative AI backend development for production systems. Turn GenAI prototypes into governed, cost-controlled backends with evaluation harnesses, observability, prompt versioning, and safe deployment patterns.",
    keywords: [
        "generative ai development services",
        "ai software development services",
        "ai engineering services",
        "ai ml development services",
        "ai/ml development services",
        "ai and ml development services",
        "ai development services",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/generative-ai-backend-development/",
    },
};

export default function GenAIBackendPage() {
    return <BackendClient />;
}
