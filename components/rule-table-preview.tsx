const PREVIEW_ROWS = [
    {
        condition: "Changed payment detail",
        check: "Callback verification",
        route: "Controller",
        evidence: "Callback log + email",
        sla: "24 hrs",
    },
    {
        condition: "Carrier surcharge variance",
        check: "Match rate card",
        route: "AP Owner",
        evidence: "Rate card + POD",
        sla: "48 hrs",
    },
    {
        condition: "Missing proof-of-delivery",
        check: "Hold invoice",
        route: "Ops Finance",
        evidence: "POD attachment",
        sla: "72 hrs",
    },
    {
        condition: "PO / invoice mismatch",
        check: "Three-way match",
        route: "Finance Manager",
        evidence: "PO + GRN + invoice",
        sla: "48 hrs",
    },
    {
        condition: "Duplicate invoice variant",
        check: "Dedup check",
        route: "AP Lead",
        evidence: "Prior payment record",
        sla: "24 hrs",
    },
];

interface RuleTablePreviewProps {
    footer?: React.ReactNode;
}

export default function RuleTablePreview({ footer }: RuleTablePreviewProps) {
    return (
        <div
            className="exception-packet"
            role="region"
            aria-label="Rule table preview"
            data-reveal="block"
        >
            <div className="exception-packet-bar" aria-hidden="true" />
            <div className="exception-packet-inner">
                <p className="exception-packet-eyebrow">Rule Table — Preview</p>
                <div className="exception-packet-header">
                    <span
                        className="control-stamp control-stamp-resolved"
                        aria-label="Open resource"
                    >
                        Open
                    </span>
                </div>
                <p className="exception-packet-section-label">Sample control rules</p>
                <div className="exception-packet-desktop">
                    <table className="exception-packet-table" aria-label="Rule table preview">
                        <thead>
                            <tr className="exception-packet-table-head">
                                <th scope="col">Exception condition</th>
                                <th scope="col">Check</th>
                                <th scope="col">Route to</th>
                                <th scope="col">Evidence required</th>
                                <th scope="col">SLA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PREVIEW_ROWS.map((row) => (
                                <tr key={row.condition} className="exception-packet-table-row">
                                    <td>{row.condition}</td>
                                    <td>{row.check}</td>
                                    <td>{row.route}</td>
                                    <td>{row.evidence}</td>
                                    <td>{row.sla}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.1em] text-foreground-subtle">
                    5 of 18 rows shown — open the full interactive table
                </p>
                {footer && <div className="mt-6">{footer}</div>}
            </div>
        </div>
    );
}
