import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { loadFont as loadSourceSerif } from "@remotion/google-fonts/SourceSerif4";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

const { fontFamily: SERIF } = loadSourceSerif();
const { fontFamily: MONO } = loadPlexMono();

// ─── Palette (mirrors globals.css tokens) ────────────────────────────
const C = {
    bg: "#F7F7F4",
    card: "#FFFFFF",
    fg: "#0B1410",
    muted: "#4B5550",
    subtle: "#6B7570",
    border: "#E2E4DE",
    primary: "#0F5132",
    primaryHover: "#0A3D24",
    accent: "#B45309",
};

// ─── Composition timing ─────────────────────────────────────────────
//
// Total: 8 seconds @ 30fps = 240 frames.
//
//  0 –  15  chrome (title bar, vertical bar) lands
// 15 –  40  grid + axis labels fade in
// 40 –  60  threshold band breathes in
// 50 – 175  16 data points plot left-to-right (one every ~8 frames)
//   ├ 95   point 7 outlier — pulse + circle + "DUP·1" callout
//   └ 145  point 12 outlier — pulse + circle + "DUP·2" callout
//175 – 205  caption types in underneath
//205 – 225  "DUPLICATES FLAGGED" stamp slams in rotated
//225 – 240  hold for the loop
//
export const HERO_VARIANCE_DURATION_FRAMES = 240;

// ─── Data series ─────────────────────────────────────────────────────
// Exactly matches the static SVG on the homepage so the live page and
// the rendered video feel like the same exhibit, just one is animated.
const DATA: Array<{ x: number; y: number; flag?: boolean }> = [
    { x: 0, y: 42 }, { x: 1, y: 48 }, { x: 2, y: 51 }, { x: 3, y: 46 },
    { x: 4, y: 54 }, { x: 5, y: 50 }, { x: 6, y: 88, flag: true },
    { x: 7, y: 47 }, { x: 8, y: 52 }, { x: 9, y: 49 }, { x: 10, y: 55 },
    { x: 11, y: 89, flag: true }, { x: 12, y: 53 }, { x: 13, y: 48 },
    { x: 14, y: 51 }, { x: 15, y: 50 },
];

// First plotted at frame 50, last at frame 50 + 15*8 = 170.
// Each outlier's annotation fires when its point lands.
const POINT_START = 50;
const POINT_STRIDE = 8;
const pointLandFrame = (i: number) => POINT_START + i * POINT_STRIDE;

