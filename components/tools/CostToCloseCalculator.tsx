"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Currency = "SGD" | "HKD" | "MYR" | "USD";

const CURRENCY_CONFIG: Record<
    Currency,
    { symbol: string; default: number; min: number; max: number; step: number }
> = {
    SGD: { symbol: "S$", default: 55, min: 20, max: 150, step: 5 },
    HKD: { symbol: "HK$", default: 120, min: 50, max: 350, step: 10 },
    MYR: { symbol: "RM", default: 35, min: 15, max: 100, step: 5 },
    USD: { symbol: "$", default: 45, min: 20, max: 200, step: 5 },
};

// Industry benchmark: automation reduces manual close work by ~70%
// Source: DOKKA, Netgain, FloQast published ROI studies
const AUTOMATION_REDUCTION = 0.7;

// During a close period, each team member spends ~6 focused hours/day on close-specific tasks
const HOURS_PER_CLOSE_DAY = 6;

const BENCHMARK_TIERS = [
    { label: "BEST-IN-CLASS", maxDays: 3, pct: "TOP 18%", end: 3 },
    { label: "TOP QUARTILE", maxDays: 5, pct: "TOP 50%", end: 5 },
    { label: "AVERAGE", maxDays: 7, pct: "MEDIAN", end: 7 },
    { label: "BELOW AVG", maxDays: 15, pct: "BTM 27%", end: 15 },
];

function getTier(days: number) {
    return (
        BENCHMARK_TIERS.find((t) => days <= t.end) ?? BENCHMARK_TIERS[BENCHMARK_TIERS.length - 1]
    );
}

