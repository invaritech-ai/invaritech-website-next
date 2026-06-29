import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PDFDocument } from "pdf-lib";

import {
    countPdfPages,
    SINGLE_PAGE_PDF_ERROR,
    validateSinglePagePdf,
} from "../lib/invoice-pdf-page-limit.ts";

async function generatedPdfBuffer(pageCount, useObjectStreams = true) {
    const pdf = await PDFDocument.create();
    for (let i = 0; i < pageCount; i += 1) {
        pdf.addPage([100, 100]);
    }
    const bytes = await pdf.save({ useObjectStreams });
    return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

describe("countPdfPages", () => {
    it("counts generated PDF pages", async () => {
        assert.equal(await countPdfPages(await generatedPdfBuffer(2, false)), 2);
    });

    it("counts PDFs that store page objects in object streams", async () => {
        assert.equal(await countPdfPages(await generatedPdfBuffer(2)), 2);
    });
});

describe("validateSinglePagePdf", () => {
    it("rejects multi-page PDFs", async () => {
        const file = {
            type: "application/pdf",
            arrayBuffer: async () => generatedPdfBuffer(2),
        };

        assert.equal(
            await validateSinglePagePdf(file),
            SINGLE_PAGE_PDF_ERROR,
        );
    });

    it("rejects mislabeled multi-page PDFs", async () => {
        const buffer = await generatedPdfBuffer(2);
        const file = {
            type: "image/jpeg",
            arrayBuffer: async () => buffer,
            slice: (start, end) => ({
                arrayBuffer: async () => buffer.slice(start, end),
            }),
        };

        assert.equal(
            await validateSinglePagePdf(file),
            SINGLE_PAGE_PDF_ERROR,
        );
    });

    it("allows images", async () => {
        const buffer = new Uint8Array([0xff, 0xd8, 0xff]).buffer;
        const file = {
            type: "image/jpeg",
            arrayBuffer: async () => buffer,
            slice: (start, end) => ({
                arrayBuffer: async () => buffer.slice(start, end),
            }),
        };

        assert.equal(await validateSinglePagePdf(file), null);
    });
});
