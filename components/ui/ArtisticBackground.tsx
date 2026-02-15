"use client";

import { useEffect, useRef } from "react";

export function ArtisticBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.1,
            });
        }

        let mouseX = 0;
        let mouseY = 0;
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw a subtle gradient overlay
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, "rgba(20, 20, 20, 0)");
            gradient.addColorStop(1, "rgba(30, 30, 30, 0.1)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                // Mouse interaction
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    p.vx -= Math.cos(angle) * force * 0.5;
                    p.vy -= Math.sin(angle) * force * 0.5;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Friction
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Keep constant minimum movement
                 if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.05;
                 if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.05;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 100, 100, ${p.alpha})`; // White/Grey particles
                ctx.fill();
            });

            rafId = requestAnimationFrame(render);
        };

        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-50 mix-blend-screen"
        />
    );
}
