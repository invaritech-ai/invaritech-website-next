import type { ToolCard } from "./types";

export const tools = [
    {
        id: "three-way-matcher",
        title: "Three-Way Matcher",
        body: "Compare purchase orders, goods receipts, and supplier invoices to see AP mismatch logic and exception reasons clearly.",
        href: "/resources/three-way-match/",
        category: "matcher",
    },
    {
        id: "invoice-extractor",
        title: "Invoice Extractor",
        body: "Extract invoice fields into structured data so finance teams can review, route, and reconcile the document faster.",
        href: "/resources/invoice-extractor/",
        category: "extractor",
    },
    {
        id: "cost-to-close-calculator",
        title: "Cost-to-Close Calculator",
        body: "Estimate the hidden cost of month-end close work across manual checks, rework, reviews, and reporting delays.",
        href: "/resources/cost-to-close-calculator/",
        category: "calculator",
    },
    {
        id: "accounts-payable-controls",
        title: "AP Controls Checklist",
        body: "Decide which checks, owners, evidence, and release decisions AP needs before approving or paying a supplier invoice.",
        href: "/resources/accounts-payable-controls/",
        category: "checker",
    },
] satisfies ToolCard[];
