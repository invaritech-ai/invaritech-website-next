"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BubbleChat = dynamic(
    () => import("flowise-embed-react").then((mod) => mod.BubbleChat),
    {
        ssr: false,
    }
);

export const Chatbot = () => {
    const irisIconSrc = "/iris.png";
    const PRIMARY_COLOR = "#D97706"; // Amber/Orange to match site accents
    const BG_COLOR = "#050505";
    const MUTED_COLOR = "#A3A3A3";
    const BOT_BG = "#171717";
    const USER_BG = "#262626";
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const updateIsMobile = () => setIsMobile(mediaQuery.matches);
        updateIsMobile();

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", updateIsMobile);
            return () => mediaQuery.removeEventListener("change", updateIsMobile);
        }

        mediaQuery.addListener(updateIsMobile);
        return () => mediaQuery.removeListener(updateIsMobile);
    }, []);

    const mobileMode = isMobile ?? false;
    const bubbleSize = mobileMode ? 60 : 80;
    const bubbleRight = mobileMode ? 12 : 20;
    const bubbleBottom = mobileMode ? 12 : 20;
    const chatWindowOffset = bubbleBottom + bubbleSize + 10;
    const chatWindowHeight = mobileMode ? 500 : 550;
    const chatWindowWidth = mobileMode ? 360 : 400;

    useEffect(() => {
        const findAndClickChatButton = () => {
            // Method 1: Find by our custom icon image
            const irisImages = document.querySelectorAll(
                'img[src*="iris.png"]'
            );
            for (const img of irisImages) {
                // Find the closest clickable parent (button or div with onclick)
                let parent = img.parentElement;
                while (parent) {
                    if (
                        parent.tagName === "BUTTON" ||
                        parent.getAttribute("role") === "button" ||
                        parent.onclick ||
                        parent.style.cursor === "pointer"
                    ) {
                        (parent as HTMLElement).click();
                        return true;
                    }
                    parent = parent.parentElement;
                }
            }

            // Method 2: Find flowise-chatbot custom element and its bubble button
            const flowiseElement = document.querySelector("flowise-chatbot");
            if (flowiseElement) {
                // Try shadow DOM
                const shadowRoot = flowiseElement.shadowRoot;
                if (shadowRoot) {
                    const bubbleButton = shadowRoot.querySelector(
                        "button"
                    ) as HTMLElement;
                    if (bubbleButton) {
                        bubbleButton.click();
                        return true;
                    }
                }
            }

            // Method 3: Find any clickable element at bottom-right corner
            const elements = document.elementsFromPoint(
                window.innerWidth - 40,
                window.innerHeight - 40
            );
            for (const el of elements) {
                if (
                    el.tagName === "BUTTON" ||
                    el.tagName === "DIV" ||
                    el.tagName === "SPAN"
                ) {
                    const rect = el.getBoundingClientRect();
                    // Check if it's a small floating element (chat button size)
                    if (rect.width < 100 && rect.height < 100) {
                        (el as HTMLElement).click();
                        return true;
                    }
                }
            }
            return false;
        };

        const handleKeyboardShortcut = (event: KeyboardEvent) => {
            // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                event.stopPropagation();
                findAndClickChatButton();
            }
        };

        // Polling to add data-lenis-prevent to Shadow DOM scroll container
        const interval = setInterval(() => {
            const flowise = document.querySelector("flowise-chatbot");
            if (flowise && flowise.shadowRoot) {
                const scrollables = flowise.shadowRoot.querySelectorAll(
                    '.chatbot-chat-view, div[class*="messages-container"], .rcb-chat-body'
                );
                scrollables.forEach((el) => {
                    if (!el.hasAttribute("data-lenis-prevent")) {
                        el.setAttribute("data-lenis-prevent", "");
                        // Also force pointer events just in case
                        (el as HTMLElement).style.pointerEvents = "auto";
                        (el as HTMLElement).style.overscrollBehavior = "contain";
                    }
                });
            } else {
                 // Fallback for non-shadow DOM implementations
                 const scrollables = document.querySelectorAll(
                    '.chatbot-chat-view, div[class*="messages-container"], .rcb-chat-body'
                );
                scrollables.forEach((el) => {
                    if (!el.hasAttribute("data-lenis-prevent")) {
                        el.setAttribute("data-lenis-prevent", "");
                        (el as HTMLElement).style.pointerEvents = "auto";
                        (el as HTMLElement).style.overscrollBehavior = "contain";
                    }
                });
            }
        }, 1000);

        // Use capture phase to intercept before other handlers
        window.addEventListener("keydown", handleKeyboardShortcut, true);

        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcut, true);
            clearInterval(interval);
        };
    }, []);

    if (isMobile === null) return null;

    return (
        <BubbleChat
            key={mobileMode ? "mobile" : "desktop"}
            chatflowid="a6759d77-8fe9-459f-abb2-7a9aacd22ccf"
            apiHost="https://flowise.avishekmajumder.com"
            chatflowConfig={{
                returnSourceDocuments: false,
            }}
            observersConfig={{
                observeUserInput: () => {},
                observeLoading: () => {},
                observeMessages: () => {},
            }}
            theme={{
                button: {
                    backgroundColor: "#000000",
                    right: bubbleRight,
                    bottom: bubbleBottom,
                    size: bubbleSize,
                    dragAndDrop: !mobileMode,
                    iconColor: "white",
                    customIconSrc: irisIconSrc,
                    autoWindowOpen: {
                        autoOpen: false,
                        openDelay: 2,
                        autoOpenOnMobile: false,
                    },
                },
                tooltip: {
                    showTooltip: !mobileMode,
                    tooltipMessage: "Ask Iris",
                    tooltipBackgroundColor: "#000000",
                    tooltipTextColor: "white",
                    tooltipFontSize: 12,
                },
                disclaimer: {
                    title: "System Note",
                    message:
                        'By accessing this terminal, you agree to the <a target="_blank" href="https://www.invaritech.ai/terms/" style="color: #D97706; text-decoration: underline;">Protocols</a>',
                    textColor: MUTED_COLOR,
                    buttonColor: PRIMARY_COLOR,
                    buttonText: "INITIALIZE LINK",
                    buttonTextColor: "black",
                    blurredBackgroundColor: "rgba(0, 0, 0, 0.8)",
                    backgroundColor: BG_COLOR,
                },
                customCSS: `
                    .flowise-process-flow, .source-docs, .source-documents-container {
                        display: none !important;
                    }
                    /* Position the outer fixed wrapper — applies to both .chatbot-container AND the close button */
                    div.fixed {
                        bottom: calc(env(safe-area-inset-bottom, 0px) + ${chatWindowOffset}px) !important;
                        right: ${bubbleRight}px !important;
                    }
                    /* Force Dark Mode Overrides */
                    .chatbot-container {
                        border: 1px solid #D97706 !important; /* Thin orange outline for window */
                        box-shadow: 0 20px 50px rgba(0,0,0,0.5) !important;
                        font-family: 'IBM Plex Mono', monospace !important;
                        max-height: min(78dvh, calc(100vh - 140px)) !important;
                    }
                    /* Fix Close Button — override Flowise's right-[-8px] that pushes it outside */
                    button[class*="absolute"][class*="right-"] {
                        right: 4px !important;
                        top: 4px !important;
                        margin: 0 !important;
                    }

                    /* Mobile Responsiveness */
                    @media (max-width: 640px) {
                        div.fixed {
                            width: min(92vw, 360px) !important;
                            right: 12px !important;
                            bottom: calc(env(safe-area-inset-bottom, 0px) + 82px) !important;
                        }
                        .chatbot-container {
                            max-height: min(68dvh, 500px) !important;
                        }
                    }

                    /* Attempt to target button if accessible */
                    button[class*="bubble"] {
                         border: 1px solid #D97706 !important;
                    }
                    .chatbot-header {
                        border-bottom: 1px solid #333 !important;
                    }
                    /* Make header avatar bigger and glowing */
                    .chatbot-header img {
                        width: 60px !important;
                        height: 60px !important;
                        max-width: 60px !important;
                        border: 1px solid #D97706 !important;
                        box-shadow: 0 0 15px rgba(217, 119, 6, 0.2);
                        border-radius: 50%;
                        object-fit: cover !important;
                    }
                    .chatbot-input {
                        background-color: ${BOT_BG} !important;
                        border-top: 1px solid #333 !important;
                        color: white !important;
                    }
                    .chatbot-input textarea {
                        color: white !important;
                    }
                    .guest-message {
                         background-color: ${USER_BG} !important;
                         color: white !important;
                         border: 1px solid #444 !important;
                    }
                    .bot-message {
                        background-color: ${BOT_BG} !important;
                        color: #e5e5e5 !important;
                        border: 1px solid #333 !important;
                    }
                    /* Scroll Fixes & Styling */
                    div[class*="start-messages-container"],
                    div[class*="messages-container"],
                    div[part="messages-container"],
                    .chatbot-chat-view,
                    .rcb-chat-body {
                        overflow-y: auto !important;
                        scrollbar-width: thin !important;
                        scrollbar-color: #D97706 transparent !important;
                        height: 100% !important;
                        display: flex !important;
                        flex-direction: column !important;
                        overscroll-behavior: contain !important;
                    }
                    ::-webkit-scrollbar {
                        width: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background: transparent; 
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #D97706; 
                        border-radius: 3px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #B45309; 
                    }
                `,
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: false,
                    title: "IRIS // INTELLIGENCE",
                    titleAvatarSrc: irisIconSrc,
                    welcomeMessage:
                        "System Online. I can assess your automation potential. What process is currently inefficient?",
                    errorMessage:
                        "Connection Interrupted. Retrying...",
                    backgroundColor: BG_COLOR,
                    backgroundImage: "",
                    height: chatWindowHeight,
                    width: chatWindowWidth,
                    fontSize: 14,
                    starterPrompts: [
                        "Analyze my workflow",
                        "How does the sprint work?",
                        "Pricing inquiry",
                    ],
                    starterPromptFontSize: 13,
                    clearChatOnReload: false,
                    sourceDocsTitle: "",
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: BOT_BG,
                        textColor: "#e5e5e5",
                        showAvatar: true,
                        avatarSrc: irisIconSrc,
                    },
                    userMessage: {
                        backgroundColor: USER_BG,
                        textColor: "#ffffff",
                        showAvatar: false,
                        avatarSrc: "",
                    },
                    textInput: {
                        placeholder: "Input query...",
                        backgroundColor: BOT_BG,
                        textColor: "#ffffff",
                        sendButtonColor: PRIMARY_COLOR,
                        maxChars: 500,
                        maxCharsWarningMessage: "Buffer Overflow. Limit: 500 chars.",
                        autoFocus: true,
                        sendMessageSound: false,
                        sendSoundLocation: "send_message.mp3",
                        receiveMessageSound: false,
                        receiveSoundLocation: "receive_message.mp3",
                    },
                    feedback: {
                        color: MUTED_COLOR,
                    },
                    dateTimeToggle: {
                        date: true,
                        time: true,
                    },
                    footer: {
                        textColor: MUTED_COLOR,
                        text: "System",
                        company: "INVARITECH",
                        companyLink: "https://www.invaritech.ai",
                    },
                },
            }}
        />
    );
};
