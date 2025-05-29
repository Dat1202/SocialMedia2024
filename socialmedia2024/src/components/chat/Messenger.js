import React, { useState } from "react";
import ChatList from "./Sidebar/ChatList";
import ChatArea from "./ChatArea/ChatArea";

const INITIAL_MESSAGES = {
  1: [
    {
      id: 1,
      text: "Chào bạn! Bạn có rảnh không?",
      sender: "other",
      time: "14:30",
      avatar: "👩‍💼",
    },
    {
      id: 2,
      text: "Mình muốn hỏi về dự án mới",
      sender: "other",
      time: "14:31",
      avatar: "👩‍💼",
    },
    {
      id: 3,
      text: "Chào Mai Anh! Có chứ, bạn cần hỏi gì?",
      sender: "me",
      time: "14:32",
    },
    {
      id: 4,
      text: "Timeline dự án khoảng bao lâu vậy bạn?",
      sender: "other",
      time: "14:33",
      avatar: "👩‍💼",
    },
  ],
  2: [
    {
      id: 1,
      text: "Hey team! Code review meeting lúc 3h nhé",
      sender: "other",
      time: "13:45",
      avatar: "👨‍💻",
    },
    { id: 2, text: "Đã note lịch rồi anh!", sender: "me", time: "13:46" },
  ],
  3: [
    {
      id: 1,
      text: "Design mới đã hoàn thành",
      sender: "other",
      time: "12:30",
      avatar: "👩‍🎨",
    },
    {
      id: 2,
      text: "Bạn có thể check giúp mình không?",
      sender: "other",
      time: "12:31",
      avatar: "👩‍🎨",
    },
  ],
  
};

const Messenger = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleSendMessage = (chatId, message) => {
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
  };

  return (
    <div className="flex">
      <ChatList
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ChatArea
        activeChat={activeChat}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Messenger;