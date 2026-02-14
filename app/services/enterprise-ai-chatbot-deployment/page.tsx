import { Metadata } from "next";
import ChatbotClient from "./chatbot-client";

export const metadata: Metadata = {
    title: "AI Chatbot Development Services | Enterprise Deployment (Governed & Multilingual)",
    description: "AI chatbot development services for enterprises that need governance. Deploy a controlled enterprise AI chatbot solution with RBAC/ABAC, audit logs, citations, tool boundaries, and multilingual support.",
    keywords: [
        "ai chatbot development services",
        "enterprise ai chatbot development",
        "generative ai chatbot development",
        "ai chatbot for business website",
        "cantonese ai chatbot for website",
        "mandarin ai chatbot development",
        "bahasa ai chatbot development",
        "ai agent development services",
        "custom chatbot development services",
        "multilingual ai chatbot development",
        "enterprise ai chatbot solution",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/enterprise-ai-chatbot-deployment/",
    },
};

export default function AIChatbotDeploymentPage() {
    return <ChatbotClient />;
}
