# Resources Finance Tools Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `/resources/` into a live finance automation tools hub that targets practical AP and invoice automation search intent.

**Architecture:** Keep the existing Next.js App Router page, metadata, resource data model, and client-side filtering pattern where useful. Replace mixed public/internal copy with problem-based resource discovery and hide unavailable resources from the public index.

**Tech Stack:** Next.js, React, TypeScript, Tailwind, existing site components, lucide-react icons.

---

### Task 1: Resource Data Cleanup

**Files:**
- Modify: `lib/resources.ts`
- Modify: `components/resource-card.tsx`

- [ ] **Step 1: Update resource labels**

Change `PILLAR_LABELS.all` from `All Pillars` to `All`, and display `Finance Automation` / `Compliance Automation` instead of `Finance Ops` / `RegOps` in public cards.

- [ ] **Step 2: Filter public resources**

Add an exported helper:

```ts
export const getOpenResources = (): Resource[] =>
    resources.filter((resource) => resource.access === "open");
```

- [ ] **Step 3: Remove coming-soon UI from cards**

Keep the data model intact for future use, but the public `/resources/` page should call `getOpenResources()`, so coming-soon badges should not appear there.

### Task 2: Resources Page Metadata

**Files:**
- Modify: `app/resources/page.tsx`

- [ ] **Step 1: Rewrite metadata**

Use:

```ts
title: "Free Finance Automation Tools for AP Controls and Invoice Workflows"
description: "Free finance automation tools for AP teams: invoice extraction, AP controls, invoice processing automation, and month-end close cost analysis."
```

- [ ] **Step 2: Add page schema**

Keep BreadcrumbList and add WebPage schema with the same visible promise.

### Task 3: Resources Page UI

**Files:**
- Modify: `components/resource-library-client.tsx`

- [ ] **Step 1: Replace hero copy**

Use public copy around free finance automation tools for AP teams. Remove "Resource Library", "RegOps will grow", and "proof notes".

- [ ] **Step 2: Replace featured panel**

Create a problem-based path section:

- Extract invoice data
- Check AP controls
- Understand invoice processing automation
- Quantify close drag

Each item should link to the matching live resource.

- [ ] **Step 3: Show live resources only**

Use `getOpenResources()` and group by problem or allow simple filtering without displaying placeholders.

- [ ] **Step 4: Keep compliance secondary**

Show EUDR as a compact compliance automation proof/resource after finance assets.

### Task 4: Verification

**Files:**
- Verify: `/resources/`

- [ ] **Step 1: Run lint**

Run: `pnpm lint`

- [ ] **Step 2: Run build**

Run: `npm run build`

- [ ] **Step 3: Search for removed language**

Run: `rg -n "RegOps will grow|proof notes|Coming Soon|All Pillars|Resource Library" app/resources components/resource-library-client.tsx components/resource-card.tsx lib/resources.ts`

Expected: no public `/resources/` copy uses these phrases.

- [ ] **Step 4: Check links**

Confirm visible links point to existing routes:

- `/finance-automation/`
- `/resources/invoice-extractor/`
- `/resources/accounts-payable-controls/`
- `/resources/invoice-processing-automation/`
- `/resources/cost-to-close-calculator/`
- `/work/eudr-compliance-bridge/`
