import { NextRequest, NextResponse } from "next/server";

const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
    const backendUrl = process.env.INVOICE_BACKEND_BASE_URL;
    const apiKey = process.env.INVOICE_BACKEND_API_KEY;

    if (!backendUrl || !apiKey) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Unsupported file type. Accepted: PDF, JPG, PNG." },
                { status: 415 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10 MB." },
                { status: 413 }
            );
        }

        // Buffer the file fully before forwarding — undici (Node.js fetch) can
        // fail to close a multipart stream correctly when forwarding a File object
        // from request.formData() directly, causing UND_ERR_SOCKET on the backend.
        const fileBuffer = await file.arrayBuffer();
        const blob = new Blob([fileBuffer], { type: file.type });
        const backendForm = new FormData();
        backendForm.append("file", blob, file.name);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60_000);

        let response: Response;
        try {
            response = await fetch(`${backendUrl}/api/v1/jobs`, {
                method: "POST",
                headers: { "X-API-Key": apiKey },
                body: backendForm,
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
            console.error("Invoice upload: backend non-JSON response", response.status, text.slice(0, 200));
            return NextResponse.json({ error: "Upstream error" }, { status: 502 });
        }

        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
            return NextResponse.json({ error: "Backend timed out. Please try again." }, { status: 504 });
        }
        console.error("Invoice upload error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
