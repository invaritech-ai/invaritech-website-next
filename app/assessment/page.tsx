"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Calculator,
    TrendingUp,
    Clock,
    DollarSign,
    Users,
    CheckCircle,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
    calculateAssessmentScore,
    AssessmentInputs,
    AssessmentResult,
} from "@/lib/assessment-calculator";

const companySizeOptions = [
    { value: "50-200", label: "50-200 employees" },
    { value: "200-500", label: "200-500 employees" },
    { value: "500-1000", label: "500-1000 employees" },
    { value: "1000-2000", label: "1000-2000 employees" },
    { value: "2000+", label: "2000+ employees" },
];

const functionFocusOptions = [
    { value: "ops", label: "Operations" },
    { value: "support", label: "Support" },
    { value: "finance", label: "Finance" },
    { value: "other", label: "Other" },
];

const workflowGoalOptions = [
    { value: "knowledge", label: "Knowledge answers / policy lookup" },
    { value: "drafting", label: "Report/estimate drafting" },
    { value: "intake", label: "Intake / document processing" },
    { value: "finance", label: "Finance / reconciliation" },
];

const volumeBandOptions = [
    { value: "100-500", label: "100-500 cases/month" },
    { value: "500-1000", label: "500-1000 cases/month" },
    { value: "1000-2000", label: "1000-2000 cases/month" },
    { value: "2000-5000", label: "2000-5000 cases/month" },
    { value: "5000+", label: "5000+ cases/month" },
];

const ahtBandOptions = [
    { value: "<1 min", label: "<1 minute" },
    { value: "1-3 min", label: "1-3 minutes" },
    { value: "3-5 min", label: "3-5 minutes" },
    { value: "5+ min", label: "5+ minutes" },
];

const toolingOptions = [
    { value: "slack", label: "Slack" },
    { value: "teams", label: "Microsoft Teams" },
    { value: "salesforce", label: "Salesforce" },
    { value: "servicenow", label: "ServiceNow" },
    { value: "jira", label: "Jira" },
    { value: "confluence", label: "Confluence" },
    { value: "sharepoint", label: "SharePoint" },
    { value: "zendesk", label: "Zendesk" },
    { value: "freshdesk", label: "Freshdesk" },
    { value: "other", label: "Other" },
];

const dataAccessOptions = [
    { value: "minimal", label: "Minimal data access (preferred)" },
    { value: "synthetic", label: "Synthetic data access" },
    { value: "blocked", label: "Data access blocked/restricted" },
];

const budgetOptions = [
    { value: "≥$25k", label: "≥$25k (ideal)" },
    { value: "$10-25k", label: "$10-25k" },
    { value: "<$10k", label: "<$10k" },
];

