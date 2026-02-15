
import { Metadata } from "next";
import { TextEffect } from "@/components/ui/text-effect";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for INVARITECH. How we collect, use, and protect your data when using our automation services and AI systems.",
    openGraph: {
        title: "Privacy Policy | INVARITECH",
        description:
            "Privacy Policy for INVARITECH. How we collect, use, and protect your data.",
        url: "https://www.invaritech.ai/privacy/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Privacy Policy | INVARITECH",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/privacy/",
    },
};

export default function PrivacyPage() {
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
                            Privacy &
                        </TextEffect>
                        <TextEffect
                            per="word"
                            as="span"
                            preset="fade"
                            className="block"
                        >
                            Data
                        </TextEffect>
                    </h1>
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.5}
                        className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-2xl font-light font-mono"
                    >
                        How we secure, process, and protect information within our automation ecosystem.
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
                                    Overview
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                At INVARITECH, we take data privacy seriously. This policy describes how we collect, use, and share your personal information when you visit our website, use our services, or interact with our AI systems. We are aligned with GDPR principles and industry standard security practices.
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
                                    Information Collection
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We collect information that you provide directly to us, as well as data automatically collected during your use of our services:
                            </p>
                            <ul className="list-none pl-0 space-y-4 text-muted-foreground">
                                {[
                                    "Identifiable Information: Name, email address, company name, and phone number when you request a consultation or use our contact forms.",
                                    "Usage Data: Information about how you access and use our website, including device information, IP address, and browser type.",
                                    "Communication Data: Records of your interactions with our team and our AI chatbot ('Iris')."
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
                                    How We Use Your Data
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We strictly use your data for the following purposes:
                            </p>
                             <ul className="list-none pl-0 space-y-4 text-muted-foreground">
                                {[
                                    "To provide, maintain, and improve our automation services.",
                                    "To communicate with you about projects, updates, and responding to your inquiries.",
                                    "To analyze usage trends and optimize our website performance.",
                                    "To comply with legal obligations and enforce our terms."
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
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">04</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Data Security
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement enterprise-grade security controls to protect your data, including encryption in transit and at rest, strict access controls, and regular security audits. While no method of transmission over the internet is 100% secure, we strive to use commercially acceptable means to protect your personal information.
                            </p>
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
                                    Your Rights
                                </TextEffect>
                            </div>
                             <p className="text-muted-foreground leading-relaxed mb-4">
                                Depending on your location, you may have the following rights:
                            </p>
                            <ul className="list-none pl-0 space-y-4 text-muted-foreground">
                                {[
                                    "The right to access the personal data we hold about you.",
                                    "The right to request correction of inaccurate data.",
                                    "The right to request deletion of your data ('Right to be Forgotten').",
                                    "The right to object to processing of your personal data."
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
                                <span className="font-mono text-primary text-sm tracking-widest uppercase">06</span>
                                <TextEffect
                                    per="word"
                                    as="h2"
                                    preset="fade"
                                    className="text-3xl font-bold tracking-tight m-0"
                                >
                                    Contact Us
                                </TextEffect>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer at{" "}
                                <a
                                    href="mailto:hello@invaritech.ai"
                                    className="text-primary hover:text-white transition-colors border-b border-primary/50 hover:border-white"
                                >
                                    hello@invaritech.ai
                                </a>
                                .
                            </p>
                        </section>
                        
                         <section>
                            <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mt-12">
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
