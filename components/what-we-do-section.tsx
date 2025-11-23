import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Database, Zap, Bot, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function WhatWeDoSection() {
    return (
        <section
            id="what-we-do"
            className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent"
        >
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        What We Do
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto">
                        We help small teams stop losing time in the gaps between their tools.
                        Most of our clients already use tools like Google Workspace, HubSpot, Notion, or custom portals. We connect and automate these so work stops falling through the cracks.
                    </p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-2 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    <Link href="/services/compliance-bridge" className="group shadow-zinc-950/5 cursor-pointer block h-full">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Database className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                For Regulated Service Firms
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <h4 className="font-bold text-lg mb-2">Compliance Workflow Bridge</h4>
                            <p className="text-sm text-muted-foreground">
                                We turn your most painful compliance/reporting workflow into one auditable, automated pipeline in 6 weeks.
                            </p>
                            <div className="mt-4 text-primary text-sm font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                                Learn more <ArrowRight className="size-4" />
                            </div>
                        </CardContent>
                    </Link>

                    <Link href="/weekend" className="group shadow-zinc-950/5 cursor-pointer block h-full">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Zap className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">For Freelancers & Agencies</h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <h4 className="font-bold text-lg mb-2">Weekend</h4>
                            <p className="mt-3 text-sm text-muted-foreground">
                                A simple admin suite to turn every lead into a signed project in a weekend. Proposals, contracts, and invoices in one flow.
                            </p>
                            <div className="mt-4 text-primary text-sm font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                                Join Waitlist <ArrowRight className="size-4" />
                            </div>
                        </CardContent>
                    </Link>
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
