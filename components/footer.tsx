import { Logo, LogoIcon } from "@/components/logo";
import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const footerSections = [
    {
        title: "Security & Governance",
        links: [
            { name: "Security Overview", href: "/security" },
            { name: "Compliance", href: "/security#compliance" },
            { name: "Data Handling", href: "/security#data-handling" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", href: "/resources" },
            { name: "Case Studies", href: "/results" },
            { name: "Sprint Overview", href: "/ops-efficiency-sprint" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "DPA", href: "/dpa" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
            { name: "Assessment", href: "/assessment" },
        ],
    },
];

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit"
                >
                    <div className="flex flex-col items-center gap-2">
                        <LogoIcon className="size-20" />
                        <Logo />
                    </div>
                </Link>

                {/* Footer Sections */}
                <div className="my-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {footerSections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h3 className="mb-4 font-semibold text-sm">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary block duration-150"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Social Links */}
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="https://x.com/invaritechai?s=21&t=ECORxk4YJbibzdLPBGw6Vw"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X/Twitter"
                        className="text-muted-foreground hover:text-primary block"
                    >
                        <Twitter className="size-6" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/company/invaritechltd/about/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-muted-foreground hover:text-primary block"
                    >
                        <Linkedin className="size-6" />
                    </Link>
                    <Link
                        href="https://www.instagram.com/invaritech?igsh=MTF4d2JqcGRxbG1mcQ%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-muted-foreground hover:text-primary block"
                    >
                        <Instagram className="size-6" />
                    </Link>
                </div>

                {/* Asterisk Note */}
                <div className="my-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        * See full assumptions and measurement methodology{" "}
                        <Link
                            href="/ops-efficiency-sprint#assumptions"
                            className="text-primary hover:underline"
                        >
                            here
                        </Link>
                    </p>
                </div>

                <span className="text-muted-foreground block text-center text-sm">
                    © {new Date().getFullYear()} Invaritech, All rights reserved
                </span>
            </div>
        </footer>
    );
}
