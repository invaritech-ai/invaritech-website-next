import {
    brandPositioning,
    primaryDiagnosticCta,
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

type PillarCardContent = {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    ctaLabel: string;
    proof: string[];
};

type HomePageContent = {
    hero: HeroContent;
    pillars: {
        header: SectionHeaderContent;
        cards: PillarCardContent[];
    };
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
        eyebrow: "We build the checks your tools skip",
        title: "Finance automation and compliance automation for teams still running on manual checks.",
        body: "We build around messy invoices, approvals, exceptions, and audit trails: invoice approval, month-end close, evidence intake. Your finance and compliance systems stay in place.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: {
            label: "View Proof",
            href: "/work/",
            variant: "secondary",
        },
        trustLine: brandPositioning.trustLine,
    },
    pillars: {
        header: {
            eyebrow: "Two workflow families",
            title: "Choose the workflow family first.",
            body: "Finance automation covers AP, approvals, payment controls, close work, and cash visibility. Compliance automation covers regulated submissions, evidence intake, review checkpoints, and audit trails. Both depend on the same discipline: checks, evidence, review paths, and maintained systems.",
        },
        cards: [
            {
                id: "finance-ops",
                eyebrow: "For AP, close, and cash teams",
                title: "Finance automation",
                body: "For accounts payable, invoice approval workflows, Xero AP automation, duplicate payment risk, payment controls, month-end close, and cash visibility.",
                href: "/finance-automation/",
                ctaLabel: "Explore Finance Automation",
                proof: [
                    "Xero AP automation direction",
                    "Invoice approval workflows",
                    "Payment control resources",
                ],
            },
            {
                id: "regops",
                eyebrow: "For compliance and reporting teams",
                title: "Compliance automation",
                body: "For regulatory compliance submissions, evidence intake, review checkpoints, reporting bridges, and audit trails in document-heavy compliance work.",
                href: "/regulatory-operations-automation/",
                ctaLabel: "Explore Compliance Automation",
                proof: [
                    "EUDR bridge proof",
                    "Compliance operations guides",
                    "Evidence-heavy workflows",
                ],
            },
            {
                id: "claims-desk",
                eyebrow: "For FMCG suppliers",
                title: "Claims Desk",
                body: "Supply supermarkets? Retailer deductions and trade claims pile up faster than your team can check them. Claims Desk tears down a batch of your claims and shows what looks recoverable. The teardown is free.",
                href: "https://claims-desk.invaritech.ai/?utm_source=invaritech&utm_medium=card&utm_campaign=claims-desk",
                ctaLabel: "Get a free teardown",
                proof: [
                    "Built for FMCG suppliers",
                    "Retailer deductions and claims",
                    "Free claims teardown",
                ],
            },
        ],
    },
    problem: {
        header: {
            eyebrow: "The work between systems",
            title: "Your tools work. The handoffs between them still need owners.",
            body: "Finance and regulated teams already have systems. The slow work usually sits between them: copied reports, email approvals, document evidence, and exceptions someone has to remember.",
        },
        points: [
            {
                id: "exceptions-hidden",
                title: "Exceptions hide in manual review",
                body: "Payment holds, PO mismatches, supplier changes, submission errors, and missing evidence often depend on people remembering the right check.",
            },
            {
                id: "approvals-fragmented",
                title: "Approvals lose their context",
                body: "Review steps happen across email, spreadsheets, finance systems, and portals, making it hard to reconstruct who approved what and why.",
            },
            {
                id: "reporting-bridges-fragile",
                title: "Reporting bridges become fragile",
                body: "Recurring reports lean on copied data, undocumented formulas, and last-minute fixes. The evidence is hard to defend later.",
            },
        ],
    },
    workflow: {
        currentStack: {
            title: "Current stack",
            items: ["Finance systems", "Approval tools", "Spreadsheets", "Inboxes", "Evidence folders"],
        },
        controlLayer: {
            title: "Checks we add",
            items: ["Rules", "Exceptions", "Approvals", "Evidence", "Audit trail"],
        },
        governedOutcome: {
            title: "What you get",
            items: ["Cleaner releases", "Traceable reviews", "Defensible reporting", "Reusable workflows"],
        },
    },
    method: {
        header: {
            eyebrow: "Method",
            title: "One workflow first. Fixed scope. We stay after launch.",
            body: "The practical path is to choose one painful workflow, write the control rules, build around the systems already in place, and keep the result maintained.",
        },
        steps: [
            {
                id: "map-the-workflow",
                title: "Map the workflow",
                body: "Document the systems, actors, decisions, evidence, and exception paths before choosing the build shape.",
            },
            {
                id: "define-control-logic",
                title: "Write the control rules",
                body: "Turn risks into plain-language rules, owners, review checkpoints, and acceptance criteria.",
            },
            {
                id: "ship-governed-automation",
                title: "Ship it and hand it over",
                body: "Build the workflow, prove it against real cases, and hand over a runbook the team can operate.",
            },
        ],
    },
    finalCta: {
        title: "Bring us one messy workflow.",
        body: "Pick one that is slow, risky, or hard to audit. We will map the gaps and tell you what a useful first system would need to prove.",
        cta: primaryDiagnosticCta,
    },
} satisfies HomePageContent;
