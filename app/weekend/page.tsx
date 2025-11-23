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
                        Every Lead to Signed Project in a Weekend
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6">
                        Weekend turns every new inquiry into a same‑day proposal, signed contract, and first invoice.
                    </p>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A simple admin suite for freelancers & tiny agencies to set up a professional client flow in a single weekend.
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
                                    <span>Solo freelancers & 1–3 person agencies</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Designers, Devs, Marketers, Consultants</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Handling 5–30 inquiries/month ($1k+ projects)</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span>Using email, Google Docs, Notion, but feeling chaotic</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">The Pain (Miseries)</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">×</span>
                                    <span>Leads scattered across inbox, forms, and DMs.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">×</span>
                                    <span>Proposals reinvented every time, often sent days late.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">×</span>
                                    <span>Invoices sent late or forgotten; lumpy cash flow.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-500 font-bold">×</span>
                                    <span>"My work is great, but my ops are amateur."</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">What Weekend Does</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span><strong>Lead Capture:</strong> Hosted forms that instantly create a Lead.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span><strong>AI Proposals:</strong> Auto-draft from inquiry into a structured proposal.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span><strong>Contracts:</strong> One click to a simple agreement with e-signature.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span><strong>Onboarding:</strong> Predefined welcome sequence & task lists.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-primary flex-none" />
                                    <span><strong>Invoices:</strong> Straightforward project-tied invoices & tracking.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-xl bg-muted/50 p-6 border border-border/50">
                            <h3 className="font-semibold mb-2">Why it&apos;s Killer</h3>
                            <p className="text-sm text-muted-foreground">
                                It&apos;s a "Weekend-sized" setup. You can realistically configure it in a weekend. It&apos;s a thin layer on top of your existing tools, not a heavy CRM replacement.
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
