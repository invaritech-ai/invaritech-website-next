# Finance Exception Automation Pivot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the cold-email funnel critical path inside a 2-week window — `/finance-exception-automation` money page, repositioned homepage, canonical `AuditCTA` flowing to `/contact?audit=1` with `?src=`/`?campaign=` forwarding, nav rewire, and basic SEO metadata.

**Architecture:** Decompose the existing 889-line `components/exception-automation-home.tsx` into focused section files under `components/home/`. Both the homepage and the new `/finance-exception-automation` page become thin composers picking sections (with variant props) from the shared library. A single `AuditCTA` component used everywhere, replacing the existing `GlossaryPrimaryCTA` and ad-hoc `/contact` Links. Campaign parameters captured from URL on landing-page mount, stored in `sessionStorage`, and forwarded to every CTA href.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (token-based via `app/globals.css`), motion/react, `node:test` for unit tests, GA4 via gtag for analytics. No new dependencies.

**Design doc:** `docs/plans/2026-05-26-finance-pivot-design.md`

**Branch:** `brand-story-copy-update` (continue on it; do not switch)

---

## File Structure

**Created:**

```
components/home/
  _motion.ts                              fadeUp, stagger, ease constants
  _shared/
    audit-cta.tsx                         Canonical AuditCTA — replaces GlossaryPrimaryCTA
  live-ops-strip.tsx                      Extracted from current homepage
  run-log.tsx                             Extracted
  variance-exhibit-video.tsx              Extracted
  variance-exhibit.tsx                    Extracted
  cover-hero.tsx                          variant: "homepage" | "landing"
  problem.tsx                             former MessyMiddle; variant: "broad" | "finance"
  service-method.tsx                      former ServiceMethod section; variant: "broad" | "finance"
  systems-register.tsx                    former ExceptionRegister; expandable cards
  why-not-accounting.tsx                  former WhyCustom; includes ComparisonTable
  audit-cta-section.tsx                   former AuditCTA full section (uses <AuditCTA /> component)
  proof-grid.tsx                          former Exhibits; variant: "broad" | "finance-emphasis"
  footnotes.tsx                           Extracted
  colophon.tsx                            Extracted
  what-we-automate.tsx                    NEW — homepage 3-card grid
  finance-first-focus.tsx                 NEW — homepage funnel section → money page
  demo-preview.tsx                        NEW — money page demo tile
  final-cta.tsx                           NEW — money page closing CTA

lib/analytics/site-events.ts              Replaces lib/analytics/glossary-events.ts
lib/utm-capture.ts                        Reads ?src/?campaign on mount → sessionStorage

app/finance-exception-automation/
  page.tsx                                Money page composer + metadata

public/images/finance/
  three-way-matcher-preview.webp          Hand-captured preview (1280w + 640w)
  three-way-matcher-preview.png           Fallback

tests/site-cta.test.mjs                   AuditCTA href construction tests
tests/utm-capture.test.mjs                URL → sessionStorage forwarding tests
```

**Modified:**

```
components/exception-automation-home.tsx  Reduced to thin composer (~40 lines) for homepage
components/header.tsx                     menuItems → new 6 entries
components/footer.tsx                     Restructured columns (Company / Finance / Tools)
components/glossary/three-way-matcher.tsx           Swap GlossaryPrimaryCTA → AuditCTA (via secondary CTA wrapper)
components/glossary/three-way-matcher-secondary-cta.tsx  Swap GlossaryPrimaryCTA → AuditCTA
app/glossary/three-way-match/page.tsx     Swap GlossaryPrimaryCTA → AuditCTA; update related-reading links
app/globals.css                           Add /* Home page */ and /* Money page */ class sections
app/sitemap.ts                            Add /finance-exception-automation
tests/internal-links.test.mjs             Add money page URL smoke assertion
```

**Deleted:**

```
components/glossary/glossary-primary-cta.tsx        Superseded by AuditCTA
```

---

## Task 1: Worktree safety + branch confirmation

**Files:** none (verification only)

- [ ] **Step 1: Confirm branch and working state**

```bash
git rev-parse --abbrev-ref HEAD
git status --short
```

Expected: branch is `brand-story-copy-update`; working tree clean. If dirty, stop and ask before proceeding.

- [ ] **Step 2: Confirm design doc exists**

```bash
test -f docs/plans/2026-05-26-finance-pivot-design.md && echo "OK"
```

Expected: `OK`.

- [ ] **Step 3: Confirm current test suite is green**

```bash
node --experimental-strip-types --test tests/*.test.mjs 2>&1 | tail -5
```

Expected: 0 failures.

- [ ] **Step 4: Confirm build is green**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build.

No commit (verification only).

---

## Task 2: Extract motion helpers and existing hero sub-components

**Files:**
- Create: `components/home/_motion.ts`
- Create: `components/home/live-ops-strip.tsx`
- Create: `components/home/run-log.tsx`
- Create: `components/home/variance-exhibit-video.tsx`
- Create: `components/home/variance-exhibit.tsx`
- Modify: `components/exception-automation-home.tsx` (import-only changes)

- [ ] **Step 1: Create `components/home/_motion.ts`**

```typescript
// Shared motion variants used across home/landing sections.
// Pre-existing constants extracted from components/exception-automation-home.tsx.

export const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
};

export const stagger = (i: number) => ({
    ...fadeUp,
    transition: { ...fadeUp.transition, delay: 0.05 + i * 0.06 },
});
```

- [ ] **Step 2: Create `components/home/live-ops-strip.tsx`**

Copy the existing `LiveOpsStrip` function from `components/exception-automation-home.tsx` (currently lines 34–69) into the new file. Add `"use client";` at top. Export as a named export.

```tsx
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
```

- [ ] **Step 3: Create `components/home/run-log.tsx`**

Copy `LogKind`, `LogLine`, `LOG_SCRIPT`, and `RunLog` from `components/exception-automation-home.tsx` (currently lines 75–120). Add `"use client";`. Export `RunLog`.

```tsx
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
```

- [ ] **Step 4: Create `components/home/variance-exhibit.tsx`**

Copy the existing `VarianceExhibit` function from `components/exception-automation-home.tsx` (currently ~lines 238–361) into the new file. No `"use client"` — it's a static SVG component. Export as named export.

```tsx
export function VarianceExhibit() {
    // Mock invoice-amount series with two clear duplicate-candidate outliers.
    const data = [
        { x: 0, y: 42 }, { x: 1, y: 48 }, { x: 2, y: 51 }, { x: 3, y: 46 },
        { x: 4, y: 54 }, { x: 5, y: 50 }, { x: 6, y: 88, flag: true },
        { x: 7, y: 47 }, { x: 8, y: 52 }, { x: 9, y: 49 }, { x: 10, y: 55 },
        { x: 11, y: 89, flag: true }, { x: 12, y: 53 }, { x: 13, y: 48 },
        { x: 14, y: 51 }, { x: 15, y: 50 },
    ];
    const w = 360;
    const h = 180;
    const pad = { l: 18, r: 12, t: 12, b: 20 };
    const xMax = data.length - 1;
    const yMax = 100;
    const sx = (x: number) => pad.l + (x / xMax) * (w - pad.l - pad.r);
    const sy = (y: number) => pad.t + (1 - y / yMax) * (h - pad.t - pad.b);
    const path = data
        .map((d, i) => `${i === 0 ? "M" : "L"} ${sx(d.x).toFixed(1)} ${sy(d.y).toFixed(1)}`)
        .join(" ");

    return (
        <div className="variance-exhibit">
            <div className="variance-exhibit-bar" />
            <div className="variance-exhibit-head">
                <span className="variance-exhibit-title">Exhibit A · AP variance</span>
                <span className="variance-exhibit-id">FIG · 001</span>
            </div>
            <svg
                viewBox={`0 0 ${w} ${h}`}
                className="w-full h-auto"
                role="img"
                aria-label="Variance plot showing two duplicate-candidate outliers"
            >
                {[0, 25, 50, 75, 100].map((g) => (
                    <line key={g} x1={pad.l} x2={w - pad.r} y1={sy(g)} y2={sy(g)}
                        stroke="var(--border)" strokeWidth="1"
                        strokeDasharray={g === 50 ? "0" : "2 4"} />
                ))}
                <path d={path} fill="none" stroke="var(--primary)" strokeWidth="1.4" strokeLinejoin="round" />
                <rect x={pad.l} y={sy(65)} width={w - pad.l - pad.r}
                    height={sy(35) - sy(65)} fill="var(--primary)" opacity="0.05" />
                {data.map((d) => (
                    <circle key={d.x} cx={sx(d.x)} cy={sy(d.y)}
                        r={d.flag ? 4 : 2}
                        fill={d.flag ? "var(--accent)" : "var(--background)"}
                        stroke={d.flag ? "var(--accent)" : "var(--primary)"}
                        strokeWidth={d.flag ? 1.5 : 1} />
                ))}
                {data.filter((d) => d.flag).map((d, i) => (
                    <g key={i}>
                        <line x1={sx(d.x)} y1={sy(d.y) - 8} x2={sx(d.x)} y2={sy(d.y) - 24}
                            stroke="var(--accent)" strokeWidth="1" />
                        <text x={sx(d.x) - 6} y={sy(d.y) - 28} fill="var(--accent)"
                            fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">
                            DUP·{i + 1}
                        </text>
                    </g>
                ))}
                {[0, 50, 100].map((g) => (
                    <text key={g} x={pad.l - 4} y={sy(g) + 3} textAnchor="end"
                        fontSize="7" fontFamily="var(--font-mono)"
                        fill="var(--foreground-subtle)" letterSpacing="1">
                        {g}
                    </text>
                ))}
            </svg>
            <p className="variance-exhibit-caption">
                Sample AP export, 16-week window. Two near-duplicates flagged
                against historical median (<strong>+76%, +78%</strong>). Both
                approved manually in the original ledger.
            </p>
        </div>
    );
}
```

- [ ] **Step 5: Create `components/home/variance-exhibit-video.tsx`**

```tsx
import { VarianceExhibit } from "./variance-exhibit";

export function VarianceExhibitVideo() {
    return (
        <figure className="relative border border-border bg-card">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
            <video
                src="/hero/hero.mp4"
                poster="/hero/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Animated AP variance exhibit: 16-week invoice series with two duplicate-candidate outliers flagged in copper."
                className="block aspect-[3/2] w-full"
            >
                <VarianceExhibit />
            </video>
        </figure>
    );
}
```

- [ ] **Step 6: Update `components/exception-automation-home.tsx` to import these**

At the top of `components/exception-automation-home.tsx`, add:

```tsx
import { LiveOpsStrip } from "@/components/home/live-ops-strip";
import { RunLog } from "@/components/home/run-log";
import { VarianceExhibitVideo } from "@/components/home/variance-exhibit-video";
import { VarianceExhibit } from "@/components/home/variance-exhibit";
import { fadeUp, stagger } from "@/components/home/_motion";
```

Delete the original `fadeUp`, `stagger`, `LiveOpsStrip`, `RunLog`, `VarianceExhibitVideo`, `VarianceExhibit`, and `LogKind`/`LogLine`/`LOG_SCRIPT` definitions from `components/exception-automation-home.tsx`. Behavior must be unchanged.

- [ ] **Step 7: Verify build and visual parity**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. No new warnings.

- [ ] **Step 8: Commit**

```bash
git add components/home/_motion.ts components/home/live-ops-strip.tsx components/home/run-log.tsx components/home/variance-exhibit.tsx components/home/variance-exhibit-video.tsx components/exception-automation-home.tsx
git commit -m "refactor(home): extract motion helpers and hero sub-components to components/home/"
```

