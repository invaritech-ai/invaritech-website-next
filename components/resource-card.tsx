import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Resource } from "@/lib/resources";

const CATEGORY_DISPLAY: Record<Resource["category"], string> = {
    calculator: "Calculator",
    checklist: "Checklist",
    guide: "Guide",
    tool: "Tool",
};

const PILLAR_DISPLAY: Record<Resource["pillar"], string> = {
    "finance-ops": "Finance Automation",
    regops: "Compliance Automation",
};

const CTA_DISPLAY: Record<Resource["category"], string> = {
    calculator: "Open Calculator",
    checklist: "Open Checklist",
    guide: "Read Guide",
    tool: "Open Tool",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
    const ctaLabel = CTA_DISPLAY[resource.category];

    return (
        <article
            className="flex h-full flex-col gap-5 bg-background p-6 transition-colors hover:bg-card"
            aria-label={resource.title}
        >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-primary">
                    {CATEGORY_DISPLAY[resource.category]}
                </span>
                <span className="border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                    {PILLAR_DISPLAY[resource.pillar]}
                </span>
            </div>

            {/* Title + excerpt */}
            <div>
                <h3 className="site-card-title">{resource.title}</h3>
                <p className="site-card-body mt-2">{resource.excerpt}</p>
            </div>

            <dl className="mt-auto grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5 border-t border-border pt-4">
                <dt className="site-meta">Industry</dt>
                <dd className="text-xs text-foreground-muted">
                    {resource.industry}
                </dd>
                <dt className="site-meta">Format</dt>
                <dd className="text-xs text-foreground-muted">
                    {resource.format}
                </dd>
            </dl>

            <Link
                href={resource.href}
                className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
                aria-label={`${ctaLabel}: ${resource.title}`}
            >
                {ctaLabel}
                <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
        </article>
    );
}
