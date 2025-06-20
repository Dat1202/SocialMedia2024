import React from "react";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const MessagesArea = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  console.log(messages, "MessagesArea");

  return (
    <div className="flex-1 p-4 space-y-4">
      {messages && messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {/* {isTyping && <TypingIndicator />} */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessagesArea);