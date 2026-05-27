import { Metadata } from "next";

import ExceptionAutomationHome from "@/components/exception-automation-home";

export const metadata: Metadata = {
    title: "Invaritech: Workflow Automation for Document-Heavy Operations",
    description:
        "Invaritech builds workflow automation systems for document-heavy operations, starting with finance exception automation. Catch duplicate invoices, vendor-detail changes, approval gaps, and payment-control risks before they become rework, leakage, or another hire.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return <ExceptionAutomationHome />;
}
