"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/logo";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuItems = [
    { name: "Home", href: "/", id: "01" },
    { name: "The Sprint", href: "/services/ai-automation-sprint/", id: "02" },
    { name: "Services", href: "/services/", id: "03" },
    { name: "Results", href: "/results/", id: "04" },
    { name: "Intel", href: "/blogs/", id: "05" }, // Renamed for "Bold" feel
    { name: "Contact", href: "/contact/", id: "06" },
];

export const HeroHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    // GSAP Animation for Menu
    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline();
            
            tl.to(menuRef.current, {
                y: "0%",
                duration: 0.8,
                ease: "power4.inOut",
            })
            .fromTo(".menu-item", 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".menu-footer",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                "-=0.2"
            );
        } else {
            gsap.to(menuRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "power4.inOut",
            });
        }
    }, [isOpen]);

    return (
        <header ref={containerRef} className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
            {/* Top Bar */}
            <div className="relative z-[102] flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
                {/* Logo - Always visible */}
                <Link 
                    href="/" 
                    className="pointer-events-auto flex items-center gap-3 group mix-blend-difference text-white"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative size-10 overflow-hidden">
                        <LogoIcon className="size-10 transition-transform duration-700 ease-in-out group-hover:rotate-180" />
                    </div>
                    <span className="font-bold tracking-tight text-xl hidden md:block">
                        INVARITECH
                    </span>
                </Link>

                {/* Menu Toggle Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto group relative flex items-center justify-center"
                    aria-label="Toggle Menu"
                >
                    <div className={cn(
                        "relative flex items-center justify-center size-14 md:size-16 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 shadow-lg",
                        isOpen ? "bg-transparent border-transparent" : "bg-black/20 hover:bg-white/10"
                    )}>
                        <div className="relative size-6">
                            <span className={cn(
                                "absolute left-0 w-full h-0.5 bg-white transition-all duration-300",
                                isOpen ? "top-[11px] rotate-45" : "top-[7px]"
                            )} />
                            <span className={cn(
                                "absolute left-0 w-full h-0.5 bg-white transition-all duration-300",
                                isOpen ? "top-[11px] -rotate-45" : "top-[15px]"
                            )} />
                        </div>
                    </div>
                </button>
            </div>

            {/* Menu Overlay */}
            <div 
                ref={menuRef}
                className="fixed inset-0 z-[101] w-full h-[100dvh] bg-[#050505] transform -translate-y-full pointer-events-auto flex flex-col"
            >
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Scrollable Container */}
                <div 
                    className="relative z-10 w-full h-full overflow-y-auto overscroll-contain"
                    data-lenis-prevent
                >
                    <div className="min-h-full flex flex-col justify-between p-6 md:p-12">
                         {/* Spacer for Top Bar */}
                        <div className="h-24 md:h-32 shrink-0" />

                        {/* Navigation Links */}
                        <nav className="flex flex-col items-center gap-2 md:gap-4 w-full max-w-4xl mx-auto my-12">
                            {menuItems.map((item) => (
                                <div key={item.name} className="menu-item w-full group">
                                    <Link 
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="relative flex items-center justify-between w-full p-4 md:p-6 border-b border-white/10 hover:border-white/40 transition-colors duration-300"
                                    >
                                        <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                            {item.id}
                                        </span>
                                        <span className={cn(
                                            "text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter transition-all duration-300 uppercase",
                                            pathname === item.href ? "text-primary" : "text-white/80 group-hover:text-white"
                                        )}>
                                            {item.name}
                                        </span>
                                        <ArrowUpRight className="size-6 md:size-10 text-muted-foreground group-hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0" />
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        {/* Footer Info in Menu */}
                        <div className="menu-footer w-full flex justify-between items-end text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-wider shrink-0">
                            <div className="hidden md:block">
                                Global Strategic Hubs<br />
                                US • HK • IN • MY
                            </div>
                            <div className="text-right">
                                <a href="mailto:hello@invaritech.ai" className="hover:text-white transition-colors">
                                    hello@invaritech.ai
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
