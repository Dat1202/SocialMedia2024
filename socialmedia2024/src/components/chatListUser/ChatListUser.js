  import React, { useEffect, useState } from "react";
  import ProfileRoute from "../base/ProfileRoute";
  import { authApis, endpoints } from "../../configs/Apis";
  import ChatPopup from "./popupMessage/Popup";

  const ChatListUser = () => {
    const [users, setUsers] = useState([]);
    const [openChats, setOpenChats] = useState([]);
    const listUsers = [
      { id: 1, userName: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      {
        id: 2,
        userName: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: 3,
        userName: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: 4,
        userName: "Bob Williams",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      {
        id: 5,
        userName: "Charlie Brown",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: 6,
        userName: "Diana Prince",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      {
        id: 7,
        userName: "Ethan Hunt",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      {
        id: 8,
        userName: "Fiona Gallagher",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        id: 9,
        userName: "George Bailey",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: 10,
        userName: "Hannah Baker",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
      {
        id: 11,
        userName: "Ian Somerhalder",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      {
        id: 12,
        userName: "Jasmine Lee",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: 13,
        userName: "Kevin Hart",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      {
        id: 14,
        userName: "Luna Lovegood",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
      {
        id: 15,
        userName: "Michael Scott",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
    ];
    console.log(openChats,'openChats');

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
    }
    console.log(users)
    return (
      <div className="sticky top-16 p-6 overflow-y-scroll h-screen">
        {users.map((user) => (
          <div key={user.id} onClick={() => openChat(user)}>
            <ProfileRoute avatar={user.avatar} userName={user.userName} />
          </div>
        ))}   

        {openChats.map((user, idx) => (
          <div key={user.id} className="fixed bottom-4" style={{ right: `${16 + idx * 340}px` }}>
            <ChatPopup user={user} onClose={() => closeChat(user.id)} />
          </div>
        ))}
      </div>
    );
  };

  export default ChatListUser;