---

## Task 3: Extract CoverHero with variant prop

**Files:**
- Create: `components/home/cover-hero.tsx`
- Modify: `components/exception-automation-home.tsx`

- [ ] **Step 1: Create `components/home/cover-hero.tsx`**

The component accepts a `variant` prop. The structure (live ops strip, two-column grid, headline column, exhibit column, bottom rule strip) stays identical; copy and CTAs differ by variant.

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { LiveOpsStrip } from "./live-ops-strip";
import { RunLog } from "./run-log";
import { VarianceExhibitVideo } from "./variance-exhibit-video";
import { fadeUp, stagger } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

type Variant = "homepage" | "landing";

type Props = {
    variant: Variant;
    /** Optional override; when omitted the component picks copy from variant. */
    secondaryHref?: string;
};

const COPY: Record<Variant, {
    headlineLines: React.ReactNode;
    subhead: string;
    primaryLabel: string;
    primaryLocation: "hero";
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    trustLine: string;
    bottomStrip: string;
}> = {
    homepage: {
        headlineLines: (
            <>
                AI workflow automation for{" "}
                <em>document-heavy</em>
                <br />
                operations.
            </>
        ),
        subhead:
            "Invaritech builds custom automation systems for finance, compliance, and operations teams that need to move faster without adding headcount.",
        primaryLabel: "Explore Finance Automation",
        primaryLocation: "hero",
        primaryHref: "/finance-exception-automation",
        secondaryLabel: "Try the matcher demo",
        secondaryHref: "/glossary/three-way-match/",
        trustLine:
            "Built for teams using accounting systems, regulatory portals, document workflows, and approval chains.",
        bottomStrip:
            "Finance exception automation · regulatory document workflows · operations approval gaps · evidence capture. Built around existing systems, not on top of them.",
    },
    landing: {
        headlineLines: (
            <>
                Move faster without
                <br />
                adding <em>AP headcount</em>.
            </>
        ),
        subhead:
            "We build AI-powered finance exception systems that catch invoice mismatches, duplicate bills, vendor-detail changes, and approval gaps before payment release.",
        primaryLabel: "Book a Finance Workflow Audit",
        primaryLocation: "hero",
        primaryHref: "/contact?audit=1",
        secondaryLabel: "Try the 3-Way Matching Demo",
        secondaryHref: "/glossary/three-way-match/",
        trustLine:
            "Built for growing businesses using accounting systems, spreadsheets, email approvals, and document-heavy finance workflows.",
        bottomStrip:
            "Catch duplicate bills, vendor-detail changes, invoice exceptions, and approval gaps. Before they become manual work, payment leakage, or another AP hire.",
    },
};

export function CoverHero({ variant }: Props) {
    const c = COPY[variant];

    return (
        <section className="site-home-hero relative overflow-hidden lg:min-h-screen">
            <div className="doc-container relative flex flex-col pt-28 pb-12 md:pt-32 md:pb-14 lg:min-h-screen lg:pt-32 lg:pb-10">
                <motion.div {...fadeUp} className="mb-10 lg:mb-12">
                    <LiveOpsStrip />
                </motion.div>

                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    <div>
                        <motion.h1 {...stagger(1)} className="doc-hero-headline">
                            {c.headlineLines}
                        </motion.h1>

                        <motion.p
                            {...stagger(2)}
                            className="mt-10 max-w-xl text-lg leading-relaxed text-foreground-muted"
                        >
                            {c.subhead}
                        </motion.p>

                        <motion.div
                            {...stagger(3)}
                            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                        >
                            <AuditCTA
                                location="hero"
                                label={c.primaryLabel}
                                href={c.primaryHref}
                            />
                            <Link href={c.secondaryHref} className="site-button-secondary audit-cta-secondary">
                                {c.secondaryLabel}
                            </Link>
                        </motion.div>

                        <motion.p
                            {...stagger(4)}
                            className="home-trust-line mt-6"
                        >
                            {c.trustLine}
                        </motion.p>
                    </div>

                    <motion.aside {...stagger(2)} className="lg:pl-8">
                        <div className="grid gap-4">
                            <VarianceExhibitVideo />
                            <RunLog />
                        </div>
                    </motion.aside>
                </div>

                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.5 }}
                    className="mt-12 border-y border-border py-4 lg:mt-10"
                >
                    <p className="home-bottom-strip">{c.bottomStrip}</p>
                </motion.div>
            </div>
        </section>
    );
}
```

Note: this references `AuditCTA` from `_shared/audit-cta.tsx` which is created in Task 4. Until Task 4 lands the import will not resolve. To avoid an intermediate broken build, do Task 4 next, then come back and run the build for both Tasks 3 and 4 at the end of Task 4. For this task, just write the file; do not run a build yet.

- [ ] **Step 2: Add two new globals.css classes**

Open `app/globals.css`. Locate the existing `@layer components { ... }` block (near the end of the file). Inside that block, add at the bottom — under a new `/* Home page */` comment — the two classes used above:

```css
    /* Home page */

    .home-trust-line {
        @apply font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle;
    }

    .home-bottom-strip {
        @apply font-mono text-[11px] uppercase tracking-[0.18em] text-foreground;
    }

    .audit-cta-secondary {
        @apply px-7;
    }
```

- [ ] **Step 3: Do not build yet**

Task 4 must land first. No commit; uncommitted state will be committed at end of Task 4.

---

## Task 4: Canonical `AuditCTA` shared component

**Files:**
- Create: `components/home/_shared/audit-cta.tsx`
- Modify: `app/globals.css` (add `.audit-cta-primary` and `.audit-cta-arrow` classes)

- [ ] **Step 1: Create `components/home/_shared/audit-cta.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { trackSiteEvent } from "@/lib/analytics/site-events";

type Location = "hero" | "mid" | "footer" | "nav" | "card";
type Variant = "primary" | "secondary";

type Props = {
    location: Location;
    label?: string;
    variant?: Variant;
    /** Override default audit href. Defaults to /contact?audit=1. */
    href?: string;
    /** Explicit src; otherwise falls back to sessionStorage utm_src. */
    src?: string;
    /** Explicit campaign; otherwise falls back to sessionStorage utm_campaign. */
    campaign?: string;
    className?: string;
};

const DEFAULT_LABEL = "Book a Finance Workflow Audit";
const DEFAULT_HREF = "/contact?audit=1";

const SESSION_SRC_KEY = "invaritech.utm.src";
const SESSION_CAMPAIGN_KEY = "invaritech.utm.campaign";

function appendParams(href: string, params: Record<string, string | undefined>): string {
    const url = new URL(href, "https://placeholder.local");
    for (const [key, value] of Object.entries(params)) {
        if (value && value.length > 0) url.searchParams.set(key, value);
    }
    return url.pathname + (url.search || "");
}

export function AuditCTA({
    location,
    label = DEFAULT_LABEL,
    variant = "primary",
    href = DEFAULT_HREF,
    src,
    campaign,
    className = "",
}: Props) {
    // Read sessionStorage on mount so SSR-rendered href doesn't differ on first
    // paint, and we get hydration without warnings.
    const [storedSrc, setStoredSrc] = useState<string | undefined>(undefined);
    const [storedCampaign, setStoredCampaign] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            setStoredSrc(window.sessionStorage.getItem(SESSION_SRC_KEY) ?? undefined);
            setStoredCampaign(window.sessionStorage.getItem(SESSION_CAMPAIGN_KEY) ?? undefined);
        } catch {
            // sessionStorage unavailable; ignore.
        }
    }, []);

    const effectiveSrc = src ?? storedSrc;
    const effectiveCampaign = campaign ?? storedCampaign;
    const finalHref = appendParams(href, { src: effectiveSrc, campaign: effectiveCampaign });

    const baseClass = variant === "secondary" ? "site-button-secondary" : "site-button";

    return (
        <Link
            href={finalHref}
            className={`${baseClass} audit-cta audit-cta-${variant} ${className}`.trim()}
            onClick={() => {
                trackSiteEvent("cta_click", {
                    location,
                    src: effectiveSrc ?? "",
                    campaign: effectiveCampaign ?? "",
                });
            }}
        >
            {label}
            <span className="audit-cta-arrow" aria-hidden>↗</span>
        </Link>
    );
}
```

- [ ] **Step 2: Add globals.css classes**

Open `app/globals.css`. In the `@layer components { ... }` block, under the `/* Home page */` comment added in Task 3, append:

```css
    .audit-cta {
        @apply px-7;
    }

    .audit-cta-primary {
        /* Layered on top of .site-button. */
    }

    .audit-cta-arrow {
        @apply ml-2 font-mono text-xs opacity-70;
    }
```

- [ ] **Step 3: Create `lib/analytics/site-events.ts` (parallel to existing glossary file)**

This file replaces `lib/analytics/glossary-events.ts` in Task 5. For now create a parallel file that re-exports the existing tracker and extends the event name union. Both files coexist until Task 5 deletes the old one.

```typescript
type SiteEventName =
    | "glossary_tool_run"
    | "glossary_tool_tolerance_change"
    | "glossary_tool_csv_upload"
    | "glossary_secondary_cta_submit"
    | "glossary_filter_chip_click"
    | "cta_click";

type SiteEventProps = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (command: "event", eventName: string, params?: SiteEventProps) => void;
    }
}

