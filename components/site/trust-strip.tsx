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
                </div>
            </div>
        </section>
    );
}

export default TrustStrip;
