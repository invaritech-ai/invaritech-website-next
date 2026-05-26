import type { Metadata } from "next";
import Link from "next/link";

import { ThreeWayMatcher } from "@/components/glossary/three-way-matcher";
import {
    buildBreadcrumbSchema,
    buildArticleSchema,
    buildFaqSchema,
} from "@/lib/seo/three-way-match-schema";
import { GlossaryPrimaryCTA } from "@/components/glossary/glossary-primary-cta";

const LAST_UPDATED = "25 May 2026";
const READ_TIME = "12 min";

function GlossaryH2({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
    return (
        <header className="glossary-section-header">
            <div className="glossary-eyebrow mb-3">
                <div className="glossary-eyebrow-bar" />
                <p className="glossary-eyebrow-label-sm">{eyebrow}</p>
            </div>
            <h2 id={id} className="glossary-section-heading">
                {children}
            </h2>
        </header>
    );
}

function GlossaryProse({ children }: { children: React.ReactNode }) {
    return <div className="glossary-prose">{children}</div>;
}

function FaqItem({ question, children }: { question: string; children: React.ReactNode }) {
    return (
        <details className="glossary-faq-item">
            <summary className="glossary-faq-summary">{question}</summary>
            <div className="glossary-faq-body">{children}</div>
        </details>
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
    const schemas = [
        buildBreadcrumbSchema(),
        buildArticleSchema({ lastUpdated: "2026-05-25" }),
        buildFaqSchema(),
    ];

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        <main className="site-page">
            <section className="doc-section">
                <div className="doc-container">
                    {/* Breadcrumb */}
                    <nav className="glossary-breadcrumb mb-6" aria-label="Breadcrumb">
                        <Link href="/" className="glossary-breadcrumb-link">Invaritech</Link>
                        <span className="glossary-breadcrumb-separator">/</span>
                        <span>Glossary</span>
                        <span className="glossary-breadcrumb-separator">/</span>
                        <span className="glossary-breadcrumb-current">Three-Way Match</span>
                    </nav>

                    {/* Eyebrow + H1 */}
                    <div className="glossary-eyebrow mb-6">
                        <div className="glossary-eyebrow-bar" />
                        <p className="glossary-eyebrow-label">Glossary · Reference</p>
                    </div>

                    <h1 className="doc-hero-headline max-w-3xl">
                        Three-Way Match: Invoice, PO, and Goods Receipt Matching
                    </h1>

                    <p className="glossary-lead mt-8">
                        Three-way matching checks that an invoice, its purchase order, and the
                        goods receipt note all line up before a payment is released. It is the
                        backbone control most AP teams run by hand and the highest-leverage
                        workflow to automate. This page explains what it actually checks, what
                        breaks at scale, and what an agentic exception-routing system catches
                        that manual review misses.
                    </p>

                    {/* Byline */}
                    <div className="glossary-byline mt-8">
                        <p className="glossary-byline-name">
                            By <strong>Aditi Garg</strong> · Founder &amp; Director, Invaritech
                        </p>
                        <p className="glossary-byline-bio">
                            Aditi directs automation builds at Invaritech, including the EU TRACES
                            regulatory document workflow. She is now applying the same
                            exception-routing approach to finance and AP teams.
                        </p>
                        <p className="glossary-byline-meta">
                            Last updated: {LAST_UPDATED} · {READ_TIME} read
                        </p>
                    </div>

                    {/* Primary CTA */}
                    <div className="glossary-cta-row mt-8">
                        <GlossaryPrimaryCTA location="hero" label="Book a free Finance Exception Audit" />
                        <a href="#matcher" className="site-button-secondary glossary-primary-cta">
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
                            <ol className="mt-4 list-decimal space-y-4 pl-6">
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
                        <div className="glossary-cta-card mt-12">
                            <div className="glossary-cta-card-grid">
                                <div>
                                    <p className="glossary-eyebrow-label">
                                        Book a free Finance Exception Audit
                                    </p>
                                    <p className="glossary-cta-card-body">
                                        We review your full AP workflow and recommend the smallest useful
                                        first system. Free during launch for selected finance teams.
                                    </p>
                                </div>
                                <div className="glossary-cta-card-actions">
                                    <GlossaryPrimaryCTA location="mid" label="Book the audit" />
                                </div>
                            </div>
                        </div>

                        {/* Section 5 */}
                        <GlossaryH2 id="beyond-client-side" eyebrow="Section 05">
                            Beyond client-side: OCR, LLM matching, agentic workflows
                        </GlossaryH2>
                        <GlossaryProse>
                            <p>
                                The matcher on this page is honest about its limits. It runs in your
                                browser, takes structured rows as input, joins them on PO number, and
                                applies fixed rules. That is enough to demonstrate every canonical
                                exception type. It is not enough to run against your real AP workflow.
                            </p>
                            <p>
                                Real AP workflows feed three-way match with messy inputs. Invoices arrive
                                as PDFs, sometimes scanned, sometimes machine-generated, sometimes
                                embedded in email bodies with no attachment. POs sit in an ERP behind
                                export jobs that drop fields silently. Goods receipt notes are often
                                handwritten and photographed by the receiving team.
                            </p>
                            <p>
                                A production three-way match system has to handle three classes of work
                                the client-side tool cannot:
                            </p>
                            <ul className="mt-3 list-disc space-y-2 pl-6">
                                <li>
                                    <strong>Document intelligence.</strong> OCR the invoice PDF, extract
                                    line items, vendor metadata, totals, and tax. Same for the goods
                                    receipt note. The match runs on the extracted fields, not on a
                                    spreadsheet someone typed.
                                </li>
                                <li>
                                    <strong>Fuzzy normalization.</strong> &ldquo;Acme Corp&rdquo; on the
                                    invoice, &ldquo;Acme Corporation Inc.&rdquo; on the PO, and
                                    &ldquo;ACME CORP&rdquo; in the vendor master are the same supplier.
                                    Real systems normalize against a vendor master list with confidence
                                    scores, not exact-string equality.
                                </li>
                                <li>
                                    <strong>Agentic exception routing.</strong> A flagged invoice does not
                                    stop with a flag. An agent decides whether to ask the buyer for
                                    approval evidence, request a corrected invoice from the supplier,
                                    hold for receiving to post the GR, or route to a human reviewer with
                                    the full context attached. Each decision is policy-driven and
                                    logged for audit.
                                </li>
                            </ul>
                            <p>
                                The client-side tool above demonstrates the matching logic. The full
                                system wraps it with the document intake, the normalization layer, and
                                the routing agent.
                            </p>
                        </GlossaryProse>

                        {/* Section 6 */}
                        <GlossaryH2 id="how-invaritech-builds" eyebrow="Section 06">
                            How Invaritech builds three-way match automation
                        </GlossaryH2>
                        <GlossaryProse>
                            <p>
                                We build three-way match systems as fixed-scope engagements. Each build
                                starts with a workflow audit, a written scope with acceptance criteria,
                                and a 4 to 8 week build cycle. We sit on top of your existing accounting
                                system (NetSuite, QuickBooks, Xero, SAP, MYOB), pull exports, ingest
                                invoice documents from your supplier inbox, and run the match against
                                your rules and your vendor master.
                            </p>
                            <p>
                                Pricing on a starting three-way match system is USD 8k to 25k depending
                                on workflow complexity, data sources, and rule count. The system
                                handover includes documented rules, monitoring, and a deferred period
                                where we tune the matcher against your first 30 days of real exception
                                traffic.
                            </p>
                            <p>
                                Adjacent proof for the kind of regulatory document workflows this style
                                of build handles: we shipped the EU TRACES platform integration for a
                                client&apos;s sustainability compliance program. Public review from
                                Matthew Baldwin:{" "}
                                <em>
                                    &ldquo;Aditi and her team did an excellent job with the development
                                    of an API with the EU&apos;s TRACES platform for our business. They
                                    are extremely professional, and we were very impressed by their
                                    skills, knowledge and reactivity.&rdquo;
                                </em>{" "}
                                That build handled a hundred-plus document types, regulatory exception
                                routing, and evidence capture. The three-way match build pattern is the
                                same shape applied to AP.
                            </p>
                        </GlossaryProse>

                        {/* Section 7 — FAQ */}
                        <GlossaryH2 id="faq" eyebrow="Section 07">
                            Frequently asked questions
                        </GlossaryH2>
                        <GlossaryProse>
                            <FaqItem question="What's the difference between two-way and three-way matching?">
                                Two-way match checks invoice against PO. Three-way adds the goods receipt
                                note. The goods-receipt leg is the only control that catches fraudulent
                                invoices for goods never delivered. Two-way match is fine for services,
                                subscriptions, and other non-physical goods. Three-way is the standard
                                for physical inventory and capex purchases.
                            </FaqItem>
                            <FaqItem question="What's an acceptable amount tolerance?">
                                Most companies set 2 to 5 percent with a small dollar floor (typically
                                $25 to $100) to handle freight and fuel surcharges without flagging
                                every line. Tighter than 1 percent generates noise; looser than 10
                                percent stops catching real variances. The right number is whatever your
                                audit team has agreed to and can defend.
                            </FaqItem>
                            <FaqItem question="Do small businesses need three-way matching?">
                                Below roughly 100 invoices a month, the manual cost of three-way match
                                may exceed the loss from skipping it. Above that volume, the math
                                flips. The most cost-effective entry point for small teams is automated
                                duplicate-invoice detection plus PO-only match on amount, leaving the
                                goods-receipt leg manual until volume justifies automating it.
                            </FaqItem>
                            <FaqItem question="Can three-way matching catch duplicate payments?">
                                Yes, and it is one of the highest-value catches. The PO number is the
                                join key. Two invoices referencing the same PO are by definition
                                candidate duplicates, regardless of whether the invoice numbers, dates,
                                or amounts match. The matcher above demonstrates this with the
                                DUPLICATE_INVOICE status.
                            </FaqItem>
                            <FaqItem question="How long does AP automation take to implement?">
                                A fixed-scope three-way match system from us takes 4 to 8 weeks from
                                kick-off to production. Most of the time goes to data plumbing (export
                                format edge cases, document intake reliability, vendor master
                                normalization), not to the matching logic itself.
                            </FaqItem>
                            <FaqItem question="What about non-PO invoices?">
                                Non-PO invoices (subscriptions, utilities, professional services without
                                a formal PO) bypass three-way match by design. They run through a
                                different control set: approval evidence by amount band, recurring-vendor
                                spend monitoring, and budget-line matching. A three-way match system
                                does not try to handle them; a complete AP exception system does.
                            </FaqItem>
                        </GlossaryProse>

                        {/* Section 8 — Related entries (placeholder) */}
                        <GlossaryH2 id="related" eyebrow="Section 08">
                            Related reading
                        </GlossaryH2>
                        <GlossaryProse>
                            <ul className="glossary-related-list">
                                <li>
                                    <Link href="/work#document-matching" className="glossary-related-link">
                                        Invoice and Document Matching System — services overview
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resources/invoice-extractor" className="glossary-related-link">
                                        Invoice Extractor — extract structured fields from PDF invoices
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resources/supplier-payment-control-rule-table" className="glossary-related-link">
                                        Supplier Payment Control Rule Table — interactive rule reference
                                    </Link>
                                </li>
                            </ul>
                        </GlossaryProse>

                        {/* Footer primary CTA */}
                        <div className="glossary-cta-footer">
                            <div className="glossary-cta-card-grid">
                                <div>
                                    <p className="glossary-eyebrow-label">
                                        Ready to automate three-way matching?
                                    </p>
                                    <h3 className="glossary-cta-footer-heading">
                                        Book a free Finance Exception Audit.
                                    </h3>
                                    <p className="glossary-cta-card-body mt-3">
                                        We review your full AP workflow and recommend the smallest useful
                                        first system. Free during launch.
                                    </p>
                                </div>
                                <div className="glossary-cta-card-actions">
                                    <GlossaryPrimaryCTA location="footer" label="Book the audit" />
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
        </>
    );
}