export function trackSiteEvent(name: SiteEventName, props: SiteEventProps = {}): void {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, props);
}
```

- [ ] **Step 4: Verify build green**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. The `exception-automation-home.tsx` is still using the old in-file `CoverHero`, so the new `components/home/cover-hero.tsx` is not yet rendered — but it must compile. The new `AuditCTA` must compile too.

- [ ] **Step 5: Write `tests/site-cta.test.mjs`**

This test verifies the href construction logic (`appendParams`) directly. Extract `appendParams` to a separate exported function for testability.

In `components/home/_shared/audit-cta.tsx`, change:

```typescript
function appendParams(href: string, params: Record<string, string | undefined>): string {
```

to:

```typescript
export function appendAuditCtaParams(href: string, params: Record<string, string | undefined>): string {
```

Update the call inside the component from `appendParams(...)` to `appendAuditCtaParams(...)`.

Now write `tests/site-cta.test.mjs`:

```javascript
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { appendAuditCtaParams } from "../components/home/_shared/audit-cta.tsx";

describe("appendAuditCtaParams", () => {
    it("returns the href unchanged when no params provided", () => {
        assert.equal(appendAuditCtaParams("/contact?audit=1", {}), "/contact?audit=1");
    });

    it("appends src when provided", () => {
        const result = appendAuditCtaParams("/contact?audit=1", { src: "cold-email" });
        assert.equal(result, "/contact?audit=1&src=cold-email");
    });

    it("appends campaign when provided", () => {
        const result = appendAuditCtaParams("/contact?audit=1", { campaign: "duplicate-invoice" });
        assert.equal(result, "/contact?audit=1&campaign=duplicate-invoice");
    });

    it("appends both src and campaign", () => {
        const result = appendAuditCtaParams("/contact?audit=1", { src: "cold-email", campaign: "x" });
        assert.ok(result.includes("audit=1"));
        assert.ok(result.includes("src=cold-email"));
        assert.ok(result.includes("campaign=x"));
    });

    it("ignores empty-string values", () => {
        assert.equal(appendAuditCtaParams("/contact?audit=1", { src: "" }), "/contact?audit=1");
    });

    it("ignores undefined values", () => {
        assert.equal(
            appendAuditCtaParams("/contact?audit=1", { src: undefined, campaign: undefined }),
            "/contact?audit=1"
        );
    });
});
```

- [ ] **Step 6: Run new test, verify it passes**

```bash
node --experimental-strip-types --test tests/site-cta.test.mjs 2>&1 | tail -10
```

Expected: 6 tests pass.

- [ ] **Step 7: Commit Tasks 3 + 4 together**

```bash
git add components/home/_shared/audit-cta.tsx components/home/cover-hero.tsx lib/analytics/site-events.ts app/globals.css tests/site-cta.test.mjs
git commit -m "feat(home): canonical AuditCTA component + CoverHero variant skeleton"
```

---

## Task 5: Migrate existing CTA callsites to AuditCTA; delete GlossaryPrimaryCTA

**Files:**
- Modify: `app/glossary/three-way-match/page.tsx`
- Modify: `components/glossary/three-way-matcher-secondary-cta.tsx`
- Delete: `components/glossary/glossary-primary-cta.tsx`
- Delete: `lib/analytics/glossary-events.ts`
- Modify: `components/glossary/three-way-matcher.tsx` (imports `trackGlossaryEvent` from old file)

- [ ] **Step 1: Update event-tracker imports across the glossary tree**

Find every file that imports `trackGlossaryEvent` or `GlossaryPrimaryCTA`:

```bash
grep -rn "trackGlossaryEvent\|GlossaryPrimaryCTA\|glossary-primary-cta\|glossary-events" app components --include="*.ts" --include="*.tsx" 2>/dev/null
```

Expected callsites:
- `components/glossary/three-way-matcher.tsx`
- `components/glossary/three-way-matcher-secondary-cta.tsx`
- `components/glossary/glossary-primary-cta.tsx` (to delete)
- `app/glossary/three-way-match/page.tsx`

In each `.ts`/`.tsx` file (except the to-be-deleted ones), replace:

```typescript
import { trackGlossaryEvent } from "@/lib/analytics/glossary-events";
```

with:

```typescript
import { trackSiteEvent } from "@/lib/analytics/site-events";
```

Replace each call `trackGlossaryEvent(...)` with `trackSiteEvent(...)`.

- [ ] **Step 2: Replace `GlossaryPrimaryCTA` callsites in `app/glossary/three-way-match/page.tsx`**

Open `app/glossary/three-way-match/page.tsx`.

Replace the import line:

```tsx
import { GlossaryPrimaryCTA } from "@/components/glossary/glossary-primary-cta";
```

with:

```tsx
import { AuditCTA } from "@/components/home/_shared/audit-cta";
```

Replace each callsite:

```tsx
<GlossaryPrimaryCTA location="hero" label="Book a free Finance Exception Audit" />
```

with:

```tsx
<AuditCTA location="hero" label="Book a Finance Workflow Audit" src="glossary-3wm" />
```

Replace:

```tsx
<GlossaryPrimaryCTA location="mid" label="Book the audit" />
```

with:

```tsx
<AuditCTA location="mid" label="Book a Finance Workflow Audit" src="glossary-3wm" />
```

Replace:

```tsx
<GlossaryPrimaryCTA location="footer" label="Book the audit" />
```

with:

```tsx
<AuditCTA location="footer" label="Book a Finance Workflow Audit" src="glossary-3wm" />
```

- [ ] **Step 3: Replace `GlossaryPrimaryCTA` callsites in `components/glossary/three-way-matcher-secondary-cta.tsx`**

Open the file. Search for any `<GlossaryPrimaryCTA ... />` usage. Replace imports and usages the same way as Step 2 (use `location="card"` and `src="glossary-3wm-secondary"` for the secondary CTA case if such a usage exists in this file; otherwise leave the file untouched).

If the file only references `trackGlossaryEvent`, that was handled in Step 1.

- [ ] **Step 4: Delete the old files**

```bash
git rm components/glossary/glossary-primary-cta.tsx lib/analytics/glossary-events.ts
```

- [ ] **Step 5: Build check**

```bash
pnpm build 2>&1 | tail -15
```

Expected: clean build. No "Cannot find module" errors for `glossary-events` or `glossary-primary-cta`.

- [ ] **Step 6: Update site-events event-name union for parity**

Open `lib/analytics/site-events.ts`. The `SiteEventName` union should already include all the glossary event names from Task 4 Step 3 — verify.

- [ ] **Step 7: Run all tests, verify green**

```bash
node --experimental-strip-types --test tests/*.test.mjs 2>&1 | tail -10
```

Expected: 0 failures. (Existing 28 + 6 new from Task 4 = 34 tests minimum.)

- [ ] **Step 8: Commit**

```bash
git add app/glossary/three-way-match/page.tsx components/glossary/three-way-matcher-secondary-cta.tsx components/glossary/three-way-matcher.tsx
git commit -m "refactor(cta): migrate glossary callsites to AuditCTA; drop GlossaryPrimaryCTA"
```

---

## Task 6: UTM capture hook

**Files:**
- Create: `lib/utm-capture.ts`
- Create: `tests/utm-capture.test.mjs`

- [ ] **Step 1: Write failing test**

Write `tests/utm-capture.test.mjs`:

```javascript
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseUtmParams } from "../lib/utm-capture.ts";

describe("parseUtmParams", () => {
    it("returns empty object when no params present", () => {
        assert.deepEqual(parseUtmParams("/finance-exception-automation"), {});
    });

    it("extracts src param", () => {
        assert.deepEqual(
            parseUtmParams("/finance-exception-automation?src=cold-email"),
            { src: "cold-email" }
        );
    });

    it("extracts campaign param", () => {
        assert.deepEqual(
            parseUtmParams("/finance-exception-automation?campaign=q4"),
            { campaign: "q4" }
        );
    });

    it("extracts both src and campaign", () => {
        assert.deepEqual(
            parseUtmParams("/p?src=cold-email&campaign=duplicate-invoice"),
            { src: "cold-email", campaign: "duplicate-invoice" }
        );
    });

    it("ignores other query params", () => {
        const result = parseUtmParams("/p?src=x&campaign=y&utm_term=foo&audit=1");
        assert.equal(result.src, "x");
        assert.equal(result.campaign, "y");
        assert.equal(Object.keys(result).length, 2);
    });

    it("treats empty string values as absent", () => {
        assert.deepEqual(parseUtmParams("/p?src=&campaign="), {});
    });
});
```

- [ ] **Step 2: Run test, verify it fails**

```bash
node --experimental-strip-types --test tests/utm-capture.test.mjs 2>&1 | tail -10
```

Expected: 6 failures, module not found.

- [ ] **Step 3: Implement `lib/utm-capture.ts`**

```typescript
"use client";

import { useEffect } from "react";

const SESSION_SRC_KEY = "invaritech.utm.src";
const SESSION_CAMPAIGN_KEY = "invaritech.utm.campaign";

export type UtmParams = {
    src?: string;
    campaign?: string;
};

/**
 * Parse src/campaign params from a URL or path+search string. Pure function,
 * testable.
 */
export function parseUtmParams(urlOrPath: string): UtmParams {
    // URL constructor needs a base for relative paths; use a placeholder.
    const url = new URL(urlOrPath, "https://placeholder.local");
    const out: UtmParams = {};
    const src = url.searchParams.get("src");
    const campaign = url.searchParams.get("campaign");
    if (src && src.length > 0) out.src = src;
    if (campaign && campaign.length > 0) out.campaign = campaign;
    return out;
}

/**
 * Client-side hook: on mount, reads ?src and ?campaign from the current URL
 * and stores them in sessionStorage for later CTA pickup. Safe to call from
 * any page; only acts when in a browser context.
 */
export function useUtmCapture(): void {
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const params = parseUtmParams(window.location.pathname + window.location.search);
            if (params.src) window.sessionStorage.setItem(SESSION_SRC_KEY, params.src);
            if (params.campaign) window.sessionStorage.setItem(SESSION_CAMPAIGN_KEY, params.campaign);
        } catch {
            // sessionStorage unavailable; ignore.
        }
    }, []);
}
```

- [ ] **Step 4: Run test, verify it passes**

```bash
node --experimental-strip-types --test tests/utm-capture.test.mjs 2>&1 | tail -10
```

Expected: 6 tests pass.

- [ ] **Step 5: Build check**

```bash
pnpm build 2>&1 | tail -5
```

Expected: clean build.

- [ ] **Step 6: Commit**

```bash
git add lib/utm-capture.ts tests/utm-capture.test.mjs
git commit -m "feat(analytics): UTM capture hook and pure parseUtmParams"
```

---

## Task 7: Extract Problem section (MessyMiddle) with variant

**Files:**
- Create: `components/home/problem.tsx`
- Modify: `components/exception-automation-home.tsx`

- [ ] **Step 1: Create `components/home/problem.tsx`**

```tsx
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
```

- [ ] **Step 2: Add `.problem-pain-list` to globals.css**

Under the `/* Home page */` block in `app/globals.css`, append:

```css
    .problem-pain-list {
        @apply mt-2 mb-2 grid gap-1 list-disc pl-6 text-base;
    }
```

- [ ] **Step 3: Update `components/exception-automation-home.tsx`**

At the top, add import:

```tsx
import { Problem } from "@/components/home/problem";
```

Delete the existing `MessyMiddle` function and its preceding section comment from the file.

In the default export, replace `<MessyMiddle />` with `<Problem variant="broad" />`.

- [ ] **Step 4: Build check + visual parity**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. Visual: the homepage problem section should still render with the same gap-schematic visualization. The headline text is now broader-worded ("Your software stores the transaction") instead of finance-specific.

- [ ] **Step 5: Commit**

```bash
git add components/home/problem.tsx components/exception-automation-home.tsx app/globals.css
git commit -m "refactor(home): extract Problem section with broad/finance variant"
```

---

## Task 8: Extract ServiceMethod (HowWeWork) with variant

**Files:**
- Create: `components/home/service-method.tsx`
- Modify: `components/exception-automation-home.tsx`

- [ ] **Step 1: Locate the current `ServiceMethod` function**

In `components/exception-automation-home.tsx` find the section ~lines 549–600 (function `ServiceMethod`) plus the `METHOD` array above it (~lines 521–547).

- [ ] **Step 2: Create `components/home/service-method.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";

type Variant = "broad" | "finance";

type Props = { variant: Variant };

const METHOD_BROAD = [
    { title: "Find the leakage", body: "Audit current workflow, documents, exports, approvals, and manual checks.", output: "Workflow map · exception risk list" },
    { title: "Encode the rules", body: "Convert business logic into deterministic checks, AI-assisted matching, and exception rules.", output: "Rule library · acceptance criteria" },
    { title: "Automate the checks", body: "Build the workflow layer that reviews documents and data before humans waste time.", output: "Working automation · alerts" },
    { title: "Monitor the workflow", body: "Surface only the cases that need human judgment. Everything else is logged and dismissed.", output: "Review dashboard · digest" },
    { title: "Improve over time", body: "Use real usage data to make the process faster, safer, and less dependent on headcount.", output: "Rule updates · monthly delta" },
];

