"use client";

import { useCallback, useRef, useState } from "react";

import { ThreeWayMatcherInput } from "./three-way-matcher-input";
import { ThreeWayMatcherResults, type FilterKey } from "./three-way-matcher-results";
import { ThreeWayMatcherSecondaryCTA } from "./three-way-matcher-secondary-cta";
import { runMatch } from "./three-way-matcher/match-engine";
import {
    parseInvoiceRows,
    parsePoRows,
    parseGrRows,
} from "./three-way-matcher/csv-parser";
import {
    SAMPLE_INVOICES_CSV,
    SAMPLE_POS_CSV,
    SAMPLE_GRS_CSV,
} from "./three-way-matcher/sample-data";
import type { MatchResult } from "./three-way-matcher/types";
import { trackSiteEvent } from "@/lib/analytics/site-events";

export function ThreeWayMatcher() {
    const [invoiceCsv, setInvoiceCsv] = useState(SAMPLE_INVOICES_CSV);
    const [poCsv, setPoCsv] = useState(SAMPLE_POS_CSV);
    const [grCsv, setGrCsv] = useState(SAMPLE_GRS_CSV);
    const [tolerance, setTolerance] = useState(2);
    const [results, setResults] = useState<MatchResult[]>([]);
    const inputMethodRef = useRef<"sample" | "edited" | "csv-upload">("sample");

    const handleMatch = useCallback(() => {
        const invoices = parseInvoiceRows(invoiceCsv);
        const pos = parsePoRows(poCsv);
        const grs = parseGrRows(grCsv);
        const out = runMatch(invoices, pos, grs, { amountTolerancePercent: tolerance });
        setResults(out);

        trackSiteEvent("glossary_tool_run", {
            tolerance_percent: tolerance,
            input_method: inputMethodRef.current,
            has_gr_data: grs.length > 0,
        });
    }, [invoiceCsv, poCsv, grCsv, tolerance]);

    const handleReset = useCallback(() => {
        setInvoiceCsv(SAMPLE_INVOICES_CSV);
        setPoCsv(SAMPLE_POS_CSV);
        setGrCsv(SAMPLE_GRS_CSV);
        setResults([]);
        inputMethodRef.current = "sample";
    }, []);

    const onInvoiceChange = (v: string) => {
        setInvoiceCsv(v);
        inputMethodRef.current = "edited";
    };
    const onPoChange = (v: string) => {
        setPoCsv(v);
        inputMethodRef.current = "edited";
    };
    const onGrChange = (v: string) => {
        setGrCsv(v);
        inputMethodRef.current = "edited";
    };

    const handleToleranceChange = (v: number) => {
        setTolerance(v);
        trackSiteEvent("glossary_tool_tolerance_change", { new_value: v });
    };

    const handleFilterChange = (filter: FilterKey) => {
        trackSiteEvent("glossary_filter_chip_click", { filter });
    };

    const handleCsvUpload = useCallback(
        async (target: "invoice" | "po" | "gr", file: File) => {
            try {
                const text = await file.text();
                if (target === "invoice") setInvoiceCsv(text);
                else if (target === "po") setPoCsv(text);
                else setGrCsv(text);
                inputMethodRef.current = "csv-upload";
                trackSiteEvent("glossary_tool_csv_upload", {
                    success: true,
                    file_type: file.type || "unknown",
                    target,
                });
            } catch (err) {
                trackSiteEvent("glossary_tool_csv_upload", {
                    success: false,
                    error_type: err instanceof Error ? err.name : "unknown",
                    target,
                });
            }
        },
        []
    );

    return (
        <div className="glossary-matcher">
            <ThreeWayMatcherInput
                invoiceCsv={invoiceCsv}
                poCsv={poCsv}
                grCsv={grCsv}
                tolerancePercent={tolerance}
                onInvoiceChange={onInvoiceChange}
                onPoChange={onPoChange}
                onGrChange={onGrChange}
                onToleranceChange={handleToleranceChange}
                onMatchNow={handleMatch}
                onResetSample={handleReset}
                onCsvUpload={handleCsvUpload}
            />

            <ThreeWayMatcherResults results={results} onFilterChange={handleFilterChange} />

            {results.length > 0 && <ThreeWayMatcherSecondaryCTA />}

            <PrivacyCallout />
        </div>
    );
}

function PrivacyCallout() {
    return (
        <aside className="glossary-privacy-callout">
            <p>
                <strong className="glossary-privacy-callout-strong">This runs entirely in your browser.</strong>{" "}
                Your data never leaves your device. Open DevTools, Network tab to verify.
            </p>
            <p className="glossary-privacy-callout-secondary">
                Server-side automation enables PDF OCR, fuzzy vendor normalization, semantic
                line-item matching, and agentic exception routing. Not available in this client-side
                demo.
            </p>
        </aside>
    );
}
