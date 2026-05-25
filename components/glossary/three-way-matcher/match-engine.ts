type WithPo = { poNumber: string; [key: string]: unknown };

/**
 * Normalize a PO number for joins: lowercase, whitespace-stripped.
 */
export function normalizePo(raw: string): string {
    return raw.trim().toLowerCase();
}

/**
 * Build a map of normalized PO -> single row, OR array of rows when duplicates exist.
 * Returning an array on duplicates lets callers detect duplicate invoices without a second pass.
 */
export function joinByPo<T extends WithPo>(rows: T[]): Map<string, T | T[]> {
    const map = new Map<string, T | T[]>();
    for (const row of rows) {
        const key = normalizePo(row.poNumber);
        const existing = map.get(key);
        if (existing === undefined) {
            map.set(key, row);
        } else if (Array.isArray(existing)) {
            existing.push(row);
        } else {
            map.set(key, [existing, row]);
        }
    }
    return map;
}
