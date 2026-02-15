import dynamic from "next/dynamic";
import { Metadata } from "next";
import { TextEffect } from "@/components/ui/text-effect";

// Lazy load ContactSection
const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => <div className="h-[600px] animate-pulse bg-muted/10 rounded-xl" />,
});

export const metadata: Metadata = {
    title: "Contact - Book a Meeting",
    description:
        "Book a meeting with INVARITECH to discuss a 30-day drop-in AI automation sprint for your existing infrastructure.",
    openGraph: {
        title: "Contact INVARITECH - Book a Meeting",
        url: "https://www.invaritech.ai/contact/",
        images: ["/og-image.webp"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/contact/",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <TextEffect
                        per="word"
                        as="h1"
                        preset="fade"
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-foreground mix-blend-difference"
                    >
                        START THE SPRINT
                    </TextEffect>
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.5}
                        className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-2xl font-light"
                    >
                        Whether you need to automate complex workflows or configure a custom solution, we are ready to engineer your solution.
                    </TextEffect>
                </div>
                
                <div className="backdrop-blur-sm bg-background/30 border border-foreground/10 p-8 md:p-12 rounded-none">
                    <ContactSection />
                </div>
            </div>
        </main>
    );
}
