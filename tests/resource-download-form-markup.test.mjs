import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const contactSource = readFileSync("components/contact.tsx", "utf8");
const pageSource = readFileSync(
    "app/resources/supplier-payment-control-rule-table/page.tsx",
    "utf8"
);
const apolloSource = readFileSync("lib/apollo-inbound.ts", "utf8");

describe("Rule table resource page", () => {
    it("does not bind the open rule-table page to a resource request form", () => {
        assert.doesNotMatch(pageSource, /formSelector:\s*"#resource-download-form"/);
        assert.doesNotMatch(pageSource, /resource-download-form/);
    });

    it("uses Apollo's current init API before deprecated fallbacks", () => {
        const currentInitIndex = apolloSource.indexOf("typeof apollo.init==='function'");
        const deprecatedInitIndex = apolloSource.indexOf("typeof apollo.initFormEnrichment==='function'");

        assert.ok(currentInitIndex > -1);
        assert.ok(deprecatedInitIndex > -1);
        assert.ok(currentInitIndex < deprecatedInitIndex);
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
