"use client";

import { ArrowRight, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LeadCaptureFormProps {
    onSubmit: (e: React.FormEvent) => void;
    leadData: {
        name: string;
        email: string;
        company: string;
        phone: string;
    };
    onChange: (data: LeadCaptureFormProps['leadData']) => void;
    isSubmitting: boolean;
}

const VisionaryContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("border border-white/10 bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-none relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 w-24 h-[1px] bg-primary/50" />
        <div className="absolute top-0 left-0 w-[1px] h-24 bg-primary/50" />
        {children}
    </div>
);

const VisionaryLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <Label className={cn("text-xs font-mono tracking-widest uppercase text-muted-foreground mb-3 block", className)}>
        {children}
    </Label>
);

export function LeadCaptureForm({ onSubmit, leadData, onChange, isSubmitting }: LeadCaptureFormProps) {
    return (
        <div className="max-w-xl mx-auto">
            <VisionaryContainer className="pt-20">
                <div className="absolute top-8 left-12">
                    <BarChart3 className="w-16 h-16 text-primary/20" />
                </div>
                <h2 className="text-4xl font-bold tracking-tighter mb-4 uppercase">Almost There</h2>
                <p className="text-muted-foreground font-light mb-12">
                    Submit your credentials to decrypt your custom roadmap and efficiency matrix.
                </p>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <VisionaryLabel>Identity</VisionaryLabel>
                            <Input
                                required
                                placeholder="JANE DOE"
                                className="h-14 rounded-none border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest placeholder:text-white/20"
                                value={leadData.name}
                                onChange={(e) => onChange({...leadData, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-4">
                            <VisionaryLabel>Communication</VisionaryLabel>
                            <Input
                                required
                                type="email"
                                placeholder="JANE@CORP.COM"
                                className="h-14 rounded-none border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest placeholder:text-white/20"
                                value={leadData.email}
                                onChange={(e) => onChange({...leadData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <VisionaryLabel>Organization</VisionaryLabel>
                        <Input
                            required
                            placeholder="ACME SYSTEMS"
                            className="h-14 rounded-none border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest placeholder:text-white/20"
                            value={leadData.company}
                            onChange={(e) => onChange({...leadData, company: e.target.value})}
                        />
                    </div>
                    <MagneticButton type="submit" className="w-full h-16 text-lg mt-4 group" disabled={isSubmitting}>
                        {isSubmitting ? "PROCESSING..." : "GENERATE ASSESSMENT"} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                    
                    <div className="mt-8 space-y-4">
                        <p className="text-[10px] text-center font-mono tracking-widest text-muted-foreground opacity-50 uppercase">
                            Protected by reCAPTCHA Enterprise
                        </p>
                        <p className="text-[9px] text-center text-muted-foreground/40 leading-relaxed uppercase">
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a href="https://policies.google.com/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</a> and{" "}
                            <a href="https://policies.google.com/terms" className="underline hover:text-primary transition-colors">Terms of Service</a> apply.
                        </p>
                    </div>
                </form>
            </VisionaryContainer>
        </div>
    );
}
