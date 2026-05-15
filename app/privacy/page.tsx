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
        "Privacy Policy for INVARITECH. How we collect, use, and protect your data when using our automation services and AI systems.",
    openGraph: {
        title: "Privacy Policy | INVARITECH",
        description:
            "Privacy Policy for INVARITECH. How we collect, use, and protect your data.",
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
            subtitle="How we secure, process, and protect information within our automation ecosystem."
        >
            <LegalSection number="01" heading="Overview">
                <p className="text-muted-foreground leading-relaxed">
                    At INVARITECH, we take data privacy seriously. This policy describes how we collect, use, and share your personal information when you visit our website, use our services, or interact with our AI systems. We are aligned with GDPR principles and industry standard security practices.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="02" heading="Information Collection">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information that you provide directly to us, as well as data automatically collected during your use of our services:
                </p>
                <LegalBulletList items={[
                    "Identifiable Information: Name, email address, company name, and phone number when you request a consultation or use our contact forms.",
                    "Usage Data: Information about how you access and use our website, including device information, IP address, and browser type.",
                    "Communication Data: Records of your interactions with our team and our AI chatbot ('Iris').",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="03" heading="How We Use Your Data">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    We strictly use your data for the following purposes:
                </p>
                <LegalBulletList items={[
                    "To provide, maintain, and improve our automation services.",
                    "To communicate with you about projects, updates, and responding to your inquiries.",
                    "To analyze usage trends and optimize our website performance.",
                    "To comply with legal obligations and enforce our terms.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="04" heading="Data Security">
                <p className="text-muted-foreground leading-relaxed">
                    We implement enterprise-grade security controls to protect your data, including encryption in transit and at rest, strict access controls, and regular security audits. While no method of transmission over the internet is 100% secure, we strive to use commercially acceptable means to protect your personal information.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="05" heading="Your Rights">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Depending on your location, you may have the following rights:
                </p>
                <LegalBulletList items={[
                    "The right to access the personal data we hold about you.",
                    "The right to request correction of inaccurate data.",
                    "The right to request deletion of your data ('Right to be Forgotten').",
                    "The right to object to processing of your personal data.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="06" heading="Contact Us">
                <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer at{" "}
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
