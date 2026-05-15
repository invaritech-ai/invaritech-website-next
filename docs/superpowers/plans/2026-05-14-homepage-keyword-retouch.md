# Homepage Keyword Retouch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retouch homepage and core metadata copy to align with validated AP-control keyword demand without changing layout or conversion flow.

**Architecture:** Keep the existing page/component structure intact and only update user-facing strings in homepage sections and global metadata objects. Preserve design tokens, animation components, and CTA wiring. Apply related SEO consistency fixes in footer navigation and work-page metadata.

**Tech Stack:** Next.js App Router, React, TypeScript, metadata API (`Metadata`), static copy constants inside TSX files.

---

### Task 1: Retouch Homepage Hero and Problem Copy

**Files:**
- Modify: `components/payment-control-home.tsx`
- Test: `npm run build`

- [ ] **Step 1: Write the target copy set for hero/problem blocks**

```ts
// Hero lead copy target
"We help Australian finance and accounts payable teams strengthen controls around invoice exceptions, payment approvals, duplicate payments, and supplier payment workflows without replacing the software they already use."

// Problem intro copy target
"Accounts payable controls rarely fail in one obvious place. Invoice approval workflow gaps, supplier statement reconciliation issues, freight invoice audit misses, and duplicate vendor payments show up as daily symptoms your team has learned to work around."
```

- [ ] **Step 2: Apply the copy updates in `components/payment-control-home.tsx`**

```tsx
<p className="site-lead">
  We help Australian finance and accounts payable teams strengthen controls around invoice exceptions, payment approvals, duplicate payments, and supplier payment workflows without replacing the software they already use.
</p>
```

```tsx
<p className="site-body">
  Accounts payable controls rarely fail in one obvious place. Invoice approval workflow gaps, supplier statement reconciliation issues, freight invoice audit misses, and duplicate vendor payments show up as daily symptoms your team has learned to work around.
</p>
```

- [ ] **Step 3: Keep H1 semantics safe while preserving visual treatment**

```tsx
<h1 className="site-h1">
  Clean up payment controls without changing{" "}
  <span className="sr-only">systems</span>
  <SystemsScramble />.
</h1>
```

Action note: In the implementation pass, move/overlay the animated duplicate outside the semantic text path so the semantic heading resolves cleanly to `Clean up payment controls without changing systems.`

- [ ] **Step 4: Run build to verify no regressions**

Run: `npm run build`
Expected: `Compiled successfully` and no type errors.

- [ ] **Step 5: Commit**

```bash
git add components/payment-control-home.tsx
git commit -m "feat: retouch homepage copy for AP control keyword alignment"
```

### Task 2: Retouch Homepage Mid/Bottom Sections for Secondary Terms

**Files:**
- Modify: `components/payment-control-home.tsx`
- Test: `npm run build`

- [ ] **Step 1: Update the “question” block copy**

```tsx
<p className="site-home-question-body">
  We design accounts payable controls and supplier payment workflows that handle invoice exceptions, payment approval checks, and audit trails inside your current stack.
</p>
```

- [ ] **Step 2: Update workflow and final CTA support copy**

```tsx
// workflow step body target
"We add rule logic, invoice exception management routing, payment approval checks, evidence capture, and audit trails without forcing a system change."
```

```tsx
// final CTA body target
"Request the workbook we use to map supplier payment controls, invoice exception routing, payment approval checks, and audit notes before payment release."
```

- [ ] **Step 3: Run build to verify no regressions**

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add components/payment-control-home.tsx
git commit -m "feat: expand homepage copy with secondary AP workflow terms"
```

### Task 3: Align OG/Twitter Descriptions to Primary Meta Wording

**Files:**
- Modify: `app/layout.tsx`
- Test: `npm run build`

- [ ] **Step 1: Use one canonical description string for OG + Twitter**

```ts
"Founder-led payment control design for Australian finance teams reducing invoice exceptions, approval gaps, and payment leakage without changing systems."
```

- [ ] **Step 2: Replace existing `openGraph.description` and `twitter.description`**

```ts
openGraph: {
  // ...
  description:
    "Founder-led payment control design for Australian finance teams reducing invoice exceptions, approval gaps, and payment leakage without changing systems.",
}
```

```ts
twitter: {
  // ...
  description:
    "Founder-led payment control design for Australian finance teams reducing invoice exceptions, approval gaps, and payment leakage without changing systems.",
}
```

- [ ] **Step 3: Run build and verify metadata compiles**

Run: `npm run build`
Expected: Build passes and page metadata generation succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "fix: align social metadata descriptions with homepage meta copy"
```

### Task 4: Remove Careers From Footer Navigation

**Files:**
- Modify: `components/footer.tsx`
- Test: `npm run build`

- [ ] **Step 1: Remove `/careers/` entry from `navigationLinks`**

```ts
// remove
{ title: "Careers", href: "/careers/" },
```

- [ ] **Step 2: Keep noindex careers page untouched**

No code change required in `app/careers/page.tsx`; page remains `robots: { index: false, follow: false }`.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build passes and footer renders without key warnings.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "chore: remove careers from footer navigation"
```

### Task 5: Reframe `/work/` Metadata to Payment-Control Narrative

**Files:**
- Modify: `app/work/page.tsx`
- Test: `npm run build`

- [ ] **Step 1: Update page metadata title/description for `/work/`**

```ts
title: "Payment Control Work & Delivered Systems",
description:
  "Proof pages from founder-led workflow delivery across finance, compliance, and operations, including payment controls, approval workflows, and auditable exception handling.",
```

- [ ] **Step 2: Align OG/Twitter metadata with same narrative**

```ts
openGraph: {
  title: "Payment Control Work & Delivered Systems | INVARITECH",
  description:
    "Proof pages from founder-led workflow delivery across finance, compliance, and operations, including payment controls, approval workflows, and auditable exception handling.",
}
```

```ts
twitter: {
  title: "Payment Control Work & Delivered Systems | INVARITECH",
  description:
    "Proof pages from founder-led workflow delivery across finance, compliance, and operations, including payment controls, approval workflows, and auditable exception handling.",
}
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build passes and metadata exports are valid.

- [ ] **Step 4: Commit**

```bash
git add app/work/page.tsx
git commit -m "feat: reframe work page metadata for payment-control positioning"
```

### Task 6: Validation and Final Consolidation

**Files:**
- Modify: none
- Test: `npm run build`

- [ ] **Step 1: Run full build once after all edits**

Run: `npm run build`
Expected: Successful production build.

- [ ] **Step 2: Spot-check final copy targets by grep**

Run: `rg -n "accounts payable controls|invoice approval workflow|payment approval checks|Payment Control Work & Delivered Systems|Founder-led payment control design for Australian finance teams reducing invoice exceptions" components app`
Expected: Matches in intended files only.

- [ ] **Step 3: Commit final integrated changes**

```bash
git add components/payment-control-home.tsx app/layout.tsx components/footer.tsx app/work/page.tsx
git commit -m "feat: align homepage and metadata with AP keyword strategy"
```

## Self-Review

1. Spec coverage:
   - Homepage copy retouch: covered by Tasks 1 and 2.
   - OG/Twitter alignment: covered by Task 3.
   - Careers footer cleanup: covered by Task 4.
   - Work-page reframing: covered by Task 5.
   - Validation: covered by Task 6.

2. Placeholder scan:
   - No TBD/TODO placeholders remain.
   - Commands and target strings are concrete.

3. Type consistency:
   - All referenced files and object keys match existing code (`metadata`, `openGraph`, `twitter`, React JSX blocks).

