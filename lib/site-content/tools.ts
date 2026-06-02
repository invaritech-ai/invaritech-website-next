import type { ToolCard } from "./types";

export const tools = [
    {
        id: "three-way-matcher",
        title: "Three-Way Matcher",
        body: "Compare purchase orders, goods receipts, and supplier invoices to see AP mismatch logic and exception reasons clearly.",
        status: "live",
        href: "/glossary/three-way-match/",
        category: "matcher",
    },
    {
        id: "invoice-extractor",
        title: "Invoice Extractor",
        body: "Extract invoice fields into structured data so finance teams can review, route, and reconcile the document faster.",
        status: "live",
        href: "/resources/invoice-extractor/",
        category: "extractor",
    },
    {
        id: "cost-to-close-calculator",
        title: "Cost-to-Close Calculator",
        body: "Estimate the hidden cost of month-end close work across manual checks, rework, reviews, and reporting delays.",
        status: "live",
        href: "/resources/cost-to-close-calculator/",
        category: "calculator",
    },
    {
        id: "supplier-payment-control-rule-table",
        title: "Supplier Payment Control Rule Table",
        body: "Use a plain-language rule table to map payment risks to checks, owners, evidence, and escalation paths.",
        status: "live",
        href: "/resources/supplier-payment-control-rule-table/",
        category: "rule-table",
    },
] satisfies ToolCard[];
