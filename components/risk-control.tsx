import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function RiskControl() {
    return (
        <section className="bg-muted py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        Risk control
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Milestone Gate—no free work, no refunds
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Payment Structure */}
                    <Card className="text-center p-6">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                40% at kickoff
                            </h3>
                            <p className="text-muted-foreground">
                                Initial payment to begin discovery and
                                development work.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Milestone Gate */}
                    <Card className="text-center p-6 border-2 border-orange-200 bg-orange-50/50">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Week 3 Milestone Gate
                            </h3>
                            <p className="text-muted-foreground">
                                Present crude PoC. If accepted: pay remaining
                                60% and we polish to production v1 by day 60.
                            </p>
                        </CardContent>
                    </Card>

                    {/* No Risk */}
                    <Card className="text-center p-6">
                        <CardContent className="pt-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                If not accepted
                            </h3>
                            <p className="text-muted-foreground">
                                Engagement pauses. You keep artifacts and code
                                delivered to date. No refunds/credits.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/ops-efficiency-sprint#milestone-gate">
                            Review acceptance criteria
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
