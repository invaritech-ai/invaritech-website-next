import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, ClipboardCheck, Handshake, PenTool, ShieldCheck } from "lucide-react";
import { BOOK_MEETING_URL, RULE_TABLE_CTA } from "@/lib/marketing";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

export const metadata: Metadata = {
    title: "About INVARITECH | Payment Controls for Australian Finance Teams",
    description:
        "A small technical team that built reconciliation systems used by Goldman Sachs. We deliver AP payment controls for Australian mid-market finance teams with fixed scope, written acceptance criteria, and managed support.",
    openGraph: {
        title: "About INVARITECH | Payment Controls for Australian Finance Teams",
        description:
            "A small technical team with a Goldman Sachs reconciliation track record. Fixed-scope AP controls for Australian freight, construction, and distribution teams.",
        url: "https://www.invaritech.ai/about/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About INVARITECH - Payment Controls for Australian Finance Teams" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About INVARITECH | Payment Controls for Australian Finance Teams",
        description:
            "Dedicated team per client. Fixed-scope AP payment controls with measurable acceptance criteria and ongoing managed support.",
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
        title: "Clear objective first",
        body: "Before build starts, we agree the workflow, the control outcome, and how success will be checked.",
    },
    {
        icon: ShieldCheck,
        title: "Clear delivery responsibility",
        body: "If an agreed workflow does not behave as specified, we stay with it until the agreed control works as intended.",
    },
    {
        icon: Handshake,
        title: "Scope stays transparent",
        body: "If a new feature or exception family appears, we separate it from the original objective so timelines and tradeoffs stay clear.",
    },
];

export default function AboutPage() {
    return (
        <main className="site-page">
            <section className="site-section-hero">
                <div className="site-container">
                    <div className="site-split">
                        <div>
                            <div className="site-eyebrow" data-reveal="block">
                                <div className="site-eyebrow-line" />
                                <p className="site-eyebrow-text">A small team. Serious work.</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                We&apos;re not a local firm. Here&apos;s why that might be exactly what you need.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            We&apos;re based in Asia. We charge less than an Australian firm because we don&apos;t carry the overhead of one. What we do have: a track record of building reconciliation systems used by Goldman Sachs, and a model where the person who scopes your problem is the person who builds it.
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-card py-16 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">How we work</p>
                        <h2 className="font-editorial text-4xl font-semibold leading-tight md:text-6xl">
                            Fixed scope. Written outcomes. Managed after delivery.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                            We start with one workflow, one owner, and acceptance criteria both parties sign off on before work begins. Then we build the control around the systems your finance team already uses.
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
                            &ldquo;We earn trust through the work, not the introduction.&rdquo;
                        </blockquote>
                        <p className="mt-6 text-muted-foreground leading-relaxed">
                            No Sydney office means no Sydney overhead. It also means you get
                            a founder on your problem, not an account manager. You pay
                            for the outcome, not the postcode.
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
                                AP problems are not only software problems. They depend on
                                which exceptions should block payment, what evidence matters,
                                who owns each approval, and how the final decision can be
                                reconstructed six months later.
                            </p>
                            <p>
                                We keep each engagement narrow so one workflow can be owned
                                properly. After the first control is live, managed support
                                keeps it working as rules, vendors, teams, and edge cases
                                change over time.
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
                            bio="Built reconciliation and payment control systems used by Goldman Sachs. Delivered operational programs for Uber and BMW. At Invaritech, she scopes every engagement and stays close to delivery."
                        />
                        <FounderCard
                            name="Abhishek Agarwal"
                            role="Co-founder"
                            image="/abhishek.webp"
                            bio="Founder of Codeacious Tech. Delivered enterprise systems across finance, retail, and regulated industries, including architecture programs tied to A$80M+ in client outcomes."
                        />
                        {SHOW_AVISHEK && (
                            <FounderCard
                                name="Avishek Majumder"
                                role="Co-founder & CEO"
                                image="/avishek.webp"
                                bio="Data engineer and applied scientist. Builds production pipelines and decision-support systems for compliance-heavy environments. Specialises in anomaly detection and predictive systems."
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="font-editorial text-3xl font-semibold md:text-5xl">Start with one real AP bottleneck.</h2>
                        <p className="mt-3 text-muted-foreground">
                            Run the free scan first, or book a call if you already know which workflow needs attention.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/contact?audit=1&src=about"
                            className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                            Book a Finance Workflow Audit <ArrowRight className="ml-2 size-4" />
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

            <HomepageScrollAnimations />
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
