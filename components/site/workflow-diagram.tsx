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

export function WorkflowDiagram({
    currentStack,
    controlLayer,
    outcomes,
    labels,
    className,
}: WorkflowDiagramProps) {
    const columns = [
        {
            id: "current-stack",
            title: labels?.currentStack,
            items: currentStack,
        },
        {
            id: "control-layer",
            title: labels?.controlLayer,
            items: controlLayer,
        },
        {
            id: "outcomes",
            title: labels?.outcomes,
            items: outcomes,
        },
    ];

    if (columns.every((column) => column.items.length === 0)) {
        return null;
    }

    return (
        <section className={cn("site-section", className)}>
            <div className="site-container">
                <div className="site-grid-three">
                    {columns.map((column) => (
                        <article key={column.id} className="site-card">
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
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
