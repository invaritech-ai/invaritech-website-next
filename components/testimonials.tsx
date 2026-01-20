import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">
                        Built by makers, loved by thousands of developers
                    </h2>
                    <p>
                        INVARITECH is evolving to be more than just the models.
                        It supports an entire ecosystem of APIs and platforms
                        helping developers and businesses innovate.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
                    {/* Large featured testimonial - spans 2 columns and 2 rows */}
                    <Card className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                        <CardHeader className="pb-3">
                        </CardHeader>
                        <CardContent className="pt-0">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">
                                    INVARITECH has transformed the way I develop
                                    web applications. Their extensive collection
                                    of UI components, blocks, and templates has
                                    significantly accelerated my workflow. The
                                    flexibility to customize every aspect allows
                                    me to create unique user experiences.
                                    INVARITECH is a game-changer for modern web
                                    development.
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/shekinah.webp"
                                            alt="Shekinah Tshiokufila"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>ST</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-medium">
                                            Shekinah Tshiokufila
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            Software Engineer
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Medium testimonial - spans 2 columns */}
                    <Card className="sm:col-span-2 lg:col-span-2">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">
                                    INVARITECH is really extraordinary and very
                                    practical, no need to break your head. A
                                    real gold mine.
                                </p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/jonathan.webp"
                                            alt="Jonathan Yombo"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>JY</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">
                                            Jonathan Yombo
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            Software Engineer
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Small testimonial */}
                    <Card>
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>
                                    Great work on the INVARITECH platform. This
                                    is one of the best development experiences I
                                    have seen so far!
                                </p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/yucel.webp"
                                            alt="Yucel Faruksahan"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>YF</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">
                                            Yucel Faruksahan
                                        </cite>
                                        <span className="text-muted-foreground block text-sm">
                                            Creator, Tailkits
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>

                    {/* Small testimonial */}
                    <Card>
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>
                                    The precision and attention to detail in
                                    INVARITECH&apos;s solutions is unmatched.
                                    Truly premium quality.
                                </p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/rodrigo.webp"
                                            alt="Rodrigo Aguilar"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>RA</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Rodrigo Aguilar
                                        </p>
                                        <span className="text-muted-foreground block text-sm">
                                            Creator, TailwindAwesome
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
