export type JobStatus = "queued" | "processing" | "completed" | "failed" | "expired";

export interface Job {
    job_id: string;
    status: JobStatus;
    progress?: number; // 0–100
    step?: string;     // e.g. "extracting_pdf_text", "parsing_structured_data"
    page_count?: number;
    pages_processed?: number;
    error?: { code: string; message: string; details: Record<string, unknown> };
}

export interface InvoiceLineItem {
    name: string;
    description: string | null;
    qty: number | null;
    unit: string | null;
    unit_price: number | null;
    line_total: number | null;
    tax_rate: number | null;
}

export interface InvoiceData {
    document_kind: "invoice" | "receipt" | "unknown";
    document_number: string | null;
    document_date: string | null;
    supplier_name: string | null;
    currency: string | null;
    subtotal: number | null;
    tax: number | null;
    tip: number | null;
    total: number | null;
    payment_method: string | null;
    line_items: InvoiceLineItem[];
}
