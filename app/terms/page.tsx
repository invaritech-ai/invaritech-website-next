import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import {
    LegalPage,
    LegalSection,
    LegalBulletList,
    LegalLastVerified,
} from "@/components/legal-page";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description:
        "Terms and conditions for using INVARITECH services. Read our terms of service, privacy policy, and user agreements.",
    openGraph: {
        title: "Terms and Conditions | INVARITECH",
        description: "Terms and conditions for using INVARITECH services.",
        url: "https://www.invaritech.ai/terms/",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Terms and Conditions | INVARITECH" }],
    },
    alternates: { canonical: "https://www.invaritech.ai/terms/" },
};

export default function TermsPage() {
    return (
        <LegalPage
            titleLine1="Terms &"
            titleLine2="Protocols"
            subtitle="Operational terms for engaging with Invaritech services."
        >
            <LegalSection number="01" heading="Acceptance of Terms">
                <p className="text-muted-foreground leading-relaxed">
                    By accessing and using INVARITECH&apos;s website or services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="02" heading="Use of Website and Services">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Our website and services provide information about payment control design, scoping, and delivery. By using them, you agree that:
                </p>
                <LegalBulletList items={[
                    "The information provided is for general informational purposes only and should not be considered as professional advice.",
                    "You will not use the website or services for any unlawful purpose or in any way that could damage, disable, or impair the service.",
                    "You understand that website content may not cover every business, finance, legal, or compliance circumstance.",
                    "We reserve the right to modify, suspend, or discontinue parts of the website or services at any time without notice.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="03" heading="Intellectual Property">
                <p className="text-muted-foreground leading-relaxed">
                    All content, features, and functionality of this website and services, including but not limited to text, graphics, logos, and software, are the property of INVARITECH and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="04" heading="Privacy and Data">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Your use of our services is also governed by our Privacy Policy. When you contact us or use our services:
                </p>
                <LegalBulletList items={[
                    "We may collect and store contact and project information to provide our services.",
                    "We do not share your personal information with third parties without your consent, except as required by law.",
                    "You are responsible for not sharing sensitive or confidential information unless an agreed process is in place.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="05" heading="Limitation of Liability">
                <p className="text-muted-foreground leading-relaxed">
                    INVARITECH shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our website or services. We make no warranties or representations about the accuracy or completeness of the information provided.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="06" heading="Modifications">
                <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="07" heading="Contact">
                <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms and Conditions, please contact us at{" "}
                    <a
                        href="mailto:hello@invaritech.ai"
                        className="text-primary hover:text-foreground transition-colors border-b border-primary/50 hover:border-foreground"
                    >
                        hello@invaritech.ai
                    </a>
                    .
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalLastVerified />
        </LegalPage>
    );
}
