import type { PageMetadata } from "./types";

export const pageMetadata = {
    home: {
        title: "Finance Operations and RegOps Automation | INVARITECH",
        description:
            "Invaritech builds finance operations and RegOps automation for teams worldwide: payment controls, exception workflows, reporting bridges, and audit-ready internal tools around the systems they already use.",
        canonical: "/",
    },
    financeExceptionAutomation: {
        title: "Finance Exception Automation | INVARITECH",
        description:
            "Build governed finance workflows for payment controls, approval gaps, supplier changes, reconciliations, and the evidence trail around your current systems.",
        canonical: "/finance-exception-automation/",
    },
    work: {
        title: "Proof Library | INVARITECH",
        description:
            "Explore shipped systems, demos, tools, and case studies that show how Invaritech builds governed control layers for finance operations and RegOps work.",
        canonical: "/work/",
    },
    eudrComplianceBridge: {
        title: "EUDR RegOps Bridge Case Study | INVARITECH",
        description:
            "See how a deterministic reporting bridge can turn regulated evidence collection into a governed workflow with traceable submissions.",
        canonical: "/work/eudr-compliance-bridge/",
    },
    resources: {
        title: "Tools and Resources | INVARITECH",
        description:
            "Free tools and guides for finance controls, exceptions, reconciliation, reporting bridges, and audit-ready evidence workflows.",
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
            "Book a diagnostic to map one finance or regulated operations workflow, identify control gaps, and define a fixed-scope automation path.",
        canonical: "/contact/",
    },
    blog: {
        title: "Finance Operations and RegOps Guides | INVARITECH",
        description:
            "Guides on payment controls, exception workflows, reporting bridges, evidence trails, and governed automation for operational teams.",
        canonical: "/blog/",
    },
} satisfies Record<string, PageMetadata>;
