import assert from "node:assert/strict";
import { describe, it } from "node:test";

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

    it("matches PO numbers case-insensitively after trimming", () => {
        const invoice = { ...baseInvoice, poNumber: " po-1 " };
        const results = runMatch([invoice], [basePo], [baseGr], { amountTolerancePercent: 2 });
        assert.equal(results[0].status, "MATCHED");
    });

    it("uses the larger of percentage tolerance or the $50 floor", () => {
        const withinFloor = runMatch(
            [{ ...baseInvoice, amount: 140 }],
            [basePo],
            [baseGr],
            { amountTolerancePercent: 2 }
        );
        const outsideFloor = runMatch(
            [{ ...baseInvoice, amount: 160 }],
            [basePo],
            [baseGr],
            { amountTolerancePercent: 2 }
        );
        const withinPercent = runMatch(
            [{ ...baseInvoice, amount: 10199 }],
            [{ ...basePo, amount: 10000 }],
            [baseGr],
            { amountTolerancePercent: 2 }
        );
        const outsidePercent = runMatch(
            [{ ...baseInvoice, amount: 10250 }],
            [{ ...basePo, amount: 10000 }],
            [baseGr],
            { amountTolerancePercent: 2 }
        );

        assert.equal(withinFloor[0].status, "MATCHED");
        assert.equal(outsideFloor[0].status, "AMOUNT_VARIANCE");
        assert.equal(withinPercent[0].status, "MATCHED");
        assert.equal(outsidePercent[0].status, "AMOUNT_VARIANCE");
    });

    it("treats zero tolerance as exact match within floating-point epsilon", () => {
        const exact = runMatch(
            [{ ...baseInvoice, amount: 100.001 }],
            [basePo],
            [baseGr],
            { amountTolerancePercent: 0 }
        );
        const outsideEpsilon = runMatch(
            [{ ...baseInvoice, amount: 101 }],
            [basePo],
            [baseGr],
            { amountTolerancePercent: 0 }
        );

        assert.equal(exact[0].status, "MATCHED");
        assert.equal(outsideEpsilon[0].status, "AMOUNT_VARIANCE");
    });

    it("matches line descriptions case-insensitively and ignores punctuation", () => {
        const invoice = { ...baseInvoice, lineDescription: "Office Chairs!" };
        const po = { ...basePo, lineDescription: "office, chairs" };
        const gr = { ...baseGr, lineDescription: "office chairs" };

        const results = runMatch([invoice], [po], [gr], { amountTolerancePercent: 2 });

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
