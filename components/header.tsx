"use client";
import Link from "next/link";
import { Logo, LogoIcon } from "@/components/logo";
import { Menu, X, ChevronDown } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        name: "Solutions",
        href: "/solutions",
        dropdown: [
            {
                name: "Knowledge & Decision Support",
                href: "/solutions#knowledge",
            },
            {
                name: "Agentic Workflows (with approvals)",
                href: "/solutions#agentic",
            },
            {
                name: "Intake & Processing (Docs/Data/Vision)",
                href: "/solutions#intake",
            },
            {
                name: "Finance & Back-Office Pipelines",
                href: "/solutions#finance",
            },
            { name: "View all solutions", href: "/solutions" },
        ],
    },
    {
        name: "Sprint",
        href: "/ops-efficiency-sprint",
        dropdown: [
            {
                name: "How it works",
                href: "/ops-efficiency-sprint#how-it-works",
            },
            {
                name: "Milestone Gate",
                href: "/ops-efficiency-sprint#milestone-gate",
            },
            { name: "Pricing", href: "/ops-efficiency-sprint#pricing" },
            {
                name: "Assumptions & Measurement",
                href: "/ops-efficiency-sprint#assumptions",
            },
        ],
    },
    {
        name: "Results",
        href: "/results",
        dropdown: [
            { name: "EUDR mini-case", href: "/results#eudr" },
            { name: "Results snapshots", href: "/results#snapshots" },
            { name: "Security & Governance", href: "/security" },
        ],
    },
    {
        name: "About",
        href: "/about",
        dropdown: [
            { name: "Team", href: "/about#team" },
            { name: "Principles", href: "/about#principles" },
            { name: "Contact", href: "/contact" },
        ],
    },
];

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
        null
    );

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header>
            <nav
                data-state={menuState && "active"}
                className="fixed z-50 w-full px-2"
            >
                <div
                    className={cn(
                        "mx-auto max-w-6xl px-6 transition-all duration-300 lg:px-12",
                        isScrolled &&
                            "bg-background/80 border border-border/50 backdrop-blur-xl rounded-2xl shadow-lg"
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <LogoIcon className="size-10" />
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={
                                    menuState == true
                                        ? "Close Menu"
                                        : "Open Menu"
                                }
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu
                                    className={`m-auto size-6 duration-200 ${
                                        menuState
                                            ? "rotate-180 scale-0 opacity-0"
                                            : ""
                                    }`}
                                />
                                <X
                                    className={`absolute inset-0 m-auto size-6 duration-200 ${
                                        menuState
                                            ? "rotate-0 scale-100 opacity-100"
                                            : "-rotate-180 scale-0 opacity-0"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index} className="relative group">
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground flex items-center gap-1 duration-150"
                                            onMouseEnter={() =>
                                                setActiveDropdown(item.name)
                                            }
                                        >
                                            <span>{item.name}</span>
                                            {item.dropdown && (
                                                <ChevronDown className="size-3" />
                                            )}
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {item.dropdown &&
                                            activeDropdown === item.name && (
                                                <div
                                                    className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50"
                                                    onMouseEnter={() =>
                                                        setActiveDropdown(
                                                            item.name
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setActiveDropdown(null)
                                                    }
                                                >
                                                    <div className="py-2">
                                                        {item.dropdown.map(
                                                            (
                                                                dropdownItem,
                                                                dropdownIndex
                                                            ) => (
                                                                <Link
                                                                    key={
                                                                        dropdownIndex
                                                                    }
                                                                    href={
                                                                        dropdownItem.href
                                                                    }
                                                                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-accent-foreground hover:bg-muted/50"
                                                                >
                                                                    {
                                                                        dropdownItem.name
                                                                    }
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Desktop CTAs */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="text-xs px-3 py-1.5"
                            >
                                <Link href="/contact">Book Call</Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="text-xs px-3 py-1.5"
                            >
                                <Link href="/assessment">Get Score</Link>
                            </Button>
                            <ModeToggle />
                        </div>

                        {/* Mobile Menu */}
                        <div
                            className={`bg-background lg:hidden mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap z-50 ${
                                menuState ? "block" : "hidden"
                            }`}
                        >
                            {/* Mobile CTAs */}
                            <div className="w-full space-y-3">
                                <Button asChild className="w-full">
                                    <Link
                                        href="/assessment"
                                        onClick={() => setMenuState(false)}
                                    >
                                        Get Ops Efficiency Score
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setMenuState(false)}
                                    >
                                        Book Architecture Call
                                    </Link>
                                </Button>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden w-full">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={() =>
                                                    setMenuState(false)
                                                }
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                            {item.dropdown && (
                                                <ul className="ml-4 mt-2 space-y-2">
                                                    {item.dropdown.map(
                                                        (
                                                            dropdownItem,
                                                            dropdownIndex
                                                        ) => (
                                                            <li
                                                                key={
                                                                    dropdownIndex
                                                                }
                                                            >
                                                                <Link
                                                                    href={
                                                                        dropdownItem.href
                                                                    }
                                                                    onClick={() =>
                                                                        setMenuState(
                                                                            false
                                                                        )
                                                                    }
                                                                    className="text-sm text-muted-foreground hover:text-accent-foreground block duration-150"
                                                                >
                                                                    {
                                                                        dropdownItem.name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
