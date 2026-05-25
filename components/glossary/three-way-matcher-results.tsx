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
            <div className="border border-border bg-card/40 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                    Paste invoice, PO, and goods receipt rows above, then press Match now.
                </p>
            </div>
        );
    }

    return (
        <div className="border border-border bg-card">
            {/* Count strip */}
            <div className="border-b border-border bg-card/60 px-4 py-3">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-foreground">
                        <strong className="text-primary">{counts.matched}</strong> matched
                    </span>
                    <span className="text-foreground">
                        <strong className="text-accent">{counts.variance}</strong> variance
                    </span>
                    <span className="text-foreground">
                        <strong className="text-accent">{counts.missing}</strong> missing
                    </span>
                    <span className="text-foreground">
                        <strong className="text-accent">{counts.duplicate}</strong> duplicate
                    </span>
                    <span className="ml-auto text-foreground-subtle">{counts.all} invoices total</span>
                </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 border-b border-border bg-card/40 px-4 py-3" role="tablist">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        role="tab"
                        aria-selected={filter === f.key}
                        onClick={() => {
                            setFilter(f.key);
                            onFilterChange?.(f.key);
                        }}
                        className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
                            filter === f.key
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-foreground-muted hover:border-primary/50"
                        }`}
                    >
                        {f.label} ({counts[f.key]})
                    </button>
                ))}
            </div>

            {/* Results table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-card/40">
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">Invoice</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">PO</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">GR</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">Status</th>
                            <th className="px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r) => {
                            const meta = STATUS_META[r.status];
                            return (
                                <tr key={r.invoiceId} className="border-b border-border/60">
                                    <td className="px-4 py-2 font-mono text-xs text-foreground">{r.invoiceId}</td>
                                    <td className="px-4 py-2 font-mono text-xs text-foreground">{r.matchedPo?.poNumber ?? r.poNumber}</td>
                                    <td className="px-4 py-2 font-mono text-xs text-foreground">{r.matchedGr ? "✓" : "—"}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                                                meta.tone === "matched"
                                                    ? "border-primary/40 bg-primary/10 text-primary"
                                                    : meta.tone === "variance"
                                                    ? "border-accent/40 bg-accent/10 text-accent"
                                                    : meta.tone === "duplicate"
                                                    ? "border-red-500/40 bg-red-500/10 text-red-600"
                                                    : "border-red-500/40 bg-red-500/10 text-red-600"
                                            }`}
                                        >
                                            {meta.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-foreground-muted">{r.reason}</td>
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
