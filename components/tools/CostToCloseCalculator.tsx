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
        <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-white/70 shrink-0">
                    {label}
                </span>
                <span className="text-xl font-bold tracking-tighter text-white tabular-nums text-right">
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
                className="w-full h-[3px] appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-[18px]
                    [&::-webkit-slider-thumb]:h-[18px]
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:rounded-none
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:duration-100
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:shadow-[0_0_12px_var(--primary)]
                    [&::-moz-range-thumb]:w-[18px]
                    [&::-moz-range-thumb]:h-[18px]
                    [&::-moz-range-thumb]:bg-primary
                    [&::-moz-range-thumb]:rounded-none
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                style={{
                    background: `linear-gradient(to right, var(--primary) ${pct}%, rgba(255,255,255,0.2) ${pct}%)`,
                }}
            />
            {note && (
                <p className="text-[10px] font-mono text-white/45 leading-relaxed">{note}</p>
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
        { end: 3, bg: "bg-primary/40" },
        { end: 5, bg: "bg-primary/20" },
        { end: 7, bg: "bg-yellow-500/20" },
        { end: 15, bg: "bg-red-500/20" },
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
        <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                    Close Cycle Benchmark
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 border ${
                    currentDays <= 3 ? "border-primary/50 text-primary bg-primary/10" :
                    currentDays <= 5 ? "border-primary/30 text-primary/80 bg-primary/5" :
                    currentDays <= 7 ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10" :
                    "border-red-500/40 text-red-400 bg-red-500/10"
                }`}>
                    {currentTier.label}
                </span>
            </div>

            {/* Bar */}
            <div className="relative h-8 flex border border-white/20">
                {segmentsWithWidths.map((seg, i) => (
                    <div
                        key={i}
                        className={`${seg.bg} ${i < segments.length - 1 ? "border-r border-white/15" : ""}`}
                        style={{ width: `${seg.width}%` }}
                    />
                ))}

                {/* Target position (after automation) */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-primary transition-all duration-500 shadow-[0_0_8px_var(--primary)]"
                    style={{ left: getPos(Math.max(targetDays, MIN_DAYS)) }}
                >
                    <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-primary shadow-[0_0_8px_var(--primary)]" />
                </div>

                {/* Current position */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white transition-all duration-500"
                    style={{ left: getPos(Math.min(currentDays, MAX_DAYS)) }}
                >
                    <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-white" />
                </div>
            </div>

            {/* Tier labels */}
            <div className="flex text-[9px] font-mono uppercase tracking-wider">
                {segmentsWithWidths.map((seg, i) => (
                    <div
                        key={i}
                        className="text-center text-white/45 overflow-hidden px-0.5"
                        style={{ width: `${seg.width}%` }}
                    >
                        {BENCHMARK_TIERS[i].label}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[10px] font-mono text-white/55 pt-1">
                <span className="flex items-center gap-2">
                    <span className="w-[8px] h-[8px] rotate-45 bg-white inline-block shrink-0" />
                    NOW: ~{Math.round(currentDays)} DAYS — {getTier(currentDays).label}
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-[8px] h-[8px] rotate-45 bg-primary inline-block shrink-0 shadow-[0_0_6px_var(--primary)]" />
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
        <div className="space-y-2">
            {/* Currency selector */}
            <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-white/60 shrink-0">
                    Currency
                </span>
                <div className="flex gap-1">
                    {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((c) => (
                        <button
                            key={c}
                            onClick={() => handleCurrencyChange(c)}
                            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-150 ${
                                currency === c
                                    ? "border-primary bg-primary text-black font-bold"
                                    : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main grid: inputs + results */}
            <div className="grid lg:grid-cols-2 gap-px bg-white/10">
                {/* Inputs panel */}
                <div className="bg-[#0a0a0c] p-8 space-y-8">
                    {/* Panel header */}
                    <div className="flex items-center gap-3 pb-6 border-b border-white/15">
                        <div className="h-px w-8 bg-primary/60" />
                        <span className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
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
                        note="Reconciliation, data cleaning, journal entries, ERP posting. Industry median: 30–50h/person"
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
                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                                Total hours/mo
                            </div>
                            <div className="text-2xl font-bold tracking-tighter text-white tabular-nums">
                                {Math.round(totalHoursPerMonth)}h
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                                Est. days to close
                            </div>
                            <div className={`text-2xl font-bold tracking-tighter tabular-nums ${
                                currentDays <= 3 ? "text-primary" :
                                currentDays <= 5 ? "text-primary/90" :
                                currentDays <= 7 ? "text-yellow-400" : "text-red-400"
                            }`}>
                                ~{Math.round(currentDays)} days
                                <span className="text-xs font-normal text-white/40 ml-1">
                                    {currentTier.pct}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results panel */}
                <div className="bg-[#080808] p-8 space-y-6 flex flex-col">
                    {/* Panel header */}
                    <div className="flex items-center gap-3 pb-6 border-b border-white/15">
                        <div className="h-px w-8 bg-primary/60" />
                        <span className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Your Manual Tax
                        </span>
                    </div>

                    {/* Monthly cost — secondary metric */}
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                            Monthly close cost
                        </span>
                        <span className="text-2xl font-bold tracking-tighter text-white tabular-nums">
                            {fmt(monthlyCloseCost, cfg.symbol)}
                        </span>
                    </div>

                    {/* Annual Manual Tax — HEADLINE */}
                    <div className="border border-primary/40 bg-primary/8 p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0" />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
                        <div className="text-xs font-mono uppercase tracking-[0.22em] text-primary mb-3">
                            Annual &ldquo;Manual Tax&rdquo;
                        </div>
                        <div className="text-5xl md:text-6xl font-bold tracking-tighter text-white tabular-nums leading-none">
                            {fmt(annualManualTax, cfg.symbol)}
                        </div>
                        <div className="text-xs font-mono text-white/55 mt-2">
                            per year in close labor — money you could redeploy
                        </div>
                    </div>

                    {/* After automation + Savings row */}
                    <div className="border border-white/15 p-5 space-y-4">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                            After Automation — 70% reduction
                        </div>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-2xl font-bold tracking-tighter text-white/70 tabular-nums">
                                    {fmt(annualAfter, cfg.symbol)}
                                    <span className="text-xs font-normal text-white/40 ml-1">/yr</span>
                                </div>
                                <div className="text-[10px] font-mono text-white/50 mt-1">
                                    ~{Math.max(1, Math.round(daysAfter))} days to close · {Math.round(residualTotalHours)}h/month
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">
                                    You save
                                </div>
                                <div className="text-3xl font-bold tracking-tighter text-primary tabular-nums">
                                    {fmt(annualSavings, cfg.symbol)}
                                </div>
                                <div className="text-[10px] font-mono text-white/50 mt-1">
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

            {/* Methodology */}
            <div className="pt-5 border-t border-white/10">
                <p className="text-[10px] font-mono text-white/40 leading-relaxed">
                    METHODOLOGY — Savings estimate based on 70% reduction in manual close hours,
                    consistent with published ROI studies from Netgain, DOKKA, and FloQast.
                    Days-to-close derived from {HOURS_PER_CLOSE_DAY}h of focused close work per
                    person per day — the industry standard for active reconciliation periods.
                    Benchmarks sourced from Ledge 2025 survey of 100 finance professionals
                    (n=100, companies 51–200+ employees).
                </p>
            </div>

            {/* CTA */}
            <div className="border border-white/15 bg-white/[0.03] p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <p className="text-sm font-mono text-white/70 leading-relaxed">
                    Ready to close in 3 days? We will map your exact blueprint on a free call.
                </p>
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
