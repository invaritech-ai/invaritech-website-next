"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Currency = "SGD" | "HKD" | "MYR" | "USD";

const CURRENCY_CONFIG: Record<Currency, { symbol: string; defaultBalance: number; defaultCosts: number; defaultRevenue: number }> = {
    SGD: { symbol: "S$", defaultBalance: 600000, defaultCosts: 90000, defaultRevenue: 70000 },
    HKD: { symbol: "HK$", defaultBalance: 3500000, defaultCosts: 550000, defaultRevenue: 430000 },
    MYR: { symbol: "RM", defaultBalance: 900000, defaultCosts: 130000, defaultRevenue: 100000 },
    USD: { symbol: "$", defaultBalance: 450000, defaultCosts: 70000, defaultRevenue: 55000 },
};

function fmt(amount: number, symbol: string): string {
    if (Math.abs(amount) >= 1_000_000)
        return `${amount < 0 ? "-" : ""}${symbol}${(Math.abs(amount) / 1_000_000).toFixed(1)}M`;
    if (Math.abs(amount) >= 100_000)
        return `${amount < 0 ? "-" : ""}${symbol}${Math.round(Math.abs(amount) / 1_000)}K`;
    return `${amount < 0 ? "-" : ""}${symbol}${Math.abs(Math.round(amount)).toLocaleString()}`;
}

function fmtMonths(months: number): string {
    if (!isFinite(months)) return "∞";
    if (months < 1) return `< 1`;
    return String(Math.round(months));
}

