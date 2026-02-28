"use client";

import { useCallback, useEffect, useRef } from "react";

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string }
            ) => Promise<string>;
        };
    }
}

interface UseRecaptchaOptions {
    siteKey: string;
    action: string;
}

export const useRecaptcha = ({ siteKey, action }: UseRecaptchaOptions) => {
    const isLoaded = useRef(false);

    useEffect(() => {
        if (typeof window !== "undefined" && !isLoaded.current) {
            const script = document.createElement("script");
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            isLoaded.current = true;
        }
    }, [siteKey]);

    const executeRecaptcha = useCallback((): Promise<string | null> => {
        return new Promise((resolve) => {
            if (typeof window === "undefined" || !window.grecaptcha) {
                console.error("reCAPTCHA not loaded");
                resolve(null);
                return;
            }

            window.grecaptcha.ready(async () => {
                try {
                    const token = await window.grecaptcha.execute(siteKey, { action });
                    resolve(token);
                } catch (error) {
                    console.error("reCAPTCHA execution failed:", error);
                    resolve(null);
                }
            });
        });
    }, [siteKey, action]);

    return { executeRecaptcha };
};
