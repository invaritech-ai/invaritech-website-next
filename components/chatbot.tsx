"use client";

import dynamic from "next/dynamic";

const BubbleChat = dynamic(
    () => import("flowise-embed-react").then((mod) => mod.BubbleChat),
    {
        ssr: false,
    }
);

export const Chatbot = () => {
    return (
        <BubbleChat
            chatflowid="a6759d77-8fe9-459f-abb2-7a9aacd22ccf"
            apiHost="https://flowise.avishekmajumder.com"
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
                customCSS: ``,
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: true,
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
                    sourceDocsTitle: "Sources:",
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
