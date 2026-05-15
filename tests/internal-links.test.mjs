import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";

const sourceRoots = ["app", "components", "lib"];
const sourceExtensions = new Set([".ts", ".tsx"]);

function walkFiles(dir) {
    return readdirSync(dir).flatMap((entry) => {
        const path = join(dir, entry);
        const stat = statSync(path);
        if (stat.isDirectory()) return walkFiles(path);
        return [path];
    });
}

function extensionOf(path) {
    return path.slice(path.lastIndexOf("."));
}

function routeFromPage(path) {
    const route = relative("app", path)
        .replace(/\/page\.tsx$/, "")
        .replace(/^page\.tsx$/, "");

    if (!route) return "/";
    if (route.includes("[") || route.includes("api/")) return null;
    return `/${route ? `${route}/` : ""}`;
}

function stripHashAndQuery(url) {
    return url.split("#")[0].split("?")[0];
}

function isExternalOrNonPage(url) {
    return (
        url.startsWith("//") ||
        url.startsWith("/api/") ||
        url.startsWith("/_next/") ||
        /\.[a-z0-9]+$/i.test(stripHashAndQuery(url))
    );
}

function extractInternalLinks(path) {
    const source = readFileSync(path, "utf8");
    const links = [];
    const patterns = [
        /href=["'](\/[^"']*)["']/g,
        /\]\((\/[^)\s]+)\)/g,
    ];

    for (const pattern of patterns) {
        for (const match of source.matchAll(pattern)) {
            const raw = match[1];
            if (!isExternalOrNonPage(raw)) links.push(raw);
        }
    }

    return links;
}

const appRoutes = new Set(
    walkFiles("app")
        .filter((path) => path.endsWith("/page.tsx") || path === "app/page.tsx")
        .map(routeFromPage)
        .filter(Boolean)
);

for (const path of walkFiles("lib/blog-posts").filter((file) => file.endsWith(".ts"))) {
    const blogSource = readFileSync(path, "utf8");
    for (const slug of blogSource.matchAll(/slug:\s*"([^"]+)"/g)) {
        appRoutes.add(`/blog/${slug[1]}/`);
    }
}

const sourceFiles = sourceRoots
    .flatMap(walkFiles)
    .filter((path) => sourceExtensions.has(extensionOf(path)));

describe("internal page links", () => {
    it("point directly to existing local pages without redirect-only paths", () => {
        const failures = [];

        for (const file of sourceFiles) {
            for (const rawLink of extractInternalLinks(file)) {
                const target = stripHashAndQuery(rawLink);
                if (!appRoutes.has(target)) {
                    failures.push(`${file}: ${rawLink}`);
                }
            }
        }

        assert.deepEqual(failures, []);
    });
});
