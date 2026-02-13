"use client";

import { useEffect, useRef } from "react";

type ServiceTheme = "orange" | "blue" | "green" | "purple" | "crimson";

interface ServiceBackgroundProps {
    theme: ServiceTheme;
}

export function ServiceBackground({ theme }: ServiceBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationId: number;
        let time = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        // Mouse interaction
        let mouseX = width / 2;
        let mouseY = height / 2;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // --- THEME ENGINES ---

        // 1. ORANGE: "The Accelerator" (Warp Speed / Star Field)
        // High energy, velocity, focus.
        const renderOrange = () => {
            ctx.fillStyle = "rgba(10, 5, 0, 0.2)"; // Fade effect
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            
            // Warp speed effect
            for (let i = 0; i < 100; i++) {
                const angle = (i / 100) * Math.PI * 2 + time * 0.1;
                const radius = (Math.sin(time * 2 + i) + 1) * 200 + 50;
                
                const x = centerX + Math.cos(angle) * radius * (Math.sin(time) + 2);
                const y = centerY + Math.sin(angle) * radius;

                const size = Math.random() * 2 + 1;
                
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 165, 0, ${Math.random() * 0.5 + 0.2})`;
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                // Streaks
                if (Math.random() > 0.95) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(255, 200, 50, 0.4)";
                    ctx.lineWidth = 1;
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + (x - centerX) * 0.2, y + (y - centerY) * 0.2);
                    ctx.stroke();
                }
            }
        };

        // 2. BLUE: "The Orchestrator" (Hex Grid / Pulse)
        // Logic, structure, clean lines.
        const renderBlue = () => {
             ctx.clearRect(0, 0, width, height);
             // Gradient background
             const gradient = ctx.createLinearGradient(0, 0, width, height);
             gradient.addColorStop(0, "#050a14");
             gradient.addColorStop(1, "#0a1525");
             ctx.fillStyle = gradient;
             ctx.fillRect(0, 0, width, height);

             const gridSize = 60;
             const timeOffset = time * 0.5;

             ctx.strokeStyle = "rgba(50, 150, 255, 0.15)";
             ctx.lineWidth = 1;

             for (let x = 0; x < width + gridSize; x += gridSize) {
                 for (let y = 0; y < height + gridSize; y += gridSize) {
                     // Hexagon-ish offset
                     const offsetX = (y / gridSize) % 2 === 0 ? 0 : gridSize / 2;
                     const posX = x + offsetX;
                     const posY = y;

                     // Mouse influence
                     const dx = posX - mouseX;
                     const dy = posY - mouseY;
                     const dist = Math.sqrt(dx * dx + dy * dy);
                     const maxDist = 300;
                     const intensity = Math.max(0, 1 - dist / maxDist);

                     // Draw point
                     ctx.fillStyle = `rgba(100, 200, 255, ${0.1 + intensity * 0.5})`;
                     ctx.beginPath();
                     ctx.arc(posX, posY, 1 + intensity * 2, 0, Math.PI * 2);
                     ctx.fill();

                     // Connect lines occasionally
                     if ((x + y) % (gridSize * 3) === 0 || Math.random() > 0.99) {
                         ctx.beginPath();
                         ctx.moveTo(posX, posY);
                         ctx.lineTo(posX + gridSize, posY); // Right
                         ctx.stroke();
                     }
                     
                     // Vertical lines
                      if ((x + y) % (gridSize * 4) === 0) {
                         ctx.beginPath();
                         ctx.moveTo(posX, posY);
                         ctx.lineTo(posX, posY + gridSize); // Down
                         ctx.stroke();
                     }

                     // Pulse pulses
                     if (Math.sin(time + x * 0.01 + y * 0.01) > 0.98) {
                         ctx.fillStyle = "rgba(150, 230, 255, 0.6)";
                         ctx.beginPath();
                         ctx.arc(posX, posY, 3, 0, Math.PI * 2);
                         ctx.fill();
                     }
                 }
             }
        };

         // 3. GREEN: "The Weaver" (Moire / Fabric)
         // Overlapping waves, interference, synthesis.
        const renderGreen = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#051005";
            ctx.fillRect(0, 0, width, height);

            ctx.lineWidth = 1;
            
            const waves = 20;
            const step = height / waves;

            for (let i = 0; i < waves * 2; i++) {
                ctx.beginPath();
                const yBase = i * step * 0.5;
                // Layer 1
                ctx.strokeStyle = `rgba(50, 200, 100, 0.1)`;
                for (let x = 0; x < width; x += 20) {
                    const y = yBase + Math.sin(x * 0.01 + time + i * 0.5) * 50;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Layer 2 (Interference)
                ctx.beginPath();
                 ctx.strokeStyle = `rgba(100, 255, 150, 0.05)`;
                for (let x = 0; x < width; x += 15) {
                    const y = yBase + Math.sin(x * 0.015 - time + i * 0.3) * 40;
                     if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Matrix rain-like subtle drops
            for (let i = 0; i < 10; i++) {
                const x = Math.random() * width;
                const y = (time * 100 + Math.random() * height) % height;
                ctx.fillStyle = "rgba(50, 255, 100, 0.3)";
                ctx.fillRect(x, y, 2, 10);
            }
        };

        // 4. PURPLE: "The Neural Mind" (Swirling Particles / Brain)
        // Intelligence, depth, rotation.
        const renderPurple = () => {
            ctx.fillStyle = "rgba(10, 5, 20, 0.3)"; // Trails
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.3;

            // 3D Rotation approximate
            const t = time * 0.5;
            
            for (let i = 0; i < 200; i++) {
                // Sphere points
                const theta = Math.acos(-1 + (2 * i) / 200);
                const phi = Math.sqrt(200 * Math.PI) * theta;

                // Rotate
                let x = radius * Math.sin(theta) * Math.cos(phi);
                let y = radius * Math.sin(theta) * Math.sin(phi);
                let z = radius * Math.cos(theta);

                // Rotate around Y
                const x1 = x * Math.cos(t) - z * Math.sin(t);
                const z1 = x * Math.sin(t) + z * Math.cos(t);
                x = x1; z = z1;

                // Rotate around X (mouse interaction)
                const mouseAngle = (mouseY / height - 0.5) * 2;
                const y2 = y * Math.cos(mouseAngle) - z * Math.sin(mouseAngle);
                const z2 = y * Math.sin(mouseAngle) + z * Math.cos(mouseAngle);
                y = y2; z = z2;

                // Project
                const scale = 300 / (300 + z);
                const x2d = x * scale + centerX;
                const y2d = y * scale + centerY;

                const alpha = (z + radius) / (2 * radius); // Depth cue

                ctx.beginPath();
                ctx.fillStyle = `rgba(180, 100, 255, ${alpha * 0.8})`;
                ctx.arc(x2d, y2d, scale * 2, 0, Math.PI * 2);
                ctx.fill();

                // Connections
                if (Math.random() > 0.98) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(200, 150, 255, ${alpha * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(x2d, y2d);
                    ctx.stroke();
                }
            }
        };


        const render = () => {
            time += 0.01;

            if (theme === "orange") renderOrange();
            else if (theme === "blue") renderBlue();
            else if (theme === "green") renderGreen();
            else if (theme === "purple") renderPurple();
            
            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none mix-blend-screen opacity-60"
        />
    );
}
