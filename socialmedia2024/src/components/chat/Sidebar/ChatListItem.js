import React from 'react'

const ChatListItem = ({ chat, isActive, onClick }) => {
  return (
    <div
      onClick={() => onClick(chat.id)}
      className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
        isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""
      }`}
    >
      <div className="relative">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${chat.color} rounded-full flex items-center justify-center text-white font-medium`}
        >
          {chat.avatar}
        </div>
        {chat.online && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
        )}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">
          {chat.lastMessage}
        </p>
      </div>

      {chat.unread > 0 && (
        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {chat.unread}
        </div>
      )}
    </div>
  );
};

export default ChatListItem;  
