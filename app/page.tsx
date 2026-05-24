import { Metadata } from "next";

import ExceptionAutomationHome from "@/components/exception-automation-home";

export const metadata: Metadata = {
    title: "Finance Exception Automation Systems — Invaritech",
    description:
        "Invaritech builds AI-powered automation systems for finance and operations teams buried in invoices, documents, approvals, and manual exception checks. Move faster without adding headcount.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return <ExceptionAutomationHome />;
}
