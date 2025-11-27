import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Database, Zap, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services - Automation & Back-Office Solutions",
    description:
        "INVARITECH offers custom automation solutions, compliance bridges, data pipelines, and back-office systems for small service businesses. Discover how we can help you achieve your goals.",
    openGraph: {
        title: "Our Services - Automation & Back-Office Solutions",
        description:
            "Custom automation solutions, compliance bridges, data pipelines, and back-office systems. Discover how INVARITECH can help you achieve your goals.",
        url: "https://www.invaritech.ai/services/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Our Services - Automation & Back-Office Solutions",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/services/",
    },
};

const services = [
    {
        id: "compliance-bridge",
        title: "Compliance Workflow Bridge",
        category: "Compliance & Automation",
        description:
            "We turn your most painful compliance and reporting workflow into one reliable, auditable pipeline in 6 weeks. Using the tools you already have.",
        features: [
            "Automated compliance workflows",
            "Auditable pipeline",
            "6-week delivery",
            "Works with existing tools",
        ],
        link: "/services/compliance-bridge/",
        icon: ShieldCheck,
    },
];

const generalServices = [
    {
        title: "Custom Automation",
        description:
            "We help you identify the single biggest bottleneck costing you 100+ hours a month, then deliver a custom automation solution within 6 weeks.",
        icon: Zap,
    },
    {
        title: "System Integration",
        description:
            "Connect your existing tools (Google Workspace, HubSpot, CRMs, portals) into reliable, automated workflows that eliminate manual data entry.",
        icon: Database,
    },
    {
        title: "Backend Development",
        description:
            "Custom APIs, data pipelines, and backend systems built to scale with your business needs. Production-grade code delivered fast.",
        icon: Code,
    },
];

export default function ServicesPage() {
    return (
        <main className="pt-24 pb-16 md:pt-32 md:pb-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold md:text-6xl mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        We help small service businesses stop losing time between
                        their tools. Most of our clients already use tools like
                        Google Workspace, HubSpot, or custom portals. We connect
                        and automate these so work stops falling through the cracks.
                    </p>
                </div>

                {/* Featured Services */}
                <div className="space-y-16 mb-24">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Card
                                key={service.id}
                                className="overflow-hidden border-none shadow-none bg-transparent"
                            >
                                <div className="grid gap-8 md:grid-cols-2 lg:gap-12 items-start">
                                    <div className="aspect-video relative rounded-2xl overflow-hidden bg-muted border shadow-sm flex items-center justify-center">
                                        <Image
                                            src="/compliance-bridge.webp"
                                            alt="Compliance Workflow Bridge"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col h-full justify-center">
                                        <div className="mb-4">
                                            <Badge
                                                variant="secondary"
                                                className="mb-4"
                                            >
                                                {service.category}
                                            </Badge>
                                            <h2 className="text-3xl font-bold mb-4">
                                                {service.title}
                                            </h2>
                                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        <ul className="space-y-2 mb-8">
                                            {service.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                >
                                                    <div className="size-1.5 rounded-full bg-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex gap-4">
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-xl"
                                            >
                                                <Link href={service.link}>
                                                    Learn More{" "}
                                                    <ArrowRight className="ml-2 size-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 h-px w-full bg-border/50" />
                            </Card>
                        );
                    })}
                </div>

                {/* General Services */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Other Services We Offer
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Beyond our packaged solutions, we also provide custom
                            development and integration services tailored to your
                            specific needs.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {generalServices.map((service) => {
                            const Icon = service.icon;
                            return (
                                <Card key={service.title} className="h-full">
                                    <CardHeader>
                                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                            <Icon className="size-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold">
                                            {service.title}
                                        </h3>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {service.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-muted/30 rounded-2xl p-8 md:p-12 border border-border/50">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to automate your workflow?
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Book a free 30-minute consultation to discuss your
                        automation needs and see how we can help.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-xl px-8 text-base"
                    >
                        <a
                            href="https://calendly.com/hello-invaritech/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book a free consultation{" "}
                            <ArrowRight className="ml-2 size-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </main>
    );
}
