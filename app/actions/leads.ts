"use server";

import { headers } from "next/headers";
import { appendLeadRow, type LeadRow } from "@/lib/sheets";
import type { AttributionData } from "@/lib/attribution";

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

function extractAttribution(fd: FormData): AttributionData {
    const s = (key: string) => String(fd.get(key) ?? "");
    return {
        submit_page_url: s("submit_page_url"),
        submit_page_path: s("submit_page_path"),
        submit_page_title: s("submit_page_title"),
        referrer: s("referrer"),
        landing_page_url: s("landing_page_url"),
        landing_page_path: s("landing_page_path"),
        utm_source: s("utm_source"),
        utm_medium: s("utm_medium"),
        utm_campaign: s("utm_campaign"),
        utm_term: s("utm_term"),
        utm_content: s("utm_content"),
        utm_id: s("utm_id"),
        utm_source_platform: s("utm_source_platform"),
        utm_creative_format: s("utm_creative_format"),
        utm_marketing_tactic: s("utm_marketing_tactic"),
        gclid: s("gclid"),
        gbraid: s("gbraid"),
        wbraid: s("wbraid"),
        fbclid: s("fbclid"),
        msclkid: s("msclkid"),
        li_fat_id: s("li_fat_id"),
    };
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
            attribution: extractAttribution(formData),
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

export async function submitResourceLead(formData: FormData): Promise<ActionResult> {
    const email               = String(formData.get("email")               ?? "").trim();
    const company             = String(formData.get("company")             ?? "").trim();
    const role                = String(formData.get("job_title")           ?? "").trim();
    const industry            = String(formData.get("industry")            ?? "").trim();
    const main_control_problem = String(formData.get("main_control_problem") ?? "").trim();
    const source              = String(formData.get("source")              ?? "resource").trim();
    const token               = String(formData.get("cf_turnstile_token") ?? "").trim();

    if (!email)                return { success: false, error: "Email is required" };
    if (!EMAIL_RE.test(email)) return { success: false, error: "Please enter a valid email address" };
    if (!company)              return { success: false, error: "Company is required" };
    if (!role)                 return { success: false, error: "Role is required" };

    return verifyAndAppend(token, formData, {
        form_type: "resource",
        source, email, company, role, industry, main_control_problem,
        name: "", phone: "", country: "", message: "",
    }, "submitResourceLead");
}
