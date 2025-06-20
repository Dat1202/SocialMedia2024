import { X } from "lucide-react";

const ChatPopup = ({ user, onClose }) => {
  return (
    <div className="h-96 w-80 bg-white rounded-xl shadow-lg flex flex-col z-50 animate-slide-up">
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-xl">
        <span className="font-semibold">{user.userName}</span>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
        <div className="bg-gray-100 p-2 rounded-lg w-max">Hi 👋</div>
        <div className="bg-blue-100 p-2 rounded-lg w-max self-end ml-auto">
          Hello!
        </div>
      </div>

      <div className="border-t px-3 py-2">
        <input  
          type="text"
          placeholder="Type a message..."
          className="w-full border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
    </div>
  );
};

export default ChatPopup;
