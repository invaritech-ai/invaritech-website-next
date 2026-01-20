import HeroSection from "@/components/hero-section";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Lazy load below-the-fold components for better performance
const WhatWeDoSection = dynamic(
    () => import("@/components/what-we-do-section"),
    {
        loading: () => <div className="min-h-[400px]" />,
    }
);

const SelectedWorkSection = dynamic(
    () => import("@/components/selected-work"),
    {
        loading: () => <div className="min-h-[400px]" />,
    }
);

const HowWeWorkSection = dynamic(() => import("@/components/how-we-work"), {
    loading: () => <div className="min-h-[400px]" />,
});

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.invaritech.ai",
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
