"use client";

import { Download } from "lucide-react";
import Link from "next/link";

import { trackSiteEvent } from "@/lib/analytics/site-events";

export function WorksheetDownloadLink() {
    return (
        <Link
            href="/retailer-deduction-triage-worksheet.xlsx"
            className="site-button-secondary gap-2"
            onClick={() => {
                trackSiteEvent("claims_worksheet_download", {
                    medium: "remittance-advice",
                    content: "remittance-worksheet",
                });
            }}
        >
            Download the worksheet
            <Download className="size-4" aria-hidden="true" />
        </Link>
    );
}
