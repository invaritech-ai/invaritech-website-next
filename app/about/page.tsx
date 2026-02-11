import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    ArrowRight,
    Network,
    PenTool,
} from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { TextEffect } from "@/components/ui/text-effect";

export const metadata: Metadata = {
    title: "About Us - The Studio Model",
    description:
        "INVARITECH is a boutique automation studio. We design and build custom systems that help small teams stop losing time between their tools.",
    openGraph: {
        title: "About INVARITECH - Boutique Automation Studio",
        description:
            "Small by design, expert by trade. We build automation systems for regulated firms and freelancers. No body shops, no bloat.",
        url: "https://www.invaritech.ai/about/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "About INVARITECH - Boutique Automation Studio",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/about/",
    },
};

const SHOW_AVISHEK = true;
const visibleFounderCards = SHOW_AVISHEK ? 3 : 2;
const founderGridClassName =
    visibleFounderCards === 3
        ? "grid gap-8 lg:grid-cols-3"
        : "grid gap-8 lg:grid-cols-2";

export default function AboutPage() {
    return (
        <PageLayout maxWidth="6xl">
            {/* Hero */}
            <div className="mb-16 max-w-3xl">
                <Badge variant="secondary" className="mb-6">
                    Our Philosophy
                </Badge>
                <TextEffect
                    per="word"
                    as="h1"
                    preset="fade"
                    className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
                >
                    Small by Design. Expert by Trade.
                </TextEffect>
                <TextEffect
                    per="line"
                    as="p"
                    preset="fade"
                    delay={0.3}
                    className="text-xl md:text-2xl font-medium text-foreground/80 mb-6 leading-relaxed"
                >
                    We are not a traditional agency. We are a boutique
                    automation studio.
                </TextEffect>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    Modern businesses don&apos;t need armies of junior staff.
                    They need smart systems and expert architects who can
                    design, implement, and continuously improve those systems.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    We build those systems.
                </p>
            </div>

            {/* The Vision */}
            <div className="grid gap-12 md:grid-cols-2 mb-32 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Why We Exist</h2>
                    <div className="space-y-4 text-lg text-muted-foreground">
                        <p>
                            The &quot;digital transformation&quot; industry is
                            broken. It sells bloat, complexity, and multi-year
                            roadmaps to companies that mostly just want to work
                            faster, with fewer errors and less chaos.
                        </p>
                        <p>
                            We built Invaritech to prove that a small, focused
                            team armed with the right automation tools can
                            outmaneuver a giant corporation.
                        </p>
                        <p>
                            Our mission is to give regulated firms and
                            freelancers the same operational superpowers that
                            tech giants have, without the headcount,
                            bureaucracy, or fragile one-off hacks.
                        </p>
                    </div>
                </div>
                <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
                    <blockquote className="text-xl font-medium italic mb-6">
                        &quot;Automation doesn&apos;t just save time. It frees
                        human expertise from boring admin so it can be used
                        where it actually moves the needle.&quot;
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src="/aditi-1.webp"
                                alt="Aditi Garg"
                                className="object-cover object-top"
                            />
                            <AvatarFallback className="text-primary bg-primary-foreground">
                                AG
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-primary-foreground">
                                Aditi Garg
                            </div>
                            <div className="text-sm text-primary-foreground/80">
                                Director & Founder
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Model */}
            <div className="mb-32">
                <div className="mb-16 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-4">
                        How We Work: The Studio Model
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reject the &quot;body shop&quot; agency model. No
                        anonymous teams. No endless hand-offs. No slideware that
                        never ships. Instead, we operate as a high-precision
                        studio.
                    </p>
                </div>

                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-2 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-5xl divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 md:grid-cols-2 md:divide-x md:divide-y-0">
                    <div className="group p-6 md:p-8">
                        <CardHeader className="pb-3 p-0">
                            <CardDecorator>
                                <PenTool className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-xl">
                                The Architects
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                You work directly with the principals.
                            </p>
                        </CardHeader>

                        <CardContent className="pb-6 p-0 mt-6">
                            <p className="text-muted-foreground mb-6">
                                We (the founders) architect every solution,
                                define the strategy, and own the outcome. There
                                are no &quot;account managers&quot; buffering
                                communication or diluting decisions.
                            </p>
                            <ul className="text-left space-y-3 text-sm text-muted-foreground max-w-sm mx-auto">
                                <li className="flex gap-3">
                                    <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                    We map your real-world processes and
                                    constraints
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                    We design the automation architecture and
                                    control layers
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                    We stay involved until it works in
                                    production and your team actually uses it
                                </li>
                            </ul>
                        </CardContent>
                    </div>

                    <div className="group p-6 md:p-8">
                        <CardHeader className="pb-3 p-0">
                            <CardDecorator>
                                <Network className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium text-xl">
                                The Network
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                For execution, we draw on a curated private
                                network of elite specialists.
                            </p>
                        </CardHeader>

                        <CardContent className="pb-6 p-0 mt-6">
                            <p className="text-muted-foreground mb-6">
                                Developers, designers, and compliance experts
                                we’ve vetted over years of projects. You get
                                big-firm capability, without big-firm overhead:
                            </p>
                            <ul className="text-left space-y-3 text-sm text-muted-foreground max-w-sm mx-auto">
                                <li className="flex gap-3">
                                    <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                    The right specialist for each component
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                    Senior oversight on every decision
                                </li>
                                <li className="flex gap-3">
                                    <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                    Clear, accountable ownership end-to-end
                                </li>
                            </ul>
                        </CardContent>
                    </div>
                </Card>
            </div>

            <Separator className="my-24" />

            {/* Leadership */}
            <div className="mb-24">
                <div className="mb-16 max-w-3xl">
                    <Badge variant="secondary" className="mb-4">
                        Leadership
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">The Team</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Built by founders with complementary strengths in
                        operations, AI systems, and automation architecture.
                    </p>
                </div>

                <div className="relative mx-auto max-w-6xl">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-x-6 top-16 -z-10 h-[32rem] rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,theme(colors.primary/.16),transparent_62%)] blur-3xl"
                    />
                    <div className={founderGridClassName}>
                        {/* Aditi Card */}
                        <Card className="group relative isolate overflow-hidden rounded-[1.75rem] border border-primary/30 bg-gradient-to-br from-primary/[0.14] via-card to-card p-4 shadow-lg shadow-primary/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -left-10 -top-10 size-36 rounded-full bg-primary/20 blur-2xl"
                            />
                            <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 relative rounded-[1.35rem] border border-border/60 overflow-hidden mb-6">
                                <Image
                                    src="/aditi-1.webp"
                                    alt="Aditi Garg - Director & Founder"
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (min-width: 1024px) 33vw, 50vw"
                                    priority
                                />
                            </div>
                            <CardContent className="p-0">
                                <div className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                                    Founder
                                </div>
                                <h3 className="text-2xl font-bold mb-1">
                                    Aditi Garg
                                </h3>
                                <div className="text-primary font-medium mb-4 min-h-[3rem]">
                                    Director and Founder, Invaritech Ltd
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Aditi is a customer success and operations
                                    leader who has helped organisations such as
                                    Goldman Sachs, Uber, BMW, and Citi Bank
                                    turn complex platforms into measurable
                                    business outcomes. As VP of Central Support
                                    at Trilogy Ltd and now Director at
                                    Invaritech, she designs systems that reduce
                                    manual friction, improve service quality,
                                    and raise customer trust. Her work focuses
                                    on transforming fragmented support processes
                                    into automated, high-NPS operating models
                                    that scale with lean teams.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Abhishek Card */}
                        <Card className="group relative isolate overflow-hidden rounded-[1.75rem] border border-primary/30 bg-gradient-to-br from-primary/[0.14] via-card to-card p-4 shadow-lg shadow-primary/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -left-10 -top-10 size-36 rounded-full bg-primary/20 blur-2xl"
                            />
                            <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 relative rounded-[1.35rem] border border-border/60 overflow-hidden mb-6">
                                <Image
                                    src="/abhishek.webp"
                                    alt="Abhishek Agarwal - Co-founder"
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (min-width: 1024px) 33vw, 50vw"
                                />
                            </div>
                            <CardContent className="p-0">
                                <div className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                                    Co-founder
                                </div>
                                <h3 className="text-2xl font-bold mb-1">
                                    Abhishek Agarwal
                                </h3>
                                <div className="text-primary font-medium mb-4 min-h-[3rem]">
                                    <div>Founder & CEO, Codeacious Tech</div>
                                    <div>Co-founder, Invaritech Ltd</div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Abhishek is the Founder & CEO of Codeacious
                                    Technologies and creator of coot.ai, with a
                                    hands-on track record in production AI
                                    delivery. He has led programs spanning data
                                    pipelines, vector search, RAG assistants,
                                    and workflow automation for e-commerce and
                                    enterprise teams. He works from architecture
                                    through rollout with a focus on security,
                                    performance, and cost-efficient scale.
                                    Across distributed teams in the USA, India,
                                    Malaysia, Hong Kong, the UK, and Canada, he
                                    has supported outcomes including roughly
                                    $30M raised and $80M+ in product value.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Avishek Card */}
                        {SHOW_AVISHEK && (
                            <Card className="group relative isolate overflow-hidden rounded-[1.75rem] border border-primary/30 bg-gradient-to-br from-primary/[0.14] via-card to-card p-4 shadow-lg shadow-primary/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15">
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -left-10 -top-10 size-36 rounded-full bg-primary/20 blur-2xl"
                                />
                                <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 relative rounded-[1.35rem] border border-border/60 overflow-hidden mb-6">
                                    <Image
                                        src="/avishek.webp"
                                        alt="Avishek Majumder - CEO & Co-founder"
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (min-width: 1024px) 33vw, 50vw"
                                    />
                                </div>
                                <CardContent className="p-0">
                                    <div className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                                        Co-founder
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">
                                        Avishek Majumder
                                    </h3>
                                    <div className="text-primary font-medium mb-4 min-h-[3rem]">
                                        Co-founder & CEO, Invaritech Ltd
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Avishek is a data engineer and applied
                                        scientist who has built predictive and
                                        decision-support systems for regulated,
                                        high-stakes environments across energy
                                        and finance. At Invaritech, he leads
                                        automation architecture for data
                                        quality, orchestration, and reliability
                                        so lean teams can operate with
                                        enterprise-grade control. His focus is
                                        practical: resilient pipelines,
                                        auditable workflows, and models that
                                        move from prototype to production
                                        without operational drag.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">Ready to Build?</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    If you&apos;re a regulated firm or independent expert who&apos;s
                    outgrown spreadsheets, manual checklists, and duct-taped
                    tools, we should talk.
                </p>
                <p className="text-lg font-medium text-foreground mb-8 leading-relaxed">
                    Let&apos;s design the system that makes your operations feel
                    inevitable, not improvisational.
                </p>
                <Button asChild size="lg" className="rounded-xl px-8 text-base">
                    <a
                        href="https://calendly.com/hello-invaritech/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Work with us <ArrowRight className="ml-2 size-4" />
                    </a>
                </Button>
            </div>
        </PageLayout>
    );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-16 flex items-center justify-center">
        <div className="bg-muted/50 rounded-xl p-3 shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
            <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                {children}
            </div>
        </div>
    </div>
);
