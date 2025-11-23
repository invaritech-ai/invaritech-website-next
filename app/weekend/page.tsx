"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function WeekendPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        website: "",
        workType: "",
        headache: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Using the existing contact API for now
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    message: `Weekend Waitlist: ${formData.workType} - ${formData.headache}`,
                    source: "Weekend Waitlist",
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        In Development • Join the Waitlist
                    </div>
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        Weekend
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6">
                        A Simple Admin Suite for Freelancers & Tiny Agencies
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Weekend is a focused admin tool that handles the messy middle from lead → proposal → contract → onboarding → invoice, on top of the tools you already use.
                    </p>
                </div>

                <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
                    {/* Content */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Who it&apos;s for</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Freelancers juggling multiple clients</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Tiny agencies (1-5 people)</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Consultants who hate admin work</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">What it does</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Unified lead forms & pipeline</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>AI-generated proposals & contracts</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Automated client onboarding flows</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Simple invoicing & payment tracking</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Integrates with your existing tools</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-xl bg-muted/50 p-6 border border-border/50">
                            <h3 className="font-semibold mb-2">Pilot Program</h3>
                            <p className="text-sm text-muted-foreground">
                                We&apos;re building Weekend with a small group of early users. Join the waitlist to get early access, shape the product, and lock in a future discount.
                            </p>
                        </div>
                    </div>

                    {/* Waitlist Form */}
                    <div>
                        <Card className="p-6 md:p-8">
                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto size-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">You&apos;re on the list!</h3>
                                    <p className="text-muted-foreground">
                                        Thanks for your interest. We&apos;ll be in touch soon with updates.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h3 className="text-xl font-semibold mb-6">Join the Waitlist</h3>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website / Portfolio</Label>
                                        <Input
                                            id="website"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="e.g. invaritech.ai"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="workType">Type of work</Label>
                                        <Input
                                            id="workType"
                                            name="workType"
                                            value={formData.workType}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Web Design, SEO, Coaching"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="headache">Biggest admin headache right now</Label>
                                        <Input
                                            id="headache"
                                            name="headache"
                                            value={formData.headache}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Chasing invoices, writing proposals"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Joining..." : "Join Waitlist"}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
