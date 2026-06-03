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
        eyebrow: "Finance automation",
        title: "Finance automation that makes teams faster before adding more AP headcount.",
        body: "We build automation around Xero-heavy accounts payable, invoice approvals, duplicate payment risk, payment controls, month-end close, and cash visibility. Your accounting judgment stays with the team.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine:
            "Current publishing focus: Xero accounts payable automation and high-volume AP exception work.",
    },
    hierarchy: [
        {
            id: "core",
            title: "Active wedge",
            body: "Xero and accounts payable workflows where finance teams need better exception review without making every accountant a software power user.",
        },
        {
            id: "expansion",
            title: "Expansion",
            body: "Month-end visibility, cash forecasting, reporting bridges, and payment-control workflows once the first AP system proves value.",
        },
    ],
    pains: {
        header: {
            eyebrow: "Finance automation patterns",
            title: "The work is not only in the ledger. It is around it.",
            body: "These are the patterns we study, explain, and eventually automate for teams with enough volume to justify maintained systems.",
        },
        cards: [
            {
                id: "xero-ap-volume",
                title: "High-volume Xero AP",
                body: "Help accountants review repeated AP exceptions without spending their day inside reports, exports, and payment-run prep.",
            },
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
                title: "Payment releases with no audit trail",
                body: "Record who reviewed the exception, what changed, what evidence was used, and why release was approved.",
            },
            {
                id: "month-end-visibility",
                title: "Month-end visibility",
                body: "Surface unresolved checks, missing inputs, and last-minute reporting issues before close work becomes a spreadsheet chase.",
            },
        ],
    },
    currentStack: {
        header: {
            eyebrow: "Current stack",
            title: "Works with the tools you already run.",
            body: "Your accounting system stores the transaction. Your team still handles the mess around it. We add the workflow that checks, routes, and records the review work.",
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
            title: "Checks we add",
            items: [
                "Xero AP report review",
                "Duplicate bill checks",
                "Supplier-detail change review",
                "Approval evidence capture",
                "Mismatch routing and payment holds",
            ],
        },
        outcomes: {
            title: "What you get",
            items: [
                "More accountant capacity",
                "Clear release decisions",
                "Traceable audit trail",
                "Fewer manual follow-ups",
                "Reusable control rules",
            ],
        },
    },
    offers: {
        header: {
            eyebrow: "Finance automation ladder",
            title: "Publish useful guides. Validate the wedge. Build the paid system later.",
            body: "The first job is TOFU: high-quality explanations and free assets. Paid deployment comes when a company needs its own rules, approvals, and support model.",
        },
        stages: [
            {
                id: "diagnose",
                title: "Explain",
                body: "Create durable guides and resources for Xero AP, invoice approvals, payment controls, and month-end work.",
                offers: [financePageOffers[0]],
            },
            {
                id: "build",
                title: "Validate",
                body: "Use search, page behavior, and build-interest forms to learn which finance workflows deserve product depth.",
                offers: [financePageOffers[1], financePageOffers[2]],
            },
            {
                id: "support",
                title: "Deploy",
                body: "Paid work starts when the team needs company-specific exception logic, monitored workflows, and tight support.",
                offers: [financePageOffers[3]],
            },
        ],
    },
    proof: {
        header: {
            eyebrow: "Proof",
            title: "Finance automation proof starts with useful free assets.",
            body: "The current library is heavier on finance automation because that is where new tools, guides, and Xero/AP content will grow first.",
        },
        assets: proofAssets.filter((asset) => financeProofAssetIds.has(asset.id)),
        eudrNote: {
            title: "Lower-page proof note: EUDR bridge",
            body: "The EUDR bridge applies the same discipline to regulated submissions: structured validation, review evidence, API bridges, and retry-safe processing.",
            href: "/work/eudr-compliance-bridge/",
            ctaLabel: "View compliance automation proof",
        },
    },
    finalCta: {
        title: "Bring us one finance workflow.",
        body: "Pick one where Xero AP, approvals, supplier changes, month-end work, or release decisions are creating drag. We will map what a useful system would need to prove.",
        cta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
    },
} satisfies FinancePageContent;
