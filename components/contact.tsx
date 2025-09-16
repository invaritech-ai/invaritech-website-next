"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    message: string;
}

interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

export default function ContactSection() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        country: "",
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
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL ||
                "https://your-api-domain.vercel.app";

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
            <section className="py-32">
                <div className="mx-auto max-w-4xl px-4 lg:px-0">
                    <Card className="mx-auto max-w-lg p-8 sm:p-16 text-center">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">
                            Thank You!
                        </h3>
                        <p className="text-sm mb-6">
                            Your information has been submitted successfully.
                            We&apos;ll get back to you soon!
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
                        >
                            Submit Another
                        </Button>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section className="py-32">
            <div className="mx-auto max-w-4xl px-4 lg:px-0">
                <h2 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">
                    Let&apos;s Build Something Great Together
                </h2>

                <div className="border p-6 sm:p-12 text-center">
                    <h3 className="mb-3 text-lg font-semibold">Get in Touch</h3>
                    <Link
                        href="mailto:hello@invaritech.ai"
                        className="text-lg text-blue-600 hover:underline dark:text-blue-400"
                    >
                        hello@invaritech.ai
                    </Link>
                </div>

                <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
                <form
                    onSubmit={handleSubmit}
                    className="border px-4 py-12 lg:px-0 lg:py-24"
                >
                    <Card className="mx-auto max-w-lg p-8 sm:p-16">
                        <h3 className="text-xl font-semibold">Work With Us</h3>
                        <p className="mt-4 text-sm">
                            We&apos;re a global remote team that partners
                            closely with each client. Whether you need to launch
                            an MVP quickly or overhaul an existing system,
                            we&apos;ll make sure the technology fits your goals.
                        </p>

                        <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                            <div>
                                <Label htmlFor="name" className="space-y-2">
                                    Full name *
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="space-y-2">
                                    Email *
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone" className="space-y-2">
                                    Phone
                                </Label>
                                <Input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="country" className="space-y-2">
                                    Country *
                                </Label>
                                <Input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="message" className="space-y-2">
                                    Message *
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={3}
                                    required
                                />
                            </div>

                            {formState.error && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                                    {formState.error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={formState.isSubmitting}
                            >
                                {formState.isSubmitting
                                    ? "Submitting..."
                                    : "Submit"}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </section>
    );
}
