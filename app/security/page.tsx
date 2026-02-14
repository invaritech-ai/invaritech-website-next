import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Shield,
    FileText,
    Database,
    Zap,
    CheckCircle,
    Lock,
    Globe,
    Users,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Security & Governance - Built for Compliance and Control",
    description:
        "Built for governance, compliance, and control. Security by design. Audit trails by default. Identity & Access, Auditability, Data handling, Reliability, Compliance posture.",
    keywords: [
        "security",
        "governance",
        "compliance",
        "GDPR",
        "DPA",
        "SSO",
        "RBAC",
        "audit trails",
        "data residency",
        "encryption",
    ],
    alternates: {
        canonical: "https://www.invaritech.ai/security/",
    },
};

const securityAreas = [
    {
        icon: Users,
        title: "Identity & Access",
        description: "SSO/RBAC, least privilege, approval gates",
        features: [
            "Single Sign-On (SSO) integration",
            "Role-Based Access Control (RBAC)",
            "Least privilege principle",
            "Multi-factor authentication",
            "Approval gates for sensitive operations",
            "Session management and timeout controls",
        ],
        compliance: ["SOC 2", "ISO 27001", "GDPR"],
    },
    {
        icon: FileText,
        title: "Auditability",
        description:
            "End-to-end logging, versioned routing, traceable decisions",
        features: [
            "Comprehensive audit logging",
            "Versioned routing and configuration",
            "Traceable decision trees",
            "Immutable log storage",
            "Real-time monitoring and alerting",
            "Compliance reporting dashboards",
        ],
        compliance: ["SOC 2", "ISO 27001", "GDPR", "HIPAA"],
    },
    {
        icon: Database,
        title: "Data handling",
        description:
            "Data residency options (UK/EEA), encryption in transit/at rest",
        features: [
            "Data residency controls",
            "Encryption in transit (TLS 1.3)",
            "Encryption at rest (AES-256)",
            "Data classification and labeling",
            "Automated data retention policies",
            "Cross-border data transfer controls",
        ],
        compliance: ["GDPR", "DPA", "CCPA", "PIPEDA"],
    },
    {
        icon: Zap,
        title: "Reliability",
        description:
            "Queues, rate limits, retries, canary rollouts, circuit breakers",
        features: [
            "Message queue management",
            "Rate limiting and throttling",
            "Automatic retry mechanisms",
            "Canary deployment strategies",
            "Circuit breaker patterns",
            "Health check monitoring",
        ],
        compliance: ["SOC 2", "ISO 27001"],
    },
    {
        icon: Shield,
        title: "Compliance posture",
        description: "GDPR/DPA alignment; DPAs on request",
        features: [
            "GDPR compliance framework",
            "Data Processing Agreements (DPAs)",
            "Privacy by design principles",
            "Data subject rights management",
            "Breach notification procedures",
            "Regular compliance assessments",
        ],
        compliance: ["GDPR", "DPA", "CCPA", "PIPEDA"],
    },
];

const complianceStandards = [
    {
        name: "GDPR",
        description: "General Data Protection Regulation compliance",
        status: "Fully Compliant",
        icon: Globe,
    },
    {
        name: "SOC 2",
        description: "Security, availability, and confidentiality controls",
        status: "Type II Certified",
        icon: Shield,
    },
    {
        name: "ISO 27001",
        description: "Information security management system",
        status: "Certified",
        icon: Lock,
    },
    {
        name: "DPA",
        description: "Data Processing Agreements available",
        status: "Available on Request",
        icon: FileText,
    },
];

export default function Security() {
    return (
        <>
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Built for governance, compliance, and control
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Security by design. Audit trails by default.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/contact">
                                    Request our Security Overview
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Security Areas */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Security Framework
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Comprehensive security measures across all
                                system layers
                            </p>
                        </div>

                        <div className="space-y-12">
                            {securityAreas.map((area, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300"
                                >
                                    <CardHeader>
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                                                <area.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-semibold">
                                                    {area.title}
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    {area.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-3">
                                                Key Features:
                                            </h4>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {area.features.map(
                                                    (feature, featureIndex) => (
                                                        <div
                                                            key={featureIndex}
                                                            className="flex items-center text-sm"
                                                        >
                                                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                                            <span>
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <h4 className="font-semibold mb-2">
                                                Compliance Standards:
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {area.compliance.map(
                                                    (
                                                        standard,
                                                        standardIndex
                                                    ) => (
                                                        <Badge
                                                            key={standardIndex}
                                                            variant="outline"
                                                        >
                                                            {standard}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Compliance Standards */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Compliance Standards
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Certified compliance with industry standards
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {complianceStandards.map((standard, index) => (
                                <Card
                                    key={index}
                                    className="text-center hover:shadow-lg transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <standard.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {standard.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {standard.description}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {standard.status}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Data Residency */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Data Residency Options
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Choose your preferred data hosting location
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="border-accent/20 bg-accent/5">
                                <CardContent className="p-6 text-center">
                                    <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        UK/EEA Hosting
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Full GDPR compliance with data
                                        processing within the European Economic
                                        Area
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                            <span>GDPR compliant</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                            <span>EU data residency</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/20 bg-primary/5">
                                <CardContent className="p-6 text-center">
                                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        North America
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        SOC 2 Type II certified infrastructure
                                        with comprehensive security controls
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                            <span>SOC 2 Type II</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                            <span>ISO 27001</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-chart-5/20 bg-chart-5/5">
                                <CardContent className="p-6 text-center">
                                    <Database className="w-12 h-12 text-chart-5 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        Australia/NZ
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Regional compliance with local data
                                        protection requirements
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                            <span>Local compliance</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                            <span>Regional hosting</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Security Overview CTA */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Need detailed security information?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Request our comprehensive Security Overview
                                document with detailed technical specifications,
                                compliance certifications, and security
                                architecture.
                            </p>
	                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
	                                <Button asChild size="lg">
	                                    <Link href="/contact/">
	                                        Request our Security Overview
	                                    </Link>
	                                </Button>
	                                <Button asChild variant="outline" size="lg">
	                                    <Link href="/ai-automation-sprint/">
	                                        See the Sprint
	                                    </Link>
	                                </Button>
	                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
