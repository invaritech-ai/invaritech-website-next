"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Clock, DollarSign, Users } from "lucide-react";
import { useState } from "react";

const formulas = [
    {
        icon: Clock,
        title: "30 hours per person per month",
        formula:
            "Hours saved = (Monthly cases × minutes saved per case ÷ 60) ÷ number of involved FTEs",
        details: [
            "Baseline via time-motion or logs",
            "Measured post-launch on ≥300 cases or ≥6 weeks of volume",
        ],
    },
    {
        icon: DollarSign,
        title: "$50,000 per month avoided cost",
        formula:
            "Avoided cost = (Hours saved × fully-loaded hourly rate) + (Error reduction × cost per error) + (Cycle-time reduction × value/day)",
        details: [
            "Fully-loaded hourly rate provided by client",
            "Default $75–$120/hour by role",
        ],
    },
    {
        icon: Users,
        title: "Smaller teams equivalence",
        formula:
            "Save 300 hours/month per 10 FTEs, or eliminate 1 FTE worth of manual handling per 10 FTEs",
        details: [
            "Reallocated, not replaced",
            "Assumes data access, workflow owner, and timely approvals (≤1 business day)",
        ],
    },
];

export default function AsteriskMath() {
    const [expandedFormula, setExpandedFormula] = useState<number | null>(null);

    return (
        <section className="bg-muted py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        Assumptions & Measurement
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Transparent methodology behind our efficiency
                        calculations.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {formulas.map((formula, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-all duration-300"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                                        <formula.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        {formula.title}
                                    </h3>
                                </div>

                                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                    <p className="text-sm font-mono text-muted-foreground">
                                        {formula.formula}
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setExpandedFormula(
                                            expandedFormula === index
                                                ? null
                                                : index
                                        )
                                    }
                                    className="text-sm text-primary hover:underline"
                                >
                                    {expandedFormula === index
                                        ? "Hide details"
                                        : "Show details"}
                                </button>

                                {expandedFormula === index && (
                                    <div className="mt-4 space-y-2">
                                        {formula.details.map(
                                            (detail, detailIndex) => (
                                                <div
                                                    key={detailIndex}
                                                    className="flex items-start"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                                    <span className="text-sm text-muted-foreground">
                                                        {detail}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <Calculator className="w-8 h-8 text-primary mr-2" />
                                <h3 className="text-xl font-semibold">
                                    Want to calculate your potential savings?
                                </h3>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Use our assessment tool to get personalized
                                projections based on your specific workflow and
                                team size.
                            </p>
	                            <a
	                                href="/assessment/"
	                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
	                            >
	                                Get your Ops Efficiency Score
	                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
