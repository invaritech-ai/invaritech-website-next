"use client";

import { useCallback, useState } from "react";
import { 
    Copy, 
    Calculator, 
    ArrowRight,
    Zap
} from "lucide-react";
import Link from "next/link";
import { AssessmentResult, formatLabel, AssessmentInputs } from "@/lib/assessment-calculator";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface AssessmentResultsProps {
    result: AssessmentResult;
    inputs: AssessmentInputs;
}

export function AssessmentResults({ result, inputs }: AssessmentResultsProps) {
    const [showCopied, setShowCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        const text = `
INVARITECH AI ASSESSMENT REPORT
------------------------------
ARCHETYPE: ${result.archetypeTitle}
${result.archetypeDescription}

SCORES:
- VIABILITY: ${result.viabilityScore}/100
- READINESS: ${result.readinessScore}/100
- RISK INDEX: ${result.riskScore}/100

PROJECTION (MONTHLY):
- SAVED HOURS: ${result.projectedHoursSaved.min}-${result.projectedHoursSaved.max}H
- COST AVOIDANCE: $${result.projectedCostAvoided.min.toLocaleString()}+$

STRATEGIC ADVISEMENT:
${result.strategicAdvice}

Full analysis at: ${window.location.origin}/assessment
        `.trim();

        navigator.clipboard.writeText(text);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    }, [result]);

    return (
        <div className="space-y-12 max-w-6xl mx-auto pb-32 pt-12 md:pt-24 no-print selection:bg-primary selection:text-black">
            {/* Header Archetype */}
            <div className="space-y-4 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase mb-6 flex items-center gap-3">
                    <span className="w-12 h-[1px] bg-primary/30" />
                    Archetype Identified
                </div>
                <TextEffect
                    per="word"
                    as="h1"
                    preset="fade"
                    className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-foreground mix-blend-difference uppercase"
                >
                    {result.archetypeTitle}
                </TextEffect>
                <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl pt-8 leading-relaxed">
                    {result.archetypeDescription}
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Metrics Grid */}
                <div className="lg:col-span-2 space-y-8">
                     <div className="grid md:grid-cols-3 gap-1">
                        {[
                            { label: "VIABILITY", val: result.viabilityScore, color: "bg-primary" },
                            { label: "READINESS", val: result.readinessScore, color: "bg-blue-500" },
                            { label: "RISK INDEX", val: result.riskScore, color: "bg-orange-500" }
                        ].map((m, i) => (
                            <div key={i} className="border border-white/10 bg-white/5 p-8 group hover:bg-white/10 transition-colors relative overflow-hidden">
                                <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-8">{m.label}</div>
                                <div className="text-6xl font-bold tracking-tighter mb-2">{m.val}</div>
                                <div className="h-[2px] w-full bg-white/5 overflow-hidden absolute bottom-0 left-0">
                                     <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.val}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        className={cn("h-full", m.color)} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Strategic block */}
                    <div className="border border-white/10 bg-white/5 p-12 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[120px] group-hover:bg-primary/10 transition-colors duration-1000" />
                         <div className="absolute top-0 left-0 w-1 h-32 bg-primary/50" />
                         
                         <h3 className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase mb-12 flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Strategic Advisement
                         </h3>
                         <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-16">
                             {result.strategicAdvice}
                         </p>
                         
                         <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                            <div>
                                <h4 className="text-[10px] font-mono tracking-widest text-primary uppercase mb-6 flex items-center underline decoration-primary/30 underline-offset-8">Key Strengths</h4>
                                <ul className="space-y-4">
                                    {result.reasoning.map((r, i) => (
                                        <li key={i} className="text-sm text-balance text-muted-foreground flex gap-4">
                                            <span className="text-primary font-mono opacity-50">0{i+1}</span> {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-mono tracking-widest text-primary uppercase mb-6 flex items-center underline decoration-primary/30 underline-offset-8">Execution Roadmap</h4>
                                <ul className="space-y-4">
                                    {result.nextSteps.map((r, i) => (
                                        <li key={i} className="text-sm text-balance text-muted-foreground flex gap-4">
                                            <span className="text-primary font-mono opacity-50">0{i+1}</span> {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Sidebar ROI */}
                <div className="space-y-8">
                     <div className="border border-white/10 bg-white/5 p-8 flex flex-col justify-between h-[320px] relative overflow-hidden hover:bg-white/10 transition-colors group">
                        <div className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors">
                            <ArrowRight className="w-12 h-12 -rotate-45" />
                        </div>
                        <h3 className="text-[10px] font-mono tracking-widest text-primary uppercase">Est. Recovered Hours / Mo</h3>
                        <div className="space-y-2">
                            <div className="text-7xl font-bold tracking-tighter">{result.projectedHoursSaved.min}-{result.projectedHoursSaved.max}H</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase opacity-50 tracking-widest">Operational Capacity Freeload</div>
                        </div>
                     </div>
                     <div className="border border-white/10 bg-primary/5 p-8 flex flex-col justify-between h-[320px] relative overflow-hidden hover:bg-primary/10 transition-colors group">
                        <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                            <Zap className="w-12 h-12" />
                        </div>
                        <h3 className="text-[10px] font-mono tracking-widest text-primary uppercase">Est. Cost Avoidance / Mo</h3>
                        <div className="space-y-2">
                            <div className="text-7xl font-bold tracking-tighter text-primary">${result.projectedCostAvoided.min.toLocaleString()}+</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase opacity-50 tracking-widest">Scalable Automation Basis</div>
                        </div>
                     </div>
                     
                     <div className="pt-8 space-y-6">
                         <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-white/10" />
                            Command Center
                         </div>
                         <div className="grid gap-3">
                            <MagneticButton onClick={copyToClipboard} className="w-full h-16 rounded-none justify-between pl-8" textClassName="w-full justify-between pr-4">
                                {showCopied ? "SUMMARY COPIED" : "EXPORT DATA PACKAGE"}
                                <Copy className="w-4 h-4 opacity-50" />
                            </MagneticButton>
                            
                            {result.archetype === "velocity-architect" ? (
                                <Link href="/services/ai-automation-sprint" className="block">
                                    <button className="w-full h-16 bg-primary text-black font-bold tracking-tighter text-xl hover:bg-white transition-all transform active:scale-[0.98]">
                                        ACTIVATE SPRINT
                                    </button>
                                </Link>
                            ) : (
                                <Link href="/contact" className="block">
                                    <button className="w-full h-16 border border-primary text-primary font-bold tracking-tighter text-xl hover:bg-primary hover:text-black transition-all transform active:scale-[0.98]">
                                        START DISCOVERY
                                    </button>
                                </Link>
                            )}
                         </div>
                     </div>
                </div>
            </div>

            {/* Math Breakdown */}
            <div className="pt-24 border-t border-white/10">
                 <div className="flex items-center gap-4 mb-12">
                    <Calculator className="w-5 h-5 text-primary opacity-50" />
                    <h3 className="text-[10px] font-mono tracking-[0.3em] text-muted-foreground uppercase">Mathematical Governance Protocol</h3>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
                     {[
                        { label: "Volume Peak", val: `${result.calculationBasis.monthlyVolume} CASES/MO` },
                        { label: "Median Handle Time", val: `${result.calculationBasis.averageAHT} MIN` },
                        { label: "Efficiency Basis", val: `${Math.round(result.calculationBasis.efficiencyGain * 100)}%` },
                        { label: "Data Integrity", val: `${Math.round(result.calculationBasis.readinessFactor * 100)}%` },
                        { label: "Labor Unit Cost", val: `$${result.calculationBasis.hourlyRate}/HR` },
                     ].map((m, i) => (
                        <div key={i} className="space-y-4">
                            <div className="text-[8px] font-mono tracking-widest text-primary uppercase">{m.label}</div>
                            <div className="text-lg font-bold tracking-tight truncate uppercase">{m.val}</div>
                        </div>
                     ))}
                 </div>
                 <p className="mt-16 text-[10px] text-muted-foreground font-light leading-relaxed italic max-w-4ful border-l border-white/20 pl-6 uppercase tracking-widest opacity-40">
                    Calculations follow the Invaritech ROI Framework v4.2. Benchmarked against {formatLabel(inputs.functionFocus || result.calculationBasis.functionFocus)} datasets. Accuracy floor: 85% for initial neural deployments.
                 </p>
            </div>
        </div>
    );
}
