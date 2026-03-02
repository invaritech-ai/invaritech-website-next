import { NextRequest, NextResponse } from "next/server";

const ARTIFACT_TYPES = ["raw_json", "items_csv", "summary_csv"] as const;
type ArtifactType = (typeof ARTIFACT_TYPES)[number];

const CSV_FILENAMES: Record<string, string> = {
    items_csv: "invoice_items.csv",
    summary_csv: "invoice_summary.csv",
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ jobId: string }> }
) {
    const { jobId } = await params;
    const type = (request.nextUrl.searchParams.get("type") ?? "raw_json") as ArtifactType;

    if (!ARTIFACT_TYPES.includes(type)) {
        return NextResponse.json({ error: "Invalid artifact type" }, { status: 400 });
    }

    const backendUrl = process.env.INVOICE_BACKEND_BASE_URL;
    const apiKey = process.env.INVOICE_BACKEND_API_KEY;

    if (!backendUrl || !apiKey) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    try {
        const response = await fetch(
            `${backendUrl}/api/v1/jobs/${jobId}/artifacts/${type}`,
            { headers: { "X-API-Key": apiKey } }
        );

        if (!response.ok) {
            const text = await response.text();
            let data: unknown;
            try {
                data = JSON.parse(text);
            } catch {
                data = { error: "Artifact fetch failed" };
            }
            return NextResponse.json(data, { status: response.status });
        }

        if (type === "raw_json") {
            const data = await response.json();
            return NextResponse.json(data);
        }

        // CSV — return with download headers
        const text = await response.text();
        const filename = CSV_FILENAMES[type];
        return new NextResponse(text, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (err) {
        console.error("Invoice result error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
