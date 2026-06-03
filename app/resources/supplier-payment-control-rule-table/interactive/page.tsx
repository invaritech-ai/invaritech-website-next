import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SupplierPaymentControlTool } from "@/components/supplier-payment-control-tool";

export const metadata: Metadata = {
  title: "Supplier Payment Control Rule Table | Invaritech",
  description:
    "Interactive control rule table for supplier payment exceptions. Filter by industry, exception type, and priority to find the controls relevant to your workflow.",
  robots: { index: false, follow: true },
};

export default function InteractiveControlTablePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-16">
        <Suspense fallback={<div>Loading...</div>}>
          <SupplierPaymentControlTool />
        </Suspense>
        <div className="mt-10 border border-border bg-card p-6">
          <p className="site-meta text-primary">Finance automation context</p>
          <p className="site-body mt-3 max-w-3xl">
            This rule table covers one part of the accounts payable automation
            control layer. Use the{" "}
            <Link href="/finance-automation/" className="text-primary underline-offset-4 hover:underline">
              finance automation
            </Link>{" "}
            pillar page to connect supplier checks with invoice intake,
            approval evidence, exception routing, and payment release.
          </p>
        </div>
      </div>
    </div>
  );
}
