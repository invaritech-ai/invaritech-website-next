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
            src="/invaritech-icon.svg"
            alt="Invaritech Icon"
            width={512}
            height={512}
            className={cn(
                "size-8",
                className
            )}
            unoptimized
        />
    );
};
