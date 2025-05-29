import React, { useRef } from "react";
import { Camera, Smile, Send, Mic, ThumbsUp } from "lucide-react";

const MessageInput = ({ newMessage, onMessageChange, onSendMessage, onKeyPress }) => {
    const inputRef = useRef(null);
  
    return (
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Camera size={20} className="text-blue-500" />
          </button>
          
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => onMessageChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Aa"
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
            <button className="ml-2 text-blue-500 hover:text-blue-600">
              <Smile size={20} />
            </button>
          </div>
  
          {newMessage.trim() ? (
            <button
              onClick={onSendMessage}
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
            >
              <Send size={16} className="text-white" />
            </button>
          ) : (
            <div className="flex space-x-1">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Mic size={20} className="text-blue-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ThumbsUp size={20} className="text-blue-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default MessageInput;