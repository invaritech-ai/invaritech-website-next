"use client";

import { useState } from "react";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail,
    MessageSquare,
    Calendar,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const workflowTargets = [
    { value: "knowledge", label: "Knowledge & Decision Support" },
    { value: "drafting", label: "Agentic Workflows (with approvals)" },
    { value: "intake", label: "Intake & Processing (Docs/Data/Vision)" },
    { value: "finance", label: "Finance & Back-Office Pipelines" },
    { value: "other", label: "Other / Not sure" },
];

const budgetReadiness = [
    { value: "ready", label: "Ready to invest ≥$25k" },
    { value: "considering", label: "Considering $10-25k" },
    { value: "exploring", label: "Exploring options <$10k" },
    { value: "discuss", label: "Need to discuss budget" },
];

const dataAccessPaths = [
    { value: "minimal", label: "Minimal data access (preferred)" },
    { value: "synthetic", label: "Synthetic data access" },
    { value: "full", label: "Full data access available" },
    { value: "restricted", label: "Data access restricted/blocked" },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        company: "",
        workflowTarget: "",
        budgetReadiness: "",
        dataAccessPath: "",
        message: "",
        consent: false,
    });

    const [formState, setFormState] = useState({
        isSubmitting: false,
        isSuccess: false,
        error: null as string | null,
    });

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.consent) {
            setFormState((prev) => ({
                ...prev,
                error: "Please provide consent to process your information",
            }));
            return;
        }

        setFormState({ isSubmitting: true, isSuccess: false, error: null });

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setFormState({ isSubmitting: false, isSuccess: true, error: null });
        } catch (error) {
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                error: "Failed to submit form. Please try again.",
            });
        }
    };

    if (formState.isSuccess) {
        return (
            <main>
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <Card className="max-w-2xl mx-auto">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Thank you!
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Your information has been submitted
                                    successfully. We&apos;ll get back to you
                                    within 24 hours to schedule your
                                    Architecture & Roadmap discussion.
                                </p>
                                <div className="space-y-4">
                                    <Button asChild className="w-full">
                                        <Link href="/ops-efficiency-sprint">
                                            Learn about the Sprint
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <Link href="/assessment">
                                            Take the Assessment
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <>
            <HeroHeader />
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Talk to us
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                We start with a 20-minute Architecture & Roadmap
                                discussion if the assessment score is hot.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-2xl px-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-2xl font-semibold text-center">
                                    Get in Touch
                                </h2>
                                <p className="text-center text-muted-foreground">
                                    Tell us about your efficiency challenges and
                                    we&apos;ll recommend the best approach.
                                </p>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Basic Information */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">
                                                Full name *
                                            </Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">
                                                Email *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="role">Role *</Label>
                                            <Input
                                                id="role"
                                                value={formData.role}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "role",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g., Operations Manager, CTO"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="company">
                                                Company *
                                            </Label>
                                            <Input
                                                id="company"
                                                value={formData.company}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "company",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Workflow Target */}
                                    <div>
                                        <Label htmlFor="workflowTarget">
                                            Primary workflow target *
                                        </Label>
                                        <Select
                                            value={formData.workflowTarget}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    "workflowTarget",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your primary workflow goal" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {workflowTargets.map(
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

                                    {/* Budget Readiness */}
                                    <div>
                                        <Label htmlFor="budgetReadiness">
                                            Budget readiness *
                                        </Label>
                                        <Select
                                            value={formData.budgetReadiness}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    "budgetReadiness",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your budget range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {budgetReadiness.map(
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

                                    {/* Data Access Path */}
                                    <div>
                                        <Label htmlFor="dataAccessPath">
                                            Data access path *
                                        </Label>
                                        <Select
                                            value={formData.dataAccessPath}
                                            onValueChange={(value) =>
                                                handleInputChange(
                                                    "dataAccessPath",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your data access approach" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {dataAccessPaths.map(
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

                                    {/* Message */}
                                    <div>
                                        <Label htmlFor="message">
                                            Additional details
                                        </Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            placeholder="Tell us about your specific challenges, current processes, or any questions you have..."
                                        />
                                    </div>

                                    {/* Consent */}
                                    <div className="flex items-start space-x-2">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            checked={formData.consent}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "consent",
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-1"
                                            required
                                        />
                                        <Label
                                            htmlFor="consent"
                                            className="text-sm"
                                        >
                                            I consent to Invaritech processing
                                            my information for the purpose of
                                            discussing potential automation
                                            solutions. *
                                        </Label>
                                    </div>

                                    {/* Error Message */}
                                    {formState.error && (
                                        <div className="flex items-center p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                            <AlertTriangle className="w-4 h-4 text-destructive mr-2 flex-shrink-0" />
                                            <span className="text-sm text-destructive">
                                                {formState.error}
                                            </span>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={formState.isSubmitting}
                                        size="lg"
                                        className="w-full"
                                    >
                                        {formState.isSubmitting ? (
                                            <>
                                                <MessageSquare className="w-4 h-4 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Submit Information
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Alternative Contact Methods */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Other ways to reach us
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Prefer a different approach? We&apos;re here to
                                help.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="text-center hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Email us directly
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Send us a detailed message about your
                                        requirements
                                    </p>
                                    <div className="space-y-2">
                                        <a
                                            href="mailto:aditi@invaritech.ai"
                                            className="block text-sm text-primary hover:underline"
                                        >
                                            aditi@invaritech.ai
                                        </a>
                                        <a
                                            href="mailto:avishek@invaritech.ai"
                                            className="block text-sm text-primary hover:underline"
                                        >
                                            avishek@invaritech.ai
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Book a call
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Schedule a 15-minute discovery call to
                                        discuss your needs
                                    </p>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="#calendar">
                                            Schedule Call
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="text-center hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Take the assessment
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Get your Ops Efficiency Score and
                                        personalized recommendations
                                    </p>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/assessment">
                                            Start Assessment
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSection />
        </>
    );
}
