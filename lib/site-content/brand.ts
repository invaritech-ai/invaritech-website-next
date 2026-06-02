import type { CTA } from "./types";

export const siteConfig = {
    name: "INVARITECH",
    siteUrl: "https://www.invaritech.ai",
    locale: "en",
    defaultOgImage: "/og-image.png",
};

export const brandPositioning = {
    short: "Finance operations and RegOps automation for teams worldwide.",
    sharp: "We automate the finance checks your team still does by hand.",
    controlLayerDefinition:
        "We build the checks, approvals, and audit trail around the tools you already use. No rip and replace.",
    trustLine: "Asia-based. Globally delivered. Founder-led. Built around your existing systems.",
    footer:
        "Invaritech builds finance operations and RegOps automation around the tools teams already use.",
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
