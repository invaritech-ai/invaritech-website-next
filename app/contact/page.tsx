import dynamic from "next/dynamic";
import { Metadata } from "next";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => <div className="h-[600px] animate-pulse bg-muted/30" />,
});

export const metadata: Metadata = {
    title: "Book an AI Automation Scoping Call",
    description:
        "Book a 30-minute scoping call with INVARITECH. Tell us the workflow, we'll scope the automation. No pitch deck — just architecture and next steps.",
    openGraph: {
        title: "Book an AI Automation Scoping Call | INVARITECH",
        description: "Book a 30-minute scoping call with INVARITECH. Tell us the workflow, we'll scope the automation. No pitch deck — just architecture and next steps.",
        url: "https://www.invaritech.ai/contact/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact INVARITECH — Book a Meeting" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book an AI Automation Scoping Call | INVARITECH",
        description: "Tell us the workflow, we'll scope the automation. No pitch deck — just architecture and next steps.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/contact/",
    },
};

export default function ContactPage() {
    return (
        <main className="site-page relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Get In Touch</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Book an AI automation scoping call.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            Whether you need to automate complex workflows or configure a custom solution, we are ready to engineer your solution.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact form */}
            <div className="site-container relative z-10 pb-20">
                <div className="bg-card border border-border p-8 md:p-12">
                    <ContactSection />
                </div>
            </div>

            <HomepageScrollAnimations />
        </main>
    );
}
