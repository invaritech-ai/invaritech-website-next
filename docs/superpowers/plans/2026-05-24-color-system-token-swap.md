# Color System Token Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Swap the site's color tokens from warm-parchment + amber/gold to off-white + forest green with a copper accent, while preserving all structure, type, and behaviour. Every text/background pair must hit WCAG AA at minimum; primary CTA and body copy hit AAA.

**Architecture:** A token-value swap. The CSS custom property surface in `app/globals.css` is the single source of truth for color. Three files contain hard-coded literals (`app/globals.css`, `components/control-rule-table.tsx`, `components/chatbot.tsx`) and must be edited directly. Everything else inherits via Tailwind tokens (`text-primary`, `bg-card`, `border-border`, etc.) and will pick up the new palette automatically. After the swap, a visual smoke test catches any pages that drift.

**Tech Stack:** Next.js App Router, Tailwind v4 (`@theme inline` with CSS variables), motion/react. No build-config changes required.

**Spec source:** `docs/plans/2026-05-24-color-system-design.md`

---

## File Structure

Files modified:

- `app/globals.css` — both `:root` and `.dark` blocks. Single source of token truth.
- `components/control-rule-table.tsx` — line 11. Severity-badge Tailwind classes use hard-coded `amber-*` Tailwind utilities; remap to neutral + accent tokens.
- `components/chatbot.tsx` — embedded third-party widget that takes literal hex strings (not CSS variables). Hex constants and inline `<style>` strings must be updated.

Files created: none.

Files deleted: none.

---

## Task 1: Swap core CSS tokens in `:root`

**Files:**
- Modify: `app/globals.css:8-63`

- [ ] **Step 1: Open the file and locate the `:root` block (lines 8–63).**

- [ ] **Step 2: Replace the entire `:root` block with the new token values.**

Replace lines 8–63 with:

```css
:root {
    --background: #F7F7F4;
    --foreground: #0B1410;

    --card: #FFFFFF;
    --card-foreground: #0B1410;

    --popover: #FFFFFF;
    --popover-foreground: #0B1410;

    --primary: #0F5132;
    --primary-foreground: #FFFFFF;
    --primary-hover: #0A3D24;

    --secondary: #EEEDE8;
    --secondary-foreground: #0B1410;

    --muted: #F1F0EC;
    --muted-foreground: #4B5550;
    --foreground-muted: #5A645F;
    --foreground-subtle: #6B7570;

    --accent: #B45309;
    --accent-foreground: #FFFFFF;

    --destructive: #B91C1C;
    --destructive-foreground: #FFFFFF;

    --border: #E2E4DE;
    --input: #E2E4DE;
    --ring: #0F5132;

    --chart-1: #0F5132;
    --chart-2: #B45309;
    --chart-3: #1E3A8A;
    --chart-4: #4B5550;
    --chart-5: #7A8A82;

    --sidebar: #F1F0EC;
    --sidebar-foreground: #0B1410;
    --sidebar-primary: #0F5132;
    --sidebar-primary-foreground: #FFFFFF;
    --sidebar-accent: #EEEDE8;
    --sidebar-accent-foreground: #0B1410;
    --sidebar-border: #E2E4DE;
    --sidebar-ring: #0F5132;

    --font-body: "Source Sans 3 Variable", ui-sans-serif, sans-serif, system-ui;
    --packet-bg: #EEEDE8;
    --font-display: "Source Serif 4 Variable", Georgia, Cambria, "Times New Roman", serif;
    --font-label: var(--font-geist-mono), "IBM Plex Mono", monospace;
    --font-sans: var(--font-body);
    --font-serif: var(--font-display);
    --font-mono: var(--font-label);

    --radius: 0.125rem;
}
```

Note the additions: `--primary-hover` (new), `--packet-bg` moved value, charts re-ordered with copper as chart-2.

- [ ] **Step 3: Verify the file still parses by running the dev server briefly.**

Run: `pnpm dev` (or `npm run dev`), wait for "Ready" line, then `Ctrl-C`.
Expected: server starts without CSS-parse errors. If you see "Unknown property" or "Unclosed block", revert and re-check the paste.

- [ ] **Step 4: Commit.**

```bash
git add app/globals.css
git commit -m "style(tokens): swap :root palette to forest green + copper on off-white"
```

---

## Task 2: Mirror the new tokens into the `.dark` block

The `.dark` block in this codebase is a duplicate of `:root` (there is no real dark mode today — see the design doc). Keep it that way so toggling `.dark` is a no-op rather than introducing a half-built dark mode.

