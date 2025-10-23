import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Database, Zap, Bot, ShoppingCart } from "lucide-react";
import { ReactNode } from "react";

export default function WhatWeDoSection() {
    return (
        <section id="what-we-do" className="bg-muted py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        What We Do
                    </h2>
                    <p className="mt-4">
                        We focus on building technology that takes work off your
                        plate and creates lasting value.
                    </p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-4 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden *:text-center md:mt-16">
                    <div className="group">
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
                                We design APIs, databases, and infrastructure
                                that are reliable, secure, and built to scale as
                                your business grows.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Automation</h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                We streamline repetitive tasks with smart
                                workflows that save time, reduce mistakes, and
                                lower costs.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Bot className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">AI Solutions</h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                From customer-facing chatbots to autonomous
                                workflows, we create AI-powered tools that
                                handle complex processes and provide real
                                business impact.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group">
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
                                We build and optimize Shopify and custom online
                                stores designed for performance, seamless
                                integrations, and strong conversion rates.
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
