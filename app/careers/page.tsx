import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { HIRING_OPEN, HIRING_STATUS_MESSAGE } from "@/lib/careers";

export const metadata: Metadata = {
    title: "Careers - Join Our Team",
    description:
        "Join INVARITECH's team of automation experts. We're looking for talented engineers to help build compliance bridges and data pipelines.",
    openGraph: {
        title: "Careers at INVARITECH - Build Automation Solutions",
        description:
            "Join our boutique automation studio. Work on compliance bridges, data pipelines, and admin tools for small service businesses.",
        url: "https://www.invaritech.ai/careers/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Careers at INVARITECH - Build Automation Solutions",
                type: "image/webp",
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
        <main className="min-h-screen pt-24 pb-16">
            <section className="container mx-auto px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                        Join Our Team
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
                        Build the future with us. We&apos;re looking for
                        passionate individuals to help us craft
                        precision-engineered digital solutions.
                    </p>
                    {!HIRING_OPEN && (
                        <div className="mx-auto mb-10 max-w-2xl rounded-2xl border border-emerald-500/35 bg-gradient-to-r from-emerald-500/15 via-emerald-400/10 to-transparent p-5 text-left shadow-lg shadow-emerald-500/10">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                                <CheckCircle2 className="size-3.5" />
                                Hiring Pause
                            </div>
                            <p className="text-sm text-foreground/85 leading-relaxed">
                                {HIRING_STATUS_MESSAGE}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mx-auto max-w-4xl mt-16">
                    <h2 className="text-2xl font-semibold mb-8">
                        {HIRING_OPEN
                            ? "Open Positions"
                            : "Recently Filled Positions"}
                    </h2>
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className={`group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all ${
                                    HIRING_OPEN
                                        ? "hover:shadow-lg"
                                        : "border-border/70 bg-muted/20 saturate-[0.8]"
                                }`}
                            >
                                {!HIRING_OPEN && (
                                    <>
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(120,120,120,0.08)_0px,rgba(120,120,120,0.08)_10px,transparent_10px,transparent_20px)]"
                                        />
                                        <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                                            <Sparkles className="size-3" />
                                            Position Filled
                                        </div>
                                    </>
                                )}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <Briefcase className="size-4" />
                                                {job.department}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="size-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-4" />
                                                {job.type}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="size-4" />
                                                {job.pay}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground">
                                            {job.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        {HIRING_OPEN ? (
                                            <Button
                                                asChild
                                                className="w-full sm:w-auto"
                                            >
                                                <Link
                                                    href={`/careers/${job.id}/`}
                                                >
                                                    Apply Now{" "}
                                                    <ArrowRight className="ml-2 size-4" />
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                variant="outline"
                                                className="w-full sm:w-auto border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                                            >
                                                Position Filled
                                            </Button>
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
