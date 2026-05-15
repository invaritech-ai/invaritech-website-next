import Link from "next/link";
import { ArrowRight, Clock, Lock } from "lucide-react";
import type { Resource, ResourceCategory } from "@/lib/resources";

const CATEGORY_DISPLAY: Record<ResourceCategory, string> = {
    "rule-table": "Rule Table",
    checklist: "Checklist",
    guide: "Guide",
    calculator: "Calculator",
    template: "Template",
    tool: "Tool",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
    const isComingSoon = resource.access === "coming-soon";
    const isGated = resource.access === "gated";

    return (
        <article
            style={isComingSoon ? { opacity: 0.6 } : undefined}
            className={[
                "flex h-full flex-col gap-5 bg-background p-6",
                isComingSoon
                    ? "cursor-default"
                    : "transition-colors hover:bg-card",
            ].join(" ")}
            aria-label={resource.title}
        >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
                    {CATEGORY_DISPLAY[resource.category]}
                </span>
                {isGated && (
                    <span className="flex items-center gap-1 border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                        <Lock className="size-3" aria-hidden="true" />
                        Gated
                    </span>
                )}
                {isComingSoon && (
                    <span className="flex items-center gap-1 border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                        <Clock className="size-3" aria-hidden="true" />
                        Coming Soon
                    </span>
                )}
            </div>

            {/* Title + excerpt */}
            <div>
                <h3 className="site-card-title">{resource.title}</h3>
                <p className="site-card-body mt-2">{resource.excerpt}</p>
            </div>

            {/* Metadata */}
            <dl className="mt-auto grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5 border-t border-border pt-4">
                <dt className="site-meta">Industry</dt>
                <dd className="text-xs text-foreground-muted">
                    {resource.industry ?? "—"}
                </dd>
                <dt className="site-meta">Format</dt>
                <dd className="text-xs text-foreground-muted">
                    {resource.format}
                </dd>
            </dl>

            {/* CTA — only for available resources with a subpage */}
            {!isComingSoon && resource.subpageHref && (
                <Link
                    href={resource.subpageHref}
                    className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
                    aria-label={`View and request: ${resource.title}`}
                >
                    View &amp; Request
                    <ArrowRight className="size-3" aria-hidden="true" />
                </Link>
            )}
        </article>
    );
}
