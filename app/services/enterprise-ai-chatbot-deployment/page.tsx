import { Metadata } from "next";
import ChatbotClient from "./chatbot-client";

export const metadata: Metadata = {
    title: "Enterprise AI Chatbot Deployment | AI Chatbot Development Services",
    description: "AI chatbot development services for enterprises that need governance. Deploy a controlled enterprise AI chatbot solution with RBAC/ABAC, audit logs, citations, tool boundaries, and multilingual support.",
    keywords: ["ai chatbot development services", "enterprise ai chatbot solution", "custom chatbot development services", "multilingual ai chatbot development", "enterprise ai chatbot development", "generative ai chatbot development"],
    alternates: {
        canonical: "https://www.invaritech.ai/services/enterprise-ai-chatbot-deployment/",
    },
};

export default function AIChatbotDeploymentPage() {
    return <ChatbotClient />;
}
