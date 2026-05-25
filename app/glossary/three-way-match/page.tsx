import type { Metadata } from "next";
import Link from "next/link";

import { ThreeWayMatcher } from "@/components/glossary/three-way-matcher";

const LAST_UPDATED = "25 May 2026";
const READ_TIME = "12 min";

export const metadata: Metadata = {
    title: "Three-Way Match: Invoice, PO & Goods Receipt Matching | Invaritech",
    description:
        "How three-way matching works between invoice, purchase order, and goods receipt. An interactive matcher plus the seven canonical AP exceptions an agentic system catches.",
    alternates: { canonical: "https://www.invaritech.ai/glossary/three-way-match/" },
    openGraph: {
        title: "Three-Way Match: Invoice, PO & Goods Receipt Matching",
        description: "Interactive matcher plus the seven canonical AP exceptions an agentic system catches.",
        type: "article",
        url: "https://www.invaritech.ai/glossary/three-way-match/",
    },
};

export default function ThreeWayMatchPage() {
    return (
        <main className="site-page">
            <section className="doc-section">
                <div className="doc-container">
                    {/* Breadcrumb */}
                    <nav className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-foreground">Invaritech</Link>
                        <span className="mx-2">/</span>
                        <span>Glossary</span>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Three-Way Match</span>
                    </nav>

                    {/* Eyebrow + H1 */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px w-8 bg-primary/60" />
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                            Glossary · Reference
                        </p>
                    </div>

                    <h1 className="doc-hero-headline max-w-3xl">
                        Three-Way Match: Invoice, PO, and Goods Receipt Matching
                    </h1>

                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                        Three-way matching checks that an invoice, its purchase order, and the
                        goods receipt note all line up before a payment is released. It is the
                        backbone control most AP teams run by hand and the highest-leverage
                        workflow to automate. This page explains what it actually checks, what
                        breaks at scale, and what an agentic exception-routing system catches
                        that manual review misses.
                    </p>

                    {/* Byline */}
                    <div className="mt-8 border-y border-border py-4">
                        <p className="text-sm text-foreground">
                            By <strong>Aditi Garg</strong> · Founder &amp; Director, Invaritech
                        </p>
                        <p className="mt-1 max-w-2xl text-sm text-foreground-muted">
                            Aditi directs automation builds at Invaritech, including the EU TRACES
                            regulatory document workflow. She is now applying the same
                            exception-routing approach to finance and AP teams.
                        </p>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                            Last updated: {LAST_UPDATED} · {READ_TIME} read
                        </p>
                    </div>

                    {/* Primary CTA */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link href="/contact" className="site-button px-7">
                            Book a free Finance Exception Audit
                            <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                        </Link>
                        <a href="#matcher" className="site-button-secondary px-7">
                            Try the matcher below
                        </a>
                    </div>

                    {/* The tool */}
                    <div id="matcher" className="mt-12">
                        <ThreeWayMatcher />
                    </div>
                </div>
            </section>
        </main>
    );
}
