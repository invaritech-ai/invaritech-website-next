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
        <section className="relative overflow-hidden py-20 md:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#050505_0%,#071b17_45%,#050505_100%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]"
            />

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    {/* Fit Check */}
                    <div className="text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                            Fit Assessment
                        </p>
                        <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.95] md:text-5xl">
                            We’re a fit if you can start within 1–2 weeks with:
                        </h2>

                        <div className="mt-7 space-y-3">
                            {fitBullets.map((bullet) => (
                                <div
                                    key={bullet}
                                    className="flex items-start gap-3 border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                                >
                                    <div className="mt-0.5 inline-flex h-7 w-7 items-center justify-center border border-primary/25 bg-primary/10">
                                        <Check className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-base text-white/85">
                                        {bullet}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-6 text-lg text-white/70">
                            If that’s not true yet, we’ll tell you what’s
                            missing and why.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
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
                                    <ArrowUpRight className="h-5 w-5" />
                                </MagneticButton>
                            </a>

                            <Link
                                href="/contact/"
                                className="text-sm font-mono uppercase tracking-[0.22em] text-white/70 hover:text-primary"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                            FAQ
                        </p>
                        <h3 className="mt-4 text-balance text-3xl font-semibold md:text-4xl">
                            Objections that kill deals, answered directly.
                        </h3>

                        <div className="mt-8 space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={faq.q}
                                    className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(openFaq === i ? null : i)
                                        }
                                        className="flex w-full items-center justify-between gap-6 p-5 text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-base font-semibold text-white">
                                            {faq.q}
                                        </span>
                                        <span
                                            className={`text-primary transition-transform duration-300 ${
                                                openFaq === i
                                                    ? "rotate-45"
                                                    : ""
                                            }`}
                                        >
                                            <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
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
                                            <div className="px-5 pb-5 text-white/75 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-16 border-t border-white/10 pt-16 md:mt-20 md:pt-20">
                    <div className="mx-auto max-w-5xl text-center text-white">
                        <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                            Ready to find your{" "}
                            <span className="text-primary">ROI wedge</span>?
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
                            This is a 30-minute diagnostic to identify one ROI
                            wedge and confirm whether your stack is ready for
                            intelligence layering. If it isn’t, we’ll tell you
                            what’s missing and why, for free.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href={BOOK_MEETING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MagneticButton
                                    strength={0.32}
                                    className="rounded-none bg-primary text-black px-12 py-6 text-xl font-bold hover:bg-white transition-colors"
                                    textClassName="group-hover:text-black"
                                >
                                    {BOOK_MEETING_CTA}
                                </MagneticButton>
                            </a>

                            <Link
                                href="/contact/"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-primary"
                            >
                                Prefer procurement-first? Contact us{" "}
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

