export interface AssessmentInputs {
    // 1. Context & Viability
    companySize: string;
    functionFocus: string;
    primaryWorkflowGoal: string;
    monthlyVolumeBand: string;
    currentAHTBand: string;
    errorTolerance: string; // NEW: Impact of errors

    // 2. Readiness & Tech
    tooling: string[];
    dataAccessReadiness: string;
    processMaturity: string; // NEW: Is it documented?
    dataStructure: string; // NEW: Where is the data?

    // 3. Commercial
    sponsorReady: string;
    budgetFit: string;
}

export type AssessmentTier = "hot" | "warm" | "cold";
export type AssessmentArchetype =
    | "velocity-architect"
    | "augmentation-strategist"
    | "foundation-builder"
    | "explorer";

export interface AssessmentResult {
    // Scores (0-100)
    viabilityScore: number;
    readinessScore: number;
    riskScore: number;

    // Classification
    tier: AssessmentTier;
    archetype: AssessmentArchetype;
    archetypeTitle: string;
    archetypeDescription: string;

    // Stats
    projectedHoursSaved: {
        min: number;
        max: number;
    };
    projectedCostAvoided: {
        min: number;
        max: number;
    };

    // Feedback
    reasoning: string[];
    nextSteps: string[];
    strategicAdvice: string; // Detailed paragraph
}

