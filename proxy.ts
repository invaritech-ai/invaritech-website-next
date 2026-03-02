import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "invaritech",
});

export async function proxy(request: NextRequest) {
    // Invoice extractor routes are rate-limited by the backend itself (5/day per IP).
    // Skip the Upstash check so status polls don't incur Redis latency on every call.
    if (request.nextUrl.pathname.startsWith("/api/tools/invoice-extractor")) {
        return NextResponse.next();
    }

    try {
        const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
    } catch (err) {
        // Fail open — if Upstash is unavailable, allow the request through
        console.error("Rate limit check failed:", err);
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
