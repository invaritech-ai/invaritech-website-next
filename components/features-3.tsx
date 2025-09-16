import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Target, Crown, TrendingUp, Users } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        Why INVARITECH
                    </h2>
                    <p className="mt-4">
                        We don&apos;t just build software—we engineer digital
                        experiences that define the future
                    </p>
                </div>
                <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-4 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Target className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                Precision-engineered solutions
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="text-sm">
                                Every line of code crafted with meticulous
                                attention to detail and performance.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Crown className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                Luxury-grade digital experiences
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                Premium interfaces and seamless user journeys
                                that set you apart from competitors.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <TrendingUp className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                Scalable systems that grow with your vision
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                Architecture designed to evolve with your
                                business from startup to enterprise.
                            </p>
                        </CardContent>
                    </div>

                    <div className="group shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Users className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">
                                Trusted by innovators across industries
                            </h3>
                        </CardHeader>

                        <CardContent className="pb-6">
                            <p className="mt-3 text-sm">
                                Proven track record with forward-thinking
                                companies worldwide.
                            </p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </section>
    );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-16 flex items-center justify-center">
        <div className="bg-muted/50 rounded-xl p-3 shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
            <div className="text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                {children}
            </div>
        </div>
    </div>
);