function NumberInput({
    label,
    value,
    onChange,
    symbol,
    note,
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    symbol: string;
    note?: string;
}) {
    const [raw, setRaw] = useState(String(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value.replace(/[^0-9]/g, "");
        setRaw(str);
        const n = parseInt(str, 10);
        if (!isNaN(n)) onChange(n);
        else if (str === "") onChange(0);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-white/70 shrink-0">
                    {label}
                </span>
                <div className="flex items-center border border-white/20 bg-black/40 focus-within:border-primary/60 transition-colors">
                    <span className="text-xs font-mono text-white/40 pl-3 pr-1 select-none">{symbol}</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={raw}
                        onChange={handleChange}
                        onFocus={() => setRaw(raw === "0" ? "" : raw)}
                        onBlur={() => {
                            const n = parseInt(raw, 10);
                            const v = isNaN(n) ? 0 : n;
                            setRaw(String(v));
                            onChange(v);
                        }}
                        className="bg-transparent text-right text-xl font-bold tracking-tighter text-white w-28 pr-3 py-2 outline-none tabular-nums"
                    />
                </div>
            </div>
            {note && (
                <p className="text-[10px] font-mono text-white/40 leading-relaxed">{note}</p>
            )}
        </div>
    );
}

function DaysSlider({
    value,
    onChange,
}: {
    value: number;
    onChange: (v: number) => void;
}) {
    const pct = ((value - 1) / 29) * 100;
    return (
        <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-white/70 shrink-0">
                    Days to receive cash report
                </span>
                <span className="text-xl font-bold tracking-tighter text-white tabular-nums">
                    {value} {value === 1 ? "day" : "days"}
                </span>
            </div>
            <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-[3px] appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-[18px]
                    [&::-webkit-slider-thumb]:h-[18px]
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:rounded-none
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:duration-100
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
            <p className="text-[10px] font-mono text-white/40 leading-relaxed">
                After month-end close, how many days until the CFO receives the cash position update?
            </p>
        </div>
    );
}

export function BurnRateCalculator() {
    const [currency, setCurrency] = useState<Currency>("SGD");
    const [balance, setBalance] = useState(CURRENCY_CONFIG.SGD.defaultBalance);
    const [costs, setCosts] = useState(CURRENCY_CONFIG.SGD.defaultCosts);
    const [revenue, setRevenue] = useState(CURRENCY_CONFIG.SGD.defaultRevenue);
    const [reportDays, setReportDays] = useState(12);

    const handleCurrencyChange = (c: Currency) => {
        setCurrency(c);
        setBalance(CURRENCY_CONFIG[c].defaultBalance);
        setCosts(CURRENCY_CONFIG[c].defaultCosts);
        setRevenue(CURRENCY_CONFIG[c].defaultRevenue);
    };

    const cfg = CURRENCY_CONFIG[currency];

    // Core calculations
    const netBurn = Math.max(0, costs - revenue);
    const netProfit = Math.max(0, revenue - costs);
    const isCashPositive = revenue >= costs;

    const runway = isCashPositive ? Infinity : balance / netBurn;

    const proj3 = balance + (isCashPositive ? netProfit : -netBurn) * 3;
    const proj6 = balance + (isCashPositive ? netProfit : -netBurn) * 6;
    const proj12 = balance + (isCashPositive ? netProfit : -netBurn) * 12;

    // Visibility lag: how much cash movement happens before the report arrives
    const lagCost = (reportDays / 30) * (costs + revenue);

    // Runway classification
    const runwayLabel =
        isCashPositive
            ? "CASH POSITIVE"
            : runway < 3
              ? "CRITICAL"
              : runway < 6
                ? "CAUTION"
                : runway < 12
                  ? "STABLE"
                  : "HEALTHY";
    const runwayColor =
        isCashPositive
            ? "text-primary border-primary/40 bg-primary/8"
            : runway < 3
              ? "text-red-400 border-red-500/40 bg-red-500/8"
              : runway < 6
                ? "text-yellow-400 border-yellow-500/40 bg-yellow-500/8"
                : "text-primary border-primary/40 bg-primary/8";

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

            {/* Main grid */}
            <div className="grid lg:grid-cols-2 gap-px bg-white/10">
                {/* Inputs */}
                <div className="bg-[#0a0a0c] p-8 space-y-8">
                    <div className="flex items-center gap-3 pb-6 border-b border-white/15">
                        <div className="h-px w-8 bg-primary/60" />
                        <span className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Your Numbers
                        </span>
                    </div>

                    <NumberInput
                        label={`Cash balance (${cfg.symbol})`}
                        value={balance}
                        onChange={setBalance}
                        symbol={cfg.symbol}
                        note="Current cash and cash equivalents across all accounts"
                    />

                    <NumberInput
                        label={`Monthly operating costs (${cfg.symbol})`}
                        value={costs}
                        onChange={setCosts}
                        symbol={cfg.symbol}
                        note="Payroll, rent, SaaS, COGS, and all other outflows — gross, before revenue offset"
                    />

                    <NumberInput
                        label={`Average monthly revenue (${cfg.symbol})`}
                        value={revenue}
                        onChange={setRevenue}
                        symbol={cfg.symbol}
                        note="Cash-basis revenue (when it actually lands, not when invoiced)"
                    />

                    <DaysSlider value={reportDays} onChange={setReportDays} />
                </div>

                {/* Results */}
                <div className="bg-[#080808] p-8 space-y-6 flex flex-col">
                    <div className="flex items-center gap-3 pb-6 border-b border-white/15">
                        <div className="h-px w-8 bg-primary/60" />
                        <span className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                            Your Cash Position
                        </span>
                    </div>

                    {/* Net burn / profit */}
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                            {isCashPositive ? "Net monthly profit" : "Net monthly burn"}
                        </span>
                        <span className={`text-2xl font-bold tracking-tighter tabular-nums ${isCashPositive ? "text-primary" : "text-white"}`}>
                            {fmt(isCashPositive ? netProfit : netBurn, cfg.symbol)}
                        </span>
                    </div>

                    {/* Runway — headline */}
                    <div className={`border p-6 relative overflow-hidden ${runwayColor}`}>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0" />
                        <div className="text-xs font-mono uppercase tracking-[0.22em] mb-1 opacity-70">
                            {isCashPositive ? "Cash Positive" : "Cash Runway"}
                        </div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-5xl md:text-6xl font-bold tracking-tighter leading-none tabular-nums">
                                {fmtMonths(runway)}
                            </div>
                            {!isCashPositive && (
                                <div className="text-xl font-bold opacity-60">months</div>
                            )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="text-[10px] font-mono opacity-60">
                                {isCashPositive
                                    ? `Growing ${fmt(netProfit * 12, cfg.symbol)}/yr at current pace`
                                    : `At current burn, cash reaches zero in ${fmtMonths(runway)} months`}
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-widest font-bold border border-current/30 px-2 py-0.5 opacity-70">
                                {runwayLabel}
                            </span>
                        </div>
                    </div>

                    {/* Projections */}
                    <div className="border border-white/15 p-5">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-4">
                            Projected Cash Balance
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "3 Months", value: proj3 },
                                { label: "6 Months", value: proj6 },
                                { label: "12 Months", value: proj12 },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <div className="text-[9px] font-mono uppercase tracking-wider text-white/40 mb-1">
                                        {label}
                                    </div>
                                    <div
                                        className={`text-lg font-bold tracking-tighter tabular-nums ${
                                            value < 0 ? "text-red-400" : value < balance * 0.3 ? "text-yellow-400" : "text-white"
                                        }`}
                                    >
                                        {value < 0 ? `-${fmt(Math.abs(value), cfg.symbol)}` : fmt(value, cfg.symbol)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visibility lag */}
                    <div className="border border-white/10 bg-white/[0.03] p-5 mt-auto">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-2">
                            Reporting Lag Cost
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                            <div className="text-2xl font-bold tracking-tighter text-white/80 tabular-nums">
                                {fmt(lagCost, cfg.symbol)}
                            </div>
                            <div className="text-[10px] font-mono text-white/40 text-right leading-tight">
                                of cash movement happens<br />before your report arrives
                            </div>
                        </div>
                        <p className="text-[10px] font-mono text-white/35 mt-3 leading-relaxed">
                            Based on {reportDays} days × ({fmt(costs, cfg.symbol)} costs + {fmt(revenue, cfg.symbol)} revenue) / 30. Decisions made on data that is {reportDays} days old miss this window entirely.
                        </p>
                    </div>
                </div>
            </div>

            {/* Methodology */}
            <div className="pt-5 border-t border-white/10">
                <p className="text-[10px] font-mono text-white/40 leading-relaxed">
                    METHODOLOGY — Runway = Cash Balance ÷ Net Monthly Burn (costs − revenue). Projections assume constant burn/profit. Reporting lag cost = (days / 30) × gross throughput (inflows + outflows). This is a directional model; actual runway depends on payment timing, seasonality, and one-time items.
                </p>
            </div>

            {/* CTA */}
            <div className="border border-white/15 bg-white/[0.03] p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <p className="text-sm font-mono text-white/70 leading-relaxed">
                    Visibility lag is an infrastructure problem. We build the automated cash reporting layer that eliminates it.
                </p>
                <Link
                    href="/services/ai-workflow-automation-services/"
                    className="flex items-center gap-2 bg-primary text-black px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-white transition-colors shrink-0"
                >
                    See Workflow Automation
                    <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}
