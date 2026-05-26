export function Colophon() {
    const buildDate = new Date().toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
    return (
        <section className="colophon">
            <div className="doc-container">
                <div className="colophon-grid">
                    <div className="colophon-block">
                        <div className="colophon-label">Colophon</div>
                        <p className="colophon-statement">
                            Set in <em>Source Serif 4</em> and <em>IBM Plex Mono</em>.
                            Composed as a forensic-accounting deliverable: numbered
                            sections, marginalia, exhibits, footnotes. Rendered{" "}
                            {buildDate}, Melbourne.
                        </p>
                    </div>
                    <div className="colophon-block">
                        <div className="colophon-label">Typefaces</div>
                        <div className="colophon-row"><span>Display / body</span><strong>Source Serif 4</strong></div>
                        <div className="colophon-row"><span>Mono / metadata</span><strong>IBM Plex Mono</strong></div>
                        <div className="colophon-row"><span>Sans (UI)</span><strong>Source Sans 3</strong></div>
                    </div>
                    <div className="colophon-block">
                        <div className="colophon-label">Palette</div>
                        <div className="colophon-row"><span>Forest (primary)</span><strong>#0F5132</strong></div>
                        <div className="colophon-row"><span>Copper (accent)</span><strong>#B45309</strong></div>
                        <div className="colophon-row"><span>Paper</span><strong>#F7F7F4</strong></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
