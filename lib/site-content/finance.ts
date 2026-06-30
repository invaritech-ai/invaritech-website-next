import { primaryDiagnosticCta, secondaryWorkCta } from "./brand";
import type {
    CTA,
    HeroContent,
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

type FinanceDefinitionPoint = {
    id: string;
    title: string;
    body: string;
};

type FinanceClusterLink = {
    label: string;
    href: string;
    body: string;
};

type FinanceClusterGroup = {
    id: string;
    title: string;
    body: string;
    links: FinanceClusterLink[];
};

type FinancePageContent = {
    hero: HeroContent;
    hierarchy: FinancePainCard[];
    definition: {
        header: SectionHeaderContent;
        points: FinanceDefinitionPoint[];
    };
    startingPoints: {
        header: SectionHeaderContent;
        groups: FinanceClusterGroup[];
    };
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
    paidDeployment: {
        header: SectionHeaderContent;
        free: FinanceDefinitionPoint[];
        paid: FinanceDefinitionPoint[];
    };
    finalCta: {
        title: string;
        body: string;
        cta: CTA;
        secondaryCta: CTA;
    };
};

export const financePageContent = {
    hero: {
        eyebrow: "Workflow Automation",
        title: "Ops automation for manual finance workflows.",
        body: "We help client teams turn repeated manual work into clearer handoffs, checks, evidence, and reporting flows. Your core systems stay in place. The messy work around them becomes visible, routed, and easier to run.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine:
            "Built for document-heavy operations: approvals, evidence, reconciliation, reporting bridges, and repeatable handoffs.",
    },
    hierarchy: [
        {
            id: "core",
            title: "Start with one manual workflow",
            body: "Most useful automation starts where work already breaks: spreadsheet handoffs, inbox approvals, exception lists, copied reports, and follow-up that depends on memory. We map the workflow before we automate anything.",
        },
        {
            id: "expansion",
            title: "Expand after the rules are proven",
            body: "Once the first workflow is stable, the same operating model can support close work, cash visibility, reporting bridges, and client-specific operations. The system of record stays the source of truth.",
        },
    ],
    definition: {
        header: {
            eyebrow: "Definition",
            title: "Finance automation puts checks around the accounting system.",
            body: "The accounting system records approved transactions. The manual work usually happens before and around that record: invoice intake, checks, approvals, evidence, payment holds, and follow-up. Good finance automation makes that work visible without taking accounting judgment away from the team.",
        },
        points: [
            {
                id: "not-erp-replacement",
                title: "Not ERP replacement",
                body: "Xero, QuickBooks, NetSuite, or your ERP stays the system of record. The automation layer handles the work that happens before and around posting.",
            },
            {
                id: "not-accounting-judgment-replacement",
                title: "Not accounting judgment replacement",
                body: "Accountants still decide exceptions. The system makes the evidence, route, owner, and release decision visible.",
            },
            {
                id: "not-just-ocr",
                title: "Not just OCR",
                body: "Invoice OCR is intake. Useful finance automation also checks rules, routes exceptions, captures approvals, and records the audit trail.",
            },
        ],
    },
    startingPoints: {
        header: {
            eyebrow: "Start Here",
            title: "Choose the manual workflow you are trying to improve.",
            body: "Each path points to a live tool, checklist, guide, or article. Start with the part of the workflow that causes the most repeated manual review.",
        },
        groups: [
            {
                id: "learn",
                title: "Understand invoice automation",
                body: "For teams defining automated invoice processing or accounts payable automation.",
                links: [
                    {
                        label: "automated invoice processing guide",
                        href: "/resources/invoice-processing-automation/",
                        body: "OCR, extraction, validation rules, exception routing, invoice approval workflow, and audit trails.",
                    },
                    {
                        label: "invoice data extraction architecture",
                        href: "/blog/ai-invoice-data-extraction/",
                        body: "How invoice files become structured data before AP controls take over.",
                    },
                    {
                        label: "build vs buy automation framework",
                        href: "/blog/building-vs-buying-custom-automation/",
                        body: "When off-the-shelf software works, and when custom automation is rational.",
                    },
                ],
            },
            {
                id: "use-tool",
                title: "Test a narrow workflow",
                body: "Use a small tool before connecting anything to Xero or another accounting system.",
                links: [
                    {
                        label: "free invoice extractor",
                        href: "/resources/invoice-extractor/",
                        body: "Upload a PDF, JPG, or PNG invoice and export structured CSV output for AP review.",
                    },
                    {
                        label: "month-end close cost calculator",
                        href: "/resources/cost-to-close-calculator/",
                        body: "Estimate what a manual close cycle costs before redesigning the workflow.",
                    },
                    {
                        label: "three-way match exceptions",
                        href: "/resources/three-way-match/",
                        body: "Use the matcher and guide to see where PO, receipt, and invoice records break.",
                    },
                ],
            },
            {
                id: "check-controls",
                title: "Check controls",
                body: "Review the checks that should happen before approval, release, or handoff.",
                links: [
                    {
                        label: "accounts payable controls checklist",
                        href: "/resources/accounts-payable-controls/",
                        body: "Interactive AP controls checklist for supplier changes, approval gaps, evidence requirements, and payment release decisions.",
                    },
                    {
                        label: "invoice approval workflow",
                        href: "/resources/invoice-processing-automation/",
                        body: "Where approvals sit in an automated invoice processing workflow.",
                    },
                ],
            },
            {
                id: "evaluate",
                title: "Decide what should be automated",
                body: "Use these when the question moves from learning to prioritising a real build.",
                links: [
                    {
                        label: "month-end close automation",
                        href: "/blog/month-end-close-automation/",
                        body: "How close work breaks when evidence, ownership, and timing are not visible.",
                    },
                    {
                        label: "cash-flow visibility automation",
                        href: "/blog/cash-flow-visibility-automation/",
                        body: "Where recurring forecast work depends on reports, workbooks, and manual refreshes.",
                    },
                    {
                        label: "small business finance automation",
                        href: "/blog/why-small-businesses-need-automation/",
                        body: "A broader finance and operations playbook for founders and lean teams.",
                    },
                ],
            },
        ],
    },
    pains: {
        header: {
            eyebrow: "Manual Workflow Patterns",
            title: "Ops automation should start where handoffs break.",
            body: "If one of these issues is the bottleneck, start there. These are the places where workflow automation, approval routing, exception management, and evidence capture usually become practical.",
        },
        cards: [
            {
                id: "xero-ap-volume",
                title: "Export and report review",
                body: "For teams that still review operational work through exports, reports, inboxes, and manual prep.",
            },
            {
                id: "invoice-approval-workflow",
                title: "Approval workflow",
                body: "Capture who approved the work, what evidence they used, and which approval gaps need review before release.",
            },
            {
                id: "invoice-exception-management",
                title: "Exception management",
                body: "Route missing evidence, coding questions, mismatches, and unresolved follow-up to the right owner.",
            },
            {
                id: "duplicate-invoice-detection",
                title: "Duplicate record detection",
                body: "Check repeated references, amounts, dates, owners, and line-item patterns before duplicate work moves forward.",
            },
            {
                id: "three-way-match-exceptions",
                title: "Matching exceptions",
                body: "Compare records that should agree. Surface the mismatch reason clearly instead of burying it in spreadsheet review.",
            },
            {
                id: "payment-controls-release-evidence",
                title: "Release evidence and controls",
                body: "Hold the release until changes, approvals, exception notes, and decisions are recorded.",
            },
        ],
    },
    currentStack: {
        header: {
            eyebrow: "Workflow Model",
            title: "Keep the system of record. Put the workflow around it.",
            body: "The pattern is simple: keep the current stack, make the checks explicit, and record the decision trail. That is the model behind useful operations automation.",
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
                "Report review",
                "Duplicate record checks",
                "Supplier or customer detail review",
                "Approval evidence capture",
                "Mismatch routing and release holds",
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
    paidDeployment: {
        header: {
            eyebrow: "When To Bring Us In",
            title: "Use the free tools until the rules depend on your company.",
            body: "Most teams should not buy custom automation because a page says so. A client project starts to make sense when the workflow depends on your systems, vendors, customers, approval rules, evidence standards, data, and support expectations.",
        },
        free: [
            {
                id: "free-csv-tools",
                title: "CSV and document tools",
                body: "Use uploaded files to test invoice extraction, matching logic, control rules, and close cost before connecting a live accounting tenant.",
            },
            {
                id: "free-guides",
                title: "Guides and checklists",
                body: "Use the guides to understand common workflow automation patterns before designing rules for one company.",
            },
            {
                id: "free-checks",
                title: "Generic control checks",
                body: "Use common rules for duplicate detection, approval gaps, supplier changes, and release controls.",
            },
        ],
        paid: [
            {
                id: "tenant-connection",
                title: "Real system connection",
                body: "Bring us in when the workflow needs to connect to real systems, not only uploaded files.",
            },
            {
                id: "custom-rules",
                title: "Company-specific exception logic",
                body: "The valuable work is encoding your approval rules, supplier or customer patterns, data model, evidence needs, and release controls.",
            },
            {
                id: "managed-support",
                title: "Monitoring, SLA, and support",
                body: "A live workflow needs exception monitoring, rule updates, small improvements, and support when vendors, systems, or reporting requirements change.",
            },
        ],
    },
    finalCta: {
        title: "Share one manual workflow.",
        body: "Send one workflow where approvals, files, exports, handoffs, or follow-up still depend on manual checking. We will map the work and decide whether a free tool is enough or a client project is worth discussing.",
        cta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
    },
} satisfies FinancePageContent;
