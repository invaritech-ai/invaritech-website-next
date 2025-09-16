import HeroSection from "@/components/hero-section";
import WhatWeDoSection from "@/components/what-we-do-section";
import Features from "@/components/features-3";
import StatsSection from "@/components/stats-3";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact";

export default function Home() {
    return (
        <>
            <HeroSection />
            <WhatWeDoSection />
            <Features />
            <StatsSection />
            <Testimonials />
            <ContactSection />
        </>
    );
}
