import { Hero } from "@/components/Hero";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Lazy load key sections
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

export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Hero />
            {/* 
              We will eventually redesign these sections too, 
              but for now keeping them to maintain content structure 
              while we focus on the "Artistic" overhaul. 
            */}
            <WhatWeDoSection />
            <SelectedWorkSection />
            <HowWeWorkSection />
        </main>
    );
}
