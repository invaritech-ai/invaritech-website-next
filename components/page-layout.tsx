import { ReactNode } from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
    children: ReactNode;
    maxWidth?: "6xl" | "7xl" | "5xl";
    header?: {
        title: string;
        description?: string;
    };
    className?: string;
    containerClassName?: string;
}

export function PageLayout({
    children,
    maxWidth = "6xl",
    header,
    className,
    containerClassName,
}: PageLayoutProps) {
    const maxWidthClass = {
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
    }[maxWidth];

    return (
        <main
            className={cn(
                "min-h-screen bg-background relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-32",
                className
            )}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <div
                className={cn(
                    "mx-auto",
                    maxWidthClass,
                    "px-6",
                    containerClassName
                )}
            >
                {/* Optional Header */}
                {header && (
                    <div className="mb-16 max-w-3xl">
                        <TextEffect
                            per="word"
                            as="h1"
                            preset="fade"
                            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
                        >
                            {header.title}
                        </TextEffect>
                        {header.description && (
                            <TextEffect
                                per="line"
                                as="p"
                                preset="fade"
                                delay={0.3}
                                className="text-lg text-muted-foreground md:text-xl leading-relaxed"
                            >
                                {header.description}
                            </TextEffect>
                        )}
                    </div>
                )}

                {/* Page Content */}
                {children}
            </div>
        </main>
    );
}


