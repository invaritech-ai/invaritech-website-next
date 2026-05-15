"use client";

import { X } from "lucide-react";
import { controlRules, controlTypes, priorities } from "@/lib/supplier-control-rules";

interface ControlFilterSidebarProps {
  selectedIndustries: string[];
  selectedExceptionTypes: string[];
  selectedControlTypes: string[];
  selectedPriorities: string[];
  onIndustriesChange: (industries: string[]) => void;
  onExceptionTypesChange: (types: string[]) => void;
  onControlTypesChange: (types: string[]) => void;
  onPrioritiesChange: (priorities: string[]) => void;
  onClearAll: () => void;
  filteredRuleCount: number;
}

export function ControlFilterSidebar({
  selectedIndustries,
  selectedExceptionTypes,
  selectedControlTypes,
  selectedPriorities,
  onIndustriesChange,
  onExceptionTypesChange,
  onControlTypesChange,
  onPrioritiesChange,
  onClearAll,
  filteredRuleCount,
}: ControlFilterSidebarProps) {
  const allIndustries = Array.from(new Set(controlRules.flatMap((r) => r.industries))).sort();

  const toggleItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    } else {
      return [...array, item];
    }
  };

  const hasActiveFilters =
    selectedIndustries.length > 0 ||
    selectedExceptionTypes.length > 0 ||
    selectedControlTypes.length > 0 ||
    selectedPriorities.length > 0;

  return (
    <div className="space-y-8 rounded-lg border border-border bg-card p-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-2">
          Filters
        </h3>
        <p className="text-xs text-muted-foreground">
          Showing {filteredRuleCount} of {controlRules.length} controls
        </p>
      </div>

      {/* Industry Filter */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
          Industry
        </label>
        <div className="space-y-2">
          {allIndustries.map((industry) => (
            <label key={industry} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIndustries.includes(industry)}
                onChange={() => onIndustriesChange(toggleItem(selectedIndustries, industry))}
                className="w-4 h-4 rounded border-input bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground">{industry}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Exception Type Filter */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
          Exception Type
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {Array.from(new Set(controlRules.map((r) => r.exception)))
            .sort()
            .map((exception) => (
              <label key={exception} className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedExceptionTypes.includes(exception)}
                  onChange={() => onExceptionTypesChange(toggleItem(selectedExceptionTypes, exception))}
                  className="w-4 h-4 rounded border-input bg-background cursor-pointer mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-foreground">{exception}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Control Type Filter */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
          Control Type
        </label>
        <div className="space-y-2">
          {controlTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedControlTypes.includes(type.value)}
                onChange={() => onControlTypesChange(toggleItem(selectedControlTypes, type.value))}
                className="w-4 h-4 rounded border-input bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
          Priority
        </label>
        <div className="space-y-2">
          {priorities.map((priority) => (
            <label key={priority.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(priority.value)}
                onChange={() => onPrioritiesChange(toggleItem(selectedPriorities, priority.value))}
                className="w-4 h-4 rounded border-input bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground capitalize">{priority.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5 rounded hover:bg-primary/10 transition-colors text-sm text-primary"
        >
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      )}
    </div>
  );
}
