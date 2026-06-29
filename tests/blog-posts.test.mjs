import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

describe("formatBlogDate", () => {
    it("formats dates in UTC", () => {
        const source = readFileSync("lib/blog-posts.ts", "utf8");

        assert.match(source, /toLocaleDateString\("en-US",\s*\{[\s\S]*timeZone:\s*"UTC"/);
    });
});
