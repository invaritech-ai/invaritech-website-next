import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const source = readFileSync("components/resource-download-form.tsx", "utf8");
const pageSource = readFileSync(
    "app/resources/supplier-payment-control-rule-table/page.tsx",
    "utf8"
);
const controlRulesSource = readFileSync("lib/supplier-control-rules.ts", "utf8");

describe("ResourceDownloadForm Apollo field mapping", () => {
    it("exposes stable field identifiers for Apollo form enrichment", () => {
        for (const fieldName of ["email", "company", "job_title", "industry"]) {
            assert.match(source, new RegExp(`name="${fieldName}"`));
        }
    });

    it("submits DOM form values so Apollo-filled fields are included", () => {
        assert.match(source, /new FormData\(event\.currentTarget\)/);
    });

    it("binds Apollo to the resource download form explicitly", () => {
        assert.match(pageSource, /formSelector:\s*"#resource-download-form"/);
    });

    it("does not redirect fallback industries into an empty exact-match control filter", () => {
        assert.match(source, /"Other finance team"/);
        assert.doesNotMatch(controlRulesSource, /industries:\s*\[[^\]]*"Other finance team"/);
        assert.match(source, /controlRuleIndustrySet\.has\(form\.industry\)/);
    });
});
