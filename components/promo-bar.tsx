"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

// ponytail: dismissal lives in localStorage + a CSS var (--promo-bar-h) that the
// fixed pill header and body padding read. New visitors get one 40px shift on
// mount; add an inline <head> script if that flash ever matters.
const STORAGE_KEY = "claims-desk-banner-dismissed";
const CLAIMS_DESK_URL =
    "https://claims-desk.invaritech.ai/?utm_source=invaritech&utm_medium=banner&utm_campaign=claims-desk";

export function PromoBar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY) === "1") return;
        document.documentElement.style.setProperty("--promo-bar-h", "2.5rem");
        window.setTimeout(() => setVisible(true), 0);
    }, []);

    function dismiss() {
        localStorage.setItem(STORAGE_KEY, "1");
        document.documentElement.style.removeProperty("--promo-bar-h");
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <aside className="promo-bar" aria-label="Announcement">
            <a className="promo-bar-link" href={CLAIMS_DESK_URL}>
                <span className="promo-bar-tag" aria-hidden="true">
                    Claims Desk
                </span>
                <span>FMCG supplier? Get a free claims teardown</span>
                <span className="promo-bar-arrow" aria-hidden="true">
                    →
                </span>
            </a>
            <button
                type="button"
                className="promo-bar-dismiss"
                aria-label="Dismiss announcement"
                onClick={dismiss}
            >
                <X className="size-4" aria-hidden="true" />
            </button>
        </aside>
    );
}
