import { Metadata } from "next";
import { ArrowRight, FileSpreadsheet, ListChecks, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ResourceDownloadForm from "@/components/resource-download-form";
import { BOOK_MEETING_URL } from "@/lib/marketing";

export const metadata: Metadata = {
    title: "Payment Control Resources",
    description:
        "Practical rule tables, checklists, and implementation guides for finance teams reducing invoice exceptions, approval gaps, and manual payment checks.",
    alternates: {
        canonical: "https://www.invaritech.ai/resources/",
    },
};

const resourceNotes = [
    {
        icon: ListChecks,
        title: "Ordered checks",
        body: "Rule logic for spotting exceptions before a payment is released.",
    },
    {
        icon: ShieldCheck,
        title: "Evidence standard",
        body: "What should be attached before an exception can be approved.",
    },
    {
        icon: FileSpreadsheet,
        title: "Queue design",
        body: "Owner, status, SLA, approval note, and audit trail fields.",
    },
];

export default function ResourcesPage() {
    return (
        <main className="min-h-screen bg-background pt-28 md:pt-36">
            <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
                <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                    <div>
                        <p className="mb-8 max-w-max border-y border-primary/30 py-2 text-[11px] font-mono uppercase tracking-[0.24em] text-primary">
                            Free resources
                        </p>
                        <h1 className="font-editorial text-6xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
                            Practical payment-control resources for finance teams.
                        </h1>
                    </div>
                    <p className="max-w-2xl text-xl leading-relaxed text-foreground-muted">
                        Actionable rule tables, checklists, and implementation guides for teams dealing with invoice exceptions, approval gaps, and manual payment checks.
                    </p>
                </div>
            </section>

            <section className="border-y border-border bg-card py-16 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <div className="mb-8 inline-flex items-center gap-3 border border-primary/30 bg-primary/[0.05] px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                            <FileSpreadsheet className="size-4" />
                            First asset
                        </div>
                        <h2 className="font-editorial text-4xl font-semibold leading-tight md:text-6xl">
                            Supplier Payment Control Rule Table
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                            A zero-fluff workbook for mapping payment-change checks, exception routing, approval evidence, and audit notes before a payment is ever released.
                        </p>
                        <div className="mt-10 grid gap-[1px] bg-border sm:grid-cols-3">
                            {resourceNotes.map((note) => (
                                <div key={note.title} className="bg-background p-5">
                                    <note.icon className="mb-5 size-5 text-primary" />
                                    <h3 className="text-base font-semibold">{note.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm leading-relaxed text-foreground-subtle">
                            Most resources will stay open. The workbook request asks for a few fields because the same control pattern changes by industry and exception type.
                        </p>
                    </div>

                    <ResourceDownloadForm />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="font-editorial text-3xl font-semibold md:text-5xl">Have a live exception problem?</h2>
                        <p className="mt-3 text-muted-foreground">
                            Bring one real example to a scoping call and we will tell you whether it is a fit for a fixed-scope control sprint.
                        </p>
                    </div>
                    <Link
                        href={BOOK_MEETING_URL}
                        target="_blank"
                        className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                        Book a Scoping Call <ArrowRight className="ml-2 size-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
