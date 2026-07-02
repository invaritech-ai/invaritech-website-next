"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Currency = "AUD" | "HKD" | "USD";

const CURRENCY_CONFIG: Record<
    Currency,
    { symbol: string; default: number; min: number; max: number; step: number }
> = {
    AUD: { symbol: "A$", default: 75, min: 30, max: 220, step: 5 },
    HKD: { symbol: "HK$", default: 120, min: 50, max: 350, step: 10 },
    USD: { symbol: "$", default: 45, min: 20, max: 200, step: 5 },
};

// Industry benchmark: automation reduces manual close work by ~70%
// Source: DOKKA, Netgain, FloQast published ROI studies
const AUTOMATION_REDUCTION = 0.7;

// During a close period, each team member spends ~6 focused hours/day on close-specific tasks
const HOURS_PER_CLOSE_DAY = 6;

const BENCHMARK_TIERS = [
    { label: "FAST CLOSE", maxDays: 3, pct: "TOP 18%", end: 3 },
    { label: "TOP QUARTILE", maxDays: 5, pct: "TOP 50%", end: 5 },
    { label: "AVERAGE", maxDays: 7, pct: "MEDIAN", end: 7 },
    { label: "BELOW AVG", maxDays: 15, pct: "BTM 27%", end: 15 },
];

function getTier(days: number) {
    return (
        BENCHMARK_TIERS.find((t) => days <= t.end) ??
        BENCHMARK_TIERS[BENCHMARK_TIERS.length - 1]
    );
}

function getTierClass(days: number) {
    if (days <= 3) return "tool-benchmark-tier-best";
    if (days <= 5) return "tool-benchmark-tier-good";
    if (days <= 7) return "tool-benchmark-tier-average";
    return "tool-benchmark-tier-slow";
}

function getValueTierClass(days: number) {
    if (days <= 5) return "tool-value-tier-good";
    if (days <= 7) return "tool-value-tier-average";
    return "tool-value-tier-slow";
}

function fmt(amount: number, symbol: string): string {
    if (amount >= 1_000_000)
        return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 100_000) return `${symbol}${Math.round(amount / 1_000)}K`;
    return `${symbol}${Math.round(amount).toLocaleString()}`;
}

function SliderInput({
    label,
    value,
    min,
    max,
    step,
    onChange,
    displayValue,
    note,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    displayValue: string;
    note?: string;
}) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div className="tool-slider-field">
            <div className="tool-slider-row">
                <span className="tool-label">
                    {label}
                </span>
                <span className="tool-value-lg tool-value-right">
                    {displayValue}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="tool-slider"
                style={{
                    background: `linear-gradient(to right, var(--primary) ${pct}%, rgba(255,255,255,0.2) ${pct}%)`,
                }}
            />
            {note && (
                <p className="tool-small">
                    {note}
                </p>
            )}
        </div>
    );
}

