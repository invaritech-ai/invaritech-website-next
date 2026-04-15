import dynamic from "next/dynamic";
import { Metadata } from "next";

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
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-background">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]" style={{ backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Get In Touch</span>
                    </div>
                    <h1 className="font-editorial text-6xl md:text-8xl font-semibold tracking-tight mb-8 leading-[0.9] text-foreground">
                        Book an AI automation scoping call
                    </h1>
                    <p className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-2xl font-light">
                        Whether you need to automate complex workflows or configure a custom solution, we are ready to engineer your solution.
                    </p>
                </div>

                <div className="bg-card border border-border p-8 md:p-12">
                    <ContactSection />
                </div>
            </div>
        </main>
    );
}
