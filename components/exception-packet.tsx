const ruleRows = [
    { condition: "Surcharge variance", check: "Match rate card", route: "AP owner" },
    { condition: "Missing proof-of-delivery", check: "Hold invoice", route: "Ops finance" },
    { condition: "Changed payment detail", check: "Callback evidence", route: "Controller" },
];

const auditEntries = [
    { time: "10:42", event: "Exception flagged by matching engine" },
    { time: "10:51", event: "Rate card and POD evidence attached" },
    { time: "11:06", event: "AP Lead reviewed and noted variance" },
    { time: "11:11", event: "Held — awaiting Controller sign-off" },
];

export default function ExceptionPacket() {
    return (
        <div
            className="exception-packet"
            role="region"
            aria-label="Payment exception example"
        >
            <div className="exception-packet-bar" aria-hidden="true" />

            <div className="exception-packet-inner">
                <p className="exception-packet-eyebrow">Exception Packet</p>

                <div className="exception-packet-header">
                    <span
                        className="control-stamp control-stamp-held"
                        data-packet-stamp
                        aria-label="Status: Held before release"
                        style={{ opacity: 0 }}
                    >
                        Held before release
                    </span>
                </div>

                <dl className="exception-packet-fields">
                    <dt className="exception-packet-field-label">Supplier</dt>
                    <dd className="exception-packet-field-value">Northline Freight</dd>
                    <dt className="exception-packet-field-label">Invoice</dt>
                    <dd className="exception-packet-field-value">INV-49281</dd>
                    <dt className="exception-packet-field-label">Variance</dt>
                    <dd className="exception-packet-field-value">+$1,240 vs contracted rate</dd>
                    <dt className="exception-packet-field-label">Issue</dt>
                    <dd className="exception-packet-field-value">Carrier surcharge — rate card mismatch</dd>
                </dl>

                <div className="exception-packet-desktop">
                    <div className="exception-packet-divider" role="separator" />

                    <p className="exception-packet-section-label">Control rules</p>
                    <table className="exception-packet-table" aria-label="Control rules">
                        <thead>
                            <tr className="exception-packet-table-head">
                                <th scope="col">Condition</th>
                                <th scope="col">Check</th>
                                <th scope="col">Route</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ruleRows.map((row) => (
                                <tr key={row.condition} className="exception-packet-table-row">
                                    <td>{row.condition}</td>
                                    <td>{row.check}</td>
                                    <td>{row.route}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="exception-packet-divider" role="separator" />

                    <p className="exception-packet-section-label">Audit trail</p>
                    <div
                        className="exception-packet-audit"
                        role="log"
                        aria-label="Exception audit trail"
                        aria-live="off"
                    >
                        <div className="exception-packet-audit-thread" aria-hidden="true" />
                        {auditEntries.map((entry) => (
                            <div key={entry.time} className="exception-packet-audit-entry">
                                <time className="exception-packet-audit-time">{entry.time}</time>
                                <span className="exception-packet-audit-event">{entry.event}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
