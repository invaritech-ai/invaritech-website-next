import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
    children: ReactNode;
    className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
    return <main className={cn("site-page", className)}>{children}</main>;
}

export default PageShell;
