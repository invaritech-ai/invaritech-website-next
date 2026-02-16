
import { calculateAssessmentScore, AssessmentInputs, AssessmentResult } from "./lib/assessment-calculator";

const profiles: Record<string, AssessmentInputs> = {
    "Sales Pro (High Readiness)": {
        companySize: "500-1000",
        functionFocus: "lead-qualification", 
        primaryWorkflowGoal: "lead-qualification",
        monthlyVolumeBand: "2000-5000",
        currentAHTBand: "3-5 min",
        errorTolerance: "rework",
        processMaturity: "documented",
        dataStructure: "structured",
        dataAccessReadiness: "minimal",
        tooling: ["salesforce", "hubspot", "slack"],
        sponsorReady: "yes",
        budgetFit: "$10-25k"
    },
    "Tribal Ops (Low Readiness)": {
        companySize: "50-200",
        functionFocus: "ops",
        primaryWorkflowGoal: "scheduling",
        monthlyVolumeBand: "500-1000",
        currentAHTBand: "5+ min",
        errorTolerance: "minimal",
        processMaturity: "tribal",
        dataStructure: "scattered",
        dataAccessReadiness: "blocked", 
        tooling: ["gdrive"],
        sponsorReady: "no",
        budgetFit: "<$10k"
    },
    "Wellness Studio (New Vertical)": {
         companySize: "50-200",
         functionFocus: "health-fitness",
         primaryWorkflowGoal: "client-onboarding",
         monthlyVolumeBand: "100-500",
         currentAHTBand: "1-3 min",
         errorTolerance: "minimal",
         processMaturity: "partial",
         dataStructure: "semi",
         dataAccessReadiness: "minimal",
         tooling: ["mindbody"],
         sponsorReady: "yes",
         budgetFit: "$10-25k"
    }
};

Object.entries(profiles).forEach(([name, inputs]) => {
    const result = calculateAssessmentScore(inputs);
    console.log(`\n=== ${name} ===`);
    console.log(`Archetype: ${result.archetypeTitle} (${result.tier})`);
    console.log(`Scores: V:${result.viabilityScore} R:${result.readinessScore} Risk:${result.riskScore}`);
    console.log(`Savings: ${result.projectedHoursSaved.min}-${result.projectedHoursSaved.max} hrs`);
    if (result.projectedHoursSaved.theoreticalMax > result.projectedHoursSaved.max) {
        console.log(`(Could be ${result.projectedHoursSaved.theoreticalMax} hrs with better readiness)`);
    } else {
        console.log(`(Running at max efficiency)`);
    }
    console.log(`Reasoning:`);
    result.reasoning.forEach(r => console.log(`  - ${r}`));
    console.log(`Next Steps:`);
    result.nextSteps.forEach(n => console.log(`  - ${n}`));
});
