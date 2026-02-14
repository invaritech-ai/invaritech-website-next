import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Point {
    type: string;
    id: string;
    content: string;
    details: React.ReactNode;
    step?: string;
    side?: string;
}

const thesisPoints: Point[] = [
  {
    type: "thesis",
    id: "thesis-1",
    content: "Keep your stack intact.",
    details: "No rip and replace. We work with what you have.",
  },
  {
    type: "thesis",
    id: "thesis-2",
    content: "Add an intelligence layer where it creates measurable leverage.",
    details: "Target high-friction workflows, not general chat.",
  },
  {
    type: "thesis",
    id: "thesis-3",
    content: "Govern it like production software.",
    details: "Permissions, logs, fallbacks, and rollback mechanisms built-in.",
  },
];

const methodPoints: Point[] = [
  {
    type: "method",
    id: "method-1",
    step: "Identify & Validate",
    content: "Prove one measurable wedge.",
    details: (
      <>
        Start with{" "}
        <Link href="/services/ai-automation-sprint/" className="text-primary hover:underline">
          AI PoC development services
        </Link>{" "}
        to prove one measurable wedge without replatforming. If the objective is lower-friction, deploy{" "}
        <Link href="/services/enterprise-ai-chatbot-deployment/" className="text-primary hover:underline">
          AI chatbot development services
        </Link>{" "}
        as a governed, cost-controlled entry point.
      </>
    ),
  },
  {
    type: "method",
    id: "method-2",
    step: "Operationalize",
    content: "Expand across teams.",
    details: (
      <>
        Once ROI is validated, expand through{" "}
        <Link href="/services/ai-workflow-automation-services/" className="text-primary hover:underline">
          workflow automation consulting services
        </Link>{" "}
        and{" "}
        <Link href="/services/ai-integration-services/" className="text-primary hover:underline">
          AI integration services
        </Link>{" "}
        to operationalize the system across teams.
      </>
    ),
  },
  {
    type: "method",
    id: "method-3",
    step: "Scale",
    content: "Harden and protect.",
    details: (
      <>
        When scale becomes the priority, implement{" "}
        <Link href="/services/generative-ai-backend-development/" className="text-primary hover:underline">
          generative AI development services
        </Link>{" "}
        and{" "}
        <Link href="/services/ai-automation-consulting/" className="text-primary hover:underline">
           AI automation consulting services
        </Link>{" "}
        to harden architecture, control cost, and protect margins.
      </>
    ),
  },
];

export function CoreThesisSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 px-6 bg-black text-white overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Headers */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-24 md:mb-32">
            <div className="md:text-right">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                    <span className="text-primary block">CORE THESIS</span>
                    LAYERED INTELLIGENCE
                </h2>
                <p className="text-muted-foreground text-lg max-w-md ml-auto">
                    Most AI projects fail because they replace systems of record. We do the opposite.
                </p>
            </div>
             <div className="md:text-left flex flex-col justify-end">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                    <span className="text-white/50 block">THE METHOD</span>
                    EXECUTION PROTOCOL
                </h2>
            </div>
        </div>


        {/* The Neural Bridge (Central Spine) */}
        <div className="relative">
             {/* Central Line - Background */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            
             {/* Central Line - Active (Scroll Progress) */}
            <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-blue-500 to-purple-500 md:-translate-x-1/2 origin-top"
            />

            <div className="space-y-24 md:space-y-32 relative pb-32">
                {[...thesisPoints, ...methodPoints].map((point, index) => (
                    <ThesisCard key={point.id} point={point} index={index} />
                ))}
            </div>

             {/* Closing Statement */}
             <div className="relative z-10 mt-32 max-w-4xl mx-auto text-center">
                 <div className="inline-block p-px bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full mb-8">
                     <div className="bg-black/80 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10">
                         <span className="text-primary font-mono text-sm tracking-widest uppercase">
                             Efficiency without Destruction
                         </span>
                     </div>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-bold mb-8">
                     We do not burn money on AI where simpler systems work better.
                 </h3>
                 <div className="flex flex-wrap justify-center gap-4">
                     <Link href="/services/ai-automation-sprint/">
                        <button className="group relative px-8 py-4 bg-primary text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center">
                                Start with the Sprint <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                     </Link>
                 </div>
             </div>

        </div>
      </div>
    </section>
  );
}

function ThesisCard({ point, index }: { point: Point, index: number }) {
    const isEven = index % 2 === 0;
    const isThesis = point.type === "thesis";
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

    return (
        <div ref={ref} className={cn(
            "relative md:flex items-center justify-between group",
            isEven ? "md:flex-row" : "md:flex-row-reverse"
        )}>
            {/* Connector Dot */}
            <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 md:-translate-x-1/2 z-10 transition-colors duration-500 group-hover:border-primary group-hover:bg-primary/20">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full h-full bg-primary rounded-full origin-center"
                />
            </div>

             {/* Connector Line (Mobile) */}
             <div className="md:hidden absolute left-[20px] top-1/2 w-8 h-px bg-white/20" />


            {/* Content Card */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (isEven ? -50 : 50), filter: isInView ? "blur(0px)" : "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "ml-[60px] md:ml-0 md:w-[45%] p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-primary/30",
                    isThesis ? "hover:shadow-[0_0_30px_-5px_var(--color-primary)] hover:shadow-primary/10" : "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] hover:shadow-blue-500/10"
                )}
            >
                {point.step && (
                    <div className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-4 border-b border-primary/20 pb-2 inline-block">
                        Step 0{index - 2}
                    </div>
                )}
                
                <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {point.content}
                </h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    {point.details}
                </p>
                
                <div className="absolute top-4 right-4 text-white/5 font-bold text-6xl pointer-events-none select-none">
                    {index + 1}
                </div>
            </motion.div>

            {/* Empty space for the other side */}
            <div className="md:w-[45%]" />
        </div>
    );
}

// Add these to your globals or a safe place if type safety is strictly enforced on 'point'
// interface Point {
//     type: 'thesis' | 'method';
//     id: string;
//     content: string;
//     details: string;
//     step?: string;
// }
