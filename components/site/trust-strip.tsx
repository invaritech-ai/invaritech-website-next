import { cn } from "@/lib/utils";

type TrustStripProps = {
    items: string[];
    className?: string;
};

export function TrustStrip({ items, className }: TrustStripProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="site-grid-three">
                    {items.map((item) => (
                        <div key={item} className="site-card">
                            <p className="site-meta">{item}</p>
                        </div>
                    ))}
                    {Array.from({ length: (3 - (items.length % 3)) % 3 }).map(
                        (_, fillerIndex) => (
                            <div
                                key={`trust-filler-${fillerIndex}`}
                                aria-hidden
                                className="hidden bg-background md:block"
                            />
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
