"use client";

import { useMemo, useState } from "react";
import type { MatchResult, MatchStatus } from "./three-way-matcher/types";

type Props = {
    results: MatchResult[];
    onFilterChange?: (filter: FilterKey) => void;
};

type FilterKey = "all" | "matched" | "variance" | "missing" | "duplicate";

const STATUS_META: Record<MatchStatus, { label: string; tone: string; bucket: FilterKey }> = {
    MATCHED: { label: "Matched", tone: "matched", bucket: "matched" },
    AMOUNT_VARIANCE: { label: "Amount variance", tone: "variance", bucket: "variance" },
    QUANTITY_VARIANCE: { label: "Quantity variance", tone: "variance", bucket: "variance" },
    LINE_DESC_MISMATCH: { label: "Line description mismatch", tone: "variance", bucket: "variance" },
    MISSING_PO: { label: "Missing PO", tone: "missing", bucket: "missing" },
    MISSING_GR: { label: "Missing GR", tone: "missing", bucket: "missing" },
    VENDOR_MISMATCH: { label: "Vendor mismatch", tone: "missing", bucket: "missing" },
    DUPLICATE_INVOICE: { label: "Duplicate invoice", tone: "duplicate", bucket: "duplicate" },
};

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "matched", label: "Matched" },
    { key: "variance", label: "Variance" },
    { key: "missing", label: "Missing" },
    { key: "duplicate", label: "Duplicate" },
];

const TONE_CLASSES: Record<string, string> = {
    matched: "glossary-matcher-status-matched",
    variance: "glossary-matcher-status-variance",
    missing: "glossary-matcher-status-missing",
    duplicate: "glossary-matcher-status-duplicate",
};

export function ThreeWayMatcherResults({ results, onFilterChange }: Props) {
    const [filter, setFilter] = useState<FilterKey>("all");

    const counts = useMemo(() => {
        const c: Record<FilterKey, number> = { all: results.length, matched: 0, variance: 0, missing: 0, duplicate: 0 };
        for (const r of results) {
            c[STATUS_META[r.status].bucket]++;
        }
        return c;
    }, [results]);

    const filtered = useMemo(() => {
        if (filter === "all") return results;
        return results.filter((r) => STATUS_META[r.status].bucket === filter);
    }, [filter, results]);

    if (results.length === 0) {
        return (
            <div className="glossary-matcher-results-empty">
                <p className="glossary-matcher-results-empty-text">
                    Paste invoice, PO, and goods receipt rows above, then press Match now.
                </p>
            </div>
        );
    }

    return (
        <div className="glossary-matcher-results">
            {/* Count strip */}
            <div className="glossary-matcher-count-strip">
                <div className="glossary-matcher-count-row">
                    <span className="glossary-matcher-count-cell">
                        <strong className="glossary-matcher-count-strong-primary">{counts.matched}</strong> matched
                    </span>
                    <span className="glossary-matcher-count-cell">
                        <strong className="glossary-matcher-count-strong-accent">{counts.variance}</strong> variance
                    </span>
                    <span className="glossary-matcher-count-cell">
                        <strong className="glossary-matcher-count-strong-accent">{counts.missing}</strong> missing
                    </span>
                    <span className="glossary-matcher-count-cell">
                        <strong className="glossary-matcher-count-strong-accent">{counts.duplicate}</strong> duplicate
                    </span>
                    <span className="glossary-matcher-count-total">{counts.all} invoices total</span>
                </div>
            </div>

            {/* Filter chips */}
            <div className="glossary-matcher-filters" role="tablist">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        role="tab"
                        aria-selected={filter === f.key}
                        onClick={() => {
                            setFilter(f.key);
                            onFilterChange?.(f.key);
                        }}
                        className={
                            filter === f.key
                                ? "glossary-matcher-filter-chip glossary-matcher-filter-chip-active"
                                : "glossary-matcher-filter-chip"
                        }
                    >
                        {f.label} ({counts[f.key]})
                    </button>
                ))}
            </div>

            {/* Results table */}
            <p className="glossary-mobile-scroll-hint">Scroll table horizontally →</p>
            <div className="glossary-matcher-table-wrap">
                <table className="glossary-matcher-table">
                    <thead>
                        <tr className="glossary-matcher-table-head-row">
                            <th className="glossary-matcher-table-head">Invoice</th>
                            <th className="glossary-matcher-table-head">PO</th>
                            <th className="glossary-matcher-table-head">GR</th>
                            <th className="glossary-matcher-table-head">Status</th>
                            <th className="glossary-matcher-table-head">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r) => {
                            const meta = STATUS_META[r.status];
                            return (
                                <tr key={r.invoiceId} className="glossary-matcher-table-row">
                                    <td className="glossary-matcher-table-cell-mono">{r.invoiceId}</td>
                                    <td className="glossary-matcher-table-cell-mono">{r.matchedPo?.poNumber ?? r.poNumber}</td>
                                    <td className="glossary-matcher-table-cell-mono">{r.matchedGr ? "Yes" : "No"}</td>
                                    <td className="glossary-matcher-table-cell-status">
                                        <span className={`glossary-matcher-status-badge ${TONE_CLASSES[meta.tone] ?? ""}`}>
                                            {meta.label}
                                        </span>
                                    </td>
                                    <td className="glossary-matcher-table-cell-reason">{r.reason}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export type { FilterKey };
