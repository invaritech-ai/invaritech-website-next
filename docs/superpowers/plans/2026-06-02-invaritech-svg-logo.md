# Invaritech SVG Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create clean SVG versions of the Invaritech icon and horizontal color lockup from the supplied logo sheet.

**Architecture:** Keep the SVGs as standalone static assets under `public/`. Build the mark from simple vector primitives and the lockup from the mark plus brand text, then validate by exporting PNG previews.

**Tech Stack:** SVG, Inkscape, shell rendering checks.

---

### Task 1: Icon SVG

**Files:**
- Create: `public/invaritech-icon.svg`

- [ ] Create a vector-only orbital icon using muted green `#6FAF9D`.
- [ ] Use rounded stroked arcs and circular nodes to match the supplied sheet.
- [ ] Render a PNG preview through Inkscape and inspect it visually.

### Task 2: Horizontal Lockup SVG

**Files:**
- Create: `public/invaritech-logo-horizontal.svg`

- [ ] Reuse the icon geometry from Task 1 at a smaller scale.
- [ ] Add `INVARITECH` in charcoal `#1F1F1F` and `PAYMENT CONTROLS` in green `#6FAF9D`.
- [ ] Render a PNG preview through Inkscape and inspect it visually.

### Task 3: Verification

- [ ] Confirm both SVG files are valid XML.
- [ ] Export PNG previews with Inkscape.
- [ ] Check the previews against the supplied source image for obvious layout, color, or proportion issues.
