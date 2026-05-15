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
        "Terms and conditions for using INVARITECH services and chatbot. Read our terms of service, privacy policy, and user agreements.",
    openGraph: {
        title: "Terms and Conditions | INVARITECH",
        description: "Terms and conditions for using INVARITECH services and chatbot.",
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
            subtitle="Operational parameters for engaging with Invaritech services and intelligence systems."
        >
            <LegalSection number="01" heading="Acceptance of Terms">
                <p className="text-muted-foreground leading-relaxed">
                    By accessing and using INVARITECH&apos;s website, services, or chatbot (&quot;Iris&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="02" heading="Use of Intelligence Systems">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Our chatbot (&quot;Iris&quot;) is designed to provide information and assistance regarding automation solutions and business processes. By using Iris, you agree that:
                </p>
                <LegalBulletList items={[
                    "The information provided is for general informational purposes only and should not be considered as professional advice.",
                    "You will not use the chatbot for any unlawful purpose or in any way that could damage, disable, or impair the service.",
                    "You understand that responses are generated based on available data and may not always be accurate or complete.",
                    "We reserve the right to modify, suspend, or discontinue the chatbot at any time without notice.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="03" heading="Intellectual Property">
                <p className="text-muted-foreground leading-relaxed">
                    All content, features, and functionality of this website and chatbot, including but not limited to text, graphics, logos, and software, are the property of INVARITECH and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
                </p>
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="04" heading="Privacy and Data">
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Your use of our services is also governed by our Privacy Policy. When you interact with our chatbot:
                </p>
                <LegalBulletList items={[
                    "We may collect and store conversation data to improve our services.",
                    "We do not share your personal information with third parties without your consent, except as required by law.",
                    "You are responsible for not sharing sensitive or confidential information through the chatbot.",
                ]} />
            </LegalSection>

            <Separator className="bg-border/40" />

            <LegalSection number="05" heading="Limitation of Liability">
                <p className="text-muted-foreground leading-relaxed">
                    INVARITECH shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services or chatbot. We make no warranties or representations about the accuracy or completeness of the information provided.
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
