"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Upload, FileText, Download, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { InvoiceData, Job } from "@/lib/invoice-extractor-types";
import { cn } from "@/lib/utils";
import {
    compressImageForUpload,
    shouldCompressImage,
} from "./image-upload-compression";
import { validateSinglePagePdf } from "@/lib/invoice-pdf-page-limit";

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
    if (value === null) return "Not found";
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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [pollingLabel, setPollingLabel] = useState("INITIALIZING");
    const [pollingProgress, setPollingProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);
    const [emailValue, setEmailValue] = useState("");
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailSubmitting, setEmailSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const selectionTokenRef = useRef(0);
    const pollRunning = useRef(false);

    const reset = () => {
        setPhase("idle");
        setFile(null);
        setJobId(null);
        setResult(null);
        setError(null);
        setUploadProgress(0);
        setPollingLabel("INITIALIZING");
        setPollingProgress(0);
        setClientError(null);
        setEmailValue("");
        setEmailSubmitted(false);
        setEmailSubmitting(false);
        pollRunning.current = false;
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const validateFile = async (f: File): Promise<string | null> => {
        if (!ALLOWED_TYPES.includes(f.type)) {
            return "Unsupported file type. Please upload a PDF, JPG, or PNG.";
        }
        if (f.size > MAX_FILE_SIZE && !shouldCompressImage(f)) {
            return "File too large. Maximum size is 10 MB.";
        }
        return validateSinglePagePdf(f);
    };

    const handleFileSelect = async (f: File) => {
        const selectionToken = ++selectionTokenRef.current;
        const err = await validateFile(f);
        if (selectionToken !== selectionTokenRef.current) return;
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
        if (dropped) void handleFileSelect(dropped);
    };

    const fetchResult = useCallback(async (id: string) => {
        try {
            const res = await fetch(`/api/tools/invoice-extractor/result/${id}?type=raw_json`);
            if (!res.ok) {
                if (res.status === 429) {
                    setError({ code: "rate_limited", message: "Daily limit reached. Resets at midnight UTC." });
                    setPhase("failed");
                    return;
                }
                let msg = "Failed to fetch result.";
                try {
                    const body = await res.json();
                    msg = body?.detail ?? body?.message ?? body?.error ?? msg;
                } catch { /* ignore parse error */ }
                setError({ code: "result_fetch_failed", message: `${msg} (HTTP ${res.status})` });
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
            // Guard: skip if a previous poll is still in-flight (keeps interval at ≤2s cadence)
            if (pollRunning.current) return;
            pollRunning.current = true;
            try {
                const res = await fetch(`/api/tools/invoice-extractor/status/${jobId}`);
                if (res.status === 429) {
                    // Backend rate-limiting status checks — back off and retry next tick
                    console.warn("[invoice-status] 429 on status poll, backing off");
                    return;
                }
                if (!res.ok) {
                    // Transient error — log and keep polling
                    console.warn(`[invoice-status] poll non-OK status=${res.status}`);
                    return;
                }
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
                        setPollingLabel("QUEUED: AWAITING PROCESSOR");
                    }
                }
            } catch {
                // network hiccup during polling — don't fail, just keep going
            } finally {
                pollRunning.current = false;
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
        setUploadProgress(0);

        const uploadFile = await compressImageForUpload(file);
        if (uploadFile.size > MAX_FILE_SIZE) {
            setError({
                code: "file_too_large",
                message: "File is still larger than 10 MB after compression. Please upload a smaller invoice image.",
            });
            setPhase("failed");
            return;
        }

        if (uploadFile !== file) {
            setFile(uploadFile);
        }

        const formData = new FormData();
        formData.append("file", uploadFile);

        // Pass UTM params from the page URL to the backend for attribution tracking.
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get("utm_source");
        const utmMedium = urlParams.get("utm_medium");
        const utmCampaign = urlParams.get("utm_campaign");
        if (utmSource) formData.append("utm_source", utmSource);
        if (utmMedium) formData.append("utm_medium", utmMedium);
        if (utmCampaign) formData.append("utm_campaign", utmCampaign);

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                setUploadProgress(Math.round((e.loaded / e.total) * 100));
            }
        };

        xhr.onload = () => {
            try {
                const data = JSON.parse(xhr.responseText);
                if (xhr.status === 429) {
                    setError({ code: "rate_limited", message: "Daily limit reached. Resets at midnight UTC." });
                    setPhase("failed");
                } else if (xhr.status >= 400) {
                    setError({ code: data?.error ?? "upload_failed", message: data?.error ?? "Upload failed. Please try again." });
                    setPhase("failed");
                } else {
                    setJobId(data.job_id);
                    setPhase("polling");
                }
            } catch {
                setError({
                    code: "parse_error",
                    message: xhr.responseText?.trim() || "Unexpected response from server.",
                });
                setPhase("failed");
            }
        };

        xhr.onerror = () => {
            setError({ code: "network_error", message: "Network error. Please check your connection." });
            setPhase("failed");
        };

        xhr.ontimeout = () => {
            setError({ code: "timeout", message: "Upload timed out. Please try again." });
            setPhase("failed");
        };

        xhr.timeout = 90_000;
        xhr.open("POST", "/api/tools/invoice-extractor/upload");
        xhr.send(formData);
    };

    const handleEmailCapture = async () => {
        if (!jobId || !emailValue.trim()) return;
        setEmailSubmitting(true);
        try {
            // Hitting the result endpoint with an email param triggers backend email capture + Resend welcome email.
            await fetch(`/api/tools/invoice-extractor/result/${jobId}?type=items_csv&email=${encodeURIComponent(emailValue.trim())}`);
            setEmailSubmitted(true);
        } catch {
            // silently fail — email capture is best-effort
            setEmailSubmitted(true);
        } finally {
            setEmailSubmitting(false);
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
        <div className="tool-surface tool-surface-narrow">
            {/* Main card */}
            <div className="tool-panel-muted">

                {/* ── IDLE ── */}
                {phase === "idle" && (
                    <div className="tool-state-stack">
                        {/* Drop zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "tool-dropzone",
                                isDragging
                                    ? "tool-dropzone-active"
                                    : file
                                      ? "tool-dropzone-selected"
                                      : undefined,
                            )}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={ALLOWED_EXTENSIONS}
                                className="hidden"
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) void handleFileSelect(f);
                                }}
                            />

                            {file ? (
                                <div className="tool-selected-file">
                                    <FileText className="tool-dropzone-icon" />
                                    <p className="tool-value">{file.name}</p>
                                    <p className="tool-small">
                                        {(file.size / 1024).toFixed(0)} KB - click to change
                                    </p>
                                </div>
                            ) : (
                                <div className="tool-empty-file">
                                    <Upload className="tool-dropzone-icon tool-icon-muted" />
                                    <p className="tool-dropzone-copy">
                                        DROP FILE HERE OR CLICK TO BROWSE
                                    </p>
                                    <p className="tool-dropzone-note">
                                        SINGLE-PAGE PDF / JPG / PNG: MAX 10 MB
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Client-side validation error */}
                        {clientError && (
                            <p className="site-error">
                                {clientError}
                            </p>
                        )}

                        <div className="border border-border bg-background p-4">
                            <p className="tool-label">DATA HANDLING</p>
                            <p className="tool-small mt-2">
                                This free OCR tool extracts one invoice page at a time. Multi-page
                                PDFs are rejected in your browser when detectable, before upload.
                                Uploaded invoices are encrypted in transit and at rest, processed
                                to generate the CSV output, and automatically deleted within 48
                                hours. The extractor may use service and model providers needed
                                to process the file. Upload only files you are authorised to
                                process, and redact anything unnecessary before testing. See our{" "}
                                <a href="/privacy/" className="site-link">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>

                        {/* Extract button */}
                        {file && (
                            <button
                                onClick={handleSubmit}
                                className="tool-button-primary"
                            >
                                EXTRACT INVOICE DATA
                            </button>
                        )}
                    </div>
                )}

                {/* ── UPLOADING ── */}
                {phase === "uploading" && (
                    <div className="tool-progress-state">
                        <div className="tool-header-row-between">
                            <p className="tool-kicker">
                                TRANSMITTING FILE...
                            </p>
                            <p className="tool-kicker tabular-nums">
                                {uploadProgress}%
                            </p>
                        </div>

                        <div className="tool-progress">
                            <div
                                className="tool-progress-bar duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div
                                    className="tool-progress-glow duration-300"
                                    style={{ left: `${uploadProgress}%` }}
                                />
                            )}
                        </div>

                        <p className="tool-small truncate">
                            {file?.name}
                        </p>
                    </div>
                )}

                {/* ── POLLING ── */}
                {phase === "polling" && (
                    <div className="tool-progress-state">
                        {/* Step label + percentage */}
                        <div className="tool-header-row-between">
                            <p className="tool-kicker">
                                {pollingLabel}
                            </p>
                            <p className="tool-kicker tabular-nums">
                                {pollingProgress}%
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="tool-progress">
                            <div
                                className="tool-progress-bar duration-700"
                                style={{ width: `${pollingProgress}%` }}
                            />
                            {/* Glow at the leading edge */}
                            {pollingProgress > 0 && pollingProgress < 100 && (
                                <div
                                    className="tool-progress-glow duration-700"
                                    style={{ left: `${pollingProgress}%` }}
                                />
                            )}
                        </div>

                        <p className="tool-small">
                            JOB {jobId}
                        </p>
                    </div>
                )}

                {/* ── COMPLETED ── */}
                {phase === "completed" && result && (
                    <div className="tool-state-stack-lg">
                        {/* Status bar */}
                        <div className="tool-header-row-between">
                            <div className="tool-inline-icon-row">
                                <CheckCircle2 className="tool-icon-sm tool-icon-primary" />
                                <span className="tool-kicker">
                                    INVOICE DATA READY
                                </span>
                            </div>
                            <span className="control-stamp">
                                {result.document_kind}
                            </span>
                        </div>

                        {/* Document header */}
                        <div className="tool-data-grid">
                            {[
                                { label: "SUPPLIER", value: result.supplier_name },
                                { label: "DOC NUMBER", value: result.document_number },
                                { label: "DATE", value: result.document_date },
                                { label: "CURRENCY", value: result.currency },
                                { label: "PAYMENT", value: result.payment_method },
                            ]
                                .filter((f) => f.value)
                                .map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="tool-label">{label}</p>
                                        <p className="tool-value">{value}</p>
                                    </div>
                                ))}
                        </div>

                        {/* Totals */}
                        {(result.subtotal !== null || result.tax !== null || result.total !== null) && (
                            <div className="tool-totals-grid">
                                {[
                                    { label: "SUBTOTAL", value: result.subtotal },
                                    { label: "TAX", value: result.tax },
                                    { label: "TIP", value: result.tip },
                                    { label: "TOTAL", value: result.total },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="tool-label">{label}</p>
                                        <p className={cn("tool-value", label === "TOTAL" ? "tool-value-total" : undefined)}>
                                            {formatCurrency(value, result.currency)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Line items table */}
                        {result.line_items.length > 0 && (
                            <div className="tool-state-stack">
                                <p className="tool-label">
                                    LINE ITEMS ({result.line_items.length})
                                </p>
                                <div className="tool-table-wrap">
                                    <table className="tool-table">
                                        <thead>
                                            <tr className="tool-table-head">
                                                <th>Item</th>
                                                <th>Qty</th>
                                                <th>Unit Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.line_items.map((item, i) => (
                                                <tr key={i} className="tool-table-row">
                                                    <td>
                                                        <div>{item.name}</div>
                                                        {item.description && (
                                                            <div className="tool-small tool-small-offset">{item.description}</div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {item.qty !== null ? `${item.qty}${item.unit ? ` ${item.unit}` : ""}` : "Not found"}
                                                    </td>
                                                    <td>
                                                        {formatCurrency(item.unit_price, result.currency)}
                                                    </td>
                                                    <td>
                                                        {formatCurrency(item.line_total, result.currency)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="tool-result-highlight">
                            <div className="tool-state-stack">
                                <div>
                                    <p className="tool-label tool-label-primary">
                                        TAKE THE RESULT WITH YOU
                                    </p>
                                    <p className="tool-copy mt-3">
                                        Download the CSV now, or email yourself the extracted
                                        result and CSV access.
                                    </p>
                                </div>

                                <div className="tool-action-row border-t-0 pt-0">
                                    <button
                                        onClick={() => downloadCSV("items_csv")}
                                        className="tool-button-ghost"
                                    >
                                        <Download className="tool-icon-xs" />
                                        ITEMS CSV
                                    </button>
                                    <button
                                        onClick={() => downloadCSV("summary_csv")}
                                        className="tool-button-ghost"
                                    >
                                        <Download className="tool-icon-xs" />
                                        SUMMARY CSV
                                    </button>
                                </div>

                                <div className="tool-divider">
                                    {emailSubmitted ? (
                                        <div className="tool-state-stack">
                                            <p className="tool-status-success">
                                                SENT: CHECK YOUR INBOX FOR THE RESULT
                                            </p>
                                            <p className="tool-small">
                                                You can still download the CSV directly here if you
                                                want to keep working now.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="tool-state-stack">
                                            <div>
                                                <p className="tool-label">
                                                    EMAIL ME THIS RESULT
                                                </p>
                                                <p className="tool-small tool-small-spaced-lg">
                                                    We will send the extracted result and CSV access.
                                                    No signup wall.
                                                </p>
                                            </div>
                                            <div className="tool-inline-form">
                                                <input
                                                    type="email"
                                                    value={emailValue}
                                                    onChange={(e) => setEmailValue(e.target.value)}
                                                    onKeyDown={(e) =>
                                                        e.key === "Enter" && handleEmailCapture()
                                                    }
                                                    placeholder="you@company.com"
                                                    className="site-input"
                                                />
                                                <button
                                                    onClick={handleEmailCapture}
                                                    disabled={
                                                        emailSubmitting || !emailValue.trim()
                                                    }
                                                    className="tool-button-ghost"
                                                >
                                                    {emailSubmitting ? "..." : "SEND TO INBOX"}
                                                </button>
                                            </div>
                                            <p className="tool-small">
                                                By submitting you agree to our{" "}
                                                <a href="/privacy/" className="site-link">
                                                    Privacy Policy
                                                </a>
                                                . No spam.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="tool-action-row">
                            <button
                                onClick={reset}
                                className="tool-button-subtle tool-action-spacer"
                            >
                                <RotateCcw className="tool-icon-xs" />
                                CHECK ANOTHER INVOICE
                            </button>
                        </div>
                    </div>
                )}

                {/* ── FAILED ── */}
                {phase === "failed" && (
                    <div className="tool-progress-state">
                        <div className="tool-status-error">
                            <AlertCircle className="tool-icon-sm tool-icon-error" />
                            <div>
                                {error?.code && (
                                    <p className="tool-label tool-label-error">
                                        {error.code}
                                    </p>
                                )}
                                <p className="tool-copy">
                                    {error?.message ?? "An unexpected error occurred."}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={reset}
                            className="tool-button-subtle"
                        >
                            <RotateCcw className="tool-icon-xs" />
                            TRY AGAIN
                        </button>
                    </div>
                )}
            </div>

            {/* Rate limit note */}
            <p className="tool-small tool-small-center">
                5 INVOICE EXTRACTIONS PER DAY: IP-BASED LIMIT
            </p>
        </div>
    );
}
