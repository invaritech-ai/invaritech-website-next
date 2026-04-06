"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div
                    key={i}
                    className="border border-border overflow-hidden bg-card"
                >
                    <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/40 transition-colors"
                    >
                        <span className="font-semibold text-foreground">
                            {faq.question}
                        </span>
                        <span
                            className={`text-primary transition-transform duration-300 shrink-0 ml-4 ${openFaq === i ? "rotate-45" : ""}`}
                        >
                            <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                        </span>
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                        <div className="overflow-hidden">
                            <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
