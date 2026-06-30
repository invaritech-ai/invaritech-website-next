import type { PageMetadata } from "./types";

export const pageMetadata = {
    home: {
        title: "Finance Automation & Compliance Automation | INVARITECH",
        description:
            "Finance automation and compliance automation for document-heavy teams: invoice approval, accounts payable, month-end close, evidence, and audit trails around your existing systems.",
        canonical: "/",
    },
    financeAutomation: {
        title: "Workflow Automation for Finance Operations | INVARITECH",
        description:
            "Ops automation for manual finance workflows: approvals, evidence, exceptions, reporting bridges, and close follow-up around the systems you already use.",
        canonical: "/finance-automation/",
    },
    regulatoryOperationsAutomation: {
        title: "Compliance Automation for Regulated Teams | INVARITECH",
        description:
            "Compliance automation for regulated submissions, evidence intake, and audit trails. Turn manual review into a checkable workflow, built around your existing tools.",
        canonical: "/regulatory-operations-automation/",
    },
    work: {
        title: "Case Studies & Proof | INVARITECH",
        description:
            "Real finance and compliance automation proof: shipped systems, demos, tools, and case studies for checkable workflows and evidence-heavy operations.",
        canonical: "/work/",
    },
    eudrComplianceBridge: {
        title: "EUDR Compliance Bridge Case Study | INVARITECH",
        description:
            "See how a reliable reporting bridge turns regulated evidence collection into a checkable workflow with traceable submissions.",
        canonical: "/work/eudr-compliance-bridge/",
    },
    resources: {
        title: "Free Finance & Compliance Automation Tools | INVARITECH",
        description:
            "Free finance and compliance automation tools, guides, control checklists, and templates for exception handling, evidence, and workflow automation.",
        canonical: "/resources/",
    },
    about: {
        title: "About INVARITECH",
        description:
            "Invaritech is an Asia-based, founder-led automation studio building finance and compliance automation around the tools teams already use.",
        canonical: "/about/",
    },
    contact: {
        title: "Share a Manual Workflow | INVARITECH",
        description:
            "Share one manual workflow so we can map the handoffs, checks, evidence, and smallest useful next step.",
        canonical: "/contact/",
    },
    blog: {
        title: "Finance & Compliance Automation Guides | INVARITECH",
        description:
            "Guides on payment controls, invoice approval, exception workflows, evidence trails, and workflow automation for finance and compliance teams.",
        canonical: "/blog/",
    },
} satisfies Record<string, PageMetadata>;
