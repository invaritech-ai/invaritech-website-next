import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, Network, Workflow, MessagesSquare, ServerCog, Target } from "lucide-react";

const paths = [
    {
        icon: Workflow,
        title: "Workflow Automation Consulting",
        description:
            "Reduce handoffs, exceptions, and reconciliation drag across teams.",
        href: "/services/ai-workflow-automation-services/",
    },
    {
        icon: Network,
        title: "AI Integration Services",
        description:
            "Connect data, approvals, and systems of record into a reliable pipeline.",
        href: "/services/ai-integration-services/",
    },
    {
        icon: MessagesSquare,
        title: "Enterprise AI Chatbot Deployment",
        description:
            "A governed interface: permissioned access, traceability, operating model.",
        href: "/services/enterprise-ai-chatbot-deployment/",
    },
    {
        icon: ServerCog,
        title: "Generative AI Backend Development",
        description:
            "Orchestration, evaluation, observability, latency and cost control.",
        href: "/services/generative-ai-backend-development/",
    },
    {
        icon: Target,
        title: "AI Automation Consulting",
        description:
            "Strategy that leads to execution: wedge selection, governance, acceptance criteria.",
        href: "/services/ai-automation-consulting/",
    },
];

export default function ExpansionPathsSection() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background)_92%,black)_0%,color-mix(in_oklch,var(--background)_97%,black)_100%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(70%_80%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent)_0%,transparent_70%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Expansion Paths
                    </p>
                    <h2 className="mt-3 text-balance text-4xl font-semibold md:text-5xl">
                        After the wedge proves ROI, we scale the layer.
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        The sprint is the entry point. The system is what you
                        keep.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {paths.map((path) => (
                        <Card
                            key={path.title}
                            className="group relative overflow-hidden border-border/70 bg-card/80 backdrop-blur"
                        >
                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                            <CardHeader className="pb-3">
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-none border border-primary/25 bg-primary/10">
                                    <path.icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold leading-tight">
                                    {path.title}
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <p className="text-sm text-muted-foreground">
                                    {path.description}
                                </p>
                                <Link
                                    href={path.href}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                >
                                    Explore service <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

