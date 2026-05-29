import { cn } from "@/lib/utils";
import type { SectionHeaderContent } from "@/lib/site-content/types";

type SectionHeaderProps = {
    content: SectionHeaderContent;
    align?: "left" | "center";
    className?: string;
    headingId?: string;
};

export function SectionHeader({
    content,
    align = "left",
    className,
    headingId,
}: SectionHeaderProps) {
    return (
        <header
            className={cn(
                align === "center"
                    ? "site-header-center"
                    : "max-w-4xl",
                className,
            )}
        >
            <p className="site-meta">{content.eyebrow}</p>
            <h2 id={headingId} className="site-h2 mt-4">
                {content.title}
            </h2>
            {content.body ? (
                <p className="site-body mt-6">{content.body}</p>
            ) : null}
        </header>
    );
}

export default SectionHeader;
