import React, { useEffect, useState } from 'react';
import { startConnection, stopConnection, sendMessage, setOnMessageReceived } from '../../service/HubService';

const Chat = ({ userId, targetUserId }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        startConnection();

        setOnMessageReceived((senderId, message) => {
            console.log(`nhận message from ${senderId}: ${message}`);
            setMessages((messages) => [...messages, { senderId, message }]);
        });

        return () => {
            stopConnection();
        };
    }, []);

    const handleSendMessage = async () => {
        if (messageInput.trim()) {
            await sendMessage("f2f5a505-9732-4710-992a-9fc845e42e20", messageInput);
            setMessages((messages) => [...messages, { senderId: userId, message: messageInput }]);
            setMessageInput("");
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
