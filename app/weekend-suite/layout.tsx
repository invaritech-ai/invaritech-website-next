import { Metadata } from "next";

export const metadata: Metadata = {
    title: "WeekendSuite - Admin Suite for Freelancers",
    description:
        "WeekendSuite turns every new inquiry into a same-day proposal, signed contract, and first invoice. A simple admin suite for freelancers and tiny agencies.",
    openGraph: {
        title: "WeekendSuite - Admin Suite for Freelancers",
        description:
            "WeekendSuite turns every new inquiry into a same-day proposal, signed contract, and first invoice. Join the waitlist.",
        url: "https://invaritech.ai/weekend-suite",
    },
    alternates: {
        canonical: "https://invaritech.ai/weekend-suite",
    },
};

export default function WeekendSuiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
