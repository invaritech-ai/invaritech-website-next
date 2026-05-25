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
