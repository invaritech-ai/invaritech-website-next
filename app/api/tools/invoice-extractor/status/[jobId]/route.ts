import { NextRequest, NextResponse } from "next/server";

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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    try {
        let response: Response;
        try {
            response = await fetch(`${backendUrl}/api/v1/jobs/${jobId}`, {
                headers: { "X-API-Key": apiKey },
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeout);
        }

        const text = await response.text();
        let data: unknown;
        try {
            data = JSON.parse(text);
        } catch {
            console.error("Invoice status: backend non-JSON response", response.status, text.slice(0, 200));
            return NextResponse.json({ error: "Upstream error" }, { status: 502 });
        }

        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
            return NextResponse.json({ error: "Backend timed out. Please try again." }, { status: 504 });
        }
        console.error("Invoice status error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
