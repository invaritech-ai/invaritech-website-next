import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
    compressImageForUpload,
    shouldCompressImage,
} from "../components/tools/image-upload-compression.ts";

function makeFile({ name = "invoice.jpg", type = "image/jpeg", size = 5_000_000 } = {}) {
    return {
        name,
        type,
        size,
    };
}

function makeEnvironment({
    width,
    height,
    outputSize,
    outputType = "image/jpeg",
} = {}) {
    const calls = {
        createImageBitmap: [],
        canvas: [],
        toBlob: [],
    };

    return {
        calls,
        createImageBitmap: async (file) => {
            calls.createImageBitmap.push(file);
            return { width, height, close() {} };
        },
        createCanvas: () => {
            const canvas = {
                width: 0,
                height: 0,
                getContext: () => ({
                    drawImage: (...args) => {
                        calls.canvas.push({ width: canvas.width, height: canvas.height, args });
                    },
                }),
                toBlob: (callback, type, quality) => {
                    calls.toBlob.push({ type, quality });
                    callback({
                        type: outputType,
                        size: outputSize,
                    });
                },
            };
            return canvas;
        },
        createFile: (parts, name, options) => ({
            name,
            type: options.type,
            size: parts[0].size,
            lastModified: options.lastModified,
        }),
        now: () => 12345,
    };
}

describe("shouldCompressImage", () => {
    it("skips PDFs", () => {
        assert.equal(shouldCompressImage(makeFile({ type: "application/pdf" })), false);
    });

    it("compresses JPEG and PNG uploads", () => {
        assert.equal(shouldCompressImage(makeFile({ type: "image/jpeg" })), true);
        assert.equal(shouldCompressImage(makeFile({ type: "image/png" })), true);
    });
});

describe("compressImageForUpload", () => {
    it("returns PDFs unchanged", async () => {
        const file = makeFile({ name: "invoice.pdf", type: "application/pdf", size: 8_000_000 });
        const result = await compressImageForUpload(file);

        assert.equal(result, file);
    });

    it("returns image files unchanged when they are already within the long-edge limit", async () => {
        const file = makeFile({ size: 900_000 });
        const env = makeEnvironment({ width: 1600, height: 1200, outputSize: 700_000 });

        const result = await compressImageForUpload(file, undefined, env);

        assert.equal(result, file);
        assert.equal(env.calls.toBlob.length, 0);
    });

    it("scales oversized images to 2200px long edge and encodes JPEG at 0.82 quality", async () => {
        const file = makeFile({ name: "receipt.png", type: "image/png", size: 9_000_000 });
        const env = makeEnvironment({ width: 4000, height: 3000, outputSize: 2_000_000 });

        const result = await compressImageForUpload(file, undefined, env);

        assert.equal(result.name, "receipt.jpg");
        assert.equal(result.type, "image/jpeg");
        assert.equal(result.size, 2_000_000);
        assert.equal(result.lastModified, 12345);
        assert.equal(env.calls.canvas[0].width, 2200);
        assert.equal(env.calls.canvas[0].height, 1650);
        assert.deepEqual(env.calls.canvas[0].args.slice(1), [0, 0, 2200, 1650]);
        assert.deepEqual(env.calls.toBlob[0], {
            type: "image/jpeg",
            quality: 0.82,
        });
    });

    it("keeps the original file when compression does not reduce size", async () => {
        const file = makeFile({ size: 1_500_000 });
        const env = makeEnvironment({ width: 4200, height: 2400, outputSize: 1_700_000 });

        const result = await compressImageForUpload(file, undefined, env);

        assert.equal(result, file);
    });
});
