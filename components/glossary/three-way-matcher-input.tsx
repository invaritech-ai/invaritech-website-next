"use client";

import { useState } from "react";

type Props = {
    invoiceCsv: string;
    poCsv: string;
    grCsv: string;
    tolerancePercent: number;
    onInvoiceChange: (v: string) => void;
    onPoChange: (v: string) => void;
    onGrChange: (v: string) => void;
    onToleranceChange: (v: number) => void;
    onMatchNow: () => void;
    onResetSample: () => void;
    onCsvUpload: (target: "invoice" | "po" | "gr", file: File) => void;
};

const TABS = ["invoice", "po", "gr"] as const;
type Tab = (typeof TABS)[number];

export function ThreeWayMatcherInput(props: Props) {
    const [mobileTab, setMobileTab] = useState<Tab>("invoice");

    return (
        <div className="glossary-matcher-panel">
            {/* Mobile tabs */}
            <div className="glossary-matcher-tabs" role="tablist">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={mobileTab === tab}
                        onClick={() => setMobileTab(tab)}
                        className={
                            mobileTab === tab
                                ? "glossary-matcher-tab glossary-matcher-tab-active"
                                : "glossary-matcher-tab"
                        }
                    >
                        {tab === "invoice" ? "Invoices" : tab === "po" ? "POs" : "GR"}
                    </button>
                ))}
            </div>

            {/* Three textareas — grid on desktop, single-shown on mobile */}
            <div className="glossary-matcher-grid">
                <TextareaPanel
                    label="Invoice rows"
                    hint="po number | vendor | amount | quantity | line description"
                    value={props.invoiceCsv}
                    onChange={props.onInvoiceChange}
                    hidden={mobileTab !== "invoice"}
                />
                <TextareaPanel
                    label="PO rows"
                    hint="po number | vendor | amount | quantity | line description"
                    value={props.poCsv}
                    onChange={props.onPoChange}
                    hidden={mobileTab !== "po"}
                />
                <TextareaPanel
                    label="Goods receipt rows"
                    hint="po number | vendor | quantity received | line description"
                    value={props.grCsv}
                    onChange={props.onGrChange}
                    hidden={mobileTab !== "gr"}
                />
            </div>

            {/* Controls row */}
            <div className="glossary-matcher-controls">
                <label className="glossary-matcher-tolerance-label">
                    Amount tolerance
                    <select
                        value={props.tolerancePercent}
                        onChange={(e) => props.onToleranceChange(Number(e.target.value))}
                        className="glossary-matcher-tolerance-select"
                    >
                        <option value={0}>Exact (0%)</option>
                        <option value={1}>1%</option>
                        <option value={2}>2% (default)</option>
                        <option value={5}>5%</option>
                        <option value={10}>10%</option>
                    </select>
                </label>

                <div className="glossary-matcher-actions">
                    <button
                        type="button"
                        onClick={props.onResetSample}
                        className="site-button-secondary px-5"
                    >
                        Reset sample
                    </button>
                    <button
                        type="button"
                        onClick={props.onMatchNow}
                        className="site-button glossary-primary-cta"
                    >
                        Match now
                        <span className="glossary-cta-arrow">↗</span>
                    </button>
                </div>
            </div>

            {/* CSV upload row */}
            <div className="glossary-matcher-upload-row">
                <CsvUploadCell label="Upload invoice CSV" target="invoice" onUpload={props.onCsvUpload} />
                <CsvUploadCell label="Upload PO CSV" target="po" onUpload={props.onCsvUpload} />
                <CsvUploadCell label="Upload GR CSV" target="gr" onUpload={props.onCsvUpload} />
            </div>
        </div>
    );
}

function CsvUploadCell(props: {
    label: string;
    target: "invoice" | "po" | "gr";
    onUpload: (target: "invoice" | "po" | "gr", file: File) => void;
}) {
    return (
        <label className="glossary-matcher-upload-cell">
            <span>{props.label}</span>
            <input
                type="file"
                accept=".csv,.tsv,text/csv,text/tab-separated-values"
                className="glossary-matcher-upload-input"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) props.onUpload(props.target, file);
                    e.target.value = "";
                }}
            />
        </label>
    );
}

function TextareaPanel(props: {
    label: string;
    hint: string;
    value: string;
    onChange: (v: string) => void;
    hidden: boolean;
}) {
    return (
        <div className={props.hidden ? "glossary-matcher-field glossary-matcher-field-hidden" : "glossary-matcher-field"}>
            <div className="glossary-matcher-field-header">
                <span className="glossary-matcher-field-label">{props.label}</span>
            </div>
            <textarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                spellCheck={false}
                className="glossary-matcher-textarea"
                aria-label={props.label}
            />
            <p className="glossary-matcher-hint">{props.hint}</p>
        </div>
    );
}
