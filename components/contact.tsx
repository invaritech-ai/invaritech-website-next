"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { submitContactLead } from "@/app/actions/leads";
import { appendAttributionToFormData } from "@/lib/attribution";
import {
    Calendar,
    Mail,
    CheckCircle2,
    ArrowRight,
    Globe2,
} from "lucide-react";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";

interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    company: string;
    message: string;
}

interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

interface ContactSectionProps {
    scanRequested?: boolean;
}

export default function ContactSection({ scanRequested = false }: ContactSectionProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        country: "",
        company: "",
        message: "",
    });

    const [formState, setFormState] = useState<FormState>({
        isSubmitting: false,
        isSuccess: false,
        error: null,
    });

    const [turnstileToken, setTurnstileToken] = useState<string>("");
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = (values: FormData): boolean => {
        if (!values.name.trim()) {
            setFormState((prev) => ({ ...prev, error: "Name is required" }));
            return false;
        }
        if (!values.email.trim()) {
            setFormState((prev) => ({ ...prev, error: "Email is required" }));
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
            setFormState((prev) => ({
                ...prev,
                error: "Please enter a valid email address",
            }));
            return false;
        }
        if (!values.country.trim()) {
            setFormState((prev) => ({ ...prev, error: "Country is required" }));
            return false;
        }
        if (!values.message.trim()) {
            setFormState((prev) => ({ ...prev, error: "Message is required" }));
            return false;
        }
        if (!turnstileToken) {
            setFormState((prev) => ({ ...prev, error: "Please complete the verification" }));
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const rawForm = new FormData(e.currentTarget);
        const submittedForm: FormData = {
            name: String(rawForm.get("name") || formData.name),
            email: String(rawForm.get("email") || formData.email),
            phone: String(rawForm.get("phone") || formData.phone),
            country: String(rawForm.get("country") || formData.country),
            company: String(rawForm.get("company") || formData.company),
            message: String(rawForm.get("message") || formData.message),
        };

        setFormData(submittedForm);
        if (!validateForm(submittedForm)) return;

        setFormState({ isSubmitting: true, isSuccess: false, error: null });

        const fd = new FormData();
        fd.set("name", submittedForm.name);
        fd.set("email", submittedForm.email);
        fd.set("phone", submittedForm.phone);
        fd.set("country", submittedForm.country);
        fd.set("company", submittedForm.company);
        fd.set("message", submittedForm.message);
        fd.set("cf_turnstile_token", turnstileToken);

        appendAttributionToFormData(fd);

        const result = await submitContactLead(fd);

        if (!result.success) {
            turnstileRef.current?.reset();
            setTurnstileToken("");
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                error: result.error ?? "Failed to submit form",
            });
            return;
        }

        setFormState({ isSubmitting: false, isSuccess: true, error: null });
        setFormData({ name: "", email: "", phone: "", country: "", company: "", message: "" });
    };

    if (formState.isSuccess) {
        return (
            <section className="py-12 md:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <Card className="mx-auto max-w-lg p-8 sm:p-16 text-center rounded-none border border-border bg-card  shadow-none">
                        <div className="flex justify-center mb-6">
                            <div className="bg-primary/10 p-3 border border-primary/20">
                                <CheckCircle2 className="h-12 w-12 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-foreground">
                            Message Sent.
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                            We&apos;ve received your message and will get back to you shortly.
                        </p>
                        <Button
                            onClick={() =>
                                setFormState({
                                    isSubmitting: false,
                                    isSuccess: false,
                                    error: null,
                                })
                            }
                            variant="outline"
                            className="w-full sm:w-auto rounded-none border-border"
                        >
                            Send Another Message
                        </Button>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="pb-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column - Info & Context */}
                    <div className="flex flex-col justify-between space-y-12">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                                    Why work with Invaritech on AP payment controls?
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Invaritech scopes, builds, and supports invoice approval controls,
                                    duplicate payment checks, and payment fraud controls. A founder stays
                                    accountable from scoping through delivery.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-primary/10 border border-border p-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1 text-foreground">Book a Meeting</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Skip the email loop and bring one
                                            real accounts payable workflow
                                            problem to a focused scoping session.
                                        </p>
                                        <Button
                                            asChild
                                            variant="default"
                                            className="group rounded-none"
                                        >
                                            <a
                                                href={BOOK_MEETING_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {BOOK_MEETING_CTA}
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-primary/10 border border-border p-2">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1 text-foreground">Email Us</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Prefer to write it down? Send us an email and we&apos;ll respond within 24 hours.
                                        </p>
                                        <Link
                                            href="mailto:hello@invaritech.ai"
                                            className="text-primary hover:underline font-medium font-mono text-sm"
                                        >
                                            hello@invaritech.ai
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="relative">
                        <Card className="rounded-none border border-border bg-card  shadow-none p-6 sm:p-8 md:p-10">
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-2 text-foreground">
                                    {scanRequested ? "Request the free AP controls scan" : "Send us a message"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {scanRequested
                                        ? "Tell us which accounting system you use and the best way to handle the NDA before you send your export."
                                        : "Tell us which invoice approval workflow, supplier reconciliation, or payment risk process needs attention."}
                                </p>
                            </div>

                            <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email *</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@company.com"
                                            defaultValue={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="rounded-none bg-background border-border font-mono text-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full name *</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            defaultValue={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="rounded-none bg-background border-border font-mono text-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone</Label>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            defaultValue={formData.phone}
                                            onChange={handleInputChange}
                                            className="rounded-none bg-background border-border font-mono text-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Country *</Label>
                                        <Input
                                            type="text"
                                            id="country"
                                            name="country"
                                            placeholder="Australia"
                                            defaultValue={formData.country}
                                            onChange={handleInputChange}
                                            required
                                            className="rounded-none bg-background border-border font-mono text-foreground placeholder:text-muted-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company / Website</Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        name="company"
                                        placeholder="acme.com"
                                        defaultValue={formData.company}
                                        onChange={handleInputChange}
                                        className="rounded-none bg-background border-border font-mono text-foreground placeholder:text-muted-foreground"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                        What payment control needs attention? *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder={scanRequested
                                            ? "Example: I want the free AP controls scan. We use Xero and can provide a 90-day export after NDA."
                                            : "Example: duplicate payment prevention, supplier statement reconciliation, or vendor bank detail verification workflow."}
                                        defaultValue={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        required
                                        className="rounded-none bg-background border-border font-mono text-foreground placeholder:text-muted-foreground resize-none"
                                    />
                                </div>

                                <TurnstileWidget
                                    ref={turnstileRef}
                                    onSuccess={setTurnstileToken}
                                    onError={() => { turnstileRef.current?.reset(); setTurnstileToken(""); }}
                                    onExpire={() => { turnstileRef.current?.reset(); setTurnstileToken(""); }}
                                />

                                {formState.error && (
                                    <div className="rounded-none border-l-2 border-destructive bg-destructive/10 pl-3 py-2 text-sm text-destructive flex items-center gap-2">
                                        <span className="font-mono font-medium">ERR:</span> {formState.error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={formState.isSubmitting || !turnstileToken}
                                    className="w-full rounded-none"
                                    size="lg"
                                >
                                    {formState.isSubmitting
                                        ? "Sending..."
                                        : scanRequested ? "Request AP Controls Scan" : "Send Message"}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>

                <div className="mt-16 lg:mt-20">
                    <div className="relative overflow-hidden border border-border/70 bg-card p-6 sm:p-8 md:p-10">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 shrink-0 rounded-none bg-primary/10 border border-border p-2">
                                <Globe2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Remote delivery, Australian focus</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                    We&apos;re based in Asia and deliver remotely. No Sydney office.
                                    That&apos;s what keeps our prices lower than a local firm.
                                    Every engagement is handled directly by a founder, over video
                                    call and async communication, with full documentation and audit
                                    trails throughout.
                                </p>
                                <a
                                    href="mailto:hello@invaritech.ai"
                                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline font-mono"
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    hello@invaritech.ai
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
