import { TextEffect } from "@/components/ui/text-effect";

interface LegalPageProps {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    children: React.ReactNode;
}

export function LegalPage({ titleLine1, titleLine2, subtitle, children }: LegalPageProps) {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-20">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-foreground mix-blend-difference uppercase">
                        <TextEffect per="word" as="span" preset="fade" className="block">
                            {titleLine1}
                        </TextEffect>
                        <TextEffect per="word" as="span" preset="fade" className="block">
                            {titleLine2}
                        </TextEffect>
                    </h1>
                    <TextEffect
                        per="line"
                        as="p"
                        preset="fade"
                        delay={0.5}
                        className="text-xl text-muted-foreground md:text-2xl leading-relaxed max-w-2xl font-light font-mono"
                    >
                        {subtitle}
                    </TextEffect>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="space-y-12">{children}</div>
                </div>
            </div>
        </main>
    );
}

interface LegalSectionProps {
    number: string;
    heading: string;
    children: React.ReactNode;
}

export function LegalSection({ number, heading, children }: LegalSectionProps) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-primary text-sm tracking-widest uppercase">
                    {number}
                </span>
                <TextEffect
                    per="word"
                    as="h2"
                    preset="fade"
                    className="text-3xl font-bold tracking-tight m-0"
                >
                    {heading}
                </TextEffect>
            </div>
            {children}
        </section>
    );
}

export function LegalBulletList({ items }: { items: string[] }) {
    return (
        <ul className="list-none pl-0 space-y-4 text-muted-foreground">
            {items.map((item, i) => (
                <li key={i} className="flex gap-4">
                    <span className="text-primary mt-1">▹</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function LegalLastVerified() {
    return (
        <section>
            <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mt-12">
                Last verified:{" "}
                {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </section>
    );
}
