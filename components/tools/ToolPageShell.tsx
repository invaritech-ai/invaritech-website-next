import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface ToolPageShellProps {
    breadcrumb: string;
    eyebrow: string;
    /** [unhighlighted, highlighted] — renders as "{unhighlighted} <primary>{highlighted}</primary>" */
    titleParts: [string, string];
    description: string;
    maxWidth?: "3xl" | "4xl";
    footerLabel?: string;
    footerText?: string;
    footerLink?: { href: string; label: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonLd?: Record<string, any>;
    children: ReactNode;
}

const maxWidthClasses: Record<NonNullable<ToolPageShellProps["maxWidth"]>, string> = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
};

export function ToolPageShell({
    breadcrumb,
    eyebrow,
    titleParts,
    description,
    maxWidth = "4xl",
    footerLabel,
    footerText,
    footerLink,
    jsonLd,
    children,
}: ToolPageShellProps) {
    return (
        <main className="site-page" id="main-content" tabIndex={-1}>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            {/* Breadcrumb */}
            <div className="site-container pt-32 md:pt-36">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Resources", href: "/resources/" },
                        { label: breadcrumb },
                    ]}
                />
            </div>

            {/* Hero */}
            <section className="pt-16 pb-14 md:pt-20 md:pb-20">
                <div className="site-container">
                    <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                {eyebrow}
                            </p>
                        </div>

                        <h1 className="site-h2 mb-6">
                            {titleParts[0]}{" "}
                            <span className="text-primary">{titleParts[1]}</span>
                        </h1>

                        <p className="site-lead max-w-2xl">{description}</p>
                    </div>
                </div>
            </section>

            {/* Tool content */}
            <section className="pb-24">
                <div className="site-container">
                    <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
                        {children}
                    </div>
                </div>
            </section>

            {/* Footer context */}
            {(footerLabel || footerText || footerLink) && (
                <section className="site-section pt-0">
                    <div className="site-container">
                        <div className={`${maxWidthClasses[maxWidth]} mx-auto border-t border-border pt-12`}>
                            {footerLabel && (
                                <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-foreground-subtle">
                                    {footerLabel}
                                </p>
                            )}
                            {footerText && (
                                <p className="site-body max-w-3xl">{footerText}</p>
                            )}
                            {footerLink && (
                                <Link
                                    href={footerLink.href}
                                    className="mt-7 inline-flex min-h-10 items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-primary transition-colors hover:text-foreground"
                                >
                                    <ArrowRight className="size-3" aria-hidden="true" />
                                    {footerLink.label}
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
