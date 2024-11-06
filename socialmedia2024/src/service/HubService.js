import * as signalR from '@microsoft/signalr';
import cookie from "react-cookies";

let connection = null;
let onMessageReceivedCallback = null;

export const startConnection = async () => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        console.log("Already connected to SignalR.");
        return;
    }

    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:44389/HubService", {
            accessTokenFactory: () => {
                const token = cookie.load('token');
                return token;
            },
        })
        .withAutomaticReconnect()
        .build();

    connection.onclose(err => {
        console.error("Connection closed due to error: ", err);
    });

    connection.onreconnecting(err => {
        console.log("Reconnecting due to error: ", err);
    });

    connection.onreconnected(() => {
        console.log("Reconnected!");
    });

    try {
        await connection.start();
        console.log("SignalR connection success.");

        connection.on("ReceiveNotification", (senderId, message) => {
            if (onMessageReceivedCallback) {
                onMessageReceivedCallback(senderId, message);
            }
        });
    } catch (error) {
        console.error("SignalR connection failed: ", error);
    }
};

export const stopConnection = async () => {
    if (connection) {
        await connection.stop();
        console.log("SignalR connection stopped.");
    }
};

export const sendNotificationToUser = async (nameMethod ,targetUserId, notificationAction) => {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        try {
            await connection.invoke(nameMethod, targetUserId, notificationAction);
        } catch (error) {
            console.error("Failed to send message: ", error);
        }
    } else {
        console.error("Cannot send message: Not connected to SignalR.");
    }
};

export const setOnMessageReceived = (callback) => {
    onMessageReceivedCallback = callback;
};