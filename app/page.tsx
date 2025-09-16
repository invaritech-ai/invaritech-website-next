import HeroSection from "@/components/hero-section";
import WhatWeDoSection from "@/components/what-we-do-section";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";
import IntegrationsSection from "@/components/integrations-2";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <WhatWeDoSection />
            {/* <Features /> */}
            {/* <StatsSection /> */}
            <IntegrationsSection />
            {/* <Testimonials /> */}
            <ContactSection />
            <FooterSection />
        </main>
    );
}
