"use client";

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { calculateAssessmentScore, AssessmentInputs, AssessmentResult } from "@/lib/assessment-calculator";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { motion, AnimatePresence } from "motion/react";

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
    { value: "finance", label: "Finance / Accounting" },
    { value: "legal", label: "Legal / Compliance" },
    { value: "hr", label: "HR / People Ops" },
    { value: "other", label: "Other" },
];

const workflowGoalOptions = [
    { value: "knowledge", label: "Knowledge Retrieval (Policy/Product Info)" },
    { value: "drafting", label: "Drafting Assitance (Reports/Emails)" },
    { value: "intake", label: "Intake Processing (Forms/Applications)" },
    { value: "finance", label: "Data Reconciliation / Extraction" },
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
    });

    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const calculateResult = () => {
        setStep(5); // Calculation screen
        setTimeout(() => {
            const res = calculateAssessmentScore(inputs);
            setResult(res);
            setStep(6); // Lead capture
        }, 1500);
    };

    const submitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send to existing contact API
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: leadData.name,
                    email: leadData.email,
                    company: leadData.company,
                    country: "Assessment Lead",
                    phone: "N/A",
                    // Pack the assessment results into the message body
                    message: `
Assessment Results for ${leadData.company}:
Tier: ${result?.tier.toUpperCase()}
Archetype: ${result?.archetypeTitle}

Scores:
- Viability: ${result?.viabilityScore}/100
- Readiness: ${result?.readinessScore}/100
- Risk: ${result?.riskScore}/100

Inputs:
- Function: ${inputs.functionFocus}
- Goal: ${inputs.primaryWorkflowGoal}
- Volume: ${inputs.monthlyVolumeBand}
- AHT: ${inputs.currentAHTBand}
                    `.trim(),
                    source: "Assessment Tool",
                }),
            });

            if (response.ok) {
                setStep(7); // Show results
            } else {
                // Fallback if API fails, still show results to user
                console.error("Failed to save lead");
                setStep(7);
            }
        } catch (err) {
            console.error(err);
            setStep(7);
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={nextStep}>
                Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );

    const renderStep1 = () => (
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
    );

    const renderStep2 = () => (
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
    );

    const renderStep3 = () => (
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
    );

    const renderStep4 = () => (
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
                    <Button onClick={calculateResult} disabled={!inputs.sponsorReady || !inputs.budgetFit} size="lg" className="w-40">
                        Analyze <BarChart3 className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const renderCalculating = () => (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Analyzing your inputs...</h2>
            <p className="text-muted-foreground">Calculating viability, readiness, and risk scores.</p>
        </div>
    );

     const renderLeadCapture = () => (
        <Card className="border-primary/20 bg-background/50 backdrop-blur-xl max-w-lg mx-auto">
            <CardHeader className="text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold">Analysis Complete</h2>
                <p className="text-muted-foreground">
                    We&apos;ve identified your Automation Archetype. <br/>Enter your details to reveal your full roadmap and ROI calculation.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={submitLead} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                            required
                            placeholder="Jane Doe"
                            value={leadData.name}
                            onChange={(e) => setLeadData(p => ({...p, name: e.target.value}))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Work Email</Label>
                        <Input
                            required
                            type="email"
                            placeholder="jane@company.com"
                             value={leadData.email}
                            onChange={(e) => setLeadData(p => ({...p, email: e.target.value}))}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input
                            required
                            placeholder="Acme Corp"
                             value={leadData.company}
                            onChange={(e) => setLeadData(p => ({...p, company: e.target.value}))}
                        />
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Reveal My Results"}
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
                    <Card className="border-t-4 border-t-primary bg-card/50">
                        <CardHeader className="text-center pb-2">
                            <h3 className="text-lg font-medium text-muted-foreground">Viability Score</h3>
                            <div className="text-5xl font-bold text-foreground">{result.viabilityScore}</div>
                        </CardHeader>
                        <CardContent className="text-center text-sm text-balance">
                           Measure of potential ROI based on volume and complexity.
                        </CardContent>
                    </Card>
                    <Card className="border-t-4 border-t-blue-500 bg-card/50">
                        <CardHeader className="text-center pb-2">
                            <h3 className="text-lg font-medium text-muted-foreground">Readiness Score</h3>
                             <div className="text-5xl font-bold text-foreground">{result.readinessScore}</div>
                        </CardHeader>
                         <CardContent className="text-center text-sm text-balance">
                           Measure of technical maturity and data availability.
                        </CardContent>
                    </Card>
                    <Card className="border-t-4 border-t-orange-500 bg-card/50">
                        <CardHeader className="text-center pb-2">
                            <h3 className="text-lg font-medium text-muted-foreground">Risk Score</h3>
                             <div className="text-5xl font-bold text-foreground">{result.riskScore}</div>
                        </CardHeader>
                         <CardContent className="text-center text-sm text-balance">
                           Measure of complexity and error tolerance requirements.
                        </CardContent>
                    </Card>
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

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                     <Button size="lg" className="h-14 px-8 text-lg" asChild>
                        <Link href="/contact">Book Strategy Call</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
                        <Link href="/services">Explore Services</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // --- Main Layout ---

    return (
        <main className="min-h-screen relative overflow-hidden">
            {step === 0 && <ServiceBackground theme="blue" />} {/* Dynamic background for intro */}

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
                        {step === 5 && renderCalculating()}
                        {step === 6 && renderLeadCapture()}
                        {step === 7 && renderResults()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
