import {
    brandPositioning,
    primaryDiagnosticCta,
    primaryTrustStrip,
    secondaryWorkCta,
} from "./brand";
import type { HeroContent, SectionHeaderContent } from "./types";

type WorkflowColumnContent = {
    title: string;
    items: string[];
};

type MethodStepContent = {
    id: string;
    title: string;
    body: string;
};

type HomePageContent = {
    hero: HeroContent;
    trustStrip: string[];
    problem: {
        header: SectionHeaderContent;
        points: MethodStepContent[];
    };
    workflow: {
        currentStack: WorkflowColumnContent;
        controlLayer: WorkflowColumnContent;
        governedOutcome: WorkflowColumnContent;
    };
    method: {
        header: SectionHeaderContent;
        steps: MethodStepContent[];
    };
    finalCta: {
        title: string;
        body: string;
        cta: typeof primaryDiagnosticCta;
    };
};

export const homePageContent = {
    hero: {
        eyebrow: brandPositioning.short,
        title: "We build the control layer between your finance systems, approvals, evidence, and exceptions.",
        body: brandPositioning.controlLayerDefinition,
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine: brandPositioning.trustLine,
    },
    trustStrip: primaryTrustStrip,
    problem: {
        header: {
            eyebrow: "The work between systems",
            title: "Finance and regulated operations often break in the handoffs.",
            body: "The ledger, inbox, spreadsheet, approval tool, and reporting pack may all be necessary. The risk appears in the gaps between them.",
        },
        points: [
            {
                id: "exceptions-hidden",
                title: "Exceptions hide in manual review",
                body: "Payment holds, PO mismatches, supplier changes, and missing evidence often depend on people remembering the right check.",
            },
            {
                id: "approvals-fragmented",
                title: "Approvals lose their context",
                body: "Review steps happen across email, spreadsheets, and finance systems, making it hard to reconstruct who approved what and why.",
            },
            {
                id: "reporting-bridges-fragile",
                title: "Reporting bridges become fragile",
                body: "Recurring reports rely on copied data, undocumented formulas, and last-minute fixes instead of governed workflow.",
            },
        ],
    },
    workflow: {
        currentStack: {
            title: "Current stack",
            items: ["Finance systems", "Approval tools", "Spreadsheets", "Inboxes", "Evidence folders"],
        },
        controlLayer: {
            title: "Control layer",
            items: ["Rules", "Exceptions", "Approvals", "Evidence", "Audit trail"],
        },
        governedOutcome: {
            title: "Governed outcome",
            items: ["Cleaner releases", "Traceable reviews", "Defensible reporting", "Reusable workflows"],
        },
    },
    method: {
        header: {
            eyebrow: "Method",
            title: "One workflow first. Fixed scope. Managed support when it matters.",
            body: "The practical path is to choose one painful workflow, define the control logic, build around the systems already in place, and keep the result maintained.",
        },
        steps: [
            {
                id: "map-the-workflow",
                title: "Map the workflow",
                body: "Document the systems, actors, decisions, evidence, and exception paths before choosing the build shape.",
            },
            {
                id: "define-control-logic",
                title: "Define the control logic",
                body: "Turn risks into plain-language rules, owners, review checkpoints, and acceptance criteria.",
            },
            {
                id: "ship-governed-automation",
                title: "Ship governed automation",
                body: "Build the workflow layer, prove it against real cases, and hand over a runbook the team can operate.",
            },
        ],
    },
    finalCta: {
        title: "Start with a Finance Workflow Diagnostic.",
        body: "Bring one workflow that is slow, risky, or hard to audit. Leave with the control gaps, build scope, and practical next step.",
        cta: primaryDiagnosticCta,
    },
} satisfies HomePageContent;
