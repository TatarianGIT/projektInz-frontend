import { useEffect, useRef, useState } from "react";
import Button from "../components/button";
import Chat from "../chat/chat";
import Logo from "../components/logo";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import UsersList from "../chat/usersList";
import { TbDoorExit } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

const socket = io.connect("http://localhost:6060");

const ChatPage = () => {
  const { username, email, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [room, setRoom] = useState<string | null>(null);

  const joinRoom = (room) => {
    socket.emit("joinRoom", { room, username });
  };

  socket.on("setRoom", function (room) {
    setRoom(room);
  });

  const leaveRoom = (room, username) => {
    if (room) {
      socket.emit("leaveRoom", { room, username });
    }
  };

  useEffect(() => {
    if (!accessToken) navigate("/login");
  });

  return (
    <div className="lg:w-screen lg:h-screen bg-white dark:bg-green-800">
      <div className="lg:max-w-screen-2xl mx-auto w-full flex flex-col lg:h-[55rem]">
        <header className="flex justify-between items-center p-4">
          <span className="text-primary font-extrabold text-3xl">AppChat.</span>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-md overflow-hidden">
              <img
                src={`https://api.dicebear.com/6.x/miniavs/svg?seed=${username}`}
                alt="Avatar"
                className="w-12 h-12"
              />
            </div>
            <div className="flex flex-col text-black">
              <span className="text-xl font-semibold text-gray-900 leading-tight">
                {username}
              </span>
              <span className="text-sm text-gray-500 leading-tight">
                {email}
              </span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 transition ml-2"
              onClick={() => {
                leaveRoom(room, username);
                logout();
                navigate("/login");
              }}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </header>
        <div className="grid lg:grid-cols-4 px-4 pb-4 gap-4 h-full">
          <div className="flex flex-col gap-2">
            <span className="text-base text-gray-700">Kanały</span>
            {["General", "JavaScript", "NodeJS", "Python", "Inne"]?.map(
              (item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    if (room) {
                      leaveRoom(room, username);
                      setRoom(null);
                    }
                    joinRoom(item);
                    setRoom(item);
                  }}
                  className={`${
                    room === item
                      ? "bg-primary text-white"
                      : "text-black hover:bg-primary hover:text-white"
                  } border-2 transition border-primary rounded-full px-2 py-1.5 text-lg`}
                  disabled={!!room}
                >
                  {item}
                </button>
              )
            )}
            {!!room && (
              <button
                type="button"
                onClick={() => {
                  leaveRoom(room, username);
                  setRoom(null);
                }}
                className={`flex items-center gap-2 text-gray-600 hover:text-red-500 transition mt-4`}
              >
                <div className="shrink-0 grow-0">
                  <TbDoorExit size={22} />
                </div>
                <span className="font-bold text-base">Opuść pokój</span>
              </button>
            )}
            <UsersList
              socket={socket}
              room={room}
              email={email}
              username={username}
            />
          </div>
          <div className="lg:col-span-3 flex flex-col p-2 lg:p-4 pt-8 h-full">
            {room ? (
              <Chat
                socket={socket}
                room={room}
                email={email}
                username={username}
              />
            ) : (
              <div className="py-16 text-black flex justify-center items-center dark:bg-red-600">
                Dołącz do pokoju ale czatować z innymi użytkownikami.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
