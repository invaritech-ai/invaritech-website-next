import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
        description: "Redesigned donation flow and website for a key charity, connecting directly to their CRM for seamless donor management.",
        tags: ["Next.js", "Stripe", "CMS Integration"],
        image: "/ccc-isometric.webp",
        link: "", 
        ongoing: true,
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
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24">
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none mix-blend-difference">
                        SELECTED WORK
                    </h1>
                    <p className="text-xl text-muted-foreground md:text-2xl font-light max-w-2xl">
                        A curated selection of production-grade automations and digital platforms.
                    </p>
                </header>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={project.id} className="group relative">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className={`aspect-[4/3] relative overflow-hidden bg-muted/5 border border-white/10 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-3xl">
                                            {project.title}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-primary text-sm font-mono uppercase tracking-widest">
                                            {project.category}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                                        {project.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8 text-xs font-mono text-muted-foreground/60">
                                        {project.tags.map(tag => <span key={tag} className="border border-white/10 px-2 py-1 rounded-full">{tag}</span>)}
                                    </div>

                                    {project.link && (
                                        <MagneticButton className="rounded-none border-foreground/20 hover:border-primary">
                                            <Link href={project.link} className="flex items-center gap-2">
                                                {project.buttonText || (project.ongoing ? "Coming Soon" : "View Case Study")}
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </MagneticButton>
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
