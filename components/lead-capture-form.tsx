"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

export default function LeadCaptureForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
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
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormState({ isSubmitting: true, isSuccess: false, error: null });

        try {
            const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

            if (!googleScriptUrl) {
                throw new Error("Google Script URL not configured");
            }

            // Execute reCAPTCHA
            let recaptchaToken = null;
            if (recaptchaSiteKey) {
                recaptchaToken = await executeRecaptcha();
                if (!recaptchaToken) {
                    throw new Error("reCAPTCHA verification failed");
                }
            }

            const response = await fetch(googleScriptUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    source: "Website",
                    recaptchaToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit form");
            }

            setFormState({ isSubmitting: false, isSuccess: true, error: null });
            setFormData({
                name: "",
                email: "",
                phone: "",
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
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-green-600">Thank You!</CardTitle>
                    <CardDescription>
                        Your information has been submitted successfully. We'll
                        get back to you soon!
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
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
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
                <CardDescription>
                    Ready to transform your business? Let's start the
                    conversation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-1"
                        >
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-1"
                        >
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium mb-1"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="company"
                            className="block text-sm font-medium mb-1"
                        >
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your company name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium mb-1"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Tell us about your project or requirements"
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
                        className="w-full"
                    >
                        {formState.isSubmitting
                            ? "Submitting..."
                            : "Send Message"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
