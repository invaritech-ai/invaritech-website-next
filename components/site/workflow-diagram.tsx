"use client";

import {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type WorkflowDiagramLabels = {
    currentStack: string;
    controlLayer: string;
    outcomes: string;
};

type WorkflowDiagramProps = {
    currentStack: string[];
    controlLayer: string[];
    outcomes: string[];
    labels?: WorkflowDiagramLabels;
    className?: string;
};

// --- pulse timing (fractions of one loop) ---
const CYCLE_MS = 5200;
const TAIL = 0.18; // comet length as a fraction of each traced segment
const START_DELAY_MS = 650; // let the entrance reveal land first
const GLOW_PEAK = 0.8; // subtle/premium: comet opacity ceiling
const BOX_SLOTS: ReadonlyArray<[number, number]> = [
    [0.0, 0.16],
    [0.26, 0.42],
    [0.52, 0.68],
];
const CONN_SLOTS: ReadonlyArray<[number, number]> = [
    [0.16, 0.26],
    [0.42, 0.52],
];
const NODE_AT = [0.16, 0.42, 0.68];

type Pt = { x: number; y: number };
type Seg = { id: string; d: string; slot: [number, number] };
type NodeDot = { id: string; cx: number; cy: number; at: number };
type Geometry = { w: number; h: number; segs: Seg[]; nodes: NodeDot[] };

type BoxRect = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    cx: number;
    cy: number;
};

