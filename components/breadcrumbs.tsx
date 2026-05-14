import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
    createBreadcrumbItems,
    type BreadcrumbItemInput,
} from "@/lib/breadcrumbs";

interface BreadcrumbsProps {
    items: BreadcrumbItemInput[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    const breadcrumbItems = createBreadcrumbItems(items);

    return (
        <nav
            aria-label="Breadcrumb"
            className={[
                "border-y border-border/70 py-3",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] font-mono uppercase tracking-[0.16em] text-foreground-subtle">
                {breadcrumbItems.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className="flex min-w-0 items-center gap-2"
                    >
                        {item.current || !item.href ? (
                            <span
                                aria-current={item.current ? "page" : undefined}
                                className="truncate font-medium text-foreground"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="truncate text-foreground-muted transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        )}
                        {index < breadcrumbItems.length - 1 && (
                            <ChevronRight
                                className="size-3 shrink-0 text-border"
                                aria-hidden="true"
                            />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
