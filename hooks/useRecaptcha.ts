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

    const executeRecaptcha = useCallback(async (): Promise<string | null> => {
        if (typeof window === "undefined" || !window.grecaptcha) {
            console.error("reCAPTCHA not loaded");
            return null;
        }

        try {
            return await window.grecaptcha.execute(siteKey, { action });
        } catch (error) {
            console.error("reCAPTCHA execution failed:", error);
            return null;
        }
    }, [siteKey, action]);

    return { executeRecaptcha };
};
