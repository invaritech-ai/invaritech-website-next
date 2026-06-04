"use client";

import { type ControlRule } from "@/lib/supplier-control-rules";

interface ControlRuleTableProps {
  rules: ControlRule[];
}

const priorityColors = {
  high: "bg-red-500/10 text-red-700 border-red-500/20",
  medium: "bg-accent/10 text-accent border-accent/30",
  low: "bg-blue-500/10 text-blue-700 border-blue-500/20",
};

export function ControlRuleTable({ rules }: ControlRuleTableProps) {
  if (rules.length === 0) {
    return (
      <div className="border border-border rounded-lg bg-card p-8 text-center">
        <p className="text-muted-foreground">No controls match your filters. Try adjusting your selection.</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle whitespace-nowrap">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
                Exception
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle whitespace-nowrap">
                Control
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle whitespace-nowrap">
                Owner
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
                Evidence
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle">
                Audit Trail
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-foreground-subtle whitespace-nowrap">
                SLA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rules.map((rule, idx) => (
              <tr key={rule.id} className={idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${priorityColors[rule.priority]}`}
                  >
                    {rule.priority.charAt(0).toUpperCase() + rule.priority.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-mono text-foreground max-w-xs">
                  {rule.exception}
                </td>
                <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 bg-primary/10 text-primary border border-primary/30 rounded text-xs font-medium">
                    {rule.controlType
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-mono text-foreground-subtle whitespace-nowrap">
                  {rule.owner}
                </td>
                <td className="px-4 py-4 text-sm text-foreground max-w-xs">
                  {rule.evidenceRequired}
                </td>
                <td className="px-4 py-4 text-sm text-foreground max-w-xs">
                  {rule.auditTrail}
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-foreground whitespace-nowrap">
                  {rule.sla}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
