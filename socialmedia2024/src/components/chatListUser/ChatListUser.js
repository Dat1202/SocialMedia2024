import { useEffect, useState } from "react";
import ProfileRoute from "../base/ProfileRoute";
import { authApis, endpoints } from "../../configs/Apis";
import ChatPopup from "./popupMessage/Popup";

const ChatListUser = () => {
  const [users, setUsers] = useState([]);
  const [openChats, setOpenChats] = useState([]);

  useEffect(() => {
    GetChatListUser();
  }, []);

  const openChat = (user) => {
    if (!openChats.find((chat) => chat.id === user.id)) {
      setOpenChats((prev) => [...prev, user]);
    }
  };

  const closeChat = (id) => {
    setOpenChats((prev) => prev.filter((chat) => chat.id !== id));
  };

  const GetChatListUser = async () => {
    const listUsers = await authApis().get(endpoints["chatListUser"]);

    if (listUsers.success) {
      setUsers(listUsers.data);
    } else {
      console.error("No users found");
    }
  };

  return (
    <div className="sticky top-16 p-6 overflow-y-scroll h-screen">
      {users.map((user) => (
        <div key={user.id} onClick={() => openChat(user)}>
          <ProfileRoute avatar={user.avatar} userName={user.userName} />
        </div>
      ))}

      {openChats.map((user, idx) => (
        <div
          key={user.id}
          className="fixed bottom-4"
          style={{ right: `${16 + idx * 340}px` }}
        >
          <ChatPopup selectedChat={user} onClose={() => closeChat(user.id)} />
        </div>
      ))}
    </div>
  );
};

export default ChatListUser;
