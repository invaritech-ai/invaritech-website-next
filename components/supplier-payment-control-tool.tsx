"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { controlRules } from "@/lib/supplier-control-rules";
import { ControlFilterSidebar } from "./control-filter-sidebar";
import { ControlRuleTable } from "./control-rule-table";
import { ControlUpsellBridge } from "./control-upsell-bridge";

export function SupplierPaymentControlTool() {
  const searchParams = useSearchParams();

  // Pre-populate filters from query params
  const initialIndustry = searchParams.get("industry") || "";
  const initialException = searchParams.get("exception") || "";

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    initialIndustry ? [initialIndustry] : []
  );
  const [selectedExceptionTypes, setSelectedExceptionTypes] = useState<string[]>(
    initialException ? [initialException] : []
  );
  const [selectedControlTypes, setSelectedControlTypes] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  // Filter rules based on selections
  const filteredRules = useMemo(() => {
    return controlRules.filter((rule) => {
      const matchesIndustry =
        selectedIndustries.length === 0 ||
        selectedIndustries.some((ind) => rule.industries.includes(ind));

      const matchesException =
        selectedExceptionTypes.length === 0 ||
        selectedExceptionTypes.includes(rule.exception);

      const matchesControlType =
        selectedControlTypes.length === 0 ||
        selectedControlTypes.includes(rule.controlType);

      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(rule.priority);

      return matchesIndustry && matchesException && matchesControlType && matchesPriority;
    });
  }, [selectedIndustries, selectedExceptionTypes, selectedControlTypes, selectedPriorities]);

  const handleClearAll = () => {
    setSelectedIndustries([]);
    setSelectedExceptionTypes([]);
    setSelectedControlTypes([]);
    setSelectedPriorities([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold font-editorial text-foreground">
          Supplier Payment Control Rule Table
        </h1>
        <p className="text-foreground-subtle">
          {selectedIndustries.length > 0 || selectedExceptionTypes.length > 0
            ? `Based on: ${[
                selectedIndustries[0],
                selectedExceptionTypes[0]?.substring(0, 20),
              ]
                .filter(Boolean)
                .join(" | ")} — adjust filters to explore`
            : "Select filters to explore your control landscape"}
        </p>
      </div>

      {/* Main Layout: Sidebar + Table */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
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
            onClearAll={handleClearAll}
            filteredRuleCount={filteredRules.length}
          />
        </div>

        {/* Table */}
        <div className="lg:col-span-3 min-w-0">
          <ControlRuleTable rules={filteredRules} />
        </div>
      </div>

      {/* Upsell Bridge */}
      <ControlUpsellBridge />
    </div>
  );
}
