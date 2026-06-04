import { NextResponse } from "next/server";
import { appendLeadRow, type LeadRow } from "@/lib/sheets";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

type CsvField =
    | "invoiceCsv"
    | "poCsv"
    | "grCsv";

function getUploadedFile(formData: FormData, key: CsvField): File | null {
    const entry = formData.get(key);
    if (!(entry instanceof File) || entry.size === 0) return null;
    return entry;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function describeFile(label: string, file: File | null): string {
    if (!file) return `${label}: not attached`;
    return `${label}: ${file.name} (${formatBytes(file.size)}, ${file.type || "type unknown"})`;
}

function extractAttribution(formData: FormData): LeadRow["attribution"] {
    const s = (key: string) => String(formData.get(key) ?? "");

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

export async function POST(request: Request) {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();
    const source = String(formData.get("source") || "glossary/three-way-match");

    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const invoiceCsv = getUploadedFile(formData, "invoiceCsv");
    const poCsv = getUploadedFile(formData, "poCsv");
    const grCsv = getUploadedFile(formData, "grCsv");

    const files = [
        { label: "Invoice CSV", file: invoiceCsv },
        { label: "PO CSV", file: poCsv },
        { label: "GR CSV", file: grCsv },
    ];

    for (const { file } of files) {
        if (file && file.size > MAX_FILE_SIZE_BYTES) {
            return NextResponse.json(
                { ok: false, error: "Uploaded files must be <= 10 MB each." },
                { status: 413 },
            );
        }
    }

    const payload = {
        email,
        hasInvoiceCsv: Boolean(invoiceCsv),
        hasPoCsv: Boolean(poCsv),
        hasGrCsv: Boolean(grCsv),
        invoiceBytes: invoiceCsv?.size ?? 0,
        poBytes: poCsv?.size ?? 0,
        grBytes: grCsv?.size ?? 0,
        timestamp: new Date().toISOString(),
        source,
    };

    const message = [
        "Glossary secondary CTA submission.",
        ...files.map(({ label, file }) => describeFile(label, file)),
    ].join("\n");

    try {
        await appendLeadRow({
            form_type: "resource",
            source,
            name: "",
            email,
            company: "",
            phone: "",
            country: "",
            role: "analysis-request",
            industry: "finance-automation",
            main_control_problem: "Three-way match analysis request",
            message,
            attribution: extractAttribution(formData),
            turnstile_status: "not_applicable",
            turnstile_hostname: "",
        });
    } catch (err) {
        console.error("[glossary-secondary-cta] sheet append failed:", payload, err);
        return NextResponse.json(
            {
                ok: false,
                error: "Submission could not be saved. Please email hello@invaritech.ai for support.",
            },
            { status: 503 },
        );
    }

    return NextResponse.json({ ok: true });
}
