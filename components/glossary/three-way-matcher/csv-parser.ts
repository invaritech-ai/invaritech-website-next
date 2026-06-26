import type { InvoiceRow, PoRow, GrRow } from "./types";

/**
 * Detect whether input is tab-separated or comma-separated by counting tabs in the first line.
 */
function detectDelimiter(input: string): string {
    const firstLine = input.split(/\r?\n/, 1)[0] ?? "";
    return firstLine.includes("\t") ? "\t" : ",";
}

/**
 * Parse a CSV/TSV row, respecting double-quoted cells that may contain commas.
 */
function parseRow(line: string, delimiter: string): string[] {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"' && line[i + 1] === '"') {
                current += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                current += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === delimiter) {
                cells.push(current.trim());
                current = "";
            } else {
                current += ch;
            }
        }
    }
    cells.push(current.trim());
    return cells;
}

/**
 * Strip currency symbols, thousands separators, whitespace from a numeric string.
 */
function parseNumber(raw: string): number {
    const cleaned = raw.replace(/[^0-9.\-]/g, "");
    if (cleaned === "" || cleaned === "-" || cleaned === ".") return 0;
    return Number.parseFloat(cleaned);
}

type RawRow = Record<string, string>;

/**
 * Parse CSV/TSV into a list of header-keyed records. Header row required (first non-empty line).
 * Header keys are normalized to lowercase with single-space separators.
 */
function parseTable(input: string): RawRow[] {
    const trimmed = input.trim();
    if (!trimmed) return [];
    const delimiter = detectDelimiter(trimmed);
    const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return [];

    const header = parseRow(lines[0], delimiter).map((h) =>
        h.toLowerCase().replace(/\s+/g, " ").trim()
    );

    const rows: RawRow[] = [];
    for (let i = 1; i < lines.length; i++) {
        const cells = parseRow(lines[i], delimiter);
        const obj: RawRow = {};
        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = cells[j] ?? "";
        }
        rows.push(obj);
    }
    return rows;
}

function pick(row: RawRow, keys: string[]): string {
    for (const k of keys) {
        if (row[k] !== undefined && row[k] !== "") return row[k];
    }
    return "";
}

export function parseInvoiceRows(input: string): InvoiceRow[] {
    return parseTable(input).map((row, idx): InvoiceRow => ({
        invoiceId: pick(row, ["invoice", "invoice id", "invoice number", "invoice #"]) || `INV-${idx + 1}`,
        poNumber: pick(row, ["po number", "po", "po #", "purchase order"]),
        vendor: pick(row, ["vendor", "supplier"]),
        amount: parseNumber(pick(row, ["amount", "total", "value"])),
        quantity: parseNumber(pick(row, ["quantity", "qty"])),
        lineDescription: pick(row, ["line description", "description", "item", "line"]),
    }));
}

export function parsePoRows(input: string): PoRow[] {
    return parseTable(input).map((row): PoRow => ({
        poNumber: pick(row, ["po number", "po", "po #", "purchase order"]),
        vendor: pick(row, ["vendor", "supplier"]),
        amount: parseNumber(pick(row, ["amount", "total", "value"])),
        quantity: parseNumber(pick(row, ["quantity", "qty"])),
        lineDescription: pick(row, ["line description", "description", "item", "line"]),
    }));
}

export function parseGrRows(input: string): GrRow[] {
    return parseTable(input).map((row): GrRow => ({
        poNumber: pick(row, ["po number", "po", "po #", "purchase order"]),
        vendor: pick(row, ["vendor", "supplier"]),
        quantityReceived: parseNumber(pick(row, ["quantity received", "qty received", "received", "qty"])),
        lineDescription: pick(row, ["line description", "description", "item", "line"]),
    }));
}
