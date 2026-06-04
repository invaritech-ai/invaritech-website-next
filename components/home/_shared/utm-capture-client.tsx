"use client";

import { useUtmCapture } from "@/lib/utm-capture";

export function UtmCaptureClient() {
    useUtmCapture();
    return null;
}
