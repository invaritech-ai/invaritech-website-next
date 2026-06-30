# Task 3 Report: Proof Pages And Worksheet

## What Was Implemented

- Added the deterministic worksheet behavior test in `tests/claims-worksheet.test.mjs`.
- Added the stdlib-only XLSX generator in `scripts/generate-claims-worksheet.py`.
- Generated `public/retailer-deduction-triage-worksheet.xlsx` with fixed ZIP timestamps and byte-stable output.
- Added `components/claims/worksheet-download-link.tsx` with the required analytics tags.
- Added the sample teardown page at `app/resources/sample-claims-evidence-pack/page.tsx`.
- Added the remittance advice glossary page at `app/glossary/remittance-advice/page.tsx`.
- Added the Food and Grocery Code glossary page at `app/glossary/food-and-grocery-code/page.tsx`.

## Worksheet Scope

- Workbook tabs:
  - `Start Here`
  - `Claim Ledger`
  - `Deduction Type Matrix`
  - `Summary`
- The matrix tab includes every row from `lib/claims/deduction-matrix.json`.
- The ledger tab includes retailer, dates, deduction type, reason note, amount, verdict, evidence, Code check, neutral query, gap, priority, owner, and status columns.
- The ledger uses `INDEX` / `MATCH` formulas against the matrix tab for verdict, evidence, Code check, and neutral query.
- The ledger includes a 30-day timing flag for `shortfall` and `damaged-goods`.
- The ledger assigns `High`, `Medium`, or `Low` priority.
- The summary tab totals amount by verdict and includes the Claims Desk handoff line.
- The XLSX generator uses `zipfile.ZipInfo` with fixed `date_time = (1980, 1, 1, 0, 0, 0)` and does not use `ZipFile.write`.

## Verification

- `python3 scripts/generate-claims-worksheet.py`
  - PASS.
- `python3 -m zipfile -l public/retailer-deduction-triage-worksheet.xlsx`
  - PASS.
- `node --experimental-strip-types --test tests/claims-worksheet.test.mjs`
  - PASS: 3/3 tests.
- `node --experimental-strip-types --test tests/claims-foundation.test.mjs`
  - PASS: 6/6 tests.
  - Output includes the repo's existing `MODULE_TYPELESS_PACKAGE_JSON` warning for TypeScript ESM test imports.
- `corepack pnpm lint`
  - PASS.
- `corepack pnpm build`
  - BLOCKED in the sandbox.
  - Build reached `Creating an optimized production build ...` and then produced no further output across two 30-second polling windows, matching the sandbox Next/Turbopack hang described in the task constraints. The stalled process was interrupted cleanly.

## TDD Evidence

- RED: `node --experimental-strip-types --test tests/claims-worksheet.test.mjs` failed before implementation because `scripts/generate-claims-worksheet.py` did not exist.
- GREEN: the same focused worksheet test passed after implementing the generator and generating the workbook.

## Files Changed

- `tests/claims-worksheet.test.mjs`
- `scripts/generate-claims-worksheet.py`
- `public/retailer-deduction-triage-worksheet.xlsx`
- `components/claims/worksheet-download-link.tsx`
- `app/resources/sample-claims-evidence-pack/page.tsx`
- `app/glossary/remittance-advice/page.tsx`
- `app/glossary/food-and-grocery-code/page.tsx`
- `.superpowers/sdd/task-3-report.md`

## Self-Review Findings

- The worksheet output is byte-deterministic across repeated runs.
- The new Claims pages keep the shared taxonomy: `supportable`, `missing proof`, `worth challenging`, and `Code risk`.
- The new Claims pages do not use forbidden legacy copy and do not hardcode the Claims Desk domain.
- The Food and Grocery Code page keeps descriptive framing and uses source links from the existing claims source registry plus the Grocery Code Supervisor site.

## Concerns

- Production build verification is blocked by the sandboxed Next/Turbopack hang. Focused tests, worksheet generation, source-surface invariants, and lint all pass.
