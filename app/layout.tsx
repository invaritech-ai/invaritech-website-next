import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import { faqSchema } from "@/lib/faq-schema";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
    fallback: ["monospace"],
});

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
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH - Automation & Back-Office Systems",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INVARITECH - Automation & Back-Office Systems",
        description:
            "Custom automation for small service businesses. Compliance bridges, data pipelines, and admin suites. Stop losing time between your tools.",
        images: ["/og-image.png"],
        creator: "@invaritech",
        site: "@invaritech",
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        yahoo: "your-yahoo-verification-code",
    },
    category: "technology",
    classification: "Business",
    referrer: "origin-when-cross-origin",
};

import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";

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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://www.google.com" />
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
                <link rel="dns-prefetch" href="https://r2.leadsy.ai" />
                
                {/* Structured data - inline scripts are fine, they don't block */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
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
