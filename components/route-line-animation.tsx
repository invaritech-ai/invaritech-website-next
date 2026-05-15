"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// SVG canvas
const W = 300;
const NODE_Y = 18;
const NODE_R = 6;
// Node centres: left / middle / right
const NX = [NODE_R + 2, W / 2, W - NODE_R - 2] as const;
// Segment endpoints (gap of 4px between node edge and segment start/end)
const SEG1 = { x1: NX[0] + NODE_R + 4, x2: NX[1] - NODE_R - 4, y: NODE_Y };
const SEG2 = { x1: NX[1] + NODE_R + 4, x2: NX[2] - NODE_R - 4, y: NODE_Y };
const SEG1_LEN = SEG1.x2 - SEG1.x1;
const SEG2_LEN = SEG2.x2 - SEG2.x1;
const LABEL_Y = NODE_Y + NODE_R + 14;
const SVG_H = LABEL_Y + 10;

const STAGES = ["Flagged", "Evidence", "Decision"] as const;

export default function RouteLineAnimation() {
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(
        () => {
            const svg = svgRef.current;
            if (!svg) return;

            const seg1 = svg.querySelector<SVGLineElement>("#rl-seg1");
            const seg2 = svg.querySelector<SVGLineElement>("#rl-seg2");
            const dot2 = svg.querySelector<SVGCircleElement>("#rl-dot2");
            const dot3 = svg.querySelector<SVGCircleElement>("#rl-dot3");
            const stamp = document.querySelector<HTMLElement>("[data-packet-stamp]");

            const tl = gsap.timeline();

            // Stamp stamps in with a satisfying thud
            if (stamp) {
                tl.fromTo(
                    stamp,
                    { opacity: 0, scale: 1.35, rotation: 6, transformOrigin: "60% 50%" },
                    { opacity: 1, scale: 1, rotation: -2, duration: 0.18, ease: "back.out(5)" },
                    0.9,
                );
            }

            // Route line: draw seg 1
            if (seg1) {
                tl.to(seg1, { strokeDashoffset: 0, duration: 0.55, ease: "none" }, 1.15);
            }
            // Light middle node
            if (dot2) {
                tl.to(dot2, { attr: { fill: "var(--primary)" }, duration: 0.15 }, ">");
            }
            // Brief pause
            tl.to({}, { duration: 0.18 });
            // Draw seg 2
            if (seg2) {
                tl.to(seg2, { strokeDashoffset: 0, duration: 0.55, ease: "none" });
            }
            // Light end node
            if (dot3) {
                tl.to(dot3, { attr: { fill: "var(--primary)" }, duration: 0.15 });
            }
        },
        { scope: svgRef },
    );

    return (
        <div className="route-line-wrap" aria-hidden="true">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${SVG_H}`}
                fill="none"
                className="route-line-svg"
            >
                {/* Connector segments — drawn by GSAP via stroke-dashoffset */}
                <line
                    id="rl-seg1"
                    x1={SEG1.x1} y1={SEG1.y} x2={SEG1.x2} y2={SEG1.y}
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeDasharray={SEG1_LEN}
                    strokeDashoffset={SEG1_LEN}
                />
                <line
                    id="rl-seg2"
                    x1={SEG2.x1} y1={SEG2.y} x2={SEG2.x2} y2={SEG2.y}
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeDasharray={SEG2_LEN}
                    strokeDashoffset={SEG2_LEN}
                />

                {/* Nodes */}
                {NX.map((x, i) => (
                    <g key={i}>
                        {/* Ring */}
                        <circle
                            cx={x} cy={NODE_Y} r={NODE_R}
                            stroke="var(--border)"
                            strokeWidth="1.5"
                            fill="var(--background)"
                        />
                        {/* Inner fill dot — first node starts active */}
                        <circle
                            id={i === 1 ? "rl-dot2" : i === 2 ? "rl-dot3" : undefined}
                            cx={x} cy={NODE_Y} r={NODE_R - 3}
                            fill={i === 0 ? "var(--primary)" : "transparent"}
                        />
                    </g>
                ))}

                {/* Stage labels */}
                {STAGES.map((label, i) => (
                    <text
                        key={label}
                        x={NX[i]}
                        y={LABEL_Y}
                        textAnchor="middle"
                        fontSize="7"
                        letterSpacing="0.12em"
                        fill="var(--foreground-subtle)"
                        fontFamily="var(--font-mono)"
                        textRendering="geometricPrecision"
                    >
                        {label.toUpperCase()}
                    </text>
                ))}
            </svg>
        </div>
    );
}
