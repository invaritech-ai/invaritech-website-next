import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
    LegalPage,
    LegalSection,
    LegalBulletList,
    LegalLastVerified,
} from "@/components/legal-page";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for INVARITECH. How we limit collection, protect uploads, and handle your data.",
    openGraph: {
        title: "Privacy Policy | INVARITECH",
        description:
            "Privacy Policy for INVARITECH. How we limit collection, protect uploads, and handle your data.",
        url: "https://www.invaritech.ai/privacy/",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Privacy Policy | INVARITECH" }],
    },
    alternates: { canonical: "https://www.invaritech.ai/privacy/" },
};

export default function PrivacyPage() {
    return (
        <LegalPage
            titleLine1="Privacy &"
            titleLine2="Data"
            subtitle="How we limit collection, protect uploads, and delete what we do not need."
        >
            <LegalSection number="01" heading="Overview">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    At INVARITECH, data handling should be limited, explicit, and respectful. This policy explains what we collect, why we collect it, how tool uploads are handled, and how to ask us to access, correct, or delete information.
                </p>
                <LegalBulletList items={[
                    "Your operational data belongs to you.",
                    "We do not sell or rent personal information.",
                    "We ask for operational files only when they are needed for a requested tool, diagnostic, or project.",
                    "We do not use files uploaded through free website tools to train Invaritech-owned models.",
                    "Where a tool runs locally in your browser, we say so.",
                    "Where a file leaves your device, we say so before upload.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="02" heading="Information Collection">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect the minimum information needed to operate the website, respond to you, and provide requested tools or services:
                </p>
                <LegalBulletList items={[
                    "Contact information: Name, email address, company name, and phone number when you request a consultation or use a contact form.",
                    "Usage data: Basic website and device information, such as pages visited, browser type, and approximate technical metadata needed for analytics, security, and reliability.",
                    "Communication and project data: Messages, requirements, and project context you choose to send us.",
                    "Tool upload data: Files and generated outputs only when you upload or submit them through a tool or follow-up workflow.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="03" heading="Tool Uploads">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Some tools let you upload invoices, CSV exports, or related operational files. When you use those tools:
                </p>
                <LegalBulletList items={[
                    "Uploaded files are used only to provide the requested extraction, matching, analysis, or follow-up workflow.",
                    "Some extraction workflows may use service and model providers needed to process the uploaded file.",
                    "Invoice extractor uploads and generated artifacts are encrypted in transit and at rest, and are automatically deleted within 48 hours.",
                    "The browser-only three-way matcher runs locally on your device unless you separately submit files through the follow-up analysis form.",
                    "Follow-up analysis forms may send attached files to Invaritech for review and response.",
                    "You should only upload files you are authorised to process, and you should redact personal or commercially sensitive fields that are not needed for the test.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="04" heading="How We Use Your Data">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    We strictly use your data for the following purposes:
                </p>
                <LegalBulletList items={[
                    "To provide the tool, diagnostic, project, or service you requested.",
                    "To respond to inquiries and communicate about active work.",
                    "To improve website reliability, security, and performance using limited usage metadata.",
                    "To comply with legal obligations and enforce our terms.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="05" heading="Data Security">
                <p className="text-muted-foreground leading-relaxed">
                    We use encryption in transit and at rest where files or operational data are processed, limit access to people, service providers, and model providers who need it to operate the workflow, and avoid retaining uploaded files longer than needed. If a project requires stronger controls, such as an NDA, custom retention period, or segregated processing environment, we agree that process before asking for source data. No internet service is 100% secure, but we treat security and minimisation as default design constraints.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="06" heading="Your Rights">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Depending on your location, you may have the following rights:
                </p>
                <LegalBulletList items={[
                    "The right to access the personal data we hold about you.",
                    "The right to request correction of inaccurate data.",
                    "The right to request deletion of your data ('Right to be Forgotten').",
                    "The right to object to or restrict processing of your personal data.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="07" heading="Contact Us">
                <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, contact us at{" "}
                    <a
                        href="mailto:hello@invaritech.ai"
                        className="text-primary hover:text-foreground transition-colors border-b border-primary/50 hover:border-foreground"
                    >
                        hello@invaritech.ai
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalLastVerified />
        </LegalPage>
    );
}
