const PDF_PAGE_OBJECT_PATTERN = /\/Type\s*\/Page(?!s)\b/g;
export const SINGLE_PAGE_PDF_ERROR =
    "This free OCR tool supports one invoice page at a time. Please upload a single-page PDF or a JPG/PNG.";

type PdfFileCandidate = Pick<File, "type" | "arrayBuffer">;

export function countPdfPages(buffer: ArrayBuffer): number {
    const text = new TextDecoder("latin1").decode(buffer);
    return text.match(PDF_PAGE_OBJECT_PATTERN)?.length ?? 0;
}

export async function validateSinglePagePdf(file: PdfFileCandidate): Promise<string | null> {
    if (file.type !== "application/pdf") {
        return null;
    }

    const pages = countPdfPages(await file.arrayBuffer());
    return pages > 1 ? SINGLE_PAGE_PDF_ERROR : null;
}
