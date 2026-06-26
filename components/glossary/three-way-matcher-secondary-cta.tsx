"use client";

import { useState } from "react";
import { trackSiteEvent } from "@/lib/analytics/site-events";
import { appendAttributionToFormData } from "@/lib/attribution";

export function ThreeWayMatcherSecondaryCTA() {
    const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");
        setError(null);

        const form = e.currentTarget;
        const data = new FormData(form);
        appendAttributionToFormData(data);

        const hasInvoice = (data.get("invoiceCsv") as File | null)?.size ?? 0;
        const hasPo = (data.get("poCsv") as File | null)?.size ?? 0;
        const hasGr = (data.get("grCsv") as File | null)?.size ?? 0;

        try {
            const res = await fetch("/api/glossary/secondary-cta", { method: "POST", body: data });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j.error ?? "Submission failed");
            }
            setStatus("sent");
            trackSiteEvent("glossary_secondary_cta_submit", {
                has_invoice_csv: hasInvoice > 0,
                has_po_csv: hasPo > 0,
                has_gr_csv: hasGr > 0,
            });
            form.reset();
        } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Submission failed");
        }
    }

    if (status === "sent") {
        return (
            <div className="glossary-secondary-cta-sent">
                <p className="glossary-secondary-cta-sent-eyebrow">Received</p>
                <p className="glossary-secondary-cta-sent-body">
                    We&apos;ll send back a one-page exception report within 24 hours.
                </p>
            </div>
        );
    }

    return (
            <form onSubmit={handleSubmit} className="glossary-secondary-cta">
                <input type="hidden" name="source" value="glossary/three-way-match" />
                <div className="glossary-secondary-cta-header">
                <div className="glossary-eyebrow-bar" />
                <p className="glossary-eyebrow-label-sm">Run on your real export</p>
            </div>
            <p className="glossary-secondary-cta-lead">
                Want this running on your real AP export?
            </p>
            <p className="glossary-secondary-cta-supporting">
                Drop your invoice, PO, and goods-receipt CSVs. We will run the full
                server-side matcher with OCR, fuzzy vendor normalization, and agentic
                exception routing, and send back a one-page exception report within 24
                hours. No call required.
            </p>

            <div className="glossary-secondary-cta-email-grid">
                <label className="glossary-secondary-cta-field">
                    <span className="glossary-secondary-cta-field-label">Work email</span>
                    <input
                        type="email"
                        name="email"
                        required
                        className="glossary-secondary-cta-input"
                        placeholder="you@company.com"
                    />
                </label>
            </div>

            <div className="glossary-secondary-cta-file-grid">
                <FileInput name="invoiceCsv" label="Invoice CSV" />
                <FileInput name="poCsv" label="PO CSV" />
                <FileInput name="grCsv" label="GR CSV (optional)" />
            </div>

            <div className="glossary-secondary-cta-actions">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="site-button glossary-primary-cta disabled:opacity-50"
                >
                    {status === "submitting" ? "Sending…" : "Send for analysis"}
                    <span className="glossary-cta-arrow">↗</span>
                </button>
                {error && <p className="glossary-secondary-cta-error">{error}</p>}
            </div>
        </form>
    );
}

function FileInput({ name, label }: { name: string; label: string }) {
    return (
        <label className="glossary-secondary-cta-file-cell">
            <span>{label}</span>
            <input
                type="file"
                name={name}
                accept=".csv,.tsv,text/csv,text/tab-separated-values"
                className="glossary-matcher-upload-input"
            />
        </label>
    );
}
