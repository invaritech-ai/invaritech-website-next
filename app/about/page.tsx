import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Network, PenTool, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        Our Philosophy
                    </div>
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        Small by Design. <br className="hidden md:block" />
                        Expert by Trade.
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6 max-w-3xl mx-auto">
                        We are not a traditional agency. We are a boutique automation studio.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We believe that modern businesses don't need armies of junior staff. They need smart systems and expert architects.
                    </p>
                </div>

                {/* The Vision */}
                <div className="grid gap-12 md:grid-cols-2 mb-32 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Why We Exist</h2>
                        <div className="space-y-4 text-lg text-muted-foreground">
                            <p>
                                The "digital transformation" industry is broken. It sells bloat, complexity, and multi-year roadmaps to companies that just want to work faster.
                            </p>
                            <p>
                                We built Invaritech to prove that a small, focused team armed with the right automation tools can outmaneuver a giant corporation.
                            </p>
                            <p>
                                Our mission is to give regulated firms and freelancers the same operational superpowers that tech giants have, without the headcount.
                            </p>
                        </div>
                    </div>
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
                        <blockquote className="text-xl font-medium italic mb-6">
                            "Automation saves time. It also frees up human expertise from boring admin tasks."
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback className="text-primary bg-primary-foreground">AG</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-primary-foreground">Aditi Garg</div>
                                <div className="text-sm text-primary-foreground/80">Director & Founder</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Model */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">How We Work: The Studio Model</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We reject the "body shop" agency model. Instead, we operate as a high-precision studio.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="bg-transparent border-none shadow-none">
                            <CardContent className="p-0 text-center">
                                <div className="mx-auto size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <PenTool className="size-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">The Architects</h3>
                                <p className="text-muted-foreground">
                                    You work directly with the principals. We (the founders) architect every solution, define the strategy, and own the outcome. No "account managers" in the middle.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <div className="hidden md:flex items-center justify-center text-muted-foreground/30">
                            <ArrowRight className="size-8" />
                        </div>

                        <Card className="bg-transparent border-none shadow-none">
                            <CardContent className="p-0 text-center">
                                <div className="mx-auto size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <Network className="size-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">The Network</h3>
                                <p className="text-muted-foreground">
                                    For execution, we tap into our curated private network of elite specialists—developers, designers, and compliance experts we've vetted over years.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator className="my-24" />

                {/* Leadership */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The Team</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* CEO Card */}
                        <Card className="overflow-hidden">
                            <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 relative">
                                {/* Placeholder for Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    Avishek Majumder
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-1">Avishek Majumder</h3>
                                <div className="text-primary font-medium mb-4">CEO & Co-founder</div>
                                <p className="text-muted-foreground mb-6">
                                    The strategist behind the systems. Focused on product vision, client architecture, and the "Weekend" initiative.
                                </p>
                                <div className="flex gap-4">
                                    {/* Social Links Placeholder */}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Director Card */}
                        <Card className="overflow-hidden">
                            <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 relative">
                                {/* Placeholder for Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    Aditi Garg
                                </div>
                            </div>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-1">Aditi Garg</h3>
                                <div className="text-primary font-medium mb-4">Director & Founder</div>
                                <p className="text-muted-foreground mb-6">
                                    The operational backbone. Focused on governance, long-term strategy, and ensuring Invaritech runs as efficiently as the systems we build.
                                </p>
                                <div className="flex gap-4">
                                    {/* Social Links Placeholder */}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to build?</h2>
                    <Button asChild size="lg" className="rounded-xl px-8 text-base">
                        <Link href="/contact">
                            Work with us <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
