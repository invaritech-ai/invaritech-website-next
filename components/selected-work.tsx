import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";

const proofSignals = [
    {
        title: "Compliance Backend Automation",
        detail:
            "A regulated workflow moved from manual handling into a fully auditable production flow with rollback controls.",
        metric: "Thousands of submissions compressed into minutes",
        image: "/eudr-preview.webp",
    },
    {
        title: "Existing Stack, Smarter Throughput",
        detail:
            "Custom logic layered over existing tools removed re-keying and delay chains while preserving core systems.",
        metric: "Zero replatforming required",
        image: "/app.webp",
    },
    {
        title: "Operating Model Discipline",
        detail:
            "Each sprint closes with ownership, baseline comparison, and handover so internal teams can operate safely.",
        metric: "Before and after KPI validation",
        image: "/ccc-isometric.webp",
    },
];

export default function SelectedWorkSection() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background)_89%,black)_0%,color-mix(in_oklch,var(--background)_96%,black)_100%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(70%_80%_at_50%_0%,color-mix(in_oklch,var(--primary)_26%,transparent)_0%,transparent_70%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Proof Layer
                        </p>
                        <h2 className="mt-3 text-balance text-4xl font-semibold md:text-5xl">
                            Outcomes and Controls You Can Defend Internally
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Each implementation is designed to survive real
                            operations, not just a demo environment.
                        </p>
                    </div>
                    <Button asChild size="lg" variant="outline" className="rounded-xl">
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {BOOK_MEETING_CTA}
                        </a>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-6">
                    {proofSignals.map((signal, index) => (
                        <Card
                            key={signal.title}
                            className={`group overflow-hidden border-border/70 bg-card/80 backdrop-blur ${
                                index === 0 ? "md:col-span-4" : "md:col-span-2"
                            } ${index === 2 ? "md:col-span-3" : ""}`}
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <Image
                                    src={signal.image}
                                    alt={signal.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            </div>
                            <CardHeader>
                                <h3 className="text-xl font-semibold leading-tight">
                                    {signal.title}
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {signal.detail}
                                </p>
                                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground">
                                    {signal.metric}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
