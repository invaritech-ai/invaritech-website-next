import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Network, PenTool } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "About Us - The Studio Model",
    description: "INVARITECH is a boutique automation studio. We design and build custom systems that help small teams stop losing time between their tools.",
    openGraph: {
        title: "About INVARITECH - Boutique Automation Studio",
        url: "https://www.invaritech.ai/about/",
        images: ["/og-image.webp"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/about/",
    },
};

const SHOW_AVISHEK = true;

export default function AboutPage() {
    return (
        <PageLayout maxWidth="6xl">
            {/* Hero */}
            <div className="mb-24 md:mb-32">
                <TextEffect
                    per="word"
                    as="h1"
                    preset="fade"
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] mix-blend-difference whitespace-nowrap"
                >
                    THE STUDIO
                </TextEffect>
                <div className="max-w-3xl">
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.3}
                        className="text-2xl md:text-3xl font-light text-foreground/90 mb-8 leading-normal"
                    >
                        Small by design. Expert by trade.
                    </TextEffect>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        We reject the body shop agency model. We are a high-precision automation studio building systems that give regulated firms the operational superpowers of tech giants.
                    </p>
                </div>
            </div>

            {/* The Vision */}
            <div className="grid gap-16 md:grid-cols-2 mb-32 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">De-bloating Operation</h2>
                    <div className="space-y-6 text-lg text-muted-foreground font-light">
                        <p>
                            The "digital transformation" industry sells complexity and multi-year roadmaps to companies that just want to work faster.
                        </p>
                        <p>
                            We prove that a small, focused team armed with the right automation tools can outmaneuver a giant corporation.
                        </p>
                    </div>
                </div>
                <div className="relative border border-primary/20 bg-primary/5 p-12 rounded-none backdrop-blur-sm">
                    <blockquote className="text-2xl font-light italic leading-relaxed text-foreground/90">
                        "Automation doesn't just save time. It frees human expertise from boring admin so it can be used where it actually moves the needle."
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                        <Avatar className="h-12 w-12 border border-primary/50">
                            <AvatarImage src="/aditi-1.webp" className="object-cover" />
                            <AvatarFallback>AG</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-bold text-primary">Aditi Garg</div>
                            <div className="text-xs uppercase tracking-widest text-muted-foreground">Director & Founder</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Model */}
            <div className="mb-32">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">STUDIO MODEL</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group border border-white/10 p-8 hover:bg-white/5 transition-colors duration-500">
                        <PenTool className="w-12 h-12 mb-8 text-primary opacity-80" />
                        <h3 className="text-2xl font-bold mb-4">The Architects</h3>
                        <p className="text-muted-foreground mb-6">
                            You work directly with the founders. No account managers, no diluted decisions. We architect every solution.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> No "B-Team" handoffs</li>
                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Direct strategic ownership</li>
                        </ul>
                    </div>

                    <div className="group border border-white/10 p-8 hover:bg-white/5 transition-colors duration-500">
                        <Network className="w-12 h-12 mb-8 text-primary opacity-80" />
                        <h3 className="text-2xl font-bold mb-4">The Network</h3>
                        <p className="text-muted-foreground mb-6">
                            For execution, we draw on a private network of elite specialists we've vetted over years.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Specialists for every component</li>
                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Scalable execution power</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Leadership */}
            <div className="mb-32">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">LEADERSHIP</h2>
                 <div className="grid gap-12 lg:grid-cols-3">
                    <FounderCard 
                        name="Aditi Garg" 
                        role="Director & Founder" 
                        image="/aditi-1.webp"
                        bio="Operations leader ex-Goldman Sachs, Uber, BMW. Transforming fragmented support processes into high-NPS operating models."
                    />
                    <FounderCard 
                        name="Abhishek Agarwal" 
                        role="Co-founder" 
                        image="/abhishek.webp"
                        bio="Founder Codeacious Tech. Hands-on AI delivery for e-commerce and enterprise. Led programs driving $80M+ value."
                    />
                    {SHOW_AVISHEK && (
                        <FounderCard 
                            name="Avishek Majumder" 
                            role="Co-founder & CEO" 
                            image="/avishek.webp"
                            bio="Data engineer and applied scientist. Builds resilient pipelines and decision-support systems for regulated environments."
                        />
                    )}
                 </div>
            </div>

            {/* CTA */}
            <div className="relative border-t border-white/10 pt-24 text-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto">
                    READY TO BUILD?
                </h2>
                <div className="flex justify-center">
                    <MagneticButton className="px-12 py-6 text-xl">
                        <a
                            href="https://calendly.com/hello-invaritech/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                        >
                            WORK WITH US <ArrowRight className="w-6 h-6" />
                        </a>
                    </MagneticButton>
                </div>
            </div>
        </PageLayout>
    );
}

function FounderCard({ name, role, image, bio }: { name: string; role: string; image: string; bio: string }) {
    return (
        <div className="group relative">
             <div className="aspect-[3/4] relative overflow-hidden bg-muted/5 border border-white/10 mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-primary">{role}</div>
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{bio}</p>
            </div>
        </div>
    );
}
