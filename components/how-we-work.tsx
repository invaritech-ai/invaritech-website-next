

const steps = [
    {
        title: "Short call (30 min)",
        description: "We understand your workflow, tools, and exactly where time is being lost.",
    },
    {
        title: "Small, scoped build (4–8 weeks)",
        description: "We design and build a concrete automation bridge or tool. No big‑bang platform projects.",
    },
    {
        title: "Iterate",
        description: "We adjust based on real usage. If it works well, we can extend it or turn it into a product.",
    },
];

export default function HowWeWorkSection() {
    return (
        <section className="bg-muted/30 py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-semibold md:text-5xl">
                        How We Work
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Our proven process ensures transparency, quality, and timely delivery for every project.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex-none">
                                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="font-semibold">{index + 1}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <a 
                        href="/contact" 
                        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        Schedule a call
                    </a>
                </div>
            </div>
        </section>
    );
}
