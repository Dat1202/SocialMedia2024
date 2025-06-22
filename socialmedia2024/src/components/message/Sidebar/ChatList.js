import SidebarHeader from './SidebarHeader';
import ChatListItem from "./ChatListItem";

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