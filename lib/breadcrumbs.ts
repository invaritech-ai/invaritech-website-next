export interface BreadcrumbItemInput {
    label: string;
    href?: string;
}

export interface BreadcrumbItem extends BreadcrumbItemInput {
    current: boolean;
}

export function createBreadcrumbItems(
    items: BreadcrumbItemInput[],
): BreadcrumbItem[] {
    const lastIndex = items.length - 1;

    return items.map((item, index) => ({
        ...item,
        current: index === lastIndex,
    }));
}
