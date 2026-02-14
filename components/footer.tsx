import { Logo, LogoIcon } from "@/components/logo";
import Link from "next/link";

const navigationLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about/" },
    { title: "Services", href: "/services/" },
    { title: "Work", href: "/work/" },
    { title: "Blogs", href: "/blogs/" },
    { title: "Careers", href: "/careers/" },
    { title: "Contact", href: "/contact/" },
];

const companyLinks = [
    { title: "Privacy Policy", href: "/privacy/" },
    { title: "Terms of Service", href: "/terms/" },
];

export default function FooterSection() {
    return (
        <footer className="relative mt-20 overflow-hidden bg-background py-16 md:py-24">
            {/* Artistic Top Border - Glowing Line */}
            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(255,140,0,0.3)]"></div>
            
            {/* Ghost Typography Background Layer */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
                <span className="text-[15rem] md:text-[25rem] font-black tracking-tighter uppercase text-white">
                    INVARITECH
                </span>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                    
                    {/* Column 1: Brand & Slogan */}
                    <div className="flex flex-col gap-6 items-start lg:col-span-1">
                        <Link href="/" aria-label="go home" className="group">
                             <div className="flex items-center gap-3">
                                <LogoIcon className="size-12 group-hover:drop-shadow-[0_0_10px_rgba(255,140,0,0.5)] transition-all duration-300" />
                                <div className="flex flex-col items-center">
                                    <Logo />
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold text-center">Visionary Intelligence</span>
                                </div>
                             </div>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Engineering the edge of possibility. We build AI-enabled platforms and high-stakes automation for the next generation of industry leaders.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="lg:ml-auto">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Navigation</h3>
                        <ul className="space-y-4">
                            {navigationLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-white transition-all duration-300 hover:tracking-widest flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact & Links */}
                    <div className="lg:ml-auto">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Legal & Sync</h3>
                        <ul className="space-y-4">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-white transition-all duration-300"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Social & Call to Action */}
                    <div className="flex flex-col gap-8 lg:items-end">
                        <div className="flex flex-col lg:items-end gap-2">
                             <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Connect</h3>
                             <div className="flex gap-6">
                                <Link
                                    href="https://x.com/invaritechai"
                                    target="_blank"
                                    className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300"
                                    aria-label="X"
                                >
                                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </Link>
                                <Link
                                    href="https://linkedin.com/company/invaritechai"
                                    target="_blank"
                                    className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                                    </svg>
                                </Link>
                             </div>
                        </div>
                        
                        <div className="mt-auto pt-16 lg:pt-0">
                             <div className="h-[1px] w-full bg-border md:hidden mb-8"></div>
                             <p className="text-xs text-muted-foreground lg:text-right font-mono tracking-tighter">
                                © {new Date().getFullYear()} INVARITECH. <br className="hidden lg:block"/>
                                ALL SYSTEMS OPERATIONAL.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
