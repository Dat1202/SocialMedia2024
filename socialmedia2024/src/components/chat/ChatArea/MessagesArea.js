import React from "react";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const MessagesArea = ({ messages, currentChat, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          currentChat={currentChat}
        />
      ))}

      {isTyping && <TypingIndicator currentChat={currentChat} />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessagesArea);