import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Users } from "lucide-react";

interface MiniCaseProps {
    context: {
        industry: string;
        teamSize: string;
        targetWorkflow: string;
    };
    baseline: {
        volume: string;
        aht: string;
        errors: string;
        sla: string;
    };
    intervention: {
        lane: string;
        features: string[];
    };
    outcome: {
        hoursSaved: string;
        costAvoided: string;
        slaChange: string;
        errorDeltas: string;
    };
    proof?: {
        description: string;
        imageUrl?: string;
    };
}

export function MiniCase({
    context,
    baseline,
    intervention,
    outcome,
    proof,
}: MiniCaseProps) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Case Study</h3>
                    <Badge variant="outline">Verified Results</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Context */}
                <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Context
                    </h4>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Industry:
                            </span>
                            <span className="font-medium">
                                {context.industry}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Team Size:
                            </span>
                            <span className="font-medium">
                                {context.teamSize}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Target Workflow:
                            </span>
                            <span className="font-medium">
                                {context.targetWorkflow}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Baseline */}
                <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Baseline
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-xs text-red-600 font-medium mb-1">
                                Volume
                            </p>
                            <p className="text-sm font-semibold text-red-800">
                                {baseline.volume}
                            </p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-xs text-red-600 font-medium mb-1">
                                AHT
                            </p>
                            <p className="text-sm font-semibold text-red-800">
                                {baseline.aht}
                            </p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-xs text-red-600 font-medium mb-1">
                                Errors
                            </p>
                            <p className="text-sm font-semibold text-red-800">
                                {baseline.errors}
                            </p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-xs text-red-600 font-medium mb-1">
                                SLA
                            </p>
                            <p className="text-sm font-semibold text-red-800">
                                {baseline.sla}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Intervention */}
                <div>
                    <h4 className="font-semibold mb-3">Intervention</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-blue-800 mb-2">
                            Lane: {intervention.lane}
                        </p>
                        <div className="space-y-1">
                            {intervention.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center text-sm"
                                >
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                                    <span className="text-blue-700">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Outcome */}
                <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Outcome
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-green-600 font-medium mb-1">
                                Hours Saved
                            </p>
                            <p className="text-sm font-semibold text-green-800">
                                {outcome.hoursSaved}
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-green-600 font-medium mb-1">
                                Cost Avoided
                            </p>
                            <p className="text-sm font-semibold text-green-800">
                                {outcome.costAvoided}
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-green-600 font-medium mb-1">
                                SLA Change
                            </p>
                            <p className="text-sm font-semibold text-green-800">
                                {outcome.slaChange}
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-green-600 font-medium mb-1">
                                Error Reduction
                            </p>
                            <p className="text-sm font-semibold text-green-800">
                                {outcome.errorDeltas}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Proof */}
                {proof && (
                    <div>
                        <h4 className="font-semibold mb-3">Proof</h4>
                        <div className="bg-muted/30 rounded-lg p-4">
                            <p className="text-sm text-muted-foreground mb-2">
                                {proof.description}
                            </p>
                            {proof.imageUrl && (
                                <div className="mt-3 bg-muted rounded-lg p-4 text-center">
                                    <p className="text-xs text-muted-foreground">
                                        Instrumentation screenshot or anonymized
                                        graph
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
