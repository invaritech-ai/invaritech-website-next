# Breadcrumb Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable breadcrumb component and use it on the supplier payment control resource detail page.

**Architecture:** Keep the breadcrumb explicit per page instead of deriving labels from the URL. Put route-independent breadcrumb item normalization in `lib/breadcrumbs.ts` so it can be tested with Node's built-in test runner, and put the rendered UI in `components/breadcrumbs.tsx`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, lucide-react, Node `node:test`.

---

## File Structure

- Create `lib/breadcrumbs.ts`: defines `BreadcrumbItemInput`, `BreadcrumbItem`, and `createBreadcrumbItems()`.
- Create `tests/breadcrumbs.test.mjs`: verifies breadcrumb normalization behavior.
- Create `components/breadcrumbs.tsx`: renders semantic breadcrumb UI from explicit items.
- Modify `components/resource-rule-table-client.tsx`: replaces the current "Back to Resources" link with the new breadcrumb.

### Task 1: Breadcrumb Item Normalization

**Files:**
- Create: `lib/breadcrumbs.ts`
- Test: `tests/breadcrumbs.test.mjs`

- [ ] **Step 1: Write the failing test**

```javascript
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createBreadcrumbItems } from "../lib/breadcrumbs.js";

describe("createBreadcrumbItems", () => {
  it("marks the last breadcrumb item as the current page", () => {
    const items = createBreadcrumbItems([
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources/" },
      { label: "Supplier Payment Control Rule Table" },
    ]);

    assert.deepEqual(items, [
      { label: "Home", href: "/", current: false },
      { label: "Resources", href: "/resources/", current: false },
      { label: "Supplier Payment Control Rule Table", current: true },
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --no-warnings --test tests/breadcrumbs.test.mjs`

Expected: FAIL because `../lib/breadcrumbs.js` does not exist yet.

- [ ] **Step 3: Add the minimal implementation**

```typescript
export interface BreadcrumbItemInput {
    label: string;
    href?: string;
}

export interface BreadcrumbItem extends BreadcrumbItemInput {
    current: boolean;
}

export function createBreadcrumbItems(
    items: BreadcrumbItemInput[],
): BreadcrumbItem[] {
    const lastIndex = items.length - 1;

    return items.map((item, index) => ({
        ...item,
        current: index === lastIndex,
    }));
}
```

- [ ] **Step 4: Run the test through TypeScript-aware import strategy**

Run: `node --no-warnings --test tests/breadcrumbs.test.mjs`

Expected: PASS with one passing test.

### Task 2: Breadcrumb UI Component

**Files:**
- Create: `components/breadcrumbs.tsx`
- Modify: `components/resource-rule-table-client.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createBreadcrumbItems, type BreadcrumbItemInput } from "@/lib/breadcrumbs";

interface BreadcrumbsProps {
    items: BreadcrumbItemInput[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    const breadcrumbItems = createBreadcrumbItems(items);

    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground-subtle">
                {breadcrumbItems.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
                        {item.current || !item.href ? (
                            <span aria-current={item.current ? "page" : undefined} className="truncate text-foreground/70">
                                {item.label}
                            </span>
                        ) : (
                            <Link href={item.href} className="truncate transition-colors hover:text-foreground">
                                {item.label}
                            </Link>
                        )}
                        {index < breadcrumbItems.length - 1 && (
                            <ChevronRight className="size-3 shrink-0 text-border" aria-hidden="true" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
```

- [ ] **Step 2: Use the component on the resource detail page**

Replace the existing back-link block in `components/resource-rule-table-client.tsx` with:

```tsx
<div className="site-container pt-10">
    <Breadcrumbs
        items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources/" },
            { label: "Supplier Payment Control Rule Table" },
        ]}
    />
</div>
```

Remove the now-unused `ArrowLeft` import from that file.

### Task 3: Verify

**Files:**
- Check: `components/breadcrumbs.tsx`
- Check: `components/resource-rule-table-client.tsx`

- [ ] **Step 1: Run lint**

Run: `pnpm lint`

Expected: PASS with no new lint errors.

- [ ] **Step 2: Run production build**

Run: `pnpm build`

Expected: PASS. If unrelated existing build errors appear, record them and confirm the breadcrumb files type-check.

- [ ] **Step 3: Manual browser check**

Run: `pnpm run dev`

Open `/resources/supplier-payment-control-rule-table/` and verify:

- Breadcrumb appears where the back link used to appear.
- Home and Resources are clickable.
- Current page label is not clickable.
- Breadcrumb wraps cleanly on mobile width.

## Self-Review

Spec coverage: the plan creates a reusable breadcrumb, applies it only to the resource detail page, and preserves other nested page patterns.

Placeholder scan: no placeholders remain.

Type consistency: `BreadcrumbItemInput`, `BreadcrumbItem`, and `createBreadcrumbItems()` are defined once and reused by the component.