function poly(points: Pt[]) {
    return points
        .map(
            (p, i) =>
                `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
        )
        .join(" ");
}

function buildGeometry(
    boxes: BoxRect[],
    horizontal: boolean,
    w: number,
    h: number,
): Geometry {
    const segs: Seg[] = [];
    const nodes: NodeDot[] = [];

    boxes.forEach((b, i) => {
        // The signal enters one edge midpoint and accumulates at the opposite one.
        const entry: Pt = horizontal
            ? { x: b.left, y: b.cy }
            : { x: b.cx, y: b.top };
        const exit: Pt = horizontal
            ? { x: b.right, y: b.cy }
            : { x: b.cx, y: b.bottom };

        // Two arcs spread from entry around both sides and converge at exit.
        const arcA: Pt[] = horizontal
            ? [entry, { x: b.left, y: b.top }, { x: b.right, y: b.top }, exit]
            : [entry, { x: b.right, y: b.top }, { x: b.right, y: b.bottom }, exit];
        const arcB: Pt[] = horizontal
            ? [
                  entry,
                  { x: b.left, y: b.bottom },
                  { x: b.right, y: b.bottom },
                  exit,
              ]
            : [entry, { x: b.left, y: b.top }, { x: b.left, y: b.bottom }, exit];

        segs.push({ id: `arc-${i}-a`, d: poly(arcA), slot: BOX_SLOTS[i] });
        segs.push({ id: `arc-${i}-b`, d: poly(arcB), slot: BOX_SLOTS[i] });
        nodes.push({ id: `node-${i}`, cx: exit.x, cy: exit.y, at: NODE_AT[i] });

        if (i < boxes.length - 1) {
            const next = boxes[i + 1];
            const nextEntry: Pt = horizontal
                ? { x: next.left, y: next.cy }
                : { x: next.cx, y: next.top };
            segs.push({
                id: `conn-${i}`,
                d: poly([exit, nextEntry]),
                slot: CONN_SLOTS[i],
            });
        }
    });

    return { w, h, segs, nodes };
}

function ChevronRight() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden
        >
            <path d="M9 6l6 6-6 6" />
        </svg>
    );
}

function ChevronDown() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

function Connector({ delay, reduce }: { delay: number; reduce: boolean }) {
    return (
        <div
            aria-hidden
            className="flex shrink-0 items-center justify-center text-accent"
        >
            {/* Desktop: horizontal pipe between columns */}
            <div className="hidden items-center md:flex md:w-12 lg:w-16">
                <motion.span
                    className="block h-px w-full origin-left bg-accent/50"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={reduce ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay, ease: "easeOut" }}
                />
                <ChevronRight />
            </div>
            {/* Mobile: vertical pipe between stacked cards */}
            <div className="flex flex-col items-center py-3 md:hidden">
                <motion.span
                    className="block h-6 w-px origin-top bg-accent/50"
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={reduce ? undefined : { scaleY: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay, ease: "easeOut" }}
                />
                <ChevronDown />
            </div>
        </div>
    );
}

export function WorkflowDiagram({
    currentStack,
    controlLayer,
    outcomes,
    labels,
    className,
}: WorkflowDiagramProps) {
    const reduce = useReducedMotion() ?? false;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const segRefs = useRef<Map<string, SVGPathElement>>(new Map());
    const nodeRefs = useRef<Map<string, SVGCircleElement>>(new Map());
    const [geo, setGeo] = useState<Geometry | null>(null);
    const [inView, setInView] = useState(false);

    const columns = [
        {
            id: "current-stack",
            title: labels?.currentStack,
            items: currentStack,
            emphasis: false,
        },
        {
            id: "control-layer",
            title: labels?.controlLayer,
            items: controlLayer,
            emphasis: true,
        },
        {
            id: "outcomes",
            title: labels?.outcomes,
            items: outcomes,
            emphasis: false,
        },
    ];

    const measure = useCallback(() => {
        const root = rootRef.current;
        if (!root) return;
        const boxEls = Array.from(
            root.querySelectorAll<HTMLElement>("[data-flow-box]"),
        );
        if (boxEls.length !== 3) {
            setGeo(null);
            return;
        }
        const horizontal = window.matchMedia("(min-width: 768px)").matches;
        const boxes: BoxRect[] = boxEls.map((el) => {
            const left = el.offsetLeft;
            const top = el.offsetTop;
            const width = el.offsetWidth;
            const height = el.offsetHeight;
            return {
                left,
                top,
                right: left + width,
                bottom: top + height,
                cx: left + width / 2,
                cy: top + height / 2,
            };
        });
        setGeo(
            buildGeometry(
                boxes,
                horizontal,
                root.offsetWidth,
                root.offsetHeight,
            ),
        );
    }, []);

    // Measure on mount, on resize, and once more after the reveal settles.
    useEffect(() => {
        if (reduce) return;
        measure();
        const root = rootRef.current;
        const ro = new ResizeObserver(() => measure());
        if (root) ro.observe(root);
        window.addEventListener("resize", measure);
        const settle = window.setTimeout(measure, 1200);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
            window.clearTimeout(settle);
        };
    }, [measure, reduce]);

    // Pause the loop when the diagram is off-screen.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.15 },
        );
        io.observe(root);
        return () => io.disconnect();
    }, []);

    // The pulse loop.
    useEffect(() => {
        if (reduce || !geo || !inView) return;
        const segEls = segRefs.current;
        const nodeEls = nodeRefs.current;
        let raf = 0;
        let begin = 0;
        let active = true;

        const applyComet = (
            el: SVGPathElement,
            u: number,
            s: number,
            e: number,
        ) => {
            if (u < s || u > e) {
                el.style.opacity = "0";
                return;
            }
            const p = (u - s) / (e - s);
            el.style.strokeDashoffset = String(TAIL - p * (1 + TAIL));
            let env = 1;
            if (p < 0.2) env = p / 0.2;
            else if (p > 0.85) env = (1 - p) / 0.15;
            el.style.opacity = String(
                Math.max(0, Math.min(1, env)) * GLOW_PEAK,
            );
        };

        const frame = (ts: number) => {
            if (!active) return;
            if (!begin) begin = ts;
            const u = (((ts - begin) % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;
            const phase = u / CYCLE_MS;
            for (const seg of geo.segs) {
                const el = segEls.get(seg.id);
                if (el) applyComet(el, phase, seg.slot[0], seg.slot[1]);
            }
            for (const n of geo.nodes) {
                const el = nodeEls.get(n.id);
                if (!el) continue;
                const a0 = n.at - 0.06;
                const a1 = n.at + 0.08;
                let v = 0;
                if (phase >= a0 && phase <= a1) {
                    v = Math.sin(((phase - a0) / (a1 - a0)) * Math.PI);
                }
                el.style.opacity = String(v * 0.9);
                el.style.transform = `scale(${0.5 + v})`;
            }
            raf = requestAnimationFrame(frame);
        };

        const startTimer = window.setTimeout(() => {
            raf = requestAnimationFrame(frame);
        }, START_DELAY_MS);

        return () => {
            active = false;
            window.clearTimeout(startTimer);
            cancelAnimationFrame(raf);
            // Reset so nothing freezes mid-pulse when scrolled away.
            segEls.forEach((el) => {
                el.style.opacity = "0";
            });
            nodeEls.forEach((el) => {
                el.style.opacity = "0";
            });
        };
    }, [geo, reduce, inView]);

    if (columns.every((column) => column.items.length === 0)) {
        return null;
    }

    const glowFilter =
        "drop-shadow(0 0 2px var(--accent)) drop-shadow(0 0 7px rgba(180,83,9,0.45))";

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div ref={rootRef} className="relative">
                    <div className="flex flex-col md:flex-row md:items-stretch">
                        {columns.map((column, index) => (
                            <Fragment key={column.id}>
                                {index > 0 ? (
                                    <Connector
                                        delay={0.15 + index * 0.12}
                                        reduce={reduce}
                                    />
                                ) : null}
                                <motion.article
                                    data-flow-box={index}
                                    initial={
                                        reduce ? false : { opacity: 0, y: 12 }
                                    }
                                    whileInView={
                                        reduce ? undefined : { opacity: 1, y: 0 }
                                    }
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.12,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={cn(
                                        "site-card relative flex-1 border border-border transition-colors hover:border-accent/50",
                                        column.emphasis
                                            ? "border-accent/30"
                                            : undefined,
                                    )}
                                >
                                    {column.emphasis ? (
                                        <span
                                            aria-hidden
                                            className="absolute inset-x-0 top-0 h-0.5 bg-accent"
                                        />
                                    ) : null}
                                    {column.title ? (
                                        <h3 className="site-h3">
                                            {column.title}
                                        </h3>
                                    ) : null}
                                    {column.items.length > 0 ? (
                                        <ul className="mt-6 space-y-3">
                                            {column.items.map((item) => (
                                                <li
                                                    key={item}
                                                    className="site-body text-base md:text-base"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </motion.article>
                            </Fragment>
                        ))}
                    </div>

                    {!reduce && geo ? (
                        <svg
                            aria-hidden
                            className="pointer-events-none absolute inset-0 overflow-visible"
                            width={geo.w}
                            height={geo.h}
                            viewBox={`0 0 ${geo.w} ${geo.h}`}
                            fill="none"
                        >
                            <g style={{ filter: glowFilter }}>
                                {geo.segs.map((seg) => (
                                    <path
                                        key={seg.id}
                                        ref={(el) => {
                                            if (el)
                                                segRefs.current.set(seg.id, el);
                                            else segRefs.current.delete(seg.id);
                                        }}
                                        d={seg.d}
                                        pathLength={1}
                                        style={{
                                            fill: "none",
                                            stroke: "var(--accent)",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeDasharray: `${TAIL} ${1 + TAIL}`,
                                            opacity: 0,
                                        }}
                                    />
                                ))}
                                {geo.nodes.map((n) => (
                                    <circle
                                        key={n.id}
                                        ref={(el) => {
                                            if (el)
                                                nodeRefs.current.set(n.id, el);
                                            else nodeRefs.current.delete(n.id);
                                        }}
                                        cx={n.cx}
                                        cy={n.cy}
                                        r={3.5}
                                        style={{
                                            fill: "var(--accent)",
                                            opacity: 0,
                                            transformBox: "fill-box",
                                            transformOrigin: "center",
                                        }}
                                    />
                                ))}
                            </g>
                        </svg>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
