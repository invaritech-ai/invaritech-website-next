import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield } from "lucide-react";
import Link from "next/link";

export default function RecentWork() {
    return (
        <section className="bg-muted py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl mb-4">
                        Recent work
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Proof of our capabilities in action.
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto">
                    <CardContent className="p-8">
                        <div className="flex items-start mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    EUDR (France) Compliance Backend
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Built compliance-grade backend APIs and
                                    workflows for data intake, validation,
                                    auditability, and integrations—observable,
                                    secure, and ready to scale.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-sm">
                                    Compliance-grade APIs
                                </span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-sm">
                                    Full audit trails
                                </span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-sm">
                                    Observable from day one
                                </span>
                            </div>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4 mb-6">
                            <h4 className="font-semibold mb-2">
                                Key Deliverables:
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>
                                    • Secure data intake and validation
                                    workflows
                                </li>
                                <li>
                                    • Integration with existing business systems
                                </li>
                                <li>
                                    • Real-time observability and monitoring
                                </li>
                                <li>
                                    • Scalable architecture for future growth
                                </li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <Button asChild variant="outline" size="lg">
                                <Link href="/results#eudr">
                                    Read the mini-case
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
