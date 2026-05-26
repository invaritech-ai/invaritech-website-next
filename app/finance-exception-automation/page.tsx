import type { Metadata } from "next";

import { CoverHero } from "@/components/home/cover-hero";
import { Problem } from "@/components/home/problem";
import { DemoPreview } from "@/components/home/demo-preview";
import { SystemsRegister } from "@/components/home/systems-register";
import { ServiceMethod } from "@/components/home/service-method";
import { WhyNotAccounting } from "@/components/home/why-not-accounting";
import { AuditCTASection } from "@/components/home/audit-cta-section";
import { ProofGrid } from "@/components/home/proof-grid";
import { FinalCTA } from "@/components/home/final-cta";
import { Footnotes } from "@/components/home/footnotes";
import { Colophon } from "@/components/home/colophon";
import { UtmCaptureClient } from "@/components/home/_shared/utm-capture-client";

export const metadata: Metadata = {
    title: "Finance Exception Automation — Move Faster Without Adding AP Headcount | Invaritech",
    description:
        "Invaritech builds AI-powered finance exception systems that catch invoice mismatches, duplicate bills, vendor-detail changes, and approval gaps before payment release. Fixed-scope builds for AP teams.",
    alternates: {
        canonical: "https://www.invaritech.ai/finance-exception-automation/",
    },
    openGraph: {
        title: "Finance Exception Automation — Invaritech",
        description:
            "AI-powered finance exception systems for AP teams: duplicate invoice detection, vendor change control, approval gap detection, three-way matching, and AP exception dashboard.",
        type: "website",
        url: "https://www.invaritech.ai/finance-exception-automation/",
    },
};

export default function FinanceExceptionAutomationPage() {
    return (
        <main className="site-page">
            <UtmCaptureClient />
            <CoverHero variant="landing" />
            <Problem variant="finance" />
            <DemoPreview />
            <SystemsRegister />
            <ServiceMethod variant="finance" />
            <WhyNotAccounting />
            <AuditCTASection variant="finance" />
            <ProofGrid variant="finance-emphasis" />
            <FinalCTA />
            <Footnotes />
            <Colophon />
        </main>
    );
}
