"use client";

import { useEffect, useState } from "react";

export function LiveOpsStrip() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const time = now
        ? now.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
              timeZone: "UTC",
          })
        : "—— ——";

    return (
        <div className="live-strip">
            <span className="live-strip-cell">
                <span className="live-strip-dot" aria-hidden />
                <strong>INVARITECH</strong>
            </span>
            <span className="live-strip-cell">
                <strong>{time}</strong> UTC
            </span>
            <span className="live-strip-cell">Finance exception automation</span>
            <span className="live-strip-spacer" />
            <span className="live-strip-cell live-strip-queue">
                Agentic review queue · sample
            </span>
        </div>
    );
}
