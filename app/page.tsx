import HeroSection from "@/components/hero-section";
import WhatWeDoSection from "@/components/what-we-do-section";
import SelectedWorkSection from "@/components/selected-work";
import HowWeWorkSection from "@/components/how-we-work";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <WhatWeDoSection />
            <SelectedWorkSection />
            <HowWeWorkSection />
        </main>
    );
}
