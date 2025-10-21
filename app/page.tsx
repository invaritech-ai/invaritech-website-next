import HeroSection from "@/components/hero-section";
import WhoWeHelp from "@/components/who-we-help";
import WhatWeBuild from "@/components/what-we-build";
import HowItWorks from "@/components/how-it-works";
import RiskControl from "@/components/risk-control";
import ExpectedResults from "@/components/expected-results";
import RecentWork from "@/components/recent-work";
import QualificationGuardrails from "@/components/qualification-guardrails";
import AsteriskMath from "@/components/asterisk-math";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";
import IntegrationsSection from "@/components/integrations-2";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <WhoWeHelp />
            <WhatWeBuild />
            <HowItWorks />
            <RiskControl />
            <ExpectedResults />
            <RecentWork />
            <QualificationGuardrails />
            <AsteriskMath />
            <IntegrationsSection />
            {/* <Testimonials /> */}
            <ContactSection />
            <FooterSection />
        </main>
    );
}
