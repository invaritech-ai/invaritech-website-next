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
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                {breadcrumbItems.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className="flex min-w-0 items-center gap-2"
                    >
                        {item.current || !item.href ? (
                            <span
                                aria-current={item.current ? "page" : undefined}
                                className="truncate text-foreground/70"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="truncate transition-colors hover:text-foreground"
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
