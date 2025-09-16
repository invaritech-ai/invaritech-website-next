import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">
                        Trusted by Innovators
                    </h2>
                    <p>
                        Join the leaders who've already transformed their
                        businesses with INVARITECH
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="p-6">
                        <CardContent className="pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-lg font-medium">
                                    "INVARITECH transformed our entire backend
                                    architecture. The level of precision and
                                    attention to detail is unmatched. Our system
                                    performance improved by 300%."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">
                                            Sarah Chen
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            CTO, TechFlow Solutions
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardContent className="pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-lg font-medium">
                                    "Working with INVARITECH was like having a
                                    team of senior engineers dedicated to our
                                    vision. They delivered beyond expectations,
                                    on time and on budget."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback>MR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">
                                            Marcus Rodriguez
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            CEO, Luxe Commerce
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardContent className="pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-lg font-medium">
                                    "The AI automation solutions they built for
                                    us are game-changing. What used to take our
                                    team hours now happens automatically. Truly
                                    intelligent systems."
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback>EW</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">
                                            Dr. Emily Watson
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            Founder, MedTech Innovations
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
