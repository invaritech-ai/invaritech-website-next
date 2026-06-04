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
    const irisIconSrc = "/iris.webp";
    const PRIMARY_COLOR = "#0F5132"; // Forest green to match site primary
    const BG_COLOR = "#F7F7F4";      // Off-white background
    const MUTED_COLOR = "#4B5550";   // Cool muted-foreground
    const ON_PRIMARY_COLOR = "#FFFFFF"; // White text on forest green
    const BOT_BG = "#EEEDE8";        // Secondary surface for bot messages
    const USER_BG = "#0F5132";       // Forest green for user messages
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const updateIsMobile = () => setIsMobile(mediaQuery.matches);
        updateIsMobile();

        mediaQuery.addEventListener("change", updateIsMobile);
        return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }, []);

    const mobileMode = isMobile ?? false;
    const bubbleSize = mobileMode ? 60 : 80;
    const bubbleRight = mobileMode ? 12 : 20;
    const bubbleBottom = mobileMode ? 12 : 20;
    const chatWindowOffset = mobileMode ? 0 : bubbleBottom + bubbleSize + 10;
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

        const patchScrollables = (root: Element | Document | ShadowRoot) => {
            const SELECTORS = '.chatbot-chat-view, div[class*="messages-container"], .rcb-chat-body';
            root.querySelectorAll(SELECTORS).forEach((el) => {
                if (!el.hasAttribute("data-lenis-prevent")) {
                    el.setAttribute("data-lenis-prevent", "");
                    (el as HTMLElement).style.pointerEvents = "auto";
                    (el as HTMLElement).style.overscrollBehavior = "contain";
                }
            });
        };

        // Polling to add data-lenis-prevent to Shadow DOM scroll container
        const interval = setInterval(() => {
            const flowise = document.querySelector("flowise-chatbot");
            patchScrollables(flowise?.shadowRoot ?? document);
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
                    backgroundColor: PRIMARY_COLOR,
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
                    tooltipMessage: "Ask about AP controls",
                    tooltipBackgroundColor: "#F7F7F4",
                    tooltipTextColor: "#0B1410",
                    tooltipFontSize: 12,
                },
                disclaimer: {
                    title: "System Note",
                    message:
                        'By accessing this terminal, you agree to the <a target="_blank" rel="noopener noreferrer" href="https://www.invaritech.ai/terms/" style="color: #0F5132; text-decoration: underline;">Protocols</a>',
                    textColor: MUTED_COLOR,
                    buttonColor: PRIMARY_COLOR,
                    buttonText: "INITIALIZE LINK",
                    buttonTextColor: ON_PRIMARY_COLOR,
                    blurredBackgroundColor: "rgba(247, 247, 244, 0.85)",
                    backgroundColor: BG_COLOR,
                },
                customCSS: `
                    .flowise-process-flow, .source-docs, .source-documents-container {
                        display: none !important;
                    }
                    /* Position the outer fixed wrapper */
                    div.fixed {
                        bottom: calc(env(safe-area-inset-bottom, 0px) + ${chatWindowOffset}px) !important;
                        right: ${bubbleRight}px !important;
                    }
                    /* Light theme window */
                    .chatbot-container {
                        border: 1px solid #0F5132 !important;
                        box-shadow: 0 20px 50px rgba(0,0,0,0.12) !important;
                        font-family: 'IBM Plex Mono', monospace !important;
                        max-height: min(78dvh, calc(100vh - 140px)) !important;
                        background-color: #F7F7F4 !important;
                    }
                    /* Fix Close Button */
                    button[class*="absolute"][class*="right-"] {
                        right: 4px !important;
                        top: 4px !important;
                        margin: 0 !important;
                        color: #0B1410 !important;
                    }

                    /* Mobile Responsiveness */
                    @media (max-width: 640px) {
                        div.fixed {
                            top: 0 !important;
                            left: 0 !important;
                            right: 0 !important;
                            bottom: 0 !important;
                            width: 100vw !important;
                            height: 100dvh !important;
                            max-width: 100vw !important;
                            max-height: 100dvh !important;
                            transform: none !important;
                            border-radius: 0 !important;
                            z-index: 99999 !important;
                        }
                        .chatbot-container {
                            width: 100vw !important;
                            height: 100dvh !important;
                            max-width: 100vw !important;
                            max-height: 100dvh !important;
                            min-height: 100dvh !important;
                            border-radius: 0 !important;
                        }
                        div.fixed[style*="width"] {
                            width: 100vw !important;
                        }
                        div.fixed[style*="height"] {
                            height: 100dvh !important;
                        }
                    }

                    button[class*="bubble"] {
                        border: 1px solid #0F5132 !important;
                    }
                    .chatbot-header {
                        background-color: #F7F7F4 !important;
                        border-bottom: 1px solid #E2E4DE !important;
                        color: #0B1410 !important;
                    }
                    .chatbot-header span, .chatbot-header p, .chatbot-header div {
                        color: #0B1410 !important;
                    }
                    /* Header avatar */
                    .chatbot-header img {
                        width: 60px !important;
                        height: 60px !important;
                        max-width: 60px !important;
                        border: 1px solid #0F5132 !important;
                        box-shadow: 0 0 12px rgba(15, 81, 50, 0.15);
                        border-radius: 50%;
                        object-fit: cover !important;
                    }
                    .chatbot-input {
                        background-color: #EEEDE8 !important;
                        border-top: 1px solid #E2E4DE !important;
                        color: #0B1410 !important;
                    }
                    .chatbot-input textarea, .chatbot-input input {
                        color: #0B1410 !important;
                        background-color: transparent !important;
                    }
                    .chatbot-input textarea::placeholder, .chatbot-input input::placeholder {
                        color: #4B5550 !important;
                    }
                    .guest-message {
                        background-color: #0F5132 !important;
                        color: ${ON_PRIMARY_COLOR} !important;
                        border: none !important;
                    }
                    .bot-message {
                        background-color: #EEEDE8 !important;
                        color: #0B1410 !important;
                        border: 1px solid #E2E4DE !important;
                    }
                    /* Messages area */
                    div[class*="start-messages-container"],
                    div[class*="messages-container"],
                    div[part="messages-container"],
                    .chatbot-chat-view,
                    .rcb-chat-body {
                        overflow-y: auto !important;
                        scrollbar-width: thin !important;
                        scrollbar-color: #0F5132 transparent !important;
                        height: 100% !important;
                        display: flex !important;
                        flex-direction: column !important;
                        overscroll-behavior: contain !important;
                        background-color: #F7F7F4 !important;
                    }
                    ::-webkit-scrollbar {
                        width: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #0F5132;
                        border-radius: 3px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #0A3D24;
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
                        textColor: "#0B1410",
                        showAvatar: true,
                        avatarSrc: irisIconSrc,
                    },
                    userMessage: {
                        backgroundColor: USER_BG,
                        textColor: ON_PRIMARY_COLOR,
                        showAvatar: false,
                        avatarSrc: "",
                    },
                    textInput: {
                        placeholder: "Input query...",
                        backgroundColor: BOT_BG,
                        textColor: "#0B1410",
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
                        color: "#4B5550",
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
