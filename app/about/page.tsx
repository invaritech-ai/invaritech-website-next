import { Metadata } from "next";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Target,
    Users,
    Globe,
    Mail,
    Award,
    GraduationCap,
    Building,
    CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Invaritech - Intelligent Systems, Measurable Outcomes",
    description:
        "Invaritech: Intelligent systems. Measurable outcomes. Led by Aditi Garg (CEO) and Avishek Majumder (CTO) with 15+ years combined experience in AI, automation, and enterprise solutions.",
    keywords: [
        "about",
        "team",
        "leadership",
        "Aditi Garg",
        "Avishek Majumder",
        "CEO",
        "CTO",
        "Indian Institute of Science",
        "AI",
        "automation",
    ],
};

const principles = [
    {
        title: "Operational excellence beats headcount growth",
        description:
            "We believe in making existing teams more efficient rather than simply adding more people to solve problems.",
    },
    {
        title: "Small senior team, short cycles",
        description:
            "Our lean team of experts delivers results in weeks, not quarters, with rapid iteration and continuous improvement.",
    },
    {
        title: "Visible metrics drive decisions",
        description:
            "Every implementation includes measurable KPIs and real-time dashboards to track ROI and efficiency gains.",
    },
    {
        title: "Security and compliance by design",
        description:
            "All solutions are built with enterprise-grade security, audit trails, and compliance requirements from day one.",
    },
];

const regions = [
    {
        name: "EU/UK",
        description: "GDPR-compliant solutions with local data residency",
        clients: "Financial services, manufacturing, retail",
    },
    {
        name: "North America",
        description: "SOC 2 Type II certified infrastructure",
        clients: "Technology, healthcare, professional services",
    },
    {
        name: "Australia/NZ",
        description: "Regional compliance with local data protection",
        clients: "Mining, agriculture, financial services",
    },
];

export default function About() {
    return (
        <>
            <HeroHeader />
            <main className="pt-24 md:pt-36">
                {/* Hero Section */}
                <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Invaritech
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                                Intelligent systems. Measurable outcomes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What we believe */}
                <section id="principles" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                What we believe
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our core principles guide every project
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {principles.map((principle, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {principle.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {principle.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How we work */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                How we work
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our approach to delivering results
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Small senior team
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Expert practitioners with 15+ years
                                        combined experience in AI, automation,
                                        and enterprise solutions.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-8 h-8 text-accent" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Short cycles
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Rapid delivery in weeks, not quarters.
                                        Quick wins that prove value and build
                                        momentum for larger initiatives.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        Visible metrics
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Real-time dashboards and KPIs that track
                                        ROI, efficiency gains, and business
                                        impact from day one.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Leadership Team */}
                <section id="team" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Leadership team
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Industry veterans with proven track records
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Aditi Garg - CEO */}
                            <Card className="hover:shadow-lg transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                                            <Award className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold">
                                                Aditi Garg
                                            </h3>
                                            <p className="text-primary font-medium">
                                                CEO & Director
                                            </p>
                                            <a
                                                href="mailto:aditi@invaritech.ai"
                                                className="text-sm text-muted-foreground hover:text-primary"
                                            >
                                                aditi@invaritech.ai
                                            </a>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center">
                                        <GraduationCap className="w-5 h-5 text-muted-foreground mr-2" />
                                        <span className="text-sm">
                                            MTech (Gold Medalist), Indian
                                            Institute of Science
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Experience:
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            7+ years in customer relationship AI
                                            and query resolution systems
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Notable Clients:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "BMW",
                                                "Goldman Sachs",
                                                "Citibank",
                                                "Uber",
                                            ].map((client, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {client}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 rounded-lg p-3">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Specialization:</strong>{" "}
                                            AI-powered customer experience,
                                            enterprise automation, and scalable
                                            system architecture.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Avishek Majumder - CTO */}
                            <Card className="hover:shadow-lg transition-all duration-300">
                                <CardHeader>
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                                            <Building className="w-8 h-8 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold">
                                                Avishek Majumder
                                            </h3>
                                            <p className="text-accent font-medium">
                                                CTO
                                            </p>
                                            <a
                                                href="mailto:avishek@invaritech.ai"
                                                className="text-sm text-muted-foreground hover:text-primary"
                                            >
                                                avishek@invaritech.ai
                                            </a>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center">
                                        <GraduationCap className="w-5 h-5 text-muted-foreground mr-2" />
                                        <span className="text-sm">
                                            MSc (Computer Vision), Indian
                                            Institute of Science
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Experience:
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            8+ years in computer vision, OCR,
                                            and agentic solutions
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Technical Expertise:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Object Detection",
                                                "OCR",
                                                "Document Processing",
                                                "Agentic Workflows",
                                                "Predictive Maintenance",
                                            ].map((skill, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 rounded-lg p-3">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Specialization:</strong>{" "}
                                            Computer vision research, smart
                                            billing systems, document archival,
                                            and contextual retrieval for
                                            enterprise applications.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Where we've delivered */}
                <section className="py-16 md:py-24 bg-muted">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Where we&apos;ve delivered
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Global reach with local compliance
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {regions.map((region, index) => (
                                <Card
                                    key={index}
                                    className="text-center hover:shadow-lg transition-all duration-300"
                                >
                                    <CardContent className="p-6">
                                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <Globe className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">
                                            {region.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {region.description}
                                        </p>
                                        <div className="bg-muted/30 rounded-lg p-3">
                                            <p className="text-xs font-medium text-primary mb-1">
                                                Sample Clients:
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {region.clients}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Card className="max-w-2xl mx-auto">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Recent Work
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        EUDR compliance backend (France): Built
                                        compliance-grade backend APIs and
                                        workflows for data intake, validation,
                                        auditability, and
                                        integrations—observable, secure, and
                                        ready to scale.
                                    </p>
                                    <Button asChild variant="outline">
                                        <Link href="/results#eudr">
                                            Read the case study
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Contact
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Ready to discuss your efficiency challenges?
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                <a
                                    href="mailto:aditi@invaritech.ai"
                                    className="flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    aditi@invaritech.ai
                                </a>
                                <a
                                    href="mailto:avishek@invaritech.ai"
                                    className="flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    avishek@invaritech.ai
                                </a>
                            </div>

                            <Button asChild size="lg">
                                <Link href="/ops-efficiency-sprint">
                                    See the Sprint
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSection />
        </>
    );
}
