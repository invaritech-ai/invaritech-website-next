import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Activity, Gauge, Ban, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const outcomes = [
    {
        icon: Activity,
        title: "One Real Bottleneck",
        description:
            "We scope one failure point that’s draining margin or capacity.",
    },
    {
        icon: Gauge,
        title: "One Production Automation",
        description:
            "A governed AI layer runs on top of your current systems with operator visibility.",
    },
    {
        icon: Shield,
        title: "One Measurable Delta",
        description:
            "Baseline vs. after is validated so decisions are made on proof, not opinion.",
    },
];

const noList = [
    {
        icon: Server,
        text: "No ERP or CRM replacement",
    },
    {
        icon: Lock,
        text: "No vendor lock-in licensing",
    },
    {
        icon: Ban,
        text: "No broad transformation programme",
    },
];

export default function WhatWeDoSection() {
    return (
        <section id="what-we-do" className="relative -mt-8 pb-20 pt-24 md:pb-28 md:pt-28">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#072520_0%,#08312a_42%,color-mix(in_oklch,var(--background)_92%,black)_100%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <div className="text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/90">
                            Core Offer
                        </p>
                        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.92] md:text-6xl">
                            30-Day Drop-In AI Automation Sprint
                        </h2>
                        <p className="mt-5 max-w-xl text-lg text-white/80">
                            One wedge. One build. One measurable delta.
                        </p>

                        <div className="mt-8 rounded-2xl border border-white/20 bg-black/25 p-5 backdrop-blur-md">
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/90">
                                Explicitly Out of Scope
                            </p>
                            <div className="mt-4 grid gap-3">
                                {noList.map((item) => (
                                    <div
                                        key={item.text}
                                        className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2"
                                    >
                                        <item.icon className="h-4 w-4 text-emerald-300" />
                                        <span className="text-sm font-medium text-white/90">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {outcomes.map((item, index) => (
                            <Card
                                key={item.title}
                                className={`relative overflow-hidden border-white/20 bg-white/10 text-white backdrop-blur-md ${
                                    index === 0 ? "md:col-span-2" : ""
                                }`}
                            >
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/30 blur-2xl" />
                                <CardHeader className="relative pb-2">
                                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 bg-primary/15">
                                        <item.icon className="h-5 w-5 text-emerald-200" />
                                    </div>
                                    <h3 className="text-2xl font-semibold leading-tight">
                                        {item.title}
                                    </h3>
                                </CardHeader>
                                <CardContent className="relative text-white/80">
                                    {item.description}
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="md:col-span-2 border-primary/35 bg-primary/15 text-white">
                            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                                <p className="max-w-xl text-sm text-white/85 md:text-base">
                                    See the exact scope, governance model, and
                                    qualification prerequisites before you
                                    book.
                                </p>
                                <Button asChild size="lg" className="rounded-xl px-8">
                                    <Link href="/ai-automation-sprint/">
                                        See Sprint details
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
