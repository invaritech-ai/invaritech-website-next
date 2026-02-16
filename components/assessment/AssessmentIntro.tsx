"use client";

import { ArrowRight } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface AssessmentIntroProps {
    onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
    return (
        <div className="max-w-4xl mx-auto pt-12 md:pt-24 relative z-10">
            <div className="mb-12 overflow-hidden">
                <TextEffect
                    per="word"
                    as="h1"
                    preset="fade"
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.85] text-foreground mix-blend-difference uppercase"
                >
                    ARE YOU READY TO AUTOMATE?
                </TextEffect>
                <TextEffect
                    per="line"
                    as="p"
                    preset="fade"
                    delay={0.5}
                    className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-2xl font-light"
                >
                    Discover your organization&apos;s &quot;Automation Archetype&quot; and get a tailored roadmap. We analyze Viability, Readiness, and Risk to find your ROI wedge.
                </TextEffect>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                <MagneticButton className="h-20 px-12 text-xl md:text-2xl font-bold group" onClick={onStart}>
                    START THE AUDIT <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <div className="flex gap-8">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                        <div className="text-primary mb-1 uppercase">04 Steps</div>
                        EST. 2 MINUTES
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                        <div className="text-primary mb-1 uppercase">Output</div>
                        STRATEGIC ROADMAP
                    </div>
                </div>
            </div>
        </div>
    );
}
