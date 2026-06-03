"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { LogoIcon } from "@/components/logo";
import { primaryDiagnosticCta } from "@/lib/site-content/brand";
import { primaryNavigation } from "@/lib/site-content/navigation";
import { cn } from "@/lib/utils";

const menuItems = primaryNavigation.map((item, index) => ({
    ...item,
    id: String(index + 1).padStart(2, "0"),
}));

const ctaLink = {
    label: primaryDiagnosticCta.label,
    href: primaryDiagnosticCta.href,
    id: String(menuItems.length + 1).padStart(2, "0"),
};

function isExternalLink(href: string) {
    return href.startsWith("http");
}

function normalizePath(path: string) {
    if (path === "/") return path;
    return path.replace(/\/$/, "");
}

function getActiveNavigationHref(pathname: string, currentHash: string) {
    const currentPath = normalizePath(pathname);
    const candidates = menuItems
        .filter((item) => !isExternalLink(item.href))
        .map((item) => {
            const [hrefWithoutQuery, hash] = item.href.split("#");
            const hrefBase = normalizePath(hrefWithoutQuery.split("?")[0]);
            const matchesHash = hash ? currentHash === `#${hash}` : true;
            const matchesPath =
                currentPath === hrefBase ||
                (hrefBase !== "/" && currentPath.startsWith(`${hrefBase}/`));

            if (!matchesPath || !matchesHash) return null;

            return {
                href: item.href,
                exact: currentPath === hrefBase,
                score: hrefBase.length + (hash ? 1000 : 0),
            };
        })
        .filter((candidate): candidate is { href: string; exact: boolean; score: number } =>
            Boolean(candidate),
        )
        .sort((a, b) => {
            if (a.exact !== b.exact) return a.exact ? -1 : 1;
            return b.score - a.score;
        });

    return candidates[0]?.href;
}

function isActivePath(activeHref: string | undefined, href: string) {
    if (!activeHref) return false;
    const [hrefWithoutQuery, hash] = href.split("#");
    const [activeWithoutQuery, activeHash] = activeHref.split("#");
    return (
        normalizePath(hrefWithoutQuery.split("?")[0]) ===
            normalizePath(activeWithoutQuery.split("?")[0]) &&
        (hash ?? "") === (activeHash ?? "")
    );
}

export const HeroHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentHash, setCurrentHash] = useState("");
    const pathname = usePathname();
    const mobileMenuId = useId();
    const activeHref = getActiveNavigationHref(pathname, currentHash);

    useEffect(() => {
        function updateHash() {
            setCurrentHash(window.location.hash);
        }

        updateHash();
        window.addEventListener("hashchange", updateHash);

        return () => window.removeEventListener("hashchange", updateHash);
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    const mobileItems = [...menuItems, ctaLink];

    return (
        <header className="site-shell-header">
            <div className="site-shell-header-inner">
                <Link
                    href="/"
                    className="site-shell-brand group"
                    aria-label="INVARITECH Finance Ops & RegOps Automations home"
                >
                    <span className="site-shell-brand-mark" aria-hidden="true">
                        <LogoIcon className="site-shell-brand-icon" />
                    </span>
                    <span className="site-shell-brand-copy">
                        <span className="site-shell-brand-name" translate="no">
                            INVARITECH
                        </span>
                        <span className="site-shell-brand-line">FINANCE OPS & REGOPS AUTOMATIONS</span>
                    </span>
                </Link>

                <nav className="site-shell-nav" aria-label="Primary navigation">
                    {menuItems.map((item) => {
                        const active = isActivePath(activeHref, item.href);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "site-shell-nav-link",
                                    active && "site-shell-nav-link-active",
                                )}
                                aria-current={active ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <Link href={ctaLink.href} className="site-shell-nav-cta">
                        {ctaLink.label}
                    </Link>
                </nav>

                <button
                    type="button"
                    className="site-shell-menu-button"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls={mobileMenuId}
                    onClick={() => setIsOpen((current) => !current)}
                >
                    Menu
                    <span className="site-shell-menu-icon" aria-hidden="true">
                        <span
                            className={cn(
                                "site-shell-menu-line site-shell-menu-line-first",
                                isOpen && "site-shell-menu-line-first-open",
                            )}
                        />
                        <span
                            className={cn(
                                "site-shell-menu-line site-shell-menu-line-second",
                                isOpen && "site-shell-menu-line-second-open",
                            )}
                        />
                    </span>
                </button>
            </div>

            {isOpen ? (
                <div id={mobileMenuId} className="site-shell-mobile-panel">
                    <nav className="site-shell-mobile-nav" aria-label="Mobile navigation">
                        {mobileItems.map((item) => {
                            const active = isActivePath(activeHref, item.href);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "site-shell-mobile-link group",
                                        active && "site-shell-mobile-link-active",
                                    )}
                                    aria-current={active ? "page" : undefined}
                                >
                                    <span className="site-shell-mobile-index">{item.id}</span>
                                    <span className="site-shell-mobile-title">{item.label}</span>
                                    <ArrowUpRight className="site-shell-mobile-arrow" aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="site-shell-mobile-footer">
                        Asia-based. Globally delivered.
                        <br />
                        Founder-led. Built around your existing systems.
                    </div>
                </div>
            ) : null}
        </header>
    );
};
