import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";

const matrix = JSON.parse(readFileSync("lib/claims/deduction-matrix.json", "utf8"));

describe("Retailer Deduction Triage Worksheet", () => {
    it("has deadline rules for shortfall and damaged goods", () => {
        for (const id of ["shortfall", "damaged-goods"]) {
            const row = matrix.find((item) => item.id === id);
            assert.equal(row.deadlineRule.kind, "claimRaisedWithinDays");
            assert.equal(row.deadlineRule.days, 30);
        }
    });

    it("generates a valid XLSX package from the matrix", () => {
        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });
        assert.ok(existsSync("public/retailer-deduction-triage-worksheet.xlsx"));

        const listing = execFileSync(
            "python3",
            ["-m", "zipfile", "-l", "public/retailer-deduction-triage-worksheet.xlsx"],
            { encoding: "utf8" },
        );

        for (const expected of [
            "[Content_Types].xml",
            "xl/workbook.xml",
            "xl/worksheets/sheet1.xml",
            "xl/worksheets/sheet2.xml",
            "xl/worksheets/sheet3.xml",
            "xl/worksheets/sheet4.xml",
        ]) {
            assert.ok(listing.includes(expected), `${expected} should be present`);
        }
    });

    it("generates byte-identical XLSX output across runs", () => {
        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });
        const first = readFileSync("public/retailer-deduction-triage-worksheet.xlsx");

        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });
        const second = readFileSync("public/retailer-deduction-triage-worksheet.xlsx");

        assert.deepEqual(first, second);
    });
});
