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
