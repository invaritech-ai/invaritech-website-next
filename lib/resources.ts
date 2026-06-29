export interface Resource {
    slug: string;
    pillar: "finance-ops" | "regops";
    title: string;
    excerpt: string;
    category: "calculator" | "checklist" | "guide" | "tool";
    industry: string;
    format: string;
    href: string;
}

export const resources: Resource[] = [
    {
        slug: "accounts-payable-controls",
        pillar: "finance-ops",
        title: "Accounts Payable Controls Checklist",
        excerpt:
            "Interactive AP controls checklist for invoice approval workflow, payment controls, approval evidence, and payment-release decisions.",
        category: "checklist",
        industry: "All industries",
        format: "Interactive web checklist",
        href: "/resources/accounts-payable-controls/",
    },
    {
        slug: "supermarket-claim-types-worth-checking",
        pillar: "finance-ops",
        title: "20 Supermarket Claim Types Worth Checking",
        excerpt:
            "A public checklist for Australian FMCG suppliers checking retailer deductions, short-pays, debit notes, promo claims, and duplicate credits before they age out.",
        category: "checklist",
        industry: "FMCG suppliers",
        format: "Web checklist",
        href: "/resources/supermarket-claim-types-worth-checking/",
    },
    {
        slug: "three-way-match",
        pillar: "finance-ops",
        title: "Three-Way Match Tool",
        excerpt:
            "Check PO, invoice, and receipt fields before approval. Use the interactive matcher and glossary to classify three-way match exceptions.",
        category: "tool",
        industry: "Manufacturing / Distribution",
        format: "Interactive web tool",
        href: "/glossary/three-way-match/",
    },
    {
        slug: "invoice-processing-automation",
        pillar: "finance-ops",
        title: "Invoice Processing Automation Guide",
        excerpt:
            "A practical guide to automated invoice processing for accounts payable teams: invoice OCR, data extraction, validation rules, exception routing, approval workflow controls, and audit trails.",
        category: "guide",
        industry: "All industries",
        format: "Web guide",
        href: "/resources/invoice-processing-automation/",
    },
    {
        slug: "invoice-extractor",
        pillar: "finance-ops",
        title: "Invoice Data Extractor",
        excerpt:
            "Upload any PDF, JPG, or PNG invoice. AI extracts supplier name, line items, totals, and tax into a clean CSV for accounts payable automation workflows. Free, no signup required.",
        category: "tool",
        industry: "All industries",
        format: "Live tool",
        href: "/resources/invoice-extractor/",
    },
    {
        slug: "cost-to-close-calculator",
        pillar: "finance-ops",
        title: "Cost-to-Close Calculator",
        excerpt:
            "Three inputs. See how much your month-end close cycle costs annually and what automation saves. No signup required.",
        category: "calculator",
        industry: "All industries",
        format: "Live calculator",
        href: "/resources/cost-to-close-calculator/",
    },
    {
        slug: "eudr-regops-bridge-case-note",
        pillar: "regops",
        title: "EUDR Compliance Bridge Case Note",
        excerpt:
            "A compliance automation case note: evidence intake, structured validation, submission bridges, retry handling, and audit-ready status tracking.",
        category: "guide",
        industry: "Regulated operations",
        format: "Case note",
        href: "/work/eudr-compliance-bridge/",
    },
];
