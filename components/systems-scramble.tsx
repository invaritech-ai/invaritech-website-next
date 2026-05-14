"use client";

import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FONT_POOL = [
    "'Courier New', Courier, monospace",
    "Impact, Charcoal, sans-serif",
    "Arial, Helvetica, sans-serif",
    "Verdana, Geneva, sans-serif",
    "'Trebuchet MS', Helvetica, sans-serif",
    "Tahoma, Geneva, sans-serif",
    "'Times New Roman', Times, serif",
    "Palatino, 'Palatino Linotype', serif",
    "Georgia, 'Times New Roman', serif",
    "var(--font-label)",
    "var(--font-body)",
];

const WORD = "systems";

// Slightly irregular hand-drawn oval — not a perfect ellipse.
// viewBox 0 0 130 48. The path deliberately doesn't close back to M,
// leaving a natural pen-lift gap for a sketch feel.
const CIRCLE_PATH =
    "M 14,20 C 30,-5 72,-7 104,4 C 126,13 134,29 120,40 C 107,51 68,53 36,47 C 8,42 -3,27 5,16 C 9,8 16,2 22,5";

export default function SystemsScramble() {
    const containerRef = useRef<HTMLSpanElement>(null);
    const circlePathRef = useRef<SVGPathElement>(null);
    const isHovering = useRef(false);
    const nextChangeTimes = useRef<number[]>([]);

    useGSAP(
        () => {
            // Circle draws on all sizes (hidden via CSS below 40rem).
            const path = circlePathRef.current;
            if (path) {
                const len = path.getTotalLength();
                gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 0.9,
                    ease: "power2.inOut",
                    delay: 0.35,
                });
            }

            // Font scramble — desktop only (≥1024px).
            if (!window.matchMedia("(min-width: 64rem)").matches) return;

            const letters = Array.from(
                containerRef.current!.querySelectorAll<HTMLElement>("[data-letter]"),
            );

            letters.forEach((el) => {
                const { width, height } = el.getBoundingClientRect();
                el.style.display = "inline-block";
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
                el.style.textAlign = "center";
                el.style.verticalAlign = "top";
                el.style.overflow = "visible";
            });

            nextChangeTimes.current = letters.map(
                (_, i) => gsap.ticker.time + i * 0.08 + Math.random() * 0.2,
            );

            const tick = () => {
                if (isHovering.current) return;
                const now = gsap.ticker.time;
                letters.forEach((el, i) => {
                    if (now >= nextChangeTimes.current[i]) {
                        gsap.set(el, {
                            fontFamily: FONT_POOL[Math.floor(Math.random() * FONT_POOL.length)],
                        });
                        nextChangeTimes.current[i] = now + 0.15 + Math.random() * 0.4;
                    }
                });
            };

            gsap.ticker.add(tick);
            return () => gsap.ticker.remove(tick);
        },
        { scope: containerRef },
    );

    const handleMouseEnter = useCallback(() => {
        isHovering.current = true;
        containerRef.current
            ?.querySelectorAll<HTMLElement>("[data-letter]")
            .forEach((el) => gsap.set(el, { clearProps: "fontFamily" }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        isHovering.current = false;
        const now = gsap.ticker.time;
        nextChangeTimes.current = nextChangeTimes.current.map(
            (_, i) => now + i * 0.04 + Math.random() * 0.1,
        );
    }, []);

    return (
        <span
            ref={containerRef}
            className="systems-scramble"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={WORD}
            style={{ display: "inline-flex", verticalAlign: "top", position: "relative" }}
        >
            {/* Sketch circle — inline style forces absolute positioning over flex context */}
            <svg
                className="systems-scramble-circle"
                viewBox="0 0 130 48"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-14px",
                    width: "calc(100% + 28px)",
                    height: "calc(100% + 20px)",
                    pointerEvents: "none",
                    overflow: "visible",
                }}
            >
                <path
                    ref={circlePathRef}
                    d={CIRCLE_PATH}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {WORD.split("").map((char, i) => (
                <span key={i} data-letter aria-hidden="true">
                    {char}
                </span>
            ))}

            <span className="systems-scramble-underline-dot" aria-hidden="true" />
            <span className="systems-scramble-underline-solid" aria-hidden="true" />
            <span className="systems-scramble-label" aria-hidden="true">current stack</span>
        </span>
    );
}
