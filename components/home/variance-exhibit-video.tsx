import { VarianceExhibit } from "./variance-exhibit";

export function VarianceExhibitVideo() {
    return (
        <figure className="relative border border-border bg-card">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
            <video
                src="/hero/hero.mp4"
                poster="/hero/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Animated AP variance exhibit: 16-week invoice series with two duplicate-candidate outliers flagged in copper."
                className="block aspect-[3/2] w-full"
            >
                <VarianceExhibit />
            </video>
        </figure>
    );
}
