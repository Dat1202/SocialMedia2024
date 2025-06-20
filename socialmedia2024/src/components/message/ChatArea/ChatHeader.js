import React from 'react';
import { Phone, Video, MoreHorizontal } from 'lucide-react';
const ChatHeader = ({ chat }) => {
  console.log(chat, "chat");  if (!chat) return null;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img src={chat.avatar}
            className={`w-10 h-10 bg-gradient-to-r rounded-full flex items-center justify-center text-white font-medium`}
          />
          {chat.online && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h2 className="capitalize font-semibold text-gray-900">{chat.userName}</h2>
          <p className="text-sm text-gray-500">
            {chat.online ? "Đang hoạt động" : `Hoạt động ${chat.time} trước`}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Phone size={20} className="text-blue-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Video size={20} className="text-blue-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;