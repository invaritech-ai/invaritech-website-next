import { NextResponse } from "next/server";

interface BackendConfig {
    baseUrl: string;
    apiKey: string;
}

export function getInvoiceBackendConfig(): BackendConfig | NextResponse {
    const baseUrl = process.env.INVOICE_BACKEND_BASE_URL;
    const apiKey = process.env.INVOICE_BACKEND_API_KEY;
    if (!baseUrl || !apiKey) {
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    return { baseUrl, apiKey };
}

export async function fetchFromInvoiceBackend(
    path: string,
    config: BackendConfig,
    options?: RequestInit,
): Promise<Response> {
    return fetch(`${config.baseUrl}${path}`, {
        ...options,
        headers: { "X-API-Key": config.apiKey, ...options?.headers },
    });
}
