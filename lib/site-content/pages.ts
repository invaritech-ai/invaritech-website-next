import type { PageMetadata } from "./types";

export const pageMetadata = {
    home: {
        title: "Finance Ops and RegOps Automation | INVARITECH",
        description:
            "Automation for Finance Ops and RegOps teams handling messy documents, approvals, exceptions, and evidence trails around existing systems.",
        canonical: "/",
    },
    financeOperationsAutomation: {
        title: "Finance Operations Automation",
        description:
            "Finance operations automation for accounts payable, payment controls, invoice approval workflows, month-end visibility, and Xero-heavy teams.",
        canonical: "/finance-operations-automation/",
    },
    regulatoryOperationsAutomation: {
        title: "Regulatory Operations Automation",
        description:
            "RegOps automation for regulated submissions, evidence intake, review checkpoints, reporting bridges, and audit-ready operational workflows.",
        canonical: "/regulatory-operations-automation/",
    },
    work: {
        title: "Proof Library | INVARITECH",
        description:
            "Explore Finance Ops and RegOps proof: shipped systems, demos, tools, and case studies for checkable workflows and evidence-heavy operations.",
        canonical: "/work/",
    },
    eudrComplianceBridge: {
        title: "EUDR RegOps Bridge Case Study | INVARITECH",
        description:
            "See how a reliable reporting bridge turns regulated evidence collection into a checkable workflow with traceable submissions.",
        canonical: "/work/eudr-compliance-bridge/",
    },
    resources: {
        title: "Tools and Resources | INVARITECH",
        description:
            "Free Finance Ops and RegOps tools, guides, rule tables, checklists, and templates for exception handling, evidence, and workflow automation.",
        canonical: "/resources/",
    },
    about: {
        title: "About INVARITECH",
        description:
            "Invaritech is an Asia-based, founder-led automation studio building finance operations and RegOps systems around the tools teams already use.",
        canonical: "/about/",
    },
    contact: {
        title: "Book a Finance Workflow Diagnostic | INVARITECH",
        description:
            "Book a diagnostic to map one finance or regulated operations workflow, find where controls are missing, and define a fixed-scope automation path.",
        canonical: "/contact/",
    },
    blog: {
        title: "Finance Ops and RegOps Guides | INVARITECH",
        description:
            "Guides on payment controls, exception workflows, reporting bridges, evidence trails, and workflow automation for operational teams.",
        canonical: "/blog/",
    },
} satisfies Record<string, PageMetadata>;
