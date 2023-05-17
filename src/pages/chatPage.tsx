import { useEffect, useState } from "react";
import Button from "../components/button";
import Chat from "../components/chat";
import Logo from "../components/logo";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
// import { useGetTest } from "../api/test";
import io from "socket.io-client";

const socketEndpoint = "http://localhost:6060";

const ChatPage = () => {
  const { email, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [response, setResponse] = useState("No connection with Server! :(");
  const [socket, setSocket] = useState(null);
  const connectSocket = () => {
    const socket = io(socketEndpoint);

    socket.on("connect", () => {
      setResponse("Connected to the server!");
    });

    setSocket(socket);
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

  useEffect(() => {
    if (!accessToken) navigate("/login");
  });

  // const xd = useGetTest();

  return (
    <div className="w-full h-full">
      <div className="bg-slate-700 text-cyan-50 grid grid-cols-menu grid-rows-menu h-screen w-screen p-5">
        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Logo />
            {email}
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Pokój</p>
            <p>Status: {response}</p>
            {/* {xd.isLoading && <span className="animate-spin">Ładowanie</span>}
            {xd.isSuccess && <span>{xd.data.ok}</span>}
            {xd.isError && <span>Błąd!</span>} */}
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <Button
              label="Wyloguj się"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            />
          </div>
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Menu</p>
            <button className="border-2" onClick={connectSocket}>
              Connect to Server
            </button>
            <button className="border-2" onClick={disconnectSocket}>
              Disconnect from Server
            </button>
          </div>
        </div>

        <div className="border-2 flex flex-col h-full">
          <Chat />
        </div>

        <div className="border-2">
          <div className="flex justify-center items-center h-full">
            <p>Użytkownicy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
