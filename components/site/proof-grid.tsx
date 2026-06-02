import Link from "next/link";
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

export function ProofGrid({ assets, className }: ProofGridProps) {
    if (assets.length === 0) {
        return null;
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
