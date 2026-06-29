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
type WorkPreviewRow = {
    label: string;
    value: string;
    status?: "ok" | "flag";
};

const workPreviewRows: Record<string, WorkPreviewRow[]> = {
    "three-way-matcher": [
        { label: "Quantity", value: "Match", status: "ok" },
        { label: "Unit price", value: "+5.0% vs PO", status: "flag" },
        { label: "Tax code", value: "Match", status: "ok" },
    ],
    "invoice-extractor": [
        { label: "Supplier", value: "Meridian Packaging Co." },
        { label: "Invoice no", value: "INV-2381" },
        { label: "Amount", value: "$9,384.00" },
    ],
    "cost-to-close-calculator": [
        { label: "Close length", value: "8 days" },
        { label: "Manual checks", value: "41 hrs/mo" },
        { label: "Hidden cost", value: "$4,700/mo", status: "flag" },
    ],
    "accounts-payable-controls": [
        { label: "Duplicate check", value: "Required", status: "ok" },
        { label: "PO match before release", value: "Required", status: "ok" },
        { label: "Approval owner", value: "Named", status: "ok" },
    ],
};

function WorkPreviewRows({ rows }: { rows: WorkPreviewRow[] }) {
    return (
        <div className="work-preview" aria-hidden="true">
            {rows.map((row) => (
                <div key={row.label} className="work-preview-row">
                    <span className="work-preview-label">{row.label}</span>
                    <span
                        className={cn(
                            "work-preview-value",
                            row.status === "ok" && "work-preview-ok",
                            row.status === "flag" && "work-preview-flag",
                        )}
                    >
                        {row.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

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
                        <p className="work-preview-stat-label">Entry errors</p>
                    </div>
                    <div className="work-preview-stat">
                        <p className="work-preview-stat-value">100%</p>
                        <p className="work-preview-stat-label">Traceable</p>
                    </div>
                </div>
            );
        case "three-way-matcher":
        case "invoice-extractor":
        case "cost-to-close-calculator":
        case "accounts-payable-controls":
            return <WorkPreviewRows rows={workPreviewRows[id]} />;
        default:
            return null;
    }
}

function buildItems(proofAssets: ProofAsset[], tools: ToolCard[]) {
    const toolKeys = new Set(tools.map(itemKey));
    const seen = new Set<string>();

    const proofItems = proofAssets
        .filter((asset): asset is ProofAsset & { href: string } =>
            Boolean(asset.href),
        )
        .filter(
            (asset) =>
                asset.type === "case-study" || !toolKeys.has(itemKey(asset)),
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

    const toolItems = tools.map<AvailableWorkItem>((tool) => ({
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
