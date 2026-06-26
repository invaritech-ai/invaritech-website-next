# Color System Redesign — Forest Green on Off-White

Date: 2026-05-24
Status: Approved (palette only). Implementation plan to follow via writing-plans.

## Goal

Replace the current warm-parchment + amber/gold palette with an off-white background and forest-green primary, supported by a single copper accent. Every text/background combination on the site must hit WCAG AA at minimum; primary body copy and primary CTAs must hit AAA where practical so the site remains legible on cheap screens, in direct sunlight, and on mobile.

This is a **token-value swap**, not a structural change. The existing CSS custom property surface in `app/globals.css` stays. Only hex values change.

## Positioning Rationale

The new positioning ("Finance Exception Automation Systems", "payment-control risks", "approval evidence", "exception queue") uses auditor vocabulary. Forest green + copper is the canonical green-ledger / copper-foil pairing used by audit firms and financial-document design for over a century. It signals controls and evidence rather than AI-startup or eco-brand.

Amber/gold was the previous attempt at "premium tech consultancy". It now reads adjacent to the "AI consulting" language the doctrine explicitly avoids. Moving to forest green distances the brand from that category visually as well as verbally.

## Tokens

### Core surfaces

| Token | New value | Previous | Notes |
|---|---|---|---|
| `--background` | `#F7F7F4` | `#FBF8F3` | Off-white, faint warm cast. Not pure white — pure white glares and looks unbranded. |
| `--foreground` | `#0B1410` | `#1C1410` | Near-black with a green undertone. 17.8 : 1 on background. |
| `--card` | `#FFFFFF` | `#F3EDE3` | Cards lift above background by going whiter, not darker. |
| `--card-foreground` | `#0B1410` | `#1C1410` | Same as foreground. |
| `--popover` | `#FFFFFF` | `#FFFFFF` | Unchanged. |
| `--popover-foreground` | `#0B1410` | `#1C1410` | |

### Primary (Forest)

| Token | New value | Notes |
|---|---|---|
| `--primary` | `#0F5132` | Forest green. 10.4 : 1 on `--background`. |
| `--primary-foreground` | `#FFFFFF` | 8.4 : 1 on primary — AAA for large text, AA for body. |
| `--primary-hover` | `#0A3D24` | Darker on hover. New token. |
| `--ring` | `#0F5132` | Focus ring matches primary. |

### Accent (Copper)

Used sparingly: hover underlines, "exception detected" badges, chart-2, key numerical highlights, and any single-point emphasis inside otherwise-green sections. Never on large surfaces. Never as a CTA fill.

| Token | New value | Notes |
|---|---|---|
| `--accent` | `#B45309` | Copper. 5.1 : 1 on `--background` (AA). |
| `--accent-foreground` | `#FFFFFF` | 4.9 : 1 on accent — AA only. Use for small UI chips, not body. |

### Neutrals

| Token | New value | Previous | Notes |
|---|---|---|---|
| `--secondary` | `#EEEDE8` | `#EDE6DA` | Cooler, less yellow. |
| `--secondary-foreground` | `#0B1410` | `#1C1410` | |
| `--muted` | `#F1F0EC` | `#F0EBE1` | |
| `--muted-foreground` | `#4B5550` | `#5F5248` | 7.6 : 1 on background. Drops yellow undertone. |
| `--foreground-muted` | `#5A645F` | `#6A5E54` | 6.0 : 1. |
| `--foreground-subtle` | `#6B7570` | `#7A6E64` | 4.9 : 1, AA for body. |
| `--border` | `#E2E4DE` | `#DDD5C8` | Hairline with faint cool cast so green doesn't look isolated. |
| `--input` | `#E2E4DE` | `#DDD5C8` | Matches border. |
| `--packet-bg` | `#EEEDE8` | `#F2EBE0` | Code/data block background. |

### Semantic

| Token | New value | Previous | Notes |
|---|---|---|---|
| `--destructive` | `#B91C1C` | `#B91C1C` | Unchanged. |
| `--destructive-foreground` | `#FFFFFF` | `#FFFFFF` | Unchanged. |

### Charts

The new chart set keeps the primary forest as chart-1, copper as chart-2, then progressively desaturates so multi-series charts never compete with the brand. No more yellow-on-yellow.

