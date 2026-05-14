"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { submitResourceLead } from "@/app/actions/leads";
import { getAttributionData } from "@/lib/attribution";

const industries = [
    "Freight & logistics",
    "Wholesale & distribution",
    "Manufacturing",
    "Mining & construction",
    "Other finance team",
];

const exceptionTypes = [
    "Supplier payment controls",
    "Payment approval checks",
    "Carrier invoice variance",
    "PO / invoice mismatch",
    "Supplier statement gaps",
    "Duplicate payment risk",
    "Progress claims",
    "Not sure yet",
];

type FormState = "idle" | "submitting" | "success" | "error";

interface Props {
    source?: string;
}

export default function ResourceDownloadForm({ source = "resource" }: Props) {
    const router = useRouter();
    const [state, setState] = useState<FormState>("idle");
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        email: "",
        company: "",
        role: "",
        industry: industries[0],
        exceptionType: exceptionTypes[0],
    });
    const [turnstileToken, setTurnstileToken] = useState<string>("");
    const turnstileRef = useRef<TurnstileInstance>(null);

    // Redirect to interactive tool after success
    useEffect(() => {
        if (state === "success") {
            const timer = setTimeout(() => {
                const encodedIndustry = encodeURIComponent(form.industry);
                router.push(
                    `/resources/supplier-payment-control-rule-table/interactive?industry=${encodedIndustry}`
                );
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [state, form.industry, router]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const rawForm = new FormData(event.currentTarget);
        const submittedForm = {
            email: String(rawForm.get("email") || form.email),
            company: String(rawForm.get("company") || form.company),
            role: String(rawForm.get("job_title") || form.role),
            industry: String(rawForm.get("industry") || form.industry),
            exceptionType: String(rawForm.get("main_control_problem") || form.exceptionType),
        };

        setForm(submittedForm);
        setState("submitting");
        setError(null);

        const fd = new FormData();
        fd.set("email", submittedForm.email);
        fd.set("company", submittedForm.company);
        fd.set("job_title", submittedForm.role);
        fd.set("industry", submittedForm.industry);
        fd.set("main_control_problem", submittedForm.exceptionType);
        fd.set("source", source);
        fd.set("cf_turnstile_token", turnstileToken);

        const attribution = getAttributionData();
        for (const [key, value] of Object.entries(attribution)) {
            fd.set(key, value);
        }

        const result = await submitResourceLead(fd);

        if (!result.success) {
            turnstileRef.current?.reset();
            setTurnstileToken("");
            setState("error");
            setError(result.error ?? "The request could not be sent. Please email hello@invaritech.ai.");
            return;
        }

        setState("success");
    }

    if (state === "success") {
        return (
            <div className="border border-primary/30 bg-primary/[0.05] p-8">
                <CheckCircle2 className="mb-5 size-7 text-primary" />
                <h3 className="font-editorial text-3xl font-semibold">Request received.</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                    Loading your personalized control table...
                </p>
            </div>
        );
    }

    return (
        <form
            id="resource-download-form"
            onSubmit={handleSubmit}
            className="space-y-5 border border-border bg-card p-6"
        >
            <div>
                <h3 className="font-editorial text-3xl font-semibold">Request the workbook.</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    A few operational fields help us send the most relevant version for your supplier payment controls and exception workflow.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Work email" id="resource-email">
                    <Input
                        id="resource-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                        className="h-11 rounded-none bg-background"
                    />
                </Field>
                <Field label="Company" id="resource-company">
                    <Input
                        id="resource-company"
                        name="company"
                        autoComplete="organization"
                        required
                        value={form.company}
                        onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                        className="h-11 rounded-none bg-background"
                    />
                </Field>
                <Field label="Role" id="resource-role">
                    <Input
                        id="resource-role"
                        name="job_title"
                        autoComplete="organization-title"
                        required
                        value={form.role}
                        onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                        className="h-11 rounded-none bg-background"
                    />
                </Field>
                <Field label="Industry" id="resource-industry">
                    <select
                        id="resource-industry"
                        name="industry"
                        value={form.industry}
                        onChange={(event) => setForm((current) => ({ ...current, industry: event.target.value }))}
                        className="h-11 w-full rounded-none border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                    >
                        {industries.map((industry) => (
                            <option key={industry}>{industry}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field label="Main control problem" id="resource-exception">
                <select
                    id="resource-exception"
                    name="main_control_problem"
                    value={form.exceptionType}
                    onChange={(event) => setForm((current) => ({ ...current, exceptionType: event.target.value }))}
                    className="h-11 w-full rounded-none border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                >
                    {exceptionTypes.map((exceptionType) => (
                        <option key={exceptionType}>{exceptionType}</option>
                    ))}
                </select>
            </Field>

            <TurnstileWidget
                ref={turnstileRef}
                onSuccess={setTurnstileToken}
                onError={() => { turnstileRef.current?.reset(); setTurnstileToken(""); }}
                onExpire={() => { turnstileRef.current?.reset(); setTurnstileToken(""); }}
            />

            {state === "error" && (
                <p className="border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={state === "submitting" || !turnstileToken}
                className="h-12 w-full rounded-none bg-primary text-base font-semibold text-primary-foreground hover:bg-foreground hover:text-background"
            >
                {state === "submitting" ? "Sending..." : "Request the Workbook"}
                <ArrowRight className="ml-2 size-4" />
            </Button>
        </form>
    );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                {label}
            </Label>
            {children}
        </div>
    );
}
