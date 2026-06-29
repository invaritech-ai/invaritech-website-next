"use server";

import { headers } from "next/headers";
import { appendLeadRow, type LeadRow } from "@/lib/sheets";
import { extractAttributionFromFormData } from "@/lib/attribution";

interface ActionResult {
    success: boolean;
    error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyTurnstile(token: string): Promise<{ success: boolean; hostname: string }> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return { success: false, hostname: "" };

    const reqHeaders = await headers();
    const ip = reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";

    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
    });

    const json = await res.json() as { success: boolean; hostname?: string };
    return { success: json.success === true, hostname: json.hostname ?? "" };
}

type LeadFields = Omit<LeadRow, "attribution" | "turnstile_status" | "turnstile_hostname">;

async function verifyAndAppend(
    token: string,
    formData: FormData,
    fields: LeadFields,
    label: string,
): Promise<ActionResult> {
    try {
        if (!token) return { success: false, error: "Verification required" };

        const turnstile = await verifyTurnstile(token);
        if (!turnstile.success) return { success: false, error: "Verification failed. Please try again." };

        await appendLeadRow({
            ...fields,
            attribution: extractAttributionFromFormData(formData),
            turnstile_status: "verified",
            turnstile_hostname: turnstile.hostname,
        });

        return { success: true };
    } catch (err) {
        console.error(`${label} error:`, err);
        return { success: false, error: "Something went wrong. Please try again." };
    }
}

export async function submitContactLead(formData: FormData): Promise<ActionResult> {
    const name    = String(formData.get("name")    ?? "").trim();
    const email   = String(formData.get("email")   ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const phone   = String(formData.get("phone")   ?? "").trim();
    const country = String(formData.get("country") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const token   = String(formData.get("cf_turnstile_token") ?? "").trim();

    if (!name)                    return { success: false, error: "Name is required" };
    if (!email)                   return { success: false, error: "Email is required" };
    if (!EMAIL_RE.test(email))    return { success: false, error: "Please enter a valid email address" };
    if (!country)                 return { success: false, error: "Country is required" };
    if (!message)                 return { success: false, error: "Message is required" };

    return verifyAndAppend(token, formData, {
        form_type: "contact",
        source: "contact",
        name, email, company, phone, country, message,
        role: "", industry: "", main_control_problem: "",
    }, "submitContactLead");
}
