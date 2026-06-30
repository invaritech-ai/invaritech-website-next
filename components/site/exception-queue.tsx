/**
 * Centered hero artefact: a slice of an AP invoice queue where the
 * automation released two invoices and held one with the reason and
 * routing visible. Pure server markup — no JS, no images — and
 * illustrative data only, so the block is hidden from screen readers.
 */
export function ExceptionQueue() {
    return (
        <div className="hero-queue hero-rise hero-rise-3" aria-hidden="true">
            <div className="hero-queue-head">
                <span className="hero-queue-label">
                    AP invoice queue, 09:15
                </span>
                <span className="hero-queue-label">
                    3 invoices · 1 exception
                </span>
            </div>
            <div className="hero-queue-row">
                <span className="hero-queue-id">
                    INV-2378
                    <span className="hero-queue-supplier">
                        {" "}
                        · Hollis Freight Ltd.
                    </span>
                </span>
                <span className="hero-queue-amount">$2,140.00</span>
                <span className="control-stamp control-stamp-released">
                    Released
                </span>
            </div>
            <div className="hero-queue-row">
                <span className="hero-queue-id">
                    INV-2379
                    <span className="hero-queue-supplier">
                        {" "}
                        · Arbor Mills Co.
                    </span>
                </span>
                <span className="hero-queue-amount">$11,508.00</span>
                <span className="control-stamp control-stamp-released">
                    Released
                </span>
            </div>
            <div className="hero-queue-held">
                <span className="hero-queue-bar" />
                <div className="hero-queue-held-top">
                    <span className="hero-queue-id">
                        INV-2381
                        <span className="hero-queue-supplier">
                            {" "}
                            · Meridian Packaging Co.
                        </span>
                    </span>
                    <span className="hero-queue-amount">$9,384.00</span>
                    <span className="control-stamp control-stamp-flagged hero-queue-stamp">
                        Held for review
                    </span>
                </div>
                <p className="hero-queue-reason">
                    Unit price +5.0% vs PO-1187: rule PRC-02
                </p>
                <p className="hero-queue-audit">
                    Routed to AP review with evidence attached
                </p>
            </div>
        </div>
    );
}
