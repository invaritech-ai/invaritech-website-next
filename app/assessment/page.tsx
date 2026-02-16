"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
    ArrowRight,
} from "lucide-react";
import { 
    calculateAssessmentScore, 
    AssessmentInputs, 
    AssessmentResult 
} from "@/lib/assessment-calculator";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { motion, AnimatePresence } from "motion/react";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { LeadCaptureForm } from "@/components/assessment/LeadCaptureForm";
import { CalculatingState } from "@/components/assessment/CalculatingState";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";

// --- Options Constants ---

const companySizeOptions = [
    { value: "50-200", label: "50-200 EMPLOYEES" },
    { value: "200-500", label: "200-500 EMPLOYEES" },
    { value: "500-1000", label: "500-1000 EMPLOYEES" },
    { value: "1000-2000", label: "1000-2000 EMPLOYEES" },
    { value: "2000+", label: "2000+ EMPLOYEES" },
];

const functionFocusOptions = [
    { value: "ops", label: "OPERATIONS" },
    { value: "support", label: "SUPPORT / CX" },
    { value: "sales", label: "SALES / REVENUE OPS" },
    { value: "marketing", label: "MARKETING" },
    { value: "finance", label: "FINANCE / ACCOUNTING" },
    { value: "legal", label: "LEGAL / COMPLIANCE" },
    { value: "hr", label: "HR / PEOPLE OPS" },
    { value: "health-fitness", label: "HEALTH / WELLNESS" },
    { value: "product", label: "PRODUCT / ENGINEERING" },
    { value: "other", label: "OTHER" },
];

const workflowGoalOptions = [
    { value: "knowledge", label: "KNOWLEDGE RETRIEVAL" },
    { value: "drafting", label: "DRAFTING ASSISTANCE" },
    { value: "intake", label: "INTAKE PROCESSING" },
    { value: "finance", label: "DATA RECONCILIATION" },
    { value: "lead-qualification", label: "LEAD QUALIFICATION" },
    { value: "client-onboarding", label: "CLIENT ONBOARDING" },
    { value: "scheduling", label: "SCHEDULING / BOOKING" },
    { value: "reporting", label: "REPORTING / DASHBOARDS" },
    { value: "content-generation", label: "CONTENT GENERATION" },
];

const volumeBandOptions = [
    { value: "100-500", label: "100-500 CASES/MO" },
    { value: "500-1000", label: "500-1000 CASES/MO" },
    { value: "1000-2000", label: "1000-2000 CASES/MO" },
    { value: "2000-5000", label: "2000-5000 CASES/MO" },
    { value: "5000+", label: "5000+ CASES/MO" },
];

const ahtBandOptions = [
    { value: "<1 min", label: "<1 MINUTE" },
    { value: "1-3 min", label: "1-3 MINUTES" },
    { value: "3-5 min", label: "3-5 MINUTES" },
    { value: "5+ min", label: "5+ MINUTES" },
];

const errorToleranceOptions = [
    { value: "critical", label: "ZERO TOLERANCE" },
    { value: "rework", label: "MODERATE REWORK" },
    { value: "minimal", label: "LOW IMPACT" },
];

const processMaturityOptions = [
    { value: "documented", label: "FULLY DOCUMENTED" },
    { value: "partial", label: "PARTIALLY DOCUMENTED" },
    { value: "tribal", label: "TRIBAL KNOWLEDGE" },
];

const dataStructureOptions = [
    { value: "structured", label: "STRUCTURED (SQL/API)" },
    { value: "semi", label: "SEMI (SPREADSHEETS)" },
    { value: "unstructured", label: "UNSTRUCTURED (PDF/DOCS)" },
    { value: "scattered", label: "SCATTERED (EMAIL/CHAT)" },
];

const dataAccessOptions = [
    { value: "minimal", label: "API ACCESS AVAILABLE" },
    { value: "synthetic", label: "SYNTHETIC DATA POSSIBLE" },
    { value: "blocked", label: "HIGHLY RESTRICTED" },
];

const budgetOptions = [
    { value: "≥$25k", label: "≥$25K (ENTERPRISE)" },
    { value: "$10-25k", label: "$10-25K (STANDARD)" },
    { value: "<$10k", label: "<$10K (EXPLORATORY)" },
];

// --- Sub-components ---

const VisionaryContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("border border-white/10 bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-none relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 w-24 h-[1px] bg-primary/50" />
        <div className="absolute top-0 left-0 w-[1px] h-24 bg-primary/50" />
        {children}
    </div>
);

const VisionaryLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <Label className={cn("text-xs font-mono tracking-widest uppercase text-muted-foreground mb-3 block", className)}>
        {children}
    </Label>
);

const VisionaryProgress = ({ current, total }: { current: number; total: number }) => (
    <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase">System Scan: {Math.round((current / total) * 100)}%</span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">Phase 0{current} / 0{total}</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 relative">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(current / total) * 100}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
            />
        </div>
    </div>
);

