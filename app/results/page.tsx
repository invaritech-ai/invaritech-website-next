import { Metadata } from "next";
import Link from "next/link";
import { ArtisticBackground } from "@/components/ui/ArtisticBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextEffect } from "@/components/ui/text-effect";

export const metadata: Metadata = {
    title: "Results & Proof - Measurable Outcomes from Our Implementations",
    description:
        "Results you can measure. Hours saved, avoided cost, SLA lift, error reduction—made visible. See real case studies and quantified outcomes from our Ops Efficiency Sprint implementations.",
    keywords: [
        "results",
        "case studies",
        "ROI",
        "efficiency gains",
        "hours saved",
        "cost reduction",
        "SLA improvement",
        "error reduction",
    ],
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://www.invaritech.ai/results/",
    },
};

const exampleCase = {
    title: "Global Policy Search",
    industry: "FINANCIAL SERVICES",
    baseline: {
        volume: "8,000",
        label: "LOOKUPS/MO",
    },
    impact: {
        bigNumber: "400*",
        unit: "HOURS SAVED/MO",
        subMetric: "$36k/mo cost avoidance",
    },
    testimonial: {
        quote: "Placeholder for real customer impact statement. The sematic search layer has transformative potential for our research-heavy departments.",
        author: "Director of Ops",
        company: "Sector Leader"
    }
};

const additionalResults = [
    {
        title: "Legal Report Drafting",
        industry: "LEGAL SERVICES",
        impact: "240*",
        unit: "HOURS/MO",
        desc: "Automated 85% of first-draft generation",
        testimonial: {
            quote: "By removing the manual lookup phase, our associates can focus on higher-level strategy from hour one.",
            author: "Partner",
            company: "Tier-1 Legal Firm"
        }
    },
    {
        title: "Claims Intake Pipeline",
        industry: "INSURANCE",
        impact: "255*",
        unit: "HOURS/MO",
        desc: "Reduced document processing time by 1.7m per doc",
        testimonial: {
            quote: "The intake automation has allowed us to scale without adding head count to the processing team.",
            author: "COO",
            company: "Regional Insurer"
        }
    },
    {
        title: "Vendor Invoice Processing",
        industry: "MANUFACTURING",
        impact: "$50k*",
        unit: "SAVED/MO",
        desc: "Eliminated manual entry for 5,000+ invoices/mo",
        testimonial: {
            quote: "Cost avoidance was the primary goal, and the system delivered within the first 30-day cycle.",
            author: "Finance Lead",
            company: "Global MFG"
        }
    },
];

