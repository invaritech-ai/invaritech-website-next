import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProofAsset } from "@/lib/site-content/types";

type ProofGridProps = {
    assets: ProofAsset[];
    className?: string;
};

function ProofCard({ asset }: { asset: ProofAsset }) {
    return (
        <article className="site-card h-full">
            <div className="flex flex-wrap items-center gap-2">
                <p className="site-meta">{asset.type}</p>
                {asset.tags.map((tag) => (
                    <span
                        key={tag}
                        className="border border-border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground-subtle"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <h3 className="site-h3 mt-6">{asset.title}</h3>
            <p className="site-body mt-4">{asset.body}</p>
            <p className="site-body mt-6 border-t border-border pt-5 text-base md:text-base">
                {asset.proves}
            </p>
        </article>
    );
}

function FeaturedProof({ asset }: { asset: ProofAsset }) {
    const content = (
        <article className="group grid overflow-hidden border border-border bg-background lg:grid-cols-[0.92fr_1.08fr]">
            <div className="p-7 md:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="site-meta">{asset.type}</p>
                    {asset.tags.map((tag) => (
                        <span
                            key={tag}
                            className="border border-border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground-subtle"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="site-h2 mt-8 max-w-3xl text-[clamp(2.4rem,5vw,5rem)]">
                    {asset.title}
                </h3>
                <p className="site-lead mt-6 max-w-2xl">{asset.body}</p>
                <p className="site-body mt-8 max-w-2xl border-t border-border pt-6 text-base md:text-lg">
                    {asset.proves}
                </p>
            </div>

            <div className="border-t border-border bg-card/60 lg:border-l lg:border-t-0">
                <div className="grid h-full divide-y divide-border">
                    <div className="p-7 md:p-10">
                        <p className="site-meta text-primary">What was built</p>
                        <p className="site-card-title mt-5">
                            A controlled bridge between evidence intake, validation, submission
                            state, and operator review.
                        </p>
                    </div>
                    <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                        <div className="p-7 md:p-10">
                            <p className="site-meta">Control pattern</p>
                            <p className="site-card-body mt-4">
                                Deterministic checks before regulated submission.
                            </p>
                        </div>
                        <div className="p-7 md:p-10">
                            <p className="site-meta">Evidence trail</p>
                            <p className="site-card-body mt-4">
                                Input, validation, status, response, and final decision remain traceable.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-6 p-7 md:p-10">
                        <p className="site-meta text-foreground">Open the case study</p>
                        <ArrowRight
                            aria-hidden="true"
                            className="size-5 text-primary transition-transform group-hover:translate-x-1"
                        />
                    </div>
                </div>
            </div>
        </article>
    );

    if (!asset.href) {
        return content;
    }

    return (
        <Link
            href={asset.href}
            className="block focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            {content}
        </Link>
    );
}

export function ProofGrid({ assets, className }: ProofGridProps) {
    if (assets.length === 0) {
        return null;
    }

    if (assets.length === 1) {
        return (
            <section className={cn("site-section", className)}>
                <div className="site-container">
                    <FeaturedProof asset={assets[0]} />
                </div>
            </section>
        );
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="site-grid-three">
                    {assets.map((asset) =>
                        asset.href ? (
                            <Link
                                key={asset.id}
                                href={asset.href}
                                className="block h-full focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <ProofCard asset={asset} />
                            </Link>
                        ) : (
                            <ProofCard key={asset.id} asset={asset} />
                        ),
                    )}
                    {Array.from({ length: (3 - (assets.length % 3)) % 3 }).map(
                        (_, fillerIndex) => (
                            <div
                                key={`proof-filler-${fillerIndex}`}
                                aria-hidden
                                className="hidden bg-background md:block"
                            />
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
