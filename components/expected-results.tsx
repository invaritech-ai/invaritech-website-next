import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

const results = [
    {
        icon: Clock,
        title: "30+ hours saved per person per month",
        description:
            "Measured across targeted teams with baseline time-motion studies and post-launch tracking on ≥300 cases.",
        color: "text-blue-600",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
    },
    {
        icon: DollarSign,
        title: "$50k+/month avoided operating cost",
        description:
            "Typical volumes with fully-loaded hourly rates ($75–$120/hour) and error reduction calculations.",
        color: "text-green-600",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
    },
    {
        icon: TrendingUp,
        title: "Faster SLAs, fewer errors",
        description:
            "Full audit-ready traceability with measurable improvements in cycle time and quality metrics.",
        color: "text-purple-600",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
    },
];

export default function ExpectedResults() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        Expected results
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Measurable outcomes you can track and verify.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {results.map((result, index) => (
                        <Card
                            key={index}
                            className={`border-2 ${result.borderColor} hover:shadow-lg transition-all duration-300`}
                        >
                            <CardContent className="p-8">
                                <div
                                    className={`w-16 h-16 ${result.bgColor} rounded-xl flex items-center justify-center mb-6`}
                                >
                                    <result.icon
                                        className={`w-8 h-8 ${result.color}`}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">
                                    {result.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {result.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/ops-efficiency-sprint#assumptions">
                            See the math behind the numbers
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
