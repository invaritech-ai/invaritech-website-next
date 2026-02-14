import dynamic from "next/dynamic";
import { Metadata } from "next";
import ArtisticHomeHero from "@/components/artistic-home-hero";

// Lazy load key sections
const CoreThesisSection = dynamic(
    () => import("@/components/home-core-thesis"),
    { loading: () => <div className="min-h-[50vh]" /> }
);

const WhatWeDoSection = dynamic(
    () => import("@/components/what-we-do-section"),
    { loading: () => <div className="min-h-[50vh]" /> }
);

const SelectedWorkSection = dynamic(
    () => import("@/components/selected-work"),
    { loading: () => <div className="min-h-[50vh]" /> }
);

const HowWeWorkSection = dynamic(() => import("@/components/how-we-work"), {
    loading: () => <div className="min-h-[50vh]" />
});

const ExpansionPathsSection = dynamic(
    () => import("@/components/expansion-paths"),
    { loading: () => <div className="min-h-[50vh]" /> }
);

const FitFaqCtaSection = dynamic(
    () => import("@/components/home-fit-faq-cta"),
    { loading: () => <div className="min-h-[50vh]" /> }
);

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <ArtisticHomeHero />
            <CoreThesisSection />
            <WhatWeDoSection />
            <SelectedWorkSection />
            <HowWeWorkSection />
            <ExpansionPathsSection />
            <FitFaqCtaSection />
        </main>
    );
}
