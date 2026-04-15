import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import Script from "next/script";
import "./globals.css";
import { LenisScroll } from "@/components/ui/LenisScroll";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
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

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-serif",
    display: "swap",
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
        default: "AI Automation Services for Enterprises | INVARITECH",
        template: "%s | INVARITECH",
    },
    description:
        "Drop-in AI automations for enterprises that cannot afford disruption. One production-grade automation deployed on your existing systems in 30 days. Serving Singapore, Hong Kong, Malaysia, and the Philippines.",
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
        title: "AI Automation Services for Enterprises | INVARITECH",
        description:
            "Drop-in AI automations for enterprises across APAC. One production-grade automation deployed on your existing systems in 30 days.",
        siteName: "INVARITECH",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AI Automation Services for Enterprises | INVARITECH",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Automation Services for Enterprises | INVARITECH",
        description:
            "One production-grade AI automation deployed on your existing systems in 30 days. Serving teams in Singapore, Hong Kong, Malaysia, and the Philippines.",
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
        <html lang="en" suppressHydrationWarning className="light">
            <head>
                <meta
                    name="facebook-domain-verification"
                    content="40eogslk5htol3s1lsoqadxgh2h657"
                />
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
                <Script id="apollo-website-tracker" strategy="beforeInteractive">
                    {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
  o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
  o.onload=function(){window.trackingFunctions.onLoad({appId:"69ae995320f12f0015033d60"})},
  document.head.appendChild(o)}initApollo();`}
                </Script>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased bg-background text-foreground overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <LenisScroll>
                        <div className="fixed inset-0 z-[-1] pointer-events-none grain-overlay opacity-30" />
                        <div className="relative z-10">
                            <HeroHeader />
                            {children}
                            <FooterSection />
                        </div>
                        <Chatbot />
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
