import React from "react";
import { cn } from "@/lib/utils";
import { FileText, ArrowRight, Lightbulb, Server } from "lucide-react";

interface SystemDiagramProps {
    className?: string;
}

export function SystemDiagram({ className }: SystemDiagramProps) {
    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <div className="bg-muted/30 rounded-2xl p-8 border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Data & Docs */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="bg-primary/10 rounded-xl p-4 border-2 border-primary/20">
                            <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-sm">
                                Data & Docs
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Policies, procedures, forms
                            </p>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                        <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>

                    {/* Retrieval/Approvals/Logs */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="bg-blue-500/10 rounded-xl p-4 border-2 border-blue-500/20">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <Lightbulb className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-sm">
                                Retrieval/Approvals/Logs
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                AI-powered processing
                            </p>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                        <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>

                    {/* Business Systems */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="bg-green-500/10 rounded-xl p-4 border-2 border-green-500/20">
                            <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <Server className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-sm">
                                Business Systems
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                CRM, ERP, workflows
                            </p>
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                        SSO/RBAC
                    </div>
                    <div className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">
                        Audit Logs
                    </div>
                    <div className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                        Data Residency
                    </div>
                </div>
            </div>
        </div>
    );
}
