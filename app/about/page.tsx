import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, ClipboardCheck, Handshake, PenTool, ShieldCheck } from "lucide-react";
import { BOOK_MEETING_URL, RULE_TABLE_CTA } from "@/lib/marketing";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import HomepageScrollAnimations from "@/components/homepage-scroll-animations";

export const metadata: Metadata = {
    title: "Founder-Led AP Automation Team",
    description:
        "INVARITECH works with one client at a time to design and deliver accounts payable automation, invoice approval workflow controls, and auditable finance operations.",
    openGraph: {
        title: "About INVARITECH | Founder-Led Accounts Payable Automation",
        description:
            "Founder-led accounts payable automation for finance teams. Fixed scope, measurable acceptance criteria, and ongoing managed support.",
        url: "https://www.invaritech.ai/about/",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About INVARITECH - Founder-Led Accounts Payable Automation" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About INVARITECH | Founder-Led Accounts Payable Automation",
        description:
            "One client at a time. Fixed-scope accounts payable automation with measurable acceptance criteria and ongoing managed support.",
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
                                <p className="site-eyebrow-text">Founder-led service model</p>
                            </div>
                            <h1 className="site-h2" data-reveal="block">
                                Practical accounts payable automation, led by the people who scope it.
                            </h1>
                        </div>
                        <p className="site-lead" data-reveal="block">
                            We help finance teams strengthen invoice approvals, duplicate payment checks, and supplier payment controls around the systems they already use.
                        </p>
                    </div>
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
                            We start with one workflow, one owner, and clear acceptance criteria. Then we build the control around the systems your finance team already uses.
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
                            &ldquo;The people who scope your invoice approval workflow stay close to the build.&rdquo;
                        </blockquote>
                        <p className="mt-6 text-muted-foreground leading-relaxed">
                            That continuity matters when work touches payment approvals, supplier bank detail changes, audit evidence, and daily finance operations.
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
                                Accounts payable automation is not only a software problem. The work also depends on which invoice exceptions should block payment, what evidence matters, who owns each approval, and how the final decision can be reviewed later.
                            </p>
                            <p>
                                We keep each engagement narrow so one workflow objective can be owned properly. After the first control is live, managed support helps it keep working as rules, vendors, teams, and edge cases change.
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
                            bio="Operations leader with experience at Goldman Sachs, Uber, and BMW. Helps teams turn fragmented workflows into clearer, more governed operating processes."
                        />
                        <FounderCard
                            name="Abhishek Agarwal"
                            role="Co-founder"
                            image="/abhishek.webp"
                            bio="Founder of Codeacious Tech. Leads hands-on delivery for enterprise and e-commerce systems, including architecture programs tied to $80M+ in validated value."
                        />
                        {SHOW_AVISHEK && (
                            <FounderCard
                                name="Avishek Majumder"
                                role="Co-founder & CEO"
                                image="/avishek.webp"
                                bio="Data engineer and applied scientist. Builds production pipelines and decision-support systems for regulated and compliance-heavy environments."
                            />
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="font-editorial text-3xl font-semibold md:text-5xl">Start with one real accounts payable bottleneck.</h2>
                        <p className="mt-3 text-muted-foreground">
                            View the rule table first, or book a call if you already know which invoice approval workflow or supplier exception needs attention.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/resources/supplier-payment-control-rule-table/interactive/"
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
