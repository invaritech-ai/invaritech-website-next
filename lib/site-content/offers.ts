import { primaryDiagnosticCta } from "./brand";
import type { OfferCard } from "./types";

type OfferStage = {
    id: string;
    title: string;
    body: string;
    offers: OfferCard[];
};

const diagnosticOffers = [
    {
        id: "finance-workflow-diagnostic",
        title: "Manual Workflow Diagnostic",
        audience: "Teams with a manual workflow that keeps escaping the systems they already pay for.",
        promise:
            "Map one workflow, find where checks and handoffs break, and leave with a practical next step before anyone commits to a build.",
        includes: [
            "Workflow and system map",
            "Exception and evidence inventory",
            "Missing checks and handoff risks",
            "Recommended next step",
        ],
        cta: primaryDiagnosticCta,
    },
] satisfies OfferCard[];

const buildOffers = [
    {
        id: "finance-control-sprint",
        title: "Workflow Control Sprint",
        audience: "Teams that need one exception-heavy workflow made checkable, visible, and repeatable.",
        promise:
            "Turn a narrow approval, reconciliation, or reporting process into a workflow with clear rules, owners, and evidence.",
        includes: [
            "Fixed-scope workflow build",
            "Rule table and exception queue",
            "Approval and evidence capture",
            "Acceptance criteria before build starts",
        ],
    },
    {
        id: "finance-ops-automation-build",
        title: "Ops Automation Build",
        audience: "Operators who need a broader automation layer across systems, inboxes, spreadsheets, and approval tools.",
        promise:
            "Build the automation that keeps operations moving, without forcing a system replacement.",
        includes: [
            "Multi-step workflow automation",
            "System and spreadsheet integrations",
            "Reporting bridge and reconciliation logic",
            "Operational handover and support runbook",
        ],
    },
    {
        id: "regops-bridge",
        title: "Compliance Bridge",
        audience: "Teams managing regulated evidence, submissions, client reporting, or recurring compliance operations.",
        promise:
            "Convert document-heavy regulated work into deterministic workflow infrastructure with traceable evidence and review steps.",
        includes: [
            "Evidence intake and validation flow",
            "Submission or reporting bridge",
            "Review checkpoints and audit trail",
            "Reusable operating model for recurring work",
        ],
    },
] satisfies OfferCard[];

const supportOffers = [
    {
        id: "managed-automation-support",
        title: "Managed Automation Support",
        audience: "Teams that want their automation layer maintained as rules, systems, and reporting requirements change.",
        promise:
            "Keep the workflow reliable after launch with monitoring, small improvements, rule updates, and practical support.",
        includes: [
            "Managed support cadence",
            "Rule and copy updates",
            "Workflow monitoring and issue response",
            "Backlog triage for future improvements",
        ],
    },
] satisfies OfferCard[];

export const offerStages = [
    {
        id: "diagnose",
        title: "Diagnose",
        body: "Start with one workflow, the systems around it, and the evidence needed to trust the result.",
        offers: diagnosticOffers,
    },
    {
        id: "build",
        title: "Build",
        body: "Ship in fixed scopes, from finance exception workflows to regulated reporting bridges.",
        offers: buildOffers,
    },
    {
        id: "support",
        title: "Support",
        body: "Keep the workflow useful as teams, rules, vendors, and reporting requirements change.",
        offers: supportOffers,
    },
] satisfies OfferStage[];
