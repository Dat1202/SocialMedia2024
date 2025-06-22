import React from "react";
import { useEffect, useRef } from "react";
import MessageBubble from "../../base/MessageBubble";

const MessagesArea = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 space-y-4">
      {messages && messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessagesArea);