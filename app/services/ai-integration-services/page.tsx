import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "AI Integration Services | INVARITECH",
    description: "Connect data, tools, and approvals into a reliable production pipeline. No replatforming; just AI working inside your current stack.",
    alternates: {
        canonical: "https://www.invaritech.ai/services/ai-integration-services/",
    },
};

export default function AIIntegrationServicesPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <ArtisticBackground />

            {/* Nav Back */}
            <div className="absolute top-24 left-6 z-20 md:top-32 md:left-12">
                <Link href="/services/" className="flex items-center text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider font-mono">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Link>
            </div>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
                        Service Offering
                    </Badge>
                    
                    <h1 className="text-[8vw] md:text-[5vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            AI INTEGRATION
                        </TextEffect>
                        <br />
                        <span className="text-white/50">SERVICES</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light border-l-2 border-primary/50 pl-6 mb-12">
                        Connect data, tools, and approvals into a reliable production pipeline. No replatforming; just AI working inside your current stack.
                    </p>

                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton className="bg-primary text-black px-8 py-4 text-lg font-bold hover:bg-white transition-colors">
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                </div>
            </section>

             {/* Outcome Section */}
             <section className="py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12">The Outcome</h2>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-start gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                <Check className="size-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Seamless Integration</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    AI features that work inside systems of record (not beside them).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Proof/CTA Section */}
             <section className="py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Connect Your Stack</h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Integrate AI into your existing workflow without replatforming.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="bg-white/10 hover:bg-white/20 border-white/10 text-white px-8 py-4 text-lg">
                                {BOOK_MEETING_CTA}
                            </MagneticButton>
                        </a>
                        <Link href="/work/">
                             <MagneticButton className="bg-transparent border border-white/20 text-white px-8 py-4 text-lg hover:bg-white/10">
                                View Our Work
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
