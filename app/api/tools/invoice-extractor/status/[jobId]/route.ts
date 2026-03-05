import { NextRequest, NextResponse } from "next/server";

// No rate limiting on this route — status polling is exempt from the per-IP upload quota.
// force-dynamic prevents Next.js from accidentally caching status responses.
export const dynamic = "force-dynamic";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ jobId: string }> }
) {
    const { jobId } = await params;
    const backendUrl = process.env.INVOICE_BACKEND_BASE_URL;
    const apiKey = process.env.INVOICE_BACKEND_API_KEY;

    if (!backendUrl || !apiKey) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    try {
        const response = await fetch(`${backendUrl}/api/v1/jobs/${jobId}`, {
            headers: { "X-API-Key": apiKey },
            cache: "no-store",
        });

        const text = await response.text();
        let data: unknown;
        try {
            data = JSON.parse(text);
        } catch {
            console.error(`[invoice-status] non-JSON from backend status=${response.status} job=${jobId} body="${text.slice(0, 200)}"`);
            return NextResponse.json({ error: "Upstream error" }, { status: 502 });
        }

        if (!response.ok) {
            console.error(`[invoice-status] backend error status=${response.status} job=${jobId} body="${text.slice(0, 500)}"`);
        }

        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        console.error(`[invoice-status] fetch error job=${jobId}`, err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
