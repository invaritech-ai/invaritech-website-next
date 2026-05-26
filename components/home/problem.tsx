"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";

type Variant = "broad" | "finance";

type Props = { variant: Variant };

const COPY: Record<Variant, {
    title: string;
    meta: string;
    railKey: string;
    railBody: string;
    bodyParagraphs: React.ReactNode[];
    gapCells: { name: string; stores: string }[];
    gapCaption: React.ReactNode;
}> = {
    broad: {
        title: "Your software stores the transaction. Your team still checks the exceptions.",
        meta: "Exception handling is the bottleneck",
        railKey: "The problem",
        railBody:
            "Operations teams compare exports, PDFs, inboxes, approvals, and spreadsheets just to know which records need attention.",
        bodyParagraphs: [
            <>
                The data is in the systems. The checking happens between them.
                That gap is where duplicate bills slip through, where vendor bank
                changes go unapproved, where regulatory submissions are missed,
                and where invoices get paid without matching evidence.
            </>,
            <>You can hire more people to close the gap. Or you can put an agent in it.</>,
        ],
        gapCells: [
            { name: "Accounting", stores: "Transactions, vendor master, GL codes." },
            { name: "Inbox", stores: "PDFs, emails, scanned bills, approvals." },
            { name: "Spreadsheet", stores: "Exception list, reviewer notes, hold flags." },
            { name: "Approval tool", stores: "Sign-offs, evidence, audit history." },
        ],
        gapCaption: (
            <>
                The data is in the systems. The <em>work</em> — checking,
                matching, chasing, approving — happens in the gaps between them.
            </>
        ),
    },
    finance: {
        title: "Your accounting system stores the transaction. Your team still checks the exceptions.",
        meta: "Six pain patterns we see weekly",
        railKey: "The problem",
        railBody:
            "Most finance teams do not lose time because they lack software. They lose time because the important checks still happen across inboxes, spreadsheets, PDFs, approval trails, and human memory.",
        bodyParagraphs: [
            <ul key="finance-pain-bullets" className="problem-pain-list">
                <li>Duplicate supplier bills</li>
                <li>Invoice, PO, and receipt mismatches</li>
                <li>Vendor bank-detail changes</li>
                <li>Missing approval evidence</li>
                <li>Unusual amounts or descriptions</li>
                <li>Documents scattered across email, folders, and accounting exports</li>
            </ul>,
            <>
                If your team manually checks these every week, that workflow is
                ready for automation.
            </>,
        ],
        gapCells: [
            { name: "Accounting", stores: "Transactions, vendor master, GL codes." },
            { name: "Inbox", stores: "PDFs, emails, scanned bills, approvals." },
            { name: "Spreadsheet", stores: "Exception list, reviewer notes, hold flags." },
            { name: "Approval tool", stores: "Sign-offs, evidence, audit history." },
        ],
        gapCaption: (
            <>
                The data is in the systems. The <em>work</em> — checking,
                matching, chasing, approving — happens in the gaps between them.
            </>
        ),
    },
};

export function Problem({ variant }: Props) {
    const c = COPY[variant];
    return (
        <section id="problem" className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">{c.title}</h2>
                    <span className="section-mark-meta">{c.meta}</span>
                </motion.header>

                <motion.div {...fadeUp} className="marginalia">
                    <aside className="marginalia-rail">
                        <span className="marginalia-rail-key">{c.railKey}</span>
                        {c.railBody}
                    </aside>
                    <div className="marginalia-body">
                        {c.bodyParagraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </motion.div>

                <motion.div {...fadeUp} className="relative">
                    <div className="gap-schematic">
                        {c.gapCells.map((cell) => (
                            <div key={cell.name} className="gap-cell">
                                <div className="gap-cell-name">{cell.name}</div>
                                <div className="gap-cell-stores">{cell.stores}</div>
                            </div>
                        ))}
                        <div className="gap-overlay">
                            <div className="gap-overlay-rule" />
                        </div>
                    </div>
                    <p className="mt-4 max-w-xl text-sm text-foreground-muted">
                        {c.gapCaption}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
