"use client";

import { useState } from "react";

import { trackSiteEvent } from "@/lib/analytics/site-events";
import {
    evaluateDifotPenalty,
    type DifotEvidenceState,
    type DifotPenaltyResult,
    type DifotRetailer,
} from "@/lib/claims/difot-penalty-checker";
import { ClaimsCTA } from "@/components/claims/claims-cta";
import { VerdictStamp } from "@/components/claims/verdict-stamp";

type SupplierMode = "unknown" | "pass" | "fail";

const retailers: DifotRetailer[] = ["Coles", "Woolworths", "Metcash", "ALDI", "Costco", "Other"];

const evidenceFields: Array<{
    key: keyof DifotEvidenceState;
    label: string;
    hint: string;
}> = [
    { key: "hasPo", label: "Purchase order", hint: "The order reference and the agreed quantity." },
    { key: "hasAsn", label: "ASN", hint: "What you declared in advance against that order." },
    { key: "hasBookedWindow", label: "Booked window", hint: "The slot or receiving window you were held against." },
    { key: "hasPod", label: "POD", hint: "Signed or system-confirmed proof the delivery happened." },
    { key: "hasDockTimestamp", label: "Dock timestamp", hint: "The arrival or unload time used in the scorecard." },
    {
        key: "hasRetailerScorecardLine",
        label: "Retailer scorecard line",
        hint: "The actual DIFOT line, calculation basis, and deduction amount.",
    },
];

const defaultEvidence: DifotEvidenceState = {
    hasPo: false,
    hasAsn: false,
    hasBookedWindow: false,
    hasPod: false,
    hasDockTimestamp: false,
    hasRetailerScorecardLine: false,
};

function getSupplierRecord(mode: SupplierMode) {
    if (mode === "pass") {
        return { deliveredInFull: true, arrivedInsideWindow: true };
    }
    if (mode === "fail") {
        return { deliveredInFull: false, arrivedInsideWindow: false };
    }
    return undefined;
}