function BenchmarkBar({
    currentDays,
    targetDays,
}: {
    currentDays: number;
    targetDays: number;
}) {
    const MIN_DAYS = 1;
    const MAX_DAYS = 15;
    const scale = MAX_DAYS - MIN_DAYS;

    const getPos = (d: number) =>
        `${Math.min(Math.max(((d - MIN_DAYS) / scale) * 100, 0), 100)}%`;

    const segments = [
        { end: 3, className: "tool-benchmark-best" },
        { end: 5, className: "tool-benchmark-good" },
        { end: 7, className: "tool-benchmark-average" },
        { end: 15, className: "tool-benchmark-slow" },
    ];

    let prevEnd = MIN_DAYS;
    const segmentsWithWidths = segments.map((seg) => {
        const width = ((seg.end - prevEnd) / scale) * 100;
        const result = { ...seg, width, prevEnd };
        prevEnd = seg.end;
        return result;
    });

    const currentTier = getTier(currentDays);

    return (
        <div className="tool-benchmark">
            <div className="tool-benchmark-header">
                <span className="tool-label">
                    Close Cycle Benchmark
                </span>
                <span
                    className={cn("tool-benchmark-tier", getTierClass(currentDays))}
                >
                    {currentTier.label}
                </span>
            </div>

            {/* Bar */}
            <div className="tool-benchmark-bar">
                {segmentsWithWidths.map((seg, i) => (
                    <div
                        key={i}
                        className={cn("tool-benchmark-segment", seg.className)}
                        style={{ width: `${seg.width}%` }}
                    />
                ))}

                {/* Target position (after automation) */}
                <div
                    className="tool-benchmark-marker tool-benchmark-marker-target"
                    style={{ left: getPos(Math.max(targetDays, MIN_DAYS)) }}
                />

                {/* Current position */}
                <div
                    className="tool-benchmark-marker tool-benchmark-marker-current"
                    style={{ left: getPos(Math.min(currentDays, MAX_DAYS)) }}
                />
            </div>

            {/* Tier labels */}
            <div className="tool-benchmark-labels">
                {segmentsWithWidths.map((seg, i) => (
                    <div
                        key={i}
                        className="tool-benchmark-label"
                        style={{ width: `${seg.width}%` }}
                    >
                        {BENCHMARK_TIERS[i].label}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="tool-benchmark-legend">
                <span className="tool-benchmark-legend-item">
                    <span className="tool-benchmark-dot tool-benchmark-dot-current" />
                    NOW: ~{Math.round(currentDays)} DAYS,{" "}
                    {getTier(currentDays).label}
                </span>
                <span className="tool-benchmark-legend-item">
                    <span className="tool-benchmark-dot tool-benchmark-dot-target" />
                    AFTER: ~{Math.max(1, Math.round(targetDays))} DAYS,
                    FAST CLOSE
                </span>
            </div>
        </div>
    );
}

export function CostToCloseCalculator() {
    const [teamSize, setTeamSize] = useState(3);
    const [hoursPerPerson, setHoursPerPerson] = useState(30);
    const [currency, setCurrency] = useState<Currency>("AUD");
    const [hourlyRate, setHourlyRate] = useState(CURRENCY_CONFIG.AUD.default);

    const handleCurrencyChange = (c: Currency) => {
        setCurrency(c);
        setHourlyRate(CURRENCY_CONFIG[c].default);
    };

    const cfg = CURRENCY_CONFIG[currency];

    // --- Core calculations ---
    const totalHoursPerMonth = teamSize * hoursPerPerson;
    const monthlyCloseCost = totalHoursPerMonth * hourlyRate;
    const annualManualTax = monthlyCloseCost * 12;

    // Days derived: how many close-days does this represent?
    const currentDays = hoursPerPerson / HOURS_PER_CLOSE_DAY;

    // After automation: 70% of manual hours eliminated
    const residualHoursPerPerson = hoursPerPerson * (1 - AUTOMATION_REDUCTION);
    const residualTotalHours = teamSize * residualHoursPerPerson;
    const monthlyAfter = residualTotalHours * hourlyRate;
    const annualAfter = monthlyAfter * 12;
    const daysAfter = residualHoursPerPerson / HOURS_PER_CLOSE_DAY;

    const annualSavings = annualManualTax - annualAfter;
    const hoursReclaimed = (totalHoursPerMonth - residualTotalHours) * 12;

    const currentTier = getTier(currentDays);

    return (
        <div className="tool-surface tool-surface-wide">
            {/* Currency selector */}
            <div className="tool-header-row-between">
                <span className="tool-label">
                    Currency
                </span>
                <div className="tool-segmented">
                    {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((c) => (
                        <button
                            key={c}
                            onClick={() => handleCurrencyChange(c)}
                            className={cn(
                                "tool-segment",
                                currency === c ? "tool-segment-active" : undefined,
                            )}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main grid: inputs + results */}
            <div className="tool-grid">
                {/* Inputs panel */}
                <div className="tool-panel-muted tool-panel-stack">
                    {/* Panel header */}
                    <div className="tool-header-row">
                        <div className="tool-header-rule" />
                        <span className="tool-kicker">
                            Your Current State
                        </span>
                    </div>

                    <SliderInput
                        label="Finance team on close"
                        value={teamSize}
                        min={1}
                        max={15}
                        step={1}
                        onChange={setTeamSize}
                        displayValue={`${teamSize} ${teamSize === 1 ? "person" : "people"}`}
                        note="Everyone who touches close: accountants, controllers, AP/AR staff"
                    />

                    <SliderInput
                        label="Hours per person per close"
                        value={hoursPerPerson}
                        min={5}
                        max={80}
                        step={5}
                        onChange={setHoursPerPerson}
                        displayValue={`${hoursPerPerson}h / month`}
                        note="Reconciliation, exception review, approval follow-up, journal entries, ERP posting"
                    />

                    <SliderInput
                        label={`Loaded hourly cost (${cfg.symbol})`}
                        value={hourlyRate}
                        min={cfg.min}
                        max={cfg.max}
                        step={cfg.step}
                        onChange={setHourlyRate}
                        displayValue={`${cfg.symbol}${hourlyRate}/hr`}
                        note="Fully loaded: salary + CPF/MPF + benefits + overhead. Typical range shown."
                    />

                    {/* Quick summary inside input panel */}
                    <div className="tool-metric-grid">
                        <div>
                            <div className="tool-label tool-label-spaced">
                                Total hours/mo
                            </div>
                            <div className="tool-value-lg">
                                {Math.round(totalHoursPerMonth)}h
                            </div>
                        </div>
                        <div>
                            <div className="tool-label tool-label-spaced">
                                Est. days to close
                            </div>
                            <div
                                className={cn(
                                    "tool-value-lg",
                                    getValueTierClass(currentDays),
                                )}
                            >
                                ~{Math.round(currentDays)} days
                                <span className="tool-value-suffix">
                                    {currentTier.pct}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results panel */}
                <div className="tool-panel tool-panel-stack">
                    {/* Panel header */}
                    <div className="tool-header-row">
                        <div className="tool-header-rule" />
                        <span className="tool-kicker">
                            Close Cost Estimate
                        </span>
                    </div>

                    {/* Monthly cost — secondary metric */}
                    <div className="tool-result-row">
                        <span className="tool-label">
                            Monthly close cost
                        </span>
                        <span className="tool-value-lg">
                            {fmt(monthlyCloseCost, cfg.symbol)}
                        </span>
                    </div>

                    {/* Annual Manual Tax — HEADLINE */}
                    <div className="tool-result-highlight">
                        <div className="tool-kicker tool-kicker-spaced">
                            Annual &ldquo;Manual Tax&rdquo;
                        </div>
                        <div className="tool-value-xl">
                            {fmt(annualManualTax, cfg.symbol)}
                        </div>
                        <div className="tool-small tool-small-spaced-lg">
                            per year in close labor and manual review time
                        </div>
                    </div>

                    {/* After automation + Savings row */}
                    <div className="tool-metric tool-state-stack">
                        <div className="tool-label">
                            After workflow control: 70% reduction model
                        </div>
                        <div className="tool-metric-row">
                            <div>
                                <div className="tool-value-lg tool-value-muted">
                                    {fmt(annualAfter, cfg.symbol)}
                                    <span className="tool-value-suffix">
                                        /yr
                                    </span>
                                </div>
                                <div className="tool-small tool-small-spaced">
                                    ~{Math.max(1, Math.round(daysAfter))} days
                                    to close · {Math.round(residualTotalHours)}
                                    h/month
                                </div>
                            </div>
                            <div className="tool-metric-save">
                                <div className="tool-label-primary tool-label-spaced">
                                    You save
                                </div>
                                <div className="tool-value-accent">
                                    {fmt(annualSavings, cfg.symbol)}
                                </div>
                                <div className="tool-small mt-1">
                                    {Math.round(hoursReclaimed)}h reclaimed/yr
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benchmark bar */}
                    <div>
                        <BenchmarkBar
                            currentDays={currentDays}
                            targetDays={daysAfter}
                        />
                    </div>
                </div>
            </div>

            {/* Estimate note */}
            <div className="tool-divider">
                <p className="tool-small">
                    HOW THIS ESTIMATE WORKS: Savings estimate uses a 70% reduction model for
                    manual close work after exception handling, reconciliations,
                    approval follow-up, and recurring checks are controlled or
                    automated. Days-to-close derived from{" "}
                    {HOURS_PER_CLOSE_DAY}h of focused close work per person per
                    day: the industry standard for active reconciliation
                    periods. Benchmarks sourced from Ledge 2025 survey of 100
                    finance professionals (n=100, companies 51-200+ employees).
                </p>
            </div>

            {/* CTA */}
            <div className="tool-cta-panel">
                <p className="tool-copy">
                    Want to know what sits behind the number? Bring one close
                    workflow or approval bottleneck to a scoping call.
                </p>
                <Link
                    href="https://calendly.com/hello-invaritech/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-button-primary tool-button-fit"
                >
                    Book Scoping Call
                    <ArrowRight className="tool-icon-xs" />
                </Link>
            </div>
        </div>
    );
}
