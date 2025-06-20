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
  }
];

const ChatList = ({ chatList, activeChat, onChatSelect, searchQuery, onSearchChange }) => {
  // const filteredChats = chatList.filter((chat) =>
  //   chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-sreen">
      <SidebarHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <div className="overflow-y-auto h-chat-list-item-scroll">
        {chatList.map((chat, index) => (
          <ChatListItem
            key={chat.id ? chat.id : index}
            chat={chat}
            isActive={activeChat === chat.chatGroupId}  
            onClick={onChatSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;