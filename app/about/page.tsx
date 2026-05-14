import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Bug, ClipboardCheck, Handshake, PenTool } from "lucide-react";
import { BOOK_MEETING_URL, RULE_TABLE_CTA } from "@/lib/marketing";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About INVARITECH | Founder-Led Payment Control Design",
    description:
        "INVARITECH works with one client at a time to design, build, and maintain finance workflows that reduce exception handling without forcing a system overhaul.",
    openGraph: {
        title: "About INVARITECH | Founder-Led Payment Control Design",
        description:
            "Founder-led payment control design for finance teams. One client at a time, fixed scope, measurable acceptance criteria, and ongoing managed support.",
        url: "https://www.invaritech.ai/about/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About INVARITECH - Founder-Led Payment Control Design" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About INVARITECH | Founder-Led Payment Control Design",
        description:
            "One client at a time. Fixed-scope payment control design with measurable acceptance criteria and ongoing managed support.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/about/",
    },
};

const SHOW_AVISHEK = true;

const standards = [
    {
        icon: ClipboardCheck,
        title: "Objectives first",
        body: "We agree the workflow objective and three measurable acceptance criteria before any build starts.",
    },
    {
        icon: Bug,
        title: "Bugs are on us",
        body: "If the agreed control does not work as specified, we fix it without charging for the correction.",
    },
    {
        icon: Handshake,
        title: "New scope stays separate",
        body: "New features or new exception families are scoped separately after the original objective is delivered.",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background pt-28 md:pt-36">
            <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
                <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                    <div>
                        <p className="mb-8 max-w-max border-y border-primary/30 py-2 text-[11px] font-mono uppercase tracking-[0.24em] text-primary">
                            Founder-led service model
                        </p>
                        <h1 className="font-editorial text-6xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
                            Payment control design with direct principal involvement.
                        </h1>
                    </div>
                    <p className="text-xl leading-relaxed text-foreground-muted">
                        We work with one client at a time to design, build, and maintain finance workflows that reduce exception handling without forcing an expensive system overhaul.
                    </p>
                </div>
            </section>

            <section className="border-y border-border bg-card py-16 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">How we work</p>
                        <h2 className="font-editorial text-4xl font-semibold leading-tight md:text-6xl">
                            Fixed scope. Measurable outcomes. Managed after delivery.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                            We do not sell generic automation projects or bloated consulting hours. We agree the objective first, lock in the acceptance criteria, and build directly around the systems your team already knows.
                        </p>
                    </div>

                    <div className="grid gap-[1px] bg-border">
                        {standards.map((standard) => (
                            <div key={standard.title} className="grid gap-5 bg-background p-6 sm:grid-cols-[3rem_1fr]">
                                <standard.icon className="size-6 text-primary" />
                                <div>
                                    <h3 className="text-xl font-semibold">{standard.title}</h3>
                                    <p className="mt-2 text-muted-foreground leading-relaxed">{standard.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div className="relative border border-primary/20 bg-primary/[0.04] p-8 md:p-10">
                        <blockquote className="font-editorial text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                            &ldquo;The people who scope your controls stay hands-on for the build.&rdquo;
                        </blockquote>
                        <p className="mt-6 text-muted-foreground leading-relaxed">
                            That continuity matters when the work touches payment approvals, supplier records, audit evidence, and the daily habits of a finance team.
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <Avatar className="h-12 w-12 border border-primary/30">
                                <AvatarImage src="/aditi-1.webp" className="object-cover" />
                                <AvatarFallback>AG</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-primary">Aditi Garg</div>
                                <div className="text-xs uppercase tracking-widest text-muted-foreground">Director & Founder</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <PenTool className="mb-6 size-7 text-primary" />
                        <h2 className="font-editorial text-4xl font-semibold leading-tight md:text-6xl">Why this model exists</h2>
                        <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                            <p>
                                Payment-control work fails when the builder treats it like a generic software task. The hard part is not only the interface or integration. It is knowing which exceptions should stop payment, what evidence matters, who owns the decision, and how to make the result auditable.
                            </p>
                            <p>
                                We keep the engagement narrow so the objective can be owned. The first sprint gives you a live control. The managed support keeps it useful as rules, vendors, teams, and edge cases change.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-card py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">The people</p>
                    <h2 className="font-editorial text-4xl font-semibold leading-tight md:text-6xl">Direct principal involvement</h2>
                    <div className="mt-12 grid gap-12 lg:grid-cols-3">
                        <FounderCard
                            name="Aditi Garg"
                            role="Director & Founder"
                            image="/aditi-1.webp"
                            bio="Operations leader. Goldman Sachs, Uber, BMW. Turns fragmented operational workflows into governed, high-throughput operating models."
                        />
                        <FounderCard
                            name="Abhishek Agarwal"
                            role="Co-founder"
                            image="/abhishek.webp"
                            bio="Founder, Codeacious Tech. Hands-on delivery for enterprise and e-commerce systems, with architecture programs driving $80M+ in validated value."
                        />
                        {SHOW_AVISHEK && (
                            <FounderCard
                                name="Avishek Majumder"
                                role="Co-founder & CEO"
                                image="/avishek.webp"
                                bio="Data engineer and applied scientist. Builds production pipelines and decision-support systems for regulated, compliance-heavy environments."
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="font-editorial text-3xl font-semibold md:text-5xl">Start with a real control problem.</h2>
                        <p className="mt-3 text-muted-foreground">
                            Request the rule table first, or book a call if you already know which exception workflow needs attention.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/resources/"
                            className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                            {RULE_TABLE_CTA} <ArrowRight className="ml-2 size-4" />
                        </Link>
                        <Link
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            className="inline-flex min-h-12 items-center justify-center border border-border px-6 font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                            Book a Scoping Call
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FounderCard({ name, role, image, bio }: { name: string; role: string; image: string; bio: string }) {
    return (
        <div className="group relative">
            <div className="relative mb-6 aspect-[3/4] overflow-hidden border border-border bg-background grayscale transition-all duration-700 group-hover:grayscale-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-primary">{role}</div>
                <h3 className="font-editorial text-2xl font-semibold">{name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
            </div>
        </div>
    );
}
