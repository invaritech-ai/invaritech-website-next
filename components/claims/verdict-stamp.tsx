import type { ClaimVerdict } from "@/lib/claims/verdicts";

const classes: Record<ClaimVerdict, string> = {
    supportable: "border-emerald-700/30 bg-emerald-700/10 text-emerald-800",
    "missing proof": "border-amber-700/30 bg-amber-700/10 text-amber-800",
    "worth challenging": "border-primary/30 bg-primary/10 text-primary",
    "Code risk": "border-red-700/30 bg-red-700/10 text-red-800",
};

export function VerdictStamp({ verdict }: { verdict: ClaimVerdict }) {
    return (
        <span
            className={`inline-flex border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] ${classes[verdict]}`}
        >
            {verdict}
        </span>
    );
}
