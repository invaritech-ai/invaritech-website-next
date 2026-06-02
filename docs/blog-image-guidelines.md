# Blog Cover Image Guidelines

On-brand guidelines and ready-to-use prompts for generating blog cover images with
an AI image generator. Built for INVARITECH's editorial "systems intelligence"
aesthetic.

> Last updated: 2026-06-02

---

## Two hard constraints (from the codebase)

These come from how covers actually render — design to them, not around them.

1. **Grayscale by default, color on hover.** Both the blog index cards
   (`app/blog/page.tsx`) and the article hero (`app/blog/[slug]/page.tsx`) apply
   `grayscale … group-hover:grayscale-0`. The image **must read in monochrome**;
   color only rewards the hover state.
2. **Two crops from one file.** The index card shows the cover cropped to **4:3**
   (`object-cover`, center), while the article hero shows it full at **1200×630**
   (1.91:1). Keep the focal subject **centered**, inside a ~840×630 safe zone, so the
   card crop never cuts it off.

---

## Part 1 — Guidelines

**North star:** a quiet *systems schematic*, not a clickbait thumbnail. The
reference is the isometric EUDR panel on the Work page — apply that language as a
consistent **set** across all covers.

### Non-negotiables

- **No text, numbers, or logos in the image.** The card and article already render
  the title in Source Serif. Baked-in text is redundant, breaks at small sizes, and
  hurts accessibility/SEO. (This is the #1 reason the old set looked off.)
- **Must read in grayscale.** Carry the composition with *value contrast and line*,
  not hue.
- **One unified composition.** No split-down-the-middle diptych. No purple/yellow.
- **Cream ground.** Background = site paper `#F7F7F4`, so the image sits *into* the
  page instead of punching a dark hole into the grid.
- **One focal idea, centered, wide margins.**

### Palette (mono-first, color sparingly)

| Role | Hex |
|---|---|
| Paper background | `#F7F7F4` |
| Ink / linework | `#0B1410` → `#0F5132` (near-black → forest green) |
| Single accent (one element only) | `#B45309` amber |
| Hairlines / grid | `#E2E4DE` |
| Optional 2nd data hue (rare) | `#1E3A8A` slate-blue |

### Visual language — pick ONE, apply to all for cohesion

- **A — Isometric systems schematic (recommended).** Fine hairline line-art,
  deep-green ink on cream, one amber highlight, blueprint/grid feel, sharp corners,
  subtle paper grain. Matches the EUDR panel and the `rounded-none` aesthetic; reads
  great in grayscale.
- **B — Deep-green duotone editorial** (green↔cream). Also mono-friendly, but riskier
  for finance cliché — only if you want photographic.

### Format

- Export **1200×630 WebP** (matches the article hero + OG image), ~80–85 quality.
- Keep the subject within the central **~840×630 (4:3) safe zone** for the card crop.

---

## Part 2 — Generation instructions

### Master style block (prepend to every subject)

> Editorial isometric systems-schematic illustration for a B2B finance & compliance
> automation studio. **[SUBJECT].** Fine precise hairline linework in deep forest
> green on a warm off-white paper background, a single restrained amber accent on the
> key element only. Blueprint/technical aesthetic: clean geometry, sharp corners,
> generous negative space, one calm central idea, subtle paper grain. Flat 2D,
> minimal, sophisticated. Centered composition with wide margins. No text, no letters,
> no numbers, no logos.

### Negative prompt

> text, words, letters, numbers, watermark, logo, signature; split-screen, diptych,
> divided halves; purple, violet, magenta, yellow, neon, gradient mesh; busy collage,
> cluttered, photobash; faces, people, stock photo, handshake, office; 3D render,
> bevel, glossy, heavy drop shadow

### Generator settings

- **Midjourney v6/v7:** append ` --ar 40:21 --style raw --stylize 150` (40:21 ≈ 1.91:1).
- **OpenAI `gpt-image-1`:** size `1536x1024`, quality `high`, then center-crop to 1200×630.
- **SDXL / Flux:** render `1216×640` (or `1344×704`) → crop to 1.91:1.

### Per-article subjects

Drop each into `[SUBJECT]`. Replace the file **in place** — filenames stay the same,
so no code changes are needed.

| File to replace | Article | `[SUBJECT]` |
|---|---|---|
| `public/blog/small-business-automation.webp` | Small Business Automation | tangled manual paper threads on one side resolving into a single clean automated rail; order emerging from mess |
| `public/images/HiddenTimeTax.webp` | Invoice Data Extraction (AP) | a single paper invoice unfolding into a neat ordered grid of data cells |
| `public/blog/cash-flow-visibility.webp` | 13-Week Cash Flow Forecast | a horizon ridge of 13 slim vertical bars forming a forecast curve with a faint confidence band |
| `public/images/month-end-close.webp` | Month-End Close | a calendar/ledger grid folding and sealing shut like a clean vault block |
| `public/blog/buy-vs-build.webp` | Build vs Buy | one rail forking into two paths — a prefab module dropping in vs one assembled from parts |
| `public/blog/compliance-done-right.webp` | Compliance Done Right | precise interlocking gears passing a single checkmark token through a control gate |
| `public/blog/consultancy-trap.webp` | The Consultancy Trap | a closed looping process track of documents circling with no exit |
| `public/blog/why-consultancies-get-stuck.webp` | Why Consultancies Get Stuck | a clean pipeline with one clogged junction / a single stalled gear |
| `public/blog/regops-strategy.webp` | RegOps for ESG Scale | one node multiplying into a tidy lattice that scales outward |
| `public/blog/regops-technical.webp` | RegOps Bridge Architecture | an isometric bridge/pipeline spanning a legacy box and a modern system, data flowing across |
| `public/blog/why-manual-eudr-compliance-fails.webp` | Why Manual EUDR Fails | an isometric submission portal overwhelmed by a tall backlog stack of due-diligence statements |

> Note: 9 covers live in `public/blog/`, and 2 in `public/images/`
> (`HiddenTimeTax.webp`, `month-end-close.webp`). Replace at the exact paths above.

### QA before dropping each file in

1. **Desaturate it** — does it still read clearly? (If it dies in grayscale, redo.)
2. **Zero text / numbers / logos?**
3. **Subject inside the centered 4:3 zone** (won't get cropped on the card)?
4. **Cream background, single amber accent, no purple/yellow, no split?**

---

## Why the old set was replaced

The previous covers were dark, busy AI-collages **with headline text baked in**,
split horizontally with purple/yellow themes — they clashed with the airy
cream/serif minimalism, and baked-in text doesn't scale or stay accessible. The CSS
cohesion layer (`grayscale` + hover) was already in place and wasn't enough; the fix
is the source art, per the guidelines above.