**Files:**
- Modify: `app/globals.css:65-100`

- [ ] **Step 1: Locate the `.dark` block (starts around line 65).**

- [ ] **Step 2: Replace the `.dark` block contents with the same values as the new `:root`.**

Replace the block with:

```css
.dark {
    --background: #F7F7F4;
    --foreground: #0B1410;
    --card: #FFFFFF;
    --card-foreground: #0B1410;
    --popover: #FFFFFF;
    --popover-foreground: #0B1410;
    --primary: #0F5132;
    --primary-foreground: #FFFFFF;
    --primary-hover: #0A3D24;
    --secondary: #EEEDE8;
    --secondary-foreground: #0B1410;
    --muted: #F1F0EC;
    --muted-foreground: #4B5550;
    --foreground-muted: #5A645F;
    --foreground-subtle: #6B7570;
    --accent: #B45309;
    --accent-foreground: #FFFFFF;
    --destructive: #B91C1C;
    --destructive-foreground: #FFFFFF;
    --border: #E2E4DE;
    --input: #E2E4DE;
    --ring: #0F5132;
    --chart-1: #0F5132;
    --chart-2: #B45309;
    --chart-3: #1E3A8A;
    --chart-4: #4B5550;
    --chart-5: #7A8A82;
    --sidebar: #F1F0EC;
    --sidebar-foreground: #0B1410;
    --sidebar-primary: #0F5132;
    --sidebar-primary-foreground: #FFFFFF;
    --sidebar-accent: #EEEDE8;
    --sidebar-accent-foreground: #0B1410;
    --sidebar-border: #E2E4DE;
    --sidebar-ring: #0F5132;
}
```

- [ ] **Step 3: Run a quick grep to confirm no amber/parchment hexes remain inside `globals.css`.**

Run: `grep -nE "(C8962D|FBF8F3|F3EDE3|EDE6DA|DDD5C8|1C1410|F0EBE1|F2EBE0|6A5E54|7A6E64|5F5248|E5DDD0|2B4A8A|3A7D5C|8B6914|5A3E7C)" app/globals.css`
Expected: no matches.

- [ ] **Step 4: Commit.**

```bash
git add app/globals.css
git commit -m "style(tokens): mirror new palette into .dark block (no real dark mode yet)"
```

---

## Task 3: Remap the severity-badge in `control-rule-table.tsx`

