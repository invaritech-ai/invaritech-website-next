import { Metadata } from "next";
import ConsultingClient from "./consulting-client";

export const metadata: Metadata = {
    title: "AI Automation Consulting | Production-Ready Execution",
    description: "AI automation consulting for leadership teams who need clarity before committing capital. We rank ROI wedges, define governance boundaries, and deliver a build-ready execution plan your team can run.",
    keywords: [
        "ai automation consulting",
        "ai automation consulting services",
        "ai automation consulting firms",
        "ai automation consulting companies",
        "ai automation consulting for businesses",
        "ai and automation consulting",
        "ai infrastructure automation consulting",
        "ai process automation consulting",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-automation-consulting/",
    },
};

export default function AIConsultingPage() {
    return <ConsultingClient />;
}
