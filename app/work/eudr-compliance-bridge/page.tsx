import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "EUDR Compliance Bridge - Case Study",
    description:
        "Automating EUDR compliance for a high-volume French operator. Built a Python FastAPI bridge to submit thousands of Due Diligence Statements.",
    openGraph: {
        title: "EUDR Compliance Bridge - Case Study",
        description:
            "Automating EUDR compliance for a high-volume French operator. Built a Python FastAPI bridge to submit thousands of Due Diligence Statements.",
        url: "https://invaritech.ai/work/eudr-compliance-bridge",
    },
    alternates: {
        canonical: "https://invaritech.ai/work/eudr-compliance-bridge",
    },
};

export default function EudrCaseStudyPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-4xl px-6">
                {/* Back Link */}
                <div className="mb-12">
                    <Link
                        href="/work"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Work
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="mb-16">
                    <Badge variant="secondary" className="mb-6">
                        Automation & Compliance
                    </Badge>
                    <h1 className="text-4xl font-bold md:text-6xl mb-8 leading-tight">
                        Automating EUDR Compliance for a High-Volume French
                        Operator
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        As the EU Deforestation Regulation (EUDR) moves towards
                        full enforcement, a French operator saw a challenge
                        coming. They needed to submit thousands of Due Diligence
                        Statements to the European Commission. Doing this
                        manually was impossible at their scale. We built them a
                        bridge to automate it all.
                    </p>
                </div>

                {/* The Challenge */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="bg-muted/30 border-none shadow-sm">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-lg mb-3">
                                    Not Built for Scale
                                </h3>
                                <p className="text-muted-foreground">
                                    The EU system uses older SOAP technology. It
                                    has complex security, short time limits for
                                    messages, and no easy way to send data in
                                    batches.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30 border-none shadow-sm">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-lg mb-3">
                                    No Visibility
                                </h3>
                                <p className="text-muted-foreground">
                                    The EUDR portal has a list of statements,
                                    but it&apos;s hard to use at scale. It lacks
                                    good search or filtering, so finding
                                    specific records among thousands is a slow,
                                    manual process.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30 border-none shadow-sm">
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-lg mb-3">
                                    Too Complex
                                </h3>
                                <p className="text-muted-foreground">
                                    The system requires understanding complex
                                    data formats and rules. Our client needed a
                                    simple way for their team to work without
                                    needing to be technical experts.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Our Solution */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-8">Our Solution</h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        We built a smart bridge that sits between the client and
                        the EU system. It takes simple data from the client and
                        handles all the complex communication with the EU.
                    </p>

                    <div className="space-y-16">
                        <div className="grid gap-8 md:grid-cols-2 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    A Modern API
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    We replaced the complex EU interface with a
                                    clean, modern one. It allows the
                                    client&apos;s systems to send data easily.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 size-5 text-primary shrink-0 mt-0.5" />
                                        <span>Simple data format (JSON)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 size-5 text-primary shrink-0 mt-0.5" />
                                        <span>
                                            Checks for errors before sending
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="mr-2 size-5 text-primary shrink-0 mt-0.5" />
                                        <span>
                                            Easy to integrate with existing
                                            tools
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-2xl overflow-hidden border shadow-sm bg-muted">
                                <Image
                                    src="/eudr-flow.webp"
                                    alt="EUDR API Architecture Diagram"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto dark:invert"
                                />
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 items-center md:flex-row-reverse">
                            <div className="order-last md:order-first rounded-2xl overflow-hidden border shadow-sm bg-muted">
                                <Image
                                    src="/eudr-portal.webp"
                                    alt="EUDR Compliance Dashboard"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto dark:invert"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Custom Database & Dashboard
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Our platform solves this by maintaining its
                                    own database and dashboard on top of the
                                    official system. It lets the operator
                                    search, filter, and segment DDS by status,
                                    date, internal reference, or commodity.
                                </p>
                                <p className="text-muted-foreground mb-4">
                                    They can see exactly what’s waiting, what
                                    succeeded, and what needs attention in
                                    seconds, instead of scrolling through a
                                    static list in the portal.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Smart Retry System
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Connections can fail. Our system expects
                                    this. If a submission fails due to a network
                                    issue, it automatically tries again.
                                </p>
                                <p className="text-muted-foreground">
                                    It knows the difference between a temporary
                                    glitch and a real error. This means the team
                                    doesn&apos;t have to worry about lost data
                                    or waking up at night to fix things.
                                </p>
                            </div>
                            <div className="rounded-2xl overflow-hidden border shadow-sm bg-muted">
                                <Image
                                    src="/eudr-retry.webp"
                                    alt="Smart Retry Logic Visualization"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto dark:invert"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-24 bg-muted/30 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold mb-8">The Tech Stack</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            "Python",
                            "FastAPI",
                            "PostgreSQL",
                            "React",
                            "Docker",
                            "Celery",
                            "SOAP",
                        ].map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="text-sm px-4 py-1"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </section>

                {/* Business Impact */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-12">The Impact</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">
                                Scale
                            </div>
                            <p className="text-muted-foreground">
                                From manual entry to thousands of automated
                                submissions per month.
                            </p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">
                                Speed
                            </div>
                            <p className="text-muted-foreground">
                                Submissions happen in seconds, running in the
                                background.
                            </p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">
                                Reliability
                            </div>
                            <p className="text-muted-foreground">
                                Automatic retries mean nothing gets lost.
                            </p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">
                                Confidence
                            </div>
                            <p className="text-muted-foreground">
                                Fully certified for production use by the EU.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t pt-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6">
                            Need help with EUDR?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            If you need to automate your compliance, we can
                            build a solution for you. We handle the complex
                            technical parts so you can focus on your business.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="rounded-full px-8">
                                Get in Touch{" "}
                                <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
