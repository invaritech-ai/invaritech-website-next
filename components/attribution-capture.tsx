"use client";

import { useEffect } from "react";
import { captureFirstLanding } from "@/lib/attribution";

export function AttributionCapture() {
    useEffect(() => {
        captureFirstLanding();
    }, []);

    return null;
}
