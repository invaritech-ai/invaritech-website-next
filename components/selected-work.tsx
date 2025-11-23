import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";


const selectedProjects = [
    {
        title: "EUDR Compliance Bridge",
        description: "We built a Python FastAPI bridge and database around a SOAP‑based EU backend so a small French operator could submit thousands of Due Diligence Statements in minutes.",
        image: "/eudr-preview.webp",
        href: "/work/eudr-compliance-bridge",
    },
    {
        title: "China Coast Community Website Redesign",
        description: "We redesigned a small charity’s website and donation flow to make it easier for donors to contribute and for staff to maintain content.",
        image: "/ccc-isometric.webp",
        href: "/work",
    },
    {
        title: "WeekendSuite (In Development)",
        description: "WeekendSuite is our own product: a focused admin tool for freelancers and tiny agencies that handles the messy middle from lead to invoice.",
        image: "/weekendsuite.webp",
        href: "/weekend-suite",
    },
];

export default function SelectedWorkSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="text-3xl font-semibold md:text-5xl">
                            Selected Work
                        </h2>
                        <p className="mt-4 max-w-xl text-muted-foreground">
                            A glimpse into how we solve complex problems with elegant solutions.
                        </p>
                    </div>
                    <Link
                        href="/work"
                        className="group flex items-center gap-2 text-sm font-medium text-primary"
                    >
                        View all projects
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {selectedProjects.map((project, index) => (
                        <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                            <div className="aspect-video w-full bg-muted relative">
                                {project.image ? (
                                    <Image 
                                        src={project.image} 
                                        alt={project.title} 
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl">
                                        {project.title[0]}
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 text-sm text-muted-foreground">
                                    {project.description}
                                </p>
                                <Link
                                    href={project.href}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                >
                                    Read Case Study
                                    <ArrowRight className="size-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
