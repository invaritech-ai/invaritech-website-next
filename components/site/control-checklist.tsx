import { cn } from "@/lib/utils";

type ControlChecklistItem = {
    id: string;
    title: string;
    body: string;
};

type ControlChecklistProps = {
    items: ControlChecklistItem[];
    className?: string;
};

export function ControlChecklist({ items, className }: ControlChecklistProps) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="site-grid-three">
                    {items.map((item, index) => (
                        <article key={item.id} className="site-card">
                            <p className="site-meta">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <h3 className="site-h3 mt-5">{item.title}</h3>
                            <p className="site-body mt-4">{item.body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ControlChecklist;
