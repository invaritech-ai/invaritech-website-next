export default function StatsSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-semibold lg:text-5xl">
                        Success Stories
                    </h2>
                    <p>
                        Real results for real businesses. See how we&apos;ve
                        transformed operations across industries.
                    </p>
                </div>

                <div className="grid gap-0.5 *:text-center md:grid-cols-3">
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-bold">40%</div>
                        <p className="font-semibold">faster transactions</p>
                        <p className="text-sm text-muted-foreground">
                            Optimized checkout → 40% faster transactions for
                            e-commerce brand.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Revolutionary payment optimization that transformed
                            user experience
                        </p>
                    </div>
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-bold">35%</div>
                        <p className="font-semibold">
                            autonomous lead handling
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Custom AI sales agent handling 35% of inbound leads
                            autonomously.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Intelligent automation that never sleeps, never
                            misses a lead
                        </p>
                    </div>
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-bold">80%</div>
                        <p className="font-semibold">
                            processing time reduction
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Automated finance pipeline → cut processing time by
                            80%.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Streamlined operations that scale with business
                            growth
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
