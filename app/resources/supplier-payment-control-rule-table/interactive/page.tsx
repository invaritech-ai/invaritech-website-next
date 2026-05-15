import { Suspense } from "react";
import { Metadata } from "next";
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
      </div>
    </div>
  );
}
