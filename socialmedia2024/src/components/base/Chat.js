import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import cookie from "react-cookies";

const Chat = ({ userId, targetUserId }) => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44389/chatHub", {
                accessTokenFactory: () => cookie.load('token'),
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            newConnection.stop();
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on("ReceiveMessage", (senderId, message) => {
                        console.log(`Received message from ${senderId}: ${message}`);
                        setMessages((messages) => [...messages, { senderId, message }]);
                    });
                })
                .catch((error) => console.error("Connection failed: ", error));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (messageInput.trim() && connection) {
            await connection.invoke("SendMessageToUser", "9e6f2a6b-a9e0-4717-b22b-7b7d35c685ac", messageInput);
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
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
