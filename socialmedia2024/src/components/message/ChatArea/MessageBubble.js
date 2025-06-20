import { useContext } from "react";
import { UserContext } from "../../../layout/Router";

const MessageBubble = ({ message }) => {
  const [user] = useContext(UserContext);
  // console.log(currentChat, "currentChat");
  return (
    <div
      className={`flex items-end space-x-2 animate-fade-in 
    ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
    >
      {message.senderId !== user.id && (
        <img
          src={message.avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      )}

      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.senderId === user.id
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-white text-gray-900 rounded-bl-md shadow-sm"
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>

      {message.senderId === user.id && (
        <img
          src={message.avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      )}
    </div>
  );
};

export default MessageBubble;
