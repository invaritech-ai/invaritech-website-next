import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
import { faqSchema } from "@/lib/faq-schema";
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
        default: "Invaritech - Intelligent Automation for Growth Companies",
        template: "%s | Invaritech - Intelligent Automation",
    },
    description:
        "Intelligent automation for growth companies—cut 30 hours per person in 60 days. Ops Efficiency Sprint delivers measurable results without platform rip-and-replace. SSO/RBAC, audit logs, compliance-grade solutions.",
    keywords: [
        "ops efficiency sprint",
        "intelligent automation",
        "operations automation",
        "efficiency gains",
        "ROI automation",
        "compliance-grade solutions",
        "SSO RBAC",
        "audit logs",
        "data residency",
        "knowledge management",
        "agentic workflows",
        "document processing",
        "finance automation",
        "enterprise automation",
        "workflow optimization",
        "business process automation",
        "AI-powered operations",
        "measurable outcomes",
        "growth companies",
        "operations leaders",
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
    alternates: {
        canonical: "/",
    },
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
        title: "Invaritech - Intelligent Automation for Growth Companies",
        description:
            "Intelligent automation for growth companies—cut 30 hours per person in 60 days. Ops Efficiency Sprint delivers measurable results without platform rip-and-replace.",
        siteName: "Invaritech",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Invaritech - Intelligent Automation for Growth Companies",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Invaritech - Intelligent Automation for Growth Companies",
        description:
            "Intelligent automation for growth companies—cut 30 hours per person in 60 days. Ops Efficiency Sprint delivers measurable results without platform rip-and-replace.",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
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
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
