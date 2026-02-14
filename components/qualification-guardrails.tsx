import { Card, CardContent } from "@/components/ui/card";
import { XCircle, DollarSign, Database, AlertTriangle } from "lucide-react";

const requirements = [
    {
        icon: DollarSign,
        title: "Budget floor: $10k",
        description:
            "Minimum engagement size for the first project to ensure proper resource allocation and meaningful outcomes.",
        type: "requirement",
    },
    {
        icon: Database,
        title: "Minimal or synthetic data access required",
        description:
            "We can work with limited data access or synthetic datasets to prove value before full integration.",
        type: "requirement",
    },
    {
        icon: AlertTriangle,
        title: "Not a fit for marketing services",
        description:
            "We focus on operations, support, and finance workflows—not ads, social media, or content marketing.",
        type: "exclusion",
    },
    {
        icon: XCircle,
        title: "Not compromising quality for budget",
        description:
            "We maintain high standards and won't cut corners that could impact system reliability or security.",
        type: "exclusion",
    },
];

export default function QualificationGuardrails() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        Qualification guardrails
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Clear expectations to ensure successful partnerships.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {requirements.map((req, index) => (
                        <Card
                            key={index}
                            className={`${
                                req.type === "exclusion"
                                    ? "border-destructive/20 bg-destructive/5 dark:border-destructive/30 dark:bg-destructive/10"
                                    : "border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10"
                            }`}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 ${
                                            req.type === "exclusion"
                                                ? "bg-destructive/10 text-destructive dark:bg-destructive/20"
                                                : "bg-primary/10 text-primary dark:bg-primary/20"
                                        }`}
                                    >
                                        <req.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {req.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {req.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-muted/30 rounded-lg p-6 max-w-2xl mx-auto">
                        <h3 className="font-semibold mb-2">
                            Ready to get started?
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            If you meet our qualification criteria, we&apos;re
                            ready to help you achieve measurable efficiency
                            gains.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
	                            <a
	                                href="/assessment/"
	                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
	                            >
	                                Get your Ops Efficiency Score
	                            </a>
	                            <a
	                                href="/contact/"
	                                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
	                            >
	                                Book Architecture & Roadmap
	                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