// ─── Helpers ────────────────────────────────────────────────────────
const fadeIn = (frame: number, start: number, dur = 18) =>
    interpolate(frame, [start, start + dur], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

// ─── Component ──────────────────────────────────────────────────────
export const HeroVariance: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Chart geometry — chart fills a generous "page" with margins.
    const CHART = {
        x: 110,
        y: 180,
        w: width - 220,
        h: 360,
    };
    const yMax = 100;
    const xMax = DATA.length - 1;
    const sx = (xi: number) => CHART.x + (xi / xMax) * CHART.w;
    const sy = (yv: number) => CHART.y + (1 - yv / yMax) * CHART.h;

    // Document chrome: bar slides down, title fades in
    const chromeOpacity = fadeIn(frame, 0, 12);
    const barHeight = interpolate(frame, [0, 14], [0, height - 80], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Grid / axis fade
    const axisOpacity = fadeIn(frame, 15, 18);

    // Threshold band
    const thresholdOpacity = fadeIn(frame, 40, 20) * 0.06;

    // For each datum, compute its visibility 0→1 with a spring as the point lands
    const pointVisibility = DATA.map((_, i) =>
        spring({
            frame: frame - pointLandFrame(i),
            fps,
            config: { damping: 14, stiffness: 180, mass: 0.6 },
            durationInFrames: 12,
        })
    );

    // Series line draws progressively. We compute how many segments are
    // visible based on the cursor position between points.
    const drawProgress = interpolate(
        frame,
        [POINT_START + 4, pointLandFrame(DATA.length - 1)],
        [0, DATA.length - 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );
    const linePath = buildLinePath(DATA, drawProgress, sx, sy);

    // Outlier callout timings
    const outliers = DATA
        .map((d, i) => ({ d, i, landed: pointLandFrame(i) }))
        .filter((p) => p.d.flag);

    // Caption + stamp timings
    const captionTypeProgress = interpolate(
        frame,
        [175, 205],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const captionText = "+76%, +78% variance · 2 of 16 flagged";
    const visibleChars = Math.floor(captionText.length * captionTypeProgress);
    const captionShown = captionText.slice(0, visibleChars);

    // Stamp slam-in
    const stampScale = spring({
        frame: frame - 205,
        fps,
        config: { damping: 8, stiffness: 200, mass: 0.7 },
        from: 1.8,
        to: 1,
        durationInFrames: 18,
    });
    const stampOpacity = fadeIn(frame, 205, 8);

    return (
        <AbsoluteFill style={{ background: C.bg, fontFamily: SERIF }}>
            {/* Paper grain — a very subtle texture to match the site */}
            <Grain />

            {/* Left vertical bar (mirrors the variance-exhibit-bar on the page) */}
            <div
                style={{
                    position: "absolute",
                    left: 40,
                    top: 40,
                    width: 4,
                    height: barHeight,
                    background: C.primary,
                }}
            />

            {/* Top chrome row */}
            <div
                style={{
                    position: "absolute",
                    top: 56,
                    left: 70,
                    right: 70,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    opacity: chromeOpacity,
                    fontFamily: MONO,
                    fontSize: 16,
                    letterSpacing: 5,
                    textTransform: "uppercase",
                }}
            >
                <span style={{ color: C.subtle }}>Exhibit A · AP variance</span>
                <span style={{ color: C.primary, letterSpacing: 3 }}>
                    FIG · 001
                </span>
            </div>

            {/* Rule under the chrome */}
            <div
                style={{
                    position: "absolute",
                    top: 100,
                    left: 70,
                    right: 70,
                    height: 1,
                    background: C.border,
                    opacity: chromeOpacity,
                }}
            />

            {/* Chart SVG */}
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ position: "absolute", inset: 0 }}
            >
                {/* Grid lines */}
                <g opacity={axisOpacity}>
                    {[0, 25, 50, 75, 100].map((g) => (
                        <line
                            key={g}
                            x1={CHART.x}
                            x2={CHART.x + CHART.w}
                            y1={sy(g)}
                            y2={sy(g)}
                            stroke={C.border}
                            strokeWidth={g === 50 ? 1.4 : 1}
                            strokeDasharray={g === 50 ? "0" : "4 8"}
                        />
                    ))}
                    {/* X-axis ticks */}
                    {DATA.map((d) => (
                        <line
                            key={`tick-${d.x}`}
                            x1={sx(d.x)}
                            x2={sx(d.x)}
                            y1={CHART.y + CHART.h}
                            y2={CHART.y + CHART.h + 4}
                            stroke={C.border}
                            strokeWidth={1}
                        />
                    ))}
                    {/* Y-axis labels */}
                    {[0, 50, 100].map((g) => (
                        <text
                            key={g}
                            x={CHART.x - 14}
                            y={sy(g) + 5}
                            textAnchor="end"
                            fontSize={14}
                            fontFamily={MONO}
                            fill={C.subtle}
                            letterSpacing={2}
                        >
                            {g}
                        </text>
                    ))}
                    {/* X-axis label */}
                    <text
                        x={CHART.x + CHART.w / 2}
                        y={CHART.y + CHART.h + 38}
                        textAnchor="middle"
                        fontSize={13}
                        fontFamily={MONO}
                        fill={C.subtle}
                        letterSpacing={3}
                    >
                        WEEK ·  01  →  16
                    </text>
                </g>

                {/* Acceptable variance band */}
                <rect
                    x={CHART.x}
                    y={sy(65)}
                    width={CHART.w}
                    height={sy(35) - sy(65)}
                    fill={C.primary}
                    opacity={thresholdOpacity}
                />

                {/* Series line, drawn progressively */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={C.primary}
                    strokeWidth={2.2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* Data points */}
                {DATA.map((d, i) => {
                    const vis = pointVisibility[i];
                    if (vis <= 0) return null;
                    const r = d.flag ? 7 : 3.5;
                    const grow = interpolate(vis, [0, 1], [0, r], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    // Pulse halo for outliers — starts on land, fades out
                    let haloR = 0;
                    let haloOpacity = 0;
                    if (d.flag) {
                        const pulseFrame = frame - pointLandFrame(i);
                        haloR = interpolate(pulseFrame, [0, 30], [r, r * 5], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                        });
                        haloOpacity = interpolate(
                            pulseFrame,
                            [0, 8, 30],
                            [0, 0.55, 0],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        );
                    }
                    return (
                        <g key={i}>
                            {d.flag && haloOpacity > 0 && (
                                <circle
                                    cx={sx(d.x)}
                                    cy={sy(d.y)}
                                    r={haloR}
                                    fill="none"
                                    stroke={C.accent}
                                    strokeWidth={1.5}
                                    opacity={haloOpacity}
                                />
                            )}
                            <circle
                                cx={sx(d.x)}
                                cy={sy(d.y)}
                                r={grow}
                                fill={d.flag ? C.accent : C.card}
                                stroke={d.flag ? C.accent : C.primary}
                                strokeWidth={d.flag ? 2 : 1.5}
                            />
                        </g>
                    );
                })}

                {/* Outlier annotations: leader line + DUP label */}
                {outliers.map((p, idx) => {
                    const startAt = p.landed + 8;
                    const reveal = fadeIn(frame, startAt, 12);
                    if (reveal <= 0) return null;
                    const leaderTopY = sy(p.d.y) - 18;
                    const leaderBottomY = sy(p.d.y) - 60;
                    const leaderProgress = interpolate(
                        reveal,
                        [0, 1],
                        [leaderTopY, leaderBottomY]
                    );
                    return (
                        <g key={idx} opacity={reveal}>
                            <line
                                x1={sx(p.d.x)}
                                x2={sx(p.d.x)}
                                y1={leaderTopY}
                                y2={leaderProgress}
                                stroke={C.accent}
                                strokeWidth={1.2}
                            />
                            <rect
                                x={sx(p.d.x) - 38}
                                y={leaderBottomY - 22}
                                width={76}
                                height={22}
                                fill={C.bg}
                                stroke={C.accent}
                                strokeWidth={1.2}
                            />
                            <text
                                x={sx(p.d.x)}
                                y={leaderBottomY - 7}
                                textAnchor="middle"
                                fontSize={11}
                                fontFamily={MONO}
                                fill={C.accent}
                                letterSpacing={3}
                                fontWeight={600}
                            >
                                DUP · {idx + 1}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Caption — types in below the chart */}
            <div
                style={{
                    position: "absolute",
                    left: 110,
                    right: 110,
                    bottom: 88,
                    fontFamily: MONO,
                    fontSize: 16,
                    letterSpacing: 2,
                    color: C.muted,
                    opacity: fadeIn(frame, 175, 12),
                    borderTop: `1px solid ${C.border}`,
                    paddingTop: 16,
                    minHeight: 24,
                }}
            >
                {captionShown}
                {visibleChars < captionText.length && captionTypeProgress > 0 && (
                    <span
                        style={{
                            display: "inline-block",
                            width: 8,
                            height: 16,
                            background: C.accent,
                            verticalAlign: "-2px",
                            marginLeft: 2,
                        }}
                    />
                )}
            </div>

            {/* Slam stamp */}
            <div
                style={{
                    position: "absolute",
                    right: 72,
                    bottom: 92,
                    transform: `rotate(-4deg) scale(${stampScale})`,
                    transformOrigin: "center",
                    opacity: stampOpacity,
                    border: `2px solid ${C.accent}`,
                    background: `${C.accent}0F`,
                    padding: "10px 18px",
                    fontFamily: MONO,
                    fontSize: 14,
                    letterSpacing: 5,
                    fontWeight: 600,
                    color: C.accent,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <span
                    style={{
                        width: 8,
                        height: 8,
                        background: C.accent,
                    }}
                />
                Duplicates flagged
            </div>

            {/* Document footer */}
            <div
                style={{
                    position: "absolute",
                    left: 70,
                    right: 70,
                    bottom: 40,
                    height: 1,
                    background: C.border,
                    opacity: chromeOpacity,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: 70,
                    right: 70,
                    bottom: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: 3,
                    color: C.subtle,
                    textTransform: "uppercase",
                    opacity: chromeOpacity,
                }}
            >
                <span>INV / 2026 / 001  ·  Sample AP export</span>
                <span>Series — Forest · Outliers — Copper</span>
            </div>
        </AbsoluteFill>
    );
};

// ─── Helpers ────────────────────────────────────────────────────────
function buildLinePath(
    data: Array<{ x: number; y: number }>,
    progress: number,
    sx: (x: number) => number,
    sy: (y: number) => number
): string {
    if (progress <= 0) return "";
    const segs: string[] = [];
    const floor = Math.floor(progress);
    const frac = progress - floor;
    const last = Math.min(floor, data.length - 1);
    for (let i = 0; i <= last; i++) {
        const cmd = i === 0 ? "M" : "L";
        segs.push(`${cmd} ${sx(data[i].x).toFixed(2)} ${sy(data[i].y).toFixed(2)}`);
    }
    if (frac > 0 && last < data.length - 1) {
        const a = data[last];
        const b = data[last + 1];
        const ix = a.x + (b.x - a.x) * frac;
        const iy = a.y + (b.y - a.y) * frac;
        segs.push(`L ${sx(ix).toFixed(2)} ${sy(iy).toFixed(2)}`);
    }
    return segs.join(" ");
}

const Grain: React.FC = () => (
    <svg
        style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}
        width="100%"
        height="100%"
    >
        <filter id="grain">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="3"
                stitchTiles="stitch"
            />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
);
