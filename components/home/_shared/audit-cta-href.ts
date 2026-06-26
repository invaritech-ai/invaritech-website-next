/**
 * Build a diagnostic CTA href from a base path and optional params.
 * Pure function — extracted from audit-cta.tsx so it can be tested without
 * requiring a .tsx loader in node:test.
 */
export function appendAuditCtaParams(
    href: string,
    params: Record<string, string | undefined>
): string {
    // URL constructor needs a base for relative paths; use a placeholder.
    const url = new URL(href, "https://placeholder.local");
    for (const [key, value] of Object.entries(params)) {
        if (value && value.length > 0) url.searchParams.set(key, value);
    }
    return url.pathname + (url.search || "");
}
