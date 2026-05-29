import type { ProofAsset } from "./types";

export const proofAssets = [
    {
        id: "eudr-compliance-bridge",
        type: "case-study",
        title: "EUDR RegOps Bridge",
        body: "A regulated operations bridge for turning document collection, supplier evidence, and submission prep into a deterministic workflow.",
        proves:
            "Invaritech can build audit-ready workflow infrastructure for regulated operations where traceability matters.",
        href: "/work/eudr-compliance-bridge/",
        tags: ["RegOps", "evidence", "reporting bridge"],
    },
    {
        id: "three-way-matcher",
        type: "demo",
        title: "Three-Way Matcher",
        body: "A working AP exception demo that compares purchase orders, goods receipts, and supplier invoices to show mismatch logic clearly.",
        proves:
            "Finance exception handling can be made visible, explainable, and reviewable before payment release.",
        href: "/glossary/three-way-match/",
        tags: ["AP controls", "exceptions", "matching"],
    },
    {
        id: "invoice-extractor",
        type: "tool",
        title: "Invoice Extractor",
        body: "A live extraction tool that turns invoice files into structured fields for review, routing, and downstream finance workflows.",
        proves:
            "Document intake can become structured operational data without losing the review step finance teams need.",
        href: "/resources/invoice-extractor/",
        tags: ["invoice intake", "extractor", "review"],
    },
    {
        id: "supplier-payment-control-rule-table",
        type: "tool",
        title: "Supplier Payment Control Rule Table",
        body: "A rule table for common supplier payment risks, mapped to control checks, review owners, and evidence requirements.",
        proves:
            "Payment control logic can be defined in plain language before it becomes workflow automation.",
        href: "/resources/supplier-payment-control-rule-table/",
        tags: ["payment controls", "rules", "evidence"],
    },
    {
        id: "finance-case-placeholder",
        type: "placeholder",
        title: "Finance Control Build",
        body: "A future proof entry for a finance workflow build that shows before-and-after exception handling, approvals, and audit trail.",
        proves:
            "The proof library will grow around shipped finance operations systems, not generic claims.",
        tags: ["finance operations", "workflow", "case study"],
    },
    {
        id: "regops-case-placeholder",
        type: "placeholder",
        title: "RegOps Workflow Build",
        body: "A future proof entry for regulated operations work that connects evidence intake, review checkpoints, and recurring reporting.",
        proves:
            "RegOps proof will stay tied to deterministic workflow infrastructure and defensible evidence handling.",
        tags: ["RegOps", "evidence", "workflow"],
    },
] satisfies ProofAsset[];
