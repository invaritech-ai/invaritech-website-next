import { Metadata } from "next";
import ArtisticHomeHero from "@/components/artistic-home-hero";
import WhatWeDoSection from "@/components/what-we-do-section";
import SelectedWorkSection from "@/components/selected-work";
import HowWeWorkSection from "@/components/how-we-work";
import ExpansionPathsSection from "@/components/expansion-paths";
import HomeFitFaqCta from "@/components/home-fit-faq-cta";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.invaritech.ai/',
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#030305] selection:bg-primary/30 selection:text-primary">
      <ArtisticHomeHero />
      <WhatWeDoSection />
      <SelectedWorkSection />
      <HowWeWorkSection />
      <ExpansionPathsSection />
      <HomeFitFaqCta />
    </main>
  );
}
