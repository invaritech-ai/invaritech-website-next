import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Zap, Database, Globe } from "lucide-react";
import { BOOK_MEETING_CTA, BOOK_MEETING_URL } from "@/lib/marketing";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { TextEffect } from "@/components/ui/text-effect";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
    title: "EUDR Compliance Bridge - Case Study",
    description:
        "EUDR compliance automation and API integration for a high-volume French operator. Built an EUDR DDS submission backend with validation, audit logs, and controlled retries at 100,000+ per month.",
    openGraph: {
        title: "EUDR Compliance Bridge - Case Study",
        description:
            "EUDR compliance automation and API integration for a high-volume French operator. Built an EUDR DDS submission backend with validation, audit logs, and controlled retries at 100,000+ per month.",
        url: "https://www.invaritech.ai/work/eudr-compliance-bridge/",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "EUDR Compliance Bridge - Case Study",
                type: "image/webp",
            },
        ],
    },
    alternates: {
        canonical: "https://www.invaritech.ai/work/eudr-compliance-bridge/",
    },
};

export default function EudrCaseStudyPage() {
    return (
        <PageLayout>
            <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-32">
                {/* Back Link */}
                <div className="mb-16 md:mb-24">
                    <Link
                        href="/work/"
                        className="group inline-flex items-center text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Work
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="relative mb-32">
                    <div className="absolute top-0 left-0 -z-10 opacity-20 select-none pointer-events-none">
                        <span className="text-[12rem] md:text-[20rem] font-bold leading-none tracking-tighter text-white/5 whitespace-nowrap blur-3xl">
                            COMPLIANCE
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 mb-8">
                         <span className="font-mono text-primary text-sm tracking-widest uppercase">
                            Automation & Compliance
                        </span>
                        <TextEffect
                            per="char"
                            preset="fade"
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mix-blend-difference mb-6"
                        >
                            EUDR BRIDGE
                        </TextEffect>
                        <h2 className="text-2xl md:text-4xl font-light text-muted-foreground max-w-3xl">
                             100,000+ Submissions <span className="text-foreground">Per Month</span>.
                             <br/>
                             Zero Manual Data Entry.
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-primary/30 pl-6 mt-12">
                        A French operator preparing for EU Deforestation
                        Regulation (EUDR) enforcement needed the capacity to
                        process up to <span className="text-foreground font-medium">100,000 Due Diligence Statements (DDS)</span>{" "}
                        per month. Manual submission was operationally unstable at that volume (read <Link href="/blogs/why-manual-eudr-compliance-fails/" className="text-primary underline hover:text-primary/80">why manual compliance fails here</Link>). We engineered a backend infrastructure built for high-volume regulatory submission automation.
                    </p>
                </div>

                {/* Business Constraints */}
                <section className="mb-32">
                    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-bold tracking-tight">Business Constraints</h2>
                        <span className="font-mono text-xs text-muted-foreground hidden md:block">01 — CHALLENGE</span>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="group border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors duration-500">
                            <ShieldCheck className="w-8 h-8 mb-6 text-primary opacity-80" />
                            <h3 className="font-bold text-lg mb-3">Legal Exposure</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Each DDS submission is an official declaration of sourcing origin. Errors trigger regulatory penalties. Data integrity and traceability were non-negotiable.
                            </p>
                        </div>
                        <div className="group border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors duration-500">
                            <Zap className="w-8 h-8 mb-6 text-primary opacity-80" />
                            <h3 className="font-bold text-lg mb-3">Bursty Volume</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Submissions weren&apos;t evenly distributed. Days with <span className="text-foreground">10,000+ entries</span> required throughput that scaled with infrastructure, not headcount.
                            </p>
                        </div>
                        <div className="group border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors duration-500">
                            <Globe className="w-8 h-8 mb-6 text-primary opacity-80" />
                            <h3 className="font-bold text-lg mb-3">Legacy EU Interface</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                The EU system relies on SOAP with strict schemas and geo-data formatting. It&apos;s not designed for high-volume, ergonomic manual operations.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Solution Overview */}
                <section className="mb-32">
                     <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-bold tracking-tight">Solution Overview</h2>
                        <span className="font-mono text-xs text-muted-foreground hidden md:block">02 — ARCHITECTURE</span>
                    </div>

                    <div className="mb-16 max-w-3xl">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            In practice, this is RegTech backend development: a deterministic EUDR DDS submission system designed for bursty volume. This is the type of work we deliver under <Link href="/services/ai-integration-services/" className="text-foreground underline decoration-primary/50 hover:decoration-primary transition-all">AI Integration Services</Link>, even when the core constraint is protocol and governance, not AI.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {/* Part 1 */}
                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">
                                    Deterministic API & Validation
                                </h3>
                                <div className="space-y-6 text-muted-foreground">
                                    <p>
                                        We built a dedicated EUDR backend layer that sits between internal systems and the EU portal. It validates schemas and geo-data deterministically before sending anything to the EU system.
                                    </p>
                                    <ul className="space-y-3 mt-6">
                                        {[
                                            "Structured JSON input from internal tools",
                                            "Pre-submission schema + geo-data validation",
                                            "JSON-to-SOAP transformation with strict envelopes"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle2 className="mr-3 size-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="relative group rounded-none border border-white/10 overflow-hidden bg-black/40">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Image
                                    src="/eudr-flow.webp"
                                    alt="EUDR API Architecture Diagram"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Part 2 */}
                        <div className="grid gap-12 md:grid-cols-2 items-center md:flex-row-reverse">
                            <div className="order-last md:order-first relative group rounded-none border border-white/10 overflow-hidden bg-black/40">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Image
                                    src="/eudr-portal.webp"
                                    alt="EUDR Compliance Dashboard"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">
                                    Audit Log & Operator Dashboard
                                </h3>
                                <div className="space-y-6 text-muted-foreground">
                                    <p>
                                        We eliminated portal navigation time by maintaining an internal dashboard. Operators search and segment DDS by status, date, and commodity instantly.
                                    </p>
                                    <div className="p-6 border border-white/5 bg-white/5">
                                        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Lifecycle Tracking</p>
                                        <div className="flex flex-wrap gap-2 font-mono text-xs text-foreground/80">
                                            <span>PENDING</span>
                                            <span className="text-white/20">→</span>
                                            <span>SUBMITTED</span>
                                            <span className="text-white/20">→</span>
                                            <span className="text-green-500">CONFIRMED</span>
                                            <span className="text-white/20">/</span>
                                            <span className="text-red-500">FAILED</span>
                                            <span className="text-white/20">→</span>
                                            <span>AMENDED</span>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        Supports amendments and retractions without losing audit traceability.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Part 3 */}
                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">
                                    State-Aware Retry Logic
                                </h3>
                                <div className="space-y-6 text-muted-foreground">
                                    <p>
                                         The bridge classifies response codes (including EU&apos;s specific CF2-CF7 classes) and routes them through deterministic handling paths.
                                    </p>
                                    <p>
                                        Transient failures trigger automated retries tracking state. Non-transient errors surface immediately with explicit reasons. <span className="text-foreground">No silent corruption.</span>
                                    </p>
                                </div>
                            </div>
                            <div className="relative group rounded-none border border-white/10 overflow-hidden bg-black/40">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Image
                                    src="/eudr-retry.webp"
                                    alt="Smart Retry Logic Visualization"
                                    width={800}
                                    height={450}
                                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                 <section className="mb-32">
                    <div className="border-t border-white/10 pt-12">
                        <h3 className="font-mono text-sm text-muted-foreground mb-6 uppercase tracking-widest">Built With</h3>
                        <div className="flex flex-wrap gap-3">
                            {["Python", "FastAPI", "PostgreSQL", "React", "Docker", "Celery", "SOAP"].map((tech) => (
                                <span
                                    key={tech}
                                    className="border border-white/10 bg-white/5 px-4 py-2 text-sm font-mono text-foreground/80 hover:bg-white/10 hover:border-primary/30 transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                        <p className="text-sm text-muted-foreground">
                            Related reading: <Link href="/blogs/compliance-automation-done-right/" className="text-primary hover:underline">deterministic compliance systems</Link> and <Link href="/blogs/building-vs-buying-custom-automation/" className="text-primary hover:underline">building vs buying custom automation</Link>.
                        </p>
                    </div>
                </section>


                {/* Impact */}
                <section className="mb-32">
                    <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-bold tracking-tight">The Impact</h2>
                         <span className="font-mono text-xs text-muted-foreground hidden md:block">03 — RESULTS</span>
                    </div>
                    <div className="grid gap-px bg-white/10 border border-white/10 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
                        {[
                            { label: "Capacity", value: "100k+", desc: "Submissions/mo supported without new staff." },
                            { label: "Risk", value: "-99%", desc: "Reduction in manual entry error exposure." },
                            { label: "Visibility", value: "100%", desc: "Instant search & audit for every submission." },
                            { label: "Control", value: "Full", desc: "Traceable state transitions & logs." }
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#050505] p-8 hover:bg-[#0a0a0a] transition-colors">
                                <div className="text-sm text-muted-foreground mb-4 font-mono uppercase tracking-wider">{stat.label}</div>
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{stat.value}</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Delivery */}
                <section className="mb-32 max-w-4xl mx-auto">
                     <div className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Database className="w-24 h-24" />
                        </div>
                        <h2 className="text-2xl font-bold mb-8">Delivery Specs</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div>
                                <div className="text-3xl font-bold text-foreground mb-1">4 Weeks</div>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Core Backend</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-foreground mb-1">+2 Weeks</div>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Hardening & Deploy</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-1">$11,000 USD</div>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Investment</p>
                            </div>
                        </div>
                     </div>
                </section>

                {/* CTA */}
                <section className="text-center pt-24 border-t border-white/10">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 max-w-3xl mx-auto">
                        EXPECTING <span className="text-primary">EUDR VOLUME</span>?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        If you anticipate high DDS throughput, you need deterministic submission control. The first step is a structured infrastructure diagnostic.
                    </p>
                    <div className="flex justify-center">
                        <MagneticButton className="px-12 py-6 text-xl">
                            <a
                                href={BOOK_MEETING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3"
                            >
                                {BOOK_MEETING_CTA} <ArrowRight className="w-6 h-6" />
                            </a>
                        </MagneticButton>
                    </div>
                    <div className="mt-12 text-sm text-muted-foreground max-w-lg mx-auto">
                        <p>
                            For teams that want a structured path to EUDR backend development, we typically start with the <Link href="/services/ai-automation-sprint/" className="underline hover:text-foreground text-primary/80">AI Automation Sprint</Link>.
                        </p>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
