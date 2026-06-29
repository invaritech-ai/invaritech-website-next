import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    countPdfPages,
    validateSinglePagePdf,
} from "../lib/invoice-pdf-page-limit.ts";

function pdfBuffer(text) {
    return new TextEncoder().encode(text).buffer;
}

describe("countPdfPages", () => {
    it("counts page objects without counting the pages tree", () => {
        const pdf = `
            1 0 obj << /Type /Pages /Count 2 /Kids [2 0 R 3 0 R] >> endobj
            2 0 obj << /Type /Page /Parent 1 0 R >> endobj
            3 0 obj << /Type /Page /Parent 1 0 R >> endobj
        `;

        assert.equal(countPdfPages(pdfBuffer(pdf)), 2);
    });
});

describe("validateSinglePagePdf", () => {
    it("rejects multi-page PDFs", async () => {
        const file = {
            type: "application/pdf",
            arrayBuffer: async () => pdfBuffer("/Type /Page\n/Type /Page"),
        };

        assert.equal(
            await validateSinglePagePdf(file),
            "This free OCR tool supports one invoice page at a time. Please upload a single-page PDF or a JPG/PNG.",
        );
    });

    it("allows images", async () => {
        const file = {
            type: "image/jpeg",
            arrayBuffer: async () => {
                throw new Error("should not read image bytes");
            },
        };

        assert.equal(await validateSinglePagePdf(file), null);
    });
});
