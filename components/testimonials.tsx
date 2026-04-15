import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">
                        Trusted by operators who ship real systems
                    </h2>
                    <p className="text-muted-foreground">
                        Verified feedback from our Google Business Profile.
                    </p>
                    <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-primary">
                        <span className="text-sm leading-none">★★★★★</span>
                        <span>5.0 on Google Business Profile</span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
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
                                    <Avatar className="size-12">
                                        <AvatarImage src="" alt="Matthew Baldwin" />
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

                    <Card>
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
                                    <Avatar className="size-12">
                                        <AvatarImage src="" alt="China Coast Community" />
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
