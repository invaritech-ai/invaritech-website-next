"use client";

import { useEffect, useRef } from "react";

export type ServiceTheme = "orange" | "blue" | "green" | "purple" | "crimson" | "teal";

interface ServiceBackgroundProps {
    theme: ServiceTheme;
}

export function ServiceBackground({ theme }: ServiceBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationId: number;
        let time = 0;

        // Mouse State
        const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // --- ENGINES ---

        // 1. ORANGE: "The Accelerator" 
        // A 3D Hyper-Tunnel. Particles flow towards the camera with extreme velocity.
        // It creates a sense of "Sprint" speed.
        const stars: { x: number; y: number; z: number; oZ: number }[] = [];
        for (let i = 0; i < 400; i++) stars.push({ x: (Math.random() - 0.5) * width, y: (Math.random() - 0.5) * height, z: Math.random() * width, oZ: Math.random() * width });

        const renderOrange = () => {
            ctx.fillStyle = "rgba(5, 2, 0, 0.3)"; // Trail fade
            ctx.fillRect(0, 0, width, height);
            
            const cx = width / 2 + (mouse.x - width/2) * 0.1;
            const cy = height / 2 + (mouse.y - height/2) * 0.1;

            stars.forEach((star) => {
                star.z -= 15; // Speed
                if (star.z <= 0) {
                    star.z = width;
                    star.x = (Math.random() - 0.5) * width;
                    star.y = (Math.random() - 0.5) * height;
                }

                const k = 256 / star.z;
                const px = star.x * k + cx;
                const py = star.y * k + cy;

                const size = (1 - star.z / width) * 4;
                const alpha = (1 - star.z / width);

                if (px >= 0 && px <= width && py >= 0 && py <= height) {
                    // Star core
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255, 180, 50, ${alpha})`;
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Optional streak for speed
                    const kOld = 256 / (star.z + 20);
                    const pxOld = star.x * kOld + cx;
                    const pyOld = star.y * kOld + cy;
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 100, 0, ${alpha * 0.5})`;
                    ctx.lineWidth = size * 0.5;
                    ctx.moveTo(px, py);
                    ctx.lineTo(pxOld, pyOld);
                    ctx.stroke();
                }
            });
        };


        // 2. BLUE: "The Orchestrator"
        // A Logic Grid that is NOT blinking. It scans.
        // Hexagonal nodes that light up in waves or logic paths.
        const nodes: {x: number, y: number, active: number}[] = [];
        const gridSize = 60;
        // Init happens in render or once? Init once.
        // But width/height change. We'll strict init in loop for robustness or re-init on resize.
        // Let's do a dynamic grid calc in loop for simplicity of resizing.
        
        const renderBlue = () => {
             ctx.clearRect(0, 0, width, height);

             // Gradient
             const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, width/2, height/2, width);
             g.addColorStop(0, "rgba(20, 40, 60, 0.1)");
             g.addColorStop(1, "rgba(5, 10, 20, 0)");
             ctx.fillStyle = g;
             ctx.fillRect(0, 0, width, height);
             
             const cols = Math.ceil(width / gridSize) + 1;
             const rows = Math.ceil(height / gridSize) + 1;

             for (let y = 0; y < rows; y++) {
                 for (let x = 0; x < cols; x++) {
                     const offsetX = (y % 2) * (gridSize / 2);
                     const px = x * gridSize + offsetX - gridSize/2;
                     const py = y * (gridSize * 0.866) - gridSize/2;

                     // Wave logic
                     const d = Math.sqrt((px - mouse.x)**2 + (py - mouse.y)**2);
                     const wave = Math.sin(d * 0.01 - time * 2); 
                     
                     // Activation
                     const active = wave > 0.8 ? (wave - 0.8) * 5 : 0; 

                     // Hex Point
                     ctx.beginPath();
                     ctx.fillStyle = `rgba(50, 150, 255, ${0.1 + active * 0.5})`;
                     ctx.arc(px, py, 1 + active * 2, 0, Math.PI * 2);
                     ctx.fill();

                     // Connection Lines (neighbors)
                     if (active > 0.1) {
                         // Connect to right
                         ctx.beginPath();
                         ctx.strokeStyle = `rgba(50, 200, 255, ${active * 0.3})`;
                         ctx.moveTo(px, py);
                         ctx.lineTo(px + gridSize, py);
                         ctx.stroke();

                         // Connect to bottom right
                         ctx.beginPath();
                         ctx.moveTo(px, py);
                         ctx.lineTo(px + gridSize/2, py + gridSize*0.866);
                         ctx.stroke();
                     }
                 }
             }

             // Logic Packets (Data flow)
             const packetCount = 5;
             for (let i = 0; i < packetCount; i++) {
                 const t = (time + i * (Math.PI*2/packetCount)) * 0.5;
                 const pathY = Math.floor(height/2/gridSize) * gridSize * 0.866;
                 const pathX = (t * 200) % (width + 200) - 100;
                 
                 ctx.shadowBlur = 10;
                 ctx.shadowColor = "#00ffff";
                 ctx.fillStyle = "#ffffff";
                 ctx.beginPath();
                 ctx.arc(pathX, pathY, 3, 0, Math.PI * 2);
                 ctx.fill();
                 ctx.shadowBlur = 0;
             }
        };


        // 3. GREEN: "The Weaver"
        // Flow Field. Smooth, silk-like lines moving organically.
        const particleCount = 200;
        const particles: {x: number, y: number, vx: number, vy: number, life: number}[] = [];
        
        for (let i=0; i<particleCount; i++) {
             particles.push({ 
                 x: Math.random() * width, 
                 y: Math.random() * height,
                 vx: 0, 
                 vy: 0,
                 life: Math.random() * 100 
            });
        }

        const renderGreen = () => {
             // Fade Effect
             ctx.fillStyle = "rgba(5, 15, 5, 0.1)";
             ctx.fillRect(0, 0, width, height);

             particles.forEach(p => {
                 // Perlin-ish Noise
                 const angle = (Math.sin(p.x * 0.005 + time * 0.2) + Math.cos(p.y * 0.005 + time * 0.1)) * Math.PI;
                 
                 p.vx += Math.cos(angle) * 0.1;
                 p.vy += Math.sin(angle) * 0.1;

                 // Dampen
                 p.vx *= 0.95;
                 p.vy *= 0.95;

                 const oldX = p.x;
                 const oldY = p.y;
                 p.x += p.vx * 3;
                 p.y += p.vy * 3;

                 // Mouse Repel
                 const dx = p.x - mouse.x;
                 const dy = p.y - mouse.y;
                 const d = Math.sqrt(dx*dx + dy*dy);
                 if (d < 200) {
                     p.vx += (dx/d) * 0.5;
                     p.vy += (dy/d) * 0.5;
                 }

                 // Wrap
                 if (p.x < 0) p.x = width;
                 if (p.x > width) p.x = 0;
                 if (p.y < 0) p.y = height;
                 if (p.y > height) p.y = 0;

                 // Draw Silk
                 ctx.beginPath();
                 ctx.strokeStyle = `rgba(50, 255, 100, ${d < 200 ? 0.8 : 0.2})`;
                 ctx.lineWidth = 1;
                 ctx.moveTo(oldX, oldY);
                 ctx.lineTo(p.x, p.y);
                 ctx.stroke();
             });
        };


        // 4. PURPLE: "Synaptic Conversation"
        // A living neural network. Neural centers pulse asynchronously.
        // Signals travel along organic Bezier curves between centers.
        // Mouse triggers cascading activations like asking a question.

        // Neural centers
        const neuronCount = 40;
        const neurons: { x: number; y: number; radius: number; phase: number; freq: number; energy: number; connections: number[] }[] = [];
        for (let i = 0; i < neuronCount; i++) {
            neurons.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: 3 + Math.random() * 5,
                phase: Math.random() * Math.PI * 2,
                freq: 0.3 + Math.random() * 0.7, // Each neuron breathes at its own rate
                energy: 0, // 0 = resting, 1 = fully fired
                connections: [],
            });
        }

        // Build connections: each neuron connects to its 3-5 nearest neighbors
        for (let i = 0; i < neuronCount; i++) {
            const dists: { idx: number; d: number }[] = [];
            for (let j = 0; j < neuronCount; j++) {
                if (j === i) continue;
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                dists.push({ idx: j, d: Math.sqrt(dx * dx + dy * dy) });
            }
            dists.sort((a, b) => a.d - b.d);
            const connCount = 3 + Math.floor(Math.random() * 3);
            neurons[i].connections = dists.slice(0, connCount).map(d => d.idx);
        }

        // Signals traveling along connections
        const signals: { from: number; to: number; progress: number; speed: number }[] = [];

        const renderPurple = () => {
            // Ethereal fade — leaves trails that create depth
            ctx.fillStyle = "rgba(5, 0, 15, 0.12)";
            ctx.fillRect(0, 0, width, height);

            // --- Mouse Cascade: neurons near cursor get energized ---
            for (const n of neurons) {
                const dx = n.x - mouse.x;
                const dy = n.y - mouse.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 200) {
                    n.energy = Math.min(1, n.energy + 0.03 * (1 - d / 200));
                }
            }

            // --- Draw connections (dim base layer) ---
            ctx.lineWidth = 0.5;
            for (let i = 0; i < neuronCount; i++) {
                const n = neurons[i];
                for (const j of n.connections) {
                    const m = neurons[j];
                    // Bezier control point: perpendicular offset for organic curve
                    const mx = (n.x + m.x) / 2;
                    const my = (n.y + m.y) / 2;
                    const dx = m.x - n.x;
                    const dy = m.y - n.y;
                    const perpX = mx + dy * 0.15 * Math.sin(time * 0.5 + i);
                    const perpY = my - dx * 0.15 * Math.cos(time * 0.5 + j);

                    const connectionEnergy = Math.max(n.energy, neurons[j].energy);
                    const alpha = 0.03 + connectionEnergy * 0.15;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(120, 60, 200, ${alpha})`;
                    ctx.moveTo(n.x, n.y);
                    ctx.quadraticCurveTo(perpX, perpY, m.x, m.y);
                    ctx.stroke();
                }
            }

            // --- Update and draw signals ---
            // Spawn signals from energized neurons
            for (let i = 0; i < neuronCount; i++) {
                if (neurons[i].energy > 0.5 && Math.random() > 0.85 && signals.length < 60) {
                    const targets = neurons[i].connections;
                    if (targets.length > 0) {
                        const target = targets[Math.floor(Math.random() * targets.length)];
                        signals.push({ from: i, to: target, progress: 0, speed: 0.01 + Math.random() * 0.02 });
                    }
                }
            }

            for (let s = signals.length - 1; s >= 0; s--) {
                const sig = signals[s];
                sig.progress += sig.speed;

                const n = neurons[sig.from];
                const m = neurons[sig.to];
                const mx = (n.x + m.x) / 2;
                const my = (n.y + m.y) / 2;
                const dx = m.x - n.x;
                const dy = m.y - n.y;
                const perpX = mx + dy * 0.15 * Math.sin(time * 0.5 + sig.from);
                const perpY = my - dx * 0.15 * Math.cos(time * 0.5 + sig.to);

                // Quadratic Bezier interpolation
                const t = sig.progress;
                const it = 1 - t;
                const px = it * it * n.x + 2 * it * t * perpX + t * t * m.x;
                const py = it * it * n.y + 2 * it * t * perpY + t * t * m.y;

                // Signal glow (bright core + halo)
                const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
                grad.addColorStop(0, "rgba(220, 180, 255, 0.9)");
                grad.addColorStop(0.4, "rgba(140, 80, 255, 0.4)");
                grad.addColorStop(1, "rgba(80, 20, 180, 0)");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(px, py, 12, 0, Math.PI * 2);
                ctx.fill();

                // Bright core
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                ctx.fill();

                if (sig.progress >= 1) {
                    // Signal arrived — energize the target neuron (cascade!)
                    neurons[sig.to].energy = Math.min(1, neurons[sig.to].energy + 0.4);
                    signals.splice(s, 1);
                }
            }

            // --- Draw neurons ---
            for (const n of neurons) {
                // Breathing pulse
                const breath = Math.sin(time * n.freq + n.phase) * 0.3 + 0.7;
                const r = n.radius * breath;

                // Energy decay
                n.energy *= 0.985;

                // Outer halo (energy-dependent)
                if (n.energy > 0.1) {
                    const haloR = r * (2 + n.energy * 4);
                    const haloGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
                    haloGrad.addColorStop(0, `rgba(160, 100, 255, ${n.energy * 0.3})`);
                    haloGrad.addColorStop(0.5, `rgba(100, 40, 200, ${n.energy * 0.1})`);
                    haloGrad.addColorStop(1, "rgba(60, 10, 150, 0)");
                    ctx.fillStyle = haloGrad;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Core glow
                const coreGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 1.5);
                coreGrad.addColorStop(0, `rgba(200, 160, 255, ${0.4 + n.energy * 0.6})`);
                coreGrad.addColorStop(1, "rgba(100, 40, 200, 0)");
                ctx.fillStyle = coreGrad;
                ctx.beginPath();
                ctx.arc(n.x, n.y, r * 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Bright center dot
                ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + n.energy * 0.7})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, r * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // 5. CRIMSON: "The Architect" 
        // Isometric Blocks.
        const renderCrimson = () => {
             ctx.clearRect(0, 0, width, height);

             const isoW = 50;
             const isoH = 25;
             const cols = Math.ceil(width / isoW) + 2;
             const rows = Math.ceil(height / isoH) + 2;

             for (let r = 0; r < rows; r++) {
                 for (let c = 0; c < cols; c++) {
                     const offX = (r % 2) * (isoW / 2);
                     const x = c * isoW - isoW + offX;
                     const y = r * (isoH / 2) - isoH;

                     const d = Math.sqrt((x - mouse.x)**2 + (y - mouse.y)**2);
                     const wave = Math.sin(d * 0.015 - time * 3) * 30;
                     const h = Math.max(0, wave + 20);

                     if (h > 5) {
                         // Top Face
                         ctx.fillStyle = `rgba(255, 50, 50, ${0.1 + h/100})`;
                         ctx.beginPath();
                         ctx.moveTo(x, y - h);
                         ctx.lineTo(x + isoW/2, y - isoH/2 - h);
                         ctx.lineTo(x, y - isoH - h);
                         ctx.lineTo(x - isoW/2, y - isoH/2 - h);
                         ctx.fill();
                         
                         // Edge Highlight
                         ctx.strokeStyle = `rgba(255, 100, 100, 0.3)`;
                         ctx.stroke();
                     }
                 }
             }
        }

        // 6. TEAL: "The Compass"
        // Radar Scan.
        const renderTeal = () => {
             ctx.fillStyle = "rgba(0, 10, 10, 0.1)"; // Trails
             ctx.fillRect(0, 0, width, height);
             
             const cx = width/2; 
             const cy = height/2;
             const maxR = Math.max(width, height) * 0.6;
             
             // Scan
             const angle = time * 2;
             
             ctx.beginPath();
             ctx.moveTo(cx, cy);
             ctx.arc(cx, cy, maxR, angle, angle + 0.2);
             ctx.lineTo(cx, cy);
             const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
             g.addColorStop(0, "rgba(0, 255, 200, 0)");
             g.addColorStop(1, "rgba(0, 255, 200, 0.1)");
             ctx.fillStyle = g;
             ctx.fill();

             // Blips
             if (Math.random() > 0.92) {
                 const r = Math.random() * maxR;
                 const a = Math.random() * Math.PI * 2;
                 const x = cx + Math.cos(a) * r;
                 const y = cy + Math.sin(a) * r;
                 
                 ctx.fillStyle = "#00ffcc";
                 ctx.fillRect(x, y, 3, 3);
             }

             // Rings
             ctx.strokeStyle = "rgba(0, 255, 200, 0.15)";
             ctx.lineWidth = 1;
             [0.2, 0.4, 0.6, 0.8].forEach(scale => {
                 ctx.beginPath();
                 ctx.arc(cx, cy, height * 0.4 * scale, 0, Math.PI * 2);
                 ctx.stroke();
             });
             
             // Crosshair
             ctx.beginPath();
             ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
             ctx.moveTo(0, cy); ctx.lineTo(width, cy);
             ctx.setLineDash([5, 15]);
             ctx.stroke();
             ctx.setLineDash([]);
        }

        // --- LOOP ---

        const render = () => {
            // Smooth mouse
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
            time += 0.01;

            if (theme === "orange") renderOrange();
            else if (theme === "blue") renderBlue();
            else if (theme === "green") renderGreen();
            else if (theme === "purple") renderPurple();
            else if (theme === "crimson") renderCrimson();
            else if (theme === "teal") renderTeal();

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
            className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen opacity-100" // Increased opacity for boldness
        />
    );
}
