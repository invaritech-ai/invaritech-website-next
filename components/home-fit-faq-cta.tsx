"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
        q: "What do you mean by 'governed'?",
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
        a: "We're priced for accountability. If we can't identify an ROI that outweighs the fee, we won't take the engagement.",
    },
];

export default function HomeFitFaqCta() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ffc-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
            });

            gsap.from(".ffc-bullet", {
                scrollTrigger: {
                    trigger: ".ffc-bullets",
                    start: "top 88%",
                    once: true,
                },
                opacity: 0,
                x: -16,
                duration: 0.4,
                stagger: 0.07,
                ease: "power2.out",
            });

            gsap.from(".ffc-faq", {
                scrollTrigger: {
                    trigger: ".ffc-faq",
                    start: "top 88%",
                    once: true,
                },
                opacity: 0,
                y: 16,
                duration: 0.4,
                stagger: 0.06,
                ease: "power2.out",
            });

            gsap.from(".ffc-final", {
                scrollTrigger: {
                    trigger: ".ffc-final",
                    start: "top 90%",
                    once: true,
                },
                opacity: 0,
                y: 24,
                duration: 0.5,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32 bg-card">
            <div className="absolute top-0 left-0 w-full h-[1px] editorial-divider-full" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <div>
                        <div className="ffc-header flex items-center gap-3 mb-6">
                            <span className="text-[11px] font-mono text-primary/50">06</span>
                            <div className="h-[1px] w-6 bg-primary/30" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                                System Check
                            </p>
                        </div>
                        <h2 className="ffc-header font-editorial text-4xl font-semibold leading-[0.95] md:text-6xl tracking-tight mb-8">
                            We&apos;re a Fit If<br />You Can Start<br />
                            <span className="text-primary">In 1-2 Weeks With:</span>
                        </h2>

                        <div className="ffc-bullets space-y-3">
                            {fitBullets.map((bullet) => (
                                <div
                                    key={bullet}
                                    className="group flex items-center gap-4 border border-border bg-background px-6 py-4 hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex h-5 w-5 items-center justify-center border border-primary/30 bg-primary/[0.06] text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <p className="text-base text-muted-foreground font-light">
                                        {bullet}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-muted-foreground text-sm max-w-md">
                            <span className="text-primary">*</span> If any of these are missing, we&apos;ll tell you what&apos;s missing and why.
                        </p>

                        <div className="mt-12 flex flex-wrap items-center gap-6">
                            <a
                                href={BOOK_MEETING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MagneticButton
                                    strength={0.32}
                                    className="rounded-none bg-primary text-white px-10 py-5 text-base font-semibold hover:bg-foreground transition-colors"
                                    textClassName="group-hover:text-white"
                                >
                                    {BOOK_MEETING_CTA}
                                    <ArrowUpRight className="h-4 w-4 ml-2" />
                                </MagneticButton>
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="ffc-header flex items-center gap-3 mb-6">
                            <span className="text-[11px] font-mono text-primary/40">07</span>
                            <div className="h-[1px] w-6 bg-primary/20" />
                            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary/60">
                                Knowledge Base
                            </p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div
                                    key={faq.q}
                                    className="ffc-faq border border-border bg-background overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                        aria-controls={`faq-panel-${i}`}
                                        id={`faq-button-${i}`}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-card transition-colors"
                                    >
                                        <span className="font-medium text-foreground text-[15px]">
                                            {faq.q}
                                        </span>
                                        <span className={`text-primary transition-transform duration-300 shrink-0 ml-4 ${openFaq === i ? "rotate-45" : ""}`}>
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </button>

                                    <div
                                        id={`faq-panel-${i}`}
                                        role="region"
                                        aria-labelledby={`faq-button-${i}`}
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            openFaq === i
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-5 pb-5 text-muted-foreground leading-relaxed text-[15px]">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="ffc-final mt-24 border-t border-border pt-24 text-center">
                    <h2 className="font-editorial text-5xl font-semibold tracking-tight text-foreground md:text-8xl mb-10">
                        Ready to Find Your{" "}
                        <span className="text-primary">ROI Wedge</span>?
                    </h2>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        This is a 30-minute diagnostic to identify one ROI wedge
                        and confirm whether your stack is ready for intelligence
                        layering. If it isn&apos;t, we&apos;ll tell you what&apos;s missing
                        and why, for free.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-6">
                        <a
                            href={BOOK_MEETING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MagneticButton
                                strength={0.32}
                                className="rounded-none bg-primary text-white px-12 py-6 text-xl font-semibold hover:bg-foreground shadow-sm transition-all duration-300"
                                textClassName="group-hover:text-white"
                            >
                                {BOOK_MEETING_CTA}
                            </MagneticButton>
                        </a>

                        <Link
                            href="/contact/"
                            className="mt-4 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Prefer procurement-first? Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
