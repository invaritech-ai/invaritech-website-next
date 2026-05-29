import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ToolCard } from "@/lib/site-content/types";

type ToolDirectoryProps = {
    tools: ToolCard[];
    className?: string;
};

function ToolCardView({ tool }: { tool: ToolCard }) {
    const isComingSoon = tool.status === "coming-soon";

    return (
        <article
            className={cn(
                "site-card h-full",
                isComingSoon ? "cursor-default opacity-60" : undefined,
            )}
        >
            <div className="flex flex-wrap items-center gap-2">
                <p className="site-meta">{tool.category}</p>
                <span className="border border-border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-foreground-subtle">
                    {tool.status}
                </span>
            </div>
            <h3 className="site-h3 mt-6">{tool.title}</h3>
            <p className="site-body mt-4">{tool.body}</p>
        </article>
    );
}

export function ToolDirectory({ tools, className }: ToolDirectoryProps) {
    if (tools.length === 0) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="site-grid-three">
                    {tools.map((tool) =>
                        tool.status !== "coming-soon" && tool.href ? (
                            <Link
                                key={tool.id}
                                href={tool.href}
                                className="block h-full focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <ToolCardView tool={tool} />
                            </Link>
                        ) : (
                            <ToolCardView key={tool.id} tool={tool} />
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}

export default ToolDirectory;
