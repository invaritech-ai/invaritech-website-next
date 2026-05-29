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
    title: "Governed Workflow Infrastructure Proof",
    description:
        "Proof that Invaritech builds governed workflow infrastructure across regulated submissions, finance exception logic, document extraction, and control-rule tools.",
    openGraph: {
        title: "Governed Workflow Infrastructure Proof | INVARITECH",
        description:
            "Proof that Invaritech builds governed workflow infrastructure across regulated submissions, finance exception logic, document extraction, and control-rule tools.",
        url: "https://www.invaritech.ai/work/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "INVARITECH Work - Governed Workflow Proof" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Governed Workflow Infrastructure Proof | INVARITECH",
        description:
            "Proof that Invaritech builds governed workflow infrastructure across regulated submissions, finance exception logic, document extraction, and control-rule tools.",
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

const proofTypeLabels: Record<ProofAsset["type"], string> = {
    "case-study": "Case study",
    demo: "Working demo",
    tool: "Tool proof",
    placeholder: "Future proof",
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
    return (
        <main className="site-page relative overflow-hidden selection:bg-primary/20 selection:text-primary">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Ghost word */}
            <div className="absolute top-40 -right-20 select-none pointer-events-none opacity-[0.02] whitespace-nowrap z-0 overflow-hidden">
                <span className="font-editorial text-[25rem] font-bold tracking-tighter uppercase text-foreground">
                    PROOF
                </span>
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Governed workflow proof</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Proof we can build governed workflow infrastructure.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Our work spans regulated submissions, finance exception logic, document extraction, and control-rule tools. The common thread is the same: messy workflow in, governed control layer out.
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
                                    RegOps proof case
                                </span>
                                <span className="inline-flex items-center gap-1.5 border border-primary/25 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-mono tracking-wider text-primary">
                                    <div className="h-1 w-1 rounded-full bg-primary" />
                                    Deterministic control layer
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
                                <Button asChild variant="outline" size="lg" className="rounded-none border-border bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all group/btn">
                                    <Link href={featuredProof.href ?? "/work/eudr-compliance-bridge/"} className="flex items-center gap-3">
                                        <span className="text-sm font-semibold uppercase tracking-widest">
                                            View RegOps Case
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-16 flex flex-col gap-4 border-t border-border pt-16 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-primary/40" />
                            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                More proof cards
                            </span>
                        </div>
                        <h2 className="font-editorial text-4xl font-semibold tracking-tight md:text-5xl">
                            Same pattern, different workflow surfaces.
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                        These cards show the operating logic behind the work: exception handling, structured intake, rule definition, and evidence-aware workflow design.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {supportingProofAssets.map((asset, index) => (
                        <ProofCard key={asset.id} asset={asset} index={index + 1} />
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
                        Bring one regulated submission, finance exception, document intake, or approval workflow. We will map the control gaps and define the smallest governed layer worth building.
                    </p>
                    <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold h-14 px-10">
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
