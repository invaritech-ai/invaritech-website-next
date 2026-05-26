export function VarianceExhibit() {
    // Mock invoice-amount series with two clear duplicate-candidate outliers.
    const data = [
        { x: 0, y: 42 }, { x: 1, y: 48 }, { x: 2, y: 51 }, { x: 3, y: 46 },
        { x: 4, y: 54 }, { x: 5, y: 50 }, { x: 6, y: 88, flag: true },
        { x: 7, y: 47 }, { x: 8, y: 52 }, { x: 9, y: 49 }, { x: 10, y: 55 },
        { x: 11, y: 89, flag: true }, { x: 12, y: 53 }, { x: 13, y: 48 },
        { x: 14, y: 51 }, { x: 15, y: 50 },
    ];
    const w = 360;
    const h = 180;
    const pad = { l: 18, r: 12, t: 12, b: 20 };
    const xMax = data.length - 1;
    const yMax = 100;
    const sx = (x: number) => pad.l + (x / xMax) * (w - pad.l - pad.r);
    const sy = (y: number) => pad.t + (1 - y / yMax) * (h - pad.t - pad.b);
    const path = data
        .map((d, i) => `${i === 0 ? "M" : "L"} ${sx(d.x).toFixed(1)} ${sy(d.y).toFixed(1)}`)
        .join(" ");

    return (
        <div className="variance-exhibit">
            <div className="variance-exhibit-bar" />
            <div className="variance-exhibit-head">
                <span className="variance-exhibit-title">Exhibit A · AP variance</span>
                <span className="variance-exhibit-id">FIG · 001</span>
            </div>
            <svg
                viewBox={`0 0 ${w} ${h}`}
                className="w-full h-auto"
                role="img"
                aria-label="Variance plot showing two duplicate-candidate outliers"
            >
                {[0, 25, 50, 75, 100].map((g) => (
                    <line key={g} x1={pad.l} x2={w - pad.r} y1={sy(g)} y2={sy(g)}
                        stroke="var(--border)" strokeWidth="1"
                        strokeDasharray={g === 50 ? "0" : "2 4"} />
                ))}
                <path d={path} fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinejoin="round" />
                <rect x={pad.l} y={sy(65)} width={w - pad.l - pad.r}
                    height={sy(35) - sy(65)} fill="var(--primary)" opacity="0.05" />
                {data.map((d) => (
                    <circle key={d.x} cx={sx(d.x)} cy={sy(d.y)}
                        r={d.flag ? 4 : 2}
                        fill={d.flag ? "var(--accent)" : "var(--background)"}
                        stroke={d.flag ? "var(--accent)" : "var(--primary)"}
                        strokeWidth={d.flag ? 1.5 : 1} />
                ))}
                {data.filter((d) => d.flag).map((d, i) => (
                    <g key={i}>
                        <line x1={sx(d.x)} y1={sy(d.y) - 8} x2={sx(d.x)} y2={sy(d.y) - 24}
                            stroke="var(--accent)" strokeWidth="1" />
                        <text x={sx(d.x) - 6} y={sy(d.y) - 28} fill="var(--accent)"
                            fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">
                            DUP·{i + 1}
                        </text>
                    </g>
                ))}
                {[0, 50, 100].map((g) => (
                    <text key={g} x={pad.l - 4} y={sy(g) + 3} textAnchor="end"
                        fontSize="7" fontFamily="var(--font-mono)"
                        fill="var(--foreground-subtle)" letterSpacing="1">
                        {g}
                    </text>
                ))}
            </svg>
            <p className="variance-exhibit-caption">
                Sample AP export, 16-week window. Two near-duplicates flagged
                against historical median (<strong>+76%, +78%</strong>). Both
                approved manually in the original ledger.
            </p>
        </div>
    );
}
