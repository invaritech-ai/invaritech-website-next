"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Terminal } from "lucide-react";
import {
    BOOK_MEETING_CTA,
    BOOK_MEETING_URL,
    BRAND_EYEBROW,
} from "@/lib/marketing";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ArtisticHomeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setMouse({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smooth interpolation could go here, but direct is more responsive for this effect
      setMouse({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 3D Flow Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const focalLength = 300;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const particleCount = Math.min(1500, (dimensions.width * dimensions.height) / 800);
    const particles: Particle[] = [];
    
    // Tech-focused palette: Cyan, Gold, White, Deep Blue
    const colors = [
      "rgba(58, 255, 213, 0.6)", // Cyan
      "rgba(255, 198, 46, 0.6)", // Gold
      "rgba(255, 255, 255, 0.8)", // White
      "rgba(255, 255, 255, 0.4)", // White Faint
      "rgba(0, 100, 255, 0.3)",  // Blue faint
    ];

    // Initialize Particles acting as a "Flow"
    // We want them to feel like data streams
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1000 + 200; // Start far out
        
      particles.push({
        x: Math.cos(theta) * radius,
        y: (Math.random() - 0.5) * dimensions.height * 2,
        z: Math.random() * 1000 + 500, // Deep depth
        vx: 0,
        vy: 0,
        vz: -2 - Math.random() * 3, // Move towards camera
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 0,
      });
    }

    const animate = () => {
      // Clear with very slight transparency for long trails
      ctx.fillStyle = "rgba(3, 3, 5, 0.2)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = centerX; // Shift based on mouse?
      const cy = centerY;

      particles.forEach((p) => {
        // Flow Architecture
        // Particles spiral towards the center as they approach the camera
        
        // 1. Move Forward
        p.z += p.vz;
        
        // 2. Rotation / Spiral effect based on Z depth
        // As they get closer (z decreases), they rotate faster
        const rotationSpeed = 0.002;
        const oldX = p.x;
        const oldY = p.y;
        
        p.x = oldX * Math.cos(rotationSpeed) - oldY * Math.sin(rotationSpeed);
        p.y = oldX * Math.sin(rotationSpeed) + oldY * Math.cos(rotationSpeed);
        
        // 3. Mouse Interaction - "Magnetic Field"
        // Gentle repulsion from mouse
        const dx = p.x - (mouse.x - centerX);
        const dy = p.y - (mouse.y - centerY);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 400;

        if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x += (dx / dist) * force * 20;
            p.y += (dy / dist) * force * 20;
        }
        
        // 4. Respawn
        if (p.z < 10) {
            p.z = 1500;
            const theta = Math.random() * Math.PI * 2;
            const radius = Math.random() * 800 + 200;
             p.x = Math.cos(theta) * radius;
             p.y = Math.sin(theta) * radius;
        }

        // Projection
        const scale = focalLength / p.z;
        // Parallax the center point based on mouse for "looking around" feel
        const parX = cx + (mouse.x - cx) * 0.02;
        const parY = cy + (mouse.y - cy) * 0.02;
        
        const screenX = p.x * scale + parX;
        const screenY = p.y * scale + parY;

        // Draw
        if (p.z > 0 && screenX > 0 && screenX < canvas.width && screenY > 0 && screenY < canvas.height) {
            const size = Math.max(0.7, p.size * scale);
            
            // Connect lines if close to center?
            // Maybe just drawing points is cleaner for "Data Dust" look
            
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connecting lines to nearby particles to form "neural net" structures occasionally
            // Expensive check, do sparsely?
            // Let's do a "scanner" effect - line sweeps across
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [dimensions, mouse]);

  return (
    <section className="relative min-h-screen w-full bg-[#030305] overflow-hidden flex flex-col items-center justify-center -mt-20 pt-20">
        {/* Canvas Layer */}
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 block w-full h-full opacity-60"
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)] pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
            
            {/* Tagline */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8 mt-32 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 px-4 backdrop-blur-md"
            >
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
                    {BRAND_EYEBROW}
                </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="max-w-6xl mx-auto flex flex-col gap-2 font-bold tracking-tighter text-white select-none">
                <motion.span 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-8xl lg:text-9xl leading-[0.9] block mix-blend-screen"
                >
                    BUILD
                </motion.span>
                <motion.span 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-5xl md:text-8xl lg:text-9xl leading-[0.9] block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-text-shimmer bg-[length:200%_auto]"
                >
                   GOVERNED AI
                </motion.span>
                <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-3xl md:text-6xl lg:text-7xl leading-[0.9] block text-white/40 font-light tracking-wide mt-2"
                >
                    ON YOUR INFRASTRUCTURE
                </motion.div>
            </h1>

            {/* Subheadline */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12 max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed"
            >
                In 30 days, we ship one production-grade AI automation for enterprise teams on top of your existing stack with governance built in: permissions, audit logs, fallbacks, and rollback.
                <span className="text-primary/80 block mt-2 font-mono text-sm uppercase tracking-widest">
                    No migration. No vendor lock-in. Measured before/after impact.
                </span>
            </motion.p>

            {/* CTAs */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex flex-col sm:flex-row items-center gap-6"
            >
                <Button 
                    asChild 
                    size="lg" 
                    className="h-14 px-8 rounded-none bg-primary text-black font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,140,0,0.3)]"
                >
                    <a href={BOOK_MEETING_URL} target="_blank" rel="noopener noreferrer">
                        {BOOK_MEETING_CTA} <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                </Button>
                
                 <Button 
                    asChild 
                    variant="outline"
                    size="lg" 
                    className="h-14 px-8 rounded-none border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 group"
                >
                    <Link href="/ai-automation-sprint/">
                        <Terminal className="mr-2 h-5 w-5 text-primary group-hover:text-white transition-colors" />
                        Explore the Sprint
                    </Link>
                </Button>
            </motion.div>

            {/* Proof Chips */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-20 flex flex-wrap justify-center gap-4 opacity-70"
            >
                {[
                    "Fixed scope: $10,000-$15,000 USD ($78,000-$117,000 HKD)",
                    "Governed by default: audit logs + approvals",
                    "Start in 1-2 weeks if qualified",
                    "Baseline + after KPI validation",
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-white/50">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {text}
                    </div>
                ))}
            </motion.div>

        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute left-10 top-1/3 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block"></div>
        <div className="absolute right-10 bottom-1/3 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block"></div>
    </section>
  );
}
