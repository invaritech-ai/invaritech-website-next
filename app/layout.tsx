import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import Script from "next/script";
import "./globals.css";
import { LenisScroll } from "@/components/ui/LenisScroll";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { HeroHeader } from "@/components/header"; 
import FooterSection from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

const geistSans = localFont({
    src: [
        {
            path: "./fonts/Geist-Variable.woff2",
            weight: "100 900",
            style: "normal",
        },
    ],
    variable: "--font-geist-sans",
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
});

const geistMono = localFont({
    src: [
        {
            path: "./fonts/GeistMono-Variable.woff2",
            weight: "100 900",
            style: "normal",
        },
    ],
    variable: "--font-geist-mono",
    display: "swap",
    fallback: ["monospace"],
});

const metadataVerification: Metadata["verification"] = {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
        ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
        : {}),
    ...(process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
        ? { yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION }
        : {}),
};

export const metadata: Metadata = {
    title: {
        default:
            "INVARITECH - Drop-In AI Automations for Enterprises",
        template: "%s | INVARITECH",
    },
    description:
        "Drop-In AI automations for enterprises that cannot afford disruption. In 30 days, INVARITECH delivers one production-grade automation on top of your existing systems with measurable impact.",
    keywords: [
        "INVARITECH",
        "enterprise AI automation",
        "drop-in automation",
        "ops automation sprint",
        "30-day AI automation sprint",
        "workflow automation",
        "custom software",
        "ERP integration",
        "CRM integration",
        "production AI systems",
        "operational efficiency",
        "process automation",
        "infrastructure augmentation",
        "AI ops",
        "enterprise software delivery",
    ],
    authors: [{ name: "INVARITECH", url: "https://www.invaritech.ai" }],
    creator: "INVARITECH",
    publisher: "INVARITECH",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://www.invaritech.ai"),

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.invaritech.ai",
        title: "INVARITECH - Drop-In AI Automations for Enterprises",
        description:
            "We add intelligence to your existing systems safely, incrementally, and measurably. One production-grade automation in 30 days.",
        siteName: "INVARITECH",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH - Drop-In AI Automations for Enterprises",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INVARITECH - Drop-In AI Automations for Enterprises",
        description:
            "In 30 days, get one production-grade AI automation on top of your existing systems, with measurable before/after impact.",
        images: ["/og-image.png"],
        site: "@invaritechai",
    },
    verification: metadataVerification,
    category: "technology",
    classification: "Business",
    referrer: "origin-when-cross-origin",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <head>
                {/* Resource hints for external domains */}
                <link rel="preconnect" href="https://www.google.com" />
                <link
                    rel="preconnect"
                    href="https://www.googletagmanager.com"
                />
                <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
                <link rel="dns-prefetch" href="https://r2.leadsy.ai" />

                {/* Structured data - inline scripts are fine, they don't block */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <LenisScroll>
                        <ArtisticBackground />
                        <div className="relative z-10">
                            <HeroHeader />
                            {children}
                            <FooterSection />
                        </div>
                        <Chatbot />
                    </LenisScroll>
                </ThemeProvider>

                {/* Third-party scripts with optimized loading strategies */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-JJPJBB10G7"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-JJPJBB10G7');
                    `}
                </Script>

                <Script
                    src="https://analytics.ahrefs.com/analytics.js"
                    data-key="A6OV+c4YNtaqQiY6VZk1eg"
                    strategy="lazyOnload"
                />

                <Script
                    id="vtag-ai-js"
                    src="https://r2.leadsy.ai/tag.js"
                    data-pid="1rQPfvIzStzrxlsWj"
                    data-version="062024"
                    strategy="lazyOnload"
                />
            </body>
        </html>
    );
}
