import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { extractAttributionFromFormData } from "../lib/attribution.ts";

describe("extractAttributionFromFormData", () => {
    it("ignores File values in attribution fields", () => {
        const fd = new FormData();
        fd.set("utm_source", new Blob(["file contents"]), "source.txt");
        fd.set("utm_medium", "email");

        const attribution = extractAttributionFromFormData(fd);

        assert.equal(attribution.utm_source, "");
        assert.equal(attribution.utm_medium, "email");
    });
});
