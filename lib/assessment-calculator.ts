export interface AssessmentInputs {
    companySize: string;
    functionFocus: string;
    primaryWorkflowGoal: string;
    monthlyVolumeBand: string;
    currentAHTBand: string;
    tooling: string[];
    dataAccessReadiness: string;
    sponsorReady: string;
    budgetFit: string;
}

export interface AssessmentResult {
    score: number;
    tier: "hot" | "warm" | "cold";
    recommendedLane: string;
    projectedHoursSaved: {
        min: number;
        max: number;
    };
    projectedCostAvoided: {
        min: number;
        max: number;
    };
    reasoning: string[];
    nextSteps: string[];
}

export function calculateAssessmentScore(
    inputs: AssessmentInputs
): AssessmentResult {
    let score = 0;
    const reasoning: string[] = [];
    const nextSteps: string[] = [];

    // Company Size (0-20 points)
    switch (inputs.companySize) {
        case "200-500":
            score += 15;
            reasoning.push("Ideal company size for efficiency gains");
            break;
        case "500-1000":
            score += 20;
            reasoning.push("Perfect size for significant ROI");
            break;
        case "1000-2000":
            score += 18;
            reasoning.push("Large enough for substantial impact");
            break;
        case "50-200":
            score += 10;
            reasoning.push("Smaller team, but still viable for automation");
            break;
        default:
            score += 5;
            reasoning.push("May need custom approach for your size");
    }

    // Function Focus (0-15 points)
    switch (inputs.functionFocus) {
        case "ops":
            score += 15;
            reasoning.push("Operations teams see the highest efficiency gains");
            break;
        case "support":
            score += 12;
            reasoning.push(
                "Support teams benefit significantly from automation"
            );
            break;
        case "finance":
            score += 10;
            reasoning.push(
                "Finance processes are excellent automation candidates"
            );
            break;
        default:
            score += 8;
            reasoning.push(
                "Other functions can benefit from targeted automation"
            );
    }

    // Primary Workflow Goal (0-20 points)
    switch (inputs.primaryWorkflowGoal) {
        case "knowledge":
            score += 20;
            reasoning.push("Knowledge retrieval has the highest ROI potential");
            break;
        case "drafting":
            score += 18;
            reasoning.push(
                "Document drafting automation delivers immediate value"
            );
            break;
        case "intake":
            score += 16;
            reasoning.push("Intake automation reduces manual processing time");
            break;
        case "finance":
            score += 14;
            reasoning.push("Finance automation improves accuracy and speed");
            break;
        default:
            score += 10;
            reasoning.push("Custom workflow optimization possible");
    }

    // Monthly Volume (0-15 points)
    switch (inputs.monthlyVolumeBand) {
        case "5000+":
            score += 15;
            reasoning.push("High volume = high impact potential");
            break;
        case "2000-5000":
            score += 12;
            reasoning.push("Good volume for measurable results");
            break;
        case "1000-2000":
            score += 10;
            reasoning.push("Moderate volume, still viable for automation");
            break;
        case "500-1000":
            score += 8;
            reasoning.push("Lower volume, but automation still beneficial");
            break;
        default:
            score += 5;
            reasoning.push("Very low volume, may need custom approach");
    }

    // Current AHT (0-10 points)
    switch (inputs.currentAHTBand) {
        case "5+ min":
            score += 10;
            reasoning.push(
                "High AHT indicates significant optimization potential"
            );
            break;
        case "3-5 min":
            score += 8;
            reasoning.push("Moderate AHT, good optimization opportunity");
            break;
        case "1-3 min":
            score += 6;
            reasoning.push("Lower AHT, but automation can still help");
            break;
        default:
            score += 4;
            reasoning.push("Very low AHT, limited optimization potential");
    }

    // Tooling (0-10 points)
    const toolingScore = Math.min(inputs.tooling.length * 2, 10);
    score += toolingScore;
    if (toolingScore > 0) {
        reasoning.push(
            `Good tooling foundation (${inputs.tooling.length} tools)`
        );
    } else {
        reasoning.push("Limited tooling may require more integration work");
    }

    // Data Access (0-15 points)
    switch (inputs.dataAccessReadiness) {
        case "minimal":
            score += 15;
            reasoning.push("Minimal data access is perfect for our approach");
            break;
        case "synthetic":
            score += 12;
            reasoning.push("Synthetic data access allows for safe testing");
            break;
        case "blocked":
            score += 5;
            reasoning.push(
                "Data access limitations may constrain implementation"
            );
            nextSteps.push("Discuss data access requirements with your team");
            break;
        default:
            score += 8;
            reasoning.push("Data access approach needs clarification");
    }

    // Sponsor Ready (0-10 points)
    if (inputs.sponsorReady === "yes") {
        score += 10;
        reasoning.push("Sponsor support is crucial for success");
    } else {
        score += 3;
        reasoning.push("Sponsor buy-in will be important for implementation");
        nextSteps.push("Identify and engage potential sponsors");
    }

    // Budget Fit (0-15 points)
    switch (inputs.budgetFit) {
        case "≥$25k":
            score += 15;
            reasoning.push("Budget aligns with our engagement model");
            break;
        case "$10-25k":
            score += 10;
            reasoning.push("Budget may require phased approach");
            nextSteps.push("Consider starting with a smaller scope");
            break;
        case "<$10k":
            score += 3;
            reasoning.push("Budget below our minimum engagement threshold");
            nextSteps.push("Explore alternative approaches or budget increase");
            break;
        default:
            score += 5;
            reasoning.push("Budget requirements need clarification");
    }

    // Determine tier
    let tier: "hot" | "warm" | "cold";
    if (score >= 80) {
        tier = "hot";
    } else if (score >= 60) {
        tier = "warm";
    } else {
        tier = "cold";
    }

    // Determine recommended lane
    let recommendedLane: string;
    switch (inputs.primaryWorkflowGoal) {
        case "knowledge":
            recommendedLane = "Knowledge & Decision Support";
            break;
        case "drafting":
            recommendedLane = "Agentic Read-Heavy Workflows";
            break;
        case "intake":
            recommendedLane = "Intake & Processing";
            break;
        case "finance":
            recommendedLane = "Finance & Back-Office Pipelines";
            break;
        default:
            recommendedLane = "Knowledge & Decision Support";
    }

    // Calculate projected savings based on inputs
    const volumeMultiplier = getVolumeMultiplier(inputs.monthlyVolumeBand);
    const ahtMultiplier = getAHTMultiplier(inputs.currentAHTBand);
    const teamSizeMultiplier = getTeamSizeMultiplier(inputs.companySize);

    const baseHoursSaved =
        volumeMultiplier * ahtMultiplier * teamSizeMultiplier;
    const projectedHoursSaved = {
        min: Math.round(baseHoursSaved * 0.7),
        max: Math.round(baseHoursSaved * 1.3),
    };

    const hourlyRate = 90; // Default rate
    const projectedCostAvoided = {
        min: Math.round(projectedHoursSaved.min * hourlyRate),
        max: Math.round(projectedHoursSaved.max * hourlyRate),
    };

    // Add tier-specific next steps
    if (tier === "hot") {
        nextSteps.push("Book Architecture & Roadmap discussion");
        nextSteps.push("Prepare for Sprint kickoff");
    } else if (tier === "warm") {
        nextSteps.push("Review qualification criteria");
        nextSteps.push("Consider pilot project approach");
    } else {
        nextSteps.push("Explore alternative solutions");
        nextSteps.push("Reassess requirements and budget");
    }

    return {
        score,
        tier,
        recommendedLane,
        projectedHoursSaved,
        projectedCostAvoided,
        reasoning,
        nextSteps,
    };
}

function getVolumeMultiplier(volumeBand: string): number {
    switch (volumeBand) {
        case "5000+":
            return 1.0;
        case "2000-5000":
            return 0.8;
        case "1000-2000":
            return 0.6;
        case "500-1000":
            return 0.4;
        default:
            return 0.2;
    }
}

function getAHTMultiplier(ahtBand: string): number {
    switch (ahtBand) {
        case "5+ min":
            return 1.0;
        case "3-5 min":
            return 0.7;
        case "1-3 min":
            return 0.4;
        default:
            return 0.2;
    }
}

function getTeamSizeMultiplier(companySize: string): number {
    switch (companySize) {
        case "1000-2000":
            return 1.0;
        case "500-1000":
            return 0.8;
        case "200-500":
            return 0.6;
        case "50-200":
            return 0.4;
        default:
            return 0.2;
    }
}
