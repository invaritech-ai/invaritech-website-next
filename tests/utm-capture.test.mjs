import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseUtmParams } from "../lib/utm-params.ts";

describe("parseUtmParams", () => {
    it("returns empty object when no params present", () => {
        assert.deepEqual(parseUtmParams("/finance-operations-automation"), {});
    });

    it("extracts src param", () => {
        assert.deepEqual(
            parseUtmParams("/finance-operations-automation?src=cold-email"),
            { src: "cold-email" }
        );
    });

    it("extracts campaign param", () => {
        assert.deepEqual(
            parseUtmParams("/finance-operations-automation?campaign=q4"),
            { campaign: "q4" }
        );
    });

    it("extracts both src and campaign", () => {
        assert.deepEqual(
            parseUtmParams("/p?src=cold-email&campaign=duplicate-invoice"),
            { src: "cold-email", campaign: "duplicate-invoice" }
        );
    });

    it("ignores other query params", () => {
        const result = parseUtmParams("/p?src=x&campaign=y&utm_term=foo&audit=1");
        assert.equal(result.src, "x");
        assert.equal(result.campaign, "y");
        assert.equal(Object.keys(result).length, 2);
    });

    it("treats empty string values as absent", () => {
        assert.deepEqual(parseUtmParams("/p?src=&campaign="), {});
    });
});
