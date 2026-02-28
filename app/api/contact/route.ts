import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const body = await request.json();

    const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Internal-Secret": process.env.INTERNAL_SECRET ?? "",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}
