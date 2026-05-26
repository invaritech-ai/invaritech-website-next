// Shared motion variants used across home/landing sections.
// Pre-existing constants extracted from components/exception-automation-home.tsx.

export const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
};

export const stagger = (i: number) => ({
    ...fadeUp,
    transition: { ...fadeUp.transition, delay: 0.05 + i * 0.06 },
});
