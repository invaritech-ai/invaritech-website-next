import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: "eudr",
        title: "EUDR Compliance Bridge",
        category: "Automation & Compliance",
        description: "We built a Python FastAPI bridge and database around a SOAP‑based EU backend so a small French operator could submit thousands of EUDR Due Diligence Statements through a simple REST API and dashboard. Includes a retry queue and monitoring.",
        tags: ["Python", "FastAPI", "PostgreSQL", "SOAP"],
        image: "/work/eudr-full.jpg", // Placeholder
        link: "#", // Placeholder for external link
    },
    {
        id: "charity",
        title: "Charity Donation Refresh",
        category: "Web & Automation",
        description: "We redesigned a small charity’s website and donation flow to make it easier for donors to give and for staff to maintain content. The new flow is simpler, faster, and connects directly to their CRM.",
        tags: ["Next.js", "Stripe", "CMS Integration"],
        image: "/work/charity-full.jpg", // Placeholder
        link: "#", // Placeholder for external link
    },
];

export default function WorkPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        Our Work
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        A few examples of the kind of systems we build. Most of our work is behind the scenes, connecting existing tools into reliable workflows.
                    </p>
                </div>

                <div className="space-y-16">
                    {projects.map((project) => (
                        <div key={project.id} id={project.id} className="scroll-mt-32">
                            <Card className="overflow-hidden border-none shadow-none bg-transparent">
                                <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-start">
                                    <div className="aspect-video relative rounded-2xl overflow-hidden bg-muted border shadow-sm group">
                                        {/* Placeholder for project image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-3xl">
                                            {project.title}
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                    </div>
                                    
                                    <div className="flex flex-col h-full justify-center">
                                        <div className="mb-4">
                                            <Badge variant="secondary" className="mb-4">
                                                {project.category}
                                            </Badge>
                                            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex gap-4">
                                            <ButtonLink href={project.link}>
                                                View Project <ExternalLink className="ml-2 size-4" />
                                            </ButtonLink>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            {/* Divider */}
                            <div className="mt-16 h-px w-full bg-border/50" />
                        </div>
                    ))}

                    {/* Labs Section for Weekend */}
                    <div id="weekend" className="scroll-mt-32">
                        <div className="rounded-2xl bg-muted/30 p-8 md:p-12 border border-border/50">
                            <div className="max-w-3xl">
                                <Badge variant="outline" className="mb-4 bg-background">
                                    Invaritech Labs
                                </Badge>
                                <h2 className="text-3xl font-bold mb-4">Weekend</h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Weekend is our in-house product: a weekend-sized admin suite for freelancers and tiny agencies. It handles the messy middle from lead → proposal → contract → onboarding → invoice.
                                </p>
                                <ButtonLink href="/weekend">
                                    Learn more & join the waitlist <ArrowRight className="ml-2 size-4" />
                                </ButtonLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ButtonLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
            {children}
        </Link>
    );
}
