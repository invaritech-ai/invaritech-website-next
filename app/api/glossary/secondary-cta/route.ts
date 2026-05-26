import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Manual handling for first 5-10 submissions. Stores nothing server-side
 * yet; emails the submission to the team for manual processing.
 *
 * NOTE: This is a stub. The Sheets append + email send must be wired before
 * the page goes live. See lib/sheets.ts for the existing leads pattern.
 */
export async function POST(request: Request) {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const invoiceCsv = formData.get("invoiceCsv");
    const poCsv = formData.get("poCsv");
    const grCsv = formData.get("grCsv");

    const payload = {
        email,
        hasInvoiceCsv: invoiceCsv instanceof File && invoiceCsv.size > 0,
        hasPoCsv: poCsv instanceof File && poCsv.size > 0,
        hasGrCsv: grCsv instanceof File && grCsv.size > 0,
        timestamp: new Date().toISOString(),
        source: "glossary/three-way-match",
    };

    // TODO before launch: forward to Sheets via lib/sheets.ts and email via
    // existing contact pipeline. For now, log to server console.
    console.log("[glossary-secondary-cta]", payload);

    return NextResponse.json({ ok: true });
}
