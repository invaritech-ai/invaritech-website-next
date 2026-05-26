import { AuditCTASection } from "@/components/home/audit-cta-section";
import { Colophon } from "@/components/home/colophon";
import { CoverHero } from "@/components/home/cover-hero";
import { FinanceFirstFocus } from "@/components/home/finance-first-focus";
import { Footnotes } from "@/components/home/footnotes";
import { Problem } from "@/components/home/problem";
import { ProofGrid } from "@/components/home/proof-grid";
import { ServiceMethod } from "@/components/home/service-method";
import { WhatWeAutomate } from "@/components/home/what-we-automate";

/**
 * Exception Automation — homepage.
 *
 * Document aesthetic. Broader company positioning at the top, with finance
 * exception automation surfaced as the first focus area.
 */

export default function ExceptionAutomationHome() {
    return (
        <main className="site-page">
            <CoverHero variant="homepage" />
            <WhatWeAutomate />
            <Problem variant="broad" />
            <FinanceFirstFocus />
            <ProofGrid variant="broad" />
            <ServiceMethod variant="broad" />
            <AuditCTASection variant="broad" />
            <Footnotes />
            <Colophon />
        </main>
    );
}
