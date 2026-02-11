import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import Script from "next/script";
import "./globals.css";

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
            "INVARITECH - Automation & Back-Office Systems for Small Service Businesses",
        template: "%s | INVARITECH",
    },
    description:
        "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites. Stop losing time between tools.",
    keywords: [
        "INVARITECH",
        "business automation",
        "workflow automation",
        "compliance automation",
        "back-office systems",
        "data pipelines",
        "API integration",
        "freelancer tools",
        "agency management",
        "custom automation",
        "small business software",
        "process automation",
        "compliance bridge",
        "weekendsuite",
        "backend development",
        "AI automation",
        "custom software",
        "database design",
        "web development",
        "digital transformation",
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
        title: "INVARITECH - Automation & Back-Office Systems for Small Service Businesses",
        description:
            "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites. Stop losing time between tools.",
        siteName: "INVARITECH",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "INVARITECH - Automation & Back-Office Systems",
                type: "image/webp",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INVARITECH - Automation & Back-Office Systems",
        description:
            "Custom automation for small service businesses. Compliance bridges, data pipelines, and admin suites. Stop losing time between your tools.",
        images: ["/og-image.webp"],
        creator: "@invaritechai",
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

import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

// ... imports ...

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
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
                {/* <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "INVARITECH",
                            url: "https://www.invaritech.ai",
                            logo: "https://www.invaritech.ai/logo-image.png",
                            sameAs: [
                                "https://linkedin.com/company/invaritechai",
                                "https://x.com/invaritechai",
                            ],
                        }),
                    }}
                /> */}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <HeroHeader />
                    {children}
                    <FooterSection />
                    <Chatbot />
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
