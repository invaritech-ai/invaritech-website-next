import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { joinByPo } from "../components/glossary/three-way-matcher/match-engine.ts";

describe("joinByPo", () => {
    it("returns a map of po number to row for case-insensitive whitespace-stripped keys", () => {
        const rows = [
            { poNumber: " po-001 ", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "x" },
            { poNumber: "PO-002", vendor: "Acme", amount: 200, quantity: 2, lineDescription: "y" },
        ];
        const map = joinByPo(rows);
        assert.equal(map.get("po-001")?.amount, 100);
        assert.equal(map.get("po-002")?.amount, 200);
    });

    it("collects duplicates into an array", () => {
        const rows = [
            { poNumber: "PO-001", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "x", invoiceId: "INV-1" },
            { poNumber: "PO-001", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "x", invoiceId: "INV-2" },
        ];
        const map = joinByPo(rows);
        const entry = map.get("po-001");
        assert.ok(Array.isArray(entry));
        assert.equal(entry.length, 2);
    });
});

import { isAmountWithinTolerance, jaccardTokenOverlap } from "../components/glossary/three-way-matcher/match-engine.ts";

describe("isAmountWithinTolerance", () => {
    it("uses the larger of percentage or $50 floor", () => {
        // 2% of 100 = $2, floor is $50, so $50 wins
        assert.equal(isAmountWithinTolerance(100, 140, 2), true);  // diff $40 <= $50
        assert.equal(isAmountWithinTolerance(100, 160, 2), false); // diff $60 > $50

        // 2% of 10000 = $200, $50 floor loses
        assert.equal(isAmountWithinTolerance(10000, 10199, 2), true);  // diff $199 <= $200
        assert.equal(isAmountWithinTolerance(10000, 10250, 2), false); // diff $250 > $200
    });

    it("treats zero tolerance as exact match (within floating-point epsilon)", () => {
        assert.equal(isAmountWithinTolerance(100, 100, 0), true);
        assert.equal(isAmountWithinTolerance(100, 100.001, 0), true); // within epsilon
        assert.equal(isAmountWithinTolerance(100, 101, 0), false);
    });
});

describe("jaccardTokenOverlap", () => {
    it("returns 1.0 for identical token sets", () => {
        assert.equal(jaccardTokenOverlap("office chairs", "office chairs"), 1);
    });

    it("returns 0 for disjoint token sets", () => {
        assert.equal(jaccardTokenOverlap("office chairs", "laptop bag"), 0);
    });

    it("is case-insensitive and ignores punctuation", () => {
        assert.equal(jaccardTokenOverlap("Office Chairs!", "office, chairs"), 1);
    });

    it("returns partial overlap correctly", () => {
        // {office, chair, premium} vs {office, chair} = 2/3 ~= 0.667
        const result = jaccardTokenOverlap("office chair premium", "office chair");
        assert.ok(Math.abs(result - 2 / 3) < 0.001);
    });
});

import { runMatch } from "../components/glossary/three-way-matcher/match-engine.ts";

const baseInvoice = { invoiceId: "INV-1", poNumber: "PO-1", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "office chair" };
const basePo      = { poNumber: "PO-1", vendor: "Acme", amount: 100, quantity: 1, lineDescription: "office chair" };
const baseGr      = { poNumber: "PO-1", vendor: "Acme", quantityReceived: 1, lineDescription: "office chair" };

describe("runMatch", () => {
    it("classifies a perfect match as MATCHED", () => {
        const results = runMatch([baseInvoice], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results.length, 1);
        assert.equal(results[0].status, "MATCHED");
    });

    it("classifies missing PO as MISSING_PO", () => {
        const results = runMatch([baseInvoice], [], [], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "MISSING_PO");
    });

    it("classifies missing GR (but PO present) as MISSING_GR", () => {
        const results = runMatch([baseInvoice], [basePo], [], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "MISSING_GR");
    });

    it("classifies amount variance as AMOUNT_VARIANCE", () => {
        const inv = { ...baseInvoice, amount: 200 };
        const results = runMatch([inv], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "AMOUNT_VARIANCE");
    });

    it("classifies quantity variance as QUANTITY_VARIANCE", () => {
        const gr = { ...baseGr, quantityReceived: 5 };
        const results = runMatch([baseInvoice], [basePo], [gr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "QUANTITY_VARIANCE");
    });

    it("classifies vendor mismatch as VENDOR_MISMATCH", () => {
        const po = { ...basePo, vendor: "Different Inc" };
        const results = runMatch([baseInvoice], [po], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "VENDOR_MISMATCH");
    });

    it("classifies low line-description overlap as LINE_DESC_MISMATCH", () => {
        const po = { ...basePo, lineDescription: "laptop bag" };
        const results = runMatch([baseInvoice], [po], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "LINE_DESC_MISMATCH");
    });

    it("classifies two invoices sharing one PO as DUPLICATE_INVOICE for both", () => {
        const inv2 = { ...baseInvoice, invoiceId: "INV-2" };
        const results = runMatch([baseInvoice, inv2], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results.length, 2);
        assert.equal(results[0].status, "DUPLICATE_INVOICE");
        assert.equal(results[1].status, "DUPLICATE_INVOICE");
    });
});

import { parseInvoiceRows, parsePoRows, parseGrRows } from "../components/glossary/three-way-matcher/csv-parser.ts";
import { SAMPLE_INVOICES_CSV, SAMPLE_POS_CSV, SAMPLE_GRS_CSV } from "../components/glossary/three-way-matcher/sample-data.ts";

describe("sample data coverage", () => {
    it("surfaces all 8 status types when run with 2% tolerance", () => {
        const invs = parseInvoiceRows(SAMPLE_INVOICES_CSV);
        const pos = parsePoRows(SAMPLE_POS_CSV);
        const grs = parseGrRows(SAMPLE_GRS_CSV);
        const results = runMatch(invs, pos, grs, { amountTolerancePercent: 2 });
        const statuses = new Set(results.map((r) => r.status));

        for (const expected of [
            "MATCHED",
            "AMOUNT_VARIANCE",
            "QUANTITY_VARIANCE",
            "MISSING_PO",
            "MISSING_GR",
            "VENDOR_MISMATCH",
            "LINE_DESC_MISMATCH",
            "DUPLICATE_INVOICE",
        ]) {
            assert.ok(statuses.has(expected), `Sample should surface ${expected}; got ${[...statuses].join(", ")}`);
        }
    });
});
