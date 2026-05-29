export type CTA = {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "text";
};

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
    type: "case-study" | "demo" | "tool" | "placeholder";
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
    status: "live" | "coming-soon";
    href?: string;
    category: "extractor" | "calculator" | "rule-table" | "checker";
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
