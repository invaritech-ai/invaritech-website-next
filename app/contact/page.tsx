import ContactSection from "@/components/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact - Let's Talk Automation",
    description:
        "Ready to automate your workflow? Schedule a 30-minute call to discuss your compliance, data, or admin automation project with INVARITECH.",
    openGraph: {
        title: "Contact INVARITECH - Automation Consultation",
        description:
            "Schedule a call to discuss your automation project. Compliance bridges, data pipelines, or admin suites. 30-minute consultation.",
        url: "https://www.invaritech.ai/contact",
    },
    alternates: {
        canonical: "https://www.invaritech.ai/contact",
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
