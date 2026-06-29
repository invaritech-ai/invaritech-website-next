import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const read = (path) => readFileSync(path, "utf8");

describe("component source guards", () => {
    it("cleans up PromoBar deferred show state on unmount", () => {
        const source = read("components/promo-bar.tsx");

        assert.match(source, /const\s+timeout\s*=\s*window\.setTimeout\(\(\)\s*=>\s*setVisible\(true\),\s*0\)/);
        assert.match(source, /return\s+\(\)\s*=>\s*\{[\s\S]*clearTimeout\(timeout\)[\s\S]*removeProperty\("--promo-bar-h"\)/);
    });

    it("ignores stale invoice file validation results", () => {
        const source = read("components/tools/InvoiceExtractor.tsx");

        assert.match(source, /selectionTokenRef\s*=\s*useRef\(0\)/);
        assert.match(source, /const\s+selectionToken\s*=\s*\+\+selectionTokenRef\.current/);
        assert.match(source, /if\s*\(selectionToken\s*!==\s*selectionTokenRef\.current\)\s*return/);
    });
});