The "medium severity" row in the rule-table component uses hard-coded Tailwind `amber-*` utilities. With copper as the brand accent, "medium" should map onto neutral muted styling so copper remains reserved for emphasis the user *should* act on. Keep `low` and `high` as they are (they don't reference amber/gold).

**Files:**
- Modify: `components/control-rule-table.tsx:11`

- [ ] **Step 1: Read lines 1–25 to see the full severity map.**

Run: open `components/control-rule-table.tsx` and inspect the `severityClasses` (or similarly-named) object near the top.

- [ ] **Step 2: Replace the `medium` line.**

Current:
```ts
  medium: "bg-amber-500/10 text-amber-700 border-amber-500/20",
```

New:
```ts
  medium: "bg-accent/10 text-accent border-accent/30",
```

This routes "medium severity" through the `--accent` (copper) token instead of Tailwind's amber palette. Visually copper reads as "attention needed" without screaming.

- [ ] **Step 3: Visually verify in the dev server.**

Run: `pnpm dev`, open `http://localhost:3000/resources/supplier-payment-control-rule-table`, check that medium-severity rows render with a copper-tinted background and copper text on the new off-white surface. Read at least one row to confirm contrast is comfortable.
Expected: copper-on-off-white is legible; the badge sits distinctly between low (neutral) and high (red).

- [ ] **Step 4: Commit.**

```bash
git add components/control-rule-table.tsx
git commit -m "style(rule-table): route medium severity through accent token"
```

---

## Task 4: Update hard-coded hexes in `chatbot.tsx`

The chatbot is a third-party embed that consumes literal hex strings, not CSS variables. Each constant and each inline `<style>` block must be updated by hand.

**Files:**
- Modify: `components/chatbot.tsx` (multiple lines)

- [ ] **Step 1: Read the full file to locate every color literal.**

Run: `grep -n -E "#[0-9A-Fa-f]{6}|amber|cream" components/chatbot.tsx`
Note every line returned — there are color literals at the top of the component (the JS constants block around lines 15–25) and inside the inline `<style>` strings (around lines 165–230).

- [ ] **Step 2: Update the JS constants block.**

Find the constants like `PRIMARY_COLOR`, `BG_COLOR`, `ON_AMBER_COLOR`, `USER_BG`. Replace as follows:

| Old name & value | New value | Rename to |
|---|---|---|
| `PRIMARY_COLOR = "#C8962D"` (amber) | `"#0F5132"` | keep name `PRIMARY_COLOR` |
| `BG_COLOR = "#FBF8F3"` (cream) | `"#F7F7F4"` | keep name `BG_COLOR` |
| `ON_AMBER_COLOR = "#1A1209"` | `"#FFFFFF"` | rename to `ON_PRIMARY_COLOR` |
| `USER_BG = "#C8962D"` | `"#0F5132"` | keep name `USER_BG` |

Also update inline comments: replace "Amber to match site primary" with "Forest green to match site primary", "Cream background" with "Off-white background".

When renaming `ON_AMBER_COLOR` → `ON_PRIMARY_COLOR`, update every reference in the file (use editor "rename symbol" or a grep-replace within the file only).

- [ ] **Step 3: Update inline `<style>` and inline-style strings.**

Inside the JSX, replace every literal occurrence of:
- `#C8962D` → `#0F5132`
- `#FBF8F3` → `#F7F7F4`

This includes the `tooltipBackgroundColor`, the inline link `style="color: #C8962D"` in the terms blurb, every `border: 1px solid #C8962D` in the style strings, and the `background-color: #FBF8F3` rules.

Grep again after editing:
Run: `grep -nE "#C8962D|#FBF8F3" components/chatbot.tsx`
Expected: no matches.

- [ ] **Step 4: Smoke-test the chatbot.**

Run: `pnpm dev`, open the homepage, open the chatbot. Verify:
- Trigger button reads green, not amber.
- User-message bubbles are forest green with white text (legible).
- Background is the new off-white, not cream.
- The "Protocols" link in the disclaimer is forest green and underlined.

- [ ] **Step 5: Commit.**

```bash
git add components/chatbot.tsx
git commit -m "style(chatbot): replace amber/cream literals with forest green/off-white"
```

---

## Task 5: Sweep for missed color literals across the codebase

The previous tasks covered every file the initial grep surfaced. Re-run the sweep to catch anything added since.

**Files:** none modified by this task — only audited.

- [ ] **Step 1: Search for legacy hexes.**

Run: `grep -rnE "(C8962D|FBF8F3|F3EDE3|EDE6DA|DDD5C8|1C1410|F0EBE1|F2EBE0|2B4A8A|3A7D5C|8B6914|5A3E7C)" --include="*.tsx" --include="*.ts" --include="*.css" --include="*.mdx" app components lib`

Expected: no matches.

- [ ] **Step 2: Search for stray Tailwind amber/yellow/gold utilities.**

Run: `grep -rnE "(text|bg|border|ring|from|via|to|fill|stroke)-(amber|yellow)-[0-9]+" --include="*.tsx" --include="*.ts" --include="*.mdx" app components`

Expected: no matches. If matches appear, replace each with the corresponding semantic token (`text-accent`, `bg-accent/10`, `border-accent/30`, etc.) and commit per-file.

- [ ] **Step 3: Search for stray "cream", "gold", "parchment" in copy or class names.**

Run: `grep -rniE "(cream|parchment|gold-)" --include="*.tsx" --include="*.ts" --include="*.mdx" app components`

Expected: no matches in class names. Matches inside copy strings are acceptable (review case-by-case; remove if the word describes the old palette and would confuse the new one).

- [ ] **Step 4: If the previous steps found nothing, commit nothing.**

If you made fix-ups inside this task, commit them as:

```bash
git add -A
git commit -m "style: clean up residual amber/cream references"
```

---

## Task 6: Verify the grain overlay still reads correctly

The grain overlay (`grain-overlay` class in `globals.css:215`) is a low-opacity SVG noise tuned against warm parchment. Against cooler off-white it may read as visible dirt. The opacity inside the SVG is `0.02` and the wrapper applies `opacity-30` (in `app/layout.tsx:200`). Verify, don't pre-emptively change.

**Files:**
- Possibly modify: `app/layout.tsx:200` (only if the overlay reads as dirty)

- [ ] **Step 1: Run dev server and inspect the homepage hero against a bright monitor.**

Run: `pnpm dev`, open `http://localhost:3000/`, full-screen the window, look for any visible mottling on the background. The grain should be invisible at arm's length and only barely perceptible up close.

- [ ] **Step 2: Decide.**

- If the grain is invisible at normal viewing distance: do nothing.
- If the grain reads as dirt or pattern: reduce the wrapper opacity in `app/layout.tsx:200` from `opacity-30` to `opacity-20`, re-check, commit.

- [ ] **Step 3 (only if changed): Commit.**

```bash
git add app/layout.tsx
git commit -m "style(grain): retune overlay opacity against new off-white surface"
```

---

## Task 7: Verify the logo asset against the new background

The logo is an image asset. If it embeds amber/gold, it will look wrong against the new off-white. Don't recolor it speculatively — verify first.

**Files:** none modified by this task unless logo needs swapping.

- [ ] **Step 1: Locate the logo references.**

Run: `grep -rnE "logo" --include="*.tsx" --include="*.ts" components app | grep -iE "(src|import|require|\\.svg|\\.png)" | head -20`

- [ ] **Step 2: Open the logo in the dev server header and inspect.**

Run: `pnpm dev`, open homepage, look at the header logo against the new background.

- [ ] **Step 3: Decide.**

- If the logo is monochrome / dark / already reads correctly on off-white: do nothing.
- If the logo embeds amber and visibly clashes: open a follow-up task (`docs/superpowers/plans/2026-05-24-logo-recolor.md`) and note it in this plan's "Out of scope follow-ups" section below. Do not edit the asset in this task — logo edits need brand-owner sign-off.

- [ ] **Step 4: No commit if no changes.**

---

## Task 8: Full-site visual smoke test and contrast spot-check

End-to-end: walk the site, confirm nothing obviously broke, spot-check WCAG ratios on text that wasn't covered by the design doc.

**Files:** none modified.

- [ ] **Step 1: Build production-mode locally to surface any CSS-build issues.**

Run: `pnpm build && pnpm start`
Expected: build succeeds; site serves on `http://localhost:3000/`.

- [ ] **Step 2: Walk each major route and screenshot.**

Visit in order, look at each for 10 seconds:
- `/`
- `/about`
- `/work`
- `/work/eudr-compliance-bridge`
- `/contact`
- `/resources`
- `/resources/cost-to-close-calculator`
- `/resources/invoice-extractor`
- `/resources/invoice-processing-automation`
- `/resources/supplier-payment-control-rule-table`
- `/blog` (if present) and one blog post
- `/careers`, `/privacy`, `/terms`
- `/this-route-does-not-exist` (artistic 404)

For each, confirm:
- Background reads as off-white, not cream.
- Primary buttons are forest green with white text.
- No surface has the old amber/gold visible.
- Copper appears only on accents (severity badges, hover underlines, chart-2).
- Text remains comfortably readable at normal zoom.

- [ ] **Step 3: Spot-check three contrast pairs with the browser devtools color picker.**

For each of the following, use Chrome devtools → Elements → Computed → click a foreground color swatch → read the WCAG ratio shown:

1. Body paragraph text inside a hero section. Expected ≥ 7 : 1.
2. A primary CTA's label color on the green fill. Expected ≥ 5 : 1.
3. The "muted-foreground" caption text under a section heading. Expected ≥ 4.5 : 1.

If any pair fails, file an issue, do not block the merge — the design-doc contrast table was verified mathematically; failures here would indicate a component that's using an unexpected token combo and should be tracked.

- [ ] **Step 4: No commit. This is a verification task.**

---

## Out-of-Scope Follow-ups

Items the design doc explicitly defers. Do not implement here — create separate tickets:

1. **OG / social images.** Baked PNGs still show the amber palette. Regenerate in a separate task.
2. **Logo recolor**, if Task 7 found a clash.
3. **Real dark mode.** The `.dark` block mirrors `:root` today. A genuine dark variant needs its own brainstorming pass.
4. **Homepage hero composition rewrite** to match the new "Finance Exception Automation Systems" positioning. Handled later under the full positioning rewrite.
5. **Chart palette review.** The new chart series are mathematically distinct; whether they're *narratively* right for finance dashboards is a separate design exercise.

---

## Self-Review Notes

- Every step has a concrete file path, exact replacement, and an executable verification step.
- The three "hard-coded literal" files identified by the initial grep (`globals.css`, `control-rule-table.tsx`, `chatbot.tsx`) each have a dedicated task.
- Task 5 sweeps for anything added since the initial scan.
- Contrast ratios are inherited from the approved design doc; the spot-check in Task 8 catches token-misuse drift rather than re-deriving the math.
- No new types, functions, or symbols are introduced — this is a pure value swap with one symbol rename (`ON_AMBER_COLOR` → `ON_PRIMARY_COLOR`) which is consistent across the single file that uses it.
