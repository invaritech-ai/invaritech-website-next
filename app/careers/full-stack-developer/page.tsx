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
import { Metadata } from "next";
import { HIRING_OPEN, HIRING_STATUS_MESSAGE } from "@/lib/careers";

export const metadata: Metadata = {
    title: "Full-Stack Software Engineer - Careers",
    description:
        "Join INVARITECH as a Full-Stack Software Engineer. Remote position, hourly contract. Work on automation solutions and grow your career.",
    openGraph: {
        title: "Full-Stack Software Engineer - Careers",
        description:
            "Join INVARITECH as a Full-Stack Software Engineer. Remote position, hourly contract.",
        url: "https://www.invaritech.ai/careers/full-stack-developer/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Full-Stack Software Engineer - Careers",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/careers/full-stack-developer/",
    },
};

export default function FullStackDeveloperPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-16">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/careers/"
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
                        {HIRING_OPEN ? (
                            <Button asChild size="lg" className="shrink-0">
                                <a href="mailto:hello@invaritech.ai?subject=Application: Full-Stack Software Engineer">
                                    Apply Now{" "}
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                disabled
                                variant="outline"
                                className="shrink-0 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                            >
                                Position Filled
                            </Button>
                        )}
                    </div>
                    {!HIRING_OPEN && (
                        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 via-emerald-400/10 to-transparent p-5 shadow-lg shadow-emerald-500/10">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                                <CheckCircle2 className="size-3.5" />
                                Applications Closed
                            </div>
                            <p className="text-sm text-foreground/85 leading-relaxed">
                                {HIRING_STATUS_MESSAGE}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-3xl space-y-16">
                    {/* About the Role */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">
                            About the Role
                        </h2>
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Invaritech is looking for a curious and
                                proactive{" "}
                                <strong>Full-Stack Software Engineer</strong> to
                                join our growing team. This is a hands-on
                                opportunity for a junior-to-mid-level engineer
                                to work directly with founders, build real
                                production systems, and grow quickly through
                                direct exposure to real-world problems.
                            </p>
                            <p className="mt-4 text-muted-foreground">
                                You&apos;ll work across the entire stack—from
                                building responsive frontends in React to
                                designing backend workflows in Python. We
                                don&apos;t expect you to know everything on day
                                one, but we do expect a strong willingness to
                                learn. This role is designed as a springboard:
                                you&apos;ll start by contributing to features
                                with guidance and gradually grow into a Senior
                                Full-Stack / Cloud / DevOps Engineer over time.
                            </p>
                        </div>
                    </section>

                    {/* Responsibilities */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">
                            What You&apos;ll Do
                        </h2>
                        <div className="grid gap-4">
                            {[
                                "Implement and maintain user-facing features in our web and mobile applications.",
                                "Build and extend backend APIs, integrations, and data-processing workflows.",
                                "Collaborate with designers and senior engineers to translate requirements into technical tasks.",
                                "Write clean, understandable, and maintainable code with basic tests.",
                                "Debug and fix issues across the stack (frontend, backend, integrations).",
                                "Work with relational and NoSQL databases for CRUD operations and basic queries.",
                                "Use automation tools like n8n to connect systems and reduce manual work.",
                                "Learn and adopt new tools, frameworks, and best practices as needed.",
                            ].map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">
                            Our Tech Stack
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            You don&apos;t need to know everything below
                            immediately. Familiarity with some of these—and a
                            strong desire to learn the rest—is what matters.
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
                                    <h3 className="font-semibold">
                                        Data & Automation
                                    </h3>
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
                                    <h3 className="font-semibold">
                                        Growth Path
                                    </h3>
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
                        <h2 className="text-2xl font-bold mb-6">
                            Requirements
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Must-Have
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "0–2 years of software development experience (professional or strong personal projects).",
                                        "Hands-on experience with a modern frontend framework (ideally React).",
                                        "Basic backend development experience (Python or similar).",
                                        "Basic understanding of SQL and willingness to learn NoSQL.",
                                        "Strong curiosity and ability to learn independently.",
                                        "Clear communication and reliability in a remote setup.",
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-muted-foreground"
                                        >
                                            <div className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Nice-to-Have
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Experience with Next.js, React Native, or Tailwind CSS.",
                                        "Familiarity with GSAP or other animation libraries.",
                                        "Experience with n8n or similar automation tools.",
                                        "Familiarity with Git and branching workflows.",
                                        "Exposure to cloud platforms (AWS, GCP, Azure).",
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-muted-foreground"
                                        >
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
                                We believe in being upfront about how we work
                                together. This role is an{" "}
                                <strong>hourly contract position</strong>, with
                                a rate of <strong>HKD 32–39 per hour</strong>,
                                depending on experience.
                            </p>
                            <p>
                                Because the team is fully remote, we use a
                                lightweight time-tracking tool during working
                                hours. This helps keep billing accurate and
                                ensures you&apos;re paid fairly for the time you
                                actually work.
                            </p>
                            <p>
                                The tool records active work time only (not
                                personal activity), and its sole purpose is to
                                maintain clarity and trust on both sides.
                            </p>
                            <p className="text-sm italic">
                                Hours worked without the tracker active
                                can&apos;t be counted as billable.
                            </p>
                        </div>
                    </section>

                    {/* How to Apply */}
                    <section className="border-t pt-16">
                        {HIRING_OPEN ? (
                            <div className="bg-primary/5 rounded-3xl p-8 sm:p-12 text-center">
                                <h2 className="text-3xl font-bold mb-4">
                                    Ready to Grow?
                                </h2>
                                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                                    If you&apos;re eager to learn, build, and
                                    solve real problems, we&apos;d love to hear
                                    from you.
                                </p>

                                <div className="max-w-md mx-auto text-left bg-background p-6 rounded-xl border mb-8 shadow-sm">
                                    <p className="font-medium mb-4">
                                        Please email{" "}
                                        <a
                                            href="mailto:hello@invaritech.ai"
                                            className="text-primary hover:underline"
                                        >
                                            hello@invaritech.ai
                                        </a>{" "}
                                        with:
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex gap-2">
                                            <span className="text-primary">
                                                1.
                                            </span>
                                            Your CV
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary">
                                                2.
                                            </span>
                                            A short note on why you want to join
                                            and what you&apos;re currently
                                            learning
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-primary">
                                                3.
                                            </span>
                                            Links to projects, GitHub, or a
                                            portfolio (unfinished projects are
                                            welcome)
                                        </li>
                                    </ul>
                                </div>

                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full sm:w-auto"
                                >
                                    <a href="mailto:hello@invaritech.ai?subject=Application: Full-Stack Software Engineer">
                                        Send Application{" "}
                                        <ArrowRight className="ml-2 size-4" />
                                    </a>
                                </Button>
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-card p-8 sm:p-12 text-center shadow-xl shadow-emerald-500/10">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                                    <CheckCircle2 className="size-3.5" />
                                    Position Filled
                                </div>
                                <h2 className="text-3xl font-bold mb-4">
                                    This Role Is Closed
                                </h2>
                                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                                    Thanks for your interest. We&apos;re not
                                    accepting applications for this posting at
                                    the moment.
                                </p>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/careers/">
                                        Back to Careers{" "}
                                        <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
