import { Metadata } from "next";
import IntegrationClient from "./integration-client";

export const metadata: Metadata = {
    title: "AI Integration Services | Generative AI System Integration (Model-Agnostic)",
    description: "Generative AI integration services for enterprises. We build a governed integration layer (custom gateway) to connect AI to ERP/CRM/legacy systems with idempotency, audit logs, RBAC, fallbacks, and deployment flexibility.",
    keywords: [
        "ai integration services",
        "ai integration consulting services",
        "ai system integration services",
        "enterprise ai integration services",
        "ai integration services for businesses",
        "generative ai integration services",
        "gen ai integration services",
        "ai agent integration services",
        "ai tool integration services",
        "integration services for ai tools",
        "model-agnostic ai integration",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-integration-services/",
    },
};

export default function AIIntegrationServicesPage() {
    return <IntegrationClient />;
}
