import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
    title: "Our Work - Automation Projects",
    description:
        "See how INVARITECH builds compliance bridges, data pipelines, and custom automation for small service businesses. Real projects, real results.",
    openGraph: {
        title: "Our Work - Automation Projects & Case Studies",
        description:
            "Compliance bridges, data pipelines, and custom automation. See how we help small service businesses stop losing time between their tools.",
        url: "https://www.invaritech.ai/work/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Our Work - Automation Projects & Case Studies",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/work/",
    },
};

const projects = [
    {
        id: "eudr",
        title: "EUDR Compliance Bridge",
        category: "Automation & Compliance",
        description: (
            <>
                We built a <strong>Python FastAPI bridge and database</strong>{" "}
                around a SOAP-based EU backend so a{" "}
                <strong>small French operator</strong> could{" "}
                <strong>
                    submit thousands of EUDR Due Diligence Statements
                </strong>{" "}
                through a simple <strong>REST API and dashboard</strong>.
                Includes a retry queue and monitoring.
            </>
        ),
        tags: ["Python", "FastAPI", "PostgreSQL", "SOAP"],
        image: "/eudr-preview.webp",
        link: "/work/eudr-compliance-bridge/",
    },
    {
        id: "charity",
        title: "China Coast Community Website Redesign",
        category: "Web & Automation",
        description: (
            <>
                We redesigned a{" "}
                <strong>small charity&apos;s website and donation flow</strong>{" "}
                to make it{" "}
                <strong>
                    easier for donors to give and for staff to maintain content
                </strong>
                . The new flow is{" "}
                <strong>
                    simpler, faster, and connects directly to their CRM
                </strong>
                .
            </>
        ),
        tags: ["Next.js", "Stripe", "CMS Integration"],
        image: "/ccc-isometric.webp",
        link: "", // Project ongoing - link will be added when live
        ongoing: true,
    },
    {
        id: "custom",
        title: "Your Custom Solution",
        category: "Consulting & Development",
        description: (
            <>
                We help you identify the single biggest bottleneck costing you
                100+ hours a month. Then, we deliver a custom automation
                solution within 6 weeks to give those hours back to your
                business.{" "}
                <Link
                    href="/blogs/building-vs-buying-custom-automation/"
                    className="underline hover:text-foreground"
                >
                    Learn when custom automation makes sense
                </Link>{" "}
                or{" "}
                <Link
                    href="/blogs/why-consultancies-get-stuck/"
                    className="underline hover:text-foreground"
                >
                    see why hiring more people doesn't fix the problem
                </Link>
                .
            </>
        ),
        tags: ["Analysis", "Strategy", "Custom Build"],
        image: "/work/custom-full.jpg", // Placeholder
        link: "https://calendly.com/hello-invaritech/30min",
        buttonText: "Talk to Us",
        secondaryLink: {
            text: "Learn more",
            href: "/services/compliance-bridge/",
        },
    },
];

export default function WorkPage() {
    return (
        <PageLayout
            maxWidth="6xl"
            header={{
                title: "Our Work",
                description:
                    "A few examples of the kind of systems we build. Most of our work is behind the scenes, connecting existing tools into reliable workflows.",
            }}
        >
            <div className="space-y-16">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        id={project.id}
                        className="scroll-mt-32"
                    >
                        <Card className="overflow-hidden border-none shadow-none bg-transparent">
                            <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-start">
                                <div className="aspect-video relative rounded-2xl overflow-hidden bg-muted border shadow-sm group">
                                    {project.image &&
                                    !project.image.includes("custom-full") ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-3xl">
                                            {project.title}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>

                                <div className="flex flex-col h-full justify-center">
                                    <div className="mb-4">
                                        <Badge
                                            variant="secondary"
                                            className="mb-4"
                                        >
                                            {project.category}
                                        </Badge>
                                        <h2 className="text-3xl font-bold mb-4">
                                            {project.title}
                                        </h2>
                                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <ButtonLink
                                            href={project.link}
                                            disabled={project.ongoing}
                                        >
                                            {project.buttonText ||
                                                (project.ongoing
                                                    ? "Visit Site (Ongoing)"
                                                    : "Read Details")}
                                            {!project.ongoing && (
                                                <ArrowRight className="ml-2 size-4" />
                                            )}
                                        </ButtonLink>
                                        {/* @ts-ignore */}
                                        {project.secondaryLink && (
                                            <ButtonLink
                                                /* @ts-ignore */
                                                href={
                                                    project.secondaryLink.href
                                                }
                                                variant="outline"
                                            >
                                                {/* @ts-ignore */}
                                                {project.secondaryLink.text}
                                            </ButtonLink>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {/* Divider */}
                        <div className="mt-16 h-px w-full bg-border/50" />
                    </div>
                ))}

                {/* Labs Section for WeekendSuite */}
                <div id="weekend" className="scroll-mt-32">
                    <div className="rounded-2xl bg-muted/30 p-8 md:p-12 border border-border/50">
                        <div className="max-w-3xl">
                            <Badge
                                variant="outline"
                                className="mb-4 bg-background"
                            >
                                Invaritech Labs
                            </Badge>
                            <h2 className="text-3xl font-bold mb-4">
                                WeekendSuite
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                WeekendSuite is our in-house product: a
                                weekend-sized admin suite for freelancers and
                                tiny agencies. It handles the messy middle from
                                lead → proposal → contract → onboarding →
                                invoice.
                            </p>
                            <ButtonLink href="/weekend-suite/">
                                Learn more & join the waitlist{" "}
                                <ArrowRight className="ml-2 size-4" />
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

function ButtonLink({
    href,
    children,
    disabled,
    variant,
}: {
    href: string;
    children: React.ReactNode;
    disabled?: boolean;
    variant?: "default" | "outline";
}) {
    if (disabled) {
        return (
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted px-8 text-sm font-medium text-muted-foreground shadow-none cursor-not-allowed opacity-70">
                {children}
            </div>
        );
    }
    const isExternal = href.startsWith("http");
    const baseClassName =
        "inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    const variantStyles =
        variant === "outline"
            ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90";

    const className = `${baseClassName} ${variantStyles}`;

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}
