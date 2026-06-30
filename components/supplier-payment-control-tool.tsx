"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Copy, ShieldAlert, Workflow } from "lucide-react";
import { controlRules, type ControlRule } from "@/lib/supplier-control-rules";
import { ControlFilterSidebar } from "./control-filter-sidebar";
import { ControlRuleTable } from "./control-rule-table";

type ScenarioId =
    | "payment-release-review"
    | "supplier-bank-detail-change"
    | "duplicate-invoice-risk"
    | "po-invoice-mismatch"
    | "missing-approval-evidence"
    | "freight-variance"
    | "tax-or-coding-variance";

type EvidenceStatus = "complete" | "partial" | "missing";
type SupplierState = "existing" | "new" | "changed-details";
type ReleaseTiming = "routine" | "due-soon" | "already-held";
type PoCoverage = "not-relevant" | "po-backed" | "non-po";

const scenarioOptions: Array<{
    id: ScenarioId;
    label: string;
    body: string;
    ruleIds: number[];
    automationCandidate: string;
}> = [
    {
        id: "payment-release-review",
        label: "Payment release review",
        body: "Use this when AP is about to release a payment and wants a final control pack for approval evidence, supplier risk, and release posture.",
        ruleIds: [1, 2, 6, 14, 18],
        automationCandidate:
            "Encode the final AP release checklist so evidence, owner, and release notes are captured before the payment run.",
    },
    {
        id: "supplier-bank-detail-change",
        label: "Supplier bank details changed",
        body: "Use this when a supplier has asked for new bank details or AP sees a suspicious payment-detail change before release.",
        ruleIds: [1, 14, 18],
        automationCandidate:
            "Bank-detail change verification, callback tracking, and release holds before payment leaves the bank.",
    },
    {
        id: "duplicate-invoice-risk",
        label: "Duplicate invoice or duplicate payment risk",
        body: "Use this when invoice numbers, amounts, references, or prior payment history make AP unsure whether the invoice has already been paid.",
        ruleIds: [2, 7, 13, 15],
        automationCandidate:
            "Duplicate invoice detection across supplier, amount, reference, and prior payment data before approval or payment release.",
    },
    {
        id: "po-invoice-mismatch",
        label: "PO, receipt, and invoice mismatch",
        body: "Use this when the issue sits around quantity, price, receipt, proof-of-delivery, or split-shipment mismatch instead of a simple approval gap.",
        ruleIds: [3, 6, 9, 12, 16],
        automationCandidate:
            "Three-way match checks with variance routing before AP posts or pays the invoice.",
    },
    {
        id: "missing-approval-evidence",
        label: "Missing approval evidence",
        body: "Use this when AP can see the invoice but cannot defend who approved it, what was attached, or why the exception was released.",
        ruleIds: [9, 12, 18],
        automationCandidate:
            "Approval-evidence capture and release holds whenever an invoice moves forward without the required support.",
    },
    {
        id: "freight-variance",
        label: "Freight or carrier variance",
        body: "Use this when the invoice looks wrong because of surcharge variance, rate-card mismatch, POD gaps, or freight disputes.",
        ruleIds: [4, 5, 11],
        automationCandidate:
            "Freight variance review with rate-card checks, POD gating, and dispute routing before payment release.",
    },
    {
        id: "tax-or-coding-variance",
        label: "Tax code or coding variance",
        body: "Use this when AP can process the invoice only after someone reviews tax treatment, coding logic, or an override to tolerance rules.",
        ruleIds: [10, 17],
        automationCandidate:
            "Coding and tolerance review rules so AP exceptions land with the right controller before posting or payment release.",
    },
];

const allIndustries = Array.from(
    new Set(controlRules.flatMap((rule) => rule.industries)),
).sort();

const priorityOrder: Record<ControlRule["priority"], number> = {
    high: 0,
    medium: 1,
    low: 2,
};

const scenarioMap = Object.fromEntries(
    scenarioOptions.map((scenario) => [scenario.id, scenario]),
) as Record<ScenarioId, (typeof scenarioOptions)[number]>;

