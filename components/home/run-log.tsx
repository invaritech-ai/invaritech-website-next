"use client";

import { useEffect, useState } from "react";

type LogKind = "scan" | "flag" | "route";
type LogLine = { time: string; kind: LogKind; tag: string; msg: string };

const LOG_SCRIPT: LogLine[] = [
    { time: "14:32:07", kind: "scan", tag: "SCAN", msg: "1,284 invoices · 16-week window" },
    { time: "14:32:09", kind: "flag", tag: "FLAG", msg: "INV-8821 — variance +87% vs median" },
    { time: "14:32:09", kind: "flag", tag: "DUP", msg: "INV-8847 — near-duplicate of INV-8821" },
    { time: "14:32:10", kind: "route", tag: "ROUTE", msg: "ap-review · evidence attached" },
    { time: "14:32:11", kind: "scan", tag: "PASS", msg: "1,266 invoices cleared · no action" },
];

export function RunLog() {
    const [visible, setVisible] = useState(1);

    useEffect(() => {
        if (visible >= LOG_SCRIPT.length) {
            const reset = setTimeout(() => setVisible(1), 4500);
            return () => clearTimeout(reset);
        }
        const t = setTimeout(() => setVisible((v) => v + 1), 1100);
        return () => clearTimeout(t);
    }, [visible]);

    return (
        <div className="run-log" aria-label="Run log">
            <div className="run-log-head">
                <span><strong>Run log</strong> · sample</span>
            </div>
            <div className="run-log-feed">
                {LOG_SCRIPT.slice(0, visible).map((l, i) => (
                    <div
                        key={`${l.time}-${i}`}
                        className={`run-log-line is-${l.kind}`}
                        style={{ animationDelay: "0s" }}
                    >
                        <span className="run-log-time">{l.time}</span>
                        <span className="run-log-msg">
                            <span className="run-log-tag">{l.tag}</span>
                            {l.msg}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