export default function Assessment() {
    const [inputs, setInputs] = useState<AssessmentInputs>({
        companySize: "",
        functionFocus: "",
        primaryWorkflowGoal: "",
        monthlyVolumeBand: "",
        currentAHTBand: "",
        tooling: [],
        dataAccessReadiness: "",
        sponsorReady: "",
        budgetFit: "",
    });

    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleInputChange = (
        field: keyof AssessmentInputs,
        value: string | string[]
    ) => {
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

    const handleSubmit = () => {
        setIsCalculating(true);

        // Simulate calculation delay
        setTimeout(() => {
            const assessmentResult = calculateAssessmentScore(inputs);
            setResult(assessmentResult);
            setIsCalculating(false);
        }, 1500);
    };

    const isFormComplete = Object.values(inputs).every((value) =>
        Array.isArray(value) ? value.length > 0 : value !== ""
    );

    if (result) {
        return (
            <main>
                {/* Results Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
	                    <div className="mx-auto max-w-4xl px-6">
	                        <div className="text-center mb-12">
	                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
	                                Your Ops Efficiency Score
	                            </h2>
	                            <div className="flex items-center justify-center mb-6">
	                                <div className="text-6xl font-bold text-primary mr-4">
	                                    {result.score}
	                                </div>
                                <div>
                                    <Badge
                                        variant={
                                            result.tier === "hot"
                                                ? "default"
                                                : result.tier === "warm"
                                                ? "secondary"
                                                : "outline"
                                        }
                                        className="text-lg px-4 py-2"
                                    >
                                        {result.tier.toUpperCase()} LEAD
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Projected Savings */}
                            <Card>
                                <CardHeader>
                                    <h2 className="text-xl font-semibold flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Projected Savings
                                    </h2>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <Clock className="w-4 h-4 text-accent mr-2" />
                                            <span className="font-medium text-accent">
                                                Hours Saved/Month
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-accent">
                                            {result.projectedHoursSaved.min} -{" "}
                                            {result.projectedHoursSaved.max}
                                        </p>
                                    </div>

                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <DollarSign className="w-4 h-4 text-primary mr-2" />
                                            <span className="font-medium text-primary">
                                                Cost Avoided/Month
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-primary">
                                            $
                                            {result.projectedCostAvoided.min.toLocaleString()}{" "}
                                            - $
                                            {result.projectedCostAvoided.max.toLocaleString()}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recommended Lane */}
                            <Card>
                                <CardHeader>
                                    <h2 className="text-xl font-semibold flex items-center">
                                        <Users className="w-5 h-5 mr-2" />
                                        Recommended Approach
                                    </h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                        <h3 className="font-semibold text-primary mb-2">
                                            Recommended Lane:
                                        </h3>
                                        <p className="text-lg font-medium">
                                            {result.recommendedLane}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Reasoning */}
                        <Card className="mb-8">
                            <CardHeader>
                                <h2 className="text-xl font-semibold">
                                    Assessment Reasoning
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {result.reasoning.map((reason, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">
                                                {reason}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Next Steps */}
                        <Card className="mb-8">
                            <CardHeader>
                                <h2 className="text-xl font-semibold">
                                    Recommended Next Steps
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {result.nextSteps.map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* CTAs */}
                        <div className="text-center">
                            {result.tier === "hot" ? (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-primary mb-4">
                                        🎉 Excellent fit! You&apos;re ready for
                                        the Ops Efficiency Sprint.
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button asChild size="lg">
                                            <Link href="/contact">
                                                Book Architecture & Roadmap
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                        >
                                            <Link href="/ops-efficiency-sprint">
                                                See the Sprint
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : result.tier === "warm" ? (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-destructive mb-4">
                                        🤔 Good potential. Let&apos;s discuss
                                        your specific needs.
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button asChild size="lg">
                                            <Link href="/contact">
                                                Book Architecture & Roadmap
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                        >
                                            <Link href="/ops-efficiency-sprint">
                                                See the 6-week Demo Plan
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        📋 Let&apos;s explore alternative
                                        approaches for your situation.
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button asChild size="lg">
                                            <Link href="/contact">
                                                Discuss Alternatives
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                        >
                                            <Link href="/about">
                                                Learn More About Us
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <>
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Get your Ops Efficiency Score
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Instant results with recommended next steps.
                                Takes 3 minutes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Assessment Form */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-2xl px-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-semibold text-center">
                                    Assessment Questions
                                </h2>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* Company Size */}
                                <div>
                                    <Label
                                        htmlFor="companySize"
                                        className="text-base font-medium"
                                    >
                                        Company size
                                    </Label>
                                    <Select
                                        value={inputs.companySize}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "companySize",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select company size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companySizeOptions.map(
                                                (option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Function Focus */}
                                <div>
                                    <Label
                                        htmlFor="functionFocus"
                                        className="text-base font-medium"
                                    >
                                        Function focus
                                    </Label>
                                    <Select
                                        value={inputs.functionFocus}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "functionFocus",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select primary function" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {functionFocusOptions.map(
                                                (option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Primary Workflow Goal */}
                                <div>
                                    <Label
                                        htmlFor="primaryWorkflowGoal"
                                        className="text-base font-medium"
                                    >
                                        Primary workflow goal
                                    </Label>
                                    <Select
                                        value={inputs.primaryWorkflowGoal}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "primaryWorkflowGoal",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select workflow goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {workflowGoalOptions.map(
                                                (option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Monthly Volume */}
                                <div>
                                    <Label
                                        htmlFor="monthlyVolumeBand"
                                        className="text-base font-medium"
                                    >
                                        Monthly volume band
                                    </Label>
                                    <Select
                                        value={inputs.monthlyVolumeBand}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "monthlyVolumeBand",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select monthly volume" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {volumeBandOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Current AHT */}
                                <div>
                                    <Label
                                        htmlFor="currentAHTBand"
                                        className="text-base font-medium"
                                    >
                                        Current AHT band
                                    </Label>
                                    <Select
                                        value={inputs.currentAHTBand}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "currentAHTBand",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select current AHT" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ahtBandOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Tooling */}
                                <div>
                                    <Label className="text-base font-medium">
                                        Tooling (select all that apply)
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {toolingOptions.map((tool) => (
                                            <label
                                                key={tool.value}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={inputs.tooling.includes(
                                                        tool.value
                                                    )}
                                                    onChange={(e) =>
                                                        handleToolingChange(
                                                            tool.value,
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded"
                                                />
                                                <span className="text-sm">
                                                    {tool.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Data Access Readiness */}
                                <div>
                                    <Label
                                        htmlFor="dataAccessReadiness"
                                        className="text-base font-medium"
                                    >
                                        Data access readiness
                                    </Label>
                                    <Select
                                        value={inputs.dataAccessReadiness}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "dataAccessReadiness",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select data access approach" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dataAccessOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Sponsor Ready */}
                                <div>
                                    <Label
                                        htmlFor="sponsorReady"
                                        className="text-base font-medium"
                                    >
                                        Sponsor ready?
                                    </Label>
                                    <Select
                                        value={inputs.sponsorReady}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "sponsorReady",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select sponsor status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">
                                                Yes
                                            </SelectItem>
                                            <SelectItem value="no">
                                                No
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Budget Fit */}
                                <div>
                                    <Label
                                        htmlFor="budgetFit"
                                        className="text-base font-medium"
                                    >
                                        Budget fit
                                    </Label>
                                    <Select
                                        value={inputs.budgetFit}
                                        onValueChange={(value) =>
                                            handleInputChange(
                                                "budgetFit",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select budget range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {budgetOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={
                                            !isFormComplete || isCalculating
                                        }
                                        size="lg"
                                        className="w-full"
                                    >
                                        {isCalculating ? (
                                            <>
                                                <Calculator className="w-4 h-4 mr-2 animate-spin" />
                                                Calculating your score...
                                            </>
                                        ) : (
                                            <>
                                                <Calculator className="w-4 h-4 mr-2" />
                                                Get my Ops Efficiency Score
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
}
