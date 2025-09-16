"use client";

import {
    AWS,
    Python,
    NodeJS,
    Shopify,
    Zapier,
    OpenAI,
} from "@/components/logos";
import { LogoIcon } from "@/components/logo";
import { cn } from "@/lib/utils";

export default function IntegrationsSection() {
    return (
        <section>
            <div className="bg-muted dark:bg-background py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="dark:bg-muted/50 relative mx-auto w-fit">
                        <div
                            role="presentation"
                            className="bg-radial to-muted dark:to-background absolute inset-0 z-10 from-transparent to-75%"
                        />
                        <div className="mx-auto mb-2 flex w-fit justify-center gap-2">
                            <IntegrationCard>
                                <AWS />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Python />
                            </IntegrationCard>
                        </div>
                        <div className="mx-auto my-2 flex w-fit justify-center gap-2">
                            <IntegrationCard>
                                <NodeJS />
                            </IntegrationCard>
                            <IntegrationCard
                                borderClassName="shadow-black-950/10 shadow-xl border-black/25 dark:border-white/25"
                                className="dark:bg-white/10"
                            >
                                <LogoIcon className="!size-12" />
                            </IntegrationCard>
                            <IntegrationCard>
                                <Shopify />
                            </IntegrationCard>
                        </div>

                        <div className="mx-auto flex w-fit justify-center gap-2">
                            <IntegrationCard>
                                <Zapier />
                            </IntegrationCard>

                            <IntegrationCard>
                                <OpenAI />
                            </IntegrationCard>
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-lg space-y-6 text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                            Technologies We Trust
                        </h2>
                        <p className="text-muted-foreground">
                            We use proven tools that deliver performance and
                            reliability
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const IntegrationCard = ({
    children,
    className,
    borderClassName,
}: {
    children: React.ReactNode;
    className?: string;
    borderClassName?: string;
}) => {
    return (
        <div
            className={cn(
                "bg-background relative flex size-20 rounded-xl dark:bg-transparent",
                className
            )}
        >
            <div
                role="presentation"
                className={cn(
                    "absolute inset-0 rounded-xl border border-black/20 dark:border-white/25",
                    borderClassName
                )}
            />
            <div className="relative z-20 m-auto size-fit">{children}</div>
        </div>
    );
};
