import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const bullets = [
    "Identify your highest-ROI automation wedge",
    "Score your integration readiness in 3 minutes",
    "Get a vendor-neutral complexity rating",
];

export function AssessmentTeaser() {
    return (
        <section className="reveal-section py-20 px-6 relative z-10 border-t border-white/10 bg-primary/5">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-8 bg-primary/60" />
                            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">
                                Free Diagnostic
                            </p>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                            Is your stack ready for AI?
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-lg">
                            Before committing budget, run a 3-minute readiness check. We built this to surface the exact wedge where AI pays for itself fastest.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {bullets.map((b) => (
                                <li key={b} className="flex items-center gap-3 text-sm text-white/80">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                        <Link href="/tools/assessment/">
                            <span className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Take the assessment <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block w-px self-stretch bg-white/10" />

                    <div className="flex-shrink-0 text-center md:text-right">
                        <p className="text-6xl font-bold text-primary/20 font-mono leading-none mb-2">3</p>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Minutes
                        </p>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-4">
                            No sign-up required
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
