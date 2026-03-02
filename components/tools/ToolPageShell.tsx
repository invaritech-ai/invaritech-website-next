import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
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
        <main className="min-h-screen bg-[#030305] relative overflow-hidden">
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <ArtisticBackground />

            <div className="relative z-10 pt-32 pb-24 px-6">
                <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-10">
                        <Link
                            href="/tools/"
                            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            All Tools
                        </Link>
                        <span className="text-white/15 font-mono text-[10px]">/</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">
                            {breadcrumb}
                        </span>
                    </div>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                {eyebrow}
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white mb-6">
                            {titleParts[0]}{" "}
                            <span className="text-primary">{titleParts[1]}</span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            {description}
                        </p>
                    </header>

                    {/* Tool */}
                    {children}

                    {/* Footer context */}
                    {(footerLabel || footerText || footerLink) && (
                        <div className="mt-20 pt-12 border-t border-white/10">
                            {footerLabel && (
                                <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-4">
                                    {footerLabel}
                                </p>
                            )}
                            {footerText && (
                                <p className="text-white/50 text-sm leading-relaxed max-w-xl mb-8">
                                    {footerText}
                                </p>
                            )}
                            {footerLink && (
                                <Link
                                    href={footerLink.href}
                                    className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-primary/70 hover:text-primary transition-colors"
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
