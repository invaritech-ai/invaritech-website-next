import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Keeping for utility but might not use directly if MagneticButton replaces it
import { ArrowRight, ShieldCheck, Database, Zap, Code, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "Services - Drop-In AI Automation & Custom Software",
    description:
        "INVARITECH delivers drop-in AI automation sprints and custom software layers on top of existing enterprise systems.",
    openGraph: {
        title: "Services - Drop-In AI Automation & Custom Software",
        description:
            "Drop-in AI automation, integration engineering, and production-grade custom software for operations teams.",
        url: "https://www.invaritech.ai/services/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Services - Drop-In AI Automation & Custom Software",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/",
    },
};

const generalServices = [
    {
        title: "Custom Automation",
        description:
            "We help you identify the single biggest bottleneck costing you 100+ hours a month, then deliver a custom automation solution within 30 days.",
        icon: Zap,
    },
    {
        title: "System Integration",
        description:
            "Connect your existing tools (Google Workspace, HubSpot, CRMs, portals) into reliable, automated workflows that eliminate manual data entry.",
        icon: Database,
    },
    {
        title: "Backend Development",
        description:
            "Custom APIs, data pipelines, and backend systems built to scale with your business needs. Production-grade code delivered fast.",
        icon: Code,
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <ArtisticBackground />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-[90vw] mx-auto">
                    <TextEffect 
                        per="char" 
                        preset="fade" 
                        className="text-xs md:text-sm font-mono tracking-[0.2em] text-primary mb-8 block"
                    >
                        OUR CAPABILITIES
                    </TextEffect>
                    
                    <h1 className="text-[10vw] leading-[0.85] font-bold tracking-tighter mb-12 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            ENGINEERED
                        </TextEffect>
                        <br />
                        <span className="text-white/50">EFFICIENCY</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light border-l-2 border-primary/50 pl-6">
                        We build custom software and AI automation layers on top of your current systems so operations move faster without disruption.
                    </p>
                </div>
            </section>

            {/* Featured Service: Compliance Bridge */}
            <section className="py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <Badge 
                            variant="outline" 
                            className="mb-6 border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest"
                        >
                            FEATURED SOLUTION
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Compliance <br/>
                            <span className="text-primary">Workflow Bridge</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            We turn your most painful compliance and reporting workflow into one reliable, auditable pipeline in 30 days. Using the tools you already have.
                        </p>
                        
                        <ul className="space-y-4 mb-12">
                            {[
                                "Automated compliance workflows",
                                "Auditable pipeline",
                                "30-day delivery",
                                "Works with existing tools"
                            ].map((feature) => (
                                <li key={feature} className="flex items-center gap-3 text-lg">
                                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Check className="size-3.5" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link href="/services/compliance-bridge/">
                            <MagneticButton className="bg-white/10 hover:bg-white/20 border-white/10 text-white">
                                View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                            </MagneticButton>
                        </Link>
                    </div>

                    <div className="order-1 md:order-2 h-full min-h-[400px] relative rounded-3xl overflow-hidden border border-white/10 group">
                         <Image
                            src="/compliance-bridge.webp"
                            alt="Compliance Workflow Bridge"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                             <div className="text-4xl font-mono font-bold text-white/20">01</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* General Services Grid */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                         <h2 className="text-[5vw] font-bold leading-none mb-6 opacity-20">
                            CORE SERVICES
                        </h2>
                         <p className="text-xl text-muted-foreground max-w-2xl">
                            Beyond our packaged solutions, we provide custom development and integration services tailored to your specific needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {generalServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div 
                                    key={service.title} 
                                    className="group relative p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-500"
                                >
                                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                        <Icon className="size-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="absolute top-8 right-8 text-sm font-mono text-white/10">
                                        0{index + 2}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">
                        READY TO <span className="text-primary">SCALE?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Book a meeting to scope one operational bottleneck and assess whether a 30-day sprint is the right fit.
                    </p>
                    
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        <MagneticButton 
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold"
                            textClassName="group-hover:text-black"
                        >
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                </div>
            </section>
        </main>
    );
}