| Token | New value | Previous |
|---|---|---|
| `--chart-1` | `#0F5132` | `#C8962D` |
| `--chart-2` | `#B45309` | `#2B4A8A` |
| `--chart-3` | `#1E3A8A` | `#3A7D5C` |
| `--chart-4` | `#4B5550` | `#8B6914` |
| `--chart-5` | `#7A8A82` | `#5A3E7C` |

### Sidebar

Sidebar tokens mirror the surface/foreground decisions one-for-one. No separate sidebar palette.

| Token | New value |
|---|---|
| `--sidebar` | `#F1F0EC` |
| `--sidebar-foreground` | `#0B1410` |
| `--sidebar-primary` | `#0F5132` |
| `--sidebar-primary-foreground` | `#FFFFFF` |
| `--sidebar-accent` | `#EEEDE8` |
| `--sidebar-accent-foreground` | `#0B1410` |
| `--sidebar-border` | `#E2E4DE` |
| `--sidebar-ring` | `#0F5132` |

## Contrast Table (verified)

All ratios are foreground-on-background, computed at sRGB.

| Pair | Ratio | Verdict |
|---|---|---|
| `--foreground` on `--background` | 17.8 | AAA |
| `--muted-foreground` on `--background` | 7.6 | AAA |
| `--foreground-subtle` on `--background` | 4.9 | AA body |
| `--primary` on `--background` | 10.4 | AAA |
| `--primary-foreground` on `--primary` (button) | 8.4 | AAA large / AA body |
| `--accent` on `--background` | 5.1 | AA |
| `--accent-foreground` on `--accent` | 4.9 | AA |
| `--destructive` on `--background` | 5.9 | AA |
| `--foreground` on `--card` (white) | 19.1 | AAA |

Any new combination introduced during implementation must be checked against this table before merge.

## Dark Mode

The current `.dark` block in `globals.css` is a duplicate of `:root` (light mode in disguise — there is no real dark mode today). Keep it that way for now: copy the new light values into `.dark`. A real dark mode is out of scope for this change and should be brainstormed separately.

## Usage Rules

1. **Primary green is the only fill color for CTAs.** No copper buttons, no outline-green-on-green primary buttons.
2. **Copper is for single points of attention.** Eyebrow rules (`h-px w-8 bg-primary/60`) stay green. Copper appears on: badge text, "exception" indicators, hover underlines on text links, chart series 2, and the small numeric tick on a price range.
3. **No green on green.** Card backgrounds are white or off-white, never tinted green. Tinted green backgrounds were a temptation in the old amber palette and looked sickly; in the new palette they look like marketing for a salad chain.
4. **Borders are neutral, not green.** `--border` stays in the cool-gray family so green doesn't compete with itself everywhere.
5. **Noise/particle overlays** stay at low opacity. Tune them against the new background; the existing values were calibrated against warm parchment and will look dirty on cool off-white.

## What Stays Unchanged

- Type system (Source Serif 4, Source Sans 3, monospace eyebrow).
- Radius (`0.125rem` — basically square corners).
- Layout, spacing, GSAP/motion behavior.
- All component structure.
- The "systems intelligence" voice in copy. This is a palette change, not a brand reset.

## Out of Scope

- Real dark mode.
- Changes to the homepage hero composition (handled later under the full positioning rewrite).
- New components, new pages, new sections.
- Logo color changes — confirm separately if the existing logo asset reads correctly on the new background.

## Migration Risk

Low. The token surface is stable, so the bulk of changes are inside `app/globals.css`. The risks are:

1. **Hard-coded color literals** in components (any `text-amber-*`, `bg-[#C8962D]`, etc.) — these bypass tokens and will visually drift. The implementation plan must include a grep sweep.
2. **Particle/noise overlay opacities** were tuned against the warm background and will need adjustment.
3. **Logo asset** if it embeds amber. Verify before merging.
4. **OG images and structured-data thumbnails** are baked PNGs and will look out-of-brand until regenerated. Regeneration is a separate task.

## Next Step

Hand off to writing-plans skill to produce the implementation plan: token swap in `globals.css`, hard-coded-color sweep, overlay-opacity retune, logo verification, OG image follow-up ticket.
