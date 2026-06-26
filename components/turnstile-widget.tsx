"use client";

import { forwardRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface TurnstileWidgetProps {
    onSuccess: (token: string) => void;
    onError?: () => void;
    onExpire?: () => void;
}

export const TurnstileWidget = forwardRef<TurnstileInstance, TurnstileWidgetProps>(
    function TurnstileWidget({ onSuccess, onError, onExpire }, ref) {
        const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
        if (!siteKey) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(
                    "[TurnstileWidget] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set; skipping the Turnstile challenge. The form stays gated until a site key is configured.",
                );
            }
            return null;
        }
        return (
            <Turnstile
                ref={ref}
                siteKey={siteKey}
                onSuccess={onSuccess}
                onError={onError}
                onExpire={onExpire}
                options={{ theme: "light" }}
            />
        );
    }
);
