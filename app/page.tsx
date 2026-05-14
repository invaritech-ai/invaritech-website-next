import { Metadata } from "next";

import PaymentControlHome from "@/components/payment-control-home";

export const metadata: Metadata = {
    title: "Payment Control Design for Australian Finance Teams",
    description:
        "Founder-led payment control design for Australian finance teams reducing invoice exceptions, approval gaps, and payment leakage without changing systems.",
    alternates: {
        canonical: "https://www.invaritech.ai/",
    },
};

export default function Home() {
    return <PaymentControlHome />;
}
