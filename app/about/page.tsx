import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            {/* Company Overview Section */}
            <section className="mx-auto max-w-5xl px-6 mb-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        About Invaritech
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Invaritech is a small automation studio based in Hong Kong.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="space-y-6 text-lg text-muted-foreground">
                        <p>
                            We focus on clean, production‑grade systems for small teams: operators, agencies, consultants, and niche service businesses in Europe and Asia.
                        </p>
                        <p>
                            We believe that small businesses shouldn't be held back by manual work. We build the custom tools and connections that let you operate like a much larger company.
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-video overflow-hidden rounded-2xl bg-muted">
                        {/* Placeholder for company image */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-2xl">
                            Company Image
                        </div>
                    </div>
                </div>
            </section>

            {/* Founders Info Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-3xl font-semibold text-center mb-12 md:text-4xl">
                        Meet the Founders
                    </h2>
                    
                    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Founder 1 */}
                        <Card className="overflow-hidden bg-background">
                            <div className="aspect-square relative bg-muted">
                                {/* Placeholder for founder image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold">
                                    Founder Photo
                                </div>
                            </div>
                            <CardContent className="p-6 text-center">
                                <h3 className="text-xl font-bold mb-1">Founder Name</h3>
                                <p className="text-sm text-primary font-medium mb-4">Co-Founder & CTO</p>
                                <p className="text-muted-foreground text-sm">
                                    Expert in distributed systems and AI architecture. Passionate about building scalable tech that solves real-world problems.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Founder 2 */}
                        <Card className="overflow-hidden bg-background">
                            <div className="aspect-square relative bg-muted">
                                {/* Placeholder for founder image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold">
                                    Founder Photo
                                </div>
                            </div>
                            <CardContent className="p-6 text-center">
                                <h3 className="text-xl font-bold mb-1">Founder Name</h3>
                                <p className="text-sm text-primary font-medium mb-4">Co-Founder & CEO</p>
                                <p className="text-muted-foreground text-sm">
                                    Strategic visionary with a background in product management and digital transformation. Focused on delivering business value.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