const METHOD_FINANCE = [
    { title: "Audit the workflow", body: "We map the current process, data sources, approval steps, and exception checks.", output: "Workflow map · exception inventory" },
    { title: "Identify the highest-value exception", body: "We find the manual check most likely to reduce risk, save time, or avoid extra headcount.", output: "Ranked exception list · ROI estimate" },
    { title: "Build the first system", body: "We create a focused automation layer around your existing accounting tools, documents, and approval process.", output: "Working system · acceptance criteria" },
    { title: "Route exceptions for review", body: "Your team stops checking everything manually and reviews the cases that actually need attention.", output: "Review queue · evidence links" },
    { title: "Improve over time", body: "Rules, thresholds, matching logic, and workflows are refined as real exceptions appear.", output: "Tuned rules · monthly delta" },
];

const COPY: Record<Variant, {
    title: string;
    meta: string;
    method: typeof METHOD_BROAD;
    railBody: React.ReactNode;
}> = {
    broad: {
        title: "How builds work",
        meta: "Find · Encode · Automate · Monitor · Improve",
        method: METHOD_BROAD,
        railBody: (
            <>
                Every build starts with a fixed scope, clear inputs, and
                written acceptance criteria. No open-ended discovery. No
                vague AI promises. Each handover includes working
                automation, monitoring, and a deferred period to tune the
                system against your first 30 days of real exception traffic.
            </>
        ),
    },
    finance: {
        title: "Start with one workflow. Prove value. Then expand.",
        meta: "Audit · Identify · Build · Route · Improve",
        method: METHOD_FINANCE,
        railBody: (
            <>
                Each engagement is a fixed-scope build with a written
                workflow map and acceptance criteria. We sit on top of your
                accounting system; you keep your AP team and your reviewers.
                The system runs against your first 30 days of real
                exception traffic before we step back.
            </>
        ),
    },
};

