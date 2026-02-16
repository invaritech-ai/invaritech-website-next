

import { Metadata } from "next";
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
                url: "/og-image.png",
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
        <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-20">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-foreground mix-blend-difference uppercase">
                        <TextEffect
                            per="word"
                            as="span"
                            preset="fade"
                            className="block"
                        >
                            Terms &
                        </TextEffect>
                        <TextEffect
                            per="word"
                            as="span"
                            preset="fade"
                            className="block"
                        >
                            Protocols
                        </TextEffect>
                    </h1>
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.5}
                        className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-2xl font-light font-mono"
                    >
                        Operational parameters for engaging with Invaritech services and intelligence systems.
                    </TextEffect>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="space-y-12">
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">01</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Acceptance of Terms
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing and using INVARITECH&apos;s website,
                                services, or chatbot (&quot;Iris&quot;), you accept
                                and agree to be bound by the terms and provision of
                                this agreement. If you do not agree to abide by the
                                above, please do not use this service.
                            </p>
                        </section>

                        <Separator className="bg-border/40" />

                        <section>
                             <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">02</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Use of Intelligence Systems
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Our chatbot (&quot;Iris&quot;) is designed to
                                provide information and assistance regarding
                                automation solutions and business processes. By
                                using Iris, you agree that:
                            </p>
                            <ul className="list-none pl-0 space-y-4 text-muted-foreground">
                                {[
                                    "The information provided is for general informational purposes only and should not be considered as professional advice.",
                                    "You will not use the chatbot for any unlawful purpose or in any way that could damage, disable, or impair the service.",
                                    "You understand that responses are generated based on available data and may not always be accurate or complete.",
                                    "We reserve the right to modify, suspend, or discontinue the chatbot at any time without notice."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="text-primary mt-1">▹</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <Separator className="bg-border/40" />

                        <section>
                             <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">03</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Intellectual Property
                                </TextEffect>
                            </div>
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

                        <Separator className="bg-border/40" />

                        <section>
                             <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">04</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Privacy and Data
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Your use of our services is also governed by our
                                Privacy Policy. When you interact with our chatbot:
                            </p>
                            <ul className="list-none pl-0 space-y-4 text-muted-foreground">
                                {[
                                    "We may collect and store conversation data to improve our services.",
                                    "We do not share your personal information with third parties without your consent, except as required by law.",
                                    "You are responsible for not sharing sensitive or confidential information through the chatbot."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="text-primary mt-1">▹</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <Separator className="bg-border/40" />

                        <section>
                             <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">05</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Limitation of Liability
                                </TextEffect>
                            </div>
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

                        <Separator className="bg-border/40" />

                        <section>
                             <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">06</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Modifications
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify these terms at any
                                time. We will notify users of any material changes
                                by posting the new terms on this page. Your
                                continued use of our services after such
                                modifications constitutes acceptance of the updated
                                terms.
                            </p>
                        </section>

                        <Separator className="bg-border/40" />

                        <section>
                             <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">07</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Contact
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about these Terms and
                                Conditions, please contact us at{" "}
                                <a
                                    href="mailto:hello@invaritech.ai"
                                    className="text-primary hover:text-white transition-colors border-b border-primary/50 hover:border-white"
                                >
                                    hello@invaritech.ai
                                </a>
                                .
                            </p>
                        </section>

                        <Separator className="bg-border/40" />

                        <section>
                            <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
                                Last verified:{" "}
                                {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
