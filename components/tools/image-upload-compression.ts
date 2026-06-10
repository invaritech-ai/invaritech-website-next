const DEFAULT_MAX_LONG_EDGE = 2200;
const DEFAULT_JPEG_QUALITY = 0.82;
const DEFAULT_MIN_COMPRESS_SIZE = 1024 * 1024;
const OUTPUT_MIME_TYPE = "image/jpeg";

const COMPRESSIBLE_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);

type UploadFile = Pick<File, "name" | "type" | "size">;

type ImageLike = {
    width: number;
    height: number;
    close?: () => void;
};

type CanvasLike = {
    width: number;
    height: number;
    getContext: (contextId: "2d") => CanvasRenderingContext2D | null;
    toBlob: (
        callback: (blob: Blob | null) => void,
        type?: string,
        quality?: number,
    ) => void;
};

type CompressionEnvironment = {
    createImageBitmap?: (file: File) => Promise<ImageLike>;
    createCanvas?: () => CanvasLike;
    createFile?: (parts: BlobPart[], name: string, options: FilePropertyBag) => File;
    now?: () => number;
};

type CompressionOptions = {
    maxLongEdge?: number;
    quality?: number;
    minCompressSize?: number;
};

export function shouldCompressImage(file: UploadFile): boolean {
    return COMPRESSIBLE_IMAGE_TYPES.has(file.type);
}

function defaultEnvironment(): Required<CompressionEnvironment> {
    return {
        createImageBitmap: (file) => window.createImageBitmap(file),
        createCanvas: () => document.createElement("canvas"),
        createFile: (parts, name, options) => new File(parts, name, options),
        now: () => Date.now(),
    };
}

function getOutputName(name: string): string {
    const withoutExtension = name.replace(/\.[^.]+$/, "");
    return `${withoutExtension || "invoice"}.jpg`;
}

function getScaledSize(width: number, height: number, maxLongEdge: number) {
    const longEdge = Math.max(width, height);
    if (longEdge <= maxLongEdge) {
        return { width, height, scale: 1 };
    }

    const scale = maxLongEdge / longEdge;
    return {
        width: Math.round(width * scale),
        height: Math.round(height * scale),
        scale,
    };
}

function canvasToBlob(canvas: CanvasLike, type: string, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Unable to compress image."));
                return;
            }
            resolve(blob);
        }, type, quality);
    });
}

export async function compressImageForUpload(
    file: File,
    options: CompressionOptions = {},
    environment?: CompressionEnvironment,
): Promise<File> {
    if (!shouldCompressImage(file)) {
        return file;
    }

    const maxLongEdge = options.maxLongEdge ?? DEFAULT_MAX_LONG_EDGE;
    const quality = options.quality ?? DEFAULT_JPEG_QUALITY;
    const minCompressSize = options.minCompressSize ?? DEFAULT_MIN_COMPRESS_SIZE;
    const env = { ...defaultEnvironment(), ...environment };

    let image: ImageLike | null = null;

    try {
        image = await env.createImageBitmap(file);
        const scaled = getScaledSize(image.width, image.height, maxLongEdge);

        if (scaled.scale === 1 && file.size < minCompressSize) {
            return file;
        }

        const canvas = env.createCanvas();
        canvas.width = scaled.width;
        canvas.height = scaled.height;

        const context = canvas.getContext("2d");
        if (!context) {
            return file;
        }

        context.drawImage(image as CanvasImageSource, 0, 0, scaled.width, scaled.height);

        const blob = await canvasToBlob(canvas, OUTPUT_MIME_TYPE, quality);
        if (blob.size >= file.size) {
            return file;
        }

        return env.createFile([blob], getOutputName(file.name), {
            type: OUTPUT_MIME_TYPE,
            lastModified: env.now(),
        });
    } catch {
        return file;
    } finally {
        image?.close?.();
    }
}
