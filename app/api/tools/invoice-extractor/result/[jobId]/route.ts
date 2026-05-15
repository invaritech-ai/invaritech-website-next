import { NextRequest, NextResponse } from "next/server";
import { getInvoiceBackendConfig, fetchFromInvoiceBackend } from "@/lib/invoice-backend";

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

    const config = getInvoiceBackendConfig();
    if (config instanceof NextResponse) return config;

    const artifactUrl = new URL(`${config.baseUrl}/api/v1/jobs/${jobId}/artifacts/${type}`);
    const email = request.nextUrl.searchParams.get("email");
    if (email) artifactUrl.searchParams.set("email", email);

    try {
        const response = await fetchFromInvoiceBackend(
            artifactUrl.pathname + artifactUrl.search,
            config,
        );

        if (!response.ok) {
            const text = await response.text();
            let data: unknown;
            try { data = JSON.parse(text); } catch { data = { error: "Artifact fetch failed" }; }
            return NextResponse.json(data, { status: response.status });
        }

        if (type === "raw_json") {
            return NextResponse.json(await response.json());
        }

        return new NextResponse(await response.text(), {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${CSV_FILENAMES[type]}"`,
            },
        });
    } catch (err) {
        console.error("Invoice result error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
