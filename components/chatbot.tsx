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
        />
    );
};
