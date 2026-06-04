import Link from "next/link";

import { cn } from "@/lib/utils";
import type { ProofAsset, ToolCard } from "@/lib/site-content/types";

type AvailableWorkGridProps = {
    proofAssets: ProofAsset[];
    tools: ToolCard[];
    className?: string;
};

type AvailableWorkItem = {
    id: string;
    href: string;
    label: string;
    title: string;
    body: string;
    detail?: string;
    tags: string[];
};

const proofTypeLabels: Record<ProofAsset["type"], string> = {
    "case-study": "Case study",
    demo: "Working demo",
    tool: "Live tool",
};

const toolCategoryLabels: Record<ToolCard["category"], string> = {
    matcher: "Live tool",
    extractor: "Live tool",
    "rule-table": "Rule table",
    calculator: "Calculator",
    checker: "Checker",
};

function itemKey(item: { id: string; href?: string }) {
    return item.href ?? item.id;
}

function buildItems(proofAssets: ProofAsset[], tools: ToolCard[]) {
    const liveTools = tools.filter(
        (tool): tool is ToolCard & { href: string } =>
            tool.status === "live" && Boolean(tool.href),
    );
    const liveToolKeys = new Set(liveTools.map(itemKey));
    const seen = new Set<string>();

    const proofItems = proofAssets
        .filter(
            (asset): asset is ProofAsset & { href: string } =>
                Boolean(asset.href),
        )
        .filter(
            (asset) =>
                asset.type === "case-study" || !liveToolKeys.has(itemKey(asset)),
        )
        .map<AvailableWorkItem>((asset) => ({
            id: asset.id,
            href: asset.href,
            label: proofTypeLabels[asset.type],
            title: asset.title,
            body: asset.body,
            detail: asset.proves,
            tags: asset.tags,
        }));

    const toolItems = liveTools.map<AvailableWorkItem>((tool) => ({
        id: tool.id,
        href: tool.href,
        label: toolCategoryLabels[tool.category],
        title: tool.title,
        body: tool.body,
        tags: [tool.category],
    }));

    return [...proofItems, ...toolItems].filter((item) => {
        const key = itemKey(item);

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

export function AvailableWorkGrid({
    proofAssets,
    tools,
    className,
}: AvailableWorkGridProps) {
    const items = buildItems(proofAssets, tools);

    if (items.length === 0) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="available-work-grid">
                    {items.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "available-work-item",
                                index < 2
                                    ? "available-work-item-wide"
                                    : "available-work-item-third",
                            )}
                        >
                            <article className="available-work-card">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="site-meta">{item.label}</p>
                                    <span className="available-work-status">
                                        Available
                                    </span>
                                </div>
                                <h3 className="site-h3 mt-6">{item.title}</h3>
                                <p className="site-body mt-4">{item.body}</p>
                                {item.detail ? (
                                    <p className="site-body mt-6 border-t border-border pt-5 text-base md:text-base">
                                        {item.detail}
                                    </p>
                                ) : null}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="available-work-tag"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
