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
];

const bannedTermsDeclarationPattern =
    /export const bannedTerms = \[(?<items>[\s\S]*?)\]\s+satisfies string\[\];/;

const getBannedTerms = () => {
    const brand = read("lib/site-content/brand.ts");
    const match = brand.match(bannedTermsDeclarationPattern);
    assert.ok(match?.groups?.items, "brand.ts should export bannedTerms");
    assert.doesNotMatch(match[0], /\.join\s*\(/, "bannedTerms should use plain literal strings");

    const terms = [...match.groups.items.matchAll(/"([^"]+)"/g)].map(([, term]) => term);
    assert.ok(terms.length > 0, "bannedTerms should include plain literal strings");

    return terms;
};

const stripBannedTermsDeclaration = (file, source) => {
    if (file !== "lib/site-content/brand.ts") {
        return source;
    }

    const stripped = source.replace(bannedTermsDeclarationPattern, "");
    assert.notEqual(stripped, source, "brand.ts should contain a bannedTerms declaration");
    return stripped;
};

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
        assert.match(pages, /canonical:\s*"\/finance-exception-automation\/"/);
        assert.doesNotMatch(pages, /canonical:\s*"https:\/\/www\.invaritech\.ai/);
    });

    it("keeps banned legacy positioning out of strategic content", () => {
        const combined = contentFiles
            .map((file) => stripBannedTermsDeclaration(file, read(file)))
            .join("\n");

        for (const banned of getBannedTerms()) {
            assert.doesNotMatch(combined, new RegExp(escapeRegExp(banned), "i"), banned);
        }
    });

    it("keeps the approved diagnostic CTA centralized", () => {
        const brand = read("lib/site-content/brand.ts");
        assert.match(brand, /Book Workflow Diagnostic/);
        assert.match(brand, /\/contact\/\?diagnostic=1/);
    });
});
