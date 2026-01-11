"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const BubbleChat = dynamic(
    () => import("flowise-embed-react").then((mod) => mod.BubbleChat),
    {
        ssr: false,
    }
);

export const Chatbot = () => {
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

            // Method 4: Simulate click at the exact button position
            // Button is configured at right: 20, bottom: 20, size: 56
            const buttonX = window.innerWidth - 20 - 28; // right + half of size
            const buttonY = window.innerHeight - 20 - 28; // bottom + half of size

            const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: buttonX,
                clientY: buttonY,
            });

            const elementAtPosition = document.elementFromPoint(
                buttonX,
                buttonY
            );
            if (elementAtPosition) {
                elementAtPosition.dispatchEvent(clickEvent);
                return true;
            }

            // Method 5: Dispatch a custom event that Flowise might listen to
            window.dispatchEvent(new CustomEvent("flowise-open"));

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

        // Use capture phase to intercept before other handlers
        window.addEventListener("keydown", handleKeyboardShortcut, true);

        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcut, true);
        };
    }, []);

    return (
        <BubbleChat
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
                    backgroundColor: "#3B82F6",
                    right: 20,
                    bottom: 20,
                    size: 56,
                    dragAndDrop: true,
                    iconColor: "white",
                    customIconSrc: "https://www.invaritech.ai/iris.png",
                    autoWindowOpen: {
                        autoOpen: false,
                        openDelay: 2,
                        autoOpenOnMobile: false,
                    },
                },
                tooltip: {
                    showTooltip: true,
                    tooltipMessage: "Chat with Iris",
                    tooltipBackgroundColor: "#1F2937",
                    tooltipTextColor: "white",
                    tooltipFontSize: 14,
                },
                disclaimer: {
                    title: "Disclaimer",
                    message:
                        'By using this chatbot, you agree to the <a target="_blank" href="https://www.invaritech.ai/terms/">Terms & Conditions</a>',
                    textColor: "#1F2937",
                    buttonColor: "#3B82F6",
                    buttonText: "Start Chatting",
                    buttonTextColor: "white",
                    blurredBackgroundColor: "rgba(0, 0, 0, 0.4)",
                    backgroundColor: "#ffffff",
                },
                customCSS: `
                    .flowise-process-flow,
                    .source-docs,
                    [class*="process-flow"],
                    [class*="source-docs"],
                    [class*="sourceDocs"],
                    [class*="SourceDocs"],
                    [id*="source"],
                    [id*="Source"],
                    .source-documents-container,
                    .process-flow-container {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    }
                `,
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: false,
                    title: "Iris",
                    titleAvatarSrc: "https://www.invaritech.ai/iris.png",
                    welcomeMessage:
                        "Hi — I'm Iris. I help you figure out whether automation actually makes sense for your workflow. What's slowing your team down right now?",
                    errorMessage:
                        "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
                    backgroundColor: "#ffffff",
                    backgroundImage: "",
                    height: 700,
                    width: 400,
                    fontSize: 15,
                    starterPrompts: [
                        "What is automation?",
                        "How can automation help my business?",
                        "What services do you offer?",
                    ],
                    starterPromptFontSize: 14,
                    clearChatOnReload: false,
                    sourceDocsTitle: "",
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: "#F3F4F6",
                        textColor: "#1F2937",
                        showAvatar: true,
                        avatarSrc: "https://www.invaritech.ai/iris.png",
                    },
                    userMessage: {
                        backgroundColor: "#3B82F6",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "",
                    },
                    textInput: {
                        placeholder: "Type your question...",
                        backgroundColor: "#ffffff",
                        textColor: "#1F2937",
                        sendButtonColor: "#3B82F6",
                        maxChars: 500,
                        maxCharsWarningMessage:
                            "You exceeded the character limit. Please keep your message under 500 characters.",
                        autoFocus: true,
                        sendMessageSound: false,
                        sendSoundLocation: "send_message.mp3",
                        receiveMessageSound: false,
                        receiveSoundLocation: "receive_message.mp3",
                    },
                    feedback: {
                        color: "#6B7280",
                    },
                    dateTimeToggle: {
                        date: true,
                        time: true,
                    },
                    footer: {
                        textColor: "#6B7280",
                        text: "Powered by",
                        company: "Flowise",
                        companyLink: "https://flowiseai.com",
                    },
                },
            }}
        />
    );
};
