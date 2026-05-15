import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const source = readFileSync("components/resource-download-form.tsx", "utf8");
const contactSource = readFileSync("components/contact.tsx", "utf8");
const pageSource = readFileSync(
    "app/resources/supplier-payment-control-rule-table/page.tsx",
    "utf8"
);
const apolloSource = readFileSync("lib/apollo-inbound.ts", "utf8");
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

    it("keeps Apollo-filled text fields uncontrolled so React does not overwrite enrichment", () => {
        assert.match(source, /name="email"[\s\S]*defaultValue=\{form\.email\}/);
        assert.match(source, /name="company"[\s\S]*defaultValue=\{form\.company\}/);
        assert.match(source, /name="job_title"[\s\S]*defaultValue=\{form\.role\}/);
        assert.doesNotMatch(source, /name="email"[\s\S]{0,300}value=\{form\.email\}/);
        assert.doesNotMatch(source, /name="company"[\s\S]{0,300}value=\{form\.company\}/);
        assert.doesNotMatch(source, /name="job_title"[\s\S]{0,300}value=\{form\.role\}/);
    });

    it("binds Apollo to the resource download form explicitly", () => {
        assert.match(pageSource, /formSelector:\s*"#resource-download-form"/);
    });

    it("uses Apollo's current init API before deprecated fallbacks", () => {
        const currentInitIndex = apolloSource.indexOf("typeof apollo.init==='function'");
        const deprecatedInitIndex = apolloSource.indexOf("typeof apollo.initFormEnrichment==='function'");

        assert.ok(currentInitIndex > -1);
        assert.ok(deprecatedInitIndex > -1);
        assert.ok(currentInitIndex < deprecatedInitIndex);
    });

    it("does not redirect fallback industries into an empty exact-match control filter", () => {
        assert.match(source, /"Other finance team"/);
        assert.doesNotMatch(controlRulesSource, /industries:\s*\[[^\]]*"Other finance team"/);
        assert.match(source, /controlRuleIndustrySet\.has\(form\.industry\)/);
    });
});

describe("Contact form Apollo field order", () => {
    it("renders email before full name so Apollo can enrich the remaining fields first", () => {
        const emailIndex = contactSource.indexOf('name="email"');
        const nameIndex = contactSource.indexOf('name="name"');

        assert.ok(emailIndex > -1);
        assert.ok(nameIndex > -1);
        assert.ok(emailIndex < nameIndex);
    });

    it("keeps contact fields uncontrolled so Apollo-filled values are not overwritten", () => {
        assert.match(contactSource, /name="email"[\s\S]*defaultValue=\{formData\.email\}/);
        assert.match(contactSource, /name="name"[\s\S]*defaultValue=\{formData\.name\}/);
        assert.doesNotMatch(contactSource, /name="email"[\s\S]{0,300}value=\{formData\.email\}/);
        assert.doesNotMatch(contactSource, /name="name"[\s\S]{0,300}value=\{formData\.name\}/);
    });
});
