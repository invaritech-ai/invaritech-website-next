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
};

const TABS = ["invoice", "po", "gr"] as const;
type Tab = (typeof TABS)[number];

export function ThreeWayMatcherInput(props: Props) {
    const [mobileTab, setMobileTab] = useState<Tab>("invoice");

    return (
        <div className="border border-border bg-card p-4 md:p-6">
            {/* Mobile tabs */}
            <div className="mb-4 flex gap-2 md:hidden" role="tablist">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={mobileTab === tab}
                        onClick={() => setMobileTab(tab)}
                        className={`flex-1 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
                            mobileTab === tab
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-foreground-muted"
                        }`}
                    >
                        {tab === "invoice" ? "Invoices" : tab === "po" ? "POs" : "GR"}
                    </button>
                ))}
            </div>

            {/* Three textareas — grid on desktop, single-shown on mobile */}
            <div className="grid gap-4 md:grid-cols-3">
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
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                    Amount tolerance
                    <select
                        value={props.tolerancePercent}
                        onChange={(e) => props.onToleranceChange(Number(e.target.value))}
                        className="border border-border bg-background px-2 py-1 text-sm text-foreground"
                    >
                        <option value={0}>Exact (0%)</option>
                        <option value={1}>1%</option>
                        <option value={2}>2% (default)</option>
                        <option value={5}>5%</option>
                        <option value={10}>10%</option>
                    </select>
                </label>

                <div className="ml-auto flex gap-3">
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
                        className="site-button px-7"
                    >
                        Match now
                        <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                    </button>
                </div>
            </div>
        </div>
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
        <div className={`flex flex-col ${props.hidden ? "hidden md:flex" : ""}`}>
            <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {props.label}
                </span>
            </div>
            <textarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                spellCheck={false}
                className="h-64 w-full resize-y border border-border bg-background p-3 font-mono text-[12px] leading-relaxed text-foreground"
                aria-label={props.label}
            />
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-subtle">
                {props.hint}
            </p>
        </div>
    );
}
