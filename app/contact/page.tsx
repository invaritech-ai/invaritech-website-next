import dynamic from "next/dynamic";
import { Metadata } from "next";
import Script from "next/script";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";
import { createApolloInboundScript } from "@/lib/apollo-inbound";

const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => <div className="h-[600px] animate-pulse bg-muted/30" />,
});

export const metadata: Metadata = {
    title: "Book an AP Payment Controls Scoping Call",
    description:
        "Book a 30-minute AP payment controls scoping call. We map your invoice approval workflow, duplicate payment risks, and the fastest path to a working control.",
    openGraph: {
        title: "Book an AP Payment Controls Scoping Call | INVARITECH",
        description: "Book a 30-minute scoping call to map your invoice approval workflow, duplicate payment risks, and the fastest path to a working control.",
        url: "https://www.invaritech.ai/contact/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact INVARITECH - Book a Meeting" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book an AP Payment Controls Scoping Call | INVARITECH",
        description: "Tell us your invoice approval workflow and payment risks. We'll scope the fastest path to a working control.",
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
    }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const params = await searchParams;
    const scanValue = Array.isArray(params?.scan) ? params?.scan[0] : params?.scan;
    const scanRequested = scanValue === "1";
    const auditValue = Array.isArray(params?.audit) ? params?.audit[0] : params?.audit;
    const auditRequested = auditValue === "1";

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
                                    {auditRequested
                                        ? "Book a Finance Workflow Audit"
                                        : scanRequested
                                          ? "Free AP Controls Scan"
                                          : "Get In Touch"}
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                {auditRequested
                                    ? "Book a finance workflow audit."
                                    : scanRequested
                                      ? "Request a free AP controls scan."
                                      : "Book an AP payment controls scoping call."}
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            {auditRequested
                                ? "Tell us about the finance workflow you want to inspect. We will review one workflow, identify the highest-value exception to automate first, and send back a fixed-scope build estimate."
                                : scanRequested
                                  ? "Send a 90-day Xero or MYOB export. We will run five checks and return a 2-page findings report within 48 hours."
                                  : "Bring one invoice approval workflow, duplicate payment risk, or supplier exception process. We will scope the fastest path to a working control."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact form */}
            <div className="site-container relative z-10 pb-20">
                <div className="bg-card border border-border p-8 md:p-12">
                    <ContactSection scanRequested={scanRequested} />
                </div>
            </div>

            <HomepageScrollAnimations />
        </main>
    );
}
