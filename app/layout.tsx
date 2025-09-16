import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { structuredData } from "./structured-data";
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
    title: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
    description:
        "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Trusted by innovators worldwide for backend development, automation, AI agentic solutions, and e-commerce stores.",
    keywords: [
        "INVARITECH",
        "digital solutions",
        "AI development",
        "backend development",
        "automation",
        "e-commerce",
        "premium software",
        "scalable systems",
        "luxury digital experiences",
    ],
    authors: [{ name: "INVARITECH" }],
    creator: "INVARITECH",
    publisher: "INVARITECH",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
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
            "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Trusted by innovators worldwide.",
        siteName: "INVARITECH",
        images: [
            {
                url: "https://invaritech.ai/logo.png",
                width: 1200,
                height: 630,
                alt: "INVARITECH - Premium Digital Solutions",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INVARITECH - Premium Digital Solutions & AI-Powered Development",
        description:
            "INVARITECH crafts precision-engineered digital solutions, luxury-grade experiences, and scalable systems. Trusted by innovators worldwide.",
        images: ["https://invaritech.ai/logo.png"],
        creator: "@invaritech",
    },
    verification: {
        google: "your-google-verification-code",
    },
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
