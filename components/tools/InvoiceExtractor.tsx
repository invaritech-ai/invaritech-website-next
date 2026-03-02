"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Upload, FileText, Download, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { InvoiceData, Job } from "@/lib/invoice-extractor-types";

type Phase = "idle" | "uploading" | "polling" | "completed" | "failed";

const POLLING_INTERVAL_MS = 2000;
const POLLING_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const ALLOWED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

const STEP_LABELS: Record<string, string> = {
    extracting_pdf_text: "READING DOCUMENT",
    parsing_structured_data: "EXTRACTING FIELDS",
    running_vision_fallback: "RUNNING OCR FALLBACK",
    ocr_image: "PROCESSING IMAGE",
};

function formatCurrency(value: number | null, currency: string | null): string {
    if (value === null) return "—";
    if (!currency) return value.toFixed(2);
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
        }).format(value);
    } catch {
        return `${currency} ${value.toFixed(2)}`;
    }
}

export function InvoiceExtractor() {
    const [phase, setPhase] = useState<Phase>("idle");
    const [file, setFile] = useState<File | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const [result, setResult] = useState<InvoiceData | null>(null);
    const [error, setError] = useState<{ code: string; message: string } | null>(null);
    const [pollingLabel, setPollingLabel] = useState("INITIALIZING");
    const [pollingProgress, setPollingProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const reset = () => {
        setPhase("idle");
        setFile(null);
        setJobId(null);
        setResult(null);
        setError(null);
        setPollingLabel("INITIALIZING");
        setPollingProgress(0);
        setClientError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const validateFile = (f: File): string | null => {
        if (!ALLOWED_TYPES.includes(f.type)) {
            return "Unsupported file type. Please upload a PDF, JPG, or PNG.";
        }
        if (f.size > MAX_FILE_SIZE) {
            return "File too large. Maximum size is 10 MB.";
        }
        return null;
    };

    const handleFileSelect = (f: File) => {
        const err = validateFile(f);
        if (err) {
            setClientError(err);
            setFile(null);
            return;
        }
        setClientError(null);
        setFile(f);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFileSelect(dropped);
    };

    const fetchResult = useCallback(async (id: string) => {
        try {
            const res = await fetch(`/api/tools/invoice-extractor/result/${id}?type=raw_json`);
            if (!res.ok) {
                const data = await res.json().catch(() => ({ message: "Failed to fetch result." }));
                setError({ code: "result_fetch_failed", message: data?.message ?? "Failed to fetch result." });
                setPhase("failed");
                return;
            }
            const data: InvoiceData = await res.json();
            setResult(data);
            setPhase("completed");
        } catch {
            setError({ code: "network_error", message: "Network error fetching result." });
            setPhase("failed");
        }
    }, []);

    // Polling effect
    useEffect(() => {
        if (phase !== "polling" || !jobId) return;

        const poll = async () => {
            try {
                const res = await fetch(`/api/tools/invoice-extractor/status/${jobId}`);
                const job: Job = await res.json();

                if (job.status === "completed") {
                    clearInterval(intervalRef.current!);
                    clearTimeout(timeoutRef.current!);
                    fetchResult(jobId);
                } else if (job.status === "failed") {
                    clearInterval(intervalRef.current!);
                    clearTimeout(timeoutRef.current!);
                    setError(job.error ?? { code: "unknown", message: "Processing failed." });
                    setPhase("failed");
                } else if (job.status === "expired") {
                    clearInterval(intervalRef.current!);
                    clearTimeout(timeoutRef.current!);
                    setError({ code: "expired", message: "Job expired before completion. Please try again." });
                    setPhase("failed");
                } else {
                    // queued or processing — update progress + label
                    if (typeof job.progress === "number") {
                        setPollingProgress(job.progress);
                    }
                    if (job.step && STEP_LABELS[job.step]) {
                        setPollingLabel(STEP_LABELS[job.step]);
                    } else if (job.status === "queued") {
                        setPollingLabel("QUEUED — AWAITING PROCESSOR");
                    }
                }
            } catch {
                // network hiccup during polling — don't fail, just keep going
            }
        };

        intervalRef.current = setInterval(poll, POLLING_INTERVAL_MS);
        timeoutRef.current = setTimeout(() => {
            clearInterval(intervalRef.current!);
            setError({ code: "timeout", message: "Processing timed out. Please try again." });
            setPhase("failed");
        }, POLLING_TIMEOUT_MS);

        poll(); // immediate first poll

        return () => {
            clearInterval(intervalRef.current!);
            clearTimeout(timeoutRef.current!);
        };
    }, [phase, jobId, fetchResult]);

    const handleSubmit = async () => {
        if (!file) return;
        setPhase("uploading");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/tools/invoice-extractor/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 429) {
                setError({ code: "rate_limited", message: "Daily limit reached. Resets at midnight UTC." });
                setPhase("failed");
                return;
            }

            if (!res.ok) {
                setError({ code: data?.error ?? "upload_failed", message: data?.error ?? "Upload failed. Please try again." });
                setPhase("failed");
                return;
            }

            setJobId(data.job_id);
            setPhase("polling");
        } catch {
            setError({ code: "network_error", message: "Network error. Please check your connection." });
            setPhase("failed");
        }
    };

    const downloadCSV = async (type: "items_csv" | "summary_csv") => {
        if (!jobId) return;
        const filename = type === "items_csv" ? "invoice_items.csv" : "invoice_summary.csv";

        try {
            const res = await fetch(`/api/tools/invoice-extractor/result/${jobId}?type=${type}`);
            if (!res.ok) return;
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        } catch {
            // silently fail — user can retry
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-2">
            {/* Main card */}
            <div className="border border-white/10 bg-black/40 backdrop-blur-md rounded-none p-8 md:p-10">

                {/* ── IDLE ── */}
                {phase === "idle" && (
                    <div className="space-y-6">
                        {/* Drop zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-none p-12 text-center cursor-pointer transition-colors ${
                                isDragging
                                    ? "border-primary bg-primary/5"
                                    : file
                                    ? "border-primary/50 bg-primary/5"
                                    : "border-white/20 hover:border-primary/40 hover:bg-white/[0.02]"
                            }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={ALLOWED_EXTENSIONS}
                                className="hidden"
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) handleFileSelect(f);
                                }}
                            />

                            {file ? (
                                <div className="space-y-2">
                                    <FileText className="w-8 h-8 text-primary mx-auto" />
                                    <p className="text-white font-mono text-sm">{file.name}</p>
                                    <p className="text-white/40 font-mono text-xs">
                                        {(file.size / 1024).toFixed(0)} KB — click to change
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Upload className="w-8 h-8 text-white/30 mx-auto" />
                                    <p className="text-white/60 font-mono text-sm">
                                        DROP FILE HERE OR CLICK TO BROWSE
                                    </p>
                                    <p className="text-white/30 font-mono text-xs tracking-widest">
                                        ACCEPTED: PDF / JPG / PNG — MAX 10 MB
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Client-side validation error */}
                        {clientError && (
                            <p className="text-destructive font-mono text-xs border-l-2 border-destructive pl-3">
                                {clientError}
                            </p>
                        )}

                        {/* Extract button */}
                        {file && (
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-primary text-black font-bold font-mono text-sm tracking-widest uppercase py-4 hover:bg-white transition-colors"
                            >
                                EXTRACT DATA
                            </button>
                        )}
                    </div>
                )}

                {/* ── UPLOADING ── */}
                {phase === "uploading" && (
                    <div className="py-16 text-center space-y-6">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-primary font-mono text-xs tracking-widest uppercase">
                            TRANSMITTING FILE...
                        </p>
                        <p className="text-white/30 font-mono text-xs">{file?.name}</p>
                    </div>
                )}

                {/* ── POLLING ── */}
                {phase === "polling" && (
                    <div className="py-12 space-y-8">
                        {/* Step label + percentage */}
                        <div className="flex items-center justify-between">
                            <p className="text-primary font-mono text-xs tracking-widest uppercase">
                                {pollingLabel}
                            </p>
                            <p className="text-primary font-mono text-xs tabular-nums">
                                {pollingProgress}%
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-px w-full bg-white/10">
                            <div
                                className="absolute inset-y-0 left-0 bg-primary transition-all duration-700 ease-out"
                                style={{ width: `${pollingProgress}%` }}
                            />
                            {/* Glow at the leading edge */}
                            {pollingProgress > 0 && pollingProgress < 100 && (
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-primary blur-sm transition-all duration-700 ease-out"
                                    style={{ left: `${pollingProgress}%` }}
                                />
                            )}
                        </div>

                        <p className="text-white/20 font-mono text-[10px] tracking-widest">
                            JOB {jobId}
                        </p>
                    </div>
                )}

                {/* ── COMPLETED ── */}
                {phase === "completed" && result && (
                    <div className="space-y-8">
                        {/* Status bar */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                <span className="text-xs font-mono uppercase tracking-widest text-primary">
                                    EXTRACTION COMPLETE
                                </span>
                            </div>
                            <span className="text-xs font-mono text-white/30 uppercase px-2 py-1 border border-white/10">
                                {result.document_kind}
                            </span>
                        </div>

                        {/* Document header */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: "SUPPLIER", value: result.supplier_name },
                                { label: "DOC NUMBER", value: result.document_number },
                                { label: "DATE", value: result.document_date },
                                { label: "CURRENCY", value: result.currency },
                                { label: "PAYMENT", value: result.payment_method },
                            ]
                                .filter((f) => f.value)
                                .map(({ label, value }) => (
                                    <div key={label} className="space-y-1">
                                        <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">{label}</p>
                                        <p className="text-white text-sm font-mono">{value}</p>
                                    </div>
                                ))}
                        </div>

                        {/* Totals */}
                        {(result.subtotal !== null || result.tax !== null || result.total !== null) && (
                            <div className="border border-white/10 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "SUBTOTAL", value: result.subtotal },
                                    { label: "TAX", value: result.tax },
                                    { label: "TIP", value: result.tip },
                                    { label: "TOTAL", value: result.total },
                                ].map(({ label, value }) => (
                                    <div key={label} className="space-y-1">
                                        <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">{label}</p>
                                        <p className={`font-mono text-sm ${label === "TOTAL" ? "text-primary font-bold" : "text-white"}`}>
                                            {formatCurrency(value, result.currency)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Line items table */}
                        {result.line_items.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest">
                                    LINE ITEMS ({result.line_items.length})
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse font-mono text-sm">
                                        <thead>
                                            <tr className="border-b border-primary/30">
                                                <th className="text-left px-3 py-2 text-primary font-mono text-[10px] uppercase tracking-widest">Item</th>
                                                <th className="text-right px-3 py-2 text-primary font-mono text-[10px] uppercase tracking-widest">Qty</th>
                                                <th className="text-right px-3 py-2 text-primary font-mono text-[10px] uppercase tracking-widest">Unit Price</th>
                                                <th className="text-right px-3 py-2 text-primary font-mono text-[10px] uppercase tracking-widest">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.line_items.map((item, i) => (
                                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-3 py-2 text-white/80 text-xs">
                                                        <div>{item.name}</div>
                                                        {item.description && (
                                                            <div className="text-white/30 text-[10px] mt-0.5">{item.description}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-white/60 text-xs text-right whitespace-nowrap">
                                                        {item.qty !== null ? `${item.qty}${item.unit ? ` ${item.unit}` : ""}` : "—"}
                                                    </td>
                                                    <td className="px-3 py-2 text-white/60 text-xs text-right whitespace-nowrap">
                                                        {formatCurrency(item.unit_price, result.currency)}
                                                    </td>
                                                    <td className="px-3 py-2 text-white text-xs text-right whitespace-nowrap">
                                                        {formatCurrency(item.line_total, result.currency)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Download + reset */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                            <button
                                onClick={() => downloadCSV("items_csv")}
                                className="flex items-center justify-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                <Download className="w-3.5 h-3.5" />
                                ITEMS CSV
                            </button>
                            <button
                                onClick={() => downloadCSV("summary_csv")}
                                className="flex items-center justify-center gap-2 border border-white/20 text-white/60 hover:bg-white/5 hover:text-white px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                <Download className="w-3.5 h-3.5" />
                                SUMMARY CSV
                            </button>
                            <button
                                onClick={reset}
                                className="sm:ml-auto flex items-center justify-center gap-2 text-white/30 hover:text-white/60 px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                EXTRACT ANOTHER
                            </button>
                        </div>
                    </div>
                )}

                {/* ── FAILED ── */}
                {phase === "failed" && (
                    <div className="py-12 space-y-6">
                        <div className="flex items-start gap-4 border-l-2 border-destructive pl-4">
                            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                {error?.code && (
                                    <p className="text-destructive font-mono text-[10px] uppercase tracking-widest">
                                        {error.code}
                                    </p>
                                )}
                                <p className="text-white/70 font-mono text-sm">
                                    {error?.message ?? "An unexpected error occurred."}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest hover:text-white transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            TRY AGAIN
                        </button>
                    </div>
                )}
            </div>

            {/* Rate limit note */}
            <p className="text-white/20 font-mono text-[10px] tracking-widest text-center py-2">
                // 5 EXTRACTIONS PER DAY — IP-BASED LIMIT
            </p>
        </div>
    );
}
