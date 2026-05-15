"use client";

import { useEffect, useRef } from "react";

export default function SiteSpotlight() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            el.style.setProperty("--sx", `${e.clientX}px`);
            el.style.setProperty("--sy", `${e.clientY}px`);
            el.style.opacity = "1";
        };

        const onLeave = () => (el.style.opacity = "0");

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", onLeave);
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return <div ref={ref} aria-hidden="true" className="site-spotlight" />;
}
