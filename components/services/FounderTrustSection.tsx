import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const founders = [
    {
        name: "Avishek Majumder",
        title: "Co-founder & CEO",
        credential: "Data engineer and applied scientist. 15+ years building production pipelines and decision-support systems for regulated, compliance-heavy environments.",
        image: "/avishek.webp",
    },
    {
        name: "Aditi Garg",
        title: "Director & Founder",
        credential: "Operations leader. Goldman Sachs, Uber, BMW. Transforms fragmented enterprise workflows into governed, high-throughput operating models.",
        image: "/aditi-1.webp",
    },
];

export function FounderTrustSection() {
    return (
        <section className="reveal-section py-24 px-6 relative z-10 border-t border-border">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-px w-8 bg-primary/60" />
                    <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                        You work with principals
                    </p>
                </div>

                <h2 className="font-editorial text-2xl md:text-3xl font-semibold mb-4 tracking-tight text-foreground">
                    Built by engineers who have shipped at scale.
                </h2>
                <p className="text-muted-foreground mb-12 max-w-2xl">
                    No account managers. No junior teams hidden behind a sales call. Your engagement is led by the people whose names are below.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    {founders.map((founder) => (
                        <div
                            key={founder.name}
                            className="flex gap-5 p-6 border border-border bg-card items-start"
                        >
                            <div className="relative size-14 shrink-0 overflow-hidden border border-border">
                                <Image
                                    src={founder.image}
                                    alt={founder.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="56px"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground leading-tight">{founder.name}</p>
                                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                                    {founder.title}
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {founder.credential}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    href="/about/"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:text-foreground transition-colors"
                >
                    About the team <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
