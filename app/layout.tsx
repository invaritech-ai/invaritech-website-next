import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import { faqSchema } from "@/lib/faq-schema";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default:
            "INVARITECH - Automation & Back-Office Systems for Small Service Businesses",
        template: "%s | INVARITECH",
    },
    description:
        "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites for freelancers and agencies. Stop losing time between your tools.",
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
        "weekend suite",
        "backend development",
        "AI automation",
        "custom software",
        "database design",
        "web development",
        "digital transformation",
    ],
    authors: [{ name: "INVARITECH", url: "https://invaritech.ai" }],
    creator: "INVARITECH",
    publisher: "INVARITECH",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://invaritech.ai"),

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
        url: "https://invaritech.ai",
        title: "INVARITECH - Automation & Back-Office Systems for Small Service Businesses",
        description:
            "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites for freelancers and agencies. Stop losing time between your tools.",
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
                {/* ... scripts ... */}
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
                <script
                    src="https://analytics.ahrefs.com/analytics.js"
                    data-key="A6OV+c4YNtaqQiY6VZk1eg"
                    async
                ></script>
                <GoogleAnalytics gaId="G-JJPJBB10G7" />
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
            </body>
        </html>
    );
}
