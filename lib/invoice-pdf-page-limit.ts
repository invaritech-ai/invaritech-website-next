export const SINGLE_PAGE_PDF_ERROR =
    "This free OCR tool supports one invoice page at a time. Please upload a single-page PDF or a JPG/PNG.";

const PDF_SIGNATURE_BYTES = [0x25, 0x50, 0x44, 0x46, 0x2d];
const PDF_SIGNATURE_SCAN_BYTES = 1024;

type PdfFileCandidate = Pick<File, "type" | "arrayBuffer"> & Partial<Pick<File, "slice">>;

export function hasPdfSignature(buffer: ArrayBuffer): boolean {
    const bytes = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, PDF_SIGNATURE_SCAN_BYTES));
    for (let i = 0; i <= bytes.length - PDF_SIGNATURE_BYTES.length; i += 1) {
        if (PDF_SIGNATURE_BYTES.every((byte, j) => bytes[i + j] === byte)) return true;
    }
    return false;
}

export async function validateSinglePagePdf(file: PdfFileCandidate): Promise<string | null> {
    let buffer: ArrayBuffer | null = null;
    if (file.type !== "application/pdf") {
        const header = file.slice
            ? await file.slice(0, PDF_SIGNATURE_SCAN_BYTES).arrayBuffer()
            : (buffer = await file.arrayBuffer());
        if (!hasPdfSignature(header)) return null;
    }

    buffer ??= await file.arrayBuffer();
    let pages = 0;
    try {
        pages = await countPdfPages(buffer);
    } catch {
        return null;
    }

    return pages > 1 ? SINGLE_PAGE_PDF_ERROR : null;
}

export async function countPdfPages(buffer: ArrayBuffer): Promise<number> {
    const { PDFDocument } = await import("pdf-lib");
    const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
    return pdf.getPageCount();
}
