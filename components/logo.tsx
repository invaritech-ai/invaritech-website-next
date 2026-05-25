import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({
    className,
}: {
    className?: string;
    uniColor?: boolean;
}) => {
    return (
        <Image
            src="/logo-text.png"
            alt="Invaritech Logo"
            width={480}
            height={64}
            className={cn(
                "h-8 w-auto",
                className
            )}
            priority
        />
    );
};

export const LogoIcon = ({
    className,
}: {
    className?: string;
    uniColor?: boolean;
}) => {
    return (
        <Image
            src="/logo-image.png"
            alt="Invaritech Icon"
            width={32}
            height={32}
            className={cn(
                "size-8",
                className
            )}
        />
    );
};