export function DifotPenaltyChecker() {
    const [retailer, setRetailer] = useState<DifotRetailer>("Coles");
    const [claimReason, setClaimReason] = useState("DIFOT penalty");
    const [evidence, setEvidence] = useState<DifotEvidenceState>(defaultEvidence);
    const [supplierMode, setSupplierMode] = useState<SupplierMode>("unknown");
    const [result, setResult] = useState<DifotPenaltyResult | null>(null);

    const evidenceComplete = Object.values(evidence).every(Boolean);

    return (
        <section className="border border-border bg-card">
            <div className="grid gap-[1px] bg-border lg:grid-cols-[1.05fr_0.95fr]">
                <form
                    className="space-y-6 bg-background p-6 md:p-8"
                    onSubmit={(event) => {
                        event.preventDefault();
                        const nextResult = evaluateDifotPenalty({
                            retailer,
                            claimReason,
                            evidence,
                            supplierRecord: getSupplierRecord(supplierMode),
                        });
                        setResult(nextResult);
                        trackSiteEvent("claims_difot_checker_run", {
                            verdict: nextResult.verdict,
                            retailer,
                            evidenceComplete,
                        });
                    }}
                >
                    <div className="space-y-2">
                        <p className="site-meta text-primary">Evidence checker</p>
                        <h2 className="site-h3">Check the proof before you accept the deduction.</h2>
                        <p className="site-body">
                            This is supplier-side triage. It does not calculate the retailer scorecard for
                            you. It tells you whether the evidence stack is complete enough to accept, query,
                            or challenge the line.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="site-field">
                            <span className="site-label">Retailer</span>
                            <select
                                className="site-select"
                                value={retailer}
                                onChange={(event) => setRetailer(event.target.value as DifotRetailer)}
                            >
                                {retailers.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="site-field">
                            <span className="site-label">Claim note</span>
                            <input
                                className="site-input"
                                value={claimReason}
                                onChange={(event) => setClaimReason(event.target.value)}
                                placeholder="DIFOT penalty week 32"
                            />
                        </label>
                    </div>

                    <fieldset className="space-y-4">
                        <legend className="site-label">Evidence in hand</legend>
                        <div className="grid gap-[1px] bg-border">
                            {evidenceFields.map((field) => (
                                <label
                                    key={field.key}
                                    className="flex gap-4 bg-card p-4 transition-colors hover:bg-background"
                                >
                                    <input
                                        type="checkbox"
                                        className="mt-1 size-4 accent-[var(--primary)]"
                                        checked={evidence[field.key]}
                                        onChange={(event) =>
                                            setEvidence((current) => ({
                                                ...current,
                                                [field.key]: event.target.checked,
                                            }))
                                        }
                                    />
                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-foreground">
                                            {field.label}
                                        </span>
                                        <span className="mt-1 block text-sm leading-relaxed text-foreground-subtle">
                                            {field.hint}
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="space-y-3">
                        <legend className="site-label">Supplier-side result</legend>
                        <div className="grid gap-[1px] bg-border sm:grid-cols-3">
                            {[
                                {
                                    value: "unknown" as const,
                                    label: "Not sure",
                                    hint: "You have evidence, but you have not called it yet.",
                                },
                                {
                                    value: "pass" as const,
                                    label: "Full and on time",
                                    hint: "Your record says the order was complete and inside the window.",
                                },
                                {
                                    value: "fail" as const,
                                    label: "Short or late",
                                    hint: "Your own record shows the delivery missed the measure.",
                                },
                            ].map((option) => (
                                <label key={option.value} className="bg-card p-4">
                                    <input
                                        type="radio"
                                        name="supplierMode"
                                        value={option.value}
                                        checked={supplierMode === option.value}
                                        onChange={() => setSupplierMode(option.value)}
                                        className="sr-only"
                                    />
                                    <span
                                        className={`block border px-4 py-4 transition-colors ${
                                            supplierMode === option.value
                                                ? "border-primary bg-primary/5"
                                                : "border-border bg-background hover:bg-card"
                                        }`}
                                    >
                                        <span className="block text-sm font-semibold text-foreground">
                                            {option.label}
                                        </span>
                                        <span className="mt-2 block text-sm leading-relaxed text-foreground-subtle">
                                            {option.hint}
                                        </span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className="site-button-row">
                        <button type="submit" className="site-button">
                            Run DIFOT check
                        </button>
                        <p className="site-status">
                            Evidence completeness: {evidenceComplete ? "complete" : "incomplete"}
                        </p>
                    </div>
                </form>

                <div className="bg-card p-6 md:p-8">
                    <p className="site-meta text-primary">Result</p>
                    {result ? (
                        <div className="mt-4 space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <VerdictStamp verdict={result.verdict} />
                                <span className="text-sm text-foreground-subtle">
                                    Retailer: {retailer}
                                </span>
                            </div>

                            <div>
                                <h3 className="site-h3">Primary gap</h3>
                                <p className="site-body mt-3">{result.primaryGap}</p>
                            </div>

                            <div>
                                <h3 className="site-h3">Method note</h3>
                                <p className="site-body mt-3">{result.methodNote}</p>
                            </div>

                            <div>
                                <h3 className="site-h3">Neutral query to send back</h3>
                                <p className="site-body mt-3">{result.neutralQuery}</p>
                            </div>

                            <div>
                                <h3 className="site-h3">Evidence to request</h3>
                                {result.evidenceToRequest.length > 0 ? (
                                    <ul className="mt-3 space-y-2">
                                        {result.evidenceToRequest.map((item) => (
                                            <li key={item} className="border-b border-border pb-2 text-sm text-foreground-subtle">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="site-body mt-3">
                                        No extra request list. Keep the existing proof pack with the line.
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-border pt-6">
                                <p className="site-label">Need a second pass?</p>
                                <p className="site-body mt-3">
                                    Claims Desk reviews one redacted remittance and marks each line as
                                    supportable, missing proof, worth challenging, or Code risk. Evidence
                                    workflow only. Not legal advice.
                                </p>
                                <div className="mt-5">
                                    <ClaimsCTA medium="difot-calculator" content="result-cta" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-4 border border-dashed border-border bg-background p-6">
                            <p className="site-body">
                                Tick the evidence you actually have, choose the supplier-side result if you
                                know it, and run the checker. The output is built to help you decide what
                                to request before the remittance line goes cold.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
