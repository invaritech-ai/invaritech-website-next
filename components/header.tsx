"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { LogoIcon } from "@/components/logo";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Home", href: "/", id: "01" },
    { name: "Resources", href: "/resources/", id: "02" },
    { name: "Blog", href: "/blog/", id: "03" },
    { name: "Work", href: "/work/", id: "04" },
    { name: "About", href: "/about/", id: "05" },
    { name: "Free AP Controls Scan", href: "/contact/?scan=1", id: "06" },
];

function isExternalLink(href: string) {
    return href.startsWith("http");
}

function isActivePath(pathname: string, href: string) {
    if (isExternalLink(href)) {
        return false;
    }

    return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export const HeroHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const mobileMenuId = useId();

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

    const primaryLinks = menuItems.slice(0, -1);
    const ctaLink = menuItems[menuItems.length - 1];
    const ctaIsExternal = isExternalLink(ctaLink.href);

    return (
        <header className="site-shell-header">
            <div className="site-shell-header-inner">
                <Link href="/" className="site-shell-brand group" aria-label="INVARITECH home">
                    <span className="site-shell-brand-mark" aria-hidden="true">
                        <LogoIcon className="site-shell-brand-icon" />
                    </span>
                    <span className="site-shell-brand-copy">
                        <span className="site-shell-brand-name" translate="no">
                            INVARITECH
                        </span>
                        <span className="site-shell-brand-line">Payment Controls</span>
                    </span>
                </Link>

                <nav className="site-shell-nav" aria-label="Primary navigation">
                    {primaryLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "site-shell-nav-link",
                                isActivePath(pathname, item.href) && "site-shell-nav-link-active",
                            )}
                            aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href={ctaLink.href}
                        target={ctaIsExternal ? "_blank" : undefined}
                        rel={ctaIsExternal ? "noopener noreferrer" : undefined}
                        className="site-shell-nav-cta"
                    >
                        {ctaLink.name}
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
                        {menuItems.map((item) => {
                            const active = isActivePath(pathname, item.href);
                            const external = isExternalLink(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noopener noreferrer" : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "site-shell-mobile-link group",
                                        active && "site-shell-mobile-link-active",
                                    )}
                                    aria-current={active ? "page" : undefined}
                                >
                                    <span className="site-shell-mobile-index">{item.id}</span>
                                    <span className="site-shell-mobile-title">{item.name}</span>
                                    <ArrowUpRight className="site-shell-mobile-arrow" aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="site-shell-mobile-footer">
                        Asia-based AP payment controls
                        <br />
                        Founder-led. Dedicated team per client.
                    </div>
                </div>
            ) : null}
        </header>
    );
};
