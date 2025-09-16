import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Database, Zap, Bot, ShoppingCart } from "lucide-react";
import { ReactNode } from "react";

export default function WhatWeDoSection() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        What We Do
                    </h2>
                    <p className="mt-4">
                        We craft premium digital solutions that transform your
                        business operations
                    </p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-4 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Database className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                Backend Development
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="text-sm">
                                Scalable, robust APIs and databases engineered
                                for performance and reliability.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Automation</h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                Smart workflows that save time and cut costs
                                through intelligent process optimization.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Bot className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                AI Agentic Solutions
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                Intelligent assistants and autonomous business
                                workflows powered by cutting-edge AI.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ShoppingCart className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                E-Commerce Stores
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                Bespoke, performance-driven Shopify & custom
                                builds that convert visitors to customers.
                            </p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-16 flex items-center justify-center">
        <div className="bg-muted/50 rounded-xl p-3 shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
            <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                {children}
            </div>
        </div>
    </div>
);
