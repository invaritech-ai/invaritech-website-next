import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "invaritech",
});

export async function proxy(request: NextRequest) {
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
