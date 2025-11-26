import dynamic from "next/dynamic";
import { Metadata } from "next";

// Lazy load ContactSection to defer reCAPTCHA loading until contact page is visited
const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => (
        <section className="py-32">
            <div className="mx-auto max-w-4xl px-4 lg:px-0">
                <div className="border p-6 sm:p-12 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
                        <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
                    </div>
                </div>
            </div>
        </section>
    ),
});

export const metadata: Metadata = {
    title: "Contact - Let's Talk Automation",
    description:
        "Ready to automate your workflow? Schedule a 30-minute call to discuss your compliance, data, or admin automation project with INVARITECH.",
    openGraph: {
        title: "Contact INVARITECH - Automation Consultation",
        description:
            "Schedule a call to discuss your automation project. Compliance bridges, data pipelines, or admin suites. 30-minute consultation.",
        url: "https://www.invaritech.ai/contact/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Contact INVARITECH - Automation Consultation",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/contact/",
    },
};

export default function ContactPage() {
    return (
        <main className="pt-24 md:pt-32">
            <div className="mx-auto max-w-4xl px-4 lg:px-0 mb-12">
                <h1 className="text-center text-4xl font-bold md:text-5xl mb-4">
                    Contact Us
                </h1>
                <p className="text-center text-muted-foreground text-lg">
                    Let&apos;s talk about your automation project
                </p>
            </div>
            <ContactSection />
        </main>
    );
}
