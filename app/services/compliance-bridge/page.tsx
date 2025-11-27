import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, FileText, Activity } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compliance Workflow Bridge - Services",
    description:
        "We turn your most painful compliance workflow into one auditable, automated pipeline in 6 weeks. Using tools you already have.",
    openGraph: {
        title: "Compliance Workflow Bridge - Services",
        description:
            "We turn your most painful compliance workflow into one auditable, automated pipeline in 6 weeks.",
        url: "https://www.invaritech.ai/services/compliance-bridge/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Compliance Workflow Bridge - Services",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/compliance-bridge/",
    },
};

export default function ComplianceBridgePage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        Invaritech Services
                    </div>
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        Compliance Workflow Bridge
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6 max-w-3xl mx-auto">
                        We turn the manual parts of your compliance and
                        reporting into one reliable, auditable pipeline, using
                        the tools you already have.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        No big IT project, no surprise costs. Just a production-grade workflow in 6 weeks.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-8 text-base"
                    >
                        <a
                            href="https://calendly.com/hello-invaritech/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book a free consultation{" "}
                            <ArrowRight className="ml-2 size-4" />
                        </a>
                    </Button>
                </div>

                {/* ICP Section */}
                <div className="grid gap-12 md:grid-cols-2 mb-24">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">
                            Who this is for
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <ShieldCheck className="size-6 text-primary flex-none" />
                                <div>
                                    <span className="font-semibold block">
                                        Small, regulated B2B service firms
                                    </span>
                                    <span className="text-muted-foreground">
                                        Small, regulated B2B service firms (5-30 people) doing EUDR/ESG, KYC/AML,
                                        or regulatory filings.
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <Activity className="size-6 text-primary flex-none" />
                                <div>
                                    <span className="font-semibold block">
                                        High-Volume Reporting
                                    </span>
                                    <span className="text-muted-foreground">
                                        Teams that deliver recurring reports or
                                        filings at volume.
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <FileText className="size-6 text-primary flex-none" />
                                <div>
                                    <span className="font-semibold block">
                                        No Internal Engineering
                                    </span>
                                    <span className="text-muted-foreground">
                                        Organizations running on Google
                                        Workspace, HubSpot, spreadsheets and
                                        portals.
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
                        <h3 className="text-xl font-semibold mb-4">
                            The Problem
                        </h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    x
                                </span>
                                <span>
                                    People re-typing the same data between
                                    email, Excel, CRM and portals.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    x
                                </span>
                                <span>
                                    Missed deadlines and avoidable mistakes that
                                    risk non-compliance.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    x
                                </span>
                                <span>
                                    Senior staff stuck doing admin instead of
                                    billable, expert work.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    x
                                </span>
                                <span>
                                    Fear of huge, expensive “digital
                                    transformation” projects that never finish.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Offer Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What we do</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            An end-to-end flow from intake → review → filing →
                            client update, fully auditable and easy to manage.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Map the Process</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    We map your current process, every step,
                                    tool and owner.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Automate the Work</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    We automate the repeatable work and connect
                                    the tools you already use.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Control Panel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    We give you a small internal control panel
                                    so you can see every filing, status and
                                    audit log.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Outcomes */}
                <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center mb-24">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">
                        Expected Outcomes
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 text-left max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    One clear workflow
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Everyone follows the same path, fewer errors,
                                    fewer questions.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    Predictable Deadlines
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    No last-minute panics, deadlines become
                                    predictable.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    Captured Knowledge
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Knowledge sits in the system, not in one
                                    person&apos;s head.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                4
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    Scalable Volume
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Scale client volume without hiring lots of
                                    extra admin.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline & Guarantee */}
                <div className="max-w-3xl mx-auto text-center mb-24">
                    <h2 className="text-3xl font-bold mb-6">
                        How long it takes
                    </h2>
                    <div className="bg-card border rounded-2xl p-8 shadow-sm">
                        <p className="text-xl font-medium mb-4">
                            We deliver a production-grade, auditable pipeline in
                            6 weeks using your existing tools.
                        </p>
                        <div className="h-px bg-border my-6" />
                        <p className="text-muted-foreground">
                            <span className="font-semibold text-foreground">
                                Our Guarantee:
                            </span>{" "}
                            If we cannot deliver the agreed workflow into
                            production, we keep working at no additional fee
                            until it is live.
                        </p>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Ready to stop chasing submissions?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Start trusting your process today.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-8 text-base"
                    >
                        <a
                            href="https://calendly.com/hello-invaritech/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book a free consultation{" "}
                            <ArrowRight className="ml-2 size-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </main>
    );
}
