import { Metadata } from "next";
import {
    ArrowRight,
    Clock,
    DollarSign,
    CheckCircle2,
    Terminal,
} from "lucide-react";
import Link from "next/link";
import { HIRING_OPEN, HIRING_STATUS_MESSAGE } from "@/lib/careers";
import { Button } from "@/components/ui/button";
import { BOOK_MEETING_URL } from "@/lib/marketing";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
    title: "Careers | INVARITECH",
    description:
        "Join INVARITECH's engineering team to build production-grade AI systems and workflow automation for enterprise operators.",
    openGraph: {
        title: "Careers | INVARITECH",
        description:
            "Join INVARITECH's engineering team to build production-grade AI systems and workflow automation for enterprise operators.",
        url: "https://www.invaritech.ai/careers/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "INVARITECH Careers" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Careers | INVARITECH",
        description:
            "Join INVARITECH's engineering team to build production-grade AI systems and workflow automation for enterprise operators.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/careers/",
    },
};

const cultureItems = [
    { label: "Principals, not managers", body: "You work directly with founders. No account managers, no ticket queues. Every project has one owner who cares about the outcome." },
    { label: "Scoped, shipped, done", body: "We run fixed-scope sprints with defined deliverables. Vague retainers aren't how we operate — clarity of output is the standard." },
    { label: "Production is the bar", body: "Prototypes don't ship to clients. Everything we build is governed, tested, and documented enough to be handed off and maintained." },
    { label: "Remote, async-first", body: "The team is distributed across Southeast Asia. We communicate in writing, move fast on decisions, and avoid synchronous overhead." },
];

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

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.015]" style={{ backgroundImage: "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#2B4A8A]/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-[11px] font-mono text-primary/50">—</span>
                        <div className="h-[1px] w-6 bg-primary/30" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            Career Opportunities
                        </p>
                    </div>

                    <h1 className="font-editorial text-6xl md:text-[9rem] font-semibold leading-[0.88] tracking-tight text-foreground mb-8">
                        BUILD THE<br />
                        <span className="text-muted-foreground">FUTURE</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                        Join a team of obsessive engineers and designers. We don&apos;t just build software; we architect the operating systems of tomorrow&apos;s enterprises.
                    </p>
                </div>
            </section>

            {/* Culture */}
            <section className="px-6 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="flex items-center gap-3 mb-12 pt-16">
                        <div className="h-[1px] w-6 bg-primary/30" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            How We Work
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {cultureItems.map((item) => (
                            <div
                                key={item.label}
                                className="group border border-border bg-card p-8 hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300"
                            >
                                <h3 className="font-editorial text-xl font-semibold text-foreground mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                    {item.label}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hiring Status */}
            <section className="px-6 pb-16 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {!HIRING_OPEN ? (
                        <div className="border border-destructive/20 bg-destructive/[0.03] p-8 md:p-12">
                            <div className="flex items-start gap-6">
                                <div className="p-4 border border-destructive/20 bg-destructive/[0.05] hidden md:block">
                                    <Terminal className="size-8 text-destructive" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 border border-destructive/30 bg-destructive/[0.05] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-destructive mb-6">
                                        <div className="size-2 bg-destructive animate-pulse" />
                                        Hiring Paused
                                    </div>
                                    <h3 className="font-editorial text-2xl font-semibold text-foreground mb-4">Protocol: Standby</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-mono">
                                        {HIRING_STATUS_MESSAGE}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="border border-primary/20 bg-primary/[0.03] p-8 md:p-12">
                            <div className="flex items-start gap-6">
                                <div className="p-4 border border-primary/20 bg-primary/[0.05] hidden md:block">
                                    <CheckCircle2 className="size-8 text-primary" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/[0.05] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-primary mb-6">
                                        <div className="size-2 bg-primary animate-pulse" />
                                        Positions Open
                                    </div>
                                    <h3 className="font-editorial text-2xl font-semibold text-foreground mb-4">Protocol: Recruitment Active</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-mono">
                                        We are actively seeking exceptional talent to join our core engineering unit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Job Listings */}
            <section className="px-6 pb-32 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-[1px] w-6 bg-primary/30" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            {HIRING_OPEN ? "Open Roles" : "Archived Roles"}
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className={`group relative border p-8 transition-all duration-500 ${
                                    HIRING_OPEN
                                        ? "border-border bg-card hover:border-primary/30 hover:bg-secondary/50"
                                        : "border-border/50 bg-card/50 opacity-60"
                                }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-3">
                                            <span className="text-xs font-mono uppercase tracking-widest text-primary border border-primary/20 bg-primary/[0.05] px-2 py-1">
                                                {job.department}
                                            </span>
                                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
                                                {job.location}
                                            </span>
                                        </div>

                                        <h3 className="font-editorial text-3xl md:text-4xl font-semibold text-foreground group-hover:text-primary transition-colors">
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

                                        <p className="text-muted-foreground max-w-xl leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0">
                                        {HIRING_OPEN ? (
                                            <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold">
                                                <Link href={`/careers/${job.id}/`} className="flex items-center gap-2">
                                                    Apply Now <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                        ) : (
                                            <div className="px-6 py-3 border border-border text-muted-foreground font-mono text-sm uppercase tracking-wider flex items-center gap-2">
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

            {/* CTA */}
            <section className="relative z-10 px-6 pb-32">
                <div className="max-w-7xl mx-auto border-t border-border pt-24 text-center">
                    <h2 className="font-editorial text-4xl md:text-6xl font-semibold tracking-tight mb-8">
                        Don&apos;t see your role?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                        We hire for fit, not only for open positions. If you think you belong here, reach out directly.
                    </p>
                    <Button asChild size="lg" className="rounded-none bg-primary text-white hover:bg-foreground font-semibold h-14 px-10">
                        <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            Start a Conversation <ArrowRight className="w-5 h-5" />
                        </a>
                    </Button>
                </div>
            </section>
        </main>
    );
}
