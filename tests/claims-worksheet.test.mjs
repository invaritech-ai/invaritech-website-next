import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";

const matrix = JSON.parse(readFileSync("lib/claims/deduction-matrix.json", "utf8"));

function readWorksheetXml(entryName) {
    return execFileSync(
        "python3",
        [
            "-c",
            "import sys, zipfile; print(zipfile.ZipFile(sys.argv[1]).read(sys.argv[2]).decode('utf-8'))",
            "public/retailer-deduction-triage-worksheet.xlsx",
            entryName,
        ],
        { encoding: "utf8" },
    );
}

describe("Retailer Deduction Triage Worksheet", () => {
    it("has fresh-produce deadline rules for shortfall and damaged goods", () => {
        for (const id of ["shortfall", "damaged-goods"]) {
            const row = matrix.find((item) => item.id === id);
            assert.equal(row.deadlineRule.kind, "freshProduceClaimRaisedWithinDays");
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

    it("sets worksheet dimensions to the actual used range", () => {
        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });

        assert.match(readWorksheetXml("xl/worksheets/sheet2.xml"), /<dimension ref="A1:P41"\/>/);
        assert.match(
            readWorksheetXml("xl/worksheets/sheet3.xml"),
            new RegExp(`<dimension ref="A1:J${matrix.length + 1}"\\/>`),
        );
        assert.match(readWorksheetXml("xl/worksheets/sheet4.xml"), /<dimension ref="A1:B8"\/>/);
    });

    it("accepts deduction type labels and guards 30-day timing with fresh produce status", () => {
        execFileSync("python3", ["scripts/generate-claims-worksheet.py"], { stdio: "pipe" });

        const claimLedger = readWorksheetXml("xl/worksheets/sheet2.xml");
        assert.match(
            claimLedger,
            /IFERROR\(MATCH\(\$F2,'Deduction Type Matrix'!\$A\$2:\$A\$\d+,0\),MATCH\(\$F2,'Deduction Type Matrix'!\$B\$2:\$B\$\d+,0\)\)/,
        );
        assert.match(claimLedger, /OR\(UPPER\(\$E2\)="Y",UPPER\(\$E2\)="YES"\)/);
        assert.match(
            claimLedger,
            /If this line is fresh produce, check why the claim was raised more than 30 days after delivery\./,
        );
    });
});
