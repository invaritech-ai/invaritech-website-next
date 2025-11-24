import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShieldCheck, FileText, Activity } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compliance Workflow Bridge - Services",
    description:
        "We turn your most painful compliance workflow into one auditable, automated pipeline in 6 weeks. Using tools you already have.",
    openGraph: {
        title: "Compliance Workflow Bridge - Services",
        description:
            "We turn your most painful compliance workflow into one auditable, automated pipeline in 6 weeks.",
        url: "https://www.invaritech.ai/services/compliance-bridge",
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/compliance-bridge",
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
                        We turn your most painful compliance/reporting workflow
                        into one auditable, automated pipeline in 6 weeks.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Using the tools you already have, we replace manual
                        chaos with a single, reliable flow.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-8 text-base"
                    >
                        <Link href="/contact">
                            Book a Consultation{" "}
                            <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </Button>
                </div>

                {/* ICP Section */}
                <div className="grid gap-12 md:grid-cols-2 mb-24">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">
                            Who it&apos;s for
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <ShieldCheck className="size-6 text-primary flex-none" />
                                <div>
                                    <span className="font-semibold block">
                                        Regulated B2B Service Firms
                                    </span>
                                    <span className="text-muted-foreground">
                                        5–30 person firms handling EUDR/ESG
                                        reporting, KYC/AML, or regulatory
                                        filings.
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
                                        Delivering recurring reports or filings
                                        to regulators and enterprise clients.
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <FileText className="size-6 text-primary flex-none" />
                                <div>
                                    <span className="font-semibold block">
                                        Existing Toolset Users
                                    </span>
                                    <span className="text-muted-foreground">
                                        Running on Google Workspace, HubSpot,
                                        spreadsheets, and portals—with no
                                        internal engineering team.
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
                        <h3 className="text-xl font-semibold mb-4">
                            The Current Reality
                        </h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    ×
                                </span>
                                <span>
                                    Staff re-keying data between email, Excel,
                                    CRMs, and portals.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    ×
                                </span>
                                <span>
                                    High risk of missed deadlines, wrong
                                    submissions, and non-compliance.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    ×
                                </span>
                                <span>
                                    Senior staff firefighting admin instead of
                                    doing billable expert work.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-red-500 font-bold">
                                    ×
                                </span>
                                <span>
                                    Fear of &quot;digital transformation&quot;
                                    projects that are huge, scary, and
                                    expensive.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Offer Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            The Solution: A Bridge, Not a Rebuild
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We replace manual, error-prone, multi-tool chaos
                            with a single, reliable flow from intake to audit
                            log.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Workflow Map</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    We map your current vs. ideal compliance
                                    process, identifying every step, owner, and
                                    tool involved.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Automated Bridge</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    A production-grade system connecting your
                                    intake source, internal tools (CRM/Sheets),
                                    and regulator portals.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Internal Control Panel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    A simple internal UI to view all in-flight
                                    filings, status, and logs—giving you total
                                    visibility.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Outcomes */}
                <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">
                        Desired Outcomes
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 text-left max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    One Clean Workflow
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    From intake → review → filing → client
                                    update. One auditable path.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    No More Scrambles
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Clear visibility of what’s due and what’s
                                    done. No last-minute panic.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    Systemized Knowledge
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Less dependence on specific “ops heroes”
                                    remembering 10 different steps.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-none">
                                4
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">
                                    Scalable Confidence
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Confidence you can scale client volume
                                    without linearly hiring more admin staff.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
