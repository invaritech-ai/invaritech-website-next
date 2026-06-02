import type { CTA } from "./types";

export const siteConfig = {
    name: "INVARITECH",
    siteUrl: "https://www.invaritech.ai",
    locale: "en",
    defaultOgImage: "/og-image.png",
};

export const brandPositioning = {
    short: "Finance Ops and RegOps automation for document-heavy teams.",
    sharp: "We build automation for the finance and regulated work that still runs on manual checks.",
    controlLayerDefinition:
        "We build the checks, approvals, and evidence trails around the tools you already use. No rip and replace.",
    trustLine: "Asia-based. Globally delivered. Founder-led. Built around your existing systems.",
    footer:
        "Invaritech builds Finance Ops and RegOps automation around the tools teams already use.",
};

export const primaryDiagnosticCta = {
    label: "Share a Workflow",
    href: "/contact/?diagnostic=1",
    variant: "primary",
} satisfies CTA;

export const secondaryWorkCta = {
    label: "View Work",
    href: "/work/",
    variant: "secondary",
} satisfies CTA;
