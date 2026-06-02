import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import Script from "next/script";
import "./globals.css";
import "@fontsource-variable/source-sans-3";
import { LenisScroll } from "@/components/ui/LenisScroll";
import { HeroHeader } from "@/components/header";
import SiteSpotlight from "@/components/hero-spotlight";
import FooterSection from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { AttributionCapture } from "@/components/attribution-capture";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        default: "Finance Ops and RegOps Automation | INVARITECH",
        template: "%s | INVARITECH",
    },
    description:
        "Automation for Finance Ops and RegOps teams handling messy documents, approvals, exceptions, and evidence trails around existing systems.",
    keywords: [
        "INVARITECH",
        "finance operations automation",
        "Finance Ops automation",
        "RegOps automation",
        "regulatory operations automation",
        "finance operations",
        "accounts payable controls",
        "invoice exception management",
        "supplier payment controls",
        "payment approval workflow",
        "reporting bridge",
        "audit trail automation",
        "finance exception automation",
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
        locale: "en",
        url: "https://www.invaritech.ai",
        title: "Finance Ops and RegOps Automation | INVARITECH",
        description:
            "Automation for Finance Ops and RegOps teams handling messy documents, approvals, exceptions, and evidence trails around existing systems.",
        siteName: "INVARITECH",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Finance Ops and RegOps Automation | INVARITECH",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Finance Ops and RegOps Automation | INVARITECH",
        description:
            "Automation for Finance Ops and RegOps teams worldwide around the systems they already use.",
        images: ["/og-image.png"],
        site: "@invaritechai",
    },
    verification: metadataVerification,
    category: "technology",
    classification: "Business",
    referrer: "origin-when-cross-origin",
    icons: {
        icon: [
            { url: "/invaritech-icon.svg", type: "image/svg+xml" },
            { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
        ],
        shortcut: "/favicon.ico",
        apple: "/icon-192.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="light">
            <head>
                <meta
                    name="facebook-domain-verification"
                    content="40eogslk5htol3s1lsoqadxgh2h657"
                />
                {/* Non-standard but requested by some validators/tools */}
                <meta
                    property="og:logo"
                    content="https://www.invaritech.ai/logo-image.png"
                />
                {/* Explicit absolute OG image hints for stricter scrapers */}
                <meta
                    property="og:image:secure_url"
                    content="https://www.invaritech.ai/og-image.png"
                />
                <meta property="og:image:type" content="image/png" />
                <link rel="preconnect" href="https://www.google.com" />
                <link
                    rel="preconnect"
                    href="https://www.googletagmanager.com"
                />
                <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
                <link rel="dns-prefetch" href="https://assets.apollo.io" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
                <Script
                    src="https://analytics.ahrefs.com/analytics.js"
                    data-key="A6OV+c4YNtaqQiY6VZk1eg"
                    strategy="lazyOnload"
                />
                <Script
                    src="https://r2.leadsy.ai/tag.js"
                    data-pid="1rQPfvIzStzrxlsWj"
                    data-version="062024"
                    strategy="lazyOnload"
                />
                <Script id="apollo-website-tracker" strategy="afterInteractive">
                    {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
  o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
  o.onload=function(){window.trackingFunctions.onLoad({appId:"69ae995320f12f0015033d60"})},
  document.head.appendChild(o)}initApollo();`}
                </Script>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <LenisScroll>
                        <div className="fixed inset-0 z-[-1] pointer-events-none grain-overlay opacity-30" />
                        <SiteSpotlight />
                        <div className="relative z-10">
                            <HeroHeader />
                            {children}
                            <FooterSection />
                        </div>
                        <Chatbot />
                        <AttributionCapture />
                    </LenisScroll>
                </ThemeProvider>

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

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
