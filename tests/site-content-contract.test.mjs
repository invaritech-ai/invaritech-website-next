import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");

const contentFiles = [
    "lib/site-content/types.ts",
    "lib/site-content/brand.ts",
    "lib/site-content/navigation.ts",
    "lib/site-content/pages.ts",
    "lib/site-content/offers.ts",
    "lib/site-content/proof.ts",
    "lib/site-content/tools.ts",
    "lib/site-content/home.ts",
    "lib/site-content/regops.ts",
];

const bannedTerms = [
    "AI transformation",
    "automate anything",
    "future of automation",
    "generic custom software",
    "world-class",
    "cutting-edge",
    "Australia-first",
    "Australian finance teams",
    "control layer",
    "governed workflow",
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("site content registry", () => {
    it("defines the required content modules", () => {
        for (const file of contentFiles) {
            const source = read(file);
            assert.ok(source.length > 200, `${file} should contain real content`);
        }
    });

    it("uses stable ids for offers, proof assets, and tool cards", () => {
        for (const file of [
            "lib/site-content/offers.ts",
            "lib/site-content/proof.ts",
            "lib/site-content/tools.ts",
        ]) {
            const source = read(file);
            assert.match(source, /id:\s*"[a-z0-9-]+"/, `${file} should contain stable ids`);
            assert.match(source, /satisfies\s+/, `${file} should use satisfies for typed content`);
        }
    });

    it("centralizes canonical base URL and uses canonical paths", () => {
        const brand = read("lib/site-content/brand.ts");
        assert.match(brand, /siteUrl:\s*"https:\/\/www\.invaritech\.ai"/);

        const pages = read("lib/site-content/pages.ts");
        assert.match(pages, /canonical:\s*"\/finance-operations-automation\/"/);
        assert.match(pages, /canonical:\s*"\/regulatory-operations-automation\/"/);
        assert.doesNotMatch(pages, /canonical:\s*"https:\/\/www\.invaritech\.ai/);
    });

    it("keeps banned legacy positioning out of strategic content", () => {
        const combined = contentFiles
            .map((file) => read(file))
            .join("\n");

        for (const banned of bannedTerms) {
            assert.doesNotMatch(combined, new RegExp(escapeRegExp(banned), "i"), banned);
        }
    });

    it("keeps the approved diagnostic CTA centralized", () => {
        const brand = read("lib/site-content/brand.ts");
        assert.match(brand, /Share a Workflow/);
        assert.match(brand, /\/contact\/\?diagnostic=1/);
    });
});
