import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Globe } from "lucide-react";

export default function WhoWeHelp() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        Who we help
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ops leaders at growth companies who want measurable
                        efficiency fast—without a platform rip-and-replace.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Company Size */}
                    <Card className="text-center p-6">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                200–2,000 employees
                            </h3>
                            <p className="text-muted-foreground">
                                Growth companies with established operations and
                                clear efficiency opportunities.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Geographic Focus */}
                    <Card className="text-center p-6">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Global reach
                            </h3>
                            <p className="text-muted-foreground">
                                EU/UK, North America, and Australia/NZ—with
                                compliance-grade solutions for each region.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Focus Area */}
                    <Card className="text-center p-6">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Measurable outcomes
                            </h3>
                            <p className="text-muted-foreground">
                                Operations, support, and finance teams ready to
                                track ROI and efficiency gains.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
