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
    { name: "Intel", href: "/blog/", id: "04" },
    { name: "Tools", href: "/tools/", id: "05" },
    { name: "Contact", href: "/contact/", id: "06" },
];

export const HeroHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline();

            tl.to(menuRef.current, {
                y: "0%",
                duration: 0.7,
                ease: "power3.inOut",
            })
            .fromTo(".menu-item",
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
                "-=0.35"
            )
            .fromTo(".menu-footer",
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                "-=0.15"
            );
        } else {
            gsap.to(menuRef.current, {
                y: "-100%",
                duration: 0.7,
                ease: "power3.inOut",
            });
        }
    }, [isOpen]);

    return (
        <header ref={containerRef} className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
            <div className="relative z-[102] flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
                <Link
                    href="/"
                    className="pointer-events-auto inline-flex min-h-10 items-center gap-3 group"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="relative flex size-10 items-center justify-center overflow-hidden">
                        <LogoIcon className="size-9 transition-transform duration-700 ease-in-out group-hover:rotate-180" />
                    </div>
                    <span className="font-semibold tracking-tight text-lg text-foreground hidden md:block">
                        INVARITECH
                    </span>
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto group relative flex items-center justify-center"
                    aria-label="Toggle Menu"
                >
                    <div className={cn(
                        "relative flex items-center justify-center size-12 md:size-14 rounded-full transition-all duration-300 border",
                        isOpen ? "bg-transparent border-transparent" : "bg-background/60 backdrop-blur-md border-border hover:border-foreground/30"
                    )}>
                        <div className="relative size-5">
                            <span className={cn(
                                "absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300",
                                isOpen ? "top-[9px] rotate-45" : "top-[5px]"
                            )} />
                            <span className={cn(
                                "absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300",
                                isOpen ? "top-[9px] -rotate-45" : "top-[13px]"
                            )} />
                        </div>
                    </div>
                </button>
            </div>

            <div
                ref={menuRef}
                className="fixed inset-0 z-[101] w-full h-[100dvh] bg-[#FAFAF7] transform -translate-y-full pointer-events-auto flex flex-col"
            >
                <div className="absolute inset-0 z-0 opacity-[0.03] grain-overlay" />

                <div
                    className="relative z-10 w-full h-full overflow-y-auto overscroll-contain"
                    data-lenis-prevent
                >
                    <div className="min-h-full flex flex-col justify-between p-6 md:p-12">
                        <div className="h-20 md:h-24 shrink-0" />

                        <nav className="flex flex-col items-center gap-1 md:gap-2 w-full max-w-4xl mx-auto my-12">
                            {menuItems.map((item) => (
                                <div key={item.name} className="menu-item w-full group">
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="relative flex min-h-12 items-center justify-between w-full px-4 md:px-6 py-3 md:py-5 border-b border-border/60 hover:border-primary/40 transition-colors duration-300"
                                    >
                                        <span className="text-xs font-mono text-foreground-muted group-hover:text-primary transition-colors duration-300">
                                            {item.id}
                                        </span>
                                        <span className={cn(
                                            "font-editorial text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tight transition-all duration-300",
                                            pathname === item.href ? "text-primary" : "text-foreground/90 group-hover:text-foreground"
                                        )}>
                                            {item.name}
                                        </span>
                                        <ArrowUpRight className="size-5 md:size-8 text-foreground-muted group-hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0" />
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        <div className="menu-footer w-full flex justify-between items-end text-xs md:text-sm font-mono text-foreground-muted uppercase tracking-wider shrink-0">
                            <div className="hidden md:block">
                                Global Strategic Hubs<br />
                                US &middot; HK &middot; IN &middot; MY
                            </div>
                            <div className="text-right">
                                <a
                                    href="mailto:hello@invaritech.ai"
                                    className="inline-flex min-h-10 items-center px-2 hover:text-foreground transition-colors"
                                >
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
