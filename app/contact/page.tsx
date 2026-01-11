import dynamic from "next/dynamic";
import { Metadata } from "next";
import { TextEffect } from "@/components/ui/text-effect";

// Lazy load ContactSection to defer reCAPTCHA loading until contact page is visited
const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => (
        <section className="py-12 md:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                        <div className="h-12 bg-muted rounded w-3/4 animate-pulse"></div>
                        <div className="h-6 bg-muted rounded w-full animate-pulse"></div>
                        <div className="h-6 bg-muted rounded w-2/3 animate-pulse"></div>
                    </div>
                    <div className="border rounded-xl p-8 h-[600px] bg-muted/10 animate-pulse"></div>
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
        <main className="min-h-screen bg-background relative overflow-hidden pt-24 md:pt-32 pb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 lg:px-8 mb-12 md:mb-20">
                <div className="max-w-3xl">
                    <TextEffect
                        per="word"
                        as="h1"
                        preset="fade"
                        className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-foreground"
                    >
                        Let&apos;s build something extraordinary together.
                    </TextEffect>
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.5}
                        className="text-lg text-muted-foreground md:text-xl leading-relaxed"
                    >
                        Whether you need to automate complex workflows, build a
                        custom platform, or just want to explore what&apos;s
                        possible—we&apos;re here to help.
                    </TextEffect>
                </div>
            </div>
            
            <ContactSection />
        </main>
    );
}
