
const MessageBubble = ({ message, currentChat }) => {
  return (
    <div
      className={`flex items-end space-x-2 animate-fade-in ${
        message.sender === "me" ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === "other" && (
        <div
          className={`w-7 h-7 bg-gradient-to-r ${currentChat.color} rounded-full flex items-center justify-center text-white text-xs flex-shrink-0`}
        >
          {message.avatar}
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.sender === "me"
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-white text-gray-900 rounded-bl-md shadow-sm"
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;