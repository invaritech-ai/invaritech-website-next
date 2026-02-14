"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

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

export default function Artistic404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  // Initialize dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        // Center mouse initially
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
      setMouse({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // 3D Config
    const focalLength = 400;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Particle System Configuration
    // Increase count for density in 3D space
    const particleCount = Math.min(3000, (dimensions.width * dimensions.height) / 300); 
    const particles: Particle[] = [];
    
    // Vibrant colors for the "warp" effect
    const colors = [
      "rgba(255, 255, 255, 0.9)", // Core Bright White
      "rgba(255, 140, 0, 0.8)",   // Brand Orange
      "rgba(255, 200, 50, 0.7)",  // Gold
      "rgba(100, 100, 100, 0.5)", // Deep Space Grey
    ];

    // Initialize 3D Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * dimensions.width * 2, // Wider spread for 3D
        y: (Math.random() - 0.5) * dimensions.height * 2,
        z: Math.random() * focalLength * 2, // Depth
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: Math.random() * 2, // Forward velocity
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }

    const animate = () => {
      // Clear with stronger trail for speed effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.3)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse influence on camera/vanishing point (parallax)
      // We shift the "center" based on mouse to look around
      const targetCX = mouse.x;
      const targetCY = mouse.y;
      
      // Smooth camera movement could go here, but direct is more responsive
      const cx = targetCX;
      const cy = targetCY;

      particles.forEach((p) => {
        // Move particle "out" of screen towards viewer (decreasing Z)
        // Or "into" screen (increasing Z)? 
        // "Going into the screen" -> Viewer moving forward -> Particles move Z- (towards camera)
        // Let's make them fly AT the camera for that "warp speed" feel
        p.z -= 2; // Speed of travel
        
        // Wrap around Z
        if (p.z <= 1) {
             p.z = focalLength * 2;
             p.x = (Math.random() - 0.5) * dimensions.width * 2;
             p.y = (Math.random() - 0.5) * dimensions.height * 2;
        }

        // Apply 3D Perspective Projection
        const scale = focalLength / p.z;
        const screenX = p.x * scale + cx;
        const screenY = p.y * scale + cy;

        // Mouse interaction (Swirl/Lateral movement)
        // We apply forces to X/Y world coordinates based on screen interaction?
        // Simpler: Just swirl the WORLD coordinates
        // actually, let's make the mouse repel/attract in world space for chaos
        
        // Simple world rotation based on mouse distance from center (optional)
        // p.x += p.vx;
        // p.y += p.vy;

        // Draw
        if (p.z > 0 && screenX > 0 && screenX < canvas.width && screenY > 0 && screenY < canvas.height) {
            const size = p.size * scale;
            const alpha = Math.min(1, (focalLength * 2 - p.z) / 500); // Fade in from distance
            
            ctx.beginPath();
            ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
            // Dynamic alpha based on depth
            const colorParts = p.color.match(/rgba\((\d+), (\d+), (\d+),/);
            if (colorParts) {
                ctx.fillStyle = `rgba(${colorParts[1]}, ${colorParts[2]}, ${colorParts[3]}, ${alpha})`;
            } else {
                ctx.fillStyle = p.color;
            }
            ctx.fill();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(requestRef.current);
  }, [dimensions, mouse]);

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden text-white font-sans selection:bg-primary/30">
        {/* Canvas Layer */}
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 block"
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center"
            >
                <div className="relative perspective-1000">
                    <h1 className="text-[12rem] md:text-[24rem] font-bold leading-none tracking-tighter opacity-5 select-none text-white blur-sm transform-gpu animate-pulse-slow">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                         <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mix-blend-screen z-20 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                            VOID
                        </h1>
                    </div>
                </div>
                
                <h2 className="mt-4 text-xl md:text-2xl font-light tracking-[0.5em] uppercase text-white/50 backdrop-blur-sm">
                    Event Horizon Reached
                </h2>
                
                <p className="mt-6 max-w-md mx-auto text-sm md:text-base text-gray-400 font-mono leading-relaxed">
                    The coordinates you seek have drifted into deep space.
                    <br />
                    Return to the known universe.
                </p>

                <div className="mt-12 pointer-events-auto">
                    <Button 
                        asChild 
                        variant="ghost" 
                        size="lg" 
                        className="rounded-full border border-white/10 bg-white/5 hover:bg-white/20 hover:scale-105 hover:tracking-widest text-white backdrop-blur-md transition-all duration-500 ease-out group"
                    >
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-2 transition-transform" />
                            Initiate Warp Jump
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
        
        {/* Vignette & Noise */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80"></div>
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.07] mix-blend-overlay"
             style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}
        ></div>
    </div>
  );
}
