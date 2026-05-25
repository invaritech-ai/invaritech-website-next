export type InvoiceRow = {
    poNumber: string;
    vendor: string;
    amount: number;
    quantity: number;
    lineDescription: string;
    invoiceId: string; // synthetic, "INV-{row}" if not in input
};

export type PoRow = {
    poNumber: string;
    vendor: string;
    amount: number;
    quantity: number;
    lineDescription: string;
};

export type GrRow = {
    poNumber: string;
    vendor: string;
    quantityReceived: number;
    lineDescription: string;
};

export type MatchStatus =
    | "MATCHED"
    | "AMOUNT_VARIANCE"
    | "QUANTITY_VARIANCE"
    | "MISSING_PO"
    | "MISSING_GR"
    | "VENDOR_MISMATCH"
    | "LINE_DESC_MISMATCH"
    | "DUPLICATE_INVOICE";

export type MatchResult = {
    invoiceId: string;
    poNumber: string;
    matchedPo?: PoRow;
    matchedGr?: GrRow;
    status: MatchStatus;
    reason: string;
};

export type MatchOptions = {
    amountTolerancePercent: number; // 0..100
};
