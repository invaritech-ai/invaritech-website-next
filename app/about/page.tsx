import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Network, PenTool } from "lucide-react";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import Image from "next/image";
import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "About Us — The Operating System Behind Your AI",
    description: "INVARITECH is a tactical AI delivery unit. We embed governed automation into enterprise infrastructure in 30-day cycles, with built-in compliance and measurable impact.",
    openGraph: {
        title: "About INVARITECH — Tactical AI Delivery Unit",
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
                    THE UNIT
                </TextEffect>
                <div className="max-w-3xl">
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.3}
                        className="text-2xl md:text-3xl font-light text-foreground/90 mb-8 leading-normal"
                    >
                        Senior-led AI delivery. Measured before and after.
                    </TextEffect>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        We are a senior-led AI delivery unit backed by a cross-functional group of engineers, architects, and domain operators. We embed governed automation into enterprise infrastructure and validate every deployment against an agreed baseline.
                    </p>
                </div>
            </div>

            {/* The Vision */}
            <div className="grid gap-16 md:grid-cols-2 mb-32 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Operating Thesis</h2>
                    <div className="space-y-6 text-lg text-muted-foreground font-light">
	                        <p>
	                            Most enterprise AI projects fail because they try to replace systems of record. We do the opposite.
	                        </p>
                        <p>
                            We layer intelligence on top of your existing stack — ERP, CRM, legacy tooling — and validate impact in weeks, not quarters. No replatforming. No broad transformation roadmap.
                        </p>
                    </div>
                </div>
                <div className="relative border border-primary/20 bg-primary/5 p-12 rounded-none backdrop-blur-sm">
	                    <blockquote className="text-2xl font-light italic leading-relaxed text-foreground/90">
	                        &ldquo;We don&apos;t burn money on AI where simpler systems work better. When we do deploy, it ships with permissions, audit logs, fallbacks, and rollback built in.&rdquo;
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
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">DELIVERY MODEL</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group border border-white/10 p-8 hover:bg-white/5 transition-colors duration-500">
                        <PenTool className="w-12 h-12 mb-8 text-primary opacity-80" />
                        <h3 className="text-2xl font-bold mb-4">Direct Principal Ownership</h3>
                        <p className="text-muted-foreground mb-6">
                            Every engagement is led by a principal. No account managers, no handoffs to junior teams. The person who scopes the system is the person who builds it.
                        </p>
	                        <ul className="space-y-2 text-sm text-muted-foreground">
	                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Scope-to-deploy accountability</li>
	                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Governance designed in, not bolted on</li>
	                        </ul>
                    </div>

                    <div className="group border border-white/10 p-8 hover:bg-white/5 transition-colors duration-500">
                        <Network className="w-12 h-12 mb-8 text-primary opacity-80" />
                        <h3 className="text-2xl font-bold mb-4">Scalable Execution Layer</h3>
	                        <p className="text-muted-foreground mb-6">
	                            For execution, we deploy vetted specialists under principal oversight — each bound by the same governance and quality protocol as the core team.
	                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Domain-specific operators for every layer</li>
                            <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-primary rounded-full" /> Governed under a single delivery protocol</li>
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
                        bio="Operations leader. Goldman Sachs, Uber, BMW. Transforms fragmented enterprise workflows into governed, high-throughput operating models."
                    />
                    <FounderCard 
                        name="Abhishek Agarwal" 
                        role="Co-founder" 
                        image="/abhishek.webp"
                        bio="Founder, Codeacious Tech. Hands-on AI delivery for enterprise and e-commerce. Led architecture programs driving $80M+ in validated value."
                    />
                    {SHOW_AVISHEK && (
                        <FounderCard 
                            name="Avishek Majumder" 
                            role="Co-founder & CEO" 
                            image="/avishek.webp"
                            bio="Data engineer and applied scientist. Builds production pipelines and decision-support systems for regulated, compliance-heavy environments."
                        />
                    )}
                 </div>
            </div>

            {/* CTA */}
            <div className="relative border-t border-white/10 pt-24 text-center">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto">
                    READY TO FIND YOUR <span className="text-primary">ROI WEDGE</span>?
                </h2>
                <div className="flex justify-center">
                    <MagneticButton className="px-12 py-6 text-xl">
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                        >
                            {BOOK_MEETING_CTA} <ArrowRight className="w-6 h-6" />
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
