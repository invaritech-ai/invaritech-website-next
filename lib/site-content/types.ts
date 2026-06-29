export type CTA = {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "text";
};

export type SitePillar = "finance-ops" | "regops";

export type HeroContent = {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: CTA;
    secondaryCta?: CTA;
    trustLine?: string;
};

export type OfferCard = {
    id: string;
    title: string;
    audience: string;
    promise: string;
    includes: string[];
    cta?: CTA;
};

export type ProofAsset = {
    id: string;
    pillar: SitePillar;
    type: "case-study" | "demo" | "tool";
    title: string;
    body: string;
    proves: string;
    href?: string;
    tags: string[];
};

export type ToolCard = {
    id: string;
    title: string;
    body: string;
    href: string;
    category: "matcher" | "extractor" | "calculator" | "checker";
};

export type PageMetadata = {
    title: string;
    description: string;
    canonical: string;
};

export type NavigationItem = {
    label: string;
    href: string;
    section?: string;
};

export type SectionHeaderContent = {
    eyebrow: string;
    title: string;
    body?: string;
};
