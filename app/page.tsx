import { Metadata } from "next";
import ArtisticHomeHero from "@/components/artistic-home-hero";
import WhatWeDoSection from "@/components/what-we-do-section";
import WhatWeBuild from "@/components/what-we-build";
import SelectedWorkSection from "@/components/selected-work";
import HowWeWorkSection from "@/components/how-we-work";
import AssessmentBannerSection from "@/components/assessment-banner";
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
      <WhatWeBuild />
      <SelectedWorkSection />
      <HowWeWorkSection />
      <AssessmentBannerSection />
      <ExpansionPathsSection />
      <HomeFitFaqCta />
    </main>
  );
}
