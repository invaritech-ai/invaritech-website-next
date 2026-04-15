import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden bg-card py-24 md:py-32">
            <div className="absolute top-0 left-0 h-[1px] w-full editorial-divider-full" />

            <div className="mx-auto max-w-7xl space-y-10 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center md:space-y-8">
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-[11px] font-mono text-primary/50">05</span>
                        <div className="h-[1px] w-6 bg-primary/30" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                            Phase 2: Client Signal
                        </p>
                    </div>
                    <h2 className="font-editorial text-5xl font-semibold leading-[0.9] tracking-tight text-foreground md:text-7xl">
                        Trusted by Operators
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Verified feedback from our Google Business Profile.
                    </p>
                    <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-primary">
                        <span className="text-sm leading-none">★★★★★</span>
                        <span>5.0 on Google Business Profile</span>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <Card className="rounded-none border-border bg-background shadow-none">
                        <CardHeader className="pb-3">
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                                API Delivery
                            </p>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-lg font-medium leading-relaxed">
                                    “Aditi and her team did an excellent job
                                    with the development of an API with the
                                    EU&apos;s TRACES platform for our business.
                                    They are extremely professional, and we were
                                    very impressed by their skills, knowledge
                                    and reactivity. I wouldn&apos;t hesitate to
                                    recommend them.”
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12 border border-border bg-card">
                                        <AvatarFallback>MB</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-medium">
                                            Matthew Baldwin
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            Founder, Baldwin Consultancies
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="rounded-none border-border bg-background shadow-none">
                        <CardHeader className="pb-3">
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                                Website Rebuild
                            </p>
                        </CardHeader>
                        <CardContent className="h-full pt-0">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-lg font-medium leading-relaxed">
                                    “We are grateful to Invaritech for taking
                                    on our project with such professionalism and
                                    attention to detail. Their team guided us
                                    step by step, helping us update and refine
                                    our website pages and sections. The revised
                                    website now better serves our community.”
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12 border border-border bg-card">
                                        <AvatarFallback>CC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">
                                            China Coast Community
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            Charity Organization
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
