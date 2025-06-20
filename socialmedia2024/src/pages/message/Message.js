import React, { useEffect, useState } from "react";
import ChatList from "../../components/message/Sidebar/ChatList";
import ChatArea from "../../components/message/ChatArea/ChatArea";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { authApis, endpoints } from "../../configs/Apis";
import { db } from "../../firebase/Config";

const Message = () => {
  const [activeChat, setActiveChat] = useState('');
  const [searchQuery, setSearchQuery] = useState();
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  console.log("messages", messages);
  console.log("groupedMessages", groupedMessages);

  const handleSendMessage = async (chatId, message) => {
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));
    console.log(message, "message text");
    await addDoc(collection(db, "messages"), message);

  };

  const addMessage = async () => {
    try {
      const messageData = {
        id: Math.floor(Math.random() * 1000000),
        text: "Xin chào! Đây là tin nhắn mẫu 🧪",
        senderId: "1e9bb1c4-a576-47cd-a38b-5e1ae270b6e8",
        avatar: "https://i.pravatar.cc/150?img=8",
        time: Date.now(),
        createdAt: serverTimestamp(),
        chatGroupId: 2,
      };

      const messageData2 = {
        id: Math.floor(Math.random() * 1000000),
        text: "77d436ad-ffd9-4a89-90dc-5e3dd0b46413",
        senderId: "77d436ad-ffd9-4a89-90dc-5e3dd0b46413",
        avatar: "https://i.pravatar.cc/150?img=8",
        time: Date.now(),
        createdAt: serverTimestamp(),
        chatGroupId: 2,
      };

      await addDoc(collection(db, "messages"), messageData);
      await addDoc(collection(db, "messages"), messageData2);

    } catch (error) {
      console.error("❌ Lỗi khi gửi tin nhắn:", error);
    }
  };

  const loadMessages = async () => {
    const unsubscribe = onSnapshot(query(
      collection(db, "messages"),
      orderBy("createdAt", "asc") 
    ), (snapshot) => {
      const rawMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const groupedMessages = rawMessages.reduce((acc, msg) => {
        const groupId = msg.chatGroupId;
        if (!acc[groupId]) acc[groupId] = [];
        acc[groupId].push(msg);
        return acc;
      }, {});

      setMessages(groupedMessages); 
      setGroupedMessages(rawMessages); 
    });

    return () => unsubscribe();
  };


  const loadChatItem = async () => {
    try {
      const { data } = await authApis().get(endpoints["chat"]);
      setChatList(data);
      console.log("loadChatItem", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMessages();
    // addMessage();
    loadChatItem();
  }, []);

  return (
    <div className="flex">
      <ChatList
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        chatList={chatList}
      />

      <ChatArea
        activeChat={activeChat}
        messages={messages}
        groupedMessages={groupedMessages}
        onSendMessage={handleSendMessage}
        chatList={chatList}
      />
    </div>
  );
};

export default Message;
