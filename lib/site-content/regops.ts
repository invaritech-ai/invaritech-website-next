import { primaryDiagnosticCta, secondaryWorkCta } from "./brand";
import { proofAssets } from "./proof";
import type { CTA, HeroContent, ProofAsset, SectionHeaderContent } from "./types";

type RegOpsCard = {
    id: string;
    title: string;
    body: string;
};

type RegOpsPageContent = {
    hero: HeroContent;
    status: RegOpsCard[];
    problems: {
        header: SectionHeaderContent;
        cards: RegOpsCard[];
    };
    operatingModel: {
        header: SectionHeaderContent;
        cards: RegOpsCard[];
    };
    proof: {
        header: SectionHeaderContent;
        assets: ProofAsset[];
    };
    finalCta: {
        title: string;
        body: string;
        cta: CTA;
        secondaryCta: CTA;
    };
};

export const regopsPageContent = {
    hero: {
        eyebrow: "Compliance automation",
        title: "Compliance automation for regulated work that runs on evidence, submissions, and review trails.",
        body: "We build systems for document intake, validation, regulated submissions, evidence capture, and retry-safe reporting workflows. The work stays defensible because every check, handoff, and submission state is visible.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine:
            "Shown through shipped EUDR workflow infrastructure: structured validation, submission state, and evidence trails.",
    },
    status: [
        {
            id: "submission-control",
            title: "Control before submission",
            body: "Regulated work needs required-field checks, evidence references, status tracking, and review ownership before anything reaches an external system.",
        },
        {
            id: "traceable-output",
            title: "Traceable output",
            body: "The goal is not just faster filing. It is a workflow where operators can reconstruct the input, validation result, submission attempt, response, and final decision.",
        },
    ],
    problems: {
        header: {
            eyebrow: "Compliance automation patterns",
            title: "Manual compliance breaks when volume, evidence, and regulator interfaces collide.",
            body: "The pain is not only regulation. It is the operational work around regulation: documents, schemas, approvals, retries, status tracking, and proof.",
        },
        cards: [
            {
                id: "evidence-intake",
                title: "Evidence intake",
                body: "Collect supplier, client, document, and submission evidence without losing who supplied what and when.",
            },
            {
                id: "validation",
                title: "Validation before submission",
                body: "Check required fields, document structure, identifiers, geo-data, and review rules before a regulated system receives bad data.",
            },
            {
                id: "submission-bridges",
                title: "Submission bridges",
                body: "Connect internal workflows to external portals, APIs, SOAP interfaces, or recurring reporting processes.",
            },
            {
                id: "retry-safe-processing",
                title: "Retry-safe processing",
                body: "Separate transient failures from real errors and keep status updates traceable.",
            },
            {
                id: "audit-trails",
                title: "Audit trails",
                body: "Maintain a defensible trail of inputs, reviews, submission attempts, responses, and final decisions.",
            },
        ],
    },
    operatingModel: {
        header: {
            eyebrow: "Operating model",
            title: "Compliance automation needs deterministic checks before automation depth.",
            body: "We start by naming the evidence, actors, validation rules, status paths, and failure modes. Then we build the workflow around the existing systems.",
        },
        cards: [
            {
                id: "map",
                title: "Map the regulated workflow",
                body: "Document the evidence, owners, portals, system boundaries, validation rules, and status lifecycle.",
            },
            {
                id: "build",
                title: "Build the bridge",
                body: "Create the intake, validation, submission, retry, and reporting paths with clear acceptance criteria.",
            },
            {
                id: "maintain",
                title: "Maintain the workflow",
                body: "Keep rules, evidence requirements, and status handling current as regulations and operating processes change.",
            },
        ],
    },
    proof: {
        header: {
            eyebrow: "Compliance automation example",
            title: "The EUDR bridge shows the pattern.",
            body: "The EUDR bridge shows the compliance automation pattern at real volume: structured validation, API bridges, submission evidence, and retry-safe processing.",
        },
        assets: proofAssets.filter((asset) => asset.pillar === "regops"),
    },
    finalCta: {
        title: "Bring us one regulated workflow.",
        body: "Pick one where evidence intake, status tracking, submissions, or approval trails are creating operational risk. We will map the workflow and identify what a useful first system would need to prove.",
        cta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
    },
} satisfies RegOpsPageContent;
