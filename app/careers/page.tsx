import {
	    ArrowRight,
	    Clock,
	    DollarSign,
	    CheckCircle2,
	    Sparkles,
	    Terminal,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { HIRING_OPEN, HIRING_STATUS_MESSAGE } from "@/lib/careers";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "Careers - Join Our Team",
    description:
        "Join INVARITECH's team of automation experts. We're looking for talented engineers to help build compliance bridges and data pipelines.",
    openGraph: {
        title: "Careers at INVARITECH - Build Automation Solutions",
        description:
            "Join our boutique automation studio. Work on compliance bridges, data pipelines, and admin tools for high-growth organizations.",
        url: "https://www.invaritech.ai/careers/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Careers at INVARITECH - Build Automation Solutions",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/careers/",
    },
};

export default function CareersPage() {
    const jobs = [
        {
            id: "full-stack-developer",
            title: "Full-Stack Software Engineer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time (Hourly Contract)",
            pay: "HKD 32–39 / hr",
            description:
                "We are looking for an experienced Full-Stack Software Engineer to join our team and help build the next generation of digital solutions.",
        },
    ];

    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            <ArtisticBackground />
            
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative z-10">
                <div className="max-w-[90vw] mx-auto text-center md:text-left">
                    <TextEffect 
                        per="char" 
                        preset="fade" 
                        className="text-xs md:text-sm font-mono tracking-[0.2em] text-primary mb-8 block text-center md:text-left"
                    >
                        CAREER OPPORTUNITIES
                    </TextEffect>
                    
                    <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mb-12 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            BUILD THE
                        </TextEffect>
                        <br />
                        <span className="text-white/20">FUTURE</span>
                    </h1>
                    
	                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
	                        Join a team of obsessive engineers and designers. We don&apos;t just build software; we architect the operating systems of tomorrow&apos;s enterprises.
	                    </p>
                </div>
            </section>

            {/* Hiring Status Termimal */}
            <section className="px-6 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {!HIRING_OPEN ? (
                         <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-red-950/10 backdrop-blur-md p-8 md:p-12">
                            <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 hidden md:block">
                                    <Terminal className="size-8 text-red-500" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-red-500 mb-6">
                                        <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                                        Hiring Paused
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Protocol: Standby</h3>
                                    <p className="text-lg text-muted-foreground/80 leading-relaxed font-mono">
                                        {HIRING_STATUS_MESSAGE}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-md p-8 md:p-12">
                             <div className="flex items-start gap-6">
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hidden md:block">
                                    <CheckCircle2 className="size-8 text-emerald-500" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-500 mb-6">
                                        <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Positions Open
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Protocol: Recruitment Active</h3>
                                    <p className="text-lg text-muted-foreground/80 leading-relaxed font-mono">
                                        We are actively seeking exceptional talent to join our core engineering unit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Job Listings / Archive */}
            <section className="px-6 pb-32 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-[4vw] font-bold leading-none mb-12 opacity-20 text-center md:text-left">
                        {HIRING_OPEN ? "MISSION PARAMETERS" : "ARCHIVED ROLES"}
                    </h2>

                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 ${
                                    HIRING_OPEN
                                        ? "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10"
                                        : "bg-white/0 border-white/5 opacity-60"
                                }`}
                            >
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-3">
                                            <span className="text-xs font-mono uppercase tracking-widest text-primary/80 border border-primary/20 px-2 py-1 rounded">
                                                {job.department}
                                            </span>
                                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground border border-white/10 px-2 py-1 rounded">
                                                {job.location}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors">
                                            {job.title}
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-6 text-sm font-mono text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <Clock className="size-4" /> {job.type}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <DollarSign className="size-4" /> {job.pay}
                                            </span>
                                        </div>
                                        
                                        <p className="text-muted-foreground max-w-xl">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0">
                                        {HIRING_OPEN ? (
                                            <Link href={`/careers/${job.id}/`}>
                                                <MagneticButton strength={0.3} className="bg-white text-black font-bold">
                                                    Initiate Application <ArrowRight className="ml-2 w-4 h-4" />
                                                </MagneticButton>
                                            </Link>
                                        ) : (
                                            <div className="px-6 py-3 rounded-full border border-white/10 text-white/40 font-mono text-sm uppercase tracking-wider flex items-center gap-2">
                                                <Sparkles className="size-4" />
                                                Position Filled
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
