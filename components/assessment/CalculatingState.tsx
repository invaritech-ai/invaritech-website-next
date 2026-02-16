"use client";

import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { ServiceBackground } from "@/components/ui/ServiceBackground";

export function CalculatingState() {
    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center px-6">
            <ServiceBackground theme="blue" />
            
            <div className="relative z-10 max-w-xl">
                 <div className="w-24 h-24 mb-12 mx-auto relative">
                    <motion.div 
                        className="absolute inset-0 border-2 border-primary/20 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Loader2 className="w-full h-full animate-spin text-primary stroke-[1px]" />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase">CALIBRATING...</h2>
                <div className="h-10 overflow-hidden mb-12">
                     <motion.div
                        animate={{ y: [0, -40, -80, -120] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="text-xs font-mono tracking-widest text-primary/60 uppercase"
                    >
                        <div className="h-10 flex items-center justify-center">SCRUBBING VOLUME DATA...</div>
                        <div className="h-10 flex items-center justify-center">WEIGHING RISK TOLERANCE...</div>
                        <div className="h-10 flex items-center justify-center">MODELING EFFICIENCY GAINS...</div>
                        <div className="h-10 flex items-center justify-center">FINALIZING ROADMAP...</div>
                    </motion.div>
                </div>

                <div className="p-6 border border-primary/20 bg-primary/5 backdrop-blur-sm animate-pulse">
                    <p className="text-xs font-mono tracking-widest text-primary uppercase leading-loose">
                        DO NOT RELOAD OR NAVIGATE AWAY.<br/>
                        CALCULATION ENGINE IS LOCKED TO SESSION.
                    </p>
                </div>
            </div>

            {/* Global navigation warning UI overlay */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-0 left-0 right-0 z-[60] bg-primary p-2 text-black text-[10px] font-mono tracking-[0.3em] text-center"
             >
                SECURITY LOCKED: DO NOT REFRESH SESSION
             </motion.div>
        </div>
    );
}
