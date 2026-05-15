# Breadcrumb Navigation Design

## Context

Deep detail pages currently rely on hand-written back links, for example the resource rule table page links back to `/resources/`. That gives users one escape route but does not show where the page sits in the site.

## Approved Approach

Add a reusable breadcrumb component and wire it into the resource detail page first. Keep blog, work, service, and tool page migrations out of this change so the implementation stays low-risk and does not disturb existing page-specific layouts.

## Alternatives Considered

1. Replace all back links across nested routes in one pass.
   This would improve consistency quickly, but it touches many unrelated pages and increases visual regression risk.

2. Add a route-aware automatic breadcrumb that reads `usePathname()`.
   This reduces per-page setup, but it needs client-side route parsing and label overrides for slugs. It is unnecessary for one known resource detail page.

3. Add a small explicit breadcrumb component.
   This keeps server/client compatibility simple, gives each page exact labels, and can be adopted incrementally.

## Component Design

Create `components/breadcrumbs.tsx` with:

- `BreadcrumbItem` type containing `label`, optional `href`, and optional `current`.
- `Breadcrumbs` component rendering a semantic `nav` with `aria-label="Breadcrumb"`.
- Ordered list markup.
- Links for ancestor items.
- `aria-current="page"` on the current item.
- Chevron separators using `lucide-react`.

The component should use the site's existing visual language: mono uppercase labels, muted foreground color, clear hover states, and no card or decorative wrapper.

## Resource Page Integration

Replace the resource detail page's existing "Back to Resources" link with:

- Home -> `/`
- Resources -> `/resources/`
- Supplier Payment Control Rule Table -> current page

The breadcrumb sits in the same top spacing as the existing back link so the page hierarchy improves without changing the rest of the page.

## Testing

The app does not currently have a test runner configured. Add a small Node test for the breadcrumb item helper rather than introducing a heavyweight React test stack. The helper should mark only the final item as current and ensure non-current items retain links.

Run:

- `node --no-warnings --test tests/breadcrumbs.test.mjs`
- `pnpm lint`
- `pnpm build`
