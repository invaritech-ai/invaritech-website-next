import type { CTA } from "./types";

export const siteConfig = {
    name: "INVARITECH",
    siteUrl: "https://www.invaritech.ai",
    locale: "en",
    defaultOgImage: "/og-image.png",
};

export const brandPositioning = {
    short: "Finance operations and RegOps automation for teams worldwide.",
    sharp: "We build the control layer between your finance systems, approvals, evidence, and exceptions.",
    controlLayerDefinition:
        "The control layer is the workflow, rules, evidence, approvals, and exception handling that sits around the systems you already use.",
    trustLine: "Asia-based. Globally delivered. Founder-led. Built around your existing systems.",
    footer:
        "Invaritech builds governed finance operations and RegOps automation around the systems teams already use.",
};

export const primaryDiagnosticCta = {
    label: "Book Workflow Diagnostic",
    href: "/contact/?diagnostic=1",
    variant: "primary",
} satisfies CTA;

export const secondaryWorkCta = {
    label: "View Work",
    href: "/work/",
    variant: "secondary",
} satisfies CTA;

export const primaryTrustStrip = [
    "Asia-based",
    "Globally delivered",
    "Founder-led",
    "Built around your existing systems",
] satisfies string[];

export const approvedTerms = [
    "control layer",
    "exceptions",
    "approvals",
    "evidence",
    "audit trail",
    "reconciliation",
    "reporting bridge",
    "governed workflow",
    "current stack",
    "fixed scope",
    "managed support",
] satisfies string[];

export const bannedTerms = [
    "AI transformation",
    "automate anything",
    "future of automation",
    "generic custom software",
    "world-class",
    "cutting-edge",
    "Australia-first",
    "Australian finance teams",
] satisfies string[];
