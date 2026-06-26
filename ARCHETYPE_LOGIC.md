# Assessment Archetype Decision Tree

## Scoring Dimensions

### Viability (0-100)
- Volume: 30 pts
- AHT: 25 pts  
- Workflow Goal: 25 pts
- Budget: 20 pts
- Company Size: 5 pts

### Readiness (0-100)
- Process Maturity: 30 pts
- Data Structure: 25 pts
- Data Access: 25 pts
- Tooling: 20 pts

### Risk (0-100)
- Error Tolerance: 40 pts
- Data Structure: 15 pts
- High-Stakes Domain: 15 pts

## Archetype Logic

```
if (Viability > 70 AND Readiness > 70):
    if (Risk > 50):
        → AUGMENTATION STRATEGIST (Hot)
        "Build copilots, keep human in loop"
    else:
        → VELOCITY ARCHITECT (Hot)
        "Deploy autonomous agents"

else if (Viability > 60 AND Readiness <= 70):
    → FOUNDATION BUILDER (Warm)
    "Fix your data/docs first, then automate"

else if (Viability > 60 AND Readiness > 70):
    → OPPORTUNITY ACCELERATOR (Warm)
    "You're ready, but find a better use case"

else:
    → EXPLORER (Cold)
    "Start with discovery phase"
```

## Example Profiles

### Velocity Architect
- Sales team, 3000 leads/month
- Documented SOPs, structured CRM data
- Low error tolerance (just rework)
- **Result**: V:83, R:100, Risk:20 → "Deploy autonomous lead scoring"

### Foundation Builder  
- Finance team, 1500 reconciliations/month
- Partial docs, semi-structured spreadsheets
- High error tolerance (financial risk)
- **Result**: V:75, R:55, Risk:65 → "Formalize your process first"

### Explorer
- Ops team, 600 scheduling tasks/month
- Tribal knowledge, scattered emails
- Data blocked (on-prem only)
- **Result**: V:55, R:15, Risk:15 → "Start with process documentation"

## Savings Calculation

```
Base Hours = (Volume × AHT × Savings%) / 60 × (1 - Friction)
Realistic Hours = Base Hours × Readiness Factor

Readiness Factor = max(0.4, min(1.0, ReadinessScore/100 + 0.2))
```

Example:
- Volume: 3000/mo
- AHT: 4 min
- Savings: 90% (knowledge retrieval)
- Friction: 5%
- Readiness: 100%

Base = (3000 × 4 × 0.9) / 60 × 0.95 = 171 hrs
Realistic = 171 × max(0.4, min(1.0, 1.0 + 0.2)) = 171 × 1.0 = 171 hrs

If Readiness was 50%:
Realistic = 171 × 0.7 = 120 hrs

This is why the "Tribal Ops" profile shows 28 hrs actual vs 72 hrs theoretical.
