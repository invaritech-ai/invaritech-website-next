import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Network, PenTool } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

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

export default function AboutPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
                        Our Philosophy
                    </div>
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        Small by Design. <br className="hidden md:block" />
                        Expert by Trade.
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6 max-w-3xl mx-auto">
                        We are not a traditional agency. We are a boutique
                        automation studio.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Modern businesses don&apos;t need armies of junior
                        staff. They need smart systems and expert architects who
                        can design, implement, and continuously improve those
                        systems.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We build those systems.
                    </p>
                </div>

                {/* The Vision */}
                <div className="grid gap-12 md:grid-cols-2 mb-32 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">
                            Why We Exist
                        </h2>
                        <div className="space-y-4 text-lg text-muted-foreground">
                            <p>
                                The &quot;digital transformation&quot; industry
                                is broken. It sells bloat, complexity, and
                                multi-year roadmaps to companies that mostly
                                just want to work faster, with fewer errors and
                                less chaos.
                            </p>
                            <p>
                                We built Invaritech to prove that a small,
                                focused team armed with the right automation
                                tools can outmaneuver a giant corporation.
                            </p>
                            <p>
                                Our mission is to give regulated firms and
                                freelancers the same operational superpowers
                                that tech giants have, without the headcount,
                                bureaucracy, or fragile one-off hacks.
                            </p>
                        </div>
                    </div>
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
                        <blockquote className="text-xl font-medium italic mb-6">
                            &quot;Automation doesn&apos;t just save time. It
                            frees human expertise from boring admin so it can be
                            used where it actually moves the needle.&quot;
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    src="/aditi.webp"
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
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            How We Work: The Studio Model
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We reject the &quot;body shop&quot; agency model. No
                            anonymous teams. No endless hand-offs. No slideware
                            that never ships. Instead, we operate as a
                            high-precision studio.
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
                                    define the strategy, and own the outcome.
                                    There are no &quot;account managers&quot;
                                    buffering communication or diluting
                                    decisions.
                                </p>
                                <ul className="text-left space-y-3 text-sm text-muted-foreground max-w-sm mx-auto">
                                    <li className="flex gap-3">
                                        <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                        We map your real-world processes and
                                        constraints
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                        We design the automation architecture
                                        and control layers
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                                        We stay involved until it works in
                                        production and your team actually uses
                                        it
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
                                    Developers, designers, and compliance
                                    experts we’ve vetted over years of projects.
                                    You get big-firm capability, without
                                    big-firm overhead:
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
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The Team</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Aditi Card */}
                        <Card className="overflow-hidden bg-transparent border-none shadow-none">
                            <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 relative rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src="/aditi.webp"
                                    alt="Aditi Garg - Director & Founder"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                            <CardContent className="p-0">
                                <h3 className="text-2xl font-bold mb-1">
                                    Aditi Garg
                                </h3>
                                <div className="text-primary font-medium mb-4">
                                    Director & Founder
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Aditi is a solutions and customer success
                                    leader who has helped organisations like
                                    Goldman Sachs, Uber, BMW and Citi Bank get
                                    real value from complex platforms. As VP of
                                    Central Support at Trilogy Ltd and Director
                                    at Invaritech, she specialises in turning
                                    messy support operations into measurable,
                                    automated, high-NPS experiences.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Avishek Card */}
                        <Card className="overflow-hidden bg-transparent border-none shadow-none">
                            <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 relative rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src="/avishek.webp"
                                    alt="Avishek Majumder - CEO & Co-founder"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                            <CardContent className="p-0">
                                <h3 className="text-2xl font-bold mb-1">
                                    Avishek Majumder
                                </h3>
                                <div className="text-primary font-medium mb-4">
                                    CEO & Co-founder
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Avishek is a data engineer and scientist who
                                    has spent his career building and deploying
                                    predictive systems in regulated, high-stakes
                                    environments across energy and finance. At
                                    Invaritech, he designs the automation
                                    architectures that let lean teams operate
                                    with enterprise-grade reliability.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Ready to Build?</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        If you’re a regulated firm or independent expert who’s
                        outgrown spreadsheets, manual checklists, and duct-taped
                        tools, we should talk.
                    </p>
                    <p className="text-lg font-medium text-foreground mb-8">
                        Let’s design the system that makes your operations feel
                        inevitable, not improvisational.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-8 text-base"
                    >
                        <Link href="/contact/">
                            Work with us <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
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
