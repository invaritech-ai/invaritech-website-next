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
        eyebrow: "Finance Automation",
        title: "Finance automation for AP teams still stuck in manual checks.",
        body: "We add the workflow around Xero, invoices, approvals, payment controls, and month-end work. Your accounting system stays in place. Your accountants keep the judgment. The manual checking becomes visible, routed, and repeatable.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine:
            "Built for document-heavy finance work: invoice exceptions, approval evidence, duplicate payment risk, and close follow-ups.",
    },
    hierarchy: [
        {
            id: "core",
            title: "Start with AP exceptions",
            body: "Most finance automation should start where invoices already break: duplicate bills, missing approvals, supplier detail changes, PO mismatches, and payment holds. We map the checks before we automate anything.",
        },
        {
            id: "expansion",
            title: "Expand after the rules are proven",
            body: "Once the AP workflow is stable, the same checked workflow can support month-end close, cash visibility, reporting bridges, and payment release reviews. The accounting system stays the source of truth.",
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
            title: "Choose the finance automation problem you are trying to solve.",
            body: "Each path points to a live tool, guide, rule table, or article. Start with the part of accounts payable or close work that is causing the most manual review.",
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
                        href: "/glossary/three-way-match/",
                        body: "Use the matcher and guide to see where PO, receipt, and invoice records break.",
                    },
                ],
            },
            {
                id: "check-controls",
                title: "Check controls",
                body: "Review the checks that should happen before invoice approval or payment release.",
                links: [
                    {
                        label: "supplier payment control rule table",
                        href: "/resources/supplier-payment-control-rule-table/",
                        body: "Plain-language control rules for supplier changes, approval gaps, and payment release risk.",
                    },
                    {
                        label: "interactive supplier payment rule table",
                        href: "/resources/supplier-payment-control-rule-table/interactive/",
                        body: "Filter AP controls by trigger, owner, evidence, and release decision.",
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
            eyebrow: "Accounts Payable Automation Patterns",
            title: "Finance automation should start where invoices break.",
            body: "If one of these issues is the bottleneck, start there. These are the places where invoice automation, approval workflows, exception management, and payment controls usually become practical.",
        },
        cards: [
            {
                id: "xero-ap-volume",
                title: "Xero AP exception review",
                body: "For Xero-heavy teams that still review bills through exports, reports, inboxes, and payment-run prep.",
            },
            {
                id: "invoice-approval-workflow",
                title: "Invoice approval workflow",
                body: "Capture who approved the invoice, what evidence they used, and which approval gaps need review before payment.",
            },
            {
                id: "invoice-exception-management",
                title: "Invoice exception management",
                body: "Route missing POs, coding questions, tax issues, amount mismatches, and unresolved supplier questions to the right owner.",
            },
            {
                id: "duplicate-invoice-detection",
                title: "Duplicate invoice detection",
                body: "Check supplier, invoice number, amount, date, PO, and line-item patterns before a second payment leaves the business.",
            },
            {
                id: "three-way-match-exceptions",
                title: "Three-way match exceptions",
                body: "Compare PO, invoice, and receipt records. Surface the mismatch reason clearly instead of burying it in spreadsheet review.",
            },
            {
                id: "payment-controls-release-evidence",
                title: "Payment controls and release evidence",
                body: "Hold payment until supplier changes, approvals, exception notes, and release decisions are recorded.",
            },
        ],
    },
    currentStack: {
        header: {
            eyebrow: "Workflow Model",
            title: "Keep the accounting system. Put the checks around it.",
            body: "The pattern is simple: keep the current stack, make the checks explicit, and record the decision trail. That is the model behind invoice automation, payment controls, and month-end follow-up.",
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
    paidDeployment: {
        header: {
            eyebrow: "When To Bring Us In",
            title: "Use the free tools until the rules depend on your company.",
            body: "Most teams should not buy custom automation because a page says so. A company-specific build starts to make sense when the workflow depends on your chart of accounts, suppliers, approval rules, evidence standards, tenant data, and support expectations.",
        },
        free: [
            {
                id: "free-csv-tools",
                title: "CSV and document tools",
                body: "Use uploaded files to test invoice extraction, matching logic, control rules, and close cost before connecting a live accounting tenant.",
            },
            {
                id: "free-guides",
                title: "Guides and rule tables",
                body: "Use the guides to understand common AP automation patterns before designing rules for one company.",
            },
            {
                id: "free-checks",
                title: "Generic control checks",
                body: "Use common rules for duplicate invoice detection, invoice approval workflow gaps, supplier changes, and payment controls.",
            },
        ],
        paid: [
            {
                id: "tenant-connection",
                title: "Real tenant connection",
                body: "Bring us in when the workflow needs to connect to a real Xero or accounting environment, not only uploaded files.",
            },
            {
                id: "custom-rules",
                title: "Company-specific exception logic",
                body: "The valuable work is encoding your approval rules, supplier patterns, chart of accounts, evidence needs, and payment release controls.",
            },
            {
                id: "managed-support",
                title: "Monitoring, SLA, and support",
                body: "A live workflow needs exception monitoring, rule updates, small improvements, and support when vendors, systems, or reporting requirements change.",
            },
        ],
    },
    finalCta: {
        title: "Share one AP workflow.",
        body: "Send one workflow where invoices, approvals, supplier changes, payment release, or close follow-up still depends on manual checking. We will map the controls and decide whether a free tool is enough or a company-specific build is worth discussing.",
        cta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
    },
} satisfies FinancePageContent;
