"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";

const fitBullets = [
    "A workflow owner",
    "Access to the systems involved",
    "A baseline we can measure against",
];

const faqs = [
    {
        q: "Do you replace our systems?",
        a: "No. We layer intelligence and automation on top of what you already run.",
    },
    {
        q: "Do you do AI strategy only?",
        a: "Only when it leads into sprint execution or a delivery track.",
    },
    {
        q: "What do you mean by “governed”?",
        a: "Permissions, audit trails, fallbacks, and rollback paths are built into the implementation.",
    },
    {
        q: "Can you work with our internal engineers?",
        a: "Yes. We can integrate with your team or deliver end-to-end.",
    },
    {
        q: "How do you measure impact?",
        a: "We agree a baseline and acceptance criteria up front, then validate before/after after deployment.",
    },
    {
        q: "Are you expensive?",
        a: "We’re priced for accountability. If we can’t identify an ROI that outweighs the fee, we won’t take the engagement.",
    },
];

export default function HomeFitFaqCta() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <section className="relative overflow-hidden py-32 bg-[#050507] border-t border-white/5">
             {/* Void Background with simple noise */}
            <div className="absolute inset-0 -z-30 bg-[#030305]"></div>
            <div className="absolute inset-0 -z-20 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    {/* Fit Assessment - "System Scan" */}
                    <div className="text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-primary/60"></div>
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                System Check
                            </p>
                        </div>
                        <h2 className="text-balance text-4xl font-bold leading-[0.95] md:text-6xl tracking-tight mb-8">
                            READY FOR<br/>
                            INTELLIGENCE?
                        </h2>

                        <div className="space-y-4">
                            {fitBullets.map((bullet, i) => (
                                <div
                                    key={bullet}
                                    className="group flex items-center gap-4 border border-white/10 bg-white/5 px-6 py-4 hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex h-6 w-6 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <p className="text-lg text-white/80 font-light">
                                        {bullet}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-white/50 text-sm max-w-md">
                            <span className="text-primary">*</span> If any of these are missing, we'll identify the gap during the assessment.
                        </p>

                        <div className="mt-12 flex flex-wrap items-center gap-6">
                            <a
                                href={BOOK_MEETING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MagneticButton
                                    strength={0.32}
                                    className="rounded-none bg-primary text-black px-10 py-5 text-lg font-bold hover:bg-white transition-colors"
                                    textClassName="group-hover:text-black"
                                >
                                    {BOOK_MEETING_CTA}
                                    <ArrowUpRight className="h-5 w-5 ml-2" />
                                </MagneticButton>
                            </a>
                        </div>
                    </div>

                    {/* FAQ - "Terminal" Style */}
                    <div className="text-white">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-white/20"></div>
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/40">
                                Knowledge Base
                            </p>
                        </div>
                        
                        <div className="space-y-px bg-white/10 border border-white/10">
                            {faqs.map((faq, i) => (
                                <div
                                    key={faq.q}
                                    className="bg-[#050507] hover:bg-white/5 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="flex w-full items-center justify-between gap-6 p-6 text-left"
                                    >
                                        <span className={`text-lg font-medium transition-colors ${openFaq === i ? "text-primary" : "text-white"}`}>
                                            {faq.q}
                                        </span>
                                        <span
                                            className={`text-white/40 transition-transform duration-300 ${
                                                openFaq === i ? "rotate-45 text-primary" : ""
                                            }`}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === i
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 text-white/60 leading-relaxed max-w-xl font-light">
                                                 <span className="text-primary mr-2 font-mono">&gt;&gt;</span> {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA - "Ignition" */}
                <div className="mt-24 border-t border-white/10 pt-24 text-center">
                    <h2 className="text-5xl font-bold tracking-tight text-white md:text-8xl mb-12">
                        FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-text-shimmer bg-[length:200%_auto]">WEDGE</span>
                    </h2>

                    <div className="flex flex-col items-center justify-center gap-6">
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MagneticButton
                                strength={0.32}
                                className="rounded-full bg-white text-black px-12 py-6 text-xl font-bold hover:bg-primary hover:scale-105 transition-all duration-300"
                                textClassName="group-hover:text-black"
                            >
                                Start Assessment
                            </MagneticButton>
                        </a>
                        
                         <Link
                            href="/contact/"
                            className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                        >
                            Or contact via email
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