export function ServiceMethod({ variant }: Props) {
    const c = COPY[variant];
    return (
        <section id="how" className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">{c.title}</h2>
                    <span className="section-mark-meta">{c.meta}</span>
                </motion.header>

                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.aside {...fadeUp} className="marginalia-rail">
                        <span className="marginalia-rail-key">Service method</span>
                        {c.railBody}
                    </motion.aside>

                    <motion.ol {...fadeUp} className="service-method-list">
                        {c.method.map((m, i) => (
                            <li key={m.title} className="service-method-row">
                                <span className="service-method-step">0{i + 1}</span>
                                <div className="service-method-body">
                                    <h3 className="service-method-title">{m.title}</h3>
                                    <p className="service-method-text">{m.body}</p>
                                    <p className="service-method-output">{m.output}</p>
                                </div>
                            </li>
                        ))}
                    </motion.ol>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 3: Confirm `.service-method-*` classes already exist in globals.css**

```bash
grep -n "\.service-method" app/globals.css | head -5
```

If classes don't exist, copy them from the current homepage (look in the surrounding CSS for the same class names; they should already be present since the existing homepage renders with them).

If they don't exist, add to globals.css `/* Home page */` block:

```css
    .service-method-list { @apply space-y-8 list-none p-0; }
    .service-method-row { @apply grid grid-cols-[auto_1fr] gap-6 items-start; }
    .service-method-step { @apply font-mono text-2xl text-primary leading-none; }
    .service-method-body { @apply space-y-2; }
    .service-method-title { @apply text-xl font-medium text-foreground site-font-display; }
    .service-method-text { @apply text-base leading-relaxed text-foreground-muted; }
    .service-method-output { @apply font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle; }
```

- [ ] **Step 4: Update `components/exception-automation-home.tsx`**

Add import:

```tsx
import { ServiceMethod } from "@/components/home/service-method";
```

Delete the existing `METHOD` array and `ServiceMethod` function definitions. In the default export, replace `<ServiceMethod />` with `<ServiceMethod variant="broad" />`.

- [ ] **Step 5: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 6: Commit**

```bash
git add components/home/service-method.tsx components/exception-automation-home.tsx app/globals.css
git commit -m "refactor(home): extract ServiceMethod with broad/finance variant"
```

---

## Task 9: Extract SystemsRegister (with expandable card capability)

**Files:**
- Create: `components/home/systems-register.tsx`
- Modify: `components/exception-automation-home.tsx`

- [ ] **Step 1: Create `components/home/systems-register.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

import { fadeUp } from "./_motion";

type System = {
    idx: string;
    anchor: string;
    name: string;
    catches: string;
    price: string;
    /** When defined, card is a link to that route; otherwise card is expandable. */
    href?: string;
    detail?: {
        inputs: string[];
        catchesList: string[];
        outputs: string[];
    };
};

const SYSTEMS: System[] = [
    {
        idx: "01",
        anchor: "dup-invoice",
        name: "Duplicate Invoice Exception System",
        catches: "Flags exact and near-duplicate supplier bills before payment using supplier, amount, invoice number, date, description, and fuzzy matching.",
        price: "USD 4k to 12k",
        detail: {
            inputs: ["Accounting export (AP)", "Inbox attachments (PDF, scanned)", "Vendor master"],
            catchesList: ["Exact duplicates", "Near-duplicates by amount + supplier", "Re-imported invoices", "Supplier-side billing-system retries"],
            outputs: ["Review queue of candidate duplicates", "Audit trail with evidence links", "Pre-payment hold flag for accounting system"],
        },
    },
    {
        idx: "02",
        anchor: "vendor-change",
        name: "Vendor Change Control System",
        catches: "Detects supplier bank-detail and master-data changes, routes them for approval, and captures evidence before payment risk increases.",
        price: "USD 5k to 15k",
        detail: {
            inputs: ["Vendor master snapshots", "Change request emails", "Approval policy thresholds"],
            catchesList: ["Bank-detail changes", "Tax-ID changes", "Address changes near month-end", "Changes lacking written authorization"],
            outputs: ["Change-control review queue", "Two-party approval audit trail", "Evidence pack stored against vendor record"],
        },
    },
    {
        idx: "03",
        anchor: "approval-gap",
        name: "Approval Gap Detection System",
        catches: "Finds bills or payments where approval evidence is missing, incomplete, or scattered across email, documents, and accounting exports.",
        price: "USD 6k to 18k",
        detail: {
            inputs: ["AP export", "Email/Slack approval threads", "Policy thresholds by amount and vendor"],
            catchesList: ["Bills paid without approval", "Approvals below threshold", "Approval evidence outside policy window", "Out-of-cycle exception approvals"],
            outputs: ["Gap report with evidence links", "Pre-pay hold list", "Monthly close audit pack"],
        },
    },
    {
        idx: "04",
        anchor: "three-way",
        name: "3-Way Matching Exception System",
        catches: "Compares invoices, purchase orders, and delivery/receipt evidence, then surfaces mismatches for human review.",
        price: "USD 8k to 25k",
        href: "/glossary/three-way-match/",
    },
    {
        idx: "05",
        anchor: "dashboard",
        name: "AP Exception Dashboard",
        catches: "Creates one review queue for duplicate candidates, vendor changes, missing approvals, mismatches, unusual amounts, and other finance exceptions.",
        price: "USD 10k to 30k",
        detail: {
            inputs: ["Outputs of the four systems above", "Reviewer roster", "Notification preferences"],
            catchesList: ["Cross-system exception state", "Reviewer assignment per exception type", "SLA breaches"],
            outputs: ["Single review queue", "Exportable monthly exception report", "Reviewer performance metrics"],
        },
    },
];

export function SystemsRegister() {
    const [openIdx, setOpenIdx] = useState<string | null>(null);

    return (
        <section id="systems" className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">Fixed-scope finance exception systems</h2>
                    <span className="section-mark-meta">Five builds. One umbrella.</span>
                </motion.header>

                <motion.div {...fadeUp} className="exception-register">
                    <div className="exception-register-head">
                        <span>#</span>
                        <span>What it does</span>
                        <span>Price range</span>
                        <span />
                    </div>
                    {SYSTEMS.map((row, i) => {
                        const isOpen = openIdx === row.anchor;
                        const inner = (
                            <>
                                <span className="exception-register-index">{row.idx}</span>
                                <span className="exception-register-title">
                                    <span className="exception-register-name">{row.name}</span>
                                    <span className="exception-register-catches">{row.catches}</span>
                                </span>
                                <span className="exception-register-price">{row.price}</span>
                                <span className="exception-register-arrow">{row.href ? "↗" : (isOpen ? "−" : "+")}</span>
                            </>
                        );
                        return (
                            <motion.div
                                key={row.idx}
                                id={row.anchor}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
                            >
                                {row.href ? (
                                    <Link href={row.href} className="exception-register-row">
                                        {inner}
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setOpenIdx(isOpen ? null : row.anchor)}
                                        aria-expanded={isOpen}
                                        aria-controls={`${row.anchor}-detail`}
                                        className="exception-register-row exception-register-row-button"
                                    >
                                        {inner}
                                    </button>
                                )}
                                {!row.href && row.detail && isOpen && (
                                    <div id={`${row.anchor}-detail`} className="exception-register-detail">
                                        <div className="exception-register-detail-col">
                                            <h4 className="exception-register-detail-head">Typical inputs</h4>
                                            <ul>{row.detail.inputs.map((s) => <li key={s}>{s}</li>)}</ul>
                                        </div>
                                        <div className="exception-register-detail-col">
                                            <h4 className="exception-register-detail-head">What it catches</h4>
                                            <ul>{row.detail.catchesList.map((s) => <li key={s}>{s}</li>)}</ul>
                                        </div>
                                        <div className="exception-register-detail-col">
                                            <h4 className="exception-register-detail-head">Outputs</h4>
                                            <ul>{row.detail.outputs.map((s) => <li key={s}>{s}</li>)}</ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.p {...fadeUp} className="exception-register-footnote">
                    Price ranges depend on workflow complexity, data sources, and exception rules.
                </motion.p>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add globals.css classes for expandable detail panel and button row**

Under the `/* Home page */` block in `app/globals.css`, append:

```css
    .exception-register-row-button {
        @apply text-left bg-transparent border-0 w-full cursor-pointer;
    }

    .exception-register-detail {
        @apply grid gap-6 border-t border-border bg-card/40 p-6 md:grid-cols-3;
    }

    .exception-register-detail-head {
        @apply mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary;
    }

    .exception-register-detail-col ul {
        @apply space-y-1 text-sm text-foreground-muted list-disc pl-5;
    }

    .exception-register-footnote {
        @apply mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle;
    }
```

- [ ] **Step 3: Update `components/exception-automation-home.tsx`**

Add import:

```tsx
import { SystemsRegister } from "@/components/home/systems-register";
```

Delete the existing `REGISTER` array and `ExceptionRegister` function definitions. In the default export, replace `<ExceptionRegister />` with `<SystemsRegister />`.

- [ ] **Step 4: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. Cards 01, 02, 03, 05 become expand-buttons; card 04 (3-way matching) is a link to `/glossary/three-way-match/`.

- [ ] **Step 5: Commit**

```bash
git add components/home/systems-register.tsx components/exception-automation-home.tsx app/globals.css
git commit -m "refactor(home): extract SystemsRegister with expandable detail panels"
```

---

## Task 10: Extract WhyNotAccounting (with comparison table)

**Files:**
- Create: `components/home/why-not-accounting.tsx`
- Modify: `components/exception-automation-home.tsx`

- [ ] **Step 1: Create `components/home/why-not-accounting.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";

const COMPARISON_ROWS: { existing: string; invaritech: string }[] = [
    { existing: "Stores bills and payments", invaritech: "Flags risky or duplicate candidates" },
    { existing: "Holds supplier records", invaritech: "Detects sensitive supplier changes" },
    { existing: "Tracks transactions", invaritech: "Connects documents, approvals, and evidence" },
    { existing: "Exports reports", invaritech: "Creates review queues and exception logic" },
    { existing: "Supports finance work", invaritech: "Automates the checks around finance work" },
];

export function WhyNotAccounting() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        We do not replace your accounting software. We automate the checks around it.
                    </h2>
                    <span className="section-mark-meta">Existing tools vs. automation layer</span>
                </motion.header>

                <motion.p
                    {...fadeUp}
                    className="why-not-accounting-lede"
                >
                    Accounting systems are excellent at recording transactions.
                    But every business has custom rules around approvals,
                    documents, vendors, evidence, thresholds, and exception
                    handling. That is where manual work creeps back in.
                </motion.p>

                <motion.div {...fadeUp} className="why-not-accounting-table-wrap">
                    <table className="why-not-accounting-table">
                        <thead>
                            <tr>
                                <th scope="col">Existing systems</th>
                                <th scope="col">Invaritech automation layer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <tr key={row.existing}>
                                    <td>{row.existing}</td>
                                    <td>{row.invaritech}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.p
                    {...fadeUp}
                    className="why-not-accounting-footer"
                >
                    We work <em className="not-italic text-foreground">on top of</em>{" "}
                    QuickBooks, NetSuite, SAP, Xero, MYOB, and ERP exports. We do not
                    replace your accounting system.
                </motion.p>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add globals.css classes for comparison table**

Under the `/* Money page */` block in `app/globals.css` (add the block if it doesn't yet exist, right after `/* Home page */`):

```css
    /* Money page */

    .why-not-accounting-lede {
        @apply mt-8 max-w-2xl text-base leading-relaxed text-foreground-muted;
    }

    .why-not-accounting-table-wrap {
        @apply mt-8 overflow-x-auto border border-border;
    }

    .why-not-accounting-table {
        @apply w-full border-collapse text-sm;
    }

    .why-not-accounting-table thead th {
        @apply border-b border-border bg-card/60 px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-primary;
    }

    .why-not-accounting-table tbody td {
        @apply border-b border-border/60 px-4 py-3 text-foreground;
    }

    .why-not-accounting-table tbody tr:last-child td {
        @apply border-b-0;
    }

    .why-not-accounting-table tbody td:first-child {
        @apply bg-card/40 text-foreground-muted;
    }

    .why-not-accounting-footer {
        @apply mt-8 max-w-2xl font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle;
    }
```

- [ ] **Step 3: Update `components/exception-automation-home.tsx`**

Add import:

```tsx
import { WhyNotAccounting } from "@/components/home/why-not-accounting";
```

Delete the existing `WhyCustom` function definition. In the default export, replace `<WhyCustom />` with `<WhyNotAccounting />`.

- [ ] **Step 4: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. Homepage now renders the comparison table in place of the prior Why-Custom prose section.

- [ ] **Step 5: Commit**

```bash
git add components/home/why-not-accounting.tsx components/exception-automation-home.tsx app/globals.css
git commit -m "refactor(home): replace WhyCustom with WhyNotAccounting + comparison table"
```

---

## Task 11: Extract AuditCTASection and ProofGrid (with variant) and remaining helpers

**Files:**
- Create: `components/home/audit-cta-section.tsx`
- Create: `components/home/proof-grid.tsx`
- Create: `components/home/footnotes.tsx`
- Create: `components/home/colophon.tsx`
- Modify: `components/exception-automation-home.tsx`

- [ ] **Step 1: Create `components/home/audit-cta-section.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

type Variant = "broad" | "finance";

type Props = { variant: Variant; src?: string };

const COPY: Record<Variant, {
    title: string;
    meta: string;
    headline: React.ReactNode;
    supporting: string;
    deliverables: string[];
    secondaryLabel: string;
}> = {
    broad: {
        title: "Free finance exception audit",
        meta: "Free during launch",
        headline: (
            <>
                Show us the finance workflow your team
                checks <em className="italic text-primary">manually</em>.
            </>
        ),
        supporting:
            "We will identify the highest-value exception pattern and recommend the smallest useful first system to build. Free during launch for selected finance teams.",
        deliverables: [
            "Current workflow review",
            "Sample export review where available",
            "Manual exception check mapping",
            "Payment-control risk list",
            "Recommended first system",
            "Launch range + acceptance criteria",
        ],
        secondaryLabel: "Send a sample export",
    },
    finance: {
        title: "Book a Finance Workflow Exception Audit",
        meta: "Fixed-scope inspection",
        headline: (
            <>
                Inspect one finance workflow.
                Identify which checks can be <em className="italic text-primary">automated first</em>.
            </>
        ),
        supporting:
            "We inspect one finance workflow and identify which checks can be automated first. You receive a workflow map, exception-risk list, recommended first build, and a fixed-scope implementation plan.",
        deliverables: [
            "Workflow map",
            "Manual check inventory",
            "Exception risk list",
            "Sample automation opportunities",
            "Recommended first system",
            "Fixed-scope build estimate",
        ],
        secondaryLabel: "Send a sample export",
    },
};

export function AuditCTASection({ variant, src }: Props) {
    const c = COPY[variant];
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">{c.title}</h2>
                    <span className="section-mark-meta">{c.meta}</span>
                </motion.header>

                <motion.div {...fadeUp} className="audit-cta-panel">
                    <div className="audit-cta-grid">
                        <div>
                            <h3 className="audit-cta-headline">{c.headline}</h3>
                            <p className="audit-cta-supporting">{c.supporting}</p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <AuditCTA location="mid" src={src} />
                                <AuditCTA
                                    location="mid"
                                    variant="secondary"
                                    label={c.secondaryLabel}
                                    src={src}
                                />
                            </div>
                        </div>

                        <ul className="audit-cta-list">
                            {c.deliverables.map((d) => <li key={d}>{d}</li>)}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Rename existing `.audit-cta` class to `.audit-cta-panel`**

The existing CSS has an `.audit-cta` class for the panel and an `.audit-cta-grid` inside it. Now that the `AuditCTA` *component* uses `.audit-cta` as a class, rename the **panel class** to avoid collision.

In `app/globals.css`, find the existing `.audit-cta` rule and rename it to `.audit-cta-panel`:

```bash
grep -n "\.audit-cta" app/globals.css
```

Edit the CSS so:
- `.audit-cta { ... }` becomes `.audit-cta-panel { ... }`
- `.audit-cta-grid`, `.audit-cta-headline`, `.audit-cta-supporting`, `.audit-cta-list` remain unchanged
- `.audit-cta` and `.audit-cta-primary` (from Task 4) remain on the button itself

After rename, search the codebase for any other `audit-cta`-as-panel references and update them. None should exist outside this file because the homepage's old `AuditCTA` function (now being deleted) is the only consumer.

- [ ] **Step 3: Create `components/home/proof-grid.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { fadeUp } from "./_motion";

type Variant = "broad" | "finance-emphasis";

type Exhibit = {
    label: string;
    meta: string;
    title: string;
    body: string;
    proves: string;
    href: string;
};

const FINANCE: Exhibit[] = [
    {
        label: "Case study",
        meta: "2025",
        title: "EUDR Compliance Bridge",
        body: "Regulatory document workflow with REST/SOAP integration, evidence capture, and exception routing across a hundred-plus document types.",
        proves: "Complex document workflows",
        href: "/work/eudr-compliance-bridge",
    },
    {
        label: "Live demo",
        meta: "Interactive",
        title: "Three-Way Matcher",
        body: "Compare invoices, POs, and goods receipts in the browser. Surfaces every canonical AP exception type against sample data.",
        proves: "Finance exception logic",
        href: "/glossary/three-way-match/",
    },
    {
        label: "Live tool",
        meta: "Free",
        title: "Invoice Extractor",
        body: "Upload a supplier invoice PDF; extract structured fields, vendor metadata, and line items for downstream rule application.",
        proves: "Document intelligence pipeline",
        href: "/resources/invoice-extractor",
    },
    {
        label: "Interactive",
        meta: "Reference",
        title: "Supplier Payment Control Rule Table",
        body: "Filter, severity-rank, and configure payment-control rules against a sample AP register.",
        proves: "Rule library + exception logic",
        href: "/resources/supplier-payment-control-rule-table",
    },
];

const ADJACENT: Exhibit[] = [
    {
        label: "Capability",
        meta: "Workflow",
        title: "Inventory Workflow Automation",
        body: "Messaging-driven inventory operations workflows with structured-data capture and approval routing.",
        proves: "Messaging-driven workflows",
        href: "/work",
    },
    {
        label: "Capability",
        meta: "Workflow",
        title: "WhatsApp Booking Automation",
        body: "Appointment booking and coordination flows delivered through messaging, with downstream data sync.",
        proves: "Conversational operations",
        href: "/work",
    },
    {
        label: "Capability",
        meta: "Integration",
        title: "Regulatory API Bridges",
        body: "REST-to-SOAP and other protocol bridges for high-volume regulatory document submission.",
        proves: "Integration & protocol bridges",
        href: "/work/eudr-compliance-bridge",
    },
];

type Props = { variant: Variant };

export function ProofGrid({ variant }: Props) {
    const isFinanceEmphasis = variant === "finance-emphasis";
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">Built from real automation work</h2>
                    <span className="section-mark-meta">
                        {isFinanceEmphasis ? "Finance · adjacent capability" : "Capability across workflows"}
                    </span>
                </motion.header>

                <motion.div {...fadeUp} className="proof-row-head">
                    <span className="proof-row-key">Finance exception logic</span>
                </motion.div>
                <div className={isFinanceEmphasis ? "exhibit-grid proof-grid-emphasis" : "exhibit-grid"}>
                    {FINANCE.map((ex, i) => (
                        <motion.div
                            key={ex.href}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link href={ex.href} className="exhibit-card">
                                <div className="exhibit-card-header">
                                    <span className="exhibit-card-label">{ex.label}</span>
                                    <span className="exhibit-card-meta">{ex.meta}</span>
                                </div>
                                <h3 className="exhibit-card-title">{ex.title}</h3>
                                <p className="exhibit-card-body">{ex.body}</p>
                                <div className="exhibit-card-footer">
                                    <span><strong>{ex.proves}</strong></span>
                                    <span>↗</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div {...fadeUp} className="proof-row-head proof-row-head-second">
                    <span className="proof-row-key">Adjacent automation capability</span>
                </motion.div>
                <div className="exhibit-grid proof-grid-adjacent">
                    {ADJACENT.map((ex, i) => (
                        <motion.div
                            key={ex.href + ex.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link href={ex.href} className="exhibit-card">
                                <div className="exhibit-card-header">
                                    <span className="exhibit-card-label">{ex.label}</span>
                                    <span className="exhibit-card-meta">{ex.meta}</span>
                                </div>
                                <h3 className="exhibit-card-title">{ex.title}</h3>
                                <p className="exhibit-card-body">{ex.body}</p>
                                <div className="exhibit-card-footer">
                                    <span><strong>{ex.proves}</strong></span>
                                    <span>↗</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 4: Add globals.css proof-row classes**

Under the `/* Home page */` block in `app/globals.css`, append:

```css
    .proof-row-head {
        @apply mt-10 mb-4 flex items-center gap-3;
    }

    .proof-row-head-second {
        @apply mt-16;
    }

    .proof-row-key {
        @apply font-mono text-[11px] uppercase tracking-[0.22em] text-primary;
    }

    .proof-grid-emphasis .exhibit-card {
        @apply min-h-56;
    }

    .proof-grid-adjacent .exhibit-card {
        @apply min-h-40 opacity-95;
    }
```

- [ ] **Step 5: Create `components/home/footnotes.tsx`**

```tsx
export function Footnotes() {
    return (
        <section className="border-t border-border bg-card/40 py-14">
            <div className="doc-container">
                <div className="footnotes">
                    <div className="footnotes-title">Footnotes · cited claims</div>
                    <ol className="footnotes-list">
                        <li>
                            Positioning DNA & Strategic Doctrine, §4.1 — &ldquo;The
                            company exists to automate the messy middle.&rdquo;
                        </li>
                        <li>
                            Doctrine §5 (Positioning hierarchy, Platform angle):
                            &ldquo;Works on top of existing systems like Xero, MYOB,
                            QuickBooks, ERP exports, inboxes, and spreadsheets.&rdquo;
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 6: Create `components/home/colophon.tsx`**

```tsx
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
```

- [ ] **Step 7: Update `components/exception-automation-home.tsx`**

Add imports:

```tsx
import { AuditCTASection } from "@/components/home/audit-cta-section";
import { ProofGrid } from "@/components/home/proof-grid";
import { Footnotes } from "@/components/home/footnotes";
import { Colophon } from "@/components/home/colophon";
```

Delete `EXHIBITS`, `Exhibits`, `AuditCTA` (function, not component), `Footnotes`, and `Colophon` from this file. In the default export, replace:
- `<Exhibits />` → `<ProofGrid variant="broad" />`
- `<AuditCTA />` (function call) → `<AuditCTASection variant="broad" />`
- `<Footnotes />` → same name from new import
- `<Colophon />` → same name from new import

Also note: the section title for `<Exhibits />` is being changed from "See what we have automated" to "Built from real automation work" — that's already in the new component.

- [ ] **Step 8: Final composer state**

`components/exception-automation-home.tsx` default export should now read (roughly):

```tsx
import { CoverHero } from "@/components/home/cover-hero";
import { Problem } from "@/components/home/problem";
// ...

export default function ExceptionAutomationHome() {
    return (
        <main className="site-page">
            <CoverHero variant="homepage" />
            <Problem variant="broad" />
            <SystemsRegister />
            <ServiceMethod variant="broad" />
            <WhyNotAccounting />
            <ProofGrid variant="broad" />
            <AuditCTASection variant="broad" />
            <Footnotes />
            <Colophon />
        </main>
    );
}
```

The file size should now be ~30-50 lines.

- [ ] **Step 9: Build check + visual parity**

```bash
pnpm build 2>&1 | tail -15
```

Expected: clean build. Visual: homepage should render exactly as today, with one observable change — the WhyCustom prose section has been replaced by the comparison table (intentional, locked in design). All other sections look identical.

- [ ] **Step 10: Commit**

```bash
git add components/home/audit-cta-section.tsx components/home/proof-grid.tsx components/home/footnotes.tsx components/home/colophon.tsx components/exception-automation-home.tsx app/globals.css
git commit -m "refactor(home): extract AuditCTASection, ProofGrid, Footnotes, Colophon"
```

---

## Task 12: New homepage sections — WhatWeAutomate and FinanceFirstFocus

**Files:**
- Create: `components/home/what-we-automate.tsx`
- Create: `components/home/finance-first-focus.tsx`
- Modify: `components/exception-automation-home.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/home/what-we-automate.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { fadeUp } from "./_motion";

const CARDS = [
    {
        eyebrow: "Focus area",
        title: "Finance exception checks",
        body: "Duplicate bills, vendor changes, approval gaps, invoice and PO matching, payment-control rules.",
        href: "/finance-exception-automation",
        cta: "See finance systems",
    },
    {
        eyebrow: "Adjacent",
        title: "Regulatory document workflows",
        body: "Multi-document submission, evidence capture, exception routing across a hundred-plus document types.",
        href: "/work/eudr-compliance-bridge",
        cta: "See EUDR case study",
    },
    {
        eyebrow: "Adjacent",
        title: "Operations approval gaps",
        body: "Approvals scattered across messaging, email, and spreadsheets. Routed for review with evidence attached.",
        href: "/work",
        cta: "See selected work",
    },
];

export function WhatWeAutomate() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        We automate the checks around your systems of record.
                    </h2>
                    <span className="section-mark-meta">Where work happens between systems</span>
                </motion.header>

                <div className="what-we-automate-grid">
                    {CARDS.map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                        >
                            <Link href={c.href} className="what-we-automate-card">
                                <span className="what-we-automate-eyebrow">{c.eyebrow}</span>
                                <h3 className="what-we-automate-title">{c.title}</h3>
                                <p className="what-we-automate-body">{c.body}</p>
                                <span className="what-we-automate-cta">
                                    {c.cta} <span aria-hidden>↗</span>
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add globals.css classes for WhatWeAutomate**

Under the `/* Home page */` block in `app/globals.css`, append:

```css
    .what-we-automate-grid {
        @apply mt-10 grid gap-px bg-border md:grid-cols-3;
    }

    .what-we-automate-card {
        @apply block bg-background p-7 transition-colors hover:bg-card;
    }

    .what-we-automate-eyebrow {
        @apply block font-mono text-[10px] uppercase tracking-[0.22em] text-primary;
    }

    .what-we-automate-title {
        @apply mt-4 text-xl font-medium text-foreground site-font-display;
    }

    .what-we-automate-body {
        @apply mt-3 text-sm leading-relaxed text-foreground-muted;
    }

    .what-we-automate-cta {
        @apply mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-primary;
    }
```

- [ ] **Step 3: Create `components/home/finance-first-focus.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

export function FinanceFirstFocus() {
    return (
        <section className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        Finance exception automation is our first focus.
                    </h2>
                    <span className="section-mark-meta">Depth before breadth</span>
                </motion.header>

                <motion.div {...fadeUp} className="finance-first-grid">
                    <div className="finance-first-body">
                        <p>
                            Finance teams handle exceptions every day — duplicate
                            bills, vendor-detail changes, missing approvals,
                            invoice and PO mismatches, unusual amounts. Each one
                            is rule-driven, high-frequency, and high-stakes when
                            it goes wrong. That made it the right depth area.
                        </p>
                        <p>
                            We have built five fixed-scope finance exception
                            systems: duplicate-invoice detection, vendor change
                            control, approval-gap detection, three-way matching,
                            and an AP exception dashboard. They sit on top of
                            your accounting system, ingest your documents, and
                            route only the cases that need human review.
                        </p>
                    </div>
                    <div className="finance-first-cta">
                        <AuditCTA
                            location="mid"
                            label="See finance exception systems"
                            href="/finance-exception-automation"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
```

- [ ] **Step 4: Add globals.css classes for FinanceFirstFocus**

Under the `/* Home page */` block in `app/globals.css`, append:

```css
    .finance-first-grid {
        @apply mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center;
    }

    .finance-first-body {
        @apply space-y-5 max-w-2xl text-base leading-relaxed text-foreground;
    }

    .finance-first-cta {
        @apply flex lg:justify-end;
    }
```

- [ ] **Step 5: Add the two new sections to the homepage**

In `components/exception-automation-home.tsx`, add imports:

```tsx
import { WhatWeAutomate } from "@/components/home/what-we-automate";
import { FinanceFirstFocus } from "@/components/home/finance-first-focus";
```

Update the default export to:

```tsx
export default function ExceptionAutomationHome() {
    return (
        <main className="site-page">
            <CoverHero variant="homepage" />
            <WhatWeAutomate />
            <Problem variant="broad" />
            <FinanceFirstFocus />
            <ProofGrid variant="broad" />
            <ServiceMethod variant="broad" />
            <AuditCTASection variant="broad" />
            <Footnotes />
            <Colophon />
        </main>
    );
}
```

Note: `SystemsRegister` has been **removed from the homepage** — it lives on the money page only. `WhyNotAccounting` is also removed (lives on the money page). The homepage IA per design doc is: Hero → WhatWeAutomate → Problem (broad) → FinanceFirstFocus → ProofGrid (broad) → HowWeWork → AuditCTASection (broad) → Footnotes/Colophon.

- [ ] **Step 6: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. The homepage now uses the broader hero copy ("AI workflow automation for document-heavy operations"), has the new WhatWeAutomate 3-card grid, broader Problem, FinanceFirstFocus funnel, broad ProofGrid, broader ServiceMethod, and broader AuditCTASection.

- [ ] **Step 7: Commit**

```bash
git add components/home/what-we-automate.tsx components/home/finance-first-focus.tsx components/exception-automation-home.tsx app/globals.css
git commit -m "feat(home): broader company positioning — WhatWeAutomate and FinanceFirstFocus sections"
```

---

## Task 13: Demo preview component and matcher screenshot

**Files:**
- Create: `components/home/demo-preview.tsx`
- Create: `public/images/finance/three-way-matcher-preview.png` (manual capture)
- Modify: `app/globals.css`

- [ ] **Step 1: Capture the matcher screenshot**

Start the dev server, load the matcher page, paste sample data + click Match now, then capture a tight screenshot of the results-table area.

```bash
pnpm dev > /tmp/dev.log 2>&1 &
echo $! > /tmp/dev.pid
sleep 6
```

Open `http://localhost:3000/glossary/three-way-match/` in a browser. The matcher should already render with sample data on first paint. Click "Match now". When results table appears, take a screenshot covering: the count strip header + filter chips + first ~8 result rows (the ones showing status badges for MATCHED, AMOUNT_VARIANCE, DUPLICATE_INVOICE, etc.).

Save as:
- `public/images/finance/three-way-matcher-preview.png` (1280px wide, ~720px tall)

Optional WebP conversion:
```bash
# If you have cwebp installed:
cwebp -q 80 public/images/finance/three-way-matcher-preview.png \
  -o public/images/finance/three-way-matcher-preview.webp
```

If WebP not available, skip — the `<img>` will fall back to PNG.

Then stop dev:

```bash
kill "$(cat /tmp/dev.pid)" 2>/dev/null
rm /tmp/dev.pid
```

If automated capture is impractical for the agent (no display, no headless capture tooling), commit a placeholder solid-color or simple SVG-rendered image at the same path with a `TODO` comment in the component pointing at the asset path — the page must still build, and the asset can be replaced before launch.

To create a placeholder programmatically:

```bash
mkdir -p public/images/finance
# Create a 1280x720 dark placeholder PNG using sips (macOS) or convert (ImageMagick)
# Or commit an empty placeholder that we replace before launch.
# As a fallback, write a 1x1 transparent png via base64:
printf '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82' > public/images/finance/three-way-matcher-preview.png
```

The placeholder unblocks the build; replace before launch.

- [ ] **Step 2: Create `components/home/demo-preview.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { fadeUp } from "./_motion";

export function DemoPreview() {
    return (
        <section id="demo" className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">
                        See how finance exception automation works.
                    </h2>
                    <span className="section-mark-meta">Live demo</span>
                </motion.header>

                <motion.div {...fadeUp} className="demo-preview-grid">
                    <div className="demo-preview-copy">
                        <p>
                            Our 3-way matching demo shows how invoices, purchase
                            orders, and delivery evidence can be compared
                            automatically — with exceptions routed for review
                            instead of manual checking.
                        </p>
                        <p className="demo-preview-reminder">
                            3-way matching is one example. The same approach can
                            be applied to duplicate bills, vendor changes,
                            missing approvals, and other payment-control checks.
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/glossary/three-way-match/"
                                className="site-button audit-cta"
                            >
                                Try the demo
                                <span className="audit-cta-arrow" aria-hidden>↗</span>
                            </Link>
                            <Link
                                href="/contact?audit=1"
                                className="site-button-secondary audit-cta"
                            >
                                Book a walkthrough
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/glossary/three-way-match/"
                        className="demo-preview-tile"
                        aria-label="Open the three-way matcher demo"
                    >
                        <picture>
                            <source
                                srcSet="/images/finance/three-way-matcher-preview.webp"
                                type="image/webp"
                            />
                            <img
                                src="/images/finance/three-way-matcher-preview.png"
                                alt="Three-way matcher results showing matched, variance, missing, and duplicate invoice statuses"
                                loading="lazy"
                                width={1280}
                                height={720}
                                className="demo-preview-image"
                            />
                        </picture>
                        <span className="demo-preview-badge">Live demo · in-browser</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
```

- [ ] **Step 3: Add globals.css classes for DemoPreview**

Under the `/* Money page */` block in `app/globals.css`, append:

```css
    .demo-preview-grid {
        @apply mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center;
    }

    .demo-preview-copy {
        @apply space-y-5 max-w-xl text-base leading-relaxed text-foreground;
    }

    .demo-preview-reminder {
        @apply border-l-[3px] border-primary bg-card/60 px-4 py-3 text-sm text-foreground-muted;
    }

    .demo-preview-tile {
        @apply relative block overflow-hidden border border-border bg-card transition-colors hover:bg-card/80;
    }

    .demo-preview-image {
        @apply block w-full h-auto;
    }

    .demo-preview-badge {
        @apply absolute bottom-3 left-3 inline-block border border-primary/40 bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary;
    }
```

- [ ] **Step 4: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build. The component is not yet used by any page — that happens in Task 15.

- [ ] **Step 5: Commit**

```bash
git add components/home/demo-preview.tsx public/images/finance/three-way-matcher-preview.png app/globals.css
git commit -m "feat(home): demo preview tile component + matcher screenshot asset"
```

If the WebP file was also produced, include it in the `git add`.

---

## Task 14: Final CTA section

**Files:**
- Create: `components/home/final-cta.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/home/final-cta.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";
import { AuditCTA } from "./_shared/audit-cta";

export function FinalCTA() {
    return (
        <section className="doc-section border-t border-border">
            <div className="doc-container">
                <motion.div {...fadeUp} className="final-cta-panel">
                    <h2 className="final-cta-headline">
                        Before hiring another AP/admin person, check what can be{" "}
                        <em className="italic text-primary">automated first</em>.
                    </h2>
                    <p className="final-cta-body">
                        Our audit identifies the highest-value exception in your
                        finance workflow and recommends the smallest useful first
                        system. Free during launch for selected finance teams.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <AuditCTA location="footer" />
                        <AuditCTA
                            location="footer"
                            variant="secondary"
                            label="Try the 3-Way Matching Demo"
                            href="/glossary/three-way-match/"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add globals.css classes for FinalCTA**

Under the `/* Money page */` block in `app/globals.css`, append:

```css
    .final-cta-panel {
        @apply mt-4 border border-border bg-card/40 p-8 md:p-12;
    }

    .final-cta-headline {
        @apply max-w-3xl text-3xl font-medium leading-tight text-foreground site-font-display md:text-4xl;
    }

    .final-cta-body {
        @apply mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted;
    }
```

- [ ] **Step 3: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add components/home/final-cta.tsx app/globals.css
git commit -m "feat(home): final CTA section component"
```

---

## Task 15: Build `/finance-exception-automation` money page

**Files:**
- Create: `app/finance-exception-automation/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Create `app/finance-exception-automation/page.tsx`**

```tsx
import type { Metadata } from "next";

import { CoverHero } from "@/components/home/cover-hero";
import { Problem } from "@/components/home/problem";
import { DemoPreview } from "@/components/home/demo-preview";
import { SystemsRegister } from "@/components/home/systems-register";
import { ServiceMethod } from "@/components/home/service-method";
import { WhyNotAccounting } from "@/components/home/why-not-accounting";
import { AuditCTASection } from "@/components/home/audit-cta-section";
import { ProofGrid } from "@/components/home/proof-grid";
import { FinalCTA } from "@/components/home/final-cta";
import { Footnotes } from "@/components/home/footnotes";
import { Colophon } from "@/components/home/colophon";
import { UtmCaptureClient } from "@/components/home/_shared/utm-capture-client";

export const metadata: Metadata = {
    title: "Finance Exception Automation — Move Faster Without Adding AP Headcount | Invaritech",
    description:
        "Invaritech builds AI-powered finance exception systems that catch invoice mismatches, duplicate bills, vendor-detail changes, and approval gaps before payment release. Fixed-scope builds for AP teams.",
    alternates: {
        canonical: "https://www.invaritech.ai/finance-exception-automation/",
    },
    openGraph: {
        title: "Finance Exception Automation — Invaritech",
        description:
            "AI-powered finance exception systems for AP teams: duplicate invoice detection, vendor change control, approval gap detection, three-way matching, and AP exception dashboard.",
        type: "website",
        url: "https://www.invaritech.ai/finance-exception-automation/",
    },
};

export default function FinanceExceptionAutomationPage() {
    return (
        <main className="site-page">
            <UtmCaptureClient />
            <CoverHero variant="landing" />
            <Problem variant="finance" />
            <DemoPreview />
            <SystemsRegister />
            <ServiceMethod variant="finance" />
            <WhyNotAccounting />
            <AuditCTASection variant="finance" />
            <ProofGrid variant="finance-emphasis" />
            <FinalCTA />
            <Footnotes />
            <Colophon />
        </main>
    );
}
```

- [ ] **Step 2: Create the UTM capture client wrapper**

The `useUtmCapture` hook from `lib/utm-capture.ts` is client-only. Since the page is otherwise server-rendered, wrap the hook in a tiny client component that renders nothing.

Create `components/home/_shared/utm-capture-client.tsx`:

```tsx
"use client";

import { useUtmCapture } from "@/lib/utm-capture";

export function UtmCaptureClient() {
    useUtmCapture();
    return null;
}
```

- [ ] **Step 3: Update `app/sitemap.ts`**

Open `app/sitemap.ts`. After the `/` entry, add:

```typescript
{
    url: `${baseUrl}/finance-exception-automation/`,
    changeFrequency: "weekly",
    priority: 0.9,
},
```

Put it second in the list, right after the homepage.

- [ ] **Step 4: Build check + verify routes**

```bash
pnpm build 2>&1 | grep -E "/finance-exception-automation|/glossary|/$"
```

Expected: `○ /finance-exception-automation` listed as a static route.

```bash
pnpm build 2>&1 | tail -15
```

Expected: full clean build.

- [ ] **Step 5: Smoke test the page renders**

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 6
curl -s http://localhost:3000/finance-exception-automation/ | grep -oE "<h[12][^>]*>[^<]+" | head -3
curl -sI http://localhost:3000/finance-exception-automation/ | head -2
kill $DEV_PID 2>/dev/null
```

Expected: 200 OK, headlines include "Move faster" and "Your accounting system".

- [ ] **Step 6: Test UTM forwarding manually**

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 6
# Just confirm the page renders with src param. JS-level src forwarding needs a browser to verify.
curl -s "http://localhost:3000/finance-exception-automation?src=cold-email&campaign=q4" \
  | grep -c "finance-exception-automation"
kill $DEV_PID 2>/dev/null
```

Expected: count > 0. (Full UTM forwarding gets a manual browser test in Task 19.)

- [ ] **Step 7: Commit**

```bash
git add app/finance-exception-automation/page.tsx app/sitemap.ts components/home/_shared/utm-capture-client.tsx
git commit -m "feat(money-page): /finance-exception-automation route with all 9 sections"
```

---

## Task 16: Header nav rewire

**Files:**
- Modify: `components/header.tsx`

- [ ] **Step 1: Update the `menuItems` array**

In `components/header.tsx` (lines ~11-18), replace the `menuItems` array with:

```typescript
const menuItems = [
    { name: "Finance Automation", href: "/finance-exception-automation", id: "01" },
    { name: "Demo", href: "/glossary/three-way-match/", id: "02" },
    { name: "Systems", href: "/finance-exception-automation#systems", id: "03" },
    { name: "How It Works", href: "/finance-exception-automation#how", id: "04" },
    { name: "Resources", href: "/resources/", id: "05" },
    { name: "Book Audit", href: "/contact?audit=1", id: "06" },
];
```

The component already treats the last item as the CTA (`ctaLink = menuItems[menuItems.length - 1]`). No further changes to the component body required.

- [ ] **Step 2: Verify `isActivePath` still works for anchor links**

The function compares `pathname === href || (href !== "/" && pathname.startsWith(href))`. Anchor links like `/finance-exception-automation#systems` won't match cleanly because `usePathname()` strips the anchor.

Acceptable behavior: when on `/finance-exception-automation`, the "Finance Automation," "Systems," and "How It Works" nav items can all show active state (Next's pathname matches the base path for all three since they share the prefix). This is fine for our purposes.

To prevent multiple highlights, change `isActivePath` to compare without anchors:

```typescript
function isActivePath(pathname: string, href: string) {
    if (isExternalLink(href)) return false;
    const hrefBase = href.split("#")[0].split("?")[0];
    return pathname === hrefBase || (hrefBase !== "/" && pathname.startsWith(hrefBase));
}
```

This is a defensive tweak; if the existing function works acceptably on the rendered page, leave it.

- [ ] **Step 3: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 4: Smoke test the header renders the new items**

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 6
curl -s http://localhost:3000/ | grep -oE ">Finance Automation<|>Book Audit<|>Demo<|>Systems<|>How It Works<|>Resources<"
kill $DEV_PID 2>/dev/null
```

Expected: all 6 nav strings appear at least once.

- [ ] **Step 5: Commit**

```bash
git add components/header.tsx
git commit -m "feat(nav): primary nav routes to /finance-exception-automation"
```

---

## Task 17: Footer restructure

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Update the footer columns**

In `components/footer.tsx` (lines ~5-13), replace the `navigationLinks` array with two new arrays — one for the existing "Navigation" column (renamed to "Company") and one for a new "Finance Automation" column. Also keep the "Free AP Controls Scan" CTA pointer but route it to `/contact?audit=1`.

```typescript
const companyLinks = [
    { title: "Home", href: "/" },
    { title: "Finance Automation", href: "/finance-exception-automation/" },
    { title: "Demo", href: "/glossary/three-way-match/" },
    { title: "Resources", href: "/resources/" },
    { title: "Blog", href: "/blog/" },
    { title: "Work", href: "/work/" },
    { title: "About", href: "/about/" },
    { title: "Contact", href: "/contact/" },
];

const financeLinks = [
    { title: "Finance Exception Automation", href: "/finance-exception-automation/" },
    { title: "Three-Way Matching", href: "/glossary/three-way-match/" },
    { title: "Invoice Extractor", href: "/resources/invoice-extractor/" },
    { title: "Cost to Close Calculator", href: "/resources/cost-to-close-calculator/" },
    { title: "Payment Control Rules", href: "/resources/supplier-payment-control-rule-table/" },
];
```

Remove the old `navigationLinks` array.

Update the JSX so the existing `<nav aria-label="Footer navigation">` block iterates `companyLinks` (rename heading to "Company"), and add a sibling `<nav aria-label="Finance Automation navigation">` block iterating `financeLinks` (heading "Finance Automation"). Keep `legalLinks` and the social links blocks unchanged.

Within the `<nav aria-label="Footer navigation">` block, change `<h2 className="site-footer-heading">Navigation</h2>` to `<h2 className="site-footer-heading">Company</h2>`.

Replace the block iterating `navigationLinks` with one iterating `companyLinks`. Add the new `financeLinks` block before "Legal".

The final footer grid will have columns: Brand · Company · Finance Automation · Legal · Connect (5 columns). The existing `.site-footer-grid` class likely accommodates that via responsive sizing; if not, adjust the grid class in globals.css to allow wrapping.

- [ ] **Step 2: Build check**

```bash
pnpm build 2>&1 | tail -10
```

Expected: clean build.

- [ ] **Step 3: Smoke test footer renders the new column**

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 6
curl -s http://localhost:3000/ | grep -oE ">Finance Automation<|>Three-Way Matching<|>Company<"
kill $DEV_PID 2>/dev/null
```

Expected: all three strings appear.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "feat(footer): add Finance Automation column; rename Navigation to Company"
```

---

## Task 18: CTA migration across the rest of the site

**Files:** (modifications)
- `components/exception-automation-home.tsx` (already migrated in Task 11; verify)
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/about/page.tsx`
- `app/work/page.tsx`
- `app/work/eudr-compliance-bridge/page.tsx`
- `components/control-upsell-bridge.tsx`
- `components/payment-control-home.tsx`
- `components/resource-library-client.tsx`

Goal: every CTA href that previously pointed at `/contact` or `/contact/?scan=1` now points at `/contact?audit=1` with a relevant `src` param. The CTA label "Free AP Controls Scan" is renamed to "Book a Finance Workflow Audit" everywhere it appears as a CTA button.

- [ ] **Step 1: Audit all `/contact` references**

```bash
grep -rn "\"/contact" app components --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules\|\.next"
```

Catalog each match. For each one, decide:

- If it's a CTA button/link to book an audit → update to `/contact?audit=1&src=<page-source>` and update label to "Book a Finance Workflow Audit".
- If it's the footer/header neutral link → leave as plain `/contact/`.

- [ ] **Step 2: Replacement plan per file**

For each file below, apply the change. After each, run `pnpm build 2>&1 | tail -5` to catch regressions early. Commit at the end of the task (single commit covering all CTA updates).

`app/blog/page.tsx` and `app/blog/[slug]/page.tsx`:
- Find `href="/contact/?scan=1"` near a button that says "Free AP Controls Scan" or similar.
- Change href to `/contact?audit=1&src=blog`.
- Change label text to `Book a Finance Workflow Audit`.

`app/about/page.tsx`:
- Same pattern: `/contact/?scan=1` → `/contact?audit=1&src=about`; relabel button.

`app/work/page.tsx`:
- Same: `/contact/?scan=1` → `/contact?audit=1&src=work`.

`app/work/eudr-compliance-bridge/page.tsx`:
- Same: `/contact/?scan=1` → `/contact?audit=1&src=work-eudr`.
- Also: this file already has the glossary cross-reference link from Task 17 of the prior plan; preserve it.

`components/control-upsell-bridge.tsx` (`href="/contact/"`):
- This component is a card-style upsell. Update href to `/contact?audit=1&src=control-upsell`. If a label exists, change it to "Book a Finance Workflow Audit" or keep it descriptive — minor judgment call.

`components/payment-control-home.tsx` (3 sites):
- Each `href="/contact/?scan=1"` → `/contact?audit=1&src=payment-control-home`. Relabel buttons.

`components/resource-library-client.tsx` (`href="/contact/?scan=1"`):
- `/contact?audit=1&src=resources`. Relabel.

- [ ] **Step 3: Final scan**

```bash
grep -rn "\"/contact/?scan=1\|\"/contact?scan=1\|Free AP Controls Scan" app components 2>/dev/null | grep -v "node_modules\|\.next"
```

Expected: empty output (no more old patterns). If anything remains, finish the migration.

- [ ] **Step 4: Build + tests**

```bash
pnpm build 2>&1 | tail -10
node --experimental-strip-types --test tests/*.test.mjs 2>&1 | tail -5
```

Expected: clean build, all tests pass.

- [ ] **Step 5: Commit**

```bash
git add app/blog/page.tsx app/blog/[slug]/page.tsx app/about/page.tsx app/work/page.tsx app/work/eudr-compliance-bridge/page.tsx components/control-upsell-bridge.tsx components/payment-control-home.tsx components/resource-library-client.tsx
git commit -m "feat(cta): migrate all CTAs to /contact?audit=1 with per-page src tagging"
```

---

## Task 19: Internal-links test + manual launch verification

**Files:**
- Modify: `tests/internal-links.test.mjs`

- [ ] **Step 1: Add money page assertion to internal-links test**

Open `tests/internal-links.test.mjs`. Look at the existing pattern (the file already walks `app`, `components`, `lib` for `*.ts`/`*.tsx` files). Add a new `describe`/`it` block:

```javascript
describe("money page is linked", () => {
    it("at least one file references /finance-exception-automation", () => {
        const files = sourceRoots.flatMap((root) => walkFiles(root));
        const tsFiles = files.filter((p) => sourceExtensions.has(extensionOf(p)));
        const matchCount = tsFiles.filter((p) =>
            readFileSync(p, "utf-8").includes("/finance-exception-automation")
        ).length;
        assert.ok(matchCount >= 3, `Expected /finance-exception-automation in 3+ files; found ${matchCount}`);
    });
});
```

(The existing file uses `sourceRoots`, `walkFiles`, `sourceExtensions`, and `extensionOf` already. If the variable names differ in the existing file, adapt to whatever is exported/scoped there.)

- [ ] **Step 2: Run all tests**

```bash
node --experimental-strip-types --test tests/*.test.mjs 2>&1 | tail -15
```

Expected: 0 failures across all test files. New money-page assertion passes (money page is referenced by header, footer, homepage, multiple section components).

- [ ] **Step 3: Production build + route table**

```bash
pnpm build 2>&1 | grep -E "^[├└]\s+[○●ƒ]|First Load JS" | head -40
```

Expected:
- `○ /` (homepage, static)
- `○ /finance-exception-automation` (static)
- `○ /glossary/three-way-match` (static)
- `ƒ /api/glossary/secondary-cta` (dynamic)
- No build warnings about missing metadata.

- [ ] **Step 4: Manual cold-email funnel verification (browser)**

Start dev server, then manually verify the cold-email flow:

```bash
pnpm dev > /tmp/dev.log 2>&1 &
DEV_PID=$!
sleep 8
```

In a browser:

1. Open `http://localhost:3000/finance-exception-automation?src=cold-email&campaign=duplicate-invoice`
2. Open DevTools → Application → Session Storage → confirm `invaritech.utm.src=cold-email` and `invaritech.utm.campaign=duplicate-invoice` are set.
3. Click "Book a Finance Workflow Audit" anywhere on the page. Confirm the destination URL is `/contact?audit=1&src=cold-email&campaign=duplicate-invoice`.
4. Open a fresh incognito window → `http://localhost:3000/finance-exception-automation/` (no params). Click an Audit CTA. Confirm destination is `/contact?audit=1` (no src/campaign appended).
5. Open `http://localhost:3000/` → confirm hero says "AI workflow automation for document-heavy operations" (broader). Click "Explore Finance Automation" → confirm it navigates to `/finance-exception-automation`.
6. Click any header nav item ("Finance Automation," "Systems," "How It Works") → confirm it lands on the money page (anchor-scrolled for #systems / #how).
7. On the money page, click any system card (01, 02, 03, 05) → confirm it expands inline showing the detail panel. Click again → it collapses. Card 04 (three-way matching) navigates to `/glossary/three-way-match/`.
8. On `/glossary/three-way-match/`, click any "Book a Finance Workflow Audit" CTA → confirm the destination is `/contact?audit=1&src=glossary-3wm`.

If any of the above fails, fix it before declaring the launch ready.

Stop dev:

```bash
kill $DEV_PID 2>/dev/null
```

- [ ] **Step 5: Mobile spot-check (375px viewport)**

In Chrome DevTools, switch to iPhone SE viewport. Reload homepage and money page. Verify:
- Hero text fits without overflow.
- WhatWeAutomate cards stack to one column.
- Comparison table is scrollable horizontally or wraps cleanly.
- System card expand-on-click works.
- All CTAs are tappable (44px+ tap target).

- [ ] **Step 6: Final commit**

```bash
git add tests/internal-links.test.mjs
git commit -m "test(internal-links): assert money page is linked from 3+ source files"
```

- [ ] **Step 7: Confirm clean state**

```bash
git status
git log --oneline | head -30
```

Expected: working tree clean, ~20 new commits since the start of the pivot.

---

## Self-Review

**Spec coverage** (each item from the design doc's "Ship in 2-week window" list):

- Component decomposition → Tasks 2, 3, 7-11 (sections extracted; composer reduced)
- Homepage repositioning → Task 12 (WhatWeAutomate, FinanceFirstFocus added; SystemsRegister and WhyNotAccounting removed from homepage)
- `/finance-exception-automation` money page → Task 15 (all 9 sections composed)
- Nav rewire → Task 16
- Canonical `AuditCTA` → Tasks 4, 5
- Campaign parameter forwarding → Tasks 4, 6, 15 (utm-capture-client mounted on money page)
- Basic SEO on money page → Task 15 (metadata + sitemap)
- CTA copy migration → Tasks 5, 18

**Placeholder scan:** no TBD, no "implement later" — every step has the actual code or command.

**Type consistency:**
- `Location` type for `AuditCTA` (`"hero" | "mid" | "footer" | "nav" | "card"`) — used consistently.
- `Variant` types per component are independent and locally scoped — no cross-component leakage.
- `parseUtmParams` returns `UtmParams` (`{src?, campaign?}`) — matches usage in `useUtmCapture` and `appendAuditCtaParams`.
- `SiteEventName` union in `lib/analytics/site-events.ts` — extended from old `GlossaryEventName`, preserves all existing names.

**Behavioral parity check:**
- Task 2 (motion + sub-components extraction) — explicit "behavior unchanged."
- Task 11 ends with a visible behavior change (WhyCustom prose → comparison table on homepage); flagged inline.
- Task 12 ends with several visible homepage changes (hero copy, new sections, removed sections); intentional per design doc.

---

## Follow-up after launch

Tracked here for the post-2-week roadmap (not part of this plan):

1. `/glossary/duplicate-invoice-detection/` — SEO cluster sibling to three-way-match (~1500-2000 words across 7 sections), bylined to Aditi Garg.
2. JSON-LD schemas on money page — `WebPage` + `ItemList(systems)` + `FAQPage` validation.
3. Advanced analytics — `money_page_section_view` (scroll-observed), `systems_card_expand` event, audit-CTA click attribution dashboard.
4. Playwright screenshot automation — auto-capture the matcher preview on each release; replace the hand-captured asset.
5. `/finance-workflow-exception-audit` — audit explainer page (separate from `/contact?audit=1` form).
6. Per-system pages — `/duplicate-invoice-exception-system`, `/vendor-change-control-system`, `/approval-gap-detection-system`, `/ap-exception-dashboard`.
7. Visual rename "Glossary" → "Finance Automation Guide" on existing glossary breadcrumb.
8. Money page Rich Results validation once schemas land.
9. Replace WebP/PNG placeholder if Task 13 shipped with a placeholder image.
10. Headline copy A/B testing on money page hero once 2 weeks of cold-email traffic accumulates.

---

Plan complete. 19 tasks, ~20 commits, TDD on the only logic-bearing modules (`AuditCTA` href construction, UTM parsing), and explicit visual-parity gates on every refactor task.