const formatPriority = (priority: ControlRule["priority"]) =>
    priority.charAt(0).toUpperCase() + priority.slice(1);

const formatHoursLabel = (hours: string) => hours;

function getSuggestedSla(rules: ControlRule[]) {
    const parsed = rules
        .map((rule) => {
            const match = rule.sla.match(/\d+/);
            return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
        })
        .filter((value) => Number.isFinite(value));

    if (parsed.length === 0) {
        return "Review based on your current queue";
    }

    return formatHoursLabel(`${Math.min(...parsed)} hrs`);
}

function dedupeText(values: string[], limit?: number) {
    const unique = Array.from(new Set(values.filter(Boolean)));
    return typeof limit === "number" ? unique.slice(0, limit) : unique;
}

export function SupplierPaymentControlTool() {
    const searchParams = useSearchParams();
    const initialIndustry = searchParams.get("industry") || "";
    const initialException = searchParams.get("exception") || "";
    const scenarioParam = searchParams.get("scenario");
    const initialScenario: ScenarioId =
        scenarioParam && scenarioParam in scenarioMap
            ? (scenarioParam as ScenarioId)
            : "payment-release-review";

    const [selectedScenario, setSelectedScenario] =
        useState<ScenarioId>(initialScenario);
    const [industryFocus, setIndustryFocus] = useState(initialIndustry);
    const [poCoverage, setPoCoverage] = useState<PoCoverage>("not-relevant");
    const [evidenceStatus, setEvidenceStatus] =
        useState<EvidenceStatus>("partial");
    const [supplierState, setSupplierState] =
        useState<SupplierState>("existing");
    const [releaseTiming, setReleaseTiming] =
        useState<ReleaseTiming>("routine");
    const [copied, setCopied] = useState(false);

    const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
        initialIndustry ? [initialIndustry] : [],
    );
    const [selectedExceptionTypes, setSelectedExceptionTypes] = useState<string[]>(
        initialException ? [initialException] : [],
    );
    const [selectedControlTypes, setSelectedControlTypes] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

    const selectedScenarioConfig = scenarioMap[selectedScenario];

    const recommendedRules = useMemo(() => {
        const ids = new Set<number>(selectedScenarioConfig.ruleIds);

        if (supplierState === "new") {
            ids.add(14);
        }

        if (supplierState === "changed-details") {
            ids.add(1);
        }

        if (evidenceStatus !== "complete") {
            ids.add(18);
        }

        if (poCoverage === "po-backed") {
            ids.add(6);
            ids.add(9);
        }

        if (releaseTiming === "already-held") {
            ids.add(17);
        }

        let rules = controlRules.filter((rule) => ids.has(rule.id));

        if (industryFocus) {
            const matchingIndustryRules = rules.filter((rule) =>
                rule.industries.includes(industryFocus),
            );
            if (matchingIndustryRules.length > 0) {
                rules = matchingIndustryRules;
            }
        }

        if (poCoverage === "non-po") {
            rules = rules.filter(
                (rule) =>
                    rule.controlType !== "three-way-match" &&
                    !rule.exception.toLowerCase().includes("po"),
            );
        }

        return rules.sort((a, b) => {
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) {
                return priorityDiff;
            }
            return a.exception.localeCompare(b.exception);
        });
    }, [
        selectedScenarioConfig,
        supplierState,
        evidenceStatus,
        poCoverage,
        releaseTiming,
        industryFocus,
    ]);

    const filteredReferenceRules = useMemo(() => {
        return controlRules.filter((rule) => {
            const matchesIndustry =
                selectedIndustries.length === 0 ||
                selectedIndustries.some((industry) =>
                    rule.industries.includes(industry),
                );

            const matchesException =
                selectedExceptionTypes.length === 0 ||
                selectedExceptionTypes.includes(rule.exception);

            const matchesControlType =
                selectedControlTypes.length === 0 ||
                selectedControlTypes.includes(rule.controlType);

            const matchesPriority =
                selectedPriorities.length === 0 ||
                selectedPriorities.includes(rule.priority);

            return (
                matchesIndustry &&
                matchesException &&
                matchesControlType &&
                matchesPriority
            );
        });
    }, [
        selectedIndustries,
        selectedExceptionTypes,
        selectedControlTypes,
        selectedPriorities,
    ]);

    const releaseDecision = useMemo(() => {
        if (
            selectedScenario === "supplier-bank-detail-change" ||
            supplierState === "changed-details"
        ) {
            return "Callback and hold payment until the supplier details are verified.";
        }

        if (evidenceStatus === "missing") {
            return "Hold payment until the required approval evidence is attached.";
        }

        if (selectedScenario === "duplicate-invoice-risk") {
            return "Stop release until AP confirms the invoice is not a duplicate or prior payment variant.";
        }

        if (
            poCoverage === "po-backed" &&
            (selectedScenario === "po-invoice-mismatch" ||
                recommendedRules.some(
                    (rule) => rule.controlType === "three-way-match",
                ))
        ) {
            return "Match the PO, receipt, and invoice before AP approves or releases payment.";
        }

        if (selectedScenario === "freight-variance") {
            return "Review the variance against the rate card or POD before payment release.";
        }

        if (releaseTiming === "due-soon") {
            return "Escalate quickly, but do not release until the control owner records the decision.";
        }

        return "Review the exception, capture the evidence, and release only after sign-off is recorded.";
    }, [
        selectedScenario,
        supplierState,
        evidenceStatus,
        poCoverage,
        recommendedRules,
        releaseTiming,
    ]);

    const ownerLane = dedupeText(recommendedRules.map((rule) => rule.owner), 3).join(
        ", ",
    );
    const evidenceList = dedupeText(
        recommendedRules.map((rule) => rule.evidenceRequired),
        4,
    );
    const auditTrailFields = dedupeText(
        recommendedRules.map((rule) => rule.auditTrail),
        4,
    );
    const suggestedSla = getSuggestedSla(recommendedRules);

    const automationCandidate = useMemo(() => {
        if (
            selectedScenario === "payment-release-review" &&
            supplierState === "changed-details"
        ) {
            return "Supplier bank-detail verification and release hold workflow.";
        }

        if (
            selectedScenario === "payment-release-review" &&
            evidenceStatus === "missing"
        ) {
            return "Approval-evidence capture before payment release.";
        }

        return selectedScenarioConfig.automationCandidate;
    }, [selectedScenario, supplierState, evidenceStatus, selectedScenarioConfig]);

    const summaryText = useMemo(() => {
        return [
            "Accounts Payable Controls Checklist",
            `Scenario: ${selectedScenarioConfig.label}`,
            industryFocus ? `Industry focus: ${industryFocus}` : null,
            `Release decision: ${releaseDecision}`,
            ownerLane ? `Owner lane: ${ownerLane}` : null,
            `Suggested SLA: ${suggestedSla}`,
            "",
            "Required evidence:",
            ...evidenceList.map((item) => `- ${item}`),
            "",
            "Audit trail to capture:",
            ...auditTrailFields.map((item) => `- ${item}`),
            "",
            "Recommended controls:",
            ...recommendedRules.map(
                (rule) =>
                    `- ${rule.exception}: ${rule.controlAction} (${formatPriority(rule.priority)})`,
            ),
            "",
            `First automation candidate: ${automationCandidate}`,
        ]
            .filter(Boolean)
            .join("\n");
    }, [
        selectedScenarioConfig.label,
        industryFocus,
        releaseDecision,
        ownerLane,
        suggestedSla,
        evidenceList,
        auditTrailFields,
        recommendedRules,
        automationCandidate,
    ]);

    async function handleCopySummary() {
        if (typeof navigator === "undefined" || !navigator.clipboard) {
            return;
        }

        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    const handleClearAllReferenceFilters = () => {
        setSelectedIndustries([]);
        setSelectedExceptionTypes([]);
        setSelectedControlTypes([]);
        setSelectedPriorities([]);
    };

    const selectClassName =
        "w-full min-w-0 max-w-full border border-border bg-card px-4 py-3 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary";

    return (
        <div className="space-y-10">
            <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
                <section className="border border-border bg-background p-6 md:p-8">
                    <p className="site-meta text-primary">Step 1</p>
                    <h3 className="site-h3 mt-4">Describe the AP scenario</h3>
                    <p className="site-body mt-3">
                        Start with the problem AP is trying to clear. Then narrow the control pack
                        by evidence status, supplier context, PO coverage, and release timing.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <label className="grid min-w-0 gap-2">
                            <span className="site-meta">Scenario</span>
                            <select
                                value={selectedScenario}
                                onChange={(event) =>
                                    setSelectedScenario(event.target.value as ScenarioId)
                                }
                                className={selectClassName}
                            >
                                {scenarioOptions.map((scenario) => (
                                    <option key={scenario.id} value={scenario.id}>
                                        {scenario.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="grid min-w-0 gap-2">
                            <span className="site-meta">Industry focus</span>
                            <select
                                value={industryFocus}
                                onChange={(event) => setIndustryFocus(event.target.value)}
                                className={selectClassName}
                            >
                                <option value="">All industries</option>
                                {allIndustries.map((industry) => (
                                    <option key={industry} value={industry}>
                                        {industry}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="grid min-w-0 gap-2">
                            <span className="site-meta">PO coverage</span>
                            <select
                                value={poCoverage}
                                onChange={(event) =>
                                    setPoCoverage(event.target.value as PoCoverage)
                                }
                                className={selectClassName}
                            >
                                <option value="not-relevant">Not relevant</option>
                                <option value="po-backed">PO-backed invoice</option>
                                <option value="non-po">Non-PO invoice</option>
                            </select>
                        </label>

                        <label className="grid min-w-0 gap-2">
                            <span className="site-meta">Evidence status</span>
                            <select
                                value={evidenceStatus}
                                onChange={(event) =>
                                    setEvidenceStatus(event.target.value as EvidenceStatus)
                                }
                                className={selectClassName}
                            >
                                <option value="complete">Evidence complete</option>
                                <option value="partial">Evidence partial</option>
                                <option value="missing">Evidence missing</option>
                            </select>
                        </label>

                        <label className="grid min-w-0 gap-2">
                            <span className="site-meta">Supplier context</span>
                            <select
                                value={supplierState}
                                onChange={(event) =>
                                    setSupplierState(event.target.value as SupplierState)
                                }
                                className={selectClassName}
                            >
                                <option value="existing">Existing supplier</option>
                                <option value="new">New or unfamiliar supplier</option>
                                <option value="changed-details">Bank details changed</option>
                            </select>
                        </label>

                        <label className="grid min-w-0 gap-2">
                            <span className="site-meta">Release timing</span>
                            <select
                                value={releaseTiming}
                                onChange={(event) =>
                                    setReleaseTiming(event.target.value as ReleaseTiming)
                                }
                                className={selectClassName}
                            >
                                <option value="routine">Routine queue</option>
                                <option value="due-soon">Due within 24 hours</option>
                                <option value="already-held">Already held or escalated</option>
                            </select>
                        </label>
                    </div>

                    <div className="mt-8 border-t border-border pt-6">
                        <p className="text-sm leading-relaxed text-foreground-subtle">
                            {selectedScenarioConfig.body}
                        </p>
                    </div>
                </section>

                <section className="border border-primary/20 bg-background p-6 md:p-8">
                    <p className="site-meta text-primary">Step 2</p>
                    <h3 className="site-h3 mt-4">Use the recommended control pack</h3>
                    <p className="site-body mt-3">
                        This output is the practical starting point: what to hold, what to match,
                        what evidence to attach, and who needs to own the review before release.
                    </p>

                    <div className="mt-8 grid gap-[1px] bg-border md:grid-cols-2">
                        <div className="bg-card p-5">
                            <p className="site-meta">Release decision</p>
                            <p className="mt-3 text-base font-medium text-foreground">
                                {releaseDecision}
                            </p>
                        </div>
                        <div className="bg-card p-5">
                            <p className="site-meta">Owner lane</p>
                            <p className="mt-3 text-base font-medium text-foreground">
                                {ownerLane || "Assign the controller or AP owner"}
                            </p>
                        </div>
                        <div className="bg-card p-5">
                            <p className="site-meta">Suggested SLA</p>
                            <p className="mt-3 text-base font-medium text-foreground">
                                {suggestedSla}
                            </p>
                        </div>
                        <div className="bg-card p-5">
                            <p className="site-meta">First automation candidate</p>
                            <p className="mt-3 text-base font-medium text-foreground">
                                {automationCandidate}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 rounded-md border border-primary/20 bg-primary/[0.05] p-5">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                            <div>
                                <p className="site-meta text-primary">Evidence AP should collect</p>
                                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-subtle">
                                    {evidenceList.map((item) => (
                                        <li key={item}>- {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded-md border border-border bg-card p-5">
                        <div className="flex items-start gap-3">
                            <Workflow className="mt-0.5 size-5 text-primary" aria-hidden="true" />
                            <div>
                                <p className="site-meta text-primary">Audit trail to capture</p>
                                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-subtle">
                                    {auditTrailFields.map((item) => (
                                        <li key={item}>- {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="site-meta text-primary">Recommended controls</p>
                        <div className="mt-4 grid gap-4">
                            {recommendedRules.map((rule) => (
                                <article
                                    key={rule.id}
                                    className="border border-border bg-card p-5"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <h4 className="text-lg font-semibold text-foreground">
                                            {rule.exception}
                                        </h4>
                                        <span className="border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
                                            {formatPriority(rule.priority)}
                                        </span>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-foreground-subtle">
                                        {rule.controlAction}
                                    </p>
                                    <dl className="mt-4 grid gap-3 md:grid-cols-3">
                                        <div>
                                            <dt className="site-meta">Owner</dt>
                                            <dd className="mt-1 text-sm text-foreground">
                                                {rule.owner}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="site-meta">Evidence</dt>
                                            <dd className="mt-1 text-sm text-foreground">
                                                {rule.evidenceRequired}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="site-meta">SLA</dt>
                                            <dd className="mt-1 text-sm text-foreground">
                                                {rule.sla}
                                            </dd>
                                        </div>
                                    </dl>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={handleCopySummary}
                            className="site-button-secondary inline-flex items-center gap-2"
                        >
                            <Copy className="size-4" aria-hidden="true" />
                            {copied ? "Copied" : "Copy summary"}
                        </button>
                        <Link
                            href="/contact/?diagnostic=1"
                            className="site-button inline-flex items-center gap-2"
                        >
                            Share a Workflow
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </div>

            <section className="border-t border-border pt-10">
                <div className="max-w-3xl">
                    <p className="site-meta text-primary">Full AP controls reference</p>
                    <h3 className="site-h3 mt-4">Scan every control behind the checklist</h3>
                    <p className="site-body mt-3">
                        Filter the reference table by industry, exception type, control type, and
                        priority. Use it when you need to review every control row, not only the
                        recommendation for one scenario.
                    </p>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <ControlFilterSidebar
                            selectedIndustries={selectedIndustries}
                            selectedExceptionTypes={selectedExceptionTypes}
                            selectedControlTypes={selectedControlTypes}
                            selectedPriorities={selectedPriorities}
                            onIndustriesChange={setSelectedIndustries}
                            onExceptionTypesChange={setSelectedExceptionTypes}
                            onControlTypesChange={setSelectedControlTypes}
                            onPrioritiesChange={setSelectedPriorities}
                            onClearAll={handleClearAllReferenceFilters}
                            filteredRuleCount={filteredReferenceRules.length}
                        />
                    </div>

                    <div className="min-w-0 lg:col-span-3">
                        <ControlRuleTable rules={filteredReferenceRules} />
                    </div>
                </div>
            </section>
        </div>
    );
}
