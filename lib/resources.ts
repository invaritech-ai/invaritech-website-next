export type ResourceCategory =
    | "rule-table"
    | "checklist"
    | "guide"
    | "calculator"
    | "template"
    | "tool";

export type ResourceAccess = "open" | "gated" | "coming-soon";

export interface Resource {
    slug: string;
    title: string;
    excerpt: string;
    category: ResourceCategory;
    industry?: string;
    format: string;
    access: ResourceAccess;
    featured?: boolean;
    subpageHref?: string;
}

export const CATEGORY_LABELS: Record<ResourceCategory | "all", string> = {
    all: "All",
    "rule-table": "Rule Tables",
    checklist: "Checklists",
    guide: "Guides",
    calculator: "Calculators",
    template: "Templates",
    tool: "Tools",
};

export const CATEGORY_KEYS = [
    "all",
    "rule-table",
    "checklist",
    "guide",
    "calculator",
    "template",
    "tool",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const resources: Resource[] = [
    {
        slug: "supplier-payment-control-rule-table",
        title: "Supplier Payment Control Rule Table",
        excerpt:
            "A zero-fluff workbook for mapping payment-change checks, exception routing, approval evidence, and audit notes before a payment is ever released.",
        category: "rule-table",
        industry: "All industries",
        format: "Workbook (.xlsx)",
        access: "gated",
        featured: true,
        subpageHref: "/resources/supplier-payment-control-rule-table/",
    },
    {
        slug: "changed-bank-detail-verification-checklist",
        title: "Changed Bank Detail Verification Checklist",
        excerpt:
            "Step-by-step verification checks for supplier bank-detail change requests before any payment is authorised.",
        category: "checklist",
        industry: "All industries",
        format: "PDF checklist",
        access: "coming-soon",
    },
    {
        slug: "freight-invoice-variance-rule-table",
        title: "Freight Invoice Variance Rule Table",
        excerpt:
            "Rule logic for catching carrier surcharge overcharges, rate-card mismatches, and duplicate invoice variants before release.",
        category: "rule-table",
        industry: "Freight & logistics",
        format: "Workbook (.xlsx)",
        access: "coming-soon",
    },
    {
        slug: "po-invoice-receipt-mismatch-guide",
        title: "PO / Invoice / Receipt Mismatch Guide",
        excerpt:
            "A practical guide to three-way match exceptions: what causes them, how to classify them, and how to route them for approval.",
        category: "guide",
        industry: "Manufacturing / Distribution",
        format: "PDF guide",
        access: "coming-soon",
    },
    {
        slug: "exception-queue-template",
        title: "Exception Queue Template",
        excerpt:
            "Owner, status, SLA, approval note, and audit trail fields — a ready-to-use queue structure for payment exception management.",
        category: "template",
        industry: "All industries",
        format: "Spreadsheet template",
        access: "coming-soon",
    },
    {
        slug: "invoice-extractor",
        title: "Invoice Data Extractor",
        excerpt:
            "Upload any PDF, JPG, or PNG invoice. AI extracts supplier name, line items, totals, and tax into a clean CSV. Free, no signup required.",
        category: "tool",
        industry: "All industries",
        format: "Live tool",
        access: "open",
        subpageHref: "/resources/invoice-extractor/",
    },
    {
        slug: "cost-to-close-calculator",
        title: "Cost-to-Close Calculator",
        excerpt:
            "Three inputs. See how much your month-end close cycle costs annually and what automation saves. No signup required.",
        category: "tool",
        industry: "All industries",
        format: "Live calculator",
        access: "open",
        subpageHref: "/resources/cost-to-close-calculator/",
    },
    {
        slug: "payment-release-audit-trail-checklist",
        title: "Payment Release Audit Trail Checklist",
        excerpt:
            "Verification checklist for ensuring every release decision has owner, timestamp, evidence reference, and approval notes attached.",
        category: "checklist",
        industry: "All industries",
        format: "PDF checklist",
        access: "coming-soon",
    },
];

export const getAllResources = (): Resource[] => resources;

export const getFeaturedResource = (): Resource | undefined =>
    resources.find((r) => r.featured);

export const getResourceBySlug = (slug: string): Resource | undefined =>
    resources.find((r) => r.slug === slug);
