import React, { useContext, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessagesArea from "../ChatArea/MessagesArea";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";
import { UserContext } from "../../../layout/Router";
import { serverTimestamp } from "firebase/firestore";

const ChatArea = ({ activeChat, messages, onSendMessage, groupedMessages, chatList }) => {
  const [user] = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const activeChatData = chatList.find((chat) => chat.chatGroupId === activeChat);
  const getCurrentTime = () => {
    const now = new Date();
    return (
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0")
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setNewMessage(newMessage);

    const message = {
      id: Date.now() + 1,
      text: newMessage,
      senderId: user.id,
      time: getCurrentTime(),
      chatGroupId: activeChat,
      createdAt: serverTimestamp(),
      avatar: user.avatar || "", 
    };

    onSendMessage(activeChat, message);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeChat) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader chat={activeChatData} />
      <div className="overflow-y-auto bg-gray-50 h-messages-area-scroll">
        <MessagesArea messages={messages} />
      </div>
      <MessageInput
        newMessage={newMessage}
        onMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default React.memo(ChatArea);
