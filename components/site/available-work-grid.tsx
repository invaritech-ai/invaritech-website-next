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

/**
 * Static, illustrative micro-previews so each card shows what the asset
 * looks like instead of describing it. Pure markup; hidden from screen
 * readers because the data is illustrative. Stats on the case-study card
 * mirror the published numbers on /work/eudr-compliance-bridge/.
 */
function WorkPreview({ id }: { id: string }) {
    switch (id) {
        case "eudr-compliance-bridge":
            return (
                <div className="work-preview-stats mt-6" aria-hidden="true">
                    <div className="work-preview-stat">
                        <p className="work-preview-stat-value">100k+</p>
                        <p className="work-preview-stat-label">
                            Submissions/mo
                        </p>
                    </div>
                    <div className="work-preview-stat">
                        <p className="work-preview-stat-value">-99%</p>
                        <p className="work-preview-stat-label">
                            Entry errors
                        </p>
                    </div>
                    <div className="work-preview-stat">
                        <p className="work-preview-stat-value">100%</p>
                        <p className="work-preview-stat-label">
                            Traceable
                        </p>
                    </div>
                </div>
            );
        case "three-way-matcher":
            return (
                <div className="work-preview" aria-hidden="true">
                    <div className="work-preview-row">
                        <span className="work-preview-label">Quantity</span>
                        <span className="work-preview-value work-preview-ok">
                            Match
                        </span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">Unit price</span>
                        <span className="work-preview-value work-preview-flag">
                            +5.0% vs PO
                        </span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">Tax code</span>
                        <span className="work-preview-value work-preview-ok">
                            Match
                        </span>
                    </div>
                </div>
            );
        case "invoice-extractor":
            return (
                <div className="work-preview" aria-hidden="true">
                    <div className="work-preview-row">
                        <span className="work-preview-label">Supplier</span>
                        <span className="work-preview-value">
                            Meridian Packaging Co.
                        </span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">Invoice no</span>
                        <span className="work-preview-value">INV-2381</span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">Amount</span>
                        <span className="work-preview-value">$9,384.00</span>
                    </div>
                </div>
            );
        case "cost-to-close-calculator":
            return (
                <div className="work-preview" aria-hidden="true">
                    <div className="work-preview-row">
                        <span className="work-preview-label">
                            Close length
                        </span>
                        <span className="work-preview-value">8 days</span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">
                            Manual checks
                        </span>
                        <span className="work-preview-value">41 hrs/mo</span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">
                            Hidden cost
                        </span>
                        <span className="work-preview-value work-preview-flag">
                            $4,700/mo
                        </span>
                    </div>
                </div>
            );
        case "accounts-payable-controls":
            return (
                <div className="work-preview" aria-hidden="true">
                    <div className="work-preview-row">
                        <span className="work-preview-label">
                            Duplicate check
                        </span>
                        <span className="work-preview-value work-preview-ok">
                            Required
                        </span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">
                            PO match before release
                        </span>
                        <span className="work-preview-value work-preview-ok">
                            Required
                        </span>
                    </div>
                    <div className="work-preview-row">
                        <span className="work-preview-label">
                            Approval owner
                        </span>
                        <span className="work-preview-value work-preview-ok">
                            Named
                        </span>
                    </div>
                </div>
            );
        default:
            return null;
    }
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
                <div className="available-work-grid" data-reveal="stagger">
                    {items.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            data-reveal-child
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
                                <WorkPreview id={item.id} />
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