export default function Results() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <ArtisticBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <TextEffect 
                         per="char" 
                         preset="fade" 
                         className="text-xs md:text-sm font-mono tracking-[0.2em] text-primary mb-8 block"
                    >
                        EVIDENCE OF IMPACT
                    </TextEffect>

                    <h1 className="text-[10vw] leading-[0.8] font-bold tracking-tighter mb-12 mix-blend-difference text-white">
                        <TextEffect per="word" preset="slide" className="inline-block">
                            RESULTS YOU
                        </TextEffect>
                        <br />
                        <span className="text-white/50">CAN MEASURE</span>
                    </h1>

	                    <div className="flex flex-col md:flex-row gap-8 items-start border-t border-white/10 pt-12">
	                        <p className="max-w-xl text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
	                            We don&apos;t sell theory. We sell hours saved, costs avoided, and errors eliminated.
	                        </p>
	                    </div>
	                </div>
	            </section>

            {/* Featured Impact - Massive Number */}
            <section className="py-24 px-6 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded-full border border-primary/20">
                                CASE STUDY: {exampleCase.industry}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">{exampleCase.title}</h2>
                        <p className="text-xl text-muted-foreground max-w-md">
                            Optimization of policy lookups for a mid-sized firm. 
                            Replacing manual ctrl+f with semantic search and citation.
                        </p>
                        <div className="mt-8">
                             <Link href="/services/ai-automation-sprint/">
                                <MagneticButton className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50">
                                    Read the Full Case
                                </MagneticButton>
                            </Link>
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                         <div className="flex items-baseline gap-2">
                             <TextEffect 
                                per="char" 
                                preset="fade" 
                                className="text-[12vw] leading-none font-bold tracking-tighter text-primary"
                            >
                                {exampleCase.impact.bigNumber}
                            </TextEffect>
                            <span className="text-xs font-mono text-primary/50 uppercase tracking-widest">(Modeled)</span>
                         </div>
                        <p className="text-xl md:text-3xl text-white/80 font-mono mt-2 tracking-widest uppercase">
                            {exampleCase.impact.unit}
                        </p>
                        <p className="text-lg text-muted-foreground mt-4">
                            {exampleCase.impact.subMetric}
                        </p>
                        
                        {exampleCase.testimonial && (
                            <div className="mt-12 text-right border-r border-primary/30 pr-6 py-2 max-w-sm ml-auto">
                                <p className="text-sm italic text-white/60 mb-2">&quot;{exampleCase.testimonial.quote}&quot;</p>
                                <p className="text-xs font-mono text-primary">{exampleCase.testimonial.author}, {exampleCase.testimonial.company}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Snapshot List - Clean Editorial Style */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto relative">
                     {/* Ghost Typography Background Layer */}
                    <div className="absolute -top-20 -left-10 select-none pointer-events-none opacity-[0.03] whitespace-nowrap z-0">
                        <span className="text-[20rem] font-black tracking-tighter uppercase text-white">
                            IMPACT
                        </span>
                    </div>

                    <h2 className="relative z-10 text-[6vw] font-bold leading-none mb-24 opacity-20 text-center md:text-left">
                        RECENT WINS
                    </h2>

                    <div className="space-y-0">
                        {additionalResults.map((result, index) => (
                            <div 
                                key={index} 
                                className="group relative border-t border-white/10 py-16 grid md:grid-cols-12 gap-8 items-center transition-colors hover:bg-white/5"
                            >
                                <div className="md:col-span-4 px-4 md:px-0">
                                    <p className="text-xs font-mono text-primary mb-2 tracking-widest">{result.industry}</p>
                                    <h3 className="text-3xl font-bold group-hover:translate-x-4 transition-transform duration-500">
                                        {result.title}
                                    </h3>
                                </div>
                                <div className="md:col-span-4 px-4 md:px-0">
                                    <p className="text-muted-foreground">{result.desc}</p>
                                </div>
                                <div className="md:col-span-4 px-4 md:px-0 text-left md:text-right">
                                    <div className="flex items-baseline justify-end gap-2">
                                        <span className="block text-5xl md:text-6xl font-bold text-white group-hover:text-primary transition-colors">
                                            {result.impact}
                                        </span>
                                        <span className="text-[10px] font-mono text-primary/40 uppercase tracking-tighter">(Modeled)</span>
                                    </div>
                                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                        {result.unit}
                                    </span>
                                </div>

                                {result.testimonial && (
                                    <div className="md:col-span-12 mt-6 px-4 md:px-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-3xl ml-auto text-right border-r border-white/5 pr-6">
                                        <p className="text-sm italic text-muted-foreground font-light">&quot;{result.testimonial.quote}&quot;</p>
                                        <p className="text-[10px] font-mono text-primary/60 mt-2 uppercase tracking-widest">{result.testimonial.author} {"//"} {result.testimonial.company}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EUDR & CTA */}
            <section className="py-24 px-6 bg-gradient-to-t from-black to-transparent">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        EUDR COMPLIANCE <span className="text-primary block md:inline">SOLVED</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Backend APIs for data intake, validation, and auditability.
                        Deployed in 30 days.
                    </p>
                    
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <Link href="/services/ai-automation-sprint/">
                            <MagneticButton 
                                strength={0.4}
                                className="bg-primary text-black px-12 py-6 text-lg font-bold"
                                textClassName="group-hover:text-black"
                            >
                                Start Your Sprint
                            </MagneticButton>
                        </Link>
                        <Link href="#contact">
                             <MagneticButton 
                                strength={0.2}
                                className="bg-transparent border border-white/20 hover:bg-white/5 px-12 py-6 text-lg"
                            >
                                Book Consultation
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-12 px-6 border-t border-white/10">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground/60 italic">
                        *Modeled Estimate: Projections based on client-provided data, industry benchmarks for task duration, and standard hourly rates. Actual results may vary based on implementation scope and adoption.
                    </p>
                </div>
            </section>
        </main>
    );
}
