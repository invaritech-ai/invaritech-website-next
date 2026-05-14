import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

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
        <main className="min-h-screen bg-background relative overflow-hidden">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]" style={{ backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 pt-32 pb-24 px-6">
                <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-10">
                        <Link
                            href="/resources/"
                            className="inline-flex min-h-10 items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-foreground-muted hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                            Resources
                        </Link>
                        <span className="text-border font-mono text-[10px]">/</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle">
                            {breadcrumb}
                        </span>
                    </div>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                {eyebrow}
                            </p>
                        </div>

                        <h1 className="font-editorial text-4xl md:text-6xl font-semibold tracking-tight leading-[0.9] text-foreground mb-6">
                            {titleParts[0]}{" "}
                            <span className="text-primary">{titleParts[1]}</span>
                        </h1>

                        <p className="text-lg text-foreground-muted leading-relaxed max-w-xl">
                            {description}
                        </p>
                    </header>

                    {/* Tool */}
                    {children}

                    {/* Footer context */}
                    {(footerLabel || footerText || footerLink) && (
                        <div className="mt-20 pt-12 border-t border-border">
                            {footerLabel && (
                                <p className="text-foreground-subtle font-mono text-xs uppercase tracking-widest mb-4">
                                    {footerLabel}
                                </p>
                            )}
                            {footerText && (
                                <p className="text-foreground-muted text-sm leading-relaxed max-w-xl mb-8">
                                    {footerText}
                                </p>
                            )}
                            {footerLink && (
                                <Link
                                    href={footerLink.href}
                                    className="inline-flex min-h-10 items-center gap-2 text-sm font-mono tracking-widest uppercase text-primary/80 hover:text-primary transition-colors"
                                >
                                    <ArrowRight className="w-3 h-3" />
                                    {footerLink.label}
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
