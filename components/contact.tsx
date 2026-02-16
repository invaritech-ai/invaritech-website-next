"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import {
    Calendar,
    Mail,
    CheckCircle2,
    ArrowRight,
    MapPin,
    PhoneCall,
    Building2,
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

interface OfficeLocation {
    region: string;
    address: string[];
    phone?: string;
    phoneHref?: string;
    email?: string;
}

const OFFICE_LOCATIONS: OfficeLocation[] = [
    {
        region: "Hong Kong",
        address: [
            "15/F, 69 Jervois Street",
            "Sheung Wan",
            "Hong Kong Island",
        ],
        phone: "+852 5744 5060",
        phoneHref: "+85257445060",
        email: "hello@invaritech.ai",
    },
    {
        region: "US California",
        address: ["34786 Blackstone Way,", "California 94555"],
        phone: "+1 (408) 821-8283",
        phoneHref: "+14088218283",
        email: "hello@codeacious.tech",
    },
    {
        region: "US Dover",
        address: ["8 The Green STE A,", "Dover, DE 19901"],
        phone: "+1 (408) 821-8283",
        phoneHref: "+14088218283",
        email: "hello@codeacious.tech",
    },
    {
        region: "India",
        address: [
            "AltF CoWorking Space, Sector 142,",
            "Noida, Uttar Pradesh 201304",
        ],
        phone: "+91 94100 60107",
        phoneHref: "+919410060107",
        email: "hello@codeacious.tech",
    },
    {
        region: "Malaysia",
        address: [
            "6, Danau Desa Business Center,",
            "Jalan 4/109F, Taman Danau Desa,",
            "58100 Kuala Lumpur",
        ],
        phone: "+603 7972 5186",
        phoneHref: "+60379725186",
        email: "info@crestsolution.com.my",
    },
];

export default function ContactSection() {
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

    // Initialize reCAPTCHA
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const { executeRecaptcha } = useRecaptcha({
        siteKey: recaptchaSiteKey || "",
        action: "contact_form_submit",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setFormState((prev) => ({ ...prev, error: "Name is required" }));
            return false;
        }
        if (!formData.email.trim()) {
            setFormState((prev) => ({ ...prev, error: "Email is required" }));
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormState((prev) => ({
                ...prev,
                error: "Please enter a valid email address",
            }));
            return false;
        }
        if (!formData.country.trim()) {
            setFormState((prev) => ({ ...prev, error: "Country is required" }));
            return false;
        }
        if (!formData.message.trim()) {
            setFormState((prev) => ({ ...prev, error: "Message is required" }));
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormState({ isSubmitting: true, isSuccess: false, error: null });

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl || apiUrl.trim() === "") {
                throw new Error(
                    "Contact service is unavailable. Please try again later."
                );
            }

            // Execute reCAPTCHA
            let recaptchaToken = null;
            if (recaptchaSiteKey) {
                recaptchaToken = await executeRecaptcha();
                if (!recaptchaToken) {
                    throw new Error("reCAPTCHA verification failed");
                }
            }

            const response = await fetch(`${apiUrl}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    source: "Contact Form",
                    recaptchaToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit form");
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || "Failed to submit form");
            }

            setFormState({ isSubmitting: false, isSuccess: true, error: null });
            setFormData({
                name: "",
                email: "",
                phone: "",
                country: "",
                company: "",
                message: "",
            });
        } catch (error) {
            console.error("Form submission error:", error);
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred",
            });
        }
    };

    if (formState.isSuccess) {
        return (
            <section className="py-12 md:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <Card className="mx-auto max-w-lg p-8 sm:p-16 text-center border-none shadow-2xl bg-background/50 backdrop-blur-sm">
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">
                            Message Sent!
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Thanks for reaching out. We&apos;ve received your message and will get back to you shortly.
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
                            className="w-full sm:w-auto"
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
                                <h2 className="text-2xl font-semibold mb-4">
                                    Why partner with Invaritech?
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Invaritech leads architecture, delivery, and
                                    accountability. Our partner engineering
                                    network extends execution capacity, but you
                                    always have one accountable owner for
                                    outcomes.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 rounded-lg bg-primary/10 p-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Book a Meeting</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Skip the email loop and book a
                                            focused session directly with our
                                            team.
                                        </p>
                                        <Button
                                            asChild
                                            variant="default"
                                            className="group"
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
                                    <div className="mt-1 rounded-lg bg-primary/10 p-2">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-1">Email Us</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Prefer to write it down? Send us an email and we&apos;ll respond within 24 hours.
                                        </p>
                                        <Link
                                            href="mailto:hello@invaritech.ai"
                                            className="text-primary hover:underline font-medium"
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
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-3xl opacity-20 -z-10" />
                        <Card className="border-none shadow-xl bg-background/80 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-2">
                                    Send us a message
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Tell us a bit about your project and we&apos;ll be in touch.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full name *</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country *</Label>
                                        <Input
                                            type="text"
                                            id="country"
                                            name="country"
                                            placeholder="United States"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Company / Website</Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        name="company"
                                        placeholder="acme.com"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="bg-background/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">
                                        What would you like to automate or build? *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us about your project goals, timeline, and requirements..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        required
                                        className="bg-background/50 resize-none"
                                    />
                                </div>

                                {formState.error && (
                                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
                                        <span className="font-medium">Error:</span> {formState.error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={formState.isSubmitting}
                                    className="w-full"
                                    size="lg"
                                >
                                    {formState.isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>

                <div className="mt-16 lg:mt-20">
                    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card/90 to-primary/5 p-6 sm:p-8 md:p-10">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/20 blur-3xl"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-secondary/20 blur-3xl"
                        />

                        <div className="relative mb-8 sm:mb-10">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                <Globe2 className="h-3.5 w-3.5" />
                                Invaritech-Led Delivery Network
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                                Global Office Addresses
                            </h3>
                            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Invaritech remains the primary commercial and
                                delivery lead. These offices represent partner
                                companies in our operating network across APAC
                                and North America.
                            </p>
                        </div>

                        <div className="relative grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {OFFICE_LOCATIONS.map((office) => (
                                <article
                                    key={office.region}
                                    className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/75 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(46,143,123,0.18),transparent_45%)]"
                                    />
                                    <div className="relative">
                                        <div className="mb-4 flex items-center gap-2">
                                            <div className="rounded-lg bg-primary/10 p-2">
                                                <Building2 className="h-4 w-4 text-primary" />
                                            </div>
                                            <h4 className="text-lg font-semibold">
                                                {office.region}
                                            </h4>
                                        </div>

                                        <div className="mb-4 flex items-start gap-2.5">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
                                            <address className="not-italic text-sm leading-relaxed text-foreground/85">
                                                {office.address.map((line) => (
                                                    <div key={line}>{line}</div>
                                                ))}
                                            </address>
                                        </div>

                                        {(office.phone || office.email) && (
                                            <div className="space-y-2 border-t border-border/60 pt-3 text-sm">
                                                {office.phone && (
                                                    <a
                                                        href={`tel:${office.phoneHref ?? office.phone}`}
                                                        className="flex items-center gap-2 text-primary hover:underline"
                                                    >
                                                        <PhoneCall className="h-3.5 w-3.5" />
                                                        {office.phone}
                                                    </a>
                                                )}
                                                {office.email && (
                                                    <a
                                                        href={`mailto:${office.email}`}
                                                        className="flex items-center gap-2 text-primary hover:underline break-all"
                                                    >
                                                        <Mail className="h-3.5 w-3.5" />
                                                        {office.email}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
