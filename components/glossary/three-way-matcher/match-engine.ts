type WithPo = { poNumber: string; [key: string]: unknown };

/**
 * Normalize a PO number for joins: lowercase, whitespace-stripped.
 */
function normalizePo(raw: string): string {
    return raw.trim().toLowerCase();
}

/**
 * Build a map of normalized PO -> single row, OR array of rows when duplicates exist.
 * Returning an array on duplicates lets callers detect duplicate invoices without a second pass.
 */
function joinByPo<T extends WithPo>(rows: T[]): Map<string, T | T[]> {
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
function isAmountWithinTolerance(
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
function jaccardTokenOverlap(a: string, b: string): number {
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

import type {
    InvoiceRow,
    PoRow,
    GrRow,
    MatchResult,
    MatchOptions,
} from "./types";

const LINE_DESC_THRESHOLD = 0.5;

/**
 * Run a full three-way match. Returns one MatchResult per invoice.
 *
 * Classification priority (first match wins):
 *   1. DUPLICATE_INVOICE  — invoice's PO appears more than once across invoices
 *   2. MISSING_PO         — no PO row matches the invoice's PO number
 *   3. VENDOR_MISMATCH    — PO found but vendor differs
 *   4. AMOUNT_VARIANCE    — PO found but amount outside tolerance
 *   5. MISSING_GR         — PO matched, no GR for this PO
 *   6. QUANTITY_VARIANCE  — GR found but quantityReceived !== invoice.quantity
 *   7. LINE_DESC_MISMATCH — token overlap < 0.5 across invoice/PO/GR
 *   8. MATCHED            — all three align
 */
export function runMatch(
    invoices: InvoiceRow[],
    pos: PoRow[],
    grs: GrRow[],
    options: MatchOptions
): MatchResult[] {
    const poMap = joinByPo(pos);
    const grMap = joinByPo(grs);

    // Count invoice PO occurrences for duplicate detection.
    const invoicePoCounts = new Map<string, number>();
    for (const inv of invoices) {
        const key = normalizePo(inv.poNumber);
        invoicePoCounts.set(key, (invoicePoCounts.get(key) ?? 0) + 1);
    }

    return invoices.map((inv): MatchResult => {
        const key = normalizePo(inv.poNumber);
        const base = { invoiceId: inv.invoiceId, poNumber: inv.poNumber };

        // 1. DUPLICATE_INVOICE
        if ((invoicePoCounts.get(key) ?? 0) > 1) {
            return { ...base, status: "DUPLICATE_INVOICE", reason: `PO ${inv.poNumber} appears on multiple invoices` };
        }

        // 2. MISSING_PO
        const poEntry = poMap.get(key);
        if (!poEntry) {
            return { ...base, status: "MISSING_PO", reason: `No purchase order found for ${inv.poNumber}` };
        }
        const po: PoRow = Array.isArray(poEntry) ? poEntry[0] : poEntry;

        // 3. VENDOR_MISMATCH
        if (po.vendor.trim().toLowerCase() !== inv.vendor.trim().toLowerCase()) {
            return { ...base, matchedPo: po, status: "VENDOR_MISMATCH", reason: `Vendor differs: invoice "${inv.vendor}" vs PO "${po.vendor}"` };
        }

        // 4. AMOUNT_VARIANCE
        if (!isAmountWithinTolerance(inv.amount, po.amount, options.amountTolerancePercent)) {
            return { ...base, matchedPo: po, status: "AMOUNT_VARIANCE", reason: `Amount: invoice $${inv.amount} vs PO $${po.amount}` };
        }

        // 5. MISSING_GR
        const grEntry = grMap.get(key);
        if (!grEntry) {
            return { ...base, matchedPo: po, status: "MISSING_GR", reason: `No goods receipt found for ${inv.poNumber}` };
        }
        const gr: GrRow = Array.isArray(grEntry) ? grEntry[0] : grEntry;

        // 6. QUANTITY_VARIANCE
        if (gr.quantityReceived !== inv.quantity) {
            return { ...base, matchedPo: po, matchedGr: gr, status: "QUANTITY_VARIANCE", reason: `Quantity: invoice ${inv.quantity} vs received ${gr.quantityReceived}` };
        }

        // 7. LINE_DESC_MISMATCH
        const invPoOverlap = jaccardTokenOverlap(inv.lineDescription, po.lineDescription);
        const invGrOverlap = jaccardTokenOverlap(inv.lineDescription, gr.lineDescription);
        if (invPoOverlap < LINE_DESC_THRESHOLD || invGrOverlap < LINE_DESC_THRESHOLD) {
            return { ...base, matchedPo: po, matchedGr: gr, status: "LINE_DESC_MISMATCH", reason: `Line descriptions differ significantly` };
        }

        // 8. MATCHED
        return { ...base, matchedPo: po, matchedGr: gr, status: "MATCHED", reason: "All three documents align" };
    });
}
