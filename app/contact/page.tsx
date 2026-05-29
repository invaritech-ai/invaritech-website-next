import dynamic from "next/dynamic";
import { Metadata } from "next";
import Script from "next/script";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";
import { createApolloInboundScript } from "@/lib/apollo-inbound";

const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => <div className="h-[600px] animate-pulse bg-muted/30" />,
});

export const metadata: Metadata = {
    title: "Book a Finance Workflow Diagnostic",
    description:
        "Book a finance workflow diagnostic. We map one finance or regulated operations workflow, identify control gaps, and recommend the smallest useful build scope.",
    openGraph: {
        title: "Book a Finance Workflow Diagnostic | INVARITECH",
        description: "Map one finance or regulated operations workflow, identify control gaps, and recommend the smallest useful build scope.",
        url: "https://www.invaritech.ai/contact/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact INVARITECH - Book a Meeting" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book a Finance Workflow Diagnostic | INVARITECH",
        description: "Bring one finance or regulated operations workflow. We'll map the process, control gaps, and smallest useful build scope.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/contact/",
    },
};

const APOLLO_CONTACT_SCRIPT = createApolloInboundScript({
    formSelector: "#contact-form",
});

type ContactPageProps = {
    searchParams?: Promise<{
        scan?: string | string[];
        audit?: string | string[];
        diagnostic?: string | string[];
    }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const params = await searchParams;
    const scanValue = Array.isArray(params?.scan) ? params?.scan[0] : params?.scan;
    const scanRequested = scanValue === "1";
    const auditValue = Array.isArray(params?.audit) ? params?.audit[0] : params?.audit;
    const diagnosticValue = Array.isArray(params?.diagnostic) ? params?.diagnostic[0] : params?.diagnostic;
    const diagnosticRequested = diagnosticValue === "1" || auditValue === "1";

    return (
        <main className="site-page relative overflow-hidden">
            <Script
                id="apollo-inbound-contact"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: APOLLO_CONTACT_SCRIPT }}
            />
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">
                                    {diagnosticRequested
                                        ? "Finance Workflow Diagnostic"
                                        : scanRequested
                                          ? "Free Workflow Controls Scan"
                                          : "Get In Touch"}
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                {diagnosticRequested
                                    ? "Book a Finance Workflow Diagnostic."
                                    : scanRequested
                                      ? "Request a free workflow controls scan."
                                      : "Book a finance workflow scoping call."}
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            {diagnosticRequested
                                ? "Bring one finance or regulated operations workflow. We map the current process, identify the control gaps, assess automation fit, and recommend the smallest useful build scope."
                                : scanRequested
                                  ? "Send a recent workflow export or evidence sample. We will run focused checks and return a short findings report within 48 hours."
                                  : "Bring one finance or regulated operations workflow, exception process, or evidence gap. We will scope the fastest path to a working control."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact form */}
            <div className="site-container relative z-10 pb-20">
                <div className="bg-card border border-border p-8 md:p-12">
                    <ContactSection scanRequested={scanRequested} diagnosticRequested={diagnosticRequested} />
                </div>
            </div>

            <HomepageScrollAnimations />
        </main>
    );
}
