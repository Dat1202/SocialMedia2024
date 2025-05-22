import React, { useEffect, useState } from 'react';
import { startConnection, stopConnection, sendNotificationToUser, setOnMessageReceived } from '../../service/HubService';

const Chat = ({ userId, targetUserId }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        startConnection();

        setOnMessageReceived((senderId, message) => {
            console.log(`Nhận message từ ${senderId}: ${message}`);
            setMessages((prevMessages) => [...prevMessages, { senderId, message }]);
        });

        return () => {
            stopConnection();
        };
    }, []);

    const handleSendMessage = async () => {
        const trimmedMessage = messageInput.trim();
        if (!trimmedMessage) return;
    
        try {
          await sendNotificationToUser("SendNotificationToUser", targetUserId, trimmedMessage);
          setMessages(prev => [...prev, { senderId: userId, message: trimmedMessage }]);
          setMessageInput("");
        } catch (error) {
          console.error("Lỗi khi gửi message:", error);
        }
      };

    return (
        <div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.senderId === userId ? "sent" : "received"}>
                        {msg.message}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
