import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { appendAuditCtaParams } from "../components/home/_shared/audit-cta-href.ts";

describe("appendAuditCtaParams", () => {
    it("returns the href unchanged when no params provided", () => {
        assert.equal(appendAuditCtaParams("/contact?audit=1", {}), "/contact?audit=1");
    });

    it("appends src when provided", () => {
        const result = appendAuditCtaParams("/contact?audit=1", { src: "cold-email" });
        assert.equal(result, "/contact?audit=1&src=cold-email");
    });

    it("appends campaign when provided", () => {
        const result = appendAuditCtaParams("/contact?audit=1", { campaign: "duplicate-invoice" });
        assert.equal(result, "/contact?audit=1&campaign=duplicate-invoice");
    });

    it("appends both src and campaign", () => {
        const result = appendAuditCtaParams("/contact?audit=1", { src: "cold-email", campaign: "x" });
        assert.ok(result.includes("audit=1"));
        assert.ok(result.includes("src=cold-email"));
        assert.ok(result.includes("campaign=x"));
    });

    it("ignores empty-string values", () => {
        assert.equal(appendAuditCtaParams("/contact?audit=1", { src: "" }), "/contact?audit=1");
    });

    it("ignores undefined values", () => {
        assert.equal(
            appendAuditCtaParams("/contact?audit=1", { src: undefined, campaign: undefined }),
            "/contact?audit=1"
        );
    });
});
