"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowRight,
    CheckCircle2,
    BarChart3,
    Zap,
    Loader2,
    Download,
    Calculator,
} from "lucide-react";
import Link from "next/link";
import { calculateAssessmentScore, formatLabel, AssessmentInputs, AssessmentResult } from "@/lib/assessment-calculator";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { motion, AnimatePresence } from "motion/react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

// --- Options Constants (Moved to top level) ---

const companySizeOptions = [
    { value: "50-200", label: "50-200 employees" },
    { value: "200-500", label: "200-500 employees" },
    { value: "500-1000", label: "500-1000 employees" },
    { value: "1000-2000", label: "1000-2000 employees" },
    { value: "2000+", label: "2000+ employees" },
];

const functionFocusOptions = [
    { value: "ops", label: "Operations" },
    { value: "support", label: "Support / CX" },
    { value: "sales", label: "Sales / Revenue Ops" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance / Accounting" },
    { value: "legal", label: "Legal / Compliance" },
    { value: "hr", label: "HR / People Ops" },
    { value: "health-fitness", label: "Health / Wellness" },
    { value: "product", label: "Product / Engineering" },
    { value: "other", label: "Other" },
];

const workflowGoalOptions = [
    { value: "knowledge", label: "Knowledge Retrieval (Policy/Product Info)" },
    { value: "drafting", label: "Drafting Assistance (Reports/Emails)" },
    { value: "intake", label: "Intake Processing (Forms/Applications)" },
    { value: "finance", label: "Data Reconciliation / Extraction" },
    { value: "lead-qualification", label: "Lead Qualification / Scoring" },
    { value: "client-onboarding", label: "Client Onboarding" },
    { value: "scheduling", label: "Scheduling / Booking" },
    { value: "reporting", label: "Reporting / Dashboards" },
    { value: "content-generation", label: "Content Generation" },
];

const volumeBandOptions = [
    { value: "100-500", label: "100-500 cases/month" },
    { value: "500-1000", label: "500-1000 cases/month" },
    { value: "1000-2000", label: "1000-2000 cases/month" },
    { value: "2000-5000", label: "2000-5000 cases/month" },
    { value: "5000+", label: "5000+ cases/month" },
];

const ahtBandOptions = [
    { value: "<1 min", label: "<1 minute (Quick tasks)" },
    { value: "1-3 min", label: "1-3 minutes (Standard)" },
    { value: "3-5 min", label: "3-5 minutes (Complex)" },
    { value: "5+ min", label: "5+ minutes (Deep work)" },
];

const errorToleranceOptions = [
    { value: "critical", label: "Zero Tolerance (Financial/Legal Risk)" },
    { value: "rework", label: "Moderate (Requires Rework)" },
    { value: "minimal", label: "Low (Minor Annoyance)" },
];

const processMaturityOptions = [
    { value: "documented", label: "Fully Documented SOPs" },
    { value: "partial", label: "Partially Documented / Outdated" },
    { value: "tribal", label: "Undocumented / Tribal Knowledge" },
];

const dataStructureOptions = [
    { value: "structured", label: "Structured (SQL, API, CSV)" },
    { value: "semi", label: "Semi-Structured (Spreadsheets)" },
    { value: "unstructured", label: "Unstructured (PDFs, Docs)" },
    { value: "scattered", label: "Scattered (Emails, Chats)" },
];

const dataAccessOptions = [
    { value: "minimal", label: "Minimal / API Access Available" },
    { value: "synthetic", label: "Can provide Synthetic Data" },
    { value: "blocked", label: "Highly Restricted / On-Prem Only" },
];

const budgetOptions = [
    { value: "≥$25k", label: "≥$25k (Enterprise Pilot)" },
    { value: "$10-25k", label: "$10-25k (Standard Sprint)" },
    { value: "<$10k", label: "<$10k (Exploratory)" },
];

const toolingOptions = [
    { value: "slack", label: "Slack" },
    { value: "teams", label: "Microsoft Teams" },
    { value: "salesforce", label: "Salesforce" },
    { value: "hubspot", label: "HubSpot" },
    { value: "zendesk", label: "Zendesk" },
    { value: "jira", label: "Jira" },
    { value: "sharepoint", label: "SharePoint/OneDrive" },
    { value: "gdrive", label: "Google Drive" },
    { value: "postgres", label: "PostgreSQL/SQL" },
];

// --- Application Component ---

export default function AssessmentPage() {
    const [step, setStep] = useState<number>(0);
    // 0: Intro, 1: Context, 2: Volume/Value, 3: Readiness, 4: Commercial, 5: Calculating, 6: Lead Capture, 7: Results

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
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // reCAPTCHA v3 (invisible)
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const { executeRecaptcha } = useRecaptcha({
        siteKey: recaptchaSiteKey || "",
        action: "assessment_submit",
    });

    const handleInputChange = (field: keyof AssessmentInputs, value: string | string[]) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
    };

    const handleToolingChange = (tool: string, checked: boolean) => {
        setInputs((prev) => ({
            ...prev,
            tooling: checked
                ? [...prev.tooling, tool]
                : prev.tooling.filter((t) => t !== tool),
        }));
    };

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    // After completing the 4 assessment steps, go to lead capture
    const proceedToLeadCapture = () => {
        setStep(5); // Lead capture
    };

    // After lead form submission, call API
    const submitAssessment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setApiError(null);

        // Always calculate deterministic scores first (instant)
        const clientResult = calculateAssessmentScore(inputs);
        setStep(6); // Show "Analyzing..." screen

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);

            // Get reCAPTCHA token
            let recaptchaToken = null;
            if (recaptchaSiteKey) {
                recaptchaToken = await executeRecaptcha();
                if (!recaptchaToken) {
                    throw new Error("reCAPTCHA verification failed. Please try again.");
                }
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl || apiUrl.trim() === "") {
                throw new Error("Assessment service is unavailable. Please try again later.");
            }

            const response = await fetch(`${apiUrl}/api/assessment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputs, leadData, recaptchaToken }),
                signal: controller.signal,
            });
            clearTimeout(timeout);

            if (!response.ok) throw new Error(`API error: ${response.status}`);
            
            const data = await response.json();
            if (data.success && data.result) {
                setResult(data.result);
                setLeadSubmitted(true);
            } else {
                setResult(clientResult);
            }
        } catch (err) {
            setApiError(err instanceof Error ? err.message : "An unexpected error occurred");
            setResult(clientResult);
        }

        // Always show results regardless of API success/failure
        setIsSubmitting(false);
        try {
            sessionStorage.setItem("assessment_step", "7");
        } catch { /* ignore */ }
        setStep(7);
    };

    useEffect(() => {
        try {
            const storedResult = sessionStorage.getItem("assessment_result");
            const storedStep = sessionStorage.getItem("assessment_step");
            if (storedResult && (storedStep === "6" || storedStep === "7")) {
                const parsed = JSON.parse(storedResult) as AssessmentResult;
                setResult(parsed);
                setStep(parseInt(storedStep, 10));
            }
        } catch {
            // Ignore
        }
    }, []);


    // --- Render Steps ---

    const renderIntro = () => (
        <div className="text-center max-w-2xl mx-auto space-y-8 pt-12 md:pt-24 relative z-10">
            <Badge variant="outline" className="mb-4">
                Strategic Automation Assessment
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Are you ready to automate?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
                Discover your organization&apos;s &quot;Automation Archetype&quot; and get a tailored roadmap.
                We analyze Viability, Readiness, and Risk to tell you exactly where to start.
            </p>
            <p className="text-sm text-muted-foreground">
                4 steps · 2 minutes · AI-powered insights
            </p>
            <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={nextStep}>
                Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );

    const formStepCount = 4;
    const ProgressIndicator = ({ stepNum }: { stepNum: number }) => (
        <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Step {stepNum} of {formStepCount}</p>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(stepNum / formStepCount) * 100}%` }}
                />
            </div>
        </div>
    );

    const renderStep1 = () => (
        <>
            <ProgressIndicator stepNum={1} />
            <Card className="border-primary/20 bg-background/50 backdrop-blur-xl">
            <CardHeader>
                <h2 className="text-2xl font-semibold">1. Organizational Context</h2>
                <p className="text-muted-foreground">Tell us about the team and process.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label>Company Size</Label>
                    <Select value={inputs.companySize} onValueChange={(v) => handleInputChange("companySize", v)}>
                        <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                        <SelectContent>
                            {companySizeOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Primary Function</Label>
                    <Select value={inputs.functionFocus} onValueChange={(v) => handleInputChange("functionFocus", v)}>
                        <SelectTrigger><SelectValue placeholder="Select function" /></SelectTrigger>
                        <SelectContent>
                            {functionFocusOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>What is the goal of this workflow?</Label>
                    <Select value={inputs.primaryWorkflowGoal} onValueChange={(v) => handleInputChange("primaryWorkflowGoal", v)}>
                        <SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger>
                        <SelectContent>
                            {workflowGoalOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={nextStep} disabled={!inputs.companySize || !inputs.functionFocus || !inputs.primaryWorkflowGoal}>
                        Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
        </>
    );

    const renderStep2 = () => (
        <>
            <ProgressIndicator stepNum={2} />
            <Card className="border-primary/20 bg-background/50 backdrop-blur-xl">
            <CardHeader>
                <h2 className="text-2xl font-semibold">2. Impact & Scale</h2>
                <p className="text-muted-foreground">Quantify the opportunity.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label>Monthly Case Volume</Label>
                    <Select value={inputs.monthlyVolumeBand} onValueChange={(v) => handleInputChange("monthlyVolumeBand", v)}>
                        <SelectTrigger><SelectValue placeholder="Select volume range" /></SelectTrigger>
                        <SelectContent>
                            {volumeBandOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Average Handle Time (per case)</Label>
                    <Select value={inputs.currentAHTBand} onValueChange={(v) => handleInputChange("currentAHTBand", v)}>
                        <SelectTrigger><SelectValue placeholder="Select time per case" /></SelectTrigger>
                        <SelectContent>
                            {ahtBandOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Error Tolerance (Risk)</Label>
                     <Select value={inputs.errorTolerance} onValueChange={(v) => handleInputChange("errorTolerance", v)}>
                        <SelectTrigger><SelectValue placeholder="What happens if the AI makes a mistake?" /></SelectTrigger>
                        <SelectContent>
                            {errorToleranceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep} disabled={!inputs.monthlyVolumeBand || !inputs.currentAHTBand || !inputs.errorTolerance}>
                        Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
        </>
    );

    const renderStep3 = () => (
        <>
            <ProgressIndicator stepNum={3} />
            <Card className="border-primary/20 bg-background/50 backdrop-blur-xl">
            <CardHeader>
                <h2 className="text-2xl font-semibold">3. Technical Readiness</h2>
                <p className="text-muted-foreground">Assess feasibility of implementation.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label>Process Documentation Maturity</Label>
                    <Select value={inputs.processMaturity} onValueChange={(v) => handleInputChange("processMaturity", v)}>
                        <SelectTrigger><SelectValue placeholder="Is the process written down?" /></SelectTrigger>
                        <SelectContent>
                            {processMaturityOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Data Structure</Label>
                    <Select value={inputs.dataStructure} onValueChange={(v) => handleInputChange("dataStructure", v)}>
                        <SelectTrigger><SelectValue placeholder="Where does the data live?" /></SelectTrigger>
                        <SelectContent>
                            {dataStructureOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Data Access Constraints</Label>
                    <Select value={inputs.dataAccessReadiness} onValueChange={(v) => handleInputChange("dataAccessReadiness", v)}>
                        <SelectTrigger><SelectValue placeholder="Can we access the data?" /></SelectTrigger>
                        <SelectContent>
                            {dataAccessOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label className="mb-3 block">Key Tooling (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-3">
                        {toolingOptions.map(t => (
                            <div key={t.value} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={t.value}
                                    className="rounded border-primary/50 text-primary focus:ring-primary"
                                    checked={inputs.tooling.includes(t.value)}
                                    onChange={(e) => handleToolingChange(t.value, e.target.checked)}
                                />
                                <label htmlFor={t.value} className="text-sm cursor-pointer select-none">{t.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep} disabled={!inputs.processMaturity || !inputs.dataStructure || !inputs.dataAccessReadiness}>
                        Next Step <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
        </>
    );

    const renderStep4 = () => (
        <>
            <ProgressIndicator stepNum={4} />
            <Card className="border-primary/20 bg-background/50 backdrop-blur-xl">
             <CardHeader>
                <h2 className="text-2xl font-semibold">4. Commercial Fit</h2>
                <p className="text-muted-foreground">Final checks before analysis.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <Label>Is there an Executive Sponsor?</Label>
                    <Select value={inputs.sponsorReady} onValueChange={(v) => handleInputChange("sponsorReady", v)}>
                        <SelectTrigger><SelectValue placeholder="Select sponsor status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="yes">Yes, we have leadership buy-in</SelectItem>
                            <SelectItem value="no">No, we are exploring to build a case</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Rough Budget Range</Label>
                    <Select value={inputs.budgetFit} onValueChange={(v) => handleInputChange("budgetFit", v)}>
                        <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                        <SelectContent>
                            {budgetOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}>Back</Button>
                    <Button onClick={proceedToLeadCapture} disabled={!inputs.sponsorReady || !inputs.budgetFit} size="lg" className="w-40">
                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
        </>
    );

    const renderCalculating = () => (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Generating your insights...</h2>
            <p className="text-muted-foreground">Our AI is analyzing your inputs and crafting personalized recommendations.</p>
        </div>
    );

     const renderLeadCapture = () => (
        <Card className="border-primary/20 bg-background/50 backdrop-blur-xl max-w-lg mx-auto">
            <CardHeader className="text-center">
                <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Almost There</h2>
                <p className="text-muted-foreground">
                    Enter your details to unlock your personalized AI readiness analysis with strategic recommendations.
                </p>
            </CardHeader>
            <CardContent>
                {apiError && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                        {apiError}
                    </div>
                )}
                <form onSubmit={submitAssessment} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Full Name <span className="text-destructive">*</span></Label>
                        <Input
                            required
                            placeholder="Jane Doe"
                            value={leadData.name}
                            onChange={(e) => setLeadData(p => ({...p, name: e.target.value}))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Work Email <span className="text-destructive">*</span></Label>
                        <Input
                            required
                            type="email"
                            placeholder="jane@company.com"
                             value={leadData.email}
                            onChange={(e) => setLeadData(p => ({...p, email: e.target.value}))}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>Company Name <span className="text-destructive">*</span></Label>
                        <Input
                            required
                            placeholder="Acme Corp"
                             value={leadData.company}
                            onChange={(e) => setLeadData(p => ({...p, company: e.target.value}))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
                        <Input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={leadData.phone}
                            onChange={(e) => setLeadData(p => ({...p, phone: e.target.value}))}
                        />
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Generate My Assessment"}
                    </Button>
                     <p className="text-xs text-center text-muted-foreground mt-4">
                        We value your privacy. No spam.
                    </p>
                </form>
            </CardContent>
        </Card>
    );


    const renderResults = () => {
        if (!result) return null;

        return (
            <div className="space-y-8 max-w-5xl mx-auto pb-20">
                {/* Header Archetype */}
                <div className="text-center space-y-4 mb-12">
                    <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
                        YOUR AUTOMATION ARCHETYPE
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">{result.archetypeTitle}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{result.archetypeDescription}</p>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className={`border-t-4 bg-card/50 ${
                        result.viabilityScore > 70 ? 'border-t-green-500' : 
                        result.viabilityScore >= 40 ? 'border-t-amber-500' : 'border-t-red-500'
                    }`}>
                        <CardHeader className="text-center pb-2">
                            <h3 className="text-lg font-medium text-muted-foreground">Viability Score</h3>
                            <div className="text-5xl font-bold text-foreground">{result.viabilityScore} <span className="text-2xl font-normal text-muted-foreground">/ 100</span></div>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-balance">
                           Potential ROI based on volume and complexity.
                        </CardContent>
                    </Card>
                    <Card className={`border-t-4 bg-card/50 ${
                        result.readinessScore > 70 ? 'border-t-green-500' : 
                        result.readinessScore >= 40 ? 'border-t-amber-500' : 'border-t-red-500'
                    }`}>
                        <CardHeader className="text-center pb-2">
                            <h3 className="text-lg font-medium text-muted-foreground">Readiness Score</h3>
                             <div className="text-5xl font-bold text-foreground">{result.readinessScore} <span className="text-2xl font-normal text-muted-foreground">/ 100</span></div>
                        </CardHeader>
                         <CardContent className="text-center text-sm text-balance">
                           Technical maturity and data availability.
                        </CardContent>
                    </Card>
                    <Card className={`border-t-4 bg-card/50 ${
                        result.riskScore > 60 ? 'border-t-red-500' : 
                        result.riskScore >= 30 ? 'border-t-amber-500' : 'border-t-green-500'
                    }`}>
                        <CardHeader className="text-center pb-2">
                            <h3 className="text-lg font-medium text-muted-foreground">Risk Score</h3>
                             <div className="text-5xl font-bold text-foreground">{result.riskScore} <span className="text-2xl font-normal text-muted-foreground">/ 100</span></div>
                        </CardHeader>
                         <CardContent className="text-center text-sm text-balance">
                           Complexity and error tolerance requirements.
                        </CardContent>
                    </Card>
                </div>

                {/* Score Legend */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8 bg-muted/30 rounded-2xl border border-border/50">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-primary">
                            <BarChart3 className="w-4 h-4" />
                            Viability
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Measures the expected ROI. High scores (70+) indicate high-volume, high-impact tasks. Low scores ({"<"}40) suggest the workflow might be too complex or rare for custom AI.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-blue-500">
                            <CheckCircle2 className="w-4 h-4" />
                            Readiness
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Evaluates data and process maturity. Scores above 70 mean you have the necessary documentation and data to start building. Below 40 requires a {"\""}Foundation{"\""} phase.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-orange-500">
                            <Zap className="w-4 h-4" />
                            Risk
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Tracks implementation difficulty and error tolerance. High risk (60+) implies sensitive data or zero-error requirements, necessitating a human-in-the-loop (HITL) approach.
                        </p>
                    </div>
                </div>

                {/* Strategic Advice */}
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold">Strategic Recommendation</h2>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-lg leading-relaxed">
                            {result.strategicAdvice}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 pt-4">
                            <div>
                                <h3 className="font-semibold mb-3 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> What looks good</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {result.reasoning.map((r, i) => <li key={i}>• {r}</li>)}
                                </ul>
                            </div>
                            <div>
                                 <h3 className="font-semibold mb-3 flex items-center"><ArrowRight className="w-4 h-4 mr-2" /> Recommended Next Steps</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {result.nextSteps.map((r, i) => <li key={i}>• {r}</li>)}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Savings Projection */}
                <div className="grid md:grid-cols-2 gap-6">
                     <Card>
                        <CardHeader>
                             <h3 className="text-lg font-semibold">Projected Hours Saved / Mo</h3>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-primary">
                                {result.projectedHoursSaved.min} - {result.projectedHoursSaved.max} hrs
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                             <h3 className="text-lg font-semibold">Projected Cost Avoidance / Mo</h3>
                        </CardHeader>
                        <CardContent>
                             <div className="text-4xl font-bold text-green-500">
                                ${result.projectedCostAvoided.min.toLocaleString()} - ${result.projectedCostAvoided.max.toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Calculation Basis Breakdown */}
                <div className="p-6 rounded-2xl bg-muted/20 border border-border/50 print:bg-white print:border-gray-300">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest text-primary print:text-black uppercase">
                        <Calculator className="w-4 h-4" />
                        The Math Behind Your Savings
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
                        <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Volume</span>
                            <span className="font-semibold">{result.calculationBasis.monthlyVolume} cases/mo</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Current AHT</span>
                            <span className="font-semibold">{result.calculationBasis.averageAHT} mins</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">AI Efficiency</span>
                            <span className="font-semibold">{Math.round(result.calculationBasis.efficiencyGain * 100)}%</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">Readiness Factor</span>
                            <span className="font-semibold">{Math.round(result.calculationBasis.readinessFactor * 100)}%</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-muted-foreground text-xs block">FTE Rate</span>
                            <span className="font-semibold">${result.calculationBasis.hourlyRate}/hr</span>
                        </div>
                    </div>
                    <p className="mt-6 text-[10px] text-muted-foreground leading-relaxed italic border-t border-border/50 pt-4 print:text-gray-500">
                        * Calculations are based on industry benchmarks for {formatLabel(inputs.functionFocus)} workflows and assume an 80-90% success rate for initial AI pilots. Costs reflect standard HKD (USD) blended FTE rates.
                    </p>
                </div>

                {/* Persistence status */}
                {leadData.email && (
                    <p className="text-center text-sm text-muted-foreground">
                        {leadSubmitted
                            ? "Your results have been saved."
                            : "Results generated locally. Your data was not submitted — please try again or contact us."}
                    </p>
                )}

                {/* Share/Print */}
                <div className="flex justify-center no-print">
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 border-primary/20 hover:bg-primary/5"
                        onClick={() => window.print()}
                    >
                        <Download className="w-4 h-4" />
                        Download PDF Report
                    </Button>
                </div>

                {/* CTAs - archetype-specific */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                    {result.archetype === "velocity-architect" ? (
                        <Button size="lg" className="h-14 px-8 text-lg" asChild>
                            <Link href="/services/ai-automation-sprint">See the Sprint</Link>
                        </Button>
                    ) : result.archetype === "explorer" ? (
                        <Button size="lg" className="h-14 px-8 text-lg" asChild>
                            <Link href="/contact">Book Discovery Call</Link>
                        </Button>
                    ) : (
                        <Button size="lg" className="h-14 px-8 text-lg" asChild>
                            <Link href="/contact">Book Strategy Call</Link>
                        </Button>
                    )}
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
                        <Link href="/services">Explore Services</Link>
                    </Button>
                </div>

                <style jsx global>{`
                    @media print {
                        nav, footer, .no-print, button, form, .ServiceBackground {
                            display: none !important;
                        }
                        body {
                            background: white !important;
                            color: black !important;
                            -webkit-print-color-adjust: exact;
                        }
                        [class*="bg-card"], [class*="rounded-"], .grid, .p-6 {
                            background: white !important;
                            border-color: #eee !important;
                            color: black !important;
                            box-shadow: none !important;
                        }
                        .text-primary, .text-green-500, .text-orange-500, .text-foreground {
                            color: black !important;
                        }
                        .text-muted-foreground {
                            color: #666 !important;
                        }
                        .max-w-5xl {
                            max-width: 100% !important;
                            margin: 0 !important;
                            padding: 20px !important;
                        }
                        h1, h2, h3 {
                            color: black !important;
                        }
                    }
                `}</style>
            </div>
        );
    }

    // --- Main Layout ---

    return (
        <main className="min-h-screen relative overflow-hidden">
            {(step === 0 || (step >= 1 && step <= 4)) && <ServiceBackground theme="blue" />}

            <div className="relative z-10 container mx-auto px-4 pb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-3xl mx-auto pt-20"
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
        </main>
    );
}
