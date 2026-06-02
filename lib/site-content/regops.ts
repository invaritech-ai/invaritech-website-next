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
        eyebrow: "Regulatory operations automation",
        title: "Automation for regulated work that depends on evidence, submissions, and review trails.",
        body: "RegOps is the older proven capability inside Invaritech. We build systems for document intake, validation, regulated submissions, evidence capture, and retry-safe reporting workflows.",
        primaryCta: primaryDiagnosticCta,
        secondaryCta: secondaryWorkCta,
        trustLine:
            "The RegOps library is smaller today. The proof is anchored in shipped EUDR workflow infrastructure.",
    },
    status: [
        {
            id: "proof-first",
            title: "Proof-first pillar",
            body: "RegOps is represented through case notes and technical writing from shipped regulated workflows, not a large free-resource library yet.",
        },
        {
            id: "finance-heavy-library",
            title: "Finance library is larger",
            body: "The current resource library is heavier on Finance Ops because that is where new tools and guides are being published first.",
        },
    ],
    problems: {
        header: {
            eyebrow: "RegOps patterns",
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
            title: "RegOps systems need deterministic checks before automation depth.",
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
            eyebrow: "RegOps proof",
            title: "The proof starts with EUDR.",
            body: "The EUDR bridge shows the RegOps pattern at real volume: structured validation, API bridges, submission evidence, and retry-safe processing.",
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
