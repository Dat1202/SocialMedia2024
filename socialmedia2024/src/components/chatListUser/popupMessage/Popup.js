import { X } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import useFirestore from "../../../hooks/useFirestore";
import MessageBubble from "../../base/MessageBubble";
import MessageInput from "../../message/ChatArea/MessageInput";
import { UserContext } from "../../../layout/Router";

const ChatPopup = ({ selectedChat, onClose }) => {
  const [user] = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setNewMessage(newMessage);

    const message = {
      id: Date.now() + 1,
      text: newMessage,
      senderId: user.id,
      // time: getCurrentTime(),
      // chatGroupId: activeChat,
      // createdAt: serverTimestamp(),
      avatar: user.avatar || "",
    };

    // onSendMessage(activeChat, message);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const condition = useMemo(
    () => ({
      fieldName: "chatGroupId",
      operator: "==",
      compareValue: selectedChat.chatGroupId,
    }),
    [selectedChat.chatGroupId]
  );
  const messages = useFirestore("messages", condition);
  console.log(messages, "messages text");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-96 w-80 bg-white rounded-xl shadow-lg flex flex-col z-50">
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-xl z-50">
        <span className="font-semibold">{selectedChat.userName}</span>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isHiddenAvatar={true}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        newMessage={newMessage}
        onMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default ChatPopup;
