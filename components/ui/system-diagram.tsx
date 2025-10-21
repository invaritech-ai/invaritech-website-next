import React from "react";
import { cn } from "@/lib/utils";

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
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
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
                        <svg
                            className="w-8 h-8 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </div>

                    {/* Retrieval/Approvals/Logs */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="bg-blue-500/10 rounded-xl p-4 border-2 border-blue-500/20">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
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
                        <svg
                            className="w-8 h-8 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </div>

                    {/* Business Systems */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="bg-green-500/10 rounded-xl p-4 border-2 border-green-500/20">
                            <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
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
