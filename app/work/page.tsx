import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

export const metadata: Metadata = {
    title: "Payment Controls Work & Proof",
    description:
        "Delivered proof from regulated workflow work, plus AP payment controls for invoice approvals, duplicate payment checks, and auditable exception handling.",
    openGraph: {
        title: "Payment Controls Work & Delivered Proof | INVARITECH",
        description:
            "Delivered proof from regulated workflow work, plus AP payment controls for invoice approvals, duplicate payment checks, and auditable exception handling.",
        url: "https://www.invaritech.ai/work/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "INVARITECH Work - Payment Controls Proof" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Payment Controls Work & Delivered Proof | INVARITECH",
        description:
            "Delivered proof from regulated workflow work, plus AP payment controls for invoice approvals, duplicate payment checks, and auditable exception handling.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/work/",
    },
};

const projects = [
    {
        id: "eudr",
        title: "EUDR Compliance Bridge",
        category: "International Proof Case",
        description: "A Python FastAPI bridge enabling a French operator to submit thousands of EUDR Due Diligence Statements via a simple REST API.",
        tags: ["Python", "FastAPI", "PostgreSQL", "SOAP"],
        image: "/eudr-preview.webp",
        link: "/work/eudr-compliance-bridge/",
        metric: "Thousands of submissions in minutes",
    },
];

export default function WorkPage() {
    return (
        <main className="site-page relative overflow-hidden selection:bg-primary/20 selection:text-primary">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="site-page-grid" />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Ghost word */}
            <div className="absolute top-40 -right-20 select-none pointer-events-none opacity-[0.02] whitespace-nowrap z-0 overflow-hidden">
                <span className="font-editorial text-[25rem] font-bold tracking-tighter uppercase text-foreground">
                    PROOF
                </span>
            </div>

            {/* Hero */}
            <section className="site-section-hero relative z-10">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">Payment controls and delivered proof</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Proof we can deliver strict workflow controls.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            We build invoice approval controls, duplicate payment checks, supplier exception routing, and audit evidence for finance teams. The EUDR bridge below is the proof point: strict, regulated workflow work delivered end to end.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <div className="relative z-10 site-container pb-20">
                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={project.id} className="group relative">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Image */}
                                <div className={`aspect-[4/3] relative overflow-hidden border border-border group/card ${index % 2 === 1 ? "md:order-2" : ""}`}>
                                    {/* Scan overlay on hover */}
                                    <div className="absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent h-1/2 animate-scan" />
                                    </div>

                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold text-3xl bg-card">
                                            {project.title}
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                                </div>

                                {/* Content */}
                                <div className="space-y-8 p-4 md:p-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] font-mono text-primary/50">{(index + 1).toString().padStart(2, "0")}</span>
                                        <div className="h-[1px] w-6 bg-primary/30" />
                                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                            {project.category}
                                        </span>
                                        {project.metric && (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary/25 bg-primary/[0.06] text-primary text-[10px] font-mono tracking-wider">
                                                <div className="w-1 h-1 bg-primary rounded-full" />
                                                {project.metric}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="font-editorial text-4xl md:text-6xl font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h2>

                                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] font-mono text-muted-foreground border border-border px-2 py-1 lowercase bg-card">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4">
                                        <Button asChild variant="outline" size="lg" className="rounded-none border-border bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all group/btn">
                                            <Link href={project.link} className="flex items-center gap-3">
                                                <span className="text-sm font-semibold uppercase tracking-widest">
                                                    {project.metric === "Live Site" ? "View Site" : "View Case"}
                                                </span>
                                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-40 border-t border-border pt-24 text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Start With One Control</span>
                        <div className="h-[1px] w-8 bg-primary/40" />
                    </div>
                    <h2 className="font-editorial text-4xl md:text-6xl font-semibold tracking-tight mb-8 max-w-3xl mx-auto">
                        Have an AP controls problem we should look at?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                        Bring one invoice approval workflow, supplier reconciliation issue, or duplicate payment risk. We will run the first checks and tell you where the control risk sits.
                    </p>
                    <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold h-14 px-10">
                        <Link href="/contact?audit=1&src=work">
                            Book a Finance Workflow Audit
                        </Link>
                    </Button>
                </div>
            </div>

            <HomepageScrollAnimations />
        </main>
    );
}
