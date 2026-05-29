import type { ToolCard } from "./types";

export const tools = [
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
    {
        id: "xero-exception-checker",
        title: "Xero Exception Checker",
        body: "A planned checker for surfacing invoice, supplier, and approval exceptions before they become payment issues.",
        status: "coming-soon",
        category: "checker",
    },
    {
        id: "supplier-bank-detail-change-checker",
        title: "Supplier Bank Detail Change Checker",
        body: "A planned control for reviewing supplier bank detail changes with ownership, evidence, and release checks.",
        status: "coming-soon",
        category: "checker",
    },
    {
        id: "duplicate-payment-risk-checker",
        title: "Duplicate Payment Risk Checker",
        body: "A planned checker for finding duplicate payment risk across invoice references, amounts, dates, and supplier records.",
        status: "coming-soon",
        category: "checker",
    },
] satisfies ToolCard[];
