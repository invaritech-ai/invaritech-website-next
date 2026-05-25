import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    parseInvoiceRows,
    parsePoRows,
    parseGrRows,
} from "../components/glossary/three-way-matcher/csv-parser.ts";

describe("parseInvoiceRows", () => {
    it("parses CSV with header row", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,Acme,100,2,Office chair";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows.length, 1);
        assert.deepEqual(rows[0], {
            invoiceId: "INV-1",
            poNumber: "PO-1",
            vendor: "Acme",
            amount: 100,
            quantity: 2,
            lineDescription: "Office chair",
        });
    });

    it("parses tab-separated rows (Excel paste)", () => {
        const tsv = "PO Number\tVendor\tAmount\tQuantity\tLine Description\nPO-1\tAcme\t100\t2\tOffice chair";
        const rows = parseInvoiceRows(tsv);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].vendor, "Acme");
    });

    it("strips currency symbols from amount", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,Acme,\"$1,200.50\",2,x";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows[0].amount, 1200.5);
    });

    it("synthesizes incrementing invoice ids", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,A,1,1,x\nPO-2,B,2,1,y";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows[0].invoiceId, "INV-1");
        assert.equal(rows[1].invoiceId, "INV-2");
    });

    it("returns empty array for empty input", () => {
        assert.deepEqual(parseInvoiceRows(""), []);
        assert.deepEqual(parseInvoiceRows("   \n  "), []);
    });

    it("uses invoice id from the CSV when an Invoice column exists", () => {
        const csv = "Invoice,PO Number,Vendor,Amount,Quantity,Line Description\nINV-7,PO-1,Acme,100,2,x";
        const rows = parseInvoiceRows(csv);
        assert.equal(rows[0].invoiceId, "INV-7");
    });
});

describe("parsePoRows", () => {
    it("parses PO row shape", () => {
        const csv = "PO Number,Vendor,Amount,Quantity,Line Description\nPO-1,Acme,100,2,Office chair";
        const rows = parsePoRows(csv);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].poNumber, "PO-1");
    });
});

describe("parseGrRows", () => {
    it("parses GR row shape with Quantity Received column", () => {
        const csv = "PO Number,Vendor,Quantity Received,Line Description\nPO-1,Acme,2,Office chair";
        const rows = parseGrRows(csv);
        assert.equal(rows.length, 1);
        assert.equal(rows[0].quantityReceived, 2);
    });
});
