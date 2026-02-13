import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import { MagneticButton } from "@/components/ui/MagneticButton";

const sprintPhases = [
    {
        week: "Week 1",
        title: "System and Bottleneck Audit",
        description:
            "Map one high-cost workflow and lock baseline metrics, risk boundaries, and owner accountability.",
        output: "Automation spec + risk boundaries",
    },
    {
        week: "Week 2",
        title: "Drop-In AI Build",
        description:
            "Implement the AI logic layer with deterministic guardrails and minimally invasive integration pathways.",
        output: "Working automation in staging",
    },
    {
        week: "Week 3",
        title: "Production Hardening",
        description:
            "Add access controls, logging, monitoring, rollback paths, and failure-mode coverage.",
        output: "Production-ready automation",
    },
    {
        week: "Week 4",
        title: "Deployment and Handover",
        description:
            "Deploy live, validate KPI movement, and hand over operational guidance to internal teams.",
        output: "Automation running + measurable result",
    },
];

export default function HowWeWorkSection() {
    return (
        <section className="relative overflow-hidden bg-muted/30 py-20 md:py-32">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-60 bg-[radial-gradient(65%_90%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent)_0%,transparent_72%)]"
            />

            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Delivery System
                        </p>
                        <h2 className="mt-3 text-balance text-4xl font-semibold md:text-5xl">
                            Four Weeks. One Automation. Measured Impact.
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Structured enough for enterprise governance and fast
                            enough for operational momentum.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 text-sm font-medium">
                        Pricing anchor: <span className="font-semibold">£8,000-£12,000</span>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {sprintPhases.map((phase) => (
                        <Card
                            key={phase.week}
                            className="group relative overflow-hidden border-border/70 bg-card/85"
                        >
                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                            <CardHeader>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                                    {phase.week}
                                </p>
                                <h3 className="text-2xl font-semibold">
                                    {phase.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {phase.description}
                                </p>
                                <div className="mt-4 rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-sm font-medium">
                                    Output: {phase.output}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-10 text-left">
                    <a
                        href={BOOK_MEETING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MagneticButton
                            strength={0.3}
                            className="bg-primary text-black px-12 py-6 text-xl font-bold rounded-xl"
                            textClassName="group-hover:text-black"
                        >
                            {BOOK_MEETING_CTA}
                        </MagneticButton>
                    </a>
                </div>
            </div>
        </section>
    );
}
