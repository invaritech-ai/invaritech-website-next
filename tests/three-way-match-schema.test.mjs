import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    buildBreadcrumbSchema,
    buildArticleSchema,
    buildFaqSchema,
} from "../lib/seo/three-way-match-schema.ts";

describe("buildBreadcrumbSchema", () => {
    it("emits an itemListElement with three positions", () => {
        const schema = buildBreadcrumbSchema();
        assert.equal(schema["@type"], "BreadcrumbList");
        assert.equal(schema.itemListElement.length, 3);
        assert.equal(schema.itemListElement[0].position, 1);
        assert.equal(schema.itemListElement[2].name, "Three-Way Match");
    });
});

describe("buildArticleSchema", () => {
    it("emits Article type with author sameAs LinkedIn + Scholar", () => {
        const schema = buildArticleSchema({ lastUpdated: "2026-05-25" });
        assert.equal(schema["@type"], "Article");
        assert.equal(schema.author.name, "Aditi Garg");
        assert.ok(schema.author.sameAs.some((u) => u.includes("linkedin.com")));
        assert.ok(schema.author.sameAs.some((u) => u.includes("scholar.google.com")));
        assert.equal(schema.articleSection, "Resources");
    });
});

describe("buildFaqSchema", () => {
    it("emits FAQPage with exactly 6 Question entries", () => {
        const schema = buildFaqSchema();
        assert.equal(schema["@type"], "FAQPage");
        assert.equal(schema.mainEntity.length, 6);
        for (const q of schema.mainEntity) {
            assert.equal(q["@type"], "Question");
            assert.equal(q.acceptedAnswer["@type"], "Answer");
            assert.ok(q.name.length > 0);
            assert.ok(q.acceptedAnswer.text.length > 0);
        }
    });
});
