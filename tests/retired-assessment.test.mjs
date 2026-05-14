import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const retiredFeatureDirectories = [
    "app/api/assessment",
    "api-server/app/api/assessment",
    "components/assessment",
];

const retiredFeatureFiles = [
    "components/assessment-banner.tsx",
    "components/services/AssessmentTeaser.tsx",
    "api-server/lib/assessment-calculator.ts",
    "lib/assessment-calculator.ts",
];

const activeSourceFiles = [
    "app",
    "api-server/app",
    "api-server/lib",
    "components",
    "lib/blog-posts",
].flatMap((root) => {
    if (!existsSync(join(process.cwd(), root))) {
        return [];
    }

    return execFileSync("find", [root, "-type", "f"], { encoding: "utf8" })
        .trim()
        .split("\n")
        .filter(Boolean)
        .filter((file) => /\.(tsx?|mjs)$/.test(file))
        .filter((file) => !file.startsWith("components/assessment/"))
        .filter((file) => file !== "components/assessment-banner.tsx")
        .filter((file) => file !== "components/services/AssessmentTeaser.tsx")
        .filter((file) => file !== "lib/assessment-calculator.ts");
});

describe("retired assessment feature", () => {
    it("has no runnable assessment feature files", () => {
        for (const relativePath of retiredFeatureDirectories) {
            if (!existsSync(join(process.cwd(), relativePath))) {
                continue;
            }

            const files = execFileSync("find", [relativePath, "-type", "f"], {
                encoding: "utf8",
            }).trim();

            assert.equal(files, "", `${relativePath} should not contain files`);
        }

        for (const relativePath of retiredFeatureFiles) {
            assert.equal(
                existsSync(join(process.cwd(), relativePath)),
                false,
                `${relativePath} should be removed`,
            );
        }
    });

    it("does not link active app or blog content to retired assessment URLs", () => {
        const retiredUrlPattern = /\/(?:tools\/)?assessment\/?/;

        for (const file of activeSourceFiles) {
            const source = readFileSync(file, "utf8");
            assert.equal(
                retiredUrlPattern.test(source),
                false,
                `${file} should not reference retired assessment URLs`,
            );
        }
    });
});
