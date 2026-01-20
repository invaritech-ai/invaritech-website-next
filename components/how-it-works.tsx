import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Zap, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        icon: Search,
        title: "Discover",
        description:
            "Pick your highest-ROI workflow, baseline KPIs, and define a minimal or synthetic data access path.",
        duration: "Week 0-1",
    },
    {
        icon: Zap,
        title: "Ops Efficiency Sprint",
        description:
            "Crude PoC by week 3 (Milestone Gate). If accepted, we polish to production-grade v1 by day 60.",
        duration: "6 weeks",
    },
    {
        icon: TrendingUp,
        title: "Rollout & Retainer",
        description:
            "Expand coverage, tune accuracy, and track ROI in a live dashboard with alerts, logs, and clear ownership.",
        duration: "Ongoing",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        How it works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From discovery to measurable results in 60 days.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {steps.map((step, index) => (
                        <Card key={index} className="relative">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                                        <step.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {step.duration}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    {step.description}
                                </p>
                            </CardContent>

                            {/* Connector arrow */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-8 w-8 h-8 items-center justify-center">
                                    <ArrowRight className="w-6 h-6 text-primary" />
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/ops-efficiency-sprint">
                            Download the Sprint overview
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
