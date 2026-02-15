import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";

export const metadata: Metadata = {
    title: "Our Work - Automation Projects",
    description:
        "See how INVARITECH builds compliance bridges, data pipelines, and custom automation for enterprise and mid-market organizations.",
    openGraph: {
        title: "Our Work - Automation Projects & Case Studies",
        url: "https://www.invaritech.ai/work/",
        images: ["/og-image.webp"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/work/",
    },
};

const projects = [
    {
        id: "eudr",
        title: "EUDR Compliance Bridge",
        category: "Automation & Compliance",
        description: "A Python FastAPI bridge enabling a French operator to submit thousands of EUDR Due Diligence Statements via a simple REST API.",
        tags: ["Python", "FastAPI", "PostgreSQL", "SOAP"],
        image: "/eudr-preview.webp",
        link: "/work/eudr-compliance-bridge/",
    },
    {
        id: "charity",
        title: "China Coast Community",
        category: "Web & Automation",
        description: "Modernizing the digital presence and operational flow for a premier elderly care charity in HK. Connecting front-end engagement to CRM-led donor management.",
        tags: ["Next.js", "Stripe", "CRM Integration"],
        image: "/ccc-isometric.webp",
        link: "https://reclaim-emergent-code.vercel.app", 
        statusLabel: "Review Phase",
    },
    {
        id: "custom",
        title: "Your Custom Solution",
        category: "Consulting & Development",
        description: "We identify your biggest bottleneck and deliver a custom automation solution within 30 days.",
        tags: ["Analysis", "Strategy", "Custom Build"],
        image: "/work/custom-solution.webp",
        link: "https://calendly.com/hello-invaritech/30min",
        buttonText: "Talk to Us",
    },
];

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-primary/20 selection:text-primary">
            <ArtisticBackground />
            
             {/* Ghost Typography Background Layer */}
            <div className="absolute top-40 -right-20 select-none pointer-events-none opacity-[0.03] whitespace-nowrap z-0">
                <span className="text-[25rem] font-black tracking-tighter uppercase text-white">
                    PROOF
                </span>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-4 md:px-8">
                <header className="mb-32">
                    <TextEffect
                        per="char"
                        preset="fade"
                        as="h1"
                        className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none mix-blend-difference text-white"
                    >
                        SELECTED WORK
                    </TextEffect>
                    <p className="text-xl text-muted-foreground md:text-2xl font-light max-w-2xl border-l border-primary/30 pl-6 py-2">
                        Engineering leverage through production-grade automation. A curated record of delivered outcomes.
                    </p>
                </header>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={project.id} className="group relative">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className={`aspect-[4/3] relative overflow-hidden group/card ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    {/* Scanner Overlay */}
                                    <div className="absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent h-1/2 animate-scan"></div>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_60%)]"></div>
                                    </div>

                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-3xl bg-white/5 border border-white/10">
                                            {project.title}
                                        </div>
                                    )}
                                    
                                    {/* Cinematic Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                                </div>

                                <div className="space-y-8 p-4 md:p-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-primary text-xs font-mono uppercase tracking-[0.3em]">
                                            {(index + 1).toString().padStart(2, '0')} {"//"} {project.category}
                                        </span>
                                        {project.statusLabel && (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono animate-pulse">
                                                {project.statusLabel}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-mono text-muted-foreground/60 border border-white/5 px-2 py-1 rounded-none bg-white/5 lowercase">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {project.link && (
                                        <div className="pt-4">
                                            <MagneticButton className="rounded-none border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all">
                                                <Link href={project.link} className="flex items-center gap-3 px-8 py-4">
                                                    <span className="text-sm font-bold uppercase tracking-widest">
                                                        {project.buttonText || (project.statusLabel ? project.statusLabel : "View Case")}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                                </Link>
                                            </MagneticButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
