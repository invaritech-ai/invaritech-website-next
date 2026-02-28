import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    try {
        const body = await request.json();

        const response = await fetch(`${apiUrl}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "",
            },
            body: JSON.stringify(body),
        });

        const text = await response.text();
        let data: unknown;
        try {
            data = JSON.parse(text);
        } catch {
            console.error("api-server /api/contact non-JSON response:", response.status, text.slice(0, 200));
            return NextResponse.json({ error: "Upstream error" }, { status: 502 });
        }

        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        console.error("Proxy /api/contact error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