export function calculateAssessmentScore(
    inputs: AssessmentInputs
): AssessmentResult {
    const reasoning: string[] = [];
    const nextSteps: string[] = [];

    // --- 1. Calculate Viability Score (Impact) ---
    // Factors: Volume, AHT, Workflow Value, Budget
    let viabilityRaw = 0;

    // Volume (Max 30)
    switch (inputs.monthlyVolumeBand) {
        case "5000+":
            viabilityRaw += 30;
            reasoning.push("High scale offers massive ROI potential.");
            break;
        case "2000-5000":
            viabilityRaw += 25;
            break;
        case "1000-2000":
            viabilityRaw += 20;
            break;
        case "500-1000":
            viabilityRaw += 15;
            break;
        default:
            viabilityRaw += 5;
    }

    // AHT (Max 25)
    switch (inputs.currentAHTBand) {
        case "5+ min":
            viabilityRaw += 25;
            reasoning.push(
                "Complex, lengthy tasks are prime candidates for optimization."
            );
            break;
        case "3-5 min":
            viabilityRaw += 20;
            break;
        case "1-3 min":
            viabilityRaw += 15;
            break;
        default:
            viabilityRaw += 5;
    }

    // Workflow Value (Max 25)
    switch (inputs.primaryWorkflowGoal) {
        case "knowledge": // Knowledge retrieval
            viabilityRaw += 25;
            break;
        case "drafting":
            viabilityRaw += 20;
            break;
        case "intake":
            viabilityRaw += 20;
            break;
        case "finance":
            viabilityRaw += 15;
            break;
        default:
            viabilityRaw += 10;
    }

    // Budget (Max 20)
    switch (inputs.budgetFit) {
        case "≥$25k":
            viabilityRaw += 20;
            break;
        case "$10-25k":
            viabilityRaw += 10;
            break;
        case "<$10k":
            viabilityRaw += 0;
            reasoning.push(
                "Current budget may limit high-end custom architecture."
            );
            break;
    }

    // Company Size (Max 5) - larger orgs have more runway for pilots
    switch (inputs.companySize) {
        case "2000+":
            viabilityRaw += 5;
            break;
        case "1000-2000":
        case "500-1000":
            viabilityRaw += 3;
            break;
        case "200-500":
        case "50-200":
            viabilityRaw += 0;
            break;
        default:
            break;
    }

    const viabilityScore = Math.min(viabilityRaw, 100);

    // --- 2. Calculate Readiness Score (Feasibility) ---
    // Factors: Process Maturity, Data Structure, Data Access, Tooling
    let readinessRaw = 0;

    // Process Maturity (Max 30) - CRITICAL
    switch (inputs.processMaturity) {
        case "documented":
            readinessRaw += 30;
            reasoning.push(
                "Documented SOPs significantly accelerate implementation."
            );
            break;
        case "partial":
            readinessRaw += 15;
            nextSteps.push(
                "Formalize process documentation to prepare for automation."
            );
            break;
        case "tribal": // In heads
        default:
            readinessRaw += 5;
            reasoning.push(
                "Tribal knowledge processes require a 'Discovery & Definition' phase first."
            );
    }

    // Data Structure (Max 25)
    switch (inputs.dataStructure) {
        case "structured": // SQL/API
            readinessRaw += 25;
            break;
        case "semi": // Spreadsheets
            readinessRaw += 15;
            break;
        case "unstructured": // PDFs/Docs
            readinessRaw += 10;
            break;
        case "scattered": // Emails/Chat
        default:
            readinessRaw += 0;
            reasoning.push(
                "Centralizing data sources will be a necessary first step."
            );
    }

    // Data Access (Max 25)
    switch (inputs.dataAccessReadiness) {
        case "minimal":
            readinessRaw += 25;
            break; // Our preferred mode
        case "synthetic":
            readinessRaw += 20;
            break;
        case "blocked":
            readinessRaw += 0;
            reasoning.push("Strict data blocking requires specialized on-prem or local-LLM architectures.");
            break;
        default:
            readinessRaw += 10;
    }

    // Tooling (Max 20)
    // Simple count for now
    const toolingCount = inputs.tooling.length;
    if (toolingCount >= 3) readinessRaw += 20;
    else if (toolingCount >= 1) readinessRaw += 10;
    else readinessRaw += 0;

    const readinessScore = Math.min(readinessRaw, 100);

    // --- 3. Calculate Risk Score (Complexity/Safety) ---
    // Factors: Error Tolerance, Data Structure, Workflow Goal (finance/legal = higher risk)
    let riskRaw = 50; // Base risk

    // Error Tolerance
    switch (inputs.errorTolerance) {
        case "critical":
            riskRaw += 40; // High risk environment
            reasoning.push("Zero-tolerance for error requires strict Human-in-the-Loop guardrails.");
            break;
        case "rework":
            riskRaw += 20;
            break;
        case "minimal":
            riskRaw += 0; // Low risk
            reasoning.push("Low error impact allows for more aggressive autonomous patterns.");
            break;
    }

    // Data Structure - scattered/unstructured adds risk
    switch (inputs.dataStructure) {
        case "scattered":
            riskRaw += 15;
            break;
        case "unstructured":
            riskRaw += 10;
            break;
        case "semi":
            riskRaw += 5;
            break;
        default:
            break;
    }

    // Workflow Goal - finance/legal implies higher stakes
    if (inputs.primaryWorkflowGoal === "finance" || inputs.functionFocus === "legal") {
        riskRaw += 10;
    }

    const riskScore = Math.min(riskRaw, 100);

    // --- 4. Determine Archetype & Tier ---

    let archetype: AssessmentArchetype = "explorer";
    let tier: AssessmentTier = "cold";
    let title = "The Explorer";
    let description = "You're at the beginning of your automation journey.";
    let strategicAdvice = "";

    // Logic for Archetypes
    if (viabilityScore > 70 && readinessScore > 70) {
        // High Viability means it's worth it. High Readiness means they can do it.
        // If Risk is high, they need augmentation. If risk is low, they can hold velocity.
        if (riskScore > 60) {
            archetype = "augmentation-strategist";
            title = "The Augmentation Strategist";
            description = "High-value, complex workflows requiring expert human oversight enabled by AI.";
            strategicAdvice = "Your workflow is high-value but carries significant risk or complexity. The optimal path isn't full replacement, but 'Super-Agent' augmentation—building copilots that handle 90% of the draft/retrieval work while keeping a human in the loop for the final judgment decision. This maximizes efficiency without compromising quality or safety.";
            tier = "hot";
        } else {
            archetype = "velocity-architect";
            title = "The Velocity Architect";
            description = "Prime candidate for high-speed, autonomous agentic workflows.";
            strategicAdvice = "You have the perfect storm for automation: high volume, well-documented processes, and a tolerance for iteration. You are ready to deploy autonomous agents that can execute end-to-end tasks with minimal supervision, potentially unlocking 10x operational throughput.";
            tier = "hot";
        }
    } else if (viabilityScore > 60 && readinessScore <= 70) {
        // Worth doing, but not ready (messy data, no docs)
        archetype = "foundation-builder";
        title = "The Foundation Builder";
        description = "High potential that needs infrastructure investment first.";
        strategicAdvice = "The ROI potential is clearly there, but your data or process maturity isn't quite ready for advanced AI agents yet. Jumping straight to code would be risky. The winning move is a 'Foundation Sprint'—structuring your data sources and formalizing SOPs, then layering AI on top for a robust, scalable solution.";
        tier = "warm";
    } else {
        // Low viability (low volume/value) OR just very early
        archetype = "explorer";
        title = "The Explorer";
        description = "Early stage discovery to identify the right use cases.";
        strategicAdvice = "It seems this specific workflow might not yield the massive ROI typical of custom AI development just yet—either due to lower volumes or unclear process boundaries. We recommend a lower-investment 'Discovery Phase' to audit your wider operations and find the hidden high-value bottlenecks before committing to a build.";
        tier = "cold";
    }

    // --- 5. Savings Calculations ---
    // const volumeMultiplier = getVolumeMultiplier(inputs.monthlyVolumeBand);
    // const ahtMultiplier = getAHTMultiplier(inputs.currentAHTBand);
    // const teamSizeMultiplier = getTeamSizeMultiplier(inputs.companySize);

    // Base math: (Vol cases/mo * AHT mins / 60) * efficiency gain (est 60-90%)
    // But we use multipliers for abstract scoring. Let's try to be a bit more concrete if we can,
    // or stick to the abstract relative scale if exact numbers are hard.
    // Let's refine the "Base Hours" to be more realistic based on Volume * AHT.

    const volNum = getAverageVolume(inputs.monthlyVolumeBand);
    const ahtNum = getAverageAHT(inputs.currentAHTBand);
    // Total hours spent currently = Volume * AHT / 60
    const totalCurrentHours = (volNum * ahtNum) / 60;

    // Est savings: 40% to 80% usually
    const minSavingPct = 0.4;
    const maxSavingPct = 0.8;

    const projectedHoursSaved = {
        min: Math.round(totalCurrentHours * minSavingPct),
        max: Math.round(totalCurrentHours * maxSavingPct),
    };

    const hourlyRate = 65; // Conservative blended internal cost
    const projectedCostAvoided = {
        min: Math.round(projectedHoursSaved.min * hourlyRate),
        max: Math.round(projectedHoursSaved.max * hourlyRate),
    };

    return {
        viabilityScore,
        readinessScore,
        riskScore,
        tier,
        archetype,
        archetypeTitle: title,
        archetypeDescription: description,
        projectedHoursSaved,
        projectedCostAvoided,
        reasoning,
        nextSteps,
        strategicAdvice
    };
}

// Helpers

function getAverageVolume(band: string): number {
    switch (band) {
        case "5000+": return 6000;
        case "2000-5000": return 3500;
        case "1000-2000": return 1500;
        case "500-1000": return 750;
        case "100-500": return 300;
        default: return 100;
    }
}

function getAverageAHT(band: string): number {
    switch (band) {
        case "5+ min": return 8; // avg
        case "3-5 min": return 4;
        case "1-3 min": return 2;
        case "<1 min": return 0.5;
        default: return 5;
    }
}


