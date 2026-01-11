import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { TextEffect } from "@/components/ui/text-effect";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description:
        "Terms and conditions for using INVARITECH services and chatbot. Read our terms of service, privacy policy, and user agreements.",
    openGraph: {
        title: "Terms and Conditions | INVARITECH",
        description:
            "Terms and conditions for using INVARITECH services and chatbot.",
        url: "https://www.invaritech.ai/terms/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Terms and Conditions | INVARITECH",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/terms/",
    },
};

export default function TermsPage() {
    return (
        <PageLayout
            maxWidth="5xl"
            header={{
                title: "Terms and Conditions",
                description:
                    "Please read these terms carefully before using our services or chatbot.",
            }}
        >
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="space-y-8">
                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            1. Acceptance of Terms
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing and using INVARITECH&apos;s website,
                            services, or chatbot (&quot;Iris&quot;), you accept
                            and agree to be bound by the terms and provision of
                            this agreement. If you do not agree to abide by the
                            above, please do not use this service.
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            2. Use of Chatbot
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Our chatbot (&quot;Iris&quot;) is designed to
                            provide information and assistance regarding
                            automation solutions and business processes. By
                            using Iris, you agree that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                The information provided is for general
                                informational purposes only and should not be
                                considered as professional advice.
                            </li>
                            <li>
                                You will not use the chatbot for any unlawful
                                purpose or in any way that could damage,
                                disable, or impair the service.
                            </li>
                            <li>
                                You understand that responses are generated
                                based on available data and may not always be
                                accurate or complete.
                            </li>
                            <li>
                                We reserve the right to modify, suspend, or
                                discontinue the chatbot at any time without
                                notice.
                            </li>
                        </ul>
                    </section>

                    <Separator />

                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            3. Intellectual Property
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed">
                            All content, features, and functionality of this
                            website and chatbot, including but not limited to
                            text, graphics, logos, and software, are the
                            property of INVARITECH and are protected by
                            international copyright, trademark, and other
                            intellectual property laws. You may not reproduce,
                            distribute, or create derivative works from any
                            content without our express written permission.
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            4. Privacy and Data
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Your use of our services is also governed by our
                            Privacy Policy. When you interact with our chatbot:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                We may collect and store conversation data to
                                improve our services.
                            </li>
                            <li>
                                We do not share your personal information with
                                third parties without your consent, except as
                                required by law.
                            </li>
                            <li>
                                You are responsible for not sharing sensitive or
                                confidential information through the chatbot.
                            </li>
                        </ul>
                    </section>

                    <Separator />

                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            5. Limitation of Liability
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed">
                            INVARITECH shall not be liable for any indirect,
                            incidental, special, consequential, or punitive
                            damages, including without limitation, loss of
                            profits, data, use, goodwill, or other intangible
                            losses, resulting from your use of our services or
                            chatbot. We make no warranties or representations
                            about the accuracy or completeness of the
                            information provided.
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            6. Modifications to Terms
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to modify these terms at any
                            time. We will notify users of any material changes
                            by posting the new terms on this page. Your
                            continued use of our services after such
                            modifications constitutes acceptance of the updated
                            terms.
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <TextEffect
                            per="word"
                            as="h2"
                            preset="fade"
                            className="text-2xl font-semibold mb-4"
                        >
                            7. Contact Information
                        </TextEffect>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about these Terms and
                            Conditions, please contact us at{" "}
                            <a
                                href="mailto:hello@invaritech.ai"
                                className="text-primary hover:underline"
                            >
                                hello@invaritech.ai
                            </a>
                            .
                        </p>
                    </section>

                    <Separator />

                    <section>
                        <p className="text-sm text-muted-foreground italic">
                            Last updated:{" "}
                            {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
