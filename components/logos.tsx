"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Logo components using Next.js Image for optimal performance
// AWS Logo - conditionally renders light/dark versions
export const AWS = ({ className }: { className?: string }) => {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return light version during SSR to avoid hydration mismatch
        return (
            <Image
                src="/aws-white.svg"
                alt="AWS"
                width={32}
                height={32}
                className={cn("size-8", className)}
            />
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    return (
        <Image
            src={isDark ? "/aws-dark.svg" : "/aws-white.svg"}
            alt="AWS"
            width={32}
            height={32}
            className={cn("size-8", className)}
        />
    );
};

// Python Logo
export const Python = ({ className }: { className?: string }) => (
    <Image
        src="/Python.svg"
        alt="Python"
        width={32}
        height={32}
        className={cn("size-8", className)}
    />
);

// Next.js Logo - conditionally renders light/dark versions
export const NodeJS = ({ className }: { className?: string }) => {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return light version during SSR to avoid hydration mismatch
        return (
            <Image
                src="/next.svg"
                alt="Next.js"
                width={32}
                height={32}
                className={cn("size-8", className)}
            />
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    return (
        <Image
            src={isDark ? "/next-dark.svg" : "/next.svg"}
            alt="Next.js"
            width={32}
            height={32}
            className={cn("size-8", className)}
        />
    );
};

// Shopify Logo
export const Shopify = ({ className }: { className?: string }) => (
    <Image
        src="/Shopify.svg"
        alt="Shopify"
        width={32}
        height={32}
        className={cn("size-8", className)}
    />
);

// Zapier Logo
export const Zapier = ({ className }: { className?: string }) => (
    <Image
        src="/Zapier.svg"
        alt="Zapier"
        width={32}
        height={32}
        className={cn("size-8", className)}
    />
);

// OpenAI Logo - conditionally renders light/dark versions
export const OpenAI = ({ className }: { className?: string }) => {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return light version during SSR to avoid hydration mismatch
        return (
            <Image
                src="/Openai.svg"
                alt="OpenAI"
                width={32}
                height={32}
                className={cn("size-8", className)}
            />
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    return (
        <Image
            src={isDark ? "/openai-dark.svg" : "/Openai.svg"}
            alt="OpenAI"
            width={32}
            height={32}
            className={cn("size-8", className)}
        />
    );
};

// Legacy logos for backward compatibility
export const Gemini = AWS;
export const Replit = Python;
export const MagicUI = NodeJS;
export const VSCodium = Shopify;
export const MediaWiki = Zapier;
export const GooglePaLM = OpenAI;
