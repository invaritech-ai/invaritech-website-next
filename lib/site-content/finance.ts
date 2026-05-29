import { primaryDiagnosticCta, secondaryWorkCta } from "./brand";
import { financePageOffers } from "./offers";
import { proofAssets } from "./proof";
import type {
    CTA,
    HeroContent,
    OfferCard,
    ProofAsset,
    SectionHeaderContent,
} from "./types";

type FinancePainCard = {
    id: string;
    title: string;
    body: string;
};

type WorkflowColumn = {
    title: string;
    items: string[];
};

type OfferStageContent = {
    id: string;
    title: string;
    body: string;
    offers: OfferCard[];
};

type ProofNote = {
    title: string;
    body: string;
    href: string;
    ctaLabel: string;
};

type FinancePageContent = {
    hero: HeroContent;
    hierarchy: FinancePainCard[];
    pains: {
        header: SectionHeaderContent;
        cards: FinancePainCard[];
    };
    currentStack: {
        header: SectionHeaderContent;
        currentStack: WorkflowColumn;
        controlLayer: WorkflowColumn;
        outcomes: WorkflowColumn;
    };
    offers: {
        header: SectionHeaderContent;
        stages: OfferStageContent[];
    };
    proof: {
        header: SectionHeaderContent;
        assets: ProofAsset[];
        eudrNote: ProofNote;
    };
    finalCta: {
        title: string;
        body: string;
        cta: CTA;
        secondaryCta: CTA;
    };
};

const financeProofAssetIds = new Set([
    "three-way-matcher",
    "invoice-extractor",
    "supplier-payment-control-rule-table",
]);

export const financePageContent = {
    hero: {
        eyebrow: "Finance exception automation",
        title: "Finance exception automation and payment controls around your current stack.",
        body: "We help finance and accounts payable teams catch duplicate bills, supplier-detail changes, approval gaps, invoice mismatches, and payment release risks without forcing a system replacement.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine:
            "Core: exception automation and payment controls. Expansion: broader finance operations workflows.",
    },
    hierarchy: [
        {
            id: "core",
            title: "Core",
            body: "Exception automation and payment controls for the checks that happen before money leaves the business.",
        },
        {
            id: "expansion",
            title: "Expansion",
            body: "Broader finance operations workflows once the first control layer is stable and useful.",
        },
    ],
    pains: {
        header: {
            eyebrow: "Pain patterns",
            title: "The payment risk usually sits around the accounting system.",
            body: "These are the exception patterns we make visible, routed, and recorded before they become leakage or rework.",
        },
        cards: [
            {
                id: "duplicate-supplier-bills",
                title: "Duplicate supplier bills",
                body: "Flag repeated supplier, amount, date, PO, or invoice references before a second payment run.",
            },
            {
                id: "supplier-bank-detail-changes",
                title: "Supplier bank-detail changes",
                body: "Route changed payment details through defined checks with owner, evidence, and release decision captured.",
            },
            {
                id: "missing-approval-evidence",
                title: "Missing approval evidence",
                body: "Find invoices or releases that have approval gaps, unclear authority, or missing support.",
            },
            {
                id: "po-invoice-receipt-mismatches",
                title: "PO, invoice, and receipt mismatches",
                body: "Compare the records finance needs for three-way review and surface the mismatch reason clearly.",
            },
            {
                id: "payment-release-audit-trail",
                title: "Payment release decisions without a clear audit trail",
                body: "Record who reviewed the exception, what changed, what evidence was used, and why release was approved.",
            },
        ],
    },
    currentStack: {
        header: {
            eyebrow: "Current stack",
            title: "Built around Xero, QuickBooks, NetSuite, spreadsheets, inboxes, and approval tools.",
            body: "The accounting system stores the transaction. Your team still handles the exceptions around it. Invaritech builds the workflow layer that checks, routes, and records those exceptions before they become leakage or rework.",
        },
        currentStack: {
            title: "Current stack",
            items: [
                "Xero, QuickBooks, or NetSuite",
                "Spreadsheets and month-end workbooks",
                "Shared inboxes and supplier emails",
                "Approval tools and evidence folders",
            ],
        },
        controlLayer: {
            title: "Exception and control layer",
            items: [
                "Duplicate bill checks",
                "Supplier-detail change review",
                "Approval evidence capture",
                "Mismatch routing and payment holds",
            ],
        },
        outcomes: {
            title: "Finance operations workflow",
            items: [
                "Clear release decisions",
                "Traceable audit trail",
                "Fewer manual follow-ups",
                "Reusable control logic",
            ],
        },
    },
    offers: {
        header: {
            eyebrow: "Focused offers",
            title: "Diagnose the workflow, build the control, support the automation.",
            body: "The finance page stays focused on exception automation and payment controls first, with broader finance operations builds only after the control logic is clear.",
        },
        stages: [
            {
                id: "diagnose",
                title: "Diagnose",
                body: "Map one exception-heavy workflow and decide what should be checked, routed, and recorded.",
                offers: [financePageOffers[0]],
            },
            {
                id: "build",
                title: "Build",
                body: "Ship the finance control layer around your systems without replacing the stack.",
                offers: [financePageOffers[1], financePageOffers[2]],
            },
            {
                id: "support",
                title: "Support",
                body: "Keep the automation useful as suppliers, approval rules, and finance workflows change.",
                offers: [financePageOffers[3]],
            },
        ],
    },
    proof: {
        header: {
            eyebrow: "Proof",
            title: "Finance controls work best when the rule, evidence, and decision stay together.",
            body: "These assets show the same operating pattern in smaller forms: structured invoice data, three-way mismatch logic, and payment control rules.",
        },
        assets: proofAssets.filter((asset) => financeProofAssetIds.has(asset.id)),
        eudrNote: {
            title: "Lower-page proof note: EUDR bridge",
            body: "The EUDR bridge shows the same delivery discipline applied to regulated submissions: structured validation, review evidence, API bridge behavior, and retry-safe processing.",
            href: "/work/eudr-compliance-bridge/",
            ctaLabel: "View RegOps proof",
        },
    },
    finalCta: {
        title: "Start with a Finance Workflow Diagnostic.",
        body: "Bring one finance workflow where exceptions, approvals, supplier changes, or release decisions are creating risk. We will map the current process and recommend the smallest useful build scope.",
        cta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
    },
} satisfies FinancePageContent;
