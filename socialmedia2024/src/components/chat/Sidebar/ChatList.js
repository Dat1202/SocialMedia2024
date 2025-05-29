import React from 'react';
import SidebarHeader from './SidebarHeader';
import ChatListItem from "./ChatListItem";
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
  

];

const ChatList = ({ activeChat, onChatSelect, searchQuery, onSearchChange }) => {
  const filteredChats = CHAT_LIST.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
      <SidebarHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <div className="overflow-y-auto">
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={activeChat === chat.id}
            onClick={onChatSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;