function fmt(amount: number, symbol: string): string {
    if (amount >= 1_000_000) return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
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
        <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 shrink-0">
                    {label}
                </span>
                <span className="text-lg font-bold tracking-tighter text-white tabular-nums text-right">
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
                className="w-full h-[2px] appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-[14px]
                    [&::-webkit-slider-thumb]:h-[14px]
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:rounded-none
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:duration-100
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-moz-range-thumb]:w-[14px]
                    [&::-moz-range-thumb]:h-[14px]
                    [&::-moz-range-thumb]:bg-primary
                    [&::-moz-range-thumb]:rounded-none
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                style={{
                    background: `linear-gradient(to right, var(--primary) ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
                }}
            />
            {note && (
                <p className="text-[9px] font-mono text-white/25 leading-relaxed">{note}</p>
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

    // Segment widths based on tier boundaries
    const segments = [
        { end: 3, bg: "bg-primary/25" },
        { end: 5, bg: "bg-primary/12" },
        { end: 7, bg: "bg-yellow-500/10" },
        { end: 15, bg: "bg-red-500/8" },
    ];

    let prevEnd = MIN_DAYS;
    const segmentsWithWidths = segments.map((seg) => {
        const width = ((seg.end - prevEnd) / scale) * 100;
        const result = { ...seg, width, prevEnd };
        prevEnd = seg.end;
        return result;
    });

    return (
        <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                Close Cycle Benchmark
            </span>

            {/* Bar */}
            <div className="relative h-5 flex border border-white/10">
                {segmentsWithWidths.map((seg, i) => (
                    <div
                        key={i}
                        className={`${seg.bg} ${i < segments.length - 1 ? "border-r border-white/10" : ""}`}
                        style={{ width: `${seg.width}%` }}
                    />
                ))}

                {/* Target position (after automation) */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-primary/50 transition-all duration-500"
                    style={{ left: getPos(Math.max(targetDays, MIN_DAYS)) }}
                >
                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rotate-45 bg-primary/70" />
                </div>

                {/* Current position */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white/50 transition-all duration-500"
                    style={{ left: getPos(Math.min(currentDays, MAX_DAYS)) }}
                >
                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rotate-45 bg-white/60" />
                </div>
            </div>

            {/* Tier labels */}
            <div className="flex text-[7px] font-mono uppercase tracking-wider">
                {segmentsWithWidths.map((seg, i) => (
                    <div
                        key={i}
                        className="text-center text-white/20 overflow-hidden"
                        style={{ width: `${seg.width}%` }}
                    >
                        {BENCHMARK_TIERS[i].label}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[9px] font-mono text-white/30">
                <span className="flex items-center gap-1.5">
                    <span className="w-[7px] h-[7px] rotate-45 bg-white/40 inline-block shrink-0" />
                    NOW: ~{Math.round(currentDays)} DAYS — {getTier(currentDays).label.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-[7px] h-[7px] rotate-45 bg-primary/60 inline-block shrink-0" />
                    AFTER: ~{Math.max(1, Math.round(targetDays))} DAYS — BEST-IN-CLASS
                </span>
            </div>
        </div>
    );
}

export function CostToCloseCalculator() {
    const [teamSize, setTeamSize] = useState(3);
    const [hoursPerPerson, setHoursPerPerson] = useState(30);
    const [currency, setCurrency] = useState<Currency>("SGD");
    const [hourlyRate, setHourlyRate] = useState(CURRENCY_CONFIG.SGD.default);

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
        <div className="space-y-8">
            {/* Currency selector */}
            <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Currency
                </span>
                <div className="flex gap-1">
                    {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((c) => (
                        <button
                            key={c}
                            onClick={() => handleCurrencyChange(c)}
                            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all duration-150 ${
                                currency === c
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main grid: inputs + results */}
            <div className="grid lg:grid-cols-2 gap-1">
                {/* Inputs panel */}
                <div className="border border-white/10 bg-black/40 p-8 space-y-8">
                    <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
                        <span className="w-8 h-px bg-white/10" />
                        Your Current State
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
                        note="Reconciliation, data cleaning, journal entries, ERP posting. Industry median: 30-50h/person"
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
                </div>

                {/* Results panel */}
                <div className="border border-white/10 bg-black/60 p-8 space-y-6 flex flex-col">
                    <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30 flex items-center gap-3">
                        <span className="w-8 h-px bg-white/10" />
                        Your Manual Tax
                    </div>

                    {/* Current cost */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-white/8 bg-white/[0.02] p-4">
                            <div className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-2">
                                Monthly Cost
                            </div>
                            <div className="text-2xl font-bold tracking-tighter text-white tabular-nums">
                                {fmt(monthlyCloseCost, cfg.symbol)}
                            </div>
                            <div className="text-[9px] font-mono text-white/30 mt-1">
                                {Math.round(totalHoursPerMonth)}h / month
                            </div>
                        </div>
                        <div className="border border-white/8 bg-white/[0.02] p-4">
                            <div className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-2">
                                Est. Days to Close
                            </div>
                            <div className={`text-2xl font-bold tracking-tighter tabular-nums ${
                                currentDays <= 3 ? "text-primary" :
                                currentDays <= 5 ? "text-primary/80" :
                                currentDays <= 7 ? "text-yellow-400/80" : "text-red-400/80"
                            }`}>
                                ~{Math.round(currentDays)} days
                            </div>
                            <div className="text-[9px] font-mono text-white/30 mt-1">
                                {currentTier.label} · {currentTier.pct}
                            </div>
                        </div>
                    </div>

                    {/* Annual Manual Tax — the headline number */}
                    <div className="border border-primary/20 bg-primary/5 p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
                        <div className="text-[9px] font-mono uppercase tracking-widest text-primary/60 mb-2">
                            Annual "Manual Tax"
                        </div>
                        <div className="text-4xl font-bold tracking-tighter text-white tabular-nums">
                            {fmt(annualManualTax, cfg.symbol)}
                        </div>
                        <div className="text-[10px] font-mono text-white/40 mt-1">
                            per year in close labor
                        </div>
                    </div>

                    {/* After automation */}
                    <div className="border border-white/8 p-5 space-y-3">
                        <div className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                            After Automation (70% reduction)
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-2xl font-bold tracking-tighter text-primary tabular-nums">
                                    {fmt(annualAfter, cfg.symbol)}
                                    <span className="text-sm font-normal text-white/30 ml-1">/yr</span>
                                </div>
                                <div className="text-[9px] font-mono text-white/30 mt-0.5">
                                    ~{Math.max(1, Math.round(daysAfter))} days to close · {Math.round(residualTotalHours)}h/month
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[9px] font-mono uppercase tracking-widest text-primary/50">
                                    You save
                                </div>
                                <div className="text-xl font-bold tracking-tighter text-primary tabular-nums">
                                    {fmt(annualSavings, cfg.symbol)}
                                </div>
                                <div className="text-[9px] font-mono text-white/30">
                                    {Math.round(hoursReclaimed)}h reclaimed/yr
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benchmark bar */}
                    <div className="mt-auto pt-2">
                        <BenchmarkBar currentDays={currentDays} targetDays={daysAfter} />
                    </div>
                </div>
            </div>

            {/* Payback note */}
            <div className="border-t border-white/10 pt-6">
                <p className="text-[10px] font-mono text-white/25 leading-relaxed">
                    METHODOLOGY — Savings estimate based on 70% reduction in manual close hours, consistent with published ROI
                    studies from Netgain, DOKKA, and FloQast. Days-to-close derived from{" "}
                    {HOURS_PER_CLOSE_DAY}h of focused close work per person per day — the industry
                    standard for active reconciliation periods. Benchmarks sourced from Ledge 2025
                    survey of 100 finance professionals (n=100, companies 51–200+ employees).
                </p>
            </div>

            {/* CTA */}
            <div className="border border-white/10 p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <p className="text-sm font-mono text-white/60 leading-relaxed">
                        Ready to close in 3 days? We will map your exact blueprint on a free call.
                    </p>
                </div>
                <Link
                    href="/assessment/"
                    className="flex items-center gap-2 bg-primary text-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-white transition-colors shrink-0"
                >
                    Book Assessment
                    <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}
