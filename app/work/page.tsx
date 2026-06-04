import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";
import { primaryDiagnosticCta } from "@/lib/site-content/brand";
import { proofAssets } from "@/lib/site-content/proof";
import type { ProofAsset } from "@/lib/site-content/types";

export const metadata: Metadata = {
    title: "Finance & Compliance Automation Case Studies",
    description:
        "Proof that Invaritech ships finance and compliance automation across regulated submissions, finance exception logic, document extraction, and rule-based control tools.",
    openGraph: {
        title: "Finance & Compliance Automation Case Studies | INVARITECH",
        description:
            "Proof that Invaritech ships finance and compliance automation across regulated submissions, finance exception logic, document extraction, and rule-based control tools.",
        url: "https://www.invaritech.ai/work/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "INVARITECH Work - Finance & Compliance Automation" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Finance & Compliance Automation Case Studies | INVARITECH",
        description:
            "Proof that Invaritech ships finance and compliance automation across regulated submissions, finance exception logic, document extraction, and rule-based control tools.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/work/",
    },
};

function getProofAsset(id: string) {
    const asset = proofAssets.find((item) => item.id === id);

    if (!asset) {
        throw new Error(`Missing proof asset: ${id}`);
    }

    return asset;
}

const featuredProof = getProofAsset("eudr-compliance-bridge");
const supportingProofAssets = proofAssets.filter((asset) => asset.id !== featuredProof.id);
const financeProofAssets = supportingProofAssets.filter((asset) => asset.pillar === "finance-ops");
const regopsProofAssets = supportingProofAssets.filter((asset) => asset.pillar === "regops");

const proofTypeLabels: Record<ProofAsset["type"], string> = {
    "case-study": "Case study",
    demo: "Working demo",
    tool: "Tool proof",
};

function ProofCard({ asset, index }: { asset: ProofAsset; index: number }) {
    const card = (
        <article className="group/card h-full border border-border bg-card/70 p-6 transition-colors duration-300 hover:border-primary/40 hover:bg-secondary/30">
            <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-primary/50">
                        {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="h-[1px] w-6 bg-primary/30" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                        {proofTypeLabels[asset.type]}
                    </span>
                </div>
                {asset.href ? (
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-primary" />
                ) : null}
            </div>
            <h3 className="font-editorial text-3xl font-semibold leading-tight tracking-tight text-foreground">
                {asset.title}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {asset.body}
            </p>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-foreground/80">
                {asset.proves}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                    <span
                        key={tag}
                        className="border border-border bg-background/40 px-2 py-1 text-[10px] font-mono lowercase text-muted-foreground"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </article>
    );

    if (!asset.href) {
        return card;
    }

    return (
        <Link href={asset.href} className="block h-full">
            {card}
        </Link>
    );
}

export default function WorkPage() {
    const proofSections = [
        {
            id: "finance-ops-proof",
            eyebrow: "Finance automation proof",
            title: "Finance workflows, tools, and demos.",
            body: "Invoice intake, AP matching, and payment control tools show how finance exception logic becomes checkable before payment release.",
            assets: financeProofAssets,
        },
        {
            id: "regops-proof",
            eyebrow: "Compliance automation proof",
            title: "Regulated workflow proof.",
            body: "EUDR work shows the regulated workflow pattern: evidence intake, validation, submission state, retry handling, and audit-ready records.",
            assets: regopsProofAssets,
        },
    ];

    return (
        <main className="site-page relative overflow-hidden selection:bg-primary/20 selection:text-primary">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Finance & Compliance Automation proof</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Real systems we&apos;ve shipped.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Our work spans regulated submissions, finance exception logic, document extraction, and rule-based control tools. Finance automation and compliance automation solve different problems, but the delivery discipline is shared.
                        </p>
                    </div>
                </div>
            </section>

            {/* Proof */}
            <div className="relative z-10 site-container pb-20">
                <div className="group relative mb-24">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center">
                        <Link
                            href={featuredProof.href ?? "/work/eudr-compliance-bridge/"}
                            className="aspect-[4/3] relative overflow-hidden border border-border group/card"
                        >
                            <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-700 pointer-events-none group-hover/card:opacity-100">
                                <div className="absolute inset-0 h-1/2 bg-gradient-to-b from-primary/10 via-transparent to-transparent animate-scan" />
                            </div>

                            <Image
                                src="/eudr-preview.webp"
                                alt={featuredProof.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-20" />
                        </Link>

                        <div className="space-y-8 p-4 md:p-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-[11px] font-mono text-primary/50">01</span>
                                <div className="h-[1px] w-6 bg-primary/30" />
                                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                    Compliance automation proof case
                                </span>
                                <span className="inline-flex items-center gap-1.5 border border-primary/25 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-mono tracking-wider text-primary">
                                    <div className="h-1 w-1 rounded-full bg-primary" />
                                    Deterministic controls
                                </span>
                            </div>

                            <h2 className="font-editorial text-4xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary md:text-6xl">
                                {featuredProof.title}
                            </h2>

                            <p className="text-lg font-light leading-relaxed text-muted-foreground">
                                {featuredProof.body}
                            </p>
                            <p className="border-l-2 border-primary/30 pl-6 text-base leading-relaxed text-foreground/80">
                                {featuredProof.proves}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {featuredProof.tags.map((tag) => (
                                    <span key={tag} className="border border-border bg-card px-2 py-1 text-[10px] font-mono lowercase text-muted-foreground">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Button asChild variant="outline" size="lg" className="border-border bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all group/btn">
                                    <Link href={featuredProof.href ?? "/work/eudr-compliance-bridge/"} className="flex items-center gap-3">
                                        <span className="text-sm font-semibold uppercase tracking-widest">
                                            View Compliance Case
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-20">
                    {proofSections.map((section, sectionIndex) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <div className="mb-16 flex flex-col gap-4 border-t border-border pt-16 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-[1px] w-8 bg-primary/40" />
                                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                            {section.eyebrow}
                                        </span>
                                    </div>
                                    <h2 className="font-editorial text-4xl font-semibold tracking-tight md:text-5xl">
                                        {section.title}
                                    </h2>
                                </div>
                                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                                    {section.body}
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {section.assets.map((asset, index) => (
                                    <ProofCard
                                        key={asset.id}
                                        asset={asset}
                                        index={sectionIndex * 10 + index + 1}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-40 border-t border-border pt-24 text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Start With One Control</span>
                        <div className="h-[1px] w-8 bg-primary/40" />
                    </div>
                    <h2 className="font-editorial text-4xl md:text-6xl font-semibold tracking-tight mb-8 max-w-3xl mx-auto">
                        Have a workflow control problem we should look at?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                        Bring one regulated submission, finance exception, document intake, or approval workflow. We will map where controls are missing and define the smallest useful build.
                    </p>
                    <Button asChild size="lg" className="bg-primary text-white hover:bg-foreground font-semibold h-14 px-10">
                        <Link href={primaryDiagnosticCta.href}>
                            {primaryDiagnosticCta.label}
                        </Link>
                    </Button>
                </div>
            </div>

            <HomepageScrollAnimations />
        </main>
    );
}
