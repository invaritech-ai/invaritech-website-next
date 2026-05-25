import type { Metadata } from "next";
import Link from "next/link";

import { ThreeWayMatcher } from "@/components/glossary/three-way-matcher";

const LAST_UPDATED = "25 May 2026";
const READ_TIME = "12 min";

function GlossaryH2({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
    return (
        <header className="mt-16 mb-6">
            <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-primary/60" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                    {eyebrow}
                </p>
            </div>
            <h2 id={id} className="text-3xl font-medium text-foreground site-font-display">
                {children}
            </h2>
        </header>
    );
}

function GlossaryProse({ children }: { children: React.ReactNode }) {
    return (
        <div className="glossary-prose max-w-2xl text-foreground space-y-5 text-[17px] leading-[1.75]">
            {children}
        </div>
    );
}

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

                    {/* Long-form content */}
                    <article className="mt-20">
                        {/* Section 1 */}
                        <GlossaryH2 id="what-it-checks" eyebrow="Section 01">
                            What three-way matching actually checks
                        </GlossaryH2>
                        <GlossaryProse>
                            <p>
                                Three-way matching is a join across three finance documents. An invoice
                                from the supplier. A purchase order from your procurement system. A goods
                                receipt note from your warehouse or receiving team. If all three line up
                                on supplier, amount, quantity, and item, the invoice passes for payment.
                                If any one of them disagrees, the invoice becomes an exception that needs
                                review.
                            </p>
                            <p>
                                The control exists for separation of duties. The buyer placed the order.
                                The receiving team confirmed what arrived. The finance team is about to
                                move money. Each document is generated by a different function, and the
                                three-way join catches drift between them: short deliveries, price changes
                                after the PO was cut, invoices for goods never received, or invoices
                                issued twice against the same PO.
                            </p>
                            <p>
                                The join key is the PO number. Everything else hangs off that join.
                                Vendor must agree across all three. Amount must agree between invoice
                                and PO within a tolerance band. Quantity must agree between invoice and
                                goods receipt. Line description is the soft check that catches outright
                                substitutions when other fields happen to line up.
                            </p>
                        </GlossaryProse>

                        {/* Section 2 */}
                        <GlossaryH2 id="why-it-matters" eyebrow="Section 02">
                            Why it matters
                        </GlossaryH2>
                        <GlossaryProse>
                            <p>
                                Skipping three-way match does not feel expensive until it is. The four
                                losses compound: duplicate payments, vendor fraud, audit findings, and
                                working capital trapped in disputes.
                            </p>
                            <p>
                                <strong>Duplicate payment.</strong> A supplier sends the same invoice
                                twice, intentionally or not. Without a PO-level uniqueness check, both
                                get paid. Recovery rates on duplicate payments are typically below 60%
                                once the funds leave.
                            </p>
                            <p>
                                <strong>Vendor fraud surface.</strong> The most common AP fraud pattern is
                                a fake invoice for goods never delivered, often timed to month-end when
                                review is rushed. The goods-receipt leg of three-way match is the only
                                control that catches this pattern at the invoice-approval step.
                            </p>
                            <p>
                                <strong>Audit findings.</strong> External auditors test three-way match
                                evidence on sampled invoices. Inability to produce the goods receipt for
                                a paid invoice is a recurring control finding in internal audit reports,
                                even for companies with otherwise tight controls.
                            </p>
                            <p>
                                <strong>Working capital leakage.</strong> Amount and quantity variances
                                that go unflagged at invoice receipt show up months later as supplier
                                credits, debit notes, and disputed balances. Each one ties up cash and
                                costs reconciliation time.
                            </p>
                        </GlossaryProse>

                        {/* Section 3 */}
                        <GlossaryH2 id="seven-exceptions" eyebrow="Section 03">
                            The seven canonical three-way match exceptions
                        </GlossaryH2>
                        <GlossaryProse>
                            <p>
                                The matcher above classifies every invoice into one of eight states: matched,
                                or one of seven exception types. Each exception is a real-world failure mode
                                an AP team sees weekly.
                            </p>
                            <ol className="mt-4 space-y-4 list-decimal pl-6">
                                <li>
                                    <strong>Amount variance.</strong> Invoice and PO agree on supplier and
                                    line items but the amount differs beyond the tolerance band. Common
                                    causes: pricing was renegotiated after the PO was issued, freight or
                                    fuel surcharges were added, or the supplier billed at a higher rate
                                    than agreed.
                                </li>
                                <li>
                                    <strong>Quantity variance.</strong> The supplier billed for more than
                                    the goods-receipt note confirms. Either the warehouse under-counted, the
                                    supplier shipped short, or the supplier billed before the full
                                    shipment arrived.
                                </li>
                                <li>
                                    <strong>Missing PO.</strong> An invoice arrives referencing a PO number
                                    your procurement system has no record of. Often a rogue spend pattern:
                                    someone in the business committed to a supplier without raising a PO
                                    first. Sometimes a typo on the supplier&apos;s invoice.
                                </li>
                                <li>
                                    <strong>Missing GR.</strong> Invoice and PO match, but no goods receipt
                                    has been logged. Either the receiving team has not posted the receipt
                                    yet, or the goods were never delivered and the invoice is fraudulent.
                                </li>
                                <li>
                                    <strong>Vendor mismatch.</strong> The invoice and PO carry the same PO
                                    number but are from different suppliers. Most often a data-entry error
                                    on the supplier&apos;s side, occasionally a fraud signal where a fake
                                    supplier piggybacks on a real PO number.
                                </li>
                                <li>
                                    <strong>Line-item substitution.</strong> The supplier delivered
                                    something different from what was ordered. The PO is for office
                                    chairs, the invoice and goods receipt are for executive desks. Often
                                    legitimate (back-order substitution) but always requires approval.
                                </li>
                                <li>
                                    <strong>Duplicate invoice.</strong> The same PO appears on two or more
                                    invoices. The classic AP control gap. The duplicate may be intentional
                                    fraud, or the supplier&apos;s billing system mis-fired. Either way
                                    payment must be held until the duplicate is investigated.
                                </li>
                            </ol>
                        </GlossaryProse>

                        {/* Section 4 */}
                        <GlossaryH2 id="manual-vs-automated" eyebrow="Section 04">
                            Manual three-way match vs. automated
                        </GlossaryH2>
                        <GlossaryProse>
                            <p>
                                Manual three-way match works at small scale and breaks slowly. A two-person
                                AP team handling 200 invoices a month can hold the three documents side by
                                side in a spreadsheet, eyeball the join, and clear the queue in a day.
                                Five-hundred invoices and the spreadsheet becomes a multi-tab artifact
                                that one person fully understands. A thousand and the team starts skipping
                                the GR leg, then the amount tolerance, then the duplicate check.
                            </p>
                            <p>
                                Each shortcut is rational at the moment it is taken. None of them are
                                visible from outside the team. The audit finding shows up two quarters
                                later, the duplicate payment surfaces when the supplier asks for a credit,
                                and the fraud, if there was any, was paid out months ago.
                            </p>
                            <p>
                                Automation does not eliminate exceptions. It surfaces them. A well-built
                                three-way match agent runs every invoice against the full rule set, flags
                                the 5 to 15 percent that need review, and shows the reviewer exactly why
                                each one was flagged. The reviewer&apos;s time goes from chasing 100% of
                                invoices through three spreadsheets to making a judgment call on the 10%
                                the agent could not clear.
                            </p>
                        </GlossaryProse>

                        {/* Mid-page primary CTA */}
                        <div className="mt-12 border-y border-border py-8">
                            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                                        Book a free Finance Exception Audit
                                    </p>
                                    <p className="mt-2 max-w-xl text-base text-foreground-muted">
                                        We review your full AP workflow and recommend the smallest useful
                                        first system. Free during launch for selected finance teams.
                                    </p>
                                </div>
                                <div className="flex md:justify-end">
                                    <Link href="/contact" className="site-button px-7">
                                        Book the audit
                                        <span className="ml-2 font-mono text-xs opacity-70">↗</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
