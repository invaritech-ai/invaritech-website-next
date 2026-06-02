"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type WorkflowDiagramLabels = {
    currentStack: string;
    controlLayer: string;
    outcomes: string;
};

type WorkflowDiagramProps = {
    currentStack: string[];
    controlLayer: string[];
    outcomes: string[];
    labels?: WorkflowDiagramLabels;
    className?: string;
};

function ChevronRight() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden
        >
            <path d="M9 6l6 6-6 6" />
        </svg>
    );
}

function ChevronDown() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

function Connector({ delay, reduce }: { delay: number; reduce: boolean }) {
    return (
        <div
            aria-hidden
            className="flex shrink-0 items-center justify-center text-accent"
        >
            {/* Desktop: horizontal pipe between columns */}
            <div className="hidden items-center md:flex md:w-12 lg:w-16">
                <motion.span
                    className="block h-px w-full origin-left bg-accent/50"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={reduce ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay, ease: "easeOut" }}
                />
                <ChevronRight />
            </div>
            {/* Mobile: vertical pipe between stacked cards */}
            <div className="flex flex-col items-center py-3 md:hidden">
                <motion.span
                    className="block h-6 w-px origin-top bg-accent/50"
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={reduce ? undefined : { scaleY: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay, ease: "easeOut" }}
                />
                <ChevronDown />
            </div>
        </div>
    );
}

export function WorkflowDiagram({
    currentStack,
    controlLayer,
    outcomes,
    labels,
    className,
}: WorkflowDiagramProps) {
    const reduce = useReducedMotion() ?? false;

    const columns = [
        {
            id: "current-stack",
            title: labels?.currentStack,
            items: currentStack,
            emphasis: false,
        },
        {
            id: "control-layer",
            title: labels?.controlLayer,
            items: controlLayer,
            emphasis: true,
        },
        {
            id: "outcomes",
            title: labels?.outcomes,
            items: outcomes,
            emphasis: false,
        },
    ];

    if (columns.every((column) => column.items.length === 0)) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="flex flex-col md:flex-row md:items-stretch">
                    {columns.map((column, index) => (
                        <Fragment key={column.id}>
                            {index > 0 ? (
                                <Connector
                                    delay={0.15 + index * 0.12}
                                    reduce={reduce}
                                />
                            ) : null}
                            <motion.article
                                initial={
                                    reduce ? false : { opacity: 0, y: 12 }
                                }
                                whileInView={
                                    reduce ? undefined : { opacity: 1, y: 0 }
                                }
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={cn(
                                    "site-card relative flex-1 border border-border transition-colors hover:border-accent/50",
                                    column.emphasis
                                        ? "border-accent/30"
                                        : undefined,
                                )}
                            >
                                {column.emphasis ? (
                                    <span
                                        aria-hidden
                                        className="absolute inset-x-0 top-0 h-0.5 bg-accent"
                                    />
                                ) : null}
                                {column.title ? (
                                    <h3 className="site-h3">{column.title}</h3>
                                ) : null}
                                {column.items.length > 0 ? (
                                    <ul className="mt-6 space-y-3">
                                        {column.items.map((item) => (
                                            <li
                                                key={item}
                                                className="site-body text-base md:text-base"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </motion.article>
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
