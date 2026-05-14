"use client";

import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Fonts visually distinct from Source Serif 4 (the original display font).
// All entries have reliable cross-platform fallbacks.
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

export default function SystemsScramble() {
    const containerRef = useRef<HTMLSpanElement>(null);
    const isHovering = useRef(false);
    const nextChangeTimes = useRef<number[]>([]);

    // useGSAP uses useLayoutEffect internally — runs before paint, so the
    // dimension lock happens before the first visible frame (no flash).
    useGSAP(
        () => {
            // Animation only runs on desktop (≥1024px). Tablet and mobile keep
            // the normal inherited font with no layout interference.
            if (!window.matchMedia("(min-width: 64rem)").matches) return;

            const letters = Array.from(
                containerRef.current!.querySelectorAll<HTMLElement>("[data-letter]"),
            );

            // Measure in the original font, then lock both axes.
            // vertical-align: top anchors all letters to the same reference point
            // so a taller glyph from a swapped font cannot shift the baseline.
            // overflow: hidden clips any glyph that exceeds the locked box.
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
                            fontFamily:
                                FONT_POOL[Math.floor(Math.random() * FONT_POOL.length)],
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
        // Stagger the resume slightly so letters don't all swap at once.
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
            style={{ display: "inline-flex", verticalAlign: "top" }}
        >
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
