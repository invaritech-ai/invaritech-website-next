import Link from "next/link";

import { Logo, LogoIcon } from "@/components/logo";
import { brandPositioning } from "@/lib/site-content/brand";
import {
    footerCompanyLinks,
    footerFinanceLinks,
    footerProofLinks,
} from "@/lib/site-content/navigation";

const legalLinks = [
    { title: "Privacy Policy", href: "/privacy/" },
    { title: "Terms of Service", href: "/terms/" },
];

const socialLinks = [
    {
        title: "X",
        href: "https://x.com/invaritechai",
        icon: (
            <svg className="site-footer-social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        title: "LinkedIn",
        href: "https://linkedin.com/company/invaritechai",
        icon: (
            <svg className="site-footer-social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
            </svg>
        ),
    },
];

function isExternalLink(href: string) {
    return href.startsWith("http");
}

function FooterLink({ href, title }: { href: string; title: string }) {
    const external = isExternalLink(href);

    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="site-footer-link"
        >
            {title}
        </Link>
    );
}

function FooterColumn({
    title,
    links,
    className,
}: {
    title: string;
    links: { label?: string; title?: string; href: string }[];
    className?: string;
}) {
    return (
        <nav aria-label={`${title} navigation`} className={className}>
            <h2 className="site-footer-heading">{title}</h2>
            <ul className="site-footer-link-list">
                {links.map((link) => (
                    <li key={link.href}>
                        <FooterLink href={link.href} title={link.label ?? link.title ?? ""} />
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function FooterSection() {
    const currentYear = new Intl.DateTimeFormat("en", {
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date());

    return (
        <footer className="site-footer">
            <div className="site-footer-watermark" aria-hidden="true">
                INVARITECH
            </div>

            <div className="site-footer-container">
                <div className="site-footer-grid">
                    <div className="site-footer-brand">
                        <Link href="/" aria-label="INVARITECH home" className="site-footer-logo-row">
                            <span className="site-footer-logo-mark" aria-hidden="true">
                                <LogoIcon className="site-footer-logo-icon" />
                            </span>
                            <span className="site-footer-logo-copy">
                                <Logo className="site-footer-logo-text" />
                                <span className="site-logo-strapline">Finance Ops & RegOps Automations</span>
                            </span>
                        </Link>

                        <p className="site-footer-text">{brandPositioning.footer}</p>
                    </div>

                    <FooterColumn
                        title="Company"
                        links={footerCompanyLinks}
                        className="site-footer-company-column"
                    />
                    <FooterColumn title="Finance Ops" links={footerFinanceLinks} />
                    <FooterColumn title="RegOps & Proof" links={footerProofLinks} />

                    <div className="site-footer-utility-column">
                        <FooterColumn title="Legal" links={legalLinks} />

                        <div>
                            <h2 className="site-footer-heading">Connect</h2>
                            <div className="site-footer-social-row">
                                {socialLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="site-footer-social-link"
                                        aria-label={link.title}
                                    >
                                        {link.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="site-footer-bottom">
                    <p>&copy; {currentYear} INVARITECH. All rights reserved.</p>
                    <p>Asia-based delivery. Founder-led. Built around existing systems.</p>
                </div>
            </div>
        </footer>
    );
}
