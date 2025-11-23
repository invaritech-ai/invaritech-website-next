import { Button } from "@/components/ui/button";

import {
    ArrowRight,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    CheckCircle2,
    Code2,
    Database,
    Terminal,
    Cpu,
    MonitorPlay,
} from "lucide-react";
import Link from "next/link";

export default function FullStackDeveloperPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-16">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/careers"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowRight className="mr-2 size-4 rotate-180" />
                        Back to Careers
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                                Full-Stack Software Engineer
                            </h1>
                            <div className="flex flex-wrap gap-4 text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Briefcase className="size-4" />
                                    Engineering
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="size-4" />
                                    Remote (HK Time Preferred)
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="size-4" />
                                    Full-time (Hourly Contract)
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <DollarSign className="size-4" />
                                    HKD 32–39 / hr
                                </div>
                            </div>
                        </div>
                        <Button asChild size="lg" className="shrink-0">
                            <a href="mailto:hello@invaritech.ai?subject=Application: Full-Stack Software Engineer">
                                Apply Now <ArrowRight className="ml-2 size-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-3xl space-y-16">
                    {/* About the Role */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">About the Role</h2>
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Invaritech is looking for a curious and proactive <strong>Full-Stack Software Engineer</strong> to join our growing team. This is a unique opportunity for a junior-to-mid-level engineer to work directly with founders, build scalable products, and accelerate their career growth.
                            </p>
                            <p className="mt-4 text-muted-foreground">
                                You will work across the entire stack—from building responsive frontends in React to designing backend workflows in Python. We don&apos;t expect you to know everything on day one, but we do expect a hunger to learn. This role is designed to be a springboard: you&apos;ll start by contributing to features under guidance and grow into a Senior Full-Stack & Cloud/DevOps Engineer over time.
                            </p>
                        </div>
                    </section>

                    {/* Responsibilities */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">What You&apos;ll Do</h2>
                        <div className="grid gap-4">
                            {[
                                "Implement and maintain user-facing features in our web and mobile apps.",
                                "Work on backend APIs, integrations, and data processing workflows.",
                                "Collaborate with designers and senior engineers to translate requirements into technical tasks.",
                                "Write clean, understandable, and maintainable code with basic tests.",
                                "Debug and fix bugs across the stack (frontend, backend, and integrations).",
                                "Work with databases (relational and NoSQL) for CRUD operations and basic queries.",
                                "Use automation tools like N8N to connect different systems.",
                                "Learn and adopt new tools, frameworks, and best practices as required.",
                            ].map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Our Tech Stack</h2>
                        <p className="text-muted-foreground mb-6">
                            You aren&apos;t required to know all of these immediately, but familiarity with some and a strong desire to learn the rest is essential.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-card border rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                    <Code2 className="size-5" />
                                    <h3 className="font-semibold">Frontend</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-muted-foreground ml-1">
                                    <li>• React (Next.js)</li>
                                    <li>• React Native</li>
                                    <li>• Tailwind CSS</li>
                                    <li>• Animation (GSAP)</li>
                                </ul>
                            </div>
                            <div className="bg-card border rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                    <Terminal className="size-5" />
                                    <h3 className="font-semibold">Backend</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-muted-foreground ml-1">
                                    <li>• Python</li>
                                    <li>• REST APIs</li>
                                    <li>• Serverless Functions</li>
                                </ul>
                            </div>
                            <div className="bg-card border rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                    <Database className="size-5" />
                                    <h3 className="font-semibold">Data & Automation</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-muted-foreground ml-1">
                                    <li>• PostgreSQL</li>
                                    <li>• NoSQL Databases</li>
                                    <li>• N8N Workflows</li>
                                </ul>
                            </div>
                            <div className="bg-card border rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3 text-primary">
                                    <Cpu className="size-5" />
                                    <h3 className="font-semibold">Growth Path</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-muted-foreground ml-1">
                                    <li>• DevOps & CI/CD</li>
                                    <li>• Cloud Engineering</li>
                                    <li>• System Architecture</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Requirements */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Must-Have</h3>
                                <ul className="space-y-3">
                                    {[
                                        "0–2 years of experience in software development (professional or strong personal projects).",
                                        "Hands-on experience with modern frontend frameworks (ideally React).",
                                        "Understanding of backend development (Python or similar).",
                                        "Basic understanding of SQL and willingness to learn NoSQL.",
                                        "Strong curiosity and ability to learn independently.",
                                        "Good communication skills and reliability in a remote environment.",
                                    ].map((item, index) => (
                                        <li key={index} className="flex gap-3 text-muted-foreground">
                                            <div className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Nice-to-Have</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Experience with Next.js, React Native, or Tailwind CSS.",
                                        "Familiarity with GSAP or other animation libraries.",
                                        "Experience with N8N or other automation tools.",
                                        "Familiarity with Git and branching workflows.",
                                        "Exposure to cloud platforms (AWS, GCP, Azure).",
                                    ].map((item, index) => (
                                        <li key={index} className="flex gap-3 text-muted-foreground">
                                            <div className="size-1.5 rounded-full bg-muted-foreground/40 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Contract Details */}
                    <section className="bg-muted/30 rounded-2xl p-6 sm:p-8 border">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MonitorPlay className="size-5 text-primary" />
                            Contract Details & Transparency
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                We believe in full transparency. This is an <strong>hourly contract role</strong> with a rate of <strong>HKD 32–39 per hour</strong>, depending on experience.
                            </p>
                            <p>
                                To ensure accurate billing and productivity for this remote role, we require the use of our <strong>productivity/monitoring software</strong> while working. This software tracks active work time to guarantee you are paid for every minute you contribute.
                            </p>
                            <p className="text-sm italic">
                                * Without this software active, work will not be considered billable.
                            </p>
                        </div>
                    </section>

                    {/* How to Apply */}
                    <section className="border-t pt-16">
                        <div className="bg-primary/5 rounded-3xl p-8 sm:p-12 text-center">
                            <h2 className="text-3xl font-bold mb-4">Ready to Grow?</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                                If you&apos;re eager to learn, build, and solve real problems, we want to hear from you.
                            </p>
                            
                            <div className="max-w-md mx-auto text-left bg-background p-6 rounded-xl border mb-8 shadow-sm">
                                <p className="font-medium mb-4">Please email <a href="mailto:hello@invaritech.ai" className="text-primary hover:underline">hello@invaritech.ai</a> with:</p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-primary">1.</span>
                                        Your CV
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-primary">2.</span>
                                        A short note on why you want to join and what you&apos;re currently learning
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-primary">3.</span>
                                        Links to projects, GitHub, or portfolio (unfinished projects are welcome!)
                                    </li>
                                </ul>
                            </div>

                            <Button asChild size="lg" className="w-full sm:w-auto">
                                <a href="mailto:hello@invaritech.ai?subject=Application: Full-Stack Software Engineer">
                                    Send Application <ArrowRight className="ml-2 size-4" />
                                </a>
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}