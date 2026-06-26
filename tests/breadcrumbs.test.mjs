import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createBreadcrumbItems } from "../lib/breadcrumbs.ts";

describe("createBreadcrumbItems", () => {
    it("marks only the final breadcrumb item as the current page", () => {
        const items = createBreadcrumbItems([
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources/" },
            { label: "Supplier Payment Control Rule Table" },
        ]);

        assert.deepEqual(items, [
            { label: "Home", href: "/", current: false },
            { label: "Resources", href: "/resources/", current: false },
            { label: "Supplier Payment Control Rule Table", current: true },
        ]);
    });
});
