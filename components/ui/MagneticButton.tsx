"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    strength?: number; // How strong the magnetic pull is (default 0.5)
    textClassName?: string;
}

export function MagneticButton({ 
    children, 
    className, 
    strength = 0.5,
    textClassName,
    ...props 
}: MagneticButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const button = buttonRef.current;
        const text = textRef.current;

        if (!container || !button || !text) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 1,
                ease: "power4.out",
            });

            gsap.to(text, {
                x: x * (strength * 0.2), // Much more subtle text movement
                y: y * (strength * 0.2),
                duration: 1,
                ease: "power4.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to([button, text], {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)",
            });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={containerRef} className="relative inline-block">
            <button
                ref={buttonRef}
                className={cn(
                    "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium border border-primary/20 bg-background/50 backdrop-blur-sm transition-colors hover:border-primary group rounded-full",
                    className
                )}
                {...props}
            >
                <span ref={textRef} className={cn("relative z-10 flex items-center gap-2 group-hover:text-primary transition-colors", textClassName)}>
                    {children}
                </span>
                <div className="absolute inset-0 z-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl" />
            </button>
        </div>
    );
}
