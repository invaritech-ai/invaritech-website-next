import type { ProofAsset } from "./types";

export const proofAssets = [
    {
        id: "eudr-compliance-bridge",
        pillar: "regops",
        type: "case-study",
        title: "EUDR Compliance Bridge",
        body: "A compliance automation bridge for turning document collection, supplier evidence, and submission prep into a deterministic workflow.",
        proves:
            "Invaritech can build audit-ready workflow infrastructure for regulated operations where traceability matters.",
        href: "/work/eudr-compliance-bridge/",
        tags: ["compliance automation", "evidence", "reporting bridge"],
    },
    {
        id: "three-way-matcher",
        pillar: "finance-ops",
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
        pillar: "finance-ops",
        type: "tool",
        title: "Invoice Extractor",
        body: "A live extraction tool that turns invoice files into structured fields for review, routing, and downstream finance workflows.",
        proves:
            "Document intake can become structured operational data without losing the review step finance teams need.",
        href: "/resources/invoice-extractor/",
        tags: ["invoice intake", "extractor", "review"],
    },
    {
        id: "accounts-payable-controls",
        pillar: "finance-ops",
        type: "tool",
        title: "Accounts Payable Controls Checklist",
        body: "A live AP controls checklist for deciding the checks, review owners, evidence requirements, and release posture around supplier invoices and payments.",
        proves:
            "Payment control rules can be defined in plain language before they become workflow automation.",
        href: "/resources/accounts-payable-controls/",
        tags: ["payment controls", "AP controls", "evidence"],
    },
] satisfies ProofAsset[];
