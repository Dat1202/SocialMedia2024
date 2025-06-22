  import { useEffect, useMemo, useState } from "react";
  import ChatList from "../../components/message/Sidebar/ChatList";
  import ChatArea from "../../components/message/ChatArea/ChatArea";
  import { addDoc, collection } from "firebase/firestore";
  import { authApis, endpoints } from "../../configs/Apis";
  import { db } from "../../firebase/Config";
  import useFirestore from "../../hooks/useFirestore";

  const Message = () => {
    const [chatGroupId, setChatGroupId] = useState(null);
    const [searchQuery, setSearchQuery] = useState();
    const [chatList, setChatList] = useState([]);

    const handleSendMessage = async (chatId, message) => {
      console.log(message, "message text");
      await addDoc(collection(db, "messages"), message);
    };

    let condition = useMemo(() => ({
        fieldName: "chatGroupId",
        operator: "==",
        compareValue: chatGroupId,
    }), [chatGroupId]);

    const messages = useFirestore("messages", condition);

    const loadChatItem = async () => {
      try {
        const { data } = await authApis().get(endpoints["chat"]);
        setChatList(data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      loadChatItem();
    }, [chatGroupId]);

    return (
      <div className="flex">
        <ChatList
          activeChat={chatGroupId}
          onChatSelect={setChatGroupId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          chatList={chatList}
        />

        <ChatArea
          activeChat={chatGroupId}
          messages={messages}
          onSendMessage={handleSendMessage}
          chatList={chatList}
        />
      </div>
    );
  };

  export default Message;
