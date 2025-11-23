import HeroSection from "@/components/hero-section";
import WhatWeDoSection from "@/components/what-we-do-section";
import SelectedWorkSection from "@/components/selected-work";
import HowWeWorkSection from "@/components/how-we-work";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description:
        "INVARITECH builds custom automation for small service businesses. From compliance bridges and data pipelines to admin suites for freelancers and agencies. Stop losing time between your tools.",
    openGraph: {
        title: "INVARITECH - Automation & Back-Office Systems",
        description:
            "Custom automation for small service businesses. Compliance bridges, data pipelines, and admin suites. Stop losing time between your tools.",
        url: "https://invaritech.ai",
    },
};

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
