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

const FLOOR_TOLERANCE = 50; // $50 minimum tolerance band
const FLOAT_EPSILON = 0.01;

/**
 * Whether |a-b| is within max(percent% of larger, $50).
 * Percent is in the 0..100 range, not 0..1.
 */
export function isAmountWithinTolerance(
    a: number,
    b: number,
    tolerancePercent: number
): boolean {
    const diff = Math.abs(a - b);
    if (diff <= FLOAT_EPSILON) return true;
    if (tolerancePercent === 0) return false;
    const larger = Math.max(Math.abs(a), Math.abs(b));
    const percentBand = (tolerancePercent / 100) * larger;
    const band = Math.max(percentBand, FLOOR_TOLERANCE);
    return diff <= band;
}

/**
 * Tokenize a line-description string. Lowercase, strip punctuation, split on whitespace.
 */
function tokenize(s: string): Set<string> {
    const cleaned = s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
    const tokens = cleaned.split(/\s+/).filter(Boolean);
    return new Set(tokens);
}

/**
 * Jaccard similarity between two token sets: |A ∩ B| / |A ∪ B|.
 */
export function jaccardTokenOverlap(a: string, b: string): number {
    const aSet = tokenize(a);
    const bSet = tokenize(b);
    if (aSet.size === 0 && bSet.size === 0) return 1;
    let intersection = 0;
    for (const t of aSet) {
        if (bSet.has(t)) intersection++;
    }
    const union = aSet.size + bSet.size - intersection;
    return union === 0 ? 0 : intersection / union;
}
