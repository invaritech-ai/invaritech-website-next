import dynamic from "next/dynamic";
import { Metadata } from "next";
import Script from "next/script";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";
import { createApolloInboundScript } from "@/lib/apollo-inbound";

const ContactSection = dynamic(() => import("@/components/contact"), {
    loading: () => <div className="h-[600px] animate-pulse bg-muted/30" />,
});

export const metadata: Metadata = {
    title: "Share a Manual Workflow",
    description:
        "Share one manual workflow. We map the handoffs, checks, evidence, and smallest useful next step.",
    openGraph: {
        title: "Share a Manual Workflow | INVARITECH",
        description: "Map one manual workflow, find where handoffs break, and recommend the smallest useful next step.",
        url: "https://www.invaritech.ai/contact/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact INVARITECH - Book a Meeting" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Share a Manual Workflow | INVARITECH",
        description: "Bring one manual workflow. We'll map the process, the gaps in your handoffs, and the smallest useful next step.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/contact/",
    },
};

const APOLLO_CONTACT_SCRIPT = createApolloInboundScript({
    formSelector: "#contact-form",
});

const heroCopy = {
    diagnostic: {
        eyebrow: "Manual Workflow Diagnostic",
        title: "Share one manual workflow.",
        body: "Bring one workflow that still runs through spreadsheets, inboxes, approvals, evidence files, or copied reports. We map the current process and recommend the smallest useful next step.",
    },
    scan: {
        eyebrow: "Free Workflow Controls Scan",
        title: "Request a free workflow controls scan.",
        body: "Send a recent workflow export or evidence sample. We will run focused checks and return a short findings report within 48 hours.",
    },
    default: {
        eyebrow: "Get In Touch",
        title: "Share a manual workflow.",
        body: "Bring one workflow, exception process, reporting bridge, or evidence gap. We will scope the fastest path to a useful next step.",
    },
} as const;

type ContactPageProps = {
    searchParams?: Promise<{
        scan?: string | string[];
        audit?: string | string[];
        diagnostic?: string | string[];
    }>;
};

function firstParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
    const params = await searchParams;
    const scanRequested = firstParam(params?.scan) === "1";
    const auditValue = firstParam(params?.audit);
    const diagnosticValue = firstParam(params?.diagnostic);
    const diagnosticRequested = diagnosticValue === "1" || auditValue === "1";
    const heroMode = diagnosticRequested ? "diagnostic" : scanRequested ? "scan" : "default";
    const hero = heroCopy[heroMode];

    return (
        <main className="site-page relative overflow-hidden">
            <Script
                id="apollo-inbound-contact"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: APOLLO_CONTACT_SCRIPT }}
            />
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">
                                    {hero.eyebrow}
                                </p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                {hero.title}
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            {hero.body}
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
