/**
 * Decorative glint that sweeps along a section's top rule as it scrolls
 * into view. Pure markup: the sweep itself is scrubbed by GSAP in
 * homepage-scroll-animations.tsx via [data-glint]. The parent section
 * must be position: relative. Invisible (off-track) until animated.
 */
export function RuleGlint() {
    return (
        <span aria-hidden="true" className="rule-glint-track">
            <span data-glint className="rule-glint" />
        </span>
    );
}
