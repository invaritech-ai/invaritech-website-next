"use client";

import { motion } from "motion/react";

import { fadeUp } from "./_motion";

type Variant = "broad" | "finance";

type Props = { variant: Variant };

const METHOD_BROAD = [
    { title: "Find the leakage", body: "Audit current workflow, documents, exports, approvals, and manual checks.", output: "Workflow map · exception risk list" },
    { title: "Encode the rules", body: "Convert business logic into deterministic checks, AI-assisted matching, and exception rules.", output: "Rule library · acceptance criteria" },
    { title: "Automate the checks", body: "Build the workflow layer that reviews documents and data before humans waste time.", output: "Working automation · alerts" },
    { title: "Monitor the workflow", body: "Surface only the cases that need human judgment. Everything else is logged and dismissed.", output: "Review dashboard · digest" },
    { title: "Improve over time", body: "Use real usage data to make the process faster, safer, and less dependent on headcount.", output: "Rule updates · monthly delta" },
];

const METHOD_FINANCE = [
    { title: "Audit the workflow", body: "We map the current process, data sources, approval steps, and exception checks.", output: "Workflow map · exception inventory" },
    { title: "Identify the highest-value exception", body: "We find the manual check most likely to reduce risk, save time, or avoid extra headcount.", output: "Ranked exception list · ROI estimate" },
    { title: "Build the first system", body: "We create a focused automation layer around your existing accounting tools, documents, and approval process.", output: "Working system · acceptance criteria" },
    { title: "Route exceptions for review", body: "Your team stops checking everything manually and reviews the cases that actually need attention.", output: "Review queue · evidence links" },
    { title: "Improve over time", body: "We refine rules, thresholds, matching logic, and workflows as real exceptions appear.", output: "Tuned rules · monthly delta" },
];

const COPY: Record<Variant, {
    title: string;
    meta: string;
    method: typeof METHOD_BROAD;
    railBody: React.ReactNode;
}> = {
    broad: {
        title: "How builds work",
        meta: "Find · Encode · Automate · Monitor · Improve",
        method: METHOD_BROAD,
        railBody: (
            <>
                Every build starts with a fixed scope, clear inputs, and
                written acceptance criteria. No open-ended discovery. No
                vague AI promises. Each handover includes working
                automation, monitoring, and a deferred period to tune the
                system against your first 30 days of real exception traffic.
            </>
        ),
    },
    finance: {
        title: "Start with one workflow. Prove value. Then expand.",
        meta: "Audit · Identify · Build · Route · Improve",
        method: METHOD_FINANCE,
        railBody: (
            <>
                Each engagement is a fixed-scope build with a written workflow map and
                acceptance criteria. We sit on top of your accounting system. You keep
                your AP team and your reviewers. The system runs against your first
                30 days of real exceptions before we step back.
            </>
        ),
    },
};

export function ServiceMethod({ variant }: Props) {
    const c = COPY[variant];
    return (
        <section id="how" className="doc-section border-t border-border bg-card/40">
            <div className="doc-container">
                <motion.header {...fadeUp} className="section-mark">
                    <h2 className="section-mark-title">{c.title}</h2>
                    <span className="section-mark-meta">{c.meta}</span>
                </motion.header>

                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.aside {...fadeUp} className="marginalia-rail">
                        <span className="marginalia-rail-key">Service method</span>
                        {c.railBody}
                    </motion.aside>

                    <motion.ol {...fadeUp} className="service-method-list">
                        {c.method.map((m, i) => (
                            <li key={m.title} className="service-method-row">
                                <span className="service-method-step">0{i + 1}</span>
                                <div className="service-method-body">
                                    <h3 className="service-method-title">{m.title}</h3>
                                    <p className="service-method-text">{m.body}</p>
                                    <p className="service-method-output">{m.output}</p>
                                </div>
                            </li>
                        ))}
                    </motion.ol>
                </div>
            </div>
        </section>
    );
}
