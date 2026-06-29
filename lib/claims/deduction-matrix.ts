import matrix from "./deduction-matrix.json" with { type: "json" };
import type { ClaimSourceId } from "./claim-sources";
import type { ClaimVerdict } from "./verdicts";

export type DeadlineRule = {
    kind: "claimRaisedWithinDays";
    days: number;
};

export type DeductionType = {
    id: string;
    label: string;
    family: string;
    defaultVerdict: ClaimVerdict;
    shortEvidence: string;
    codeCheck: string;
    neutralQuery: string;
    deadlineHelper: string;
    deadlineRule?: DeadlineRule;
    sourceIds?: ClaimSourceId[];
};

export const deductionTypes = matrix as DeductionType[];

export const deductionTypesById = new Map(
    deductionTypes.map((deductionType) => [deductionType.id, deductionType]),
);

export function getDeductionType(id: string): DeductionType {
    const deductionType = deductionTypesById.get(id);
    if (!deductionType) {
        throw new Error(`Unknown deduction type: ${id}`);
    }
    return deductionType;
}
