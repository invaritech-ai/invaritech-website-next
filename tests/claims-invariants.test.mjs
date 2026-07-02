import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

import { CLAIMS_VERDICTS } from "../lib/claims/verdicts.ts";

function walkFiles(dir) {
    if (!existsSync(dir)) return [];
    return readdirSync(dir).flatMap((entry) => {
        const path = join(dir, entry);
        const stat = statSync(path);
        if (stat.isDirectory()) return walkFiles(path);
        return [path];
    });
}

const claimsSurfaceFiles = [
    ...walkFiles("lib/claims").filter((path) => /\.(ts|json)$/.test(path)),
    ...walkFiles("components/claims").filter((path) => /\.(ts|tsx)$/.test(path)),
    ...walkFiles("app/resources").filter(
        (path) =>
            /page\.tsx$/.test(path) &&
            /claim|deduction|difot|remittance|retailer|food-and-grocery-code/.test(path),
    ),
];

describe("Claims invariants", () => {
    it("keeps the exact verdict taxonomy", () => {
        assert.deepEqual(CLAIMS_VERDICTS, [
            "supportable",
            "missing proof",
            "worth challenging",
            "Code risk",
        ]);
    });

    it("keeps legacy Code-conditional wording out of Claims surfaces", () => {
        const offenders = claimsSurfaceFiles.filter((file) =>
            readFileSync(file, "utf8").includes("Code-conditional"),
        );
        assert.deepEqual(offenders, []);
    });

    it("does not hardcode the Claims Desk domain in page components", () => {
        const pageFiles = [...walkFiles("app/resources"), ...walkFiles("app/glossary")].filter(
            (path) => path.endsWith("page.tsx"),
        );
        const offenders = pageFiles.filter((file) =>
            readFileSync(file, "utf8").includes("claims-desk.invaritech.ai"),
        );
        assert.deepEqual(offenders, []);
    });
});
