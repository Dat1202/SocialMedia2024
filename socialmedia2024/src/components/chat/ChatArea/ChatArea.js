

import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessagesArea from "../ChatArea/MessagesArea";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";

const CHAT_LIST = [
  {
    id: 1,
    name: "Mai Anh",
    avatar: "👩‍💼",
    lastMessage: "Bạn có rảnh không? Mình muốn hỏi về dự án",
    time: "2 phút",
    unread: 2,
    online: true,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    name: "Đức Minh",
    avatar: "👨‍💻",
    lastMessage: "Code review meeting lúc 3h nhé!",
    time: "15 phút",
    unread: 0,
    online: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Thu Hà",
    avatar: "👩‍🎨",
    lastMessage: "Design mới đã xong, check giúp mình",
    time: "1 giờ",
    unread: 1,
    online: false,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    name: "Team Dev",
    avatar: "👥",
    lastMessage: "Ai có thể help debug bug này không?",
    time: "2 giờ",
    unread: 0,
    online: true,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    name: "Phương Linh",
    avatar: "👩‍🦳",
    lastMessage: "Meeting notes đã gửi vào email rồi nhé",
    time: "1 ngày",
    unread: 0,
    online: false,
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 6,
    name: "Anh Tuấn",
    avatar: "👨‍🚀",
    lastMessage: "Cảm ơn bạn! Sẽ review và feedback sớm",
    time: "2 ngày",
    unread: 0,
    online: true,
    color: "from-indigo-500 to-purple-500",
  },
];

const ChatArea = ({ activeChat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentChat = CHAT_LIST.find((chat) => chat.id === activeChat);
  const currentMessages = messages[activeChat] || [];

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

    const messageToSend = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: getCurrentTime(),
    };

    onSendMessage(activeChat, messageToSend);
    setNewMessage("");

    // Auto reply simulation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const autoReplies = [
        "Cảm ơn bạn!",
        "Mình hiểu rồi 👍",
        "Sounds good!",
        "Okay, noted!",
        "Thanks for the info!",
        "Tuyệt vời! 🎉",
      ];
      const autoMessage = {
        id: Date.now() + 1,
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        sender: "other",
        time: getCurrentTime(),
        avatar: currentChat?.avatar,
      };
      onSendMessage(activeChat, autoMessage);
    }, Math.random() * 2000 + 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChat) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader chat={currentChat} />
      <MessagesArea
        messages={currentMessages}
        currentChat={currentChat}
        isTyping={isTyping}
      />
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
