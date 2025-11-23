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
        url: "https://invaritech.ai/contact",
    },
};

export default function ContactPage() {
    return (
        <main className="pt-24 md:pt-32">
            <ContactSection />
        </main>
    );
}