// --- Main Component ---

export default function AssessmentPage() {
    const [step, setStep] = useState<number>(0);
    const [inputs, setInputs] = useState<AssessmentInputs>({
        companySize: "",
        functionFocus: "",
        primaryWorkflowGoal: "",
        monthlyVolumeBand: "",
        currentAHTBand: "",
        errorTolerance: "",
        processMaturity: "",
        dataStructure: "",
        dataAccessReadiness: "",
        tooling: [],
        sponsorReady: "",
        budgetFit: "",
    });

    const [leadData, setLeadData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
    });

    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const { executeRecaptcha } = useRecaptcha({
        siteKey: recaptchaSiteKey || "",
        action: "assessment_submit",
    });

    // Navigation warning for step 6
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isSubmitting) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isSubmitting]);

    const handleInputChange = (field: keyof AssessmentInputs, value: string | string[]) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const submitAssessment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStep(6); // Show analyzing screen

        const clientResult = calculateAssessmentScore(inputs);
        let resultToSave = clientResult;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        try {
            let recaptchaToken = null;
            if (recaptchaSiteKey) {
                recaptchaToken = await executeRecaptcha();
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (apiUrl && apiUrl.trim() !== "") {
                const response = await fetch(`${apiUrl}/api/assessment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ inputs, leadData, recaptchaToken }),
                    signal: controller.signal,
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.result) {
                        resultToSave = data.result;
                    }
                }
            }
        } catch (err) {
            console.error("Submission error:", err);
            // Non-fatal, use client results
        } finally {
            clearTimeout(timeout);
        }

        setResult(resultToSave);
        setIsSubmitting(false);
        
        try {
            sessionStorage.setItem("assessment_step", "7");
            sessionStorage.setItem("assessment_result", JSON.stringify(resultToSave));
        } catch { /* ignore */ }
        setStep(7);
    };

    useEffect(() => {
        try {
            const storedResult = sessionStorage.getItem("assessment_result");
            const storedStep = sessionStorage.getItem("assessment_step");
            if (storedResult && (storedStep === "7")) {
                setResult(JSON.parse(storedResult));
                setStep(7);
            }
        } catch { /* ignore */ }
    }, []);

    // --- Renders ---

    const renderIntro = () => <AssessmentIntro onStart={nextStep} />;

    const renderStep1 = () => (
        <div className="max-w-2xl mx-auto">
            <VisionaryProgress current={1} total={4} />
            <VisionaryContainer>
                <h2 className="text-4xl font-bold tracking-tighter mb-10">01. CONTEXT</h2>
                <div className="space-y-8">
                    <div>
                        <VisionaryLabel>Company Size</VisionaryLabel>
                        <Select value={inputs.companySize} onValueChange={(v) => handleInputChange("companySize", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT SIZE" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {companySizeOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Focus Vertical</VisionaryLabel>
                        <Select value={inputs.functionFocus} onValueChange={(v) => handleInputChange("functionFocus", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT VERTICAL" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {functionFocusOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Core Workflow Goal</VisionaryLabel>
                        <Select value={inputs.primaryWorkflowGoal} onValueChange={(v) => handleInputChange("primaryWorkflowGoal", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT GOAL" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {workflowGoalOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end pt-4">
                        <MagneticButton 
                            onClick={nextStep} 
                            disabled={!inputs.companySize || !inputs.functionFocus || !inputs.primaryWorkflowGoal}
                            className="w-full md:w-auto"
                        >
                            CONTINUE <ArrowRight className="ml-2 w-4 h-4" />
                        </MagneticButton>
                    </div>
                </div>
            </VisionaryContainer>
        </div>
    );

    const renderStep2 = () => (
        <div className="max-w-2xl mx-auto">
            <VisionaryProgress current={2} total={4} />
            <VisionaryContainer>
                <h2 className="text-4xl font-bold tracking-tighter mb-10">02. SCALE</h2>
                <div className="space-y-8">
                    <div>
                        <VisionaryLabel>Monthly Volume</VisionaryLabel>
                        <Select value={inputs.monthlyVolumeBand} onValueChange={(v) => handleInputChange("monthlyVolumeBand", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT BAND" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {volumeBandOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Average Handle Time</VisionaryLabel>
                        <Select value={inputs.currentAHTBand} onValueChange={(v) => handleInputChange("currentAHTBand", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT TIME" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {ahtBandOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Error Sensitivity</VisionaryLabel>
                        <Select value={inputs.errorTolerance} onValueChange={(v) => handleInputChange("errorTolerance", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT RISK PROFILE" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {errorToleranceOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-4 pt-4">
                        <button onClick={prevStep} className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">BACK</button>
                        <MagneticButton 
                            onClick={nextStep} 
                            disabled={!inputs.monthlyVolumeBand || !inputs.currentAHTBand || !inputs.errorTolerance}
                            className="flex-1 md:flex-none"
                        >
                            CONTINUE <ArrowRight className="ml-2 w-4 h-4" />
                        </MagneticButton>
                    </div>
                </div>
            </VisionaryContainer>
        </div>
    );

    const renderStep3 = () => (
        <div className="max-w-2xl mx-auto">
            <VisionaryProgress current={3} total={4} />
            <VisionaryContainer>
                <h2 className="text-4xl font-bold tracking-tighter mb-10">03. READINESS</h2>
                <div className="space-y-8">
                    <div>
                        <VisionaryLabel>SOP Maturity</VisionaryLabel>
                        <Select value={inputs.processMaturity} onValueChange={(v) => handleInputChange("processMaturity", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT MATURITY" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {processMaturityOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Data Architecture</VisionaryLabel>
                        <Select value={inputs.dataStructure} onValueChange={(v) => handleInputChange("dataStructure", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT STRUCTURE" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {dataStructureOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Access Controls</VisionaryLabel>
                        <Select value={inputs.dataAccessReadiness} onValueChange={(v) => handleInputChange("dataAccessReadiness", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT ACCESS LEVEL" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {dataAccessOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-4 pt-4">
                        <button onClick={prevStep} className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">BACK</button>
                        <MagneticButton 
                            onClick={nextStep} 
                            disabled={!inputs.processMaturity || !inputs.dataStructure || !inputs.dataAccessReadiness}
                            className="flex-1 md:flex-none"
                        >
                            CONTINUE <ArrowRight className="ml-2 w-4 h-4" />
                        </MagneticButton>
                    </div>
                </div>
            </VisionaryContainer>
        </div>
    );

    const renderStep4 = () => (
        <div className="max-w-2xl mx-auto">
            <VisionaryProgress current={4} total={4} />
            <VisionaryContainer>
                <h2 className="text-4xl font-bold tracking-tighter mb-10">04. COMMERCIAL</h2>
                <div className="space-y-8">
                    <div>
                        <VisionaryLabel>Executive Buy-in</VisionaryLabel>
                        <Select value={inputs.sponsorReady} onValueChange={(v) => handleInputChange("sponsorReady", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SPONSORSHIP STATUS" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                <SelectItem value="yes" className="font-mono text-xs uppercase tracking-widest">YES, LEADERSHIP ALIGNED</SelectItem>
                                <SelectItem value="no" className="font-mono text-xs uppercase tracking-widest">NO, EXPLORING ROI CASE</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <VisionaryLabel>Investment Capacity</VisionaryLabel>
                        <Select value={inputs.budgetFit} onValueChange={(v) => handleInputChange("budgetFit", v)}>
                            <SelectTrigger className="h-14 rounded-none border-white/10 bg-white/5 uppercase font-mono text-xs tracking-widest"><SelectValue placeholder="SELECT RANGE" /></SelectTrigger>
                            <SelectContent className="rounded-none border-white/10 bg-black/90 backdrop-blur-xl">
                                {budgetOptions.map(o => <SelectItem key={o.value} value={o.value} className="font-mono text-xs uppercase tracking-widest">{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-4 pt-4">
                        <button onClick={prevStep} className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">BACK</button>
                        <MagneticButton 
                            onClick={() => setStep(5)} 
                            disabled={!inputs.sponsorReady || !inputs.budgetFit}
                            className="flex-1 md:flex-none"
                        >
                            FINALIZE <ArrowRight className="ml-2 w-4 h-4" />
                        </MagneticButton>
                    </div>
                </div>
            </VisionaryContainer>
        </div>
    );

    const renderLeadCapture = () => (
        <LeadCaptureForm 
            onSubmit={submitAssessment}
            leadData={leadData}
            onChange={setLeadData}
            isSubmitting={isSubmitting}
        />
    );

    const renderCalculating = () => <CalculatingState />;

    const renderResults = () => result ? <AssessmentResults result={result} inputs={inputs} /> : null;

    // --- Layout Wrapper ---

    return (
        <main className="min-h-screen relative overflow-hidden bg-black selection:bg-primary selection:text-black">
            <ServiceBackground theme="blue" />
            
            <div className="relative z-10 container mx-auto px-6 md:px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full pt-32 pb-32"
                    >
                        {step === 0 && renderIntro()}
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                        {step === 5 && renderLeadCapture()}
                        {step === 6 && renderCalculating()}
                        {step === 7 && renderResults()}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Global navigation warning UI overlay during calc */}
            {isSubmitting && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] bg-primary p-2 text-black text-[10px] font-mono tracking-[0.3em] text-center"
                 >
                    SECURITY LOCKED: DO NOT REFRESH SESSION
                 </motion.div>
            )}
        </main>
    );
}
