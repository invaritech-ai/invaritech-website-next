import { FaqItem } from "@/components/services/FaqAccordion";

export const servicesFaqs: FaqItem[] = [
    {
        question: "Do you replace our systems?",
        answer: "No. We layer intelligence and automation on top of what you already run.",
    },
    {
        question: "Do you do AI strategy only?",
        answer: "Only when it leads into Sprint execution or a delivery track.",
    },
    {
        question: "Can you work with our internal engineers?",
        answer: "Yes. We can integrate with your team or deliver end-to-end.",
    },
    {
        question: "Do you support multilingual deployments?",
        answer: "Yes, including governed chat and workflows.",
    },
    {
        question: "Are you expensive?",
        answer: "We're priced for accountability. If we can't identify an ROI that significantly outweighs our fee during discovery, we won't take your money.",
    },
];

export const sprintFaqs: FaqItem[] = [
    {
        question: "Is this just an AI discovery workshop?",
        answer: "It starts with an AI discovery workshop, but it ends in build and measurable validation.",
    },
    {
        question: "What fits into a 30-day POC?",
        answer: "One Outcome. Production-Ready. We focus on a single mission-critical loop that can be fully automated in 30 days. Examples: 1. Instant Reputation Feedback — Google Business reviews routed to your mobile the second they are posted. 2. Automated Bookkeeping — Image/PDF invoices converted into instant, Xero/QuickBooks importable data. 3. Real-Time Lead Triage — Website signals turned into qualified sales alerts in seconds.",
    },
    {
        question: "What if we need more than 30 days?",
        answer: "Then this becomes phase 1 of a delivery track. The goal is to prove value first.",
    },
    {
        question: "Do you build \"AI strategy\"?",
        answer: "Yes, but only when strategy is the shortest path to safe execution.",
    },
    {
        question: "Will our team be involved?",
        answer: "Yes. We define owners, approvals, and operating boundaries from day one.",
    },
    {
        question: "What do you need from us?",
        answer: "A workflow owner, system access by Day 3, and enough data to baseline and validate outcomes.",
    },
];

export const workflowFaqs: FaqItem[] = [
    {
        question: "Do you promise to replace employees?",
        answer: "No. We promise to make them more effective. We build for scale, not headcount reduction.",
    },
    {
        question: "What if the AI makes a mistake?",
        answer: "Business-critical actions never run on guesses. If the AI is unsure, the system stops, falls back, or requests human approval.",
    },
    {
        question: "Is this just 'intelligent process automation' or RPA?",
        answer: "It can include those techniques, but the point is governance: audited pipelines with clear ownership and safe failure modes.",
    },
    {
        question: "Is this just a bunch of Zaps?",
        answer: "No. No-code is a tool. Operational liquidity is the goal. When reliability and auditability matter, we build custom pipelines.",
    },
];

export const integrationFaqs: FaqItem[] = [
    {
        question: "Do we own the gateway code?",
        answer: "Yes. This is not a SaaS connector. You own the integration layer we build.",
    },
    {
        question: "How do you prevent data leakage to proprietary models?",
        answer: "We scope to your constraints. For sensitive workloads, we can avoid public APIs and deploy within your VPC or on-prem using approved models and controls.",
    },
    {
        question: "Is this for chatbots?",
        answer: "This is for objective-driven systems. Chat is an interface. The gateway is infrastructure that makes AI usable inside governed workflows.",
    },
    {
        question: "How do we start?",
        answer: "Start with an Infrastructure Audit to map your data surface, APIs, and policy constraints. If the wedge is clear, we scope the build (or recommend the Sprint first).",
    },
];

export const chatbotFaqs: FaqItem[] = [
    {
        question: "Do you build custom chatbot systems or configure tools?",
        answer: "Both. Tool choice is secondary. Governance and adoption are primary.",
    },
    {
        question: "Can it connect to our documents and systems?",
        answer: "Yes, with permissioned access, logging, and controlled tool boundaries.",
    },
    {
        question: "What about hallucinations?",
        answer: "We reduce risk through architecture, not hope: deterministic tool calls, structured outputs, citations, limited context injection, and escalation paths.",
    },
    {
        question: "What makes you different from SaaS chatbot vendors?",
        answer: "We deploy inside your existing systems, enforce governance, tie the bot to defined objectives, and avoid open-ended experimentation.",
    },
    {
        question: "How do we start?",
        answer: "Start with a Sprint if you want a governed pilot in 30 days, or begin with a Fit Audit to define objective + access boundaries.",
    },
];

export const backendFaqs: FaqItem[] = [
    {
        question: "How do you prevent spaghetti code?",
        answer: "By refusing to use unrestricted AI for code execution. We plan the architecture first. AI is a bridge for unstructured data, not the architect of your system.",
    },
    {
        question: "Is it really stack-agnostic?",
        answer: "Yes. We build microservices that plug in. If we can speak to your systems via API or database, we can build the AI-native layer you need.",
    },
    {
        question: "What is \"chat recreation\"?",
        answer: "The ability to replay a specific interaction inside the evaluation harness to see exactly where a model failed, then version and fix the prompt/model behavior permanently.",
    },
    {
        question: "Do you also do classic ML?",
        answer: "Yes, when it's the right tool. \"AI/ML development services\" should be chosen by problem fit, not hype.",
    },
    {
        question: "Do you build agents?",
        answer: "Only with approvals, bounded actions, and hard safety boundaries. No open-ended autonomy for writes.",
    },
    {
        question: "What's the best first step?",
        answer: "Request a Technical Audit. If scope is unclear or risk is high, start with the Sprint to validate impact safely.",
    },
];

export const consultingFaqs: FaqItem[] = [
    {
        question: "Do you provide AI automation consulting services only, or implementation too?",
        answer: "Both. Consulting defines the path. The Sprint executes it.",
    },
    {
        question: "How are you different from other AI automation consulting firms?",
        answer: "Unlike other AI automation consulting firms, we do not stop at strategy. Every engagement produces a build-ready specification tied to measurable outcomes.",
    },
    {
        question: "Will you recommend not using AI?",
        answer: "Yes. If deterministic automation or process redesign wins, we'll say so.",
    },
    {
        question: "Do you work with enterprises or mid-sized businesses?",
        answer: "We work with leadership teams serious about execution, regardless of size.",
    },
    {
        question: "Are you an AI automation consulting company or a delivery team?",
        answer: "We are not a generic AI automation consulting company. We're not one of the AI automation consulting companies that stops at slideware. We're a delivery-first team. Consulting exists to de-risk execution, not to extend advisory.",
    },
];
