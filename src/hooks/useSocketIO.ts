import { useEffect, useState } from "react";
import io from "socket.io-client";

const socketEndpoint = "http://localhost:6060";

export const useSocketIO = () => {
  const [response, setResponse] = useState("No connection with Server! :(");
  const [socket, setSocket] = useState(null);

  const connectSocket = () => {
    const socket = io(socketEndpoint);
    onConnect(socket);
    socket.on("chatMessage", (msg) => {
      setMessages((oldMessages) => [...oldMessages, msg]);
    });
    console.log("connect socket: ", socket);
    setSocket(socket);
  };

  const onConnect = (socket) => {
    socket.on("connect", () => {
      setResponse("Connected to the server!");
    });
  };

  const onChatMessageEmit = (socket, inputMessage) => {
    console.log(socket);
    socket.emit("chatMessage", inputMessage);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setResponse("Disconnected from the server!");
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  console.log("RETURN socket: ", socket);

  return {
    socket,
    connectSocket,
    disconnectSocket,
    onConnect,
    onChatMessageEmit,
    response,
  };
};
