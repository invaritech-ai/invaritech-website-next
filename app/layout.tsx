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
            "INVARITECH - Premium Digital Solutions & AI-Powered Development",
        template: "%s | INVARITECH - Premium Digital Solutions",
    },
    description:
        "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions trusted by innovators worldwide.",
    keywords: [
        "INVARITECH",
        "digital solutions",
        "AI development",
        "backend development",
        "automation",
        "e-commerce development",
        "premium software",
        "scalable systems",
        "luxury digital experiences",
        "API development",
        "database design",
        "AI agents",
        "business automation",
        "Shopify development",
        "custom software",
        "enterprise solutions",
        "web development",
        "mobile app development",
        "cloud solutions",
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
        title: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
        description:
            "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions trusted by innovators worldwide.",
        siteName: "INVARITECH",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
        description:
            "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Expert backend development, AI automation, and e-commerce solutions.",
        images: ["/logo.png"],
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
