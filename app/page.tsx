import { Metadata } from "next";

import PaymentControlHome from "@/components/payment-control-home";

export const metadata: Metadata = {
    title: "Payment Control Design for Australian Finance Teams",
    description:
        "Founder-led payment control design for Australian finance teams that need fewer manual exceptions, cleaner approvals, and less dollar leakage without changing systems.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return <PaymentControlHome />;
}
